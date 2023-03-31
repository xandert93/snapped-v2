import { Types, isValidObjectId } from 'mongoose';

export const toObjectId = Types.ObjectId;
export const isObjectId = isValidObjectId;
