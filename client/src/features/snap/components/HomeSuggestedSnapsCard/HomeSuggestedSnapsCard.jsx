import { CardContent, Typography } from '@material-ui/core';

import { SuggestedSnaps } from '../SuggestedSnaps';
import { IlluminatedCard, Link } from '../../../../components';

export const HomeSuggestedSnapsCard = () => {
  return (
    <IlluminatedCard>
      <SuggestedSnaps />
      <CardContent>
        <Typography
          variant="body2"
          component={Link}
          /* to="/explore/snaps" */ children="View more"
        />
      </CardContent>
    </IlluminatedCard>
  );
};
