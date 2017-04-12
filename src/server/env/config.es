export const EXPRESS = {
    HOST: 'localhost',
    PORT: 8081,
    API: 'api',
    SECRET: 'KEXyOYQQr8CbQr8uJsVEfAHQtqJhB78n',
};

export const statusCodes = {
    'status500': 500,
};

export const PRE_REGISTER_TIME_OUT = 10000;
export const PRE_LOGIN_TIME_OUT = 10000;
export const MAX_NUMBER_OF_PRE_REGISTRED = 100;
export const MAX_NUMBER_OF_PRE_LOGINED = 100;
export const INTERNAL_SERVER_KEY = 'soVkvMCWd31GILEHfMoXlOqNIdg5NGvK';

// local constants
const DB = 'victoria-v2';
const HOST = 'localhost';
const PORT = 27017;

export const MONGO = {
    DB,
    HOST,
    PORT,
    URI: `mongodb://${HOST}:${PORT}/${DB}`,
    OPTIONS: {/* safe: true - default to true*/},
};
