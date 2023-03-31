import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';
import {
  validateName,
  validateUsername,
  validateEmail,
  validateURL,
  checkUnreserved,
} from '../utils/validators';
import { toTitleCase } from '../utils/helpers';
import { AuthError, BadReqError, NotFoundError } from '../utils/error-types';
import {
  UserFollower,
  UserFollowing,
  Snap,
  SnapComment,
  Notification,
  Basket,
  ProductReview,
} from '.';
import { createCustomer } from '../utils/stripe-utils';

const profileSubSchema = new Schema(
  {
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    dob: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    pronouns: {
      type: String,
      trim: true,
      default: '',
    },
    websiteURL: {
      type: String,
      validate: [validateURL, 'Please enter a valid website URL'],
      trim: true,
      default: '',
    },
    coverId: {
      type: String, // Cloudinary ID that FE can use to create dynamic URL for cover
      default: '',
    },
  },
  { _id: false }
);

const subscriptionSubSchema = new Schema(
  {
    name: {
      type: String,
      enum: [null, 'Basic', 'Pro'],
      default: null,
    },
    isTrialling: {
      type: Boolean,
      default: false,
    },
    //*** probably also need to add a hasUsedTrial=Bool flag eventually
    endingAt: {
      type: Date, // for an active subscription, this will naturally represent the renewal date too
      default: null,
    },
    isEnding: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const paths = {
  firstName: {
    type: String,
    maxLength: [35, 'Your first name is too long'],
    validate: [validateName, 'Please enter a valid first name'],
  },
  lastName: {
    type: String,
    maxLength: [35, 'Your last name is too long'],
    validate: [validateName, 'Please enter a valid last name'],
  },
  username: {
    type: String,
    lowercase: true,
    minLength: [6, 'Your username must comprise 6 characters'],
    maxLength: [20, 'Your username can be no longer than 20 characters'],
    validate: [
      { validator: validateUsername, message: 'Your username cannot contain special characters' },
      { validator: checkUnreserved, message: ({ path, value }) => 'Your username is forbidden' },
    ],
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    maxLength: [50, 'Your email can be no longer than 50 characters'],
    validate: [validateEmail, 'Please enter a valid email address'],
    unique: true,
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true,
    immutable: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
    immutable: true,
  },
  customerId: {
    type: String,
  },
  password: {
    type: String,
    minLength: [6, 'Your password must comprise 6 characters'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatarId: {
    type: String, // Cloudinary ID that FE can use to create dynamic URL for avatar
    default: '',
  },
  // favouritedSnaps: [{ type: Schema.Types.ObjectId, ref: 'Snap' }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: subscriptionSubSchema,
    default: () => ({}),
  },
  profile: {
    type: profileSubSchema,
    default: () => ({}), // FE expects every user to have a nested "profile" object it can use (from the very start) to determine whether the update user profile <form> has been modified or not
  },
};

/*
  Each user has a subscription (1:1) and the subscription document is very light. 
  This makes it an ideal candidate for embedding in each user document. 
  However, if I want to make subscriptions a resource, so that for example, an admin can easily query 
  how many "Pro" users they have etc, then I should create a separate collection for it
  But at the same time, this would add natural CRUD overheads e.g. when a user signs up, I'd need to create
  a `subscription` document for them, when a user deletes their account delete the `subscription` document, 
  when a user (or users) are fetched, I'd need to join the two documents using aggregation etc. While latter 
  may not sound daunting, I'd need to write code to ensure something is inserted into `foundUser` if 
  no subscription found and all those kinda cases.
*/

const reqdPathNames = ['firstName', 'lastName', 'username', 'email']; //if saving OAuth users, password isn't required

for (const pathName of reqdPathNames)
  paths[pathName].required = [true, `You must provide a ${pathName}`];

for (const key in paths) {
  if (paths[key].type === String) paths[key].trim = true;
}

const userSchema = new Schema(paths, {
  timestamps: { createdAt: true, updatedAt: false },
  strict: false, // otherwise temporary `passwordConfirm` field is removed before pre-validate hook runs (when we remove them anyway!)
});

userSchema.pre('validate', async function () {
  const { isNew, googleId, facebookId } = this; // for OAuth signup users
  const { password, passwordConfirm } = this; // for new standard sign-up users

  if (!isNew || googleId || facebookId) return; // for now, bypass their need to accept T&Cs

  if (password !== passwordConfirm) {
    throw this.invalidate('password', 'Passwords do not match');
  } else {
    this.passwordConfirm = undefined;
  }
});

userSchema.post('validate', async function (validatedUser) {
  const { firstName, lastName, password } = this;
  const { websiteURL } = this.profile;

  if (this.isModified('firstName')) this.firstName = toTitleCase(firstName);
  if (this.isModified('lastName')) this.lastName = toTitleCase(lastName);
  if (this.isModified('password')) this.password = await bcrypt.hash(password, 12);
  if (this.isModified('profile.websiteURL') && websiteURL && !websiteURL.startsWith('http')) {
    this.profile.websiteURL = 'https://' + websiteURL;
  }
});

userSchema.pre('save', async function () {
  if (!this.isNew) return;

  const { id: userId, email, firstName, lastName } = this;
  const fullName = firstName + ' ' + lastName;

  const { id: customerId } = await createCustomer({ email, name: fullName });

  const userFollowing = new UserFollowing({ userId });
  const userFollower = new UserFollower({ userId });
  const basket = new Basket({ userId, customerId });

  await Promise.all([userFollowing.save(), userFollower.save(), basket.save()]);

  this.customerId = customerId;

  /*getProfileUser looks up "userfollowings" and "userfollowers" to get followCount and followerCount.
      New user must be initialised with these, otherwise getProfileUser will be unable to return a newly created user */
});

userSchema.post('save', async function (savedUser) {
  this.password = undefined;
});

userSchema.post('remove', async function (deletedUser) {
  const userId = this.id;

  const cleanup = () =>
    Promise.all([
      Snap.deleteMany({ creatorId: userId }), // delete their snaps
      SnapComment.deleteMany({ authorId: userId }), // delete their snap comments
      UserFollower.deleteOne({ userId }), // delete follower document
      UserFollowing.deleteOne({ userId }), // delete following document
      Notification.deleteMany({ $or: [{ recipientId: userId }, { senderId: userId }] }), // delete their notifications
      ProductReview.deleteMany({ reviewerId: userId }), // delete their product reviews
    ]);

  await cleanup();
});

//MODEL'S STATIC METHODs
userSchema.statics = {
  findByCredential: async function (credentials) {
    return this.findOne(credentials).select('-password -__v');
  },

  comparePasswords: (password1, password2) => bcrypt.compare(password1, password2),

  findAggUser: async function (credentials) {
    //about 80% similar to one in "getProfileUser"... (password not removed + isFollowed/isFollowingUser obviously not needed)
    const pipeline = [
      { $match: credentials },
      { $unset: ['__v', 'googleId', 'facebookId'] },
      {
        $lookup: {
          from: 'snaps',
          let: { userId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$creatorId', '$$userId'] }, isPublic: true } },
            { $count: 'count' },
          ],
          as: 'snaps',
        },
      },
      { $set: { snaps: { $arrayElemAt: ['$snaps', 0] } } },
      { $addFields: { snapCount: { $ifNull: ['$snaps.count', 0] } } },
      { $unset: 'snaps' },
      {
        $lookup: {
          from: 'userfollowings',
          localField: '_id',
          foreignField: 'userId',
          as: 'followingDoc',
        },
      },
      { $unwind: '$followingDoc' },
      { $addFields: { followCount: { $size: '$followingDoc.followingIds' } } },
      { $unset: 'followingDoc' },
      {
        $lookup: {
          localField: '_id',
          from: 'userfollowers',
          foreignField: 'userId',
          as: 'followerDoc',
        },
      },
      { $unwind: '$followerDoc' },
      { $addFields: { followerCount: { $size: '$followerDoc.followerIds' } } },
      { $unset: 'followerDoc' },
    ];

    //does user exist?
    return this.aggregate(pipeline);
  },

  authenticate: async function (emailOrUsername, password) {
    let fieldName;
    if (validateEmail(emailOrUsername)) fieldName = 'email';
    else if (validateUsername(emailOrUsername)) fieldName = 'username';
    else throw new BadReqError('Please enter a valid username or email');

    // end-to-end test for exact match (case insensitive)
    const credentialRegex = new RegExp(`^${emailOrUsername}$`, 'i');

    // does user exist?
    const [foundUser] = await this.findAggUser({ [fieldName]: credentialRegex });
    if (!foundUser) throw new NotFoundError('account');

    // authenticate...
    const areMatching = await this.comparePasswords(password, foundUser.password);
    if (!areMatching) throw new AuthError('Invalid email and/or password');
    else {
      //authenticated! Remove unwanted credentials (foundUser is a PJO not a Mongoose doc)
      delete foundUser.password;
      return foundUser;
    }
  },

  updateSubscription: async function (customerId, subscription) {
    return this.updateOne({ customerId }, { $set: { subscription } });
  },
};

export default model('User', userSchema);
