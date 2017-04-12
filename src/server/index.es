import express from 'express';
import Promise from 'bluebird';
import CLC from 'cli-color';

// server middleware
import { setup as setupExpress } from './middleware/express';
import { setup as setupMongo } from './middleware/mongo';

const app = express();

export function start (setupServer = () => Promise.resolve()) {
    Promise.all([
        setupServer(app),
        setupExpress(app),
        setupMongo(app),
    ]).then(() => {
        console.log(CLC.yellow('SERVER STARTED.'));
    });
}
