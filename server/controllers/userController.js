import multer, { memoryStorage } from 'multer';
import sharp from 'sharp';

import User from '../models/userModel.js';

import AppError from '../utils/appError.js';
import catchAsync from './../utils/catchAsync.js';

import {getOne, updateOne, deleteOne, getAll} from './handlerFactory.js'



// const multerStorage = diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         // user-765426544234526fgd.jpeg
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// });

const multerStorage = memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), flase)
    }
}

const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter
});

export const uploadUserPhoto = upload.single('photo')

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    
    req.file.filename = 
    `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

    next();
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });  
    return newObj;
}

export const getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
if(req.body.password || req.body.passwordConfirm){
    return next(new AppError('This route is not for password updates. Please use /updatedMyPassword', 400))
}

  // 2) Filtered out unwanted fields names that are not to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });
  

  res.status(200).json({
    status: 'success',
    data: {
        user: updatedUser
    }
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
        status: 'success',
        data: null
    })
})



export function createUser(req,res) {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined! Please use /signup instead'
    });
}

export const getAllUsers = getAll(User);

export function getUser() {
    getOne(User);
}

export function updateUser() {
    factory.updateOne(User);
}

export function deleteUser() {
    factory.deleteOne(User);
}

