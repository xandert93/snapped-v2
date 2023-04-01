import { User } from '../models/index.js';
import { ForbiddenError, NotFoundError } from '../utils/error-types.js';

export const loadUser = async (req, res, next) => {
  const { id } = req.params;

  const foundUser = await User.findById(id);
  if (!foundUser) throw new NotFoundError('user');

  req.user = foundUser;
  next();
};

export const loadReqUser = async (req, res, next) => {
  const { userId } = req;

  const foundUser = await User.findById(userId); // 1

  req.user = foundUser;
  next();
};

export const ensureUserIdMatch = (req, res, next) => {
  const { userId } = req;
  const pUserId = req.params.id;

  if (userId !== pUserId) throw new ForbiddenError();
  else next();
};

/*
  1) Because `updateUser` currently allows *any* of the user's fields to be updated,
     I wanted to prevent against their `password` being updated on that endpoint
     using the following logic i.e. remove the password from the user document
     unless the user is hitting the `updateUserPassword` endpoint:

     const { method, path, userId } = req;

     let toRemove = ['-__v', '-password'];
      if (method === 'PATCH' && path === '/password')
        toRemove = toRemove.filter((str) => str !== '-password');

     const foundUser = await User.findById(id).select(toRemove.join(' ')); 
    
     But this didn't feel right or optimal. See how others generically updated a user doc
     while preventing against sensitive information update e.g. password, facebookId, googleId etc.
*/

/*

//***Potential write-up on "ensureIsReqUser"...

For example, say user is signed-in and on their profile page. They go to update their username.
API call is to .patch('/:userId', updateUser). In the front-end ":userId" is taken from their user state
and request is made. This is fine.

However, the need for "ensureIsReqUser" suggests that, from the front-end, a client can change the
":userId" to someone else's and as long as they've passed "ensureAuth", they will be able to change the 
other user's username. 

I just don't understand how a client can change the ":id" on which the request is made. 

UPDATE - yeah above is correct take. I think client can just use curl to make requests to any 
endpoint they want
*/
