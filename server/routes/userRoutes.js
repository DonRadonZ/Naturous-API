import { Router } from 'express';
import { updateMe, deleteMe, getAllUsers, createUser, getUser, updateUser, deleteUser, getMe } from '../controllers/userController.js';
import { signup, login, forgotPassword, resetPassword, protect, updatePassword, restrictTo } from '../controllers/authController.js';


const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after the middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword)

router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);




    export default router;
