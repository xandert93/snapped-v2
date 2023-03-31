import { CardHeader } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Fragment } from 'react';
import { AvatarSkeleton, FollowButtonSkeleton } from '../../../../../components';

export const SuggestedUserListSkeleton = ({ count }) => {
  const arr = Array.from(new Array(count));

  return (
    <>
      <CardHeader
        title={<Skeleton width="12rem" animation="pulse" />}
        titleTypographyProps={{ variant: 'h4' }} // <Skeleton> infers height from 'h3'* variant
      />
      {arr.map((_, index) => (
        <Fragment key={index}>
          <UserPreviewCardSkeleton />
        </Fragment>
      ))}
    </>
  );
};

const UserPreviewCardSkeleton = () => {
  return (
    <CardHeader
      avatar={<AvatarSkeleton />}
      title={<Skeleton width="40%" />} // <Skeleton> infers height from 'body1'* variant
      subheader={<Skeleton width="60%" />} // <Skeleton> infers height from 'body2'* variant
      action={<FollowButtonSkeleton />}
    />
  );
};
