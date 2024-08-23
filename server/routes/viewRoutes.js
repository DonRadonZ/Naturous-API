import { Router } from "express";
import { getLoginForm, getOverview, getTour, updateUserData } from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";

const router = Router();



router.get('/',isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour );

// /login

router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);

router.post('/submit-user-data', protect,  updateUserData)

export default router;