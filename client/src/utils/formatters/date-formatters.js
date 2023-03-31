import { format, formatDistanceToNowStrict } from 'date-fns';

export const genRelativeDateStr = (date) => formatDistanceToNowStrict(date, { addSuffix: true });

export const genAgeStr = (date) => `${formatDistanceToNowStrict(date)} old`;

export const genDateAndTimeStr = (date) => format(date, 'PPPp');
