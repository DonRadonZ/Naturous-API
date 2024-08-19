import { Router } from "express";
import { getLoginForm, getOverview, getTour } from "../controllers/viewController.js";

const router = Router();


router.get('/', getOverview);

router.get('/tour/:slug',getTour );

// /login

router.get('/login', getLoginForm);

export default router;