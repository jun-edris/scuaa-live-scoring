const express = require('express');
const cors = require('cors');
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const jwtDecode = require('jwt-decode');
const app = express();

const { createToken, verifyPassword, hashPassword } = require('../util');
app.use(cors());
app.use(cookieParser());

exports.signin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({
			email,
		}).lean();

		if (!user) {
			return res.status(400).json({
				message: 'Wrong email or password.',
			});
		}

		const passwordValid = await verifyPassword(password, user.password);

		if (passwordValid) {
			const { password, ...rest } = user;
			const userInfo = Object.assign({}, { ...rest });

			const token = createToken(userInfo);

			const decodedToken = jwtDecode(token);
			const expiresAt = decodedToken.exp;

			res.cookie('token', token, {
				httpOnly: true,
			});

			res.json({
				message: 'Authentication successful!',
				token,
				userInfo,
				expiresAt,
			});
		} else {
			res.status(403).json({
				message: 'Wrong email or password.',
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: 'Something went wrong.' });
	}
};

exports.logout = (req, res) => {
	try {
		res.clearCookie('token', {
			httpOnly: true,
		});
		res
			.status(200)
			.json({ success: true, message: 'User logged out successfully' });
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong!' });
	}
};

exports.changepassword = async (req, res) => {
	try {
		const { sub } = req.user;

		const { email, oldPassword, newPassword } = req.body;

		const user = await User.findOne({
			email,
		}).lean();

		if (!user) {
			return res.status(400).json({
				message: 'No existing account.',
			});
		}

		const passwordValid = await verifyPassword(oldPassword, user.password);
		if (!passwordValid) {
			return res.status(400).json({
				message: 'Password is not match.',
			});
		}

		if (oldPassword === newPassword) {
			return res.status(400).json({
				message: 'New password must not be the same as old password.',
			});
		}

		if (passwordValid) {
			const passed = await hashPassword(newPassword);
			await User.findByIdAndUpdate(sub, { password: passed });

			return res.status(200).json({
				message: 'Password changed successfully',
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'There was a problem creating your account',
		});
	}
};
