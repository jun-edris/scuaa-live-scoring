const express = require('express');
const cors = require('cors');
const { pusher } = require('./../../util');
const Team = require('./../../models/team');

const {
	hasDuplicatesJerseyNumber,
	hasDuplicatesPlayerName,
} = require('../../util');

const app = express();
app.use(cors());

exports.getallteam = async (req, res) => {
	try {
		const teams = await Team.find();
		res.status(200).json(teams);
	} catch (error) {
		res.status(404).json({
			message: 'No teams found',
		});
	}
};

exports.getNumberOfTeams = async (req, res) => {
	try {
		const teams = await Team.countDocuments();
		res.status(200).json({ teams });
	} catch (error) {
		res.status(404).json({
			message: 'No teams found',
		});
	}
};

exports.getAllTeamsByRole = async (req, res) => {
	try {
		const { gameEvent } = req.user;
		const teams = await Team.find({ gameEvent: gameEvent });
		res.status(200).json(teams);
	} catch (error) {
		res.status(404).json({
			message: 'No teams found',
		});
	}
};

exports.addteam = async (req, res) => {
	try {
		const { teamName, players, gameEvent } = req.body;

		const existingTeam = await Team.findOne({
			teamName,
			gameEvent,
		}).lean();

		if (existingTeam) {
			return res.status(400).json({ message: 'Team already exists' });
		}

		if (gameEvent === 'basketball' && players < 5) {
			return res.status(400).json({
				message: 'Number of players in a Basketball team must be 5 above',
			});
		}
		if (gameEvent === 'volleyball' && players < 6) {
			return res.status(400).json({
				message: 'Number of players in a Volleyball team must be 6 above',
			});
		}
		if (gameEvent === 'soccer' && players < 8) {
			return res.status(400).json({
				message: 'Number of players in a Soccer team must be 8 above',
			});
		}

		const teamData = { teamName, players, gameEvent };

		if (hasDuplicatesJerseyNumber(players)) {
			return res
				.status(400)
				.json({ message: 'Players should not have the same jersey number' });
		}
		if (hasDuplicatesPlayerName(players)) {
			return res
				.status(400)
				.json({ message: 'Players should not have the same name' });
		}

		const newTeam = new Team(teamData);
		const savedTeam = await newTeam.save();

		if (savedTeam) {
			pusher.trigger('teams', 'inserted', savedTeam);
			return res.status(201).json({
				message: 'Success',
				savedTeam,
			});
		} else {
			return res.status(400).json({
				message: 'There was a problem creating a team',
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'Something went wrong!',
		});
	}
};

exports.uploadImage = async (req, res) => {
	try {
		const photo = req.file.filename;

		const photoAdded = await Team.findByIdAndUpdate(req.params.id, {
			image: photo,
		});

		pusher.trigger('teams', 'uploaded-image', photoAdded);
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong!' });
	}
};

exports.updateteam = async (req, res) => {
	try {
		const { teamName, players, gameEvent } = req.body;

		if (hasDuplicatesJerseyNumber(players)) {
			return res
				.status(400)
				.json({ message: 'Players should not have the same jersey number' });
		}
		if (hasDuplicatesPlayerName(players)) {
			return res
				.status(400)
				.json({ message: 'Players should not have the same name' });
		}

		const existingTeam = await Team.findOne({
			teamName,
			gameEvent,
		}).lean();

		if (existingTeam) {
			return res.status(400).json({ message: 'Team already exists' });
		}

		const updatedTeam = await Team.findByIdAndUpdate(
			req.params.id,
			{
				teamName: teamName,
				players: players,
			},
			{ new: true }
		);

		pusher.trigger('teams', 'updated', updatedTeam);

		res.status(200).send({
			message: 'A team is successfully updated!',
			updatedTeam,
		});
	} catch (error) {
		return res.status(400).send({ message: 'Something went wrong!' });
	}
};

exports.deleteteam = async (req, res) => {
	try {
		const deleteTeam = await Team.findById({ _id: req.params.id });

		await Team.findByIdAndDelete(req.params.id);
		pusher.trigger('teams', 'deleted', deleteTeam);

		res.status(200).send({
			message: 'A team is successfully deleted!',
		});
	} catch (error) {
		return res.status(400).send({ message: 'Something went wrong!' });
	}
};

exports.deleteallteam = async (req, res) => {
	try {
		const deletedTeams = await Team.find({});
		await Team.deleteMany();
		pusher.trigger('teams', 'deleted-all', deletedTeams);

		res.status(200).send({
			message: 'Teams is successfully deleted!',
		});
	} catch (error) {
		res.status(400).json({
			message: 'Something went wrong!',
		});
	}
};
