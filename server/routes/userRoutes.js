import { Router } from 'express';
import { updateMe, deleteMe, getAllUsers, createUser, getUser, updateUser, deleteUser, getMe, uploadUserPhoto, resizeUserPhoto } from '../controllers/userController.js';
import { signup, login, forgotPassword, resetPassword, updatePassword, restrictTo, protect, logout } from '../controllers/authController.js';



const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after the middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword)

router.get('/me', getMe, getUser);
router.patch('/updateMe', 
    uploadUserPhoto,
    resizeUserPhoto,
    updateMe);
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
