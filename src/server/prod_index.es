// THIS FILE WILL BE USED FOR PRODUCTION SERVER CONFIGURATION

import { start } from './index';

// static router
import staticsRouter from './routes/static';

start((app) => {
    app.use('/', staticsRouter);
});
