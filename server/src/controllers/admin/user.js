const express = require('express');
const cors = require('cors');
const { pusher } = require('./../../util');
const User = require('./../../models/user');
const { hashPassword } = require('./../../util');

const app = express();
app.use(cors());

exports.getallusers = async (req, res) => {
	try {
		const users = await User.find({ role: ['facilitator', 'student'] }).select(
			'_id firstName lastName email gameEvent role'
		);
		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({ message: 'No users' });
	}
};

exports.getAllFacilitator = async (req, res) => {
	try {
		const users = await User.find({ role: 'facilitator' }).select(
			'_id firstName lastName email gameEvent role'
		);

		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({ message: 'No users' });
	}
};

exports.signup = async (req, res) => {
	try {
		const { email, firstName, lastName, role } = req.body;

		const hashedPassword = await hashPassword(req.body.password);

		const userData = {
			email: email.toLowerCase(),
			firstName,
			lastName,
			password: hashedPassword,
			role,
		};

		const existingEmail = await User.findOne({
			email: userData.email,
		}).lean();

		if (existingEmail) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		const newUser = new User(userData);
		const savedUser = await newUser.save();

		if (savedUser) {
			pusher.trigger('users', 'created', {
				_id: savedUser._id,
				email: savedUser.email,
				firstName: savedUser.firstName,
				lastName: savedUser.lastName,
				role: savedUser.role,
			});

			return res.status(201).json({
				message: 'Registered successfully',
			});
		} else {
			return res.status(400).json({
				message: 'There was a problem creating your account',
			});
		}
	} catch (error) {
		res.status(400).json({
			message: 'There was a problem creating your account',
		});
	}
};

exports.signupFacilitator = async (req, res) => {
	try {
		const { email, firstName, lastName, role, gameEvent } = req.body;

		const hashedPassword = await hashPassword(req.body.password);

		const userData = {
			email: email.toLowerCase(),
			firstName,
			lastName,
			password: hashedPassword,
			role,
			gameEvent,
		};

		const existingEmail = await User.findOne({
			email: userData.email,
		}).lean();

		if (existingEmail) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		const newUserData = {
			email,
			firstName,
			lastName,
			password: hashedPassword,
			role,
			gameEvent,
		};

		const newUser = new User(newUserData);
		const savedUser = await newUser.save();

		if (savedUser) {
			const sendData = {
				email: savedUser.email,
				firstName: savedUser.firstName,
				lastName: savedUser.lastName,
				role: savedUser.role,
				gameEvent: savedUser.gameEvent,
			};
			pusher.trigger('users', 'created', sendData);
			return res.status(201).json({
				message: 'Registered successfully',
			});
		} else {
			return res.status(400).json({
				message: 'There was a problem creating your account',
			});
		}
	} catch (error) {
		res.status(400).json({
			message: 'There was a problem creating your account',
		});
	}
};

exports.updateuser = async (req, res) => {
	try {
		const { firstName, lastName, email } = req.body;

		const updatedUser = await User.findByIdAndUpdate(req.params.id, {
			firstName,
			lastName,
			email,
		});

		pusher.trigger('users', 'updated', updatedUser);
		res.status(200).send({
			message: 'A user is successfully updated!',
		});
	} catch (error) {
		res.status(400).send({ message: 'Something went wrong' });
	}
};

exports.updatefacilitator = async (req, res) => {
	try {
		const { firstName, lastName, email, gameEvent } = req.body;
		const updatedFacilitator = await User.findByIdAndUpdate(req.params.id, {
			firstName,
			lastName,
			email,
			gameEvent,
		});

		pusher.trigger('users', 'updated-facilitator', updatedFacilitator);
		res.status(200).send({
			message: 'A user is successfully updated!',
		});
	} catch (error) {
		res.status(400).send({ message: 'Something went wrong' });
	}
};

exports.deleteuser = async (req, res) => {
	try {
		const deletedUser = await User.findById(req.params.id);
		await User.findByIdAndDelete(req.params.id);

		pusher.trigger('users', 'deleted-user', deletedUser);
		res.status(200).send({
			message: 'A user is successfully deleted!',
		});
	} catch (error) {
		res.status(400).json({
			message: 'Something went wrong.',
		});
	}
};

exports.deletealluser = async (req, res) => {
	try {
		const { sub } = req.user;

		const deletedUsers = await User.find({ _id: { $ne: sub } });
		await User.deleteMany({ _id: { $ne: sub } });

		pusher.trigger('users', 'deleted-all-user', deletedUsers);
		res.status(200).send({
			message: 'All users are successfully deleted!',
		});
	} catch (error) {
		res.status(400).json({
			message: 'Something went wrong.',
		});
	}
};
