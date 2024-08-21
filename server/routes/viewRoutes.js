import { Router } from "express";
import { getLoginForm, getOverview, getTour } from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";

const router = Router();

router.use(isLoggedIn);

router.get('/', getOverview);
router.get('/tour/:slug', getTour );

// /login

router.get('/login', getLoginForm);

export default router;