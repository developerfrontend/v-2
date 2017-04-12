import morgan from 'morgan';
import mongoose from 'mongoose';
import CLC from 'cli-color';

export function setup (app) {
    // AN INITIAL DEV MOCK SHOULD BE HERE
    mongoose.set('debug', (collection, method, query, doc) => {
        const time = (new Date()).toTimeString();

        console.log(CLC.blue(`${time} DEBUG: `, collection, method, JSON.stringify(query), JSON.stringify(doc)));
    });

    app.use(morgan('combined'));
}
