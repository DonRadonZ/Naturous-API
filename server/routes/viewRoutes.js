import { Router } from "express";
import { getOverview, getTour } from "../controllers/viewController";

const router = Router();


router.get('/', getOverview);

router.get('/tour/:slug',getTour );

export default router;