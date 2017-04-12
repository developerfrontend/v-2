import express from 'express';
import path from 'path';
import fileExists from 'file-exists';
import { EXPRESS } from '../env/config';

const router = express.Router();

// __dirname === '~/victoria-v2.0/build/server/routes'
router.get('*', (req, res, next) => {
    const originalUrl = req.originalUrl;

    if (originalUrl && originalUrl.includes(EXPRESS.API)) {
        next();
    } else {
        const pathToFile = path.join(__dirname, `../../client/${originalUrl}`);

        if (!fileExists(pathToFile) && originalUrl !== '/') {
            res.redirect('/');
        } else {
            res.sendFile(pathToFile);
        }
    }
});

export default router;
