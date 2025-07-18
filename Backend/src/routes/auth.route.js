import express from 'express';
import { login, logout, signup, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/onboarding',protectRoute, onboard);  //protect route is an middleware because we dont need anyone can access this page
//create under middlewares

// check if user is logged in
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});




export default router; 