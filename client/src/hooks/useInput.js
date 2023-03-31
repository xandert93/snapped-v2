import { useState } from 'react';

export const useInput = (initialValue = '', validator) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => setValue(e.target.value);

  return {
    value,
    onChange: handleChange,
    ...(validator && getValidationProps(validator, value)),
  };
};

function getValidationProps(validator, value) {
  const isValid = !value ? true : validator(value);

  return {
    isValid,
    error: !isValid, // to accomodate MUI <TextField> 'error' prop}
  };
}
