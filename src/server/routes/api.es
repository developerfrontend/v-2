import express from 'express';
import * as ProfileController from '../controllers/profile';

const router = express.Router();

router.get('/api/profile/:username', ProfileController.getProfile);

router.post('/api/pre_register', ProfileController.preRegister);
router.post('/api/register', ProfileController.register);

router.post('/api/pre_login', ProfileController.preLogin);
router.post('/api/login', ProfileController.login);

router.post('/api/logout', ProfileController.logout);

export default router;
