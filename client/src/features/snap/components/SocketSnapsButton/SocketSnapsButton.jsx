import { Fade } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { scrollToTop } from '../../../../utils/document';
import { pullSocketSnaps, selectSocketSnapCount } from '../../state';

import { RoundedButton } from '../../../../components';

import useStyles from './styles';

export const SocketSnapsButton = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectSocketSnapCount);

  const handleClick = (e) => dispatch(pullSocketSnaps());

  const classes = useStyles();
  return (
    <Fade
      in={Boolean(count)}
      timeout={{ enter: 1000, exit: 500 }}
      mountOnEnter
      unmountOnExit
      onExiting={scrollToTop}>
      <RoundedButton
        className={classes['socket-snaps-button']}
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClick}>
        Show {count} more
      </RoundedButton>
    </Fade>
  );
};

// was jarring with <Slide>, so used <Fade> instead
