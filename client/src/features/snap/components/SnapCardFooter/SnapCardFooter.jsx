import { CardContent, Typography } from '@material-ui/core';
import { Schedule as ClockIcon } from '@material-ui/icons';

import { genRelativeDateStr } from '../../../../utils/formatters/date-formatters';

import useStyles from './styles';
import { useSnap } from '../../context';

export const SnapCardFooter = ({ watchSnap }) => {
  const { createdAt } = useSnap();
  const timeAgo = genRelativeDateStr(new Date(createdAt));

  const classes = useStyles();
  return (
    <CardContent ref={watchSnap}>
      <ClockIcon color="secondary" className={classes['clock-icon']} />
      <Typography
        className={classes['clock-text']}
        variant="caption"
        component="span"
        children={timeAgo}
      />
    </CardContent>
  );
};
