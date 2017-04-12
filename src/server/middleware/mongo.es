import Promise from 'bluebird';
import mongoose from 'mongoose';

// constants
import { MONGO } from '../env/config';

mongoose.Promise = Promise;
// module local variable
let mongo = null;

export function setup (/*app*/) {
    return new Promise((resolve, reject) => {

        if (mongo) {
            mongoose.connection.close();
            mongo = null;
        }

        mongoose.connection.once('open', () => {
            console.log('\nCONNECTED TO MONGO\n');

            mongo = mongoose.connection;
            resolve();
        });

        mongoose.connection.on('error', (err) => {
            if (err) {
                console.error(err);
            }

            reject();
        });

        mongoose.connect(MONGO.URI, MONGO.OPTIONS);
    });
}
