import { useLocation } from 'react-router';
import { getURLParams } from '../utils/formatters/location-formatters';

export const useURLParams = () => {
  const queryString = useLocation().search;
  const params = getURLParams(queryString);

  return params; //e.g. => { userId: '001', authCode: '123456789' }
};
