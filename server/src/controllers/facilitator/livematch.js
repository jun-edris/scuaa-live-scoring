const express = require('express');
const cors = require('cors');
const { pusher } = require('./../../util');
const Schedule = require('./../../models/schedule');
const LiveMatch = require('./../../models/livematch');

const app = express();
app.use(cors());

exports.getlivematches = async (req, res) => {
	try {
		const live = LiveMatch.find();

		res.status(200).json(live);
	} catch (error) {
		res.status(400).json({
			message: error,
		});
	}
};

exports.livematch = async (req, res) => {
	try {
		const { sub, gameEvent } = req.user;
		const { teamOne, teamTwo, date } = req.body;

		const liveMatchData = {
			date: date,
			teamOne: teamOne,
			teamTwo: teamTwo,
			isStarted: true,
		};

		const live = Object.assign({}, liveMatchData, {
			user: sub,
			gameEvent: gameEvent,
		});

		const newLiveMatch = new LiveMatch(live);
		await newLiveMatch.save();

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

exports.addscoreplayerteamone = async (req, res) => {
	try {
		const { score, matchId } = req.body;

		const existLive = await LiveMatch.findOneAndUpdate(
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
		res
			.status(200)
			.json({ message: "Added the player's score", addPlayerScore });
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a score',
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
