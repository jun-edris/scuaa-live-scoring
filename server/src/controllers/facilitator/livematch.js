const express = require('express');
const cors = require('cors');
const { pusher } = require('./../../util');
const Schedule = require('./../../models/schedule');
const LiveMatch = require('./../../models/livematch');
const Team = require('./../../models/team');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

exports.getlivematches = async (req, res) => {
	try {
		const live = await LiveMatch.find();

		res.status(200).json(live);
	} catch (error) {
		res.status(400).json({
			message: error,
		});
	}
};

exports.getdonelivematches = async (req, res) => {
	try {
		const live = await LiveMatch.find({ isDone: true });

		res.status(200).json(live);
	} catch (error) {
		res.status(400).json({
			message: error,
		});
	}
};

exports.getnotdonelivematches = async (req, res) => {
	try {
		const live = await LiveMatch.find({ isDone: false });

		res.status(200).json(live);
	} catch (error) {
		res.status(400).json({
			message: error,
		});
	}
};

exports.getalllivebyuser = async (req, res) => {
	try {
		const { sub } = req.user;
		const live = await LiveMatch.find({ user: sub, isDone: true });

		res.status(200).json(live);
	} catch (error) {
		res.status(404).json({
			message: 'No matches found',
		});
	}
};

exports.getNumberOfLive = async (req, res) => {
	try {
		const match = await LiveMatch.countDocuments({
			isDone: false,
			isStarted: true,
		});
		res.status(200).json(match);
	} catch (error) {
		res.status(404).json({
			message: 'No teams found',
		});
	}
};

exports.livematch = async (req, res) => {
	try {
		const { sub, gameEvent, firstName, lastName } = req.user;
		const { teamOne, teamTwo, schedule, date } = req.body;

		const liveMatchData = {
			schedule: schedule,
			date: date,
			teamOne: teamOne,
			teamTwo: teamTwo,
			isStarted: true,
		};

		const live = Object.assign({}, liveMatchData, {
			userName: firstName + ' ' + lastName,
			user: sub,
			gameEvent: gameEvent,
		});

		const newLiveMatch = new LiveMatch(live);
		await newLiveMatch.save();
		pusher.trigger('liveMatch', 'created', newLiveMatch);

		res.status(201).json({
			message: 'A new match has been created!',
			newLiveMatch,
		});
	} catch (error) {
		res.status(400).send({
			message: 'There was a problem creating a live match',
		});
	}
};

exports.continueLiveMatch = async (req, res) => {
	try {
		const existingMatch = await Schedule.findById(req.params.id);

		if (!existingMatch) {
			console.log('error');
			return res.status(400).json({ message: 'No existing match' });
		} else {
			const liveMatch = await LiveMatch.findOne({
				schedule: req.params.id,
			});

			if (liveMatch) {
				return res.status(200).json({ liveMatch });
			}
		}
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong!' });
	}
};

exports.live = async (req, res) => {
	try {
		const liveMatch = await LiveMatch.findOne({
			_id: req.params.id,
		});
		if (liveMatch) {
			return res.status(200).json({ liveMatch });
		}
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong!' });
	}
};

// -------------- START SUBTITUTING PLAYERS ----------------------------

exports.subPlayer = async (req, res) => {
	try {
		const { subtituted, matchId } = req.body;

		const playerTeamOne = await LiveMatch.findOne({
			_id: matchId,
			'teamOne.players._id': req.params.id,
		});
		const playerTeamTwo = await LiveMatch.findOne({
			_id: matchId,
			'teamTwo.players._id': req.params.id,
		});

		if (playerTeamOne) {
			const subplayerTeamOne = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					'teamOne.players.$.subtituted': subtituted,
				},
				{ new: true }
			);

			const subPlayer = await subplayerTeamOne.save();

			res.status(200).json({ message: 'Subtitution success', subPlayer });
		} else if (playerTeamTwo) {
			const subplayerTeamTwo = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					'teamTwo.players.$.subtituted': subtituted,
				},
				{ new: true }
			);
			const subPlayer = await subplayerTeamTwo.save();
			res.status(200).json({ message: 'Subtitution success', subPlayer });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem subtituting a player',
		});
	}
};

// -------------- END SUBTITUTING PLAYERS ----------------------------

// -------------- START ADDING SCORES ----------------------------

exports.addscore = async (req, res) => {
	try {
		const { score, matchId } = req.body;

		const playerTeamOne = await LiveMatch.findOne({
			_id: matchId,
			'teamOne.players._id': req.params.id,
		});

		const playerTeamTwo = await LiveMatch.findOne({
			_id: matchId,
			'teamTwo.players._id': req.params.id,
		});

		if (playerTeamOne) {
			const addScore = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.scores': score,
					},
				},
				{ new: true }
			);
			const addPlayerScore = await addScore.save();
			res
				.status(200)
				.json({ message: "Added the player's score", addPlayerScore });
		} else if (playerTeamTwo) {
			const addScore = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.scores': score,
					},
				},
				{ new: true }
			);
			const addPlayerScore = await addScore.save();
			res
				.status(200)
				.json({ message: "Added the player's score", addPlayerScore });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a score',
		});
	}
};

// -------------- END ADDING SCORES ----------------------------

// -------------- START ADDING FOULS ----------------------------

exports.addfoul = async (req, res) => {
	try {
		const { foul, matchId } = req.body;

		const playerTeamOne = await LiveMatch.findOne({
			_id: matchId,
			'teamOne.players._id': req.params.id,
		});

		const playerTeamTwo = await LiveMatch.findOne({
			_id: matchId,
			'teamTwo.players._id': req.params.id,
		});

		if (playerTeamOne) {
			const addFoul = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.fouls': foul,
					},
				},
				{ new: true }
			);
			const addPlayerFoul = await addFoul.save();
			res
				.status(200)
				.send({ message: "Added the player's foul", addPlayerFoul });
		} else if (playerTeamTwo) {
			const addFoul = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.fouls': foul,
					},
				},
				{ new: true }
			);
			const addPlayerFoul = await addFoul.save();
			res
				.status(200)
				.send({ message: "Added the player's foul", addPlayerFoul });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a foul',
		});
	}
};

// -------------- END ADDING FOULS ----------------------------

// -------------- START ADDING YELLOW CARDS --------------------------

exports.addyellowcard = async (req, res) => {
	try {
		const { foul, matchId } = req.body;

		const playerTeamOne = await LiveMatch.findOne({
			_id: matchId,
			'teamOne.players._id': req.params.id,
		});

		const playerTeamTwo = await LiveMatch.findOne({
			_id: matchId,
			'teamTwo.players._id': req.params.id,
		});

		if (playerTeamOne) {
			const addYellowCard = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.card.yellow': foul,
					},
				},
				{ new: true }
			);
			const addPlayerFoul = await addYellowCard.save();
			res
				.status(200)
				.send({ message: "Added the player's foul", addPlayerFoul });
		} else if (playerTeamTwo) {
			const addYellowCard = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.card.yellow': foul,
					},
				},
				{ new: true }
			);
			const addPlayerFoul = await addYellowCard.save();
			res
				.status(200)
				.send({ message: "Added the player's foul", addPlayerFoul });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a foul',
		});
	}
};

// -------------- END ADDING YELLOW CARDS ----------------------------

// -------------- START ADDING RED CARDS --------------------------

exports.addredcard = async (req, res) => {
	try {
		const { foul, matchId } = req.body;

		const playerTeamOne = await LiveMatch.findOne({
			_id: matchId,
			'teamOne.players._id': req.params.id,
		});

		const playerTeamTwo = await LiveMatch.findOne({
			_id: matchId,
			'teamTwo.players._id': req.params.id,
		});

		if (playerTeamOne) {
			const addRedCard = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.card.yellow': foul,
					},
				},
				{ new: true }
			);
			const addPlayerFoul = await addRedCard.save();
			res
				.status(200)
				.send({ message: "Added the player's foul", addPlayerFoul });
		} else if (playerTeamTwo) {
			const addRedCard = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.card.yellow': foul,
					},
				},
				{ new: true }
			);
			const addPlayerFoul = await addRedCard.save();
			res
				.status(200)
				.send({ message: "Added the player's foul", addPlayerFoul });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a score',
		});
	}
};

// -------------- END ADDING RED CARDS --------------------------

// -------------- START SETTING WINNER --------------------------

exports.setwinner = async (req, res) => {
	try {
		const { winner, loser } = req.body;

		const winnerMatch = await LiveMatch.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				winner: winner,
				loser: loser,
				isStarted: false,
				isDone: true,
			},
			{ new: true }
		);

		if (winnerMatch) {
			const winnerTeam = await winnerMatch.save();

			pusher.trigger('liveMatch', 'updated', winnerTeam);

			return res
				.status(201)
				.send({ message: 'Congratulations!!!', winnerTeam });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a score',
		});
	}
};

exports.setwinnerTeam = async (req, res) => {
	try {
		const { winner, loser } = req.body;

		const winnerTeamOne = LiveMatch.findOne({
			_id: req.params.id,
			'teamOne._id': mongoose.Types.ObjectId(winner),
			'teamTwo._id': mongoose.Types.ObjectId(loser),
		});

		const winnerTeamTwo = LiveMatch.findOne({
			_id: req.params.id,
			'teamOne._id': mongoose.Types.ObjectId(loser),
			'teamTwo._id': mongoose.Types.ObjectId(winner),
		});

		if (winnerTeamOne) {
			const teamOne = await Team.findByIdAndUpdate(
				{
					_id: mongoose.Types.ObjectId(winner),
				},
				{
					$inc: {
						gamesWin: 1,
					},
				},
				{ new: true }
			);

			const teamTwo = await Team.findOneAndUpdate(
				{
					_id: mongoose.Types.ObjectId(loser),
				},
				{
					$inc: {
						gamesLose: 1,
					},
				},
				{ new: true }
			);

			pusher.trigger('teams', 'updated', teamOne);
			pusher.trigger('teams', 'updated', teamTwo);

			return res.send({ message: 'Team one is the winner' });
		}

		if (winnerTeamTwo) {
			const teamTwo = await Team.findOneAndUpdate(
				{
					_id: mongoose.Types.ObjectId(winner),
				},
				{
					$inc: {
						gamesWin: 1,
					},
				},
				{ new: true }
			);

			const teamOne = await Team.findOneAndUpdate(
				{
					_id: mongoose.Types.ObjectId(loser),
				},
				{
					$inc: {
						gamesLose: 1,
					},
				},
				{ new: true }
			);

			pusher.trigger('teams', 'updated', teamOne);
			pusher.trigger('teams', 'updated', teamTwo);

			return res.send({ message: 'Team two is the winner' });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem setting the winner',
		});
	}
};

// -------------- END SETTING WINNER ----------------------------
