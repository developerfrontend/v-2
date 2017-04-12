import superagent from 'superagent';

// shared
import log from 'log';
import config from 'config';

// webpack should proxy all requests to server
const EXPRESS = config.get('EXPRESS');

export function get (api, body = {}) {
    return new Promise((resolve, reject) => {
        superagent
            .get(`http://${EXPRESS.HOST}:${EXPRESS.PORT}/${api}`)
            .send(body)
            .end((error, response) => {
                if (error) {
                    log.error(`Http.get error: ${JSON.stringify(error)}`);
                    reject(error);
                } else {
                    log.debug(`Http.get statusCode: ${response.statusCode}`);
                    resolve(response.body);
                }
            });
    });
}

export function post (api, body = {}) {
    return new Promise((resolve, reject) => {
        superagent
            .post(`http://${EXPRESS.HOST}:${EXPRESS.PORT}/${api}`)
            .send(body)
            .end((error, response) => {
                if (error) {
                    log.error(`Http.post error: ${JSON.stringify(error)}`);
                    reject(error);
                } else {
                    log.debug(`Http.post statusCode: ${response.statusCode}`);
                    resolve(response.body);
                }
            });
    });
}
