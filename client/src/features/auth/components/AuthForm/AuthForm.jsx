import { Fade } from '@material-ui/core';

import { GridForm } from '../../../../components';

// props => { onSubmit, children }
export const AuthForm = (props) => {
  return (
    <Fade in timeout={500}>
      <GridForm
        id="auth-form" // so external <button type="submit" form="auth-form"> can fire it
        justifyContent="center"
        {...props}
      />
    </Fade>
  );
};
