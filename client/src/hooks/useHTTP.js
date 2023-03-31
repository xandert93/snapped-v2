import { useState } from 'react';
import { wait } from '../utils/helpers';

export const useHTTP = ({ request, args = [], onFetched }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const makeRequest = async () => {
    setIsLoading(true);
    setErrMessage('');

    try {
      await wait(1.2);
      const data = await request(...args);
      onFetched(data);
    } catch (err) {
      setErrMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, errMessage, makeRequest];
};

const useHTTP_old = (request, handleData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const makeRequest = async () => {
    setIsLoading(true);
    setErrMessage('');

    try {
      const data = await request();
      handleData(data);
    } catch (err) {
      setErrMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, errMessage, makeRequest];
};
