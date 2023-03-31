import _ from 'lodash';
import cryptoRandomString from 'crypto-random-String';
import dateFns from 'date-fns';

export const toTitleCase = (str) => _.startCase(_.toLower(str));

export const genRandomString = (length) => cryptoRandomString({ length });

export const genRelativeDateStr = (date) => {
  return dateFns.formatDistance(date, Date.now(), { addSuffix: true });
};

export const genURLWithParams = (url, params) => url + '?' + new URLSearchParams(params).toString();

export const getClientOrigin = (req) => {
  const { NODE_ENV, PROTOCOL, HOST, CLIENT_PORT } = process.env;

  if (NODE_ENV !== 'production')
    return PROTOCOL + '://' + HOST + ':' + CLIENT_PORT; //e.g. http://localhost:3000
  else {
    // in production, server-client will have same origin
    const host = req.get('host'); // returns host (with port appended! (If specified))
    return req.protocol + '://' + host; //e.g. https://www.snapped.com
  }
};

export const genCountryName = (isoCode) => {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(isoCode);
};

export const numOf = (num, str) => `${num} ${str}${num === 1 ? '' : 's'}`;
