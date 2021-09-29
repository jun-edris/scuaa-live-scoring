const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { pusher } = require('./../../util');
const Schedule = require('./../../models/schedule');
const Team = require('./../../models/team');

const app = express();
app.use(cors());

exports.getallschedule = async (req, res) => {
	try {
		const schedule = await Schedule.find({
			isDone: false,
			isStarted: false,
		}).sort([['date', 1]]);
		res.status(200).json(schedule);
	} catch (error) {
		res.status(404).json({
			message: 'No schedules found',
		});
	}
};

exports.getNumberOfSchedule = async (req, res) => {
	try {
		const sched = await Schedule.countDocuments({
			isDone: false,
			isStarted: false,
		});
		res.status(200).json(sched);
	} catch (error) {
		res.status(404).json({
			message: 'No teams found',
		});
	}
};

exports.getallschedulebyuser = async (req, res) => {
	try {
		const { sub } = req.user;
		const schedule = await Schedule.find({ user: sub, isDone: false });

		res.status(200).json(schedule);
	} catch (error) {
		res.status(404).json({
			message: 'No schedules found',
		});
	}
};

exports.createschedule = async (req, res) => {
	try {
		const { sub, gameEvent } = req.user;
		const { date, teamOne, teamTwo } = req.body;

		const dataFirstTeam = await Team.findById({
			_id: mongoose.Types.ObjectId(teamOne),
		});
		const dataSecondTeam = await Team.findById({
			_id: mongoose.Types.ObjectId(teamTwo),
		});

		if (dataFirstTeam === dataSecondTeam) {
			return res.status(400).send({ message: 'Cannot match the same team!' });
		}

		const existingSchedule = await Schedule.findOne({
			teamOne: dataFirstTeam || dataSecondTeam,
			teamTwo: dataFirstTeam || dataSecondTeam,
			gameEvent: gameEvent,
			isDone: false,
			date: date,
		});

		if (existingSchedule) {
			return res.status(400).send({ message: 'Schedule is already exist!' });
		}

		const scheduleData = {
			date,
			teamOne: dataFirstTeam,
			teamTwo: dataSecondTeam,
		};

		const schedule = Object.assign({}, scheduleData, {
			user: sub,
			gameEvent: gameEvent,
		});

		const newSchedule = new Schedule(schedule);
		await newSchedule.save();

		pusher.trigger('schedule', 'created', newSchedule);
		return res.status(201).json({
			message: 'A new schedule has been created!',
		});
	} catch (error) {
		res.status(400).json({
			message: 'Something went wrong!',
		});
	}
};

exports.updateschedule = async (req, res) => {
	try {
		const { date, teamOne, teamTwo } = req.body;

		if (teamOne === teamTwo) {
			return res.status(400).json({
				message: 'Must not be the same team',
			});
		}

		const dataFirstTeam = await Team.findById({
			_id: mongoose.Types.ObjectId(teamOne),
		});
		const dataSecondTeam = await Team.findById({
			_id: mongoose.Types.ObjectId(teamTwo),
		});

		const updatedSchedule = await Schedule.findByIdAndUpdate(
			req.params.id,
			{
				date: date,
				teamOne: dataFirstTeam,
				teamTwo: dataSecondTeam,
			},
			{ new: true }
		);

		pusher.trigger('schedule', 'updated', updatedSchedule);
		return res.status(200).json({
			message: 'Schedule updated!',
		});
	} catch (error) {
		console.log('sayup');
		res.status(400).json({
			message: 'Something went wrong',
		});
	}
};

exports.doneMatch = async (req, res) => {
	try {
		const doneSched = await Schedule.findByIdAndUpdate(
			req.params.id,
			{
				isDone: true,
				isStarted: false,
			},
			{ new: true }
		);

		return res.status(200).json({
			message: 'Schedule updated!',
		});

		// console.log(doneSched);
		// pusher.trigger('schedule', 'updated', doneSched);
	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: 'Something went wrong' });
	}
};

exports.startedmatch = async (req, res) => {
	try {
		const startMatch = await Schedule.findByIdAndUpdate(
			req.params.id,
			{
				isStarted: true,
			},
			{ new: true }
		);
		pusher.trigger('schedule', 'updated', startMatch);
	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: 'Something went wrong' });
	}
};

exports.deletematch = async (req, res) => {
	try {
		const deletedSchedule = await Schedule.findById(req.params.id);
		await Schedule.findByIdAndDelete(req.params.id);

		pusher.trigger('schedule', 'deleted', deletedSchedule);
		return res.status(200).json({
			message: 'Schedule deleted!',
		});
	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: 'Something went wrong' });
	}
};

exports.deleteallmatch = async (req, res) => {
	try {
		const { sub } = req.user;
		const deletedSchedules = await Schedule.find({ user: sub, isDone: false });
		await Schedule.deleteMany({ user: sub, isDone: false });

		pusher.trigger('schedule', 'deleted-all-by-user', deletedSchedules);
		return res.status(200).json({
			message: 'Schedule deleted!',
		});
	} catch (err) {
		return res.status(400).json({
			message: 'Something went wrong!',
		});
	}
};
