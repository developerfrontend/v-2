import Promise from 'bluebird';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
// express helper modules
import bodyParser from 'body-parser';
import hpp from 'hpp';
import passport from 'passport';
// helpers
import { errorHandler } from '../helpers/error_handler';

// constants
import { EXPRESS } from '../env/config';

// api
import authenticateCheckRouter from '../routes/authenticate_check';
import apiRouter from '../routes/api';

export function setup (app) {
    return new Promise((resolve/*, reject*/) => {
        // port
        app.set('port', EXPRESS.PORT);

        // body parser
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        //for passport middlewares
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(expressSession({
            secret: EXPRESS.SECRET,
            resave: false,
            saveUninitialized: true,
        }));

        // passport
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(hpp());

        app.use('/', authenticateCheckRouter);
        app.use('/', apiRouter);

        app.use(errorHandler);

        app.listen(app.get('port'), () => {
            console.log('EXPRESS START ON PORT: ', app.get('port'));

            resolve();
        });
    });
}
