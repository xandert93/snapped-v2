import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectRegistrationCredential } from '../state/auth-selectors';

export const useRegistrationCredential = (name) => {
  const initialValue = useSelector(selectRegistrationCredential(name));

  const [credential, setCredential] = useState(initialValue);

  const handleChange = (e) => setCredential(e.target.value);

  return [credential, handleChange];
};
