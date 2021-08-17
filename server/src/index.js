-require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// routes
const loginRoute = require('./routes/login');
const adminRoute = require('./routes/admin');
const facilitatorRoute = require('./routes/facilitator');

const app = express();

// use
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', loginRoute);
app.use('/api', adminRoute);
app.use('/api', facilitatorRoute);

const db = mongoose.connection;

mongoose
	.connect(process.env.ATLAS_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		const liveMatchCollection = db.collection('live-matches');
		const liveStream = liveMatchCollection.watch({
			fullDocument: 'updateLookup',
		});

		liveStream.on('change', (change) => {
			if (change.operationType === 'update') {
				const liveDetails = change.fullDocument;
				pusher.trigger('liveMatch', 'updated', liveDetails);
			}
		});

		app.listen(process.env.PORT, () => {
			console.log(`API listening on localhost:${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err.message);
	});
