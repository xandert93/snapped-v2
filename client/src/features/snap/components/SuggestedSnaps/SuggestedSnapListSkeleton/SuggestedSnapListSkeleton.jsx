import { CardHeader, ImageList } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ImageListItemSkeletonList } from '../../../../../components';

export const SuggestedSnapListSkeleton = ({ count }) => {
  return (
    <>
      <CardHeader
        title={<Skeleton width="12rem" animation="pulse" />}
        titleTypographyProps={{ variant: 'h4' }}
      />
      <ImageList rowHeight={120} cols={3} gap={2}>
        <ImageListItemSkeletonList count={count} />
      </ImageList>
    </>
  );
};
