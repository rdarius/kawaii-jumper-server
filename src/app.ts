import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';

import io from 'socket.io';

const app: express.Application = express();

app.use(express.json());
app.use(cors());

app.get('/', function (request: express.Request, response: express.Response) {
	response.json({ response: 'Hello World!' });
});

app.listen(config.port, async () => {
	await mongoose.connect(config.mongodb || 'mongodb://localhost/typescript-express-api-template', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}, (err) => {
		if (err) {
			console.log(err.message);
			console.log(err);
		}
	});
});