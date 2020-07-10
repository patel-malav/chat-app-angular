import { Router } from 'express';
import faker from 'faker';
import { body, param, validationResult } from 'express-validator';
import User from '../models/users';

import { InternalServerError } from '../errors';

const router = Router();

router.route('/').get(async (req, resp) => {
  const allUsers = await User.find().select('-messages -password').exec();
  return resp.json(allUsers);
});

router.route('/generatefakeuser').post(async (req, resp) => {
  const name = faker.name.firstName();
  const email = faker.internet.email(name);
  const password = faker.internet.password(12, false);
  const age = faker.random.number({ min: 13, max: 100 });
  const image = faker.image.people(240, 240);
  const fakeUser = await new User({ name, email, password, age, image }).save();
  return resp.json(fakeUser.toJSON());
});

router
  .route('/:userId/messages')
  .get(
    param('userId').isMongoId().withMessage('Invalid Id'),
    async (req, resp) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.status(422).json(errors.array());
      }
      try {
        const user = await User.findOne({ _id: req.params.userId });
        if (user) {
          return resp.json(user.toJSON());
        } else {
          throw new Error('User not Found');
        }
      } catch (err) {
        console.log(err);
        return resp.status(500).json(InternalServerError({ url: req.url }));
      }
    }
  )
  .post(
    param('userId').isMongoId().withMessage('Invalid Id'),
    body('messages')
      .exists()
      .withMessage('must send messages')
      .bail()
      .isArray()
      .withMessage('SEND ONLY STRINGS')
      .bail(),
    async (req, resp) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.status(422).json(errors.array());
      }
      try {
        const user = await User.findOne({
          _id: req.params.userId,
        }).exec();
        if (user) {
          req.body.messages.forEach((message: string) =>
            // @ts-ignore
            user.messages.push({ message, sender: 'user' })
          );
          // @ts-ignore
          user.messages.push({
            message: faker.lorem.sentence(),
            sender: 'admin',
          });
          // @ts-ignore
          const fakeResp = [...user.messages].pop();
          const completed = await user.save();
          if (completed) {
            return resp.json(fakeResp.toJSON());
          } else {
            throw new Error('Saved user was empty');
          }
        } else {
          throw new Error('User not Found');
        }
      } catch (err) {
        console.log(err);
        return resp.status(500).json(InternalServerError({ url: req.url }));
      }
    }
  );

export default router;
