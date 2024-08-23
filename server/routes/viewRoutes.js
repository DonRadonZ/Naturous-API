import { Router } from "express";
import { getLoginForm, getOverview, getTour, updateUserData } from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";
import { createBookingCheckout } from "../controllers/bookingController.js";
createBookingCheckout

const router = Router();



router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour );

// /login

router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);

router.post('/submit-user-data', protect,  updateUserData)

export default router;