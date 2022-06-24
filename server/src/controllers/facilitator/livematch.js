const express = require('express');
const cors = require('cors');
const { pusher } = require('./../../util');
const Schedule = require('./../../models/schedule');
const LiveMatch = require('./../../models/livematch');
const MatchSets = require('./../../models/sets');
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

exports.getStat = async (req, res) => {
	try {
		const match = await MatchSets.findOne({
			liveMatch: req.params.id,
		}).select({ sets: { $elemMatch: { no: req.query.setNum } } });

		res.status(200).json(match);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: 'No teams found',
		});
	}
};

exports.getStats = async (req, res) => {
	try {
		const match = await MatchSets.findOne({
			liveMatch: req.params.id,
		});
		// console.log(match);
		res.status(200).json(match);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: 'No teams found',
		});
	}
};

exports.livematch = async (req, res) => {
	try {
		const { sub, gameEvent, firstName, lastName } = req.user;
		const { teamOne, teamTwo, schedule, date } = req.body;

		const scheduledMatch = await Schedule.findById(schedule);

		const liveMatchData = {
			schedule: schedule,
			date: date,
			teamOne: teamOne,
			teamTwo: teamTwo,
			isStarted: true,
			setName:
				gameEvent === 'volleyball'
					? 'First Set'
					: gameEvent === 'basketball'
					? 'First Quarter'
					: null,
			numSets: scheduledMatch.set,
			timeGiven:
				gameEvent === 'soccer' ? 3600 : gameEvent === 'basketball' ? 600 : null,
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
		console.log(error);
		res.status(400).send({
			message: 'There was a problem creating a live match',
		});
	}
};

exports.matchSet = async (req, res) => {
	try {
		const liveM = await LiveMatch.findById(req.params.id);
		const sets = { liveMatch: liveM };
		const newMatchSet = new MatchSets(sets);

		await newMatchSet.save();
		pusher.trigger('sets', 'created', newMatchSet);
		res.status(201).json({
			message: 'A new set has been created!',
			newMatchSet,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			message: 'There was a problem creating a set',
		});
	}
};

exports.insertSet = async (req, res) => {
	try {
		const setM = await MatchSets.findOne({ liveMatch: req.params.id });
		console.log(setM);
		if (setM) {
			const setMatch = await LiveMatch.findOneAndUpdate(
				{
					_id: req.params.id,
				},
				{
					sets: setM._id,
				},
				{ new: true }
			);
			pusher.trigger('liveMatch', 'updated', setMatch);
		}

		return res.status(200).json({ message: 'Live updated' });
	} catch (error) {
		console.log(error);
		res.status(400).send({
			message: 'There was a problem creating a set',
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
			pusher.trigger('liveMatch', 'updated', subPlayer);
			res.status(200).json({ message: 'Subtitution success', subPlayer });
		}
		if (playerTeamTwo) {
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
			pusher.trigger('liveMatch', 'udpated', subPlayer);
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

// -------------- START ADDING STATS ----------------------------

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

exports.addAssists = async (req, res) => {
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
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.assists': score,
					},
				},
				{ new: true }
			);
			const addPlayerAssist = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's assist", addPlayerAssist });
		} else if (playerTeamTwo) {
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.assists': score,
					},
				},
				{ new: true }
			);
			const addPlayerAssist = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's assist", addPlayerAssist });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding an assist',
		});
	}
};

exports.addSteal = async (req, res) => {
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
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.steal': score,
					},
				},
				{ new: true }
			);
			const addPlayerSteal = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's steal", addPlayerSteal });
		} else if (playerTeamTwo) {
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.steal': score,
					},
				},
				{ new: true }
			);
			const addPlayerSteal = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's steal", addPlayerSteal });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a steal',
		});
	}
};

exports.addBlock = async (req, res) => {
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
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.block': score,
					},
				},
				{ new: true }
			);
			const addPlayerBlock = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's block", addPlayerBlock });
		} else if (playerTeamTwo) {
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.block': score,
					},
				},
				{ new: true }
			);
			const addPlayerBlock = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's block", addPlayerBlock });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a block',
		});
	}
};

exports.addRebound = async (req, res) => {
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
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.rebounds': score,
					},
				},
				{ new: true }
			);
			const addPlayerRebound = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's rebound", addPlayerRebound });
		} else if (playerTeamTwo) {
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.rebounds': score,
					},
				},
				{ new: true }
			);
			const addPlayerRebound = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's rebound", addPlayerRebound });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a rebound',
		});
	}
};

exports.addSpike = async (req, res) => {
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
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.spike': score,
						'teamOne.players.$.scores': score,
					},
				},
				{ new: true }
			);
			const addPlayerSpike = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's spike", addPlayerSpike });
		} else if (playerTeamTwo) {
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.spike': score,
						'teamTwo.players.$.scores': score,
					},
				},
				{ new: true }
			);
			const addPlayerSpike = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's spike", addPlayerSpike });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a spike',
		});
	}
};

exports.addDig = async (req, res) => {
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
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.digs': score,
					},
				},
				{ new: true }
			);
			const addPlayerDig = await addPoint.save();
			res.status(200).json({ message: "Added the player's dig", addPlayerDig });
		} else if (playerTeamTwo) {
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.digs': score,
					},
				},
				{ new: true }
			);
			const addPlayerDig = await addPoint.save();
			res.status(200).json({ message: "Added the player's dig", addPlayerDig });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a dig',
		});
	}
};

exports.addSaveBall = async (req, res) => {
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
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.saveBall': score,
					},
				},
				{ new: true }
			);
			const addPlayerSaveBall = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's save ball", addPlayerSaveBall });
		} else if (playerTeamTwo) {
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.saveBall': score,
					},
				},
				{ new: true }
			);
			const addPlayerSaveBall = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's save ball", addPlayerSaveBall });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a save ball',
		});
	}
};

exports.addAce = async (req, res) => {
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
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.scores': score,
						'teamOne.players.$.ace': score,
					},
				},
				{ new: true }
			);
			const addPlayerAce = await addPoint.save();
			res.status(200).json({ message: "Added the player's ace", addPlayerAce });
		} else if (playerTeamTwo) {
			const addPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.scores': score,
						'teamTwo.players.$.ace': score,
					},
				},
				{ new: true }
			);
			const addPlayerAce = await addPoint.save();
			res
				.status(200)
				.json({ message: "Added the player's score", addPlayerAce });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding an ace',
		});
	}
};

// -------------- END ADDING STATS ----------------------------

// -------------- START SUBTRACTING STATS ----------------------------

exports.decScore = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.scores': -score,
					},
				},
				{ new: true }
			);
			const decPlayerScore = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's score decreased", decPlayerScore });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.scores': -score,
					},
				},
				{ new: true }
			);
			const decPlayerScore = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's score decreased", decPlayerScore });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a score',
		});
	}
};

exports.decAssist = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.assists': -score,
					},
				},
				{ new: true }
			);
			const decPlayerAssist = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's assist decreased", decPlayerAssist });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.scores': -score,
					},
				},
				{ new: true }
			);
			const decPlayerAssist = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's assist decreased", decPlayerAssist });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a score',
		});
	}
};

exports.decSteal = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.steal': -score,
					},
				},
				{ new: true }
			);
			const decPlayerSteal = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's steal decreased", decPlayerSteal });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.steal': -score,
					},
				},
				{ new: true }
			);
			const decPlayerSteal = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's steal decreased", decPlayerSteal });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem adding a score',
		});
	}
};

exports.decBlock = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.block': -score,
					},
				},
				{ new: true }
			);
			const decPlayerBlock = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's block decreased", decPlayerBlock });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.scores': -score,
					},
				},
				{ new: true }
			);
			const decPlayerBlock = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's block decreased", decPlayerBlock });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "There was a problem decreasing player's block",
		});
	}
};

exports.decRebound = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.rebounds': -score,
					},
				},
				{ new: true }
			);
			const decPlayerRebound = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's rebound decreased", decPlayerRebound });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.rebounds': -score,
					},
				},
				{ new: true }
			);
			const decPlayerRebound = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's rebound decreased", decPlayerRebound });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "There was a problem decreasing player's rebound",
		});
	}
};

exports.decSpike = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.spike': -score,
					},
				},
				{ new: true }
			);
			const decPlayerSpike = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's spike decreased", decPlayerSpike });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.spike': -score,
					},
				},
				{ new: true }
			);
			const decPlayerSpike = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's spike decreased", decPlayerSpike });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "There was a problem decreasing player's spike",
		});
	}
};

exports.decDig = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.digs': -score,
					},
				},
				{ new: true }
			);
			const decPlayerDig = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's digs decreased", decPlayerDig });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.digs': -score,
					},
				},
				{ new: true }
			);
			const decPlayerDig = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's digs decreased", decPlayerDig });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "There was a problem decreasing player's digs",
		});
	}
};

exports.decSaveBall = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.saveBall': -score,
					},
				},
				{ new: true }
			);
			const decPlayerSaveBall = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's save ball decreased", decPlayerSaveBall });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.saveBall': -score,
					},
				},
				{ new: true }
			);
			const decPlayerSaveBall = await decPoint.save();
			res
				.status(200)
				.json({ message: "Player's save ball decreased", decPlayerSaveBall });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "There was a problem decreasing player's save ball ",
		});
	}
};

exports.decAce = async (req, res) => {
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
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.ace': -score,
					},
				},
				{ new: true }
			);
			const decPlayerAce = await decPoint.save();
			res.status(200).json({ message: "Player's ace decreased", decPlayerAce });
		} else if (playerTeamTwo) {
			const decPoint = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.ace': -score,
					},
				},
				{ new: true }
			);
			const decPlayerAce = await decPoint.save();
			res.status(200).json({ message: "Player's ace decreased", decPlayerAce });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "There was a problem decreasing player's ace",
		});
	}
};

// -------------- END SUBTRACTING STATS ----------------------------

// -------------- START FOULS ----------------------------

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

exports.decfoul = async (req, res) => {
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
			const decFoul = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.fouls': -foul,
					},
				},
				{ new: true }
			);
			const decPlayerFoul = await decFoul.save();
			res
				.status(200)
				.send({ message: "Player's foul decreased", decPlayerFoul });
		} else if (playerTeamTwo) {
			const decFoul = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.fouls': -foul,
					},
				},
				{ new: true }
			);
			const decPlayerFoul = await decFoul.save();
			res
				.status(200)
				.send({ message: "Player's foul decreased", decPlayerFoul });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "There was a problem decreasing player's foul",
		});
	}
};

// -------------- END FOULS ----------------------------

// -------------- START YELLOW CARDS --------------------------

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

exports.decyellowcard = async (req, res) => {
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
			const decYellowCard = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamOne.players._id': req.params.id,
				},
				{
					$inc: {
						'teamOne.players.$.card.yellow': -foul,
					},
				},
				{ new: true }
			);
			const decPlayerFoul = await decYellowCard.save();
			res
				.status(200)
				.send({ message: "Player's foul decreased", decPlayerFoul });
		} else if (playerTeamTwo) {
			const decYellowCard = await LiveMatch.findOneAndUpdate(
				{
					_id: matchId,
					'teamTwo.players._id': req.params.id,
				},
				{
					$inc: {
						'teamTwo.players.$.card.yellow': -foul,
					},
				},
				{ new: true }
			);
			const decPlayerFoul = await decYellowCard.save();
			res
				.status(200)
				.send({ message: "Player's foul decreased", decPlayerFoul });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "There was a problem decreasing player's foul",
		});
	}
};

// -------------- END YELLOW CARDS ----------------------------

// -------------- START RED CARDS --------------------------

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
						'teamOne.players.$.card.red': foul,
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
						'teamTwo.players.$.card.red': foul,
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
			message: 'There was a problem adding a foul',
		});
	}
};

// exports.decredcard = async (req, res) => {
// 	try {
// 		const { foul, matchId } = req.body;

// 		const playerTeamOne = await LiveMatch.findOne({
// 			_id: matchId,
// 			'teamOne.players._id': req.params.id,
// 		});

// 		const playerTeamTwo = await LiveMatch.findOne({
// 			_id: matchId,
// 			'teamTwo.players._id': req.params.id,
// 		});

// 		if (playerTeamOne) {
// 			const decRedCard = await LiveMatch.findOneAndUpdate(
// 				{
// 					_id: matchId,
// 					'teamOne.players._id': req.params.id,
// 				},
// 				{
// 					$inc: {
// 						'teamOne.players.$.card.red': -foul,
// 					},
// 				},
// 				{ new: true }
// 			);
// 			const decPlayerFoul = await decRedCard.save();
// 			res
// 				.status(200)
// 				.send({ message: "Player's foul decreased", decPlayerFoul });
// 		} else if (playerTeamTwo) {
// 			const decRedCard = await LiveMatch.findOneAndUpdate(
// 				{
// 					_id: matchId,
// 					'teamTwo.players._id': req.params.id,
// 				},
// 				{
// 					$inc: {
// 						'teamTwo.players.$.card.red': -foul,
// 					},
// 				},
// 				{ new: true }
// 			);
// 			const decPlayerFoul = await decRedCard.save();
// 			res
// 				.status(200)
// 				.send({ message: "Added the player's foul", decPlayerFoul });
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(400).json({
// 			message: 'There was a problem adding a foul',
// 		});
// 	}
// };
// -------------- END RED CARDS --------------------------

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
				setName: 'Finish',
				isStarted: false,
				isDone: true,
			},
			{ new: true }
		);

		if (winnerMatch) {
			const winnerTeam = await winnerMatch.save();

			pusher.trigger('liveMatch', 'updated', winnerTeam);

			return res
				.status(200)
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

// -------------- START TIMER ------------------------------------

exports.startTimer = async (req, res) => {
	try {
		const currentMatch = await LiveMatch.findOne({
			_id: req.params.id,
		});

		const startMatch = await LiveMatch.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				startTime: !currentMatch.startTime,
			},
			{ new: true }
		);

		pusher.trigger('liveMatch', 'updated', startMatch);

		return res.status(200).json({
			message: 'Time!',
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem in timer',
		});
	}
};

// -------------- END TIMER --------------------------------------

// -------------- START SETTING TIME ----------------------------

exports.setTime = async (req, res) => {
	try {
		const decreaseTime = await LiveMatch.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				$inc: {
					timeGiven: -1,
				},
			},
			{ new: true }
		);
		pusher.trigger('liveMatch', 'updated', decreaseTime);

		return res.status(200).json({});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem in timer',
		});
	}
};
// -------------- END SETTING TIME ------------------------------

// -------------- START SETS -------------------------------------

exports.setSets = async (req, res) => {
	try {
		const { setName, no, teamOne, teamTwo, won, gameEvent } = req.body;
		const passedSet = { no, teamOne, teamTwo, won };

		const updateLive = await LiveMatch.findOneAndUpdate(
			{ _id: req.params.id },
			{
				startTime: false,
				setName,
				timeGiven:
					gameEvent === 'basketball'
						? 600
						: gameEvent === 'soccer'
						? 3600
						: null,
			},
			{ new: true }
		);
		const match = await MatchSets.findOne({ liveMatch: req.params.id });
		if (match) {
			const setMatch = await MatchSets.findOneAndUpdate(
				{
					liveMatch: req.params.id,
				},
				{
					$push: {
						sets: passedSet,
					},
				},
				{ new: true }
			);

			const updatedSet = await setMatch.save();
			pusher.trigger('sets', 'updated', updatedSet);
		}
		// const finishedSet = await MatchSets;

		// console.log(finishedSet);
		const updatedLive = await updateLive.save();

		pusher.trigger('liveMatch', 'updated', updatedLive);

		res.status(200).json({ message: 'Updated set', updatedLive });
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem setting a set',
		});
	}
};

exports.resetSetVolleyball = async (req, res) => {
	try {
		const { setName, no, teamOne, teamTwo, won } = req.body;
		const passedSet = { no, teamOne, teamTwo, won };

		if (won === teamOne.teamName) {
			const updateWonSet = await LiveMatch.findOneAndUpdate(
				{ _id: req.params.id },
				{ $inc: { 'teamOne.wonSets': 1 } }
			);
			pusher.trigger('liveMatch', 'updated', updateWonSet);
		}

		if (won === teamTwo.teamName) {
			const updateWonSet = await LiveMatch.findOneAndUpdate(
				{ _id: req.params.id },
				{ $inc: { 'teamTwo.wonSets': 1 } }
			);
			pusher.trigger('liveMatch', 'updated', updateWonSet);
		}

		const match = await MatchSets.findOne({ liveMatch: req.params.id });
		if (match) {
			const setMatch = await MatchSets.findOneAndUpdate(
				{
					liveMatch: req.params.id,
				},
				{
					$push: {
						sets: passedSet,
					},
				},
				{ new: true }
			);

			const updatedSet = await setMatch.save();
			// pusher.trigger('sets', 'updated', updatedSet);
		}
		const updateLive = await LiveMatch.findOneAndUpdate(
			{ _id: req.params.id },
			{
				setName,
				startTime: false,
				$set: {
					'teamOne.players.$[].scores': 0,
					'teamOne.players.$[].ace': 0,
					'teamOne.players.$[].digs': 0,
					'teamOne.players.$[].saveBall': 0,
					'teamOne.players.$[].spike': 0,
					'teamOne.players.$[].block': 0,
					'teamOne.players.$[].subtituted': false,
					'teamTwo.players.$[].scores': 0,
					'teamTwo.players.$[].ace': 0,
					'teamTwo.players.$[].digs': 0,
					'teamTwo.players.$[].saveBall': 0,
					'teamTwo.players.$[].spike': 0,
					'teamTwo.players.$[].block': 0,
					'teamTwo.players.$[].subtituted': false,
				},
			},
			{ new: true }
		);

		// const finishedSet = await MatchSets;

		// console.log(finishedSet);
		const updatedLive = await updateLive.save();
		pusher.trigger('liveMatch', 'updated', updatedLive);

		res.status(200).json({ message: 'Updated set', updatedLive });
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem setting a set',
		});
	}
};

// -------------- END SETS ---------------------------------------
