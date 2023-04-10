import { Card } from '@material-ui/core';

import { SnapCardHeader } from '../SnapCardHeader';
import { SnapCardMedia } from '../SnapCardMedia';
import { SnapCardTags } from '../SnapCardTags';
import { SnapCardActions } from '../SnapCardActions';
import { SnapCardCaption } from '../SnapCardCaption';
import { SnapCardCommentForm } from '../SnapCardCommentForm';
import { SnapCardFooter } from '../SnapCardFooter';

import { FeedSnapCardProvider } from '../../context';

import useStyles from './styles';

export const FeedSnapCard = ({ id, watchSnap }) => {
  const classes = useStyles();
  return (
    <FeedSnapCardProvider id={id}>
      <Card component="article" className={classes['feed-snap-card']} raised>
        <SnapCardHeader />
        <SnapCardMedia />
        <SnapCardTags />
        <SnapCardActions />
        <SnapCardCaption />
        <SnapCardCommentForm />
        <SnapCardFooter watchSnap={watchSnap} />
      </Card>
    </FeedSnapCardProvider>
  );
};
