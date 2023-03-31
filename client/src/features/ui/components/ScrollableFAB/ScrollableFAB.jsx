import { useSelector } from 'react-redux';

import { Box, Fab, Zoom } from '@material-ui/core';
import { Tooltip, GradientButton } from '../../../../components';
import { selectIsScrolledDown } from '../../state/ui-selectors';
import useStyles from './styles';

export const ScrollableFAB = ({ ifDown, title, children, ...props }) => {
  const isScrolledDown = useSelector(selectIsScrolledDown);

  const classes = useStyles();
  return (
    <Zoom in={ifDown ? isScrolledDown : !isScrolledDown} timeout={{ enter: 800, exit: 200 }}>
      <Box className={classes['fab-container'] + ' mui-fixed'} {...props}>
        <Tooltip title={title}>
          <Fab component={GradientButton} children={children} />
        </Tooltip>
      </Box>
    </Zoom>
  );
};
