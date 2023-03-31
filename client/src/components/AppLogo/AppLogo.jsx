import logo from '../../assets/images/snapped.png';

import useStyles from './styles';

export const AppLogo = (props) => {
  // const classes = useStyles();

  return <img src={logo} alt="snapped!" {...props} />;
};
