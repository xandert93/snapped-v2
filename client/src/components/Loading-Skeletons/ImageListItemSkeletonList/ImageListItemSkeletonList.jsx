import { Fade, ImageListItem } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export const ImageListItemSkeletonList = ({ count, style }) => {
  const arr = Array.from(new Array(count));

  return arr.map((_, index) => (
    <Fade key={index} in>
      <ImageListItemSkeleton style={style} />
    </Fade>
  ));
};

const ImageListItemSkeleton = (props) => {
  return (
    <ImageListItem {...props}>
      <Skeleton variant="rect" height="100%" />
    </ImageListItem>
  );
};
