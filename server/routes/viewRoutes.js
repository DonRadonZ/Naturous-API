import { Router } from "express";
import { getLoginForm, getOverview, getTour } from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";

const router = Router();



router.get('/',isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour );

// /login

router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);

export default router;