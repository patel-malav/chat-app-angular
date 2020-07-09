import express from 'express';
import { body, validationResult } from 'express-validator';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import user from '../models/users.js';

const router = express.Router();

router.route('/login').post(
  body(['email', 'password'])
    .exists()
    .withMessage('should not be empty')
    .bail(),
  body('email')
    .isLength({ min: 3, max: 256 })
    .withMessage('should be 3-256 char long')
    .if(
      body('password')
        .isLength({ min: 8, max: 256 })
        .withMessage('Invalid Password Length')
    )
    .bail()
    .isEmail()
    .withMessage('Not a appropriate eamil')
    .bail()
    .custom(async (value, { req }) => {
      const userExist = await user.findOne({ email: req.body.email }).exec();
      if (userExist && userExist.toObject().password === req.body.password) {
        return true;
      } else {
        throw new Error('Email or Password Invaild');
      }
    }),
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(442).json({ errors: errors.array() });
    }
    try {
      const savedUser = await user.findOne().exec();
      if (savedUser) {
        return resp.json(savedUser.toJSON());
      } else {
        return resp.json({
          errors: [{ msg: 'no user', location: req.url }],
        });
      }
    } catch (err) {
      return resp
        .status(500)
        .json({ errors: [{ msg: 'database error', location: req.url }] });
    }
  }
);

router.route('/register').post(
  body(['name', 'email', 'password'])
    .exists()
    .withMessage('should not be empty')
    .bail(),
  body('name')
    .isLength({ min: 3, max: 128 })
    .withMessage('should be 5-128 char long'),
  body('password')
    .isLength({ min: 8, max: 256 })
    .withMessage('Invalid Password Length')
    .bail(),
  body('email')
    .isLength({ min: 3, max: 256 })
    .withMessage('should be 3-256 char long')
    .bail()
    .isEmail()
    .withMessage('Not a appropirate email')
    .bail()
    .custom(async (email: string) => {
      const userExist = await user.findOne({ email });
      if (userExist) {
        throw new Error('Email already registered');
      }
      return true;
    }),
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(442).json({ errors: errors.array() });
    }
    try {
      const newUser = await new user({ ...req.body }).save();
      return resp.json(newUser.toJSON());
    } catch (err) {
      console.log(err);
      return resp
        .status(500)
        .json({ errors: [{ msg: 'database error', location: req.url }] });
    }
  }
);

export default router;
