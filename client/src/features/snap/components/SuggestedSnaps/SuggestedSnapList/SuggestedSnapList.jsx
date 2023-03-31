import { Box, CardHeader, Fade, ImageList, ImageListItem } from '@material-ui/core';

import { SnapPreviewImage } from '../../SnapPreviewImage';

export const SuggestedSnapList = ({ snaps }) => {
  return (
    <Fade in>
      <Box>
        <CardHeader
          title="Might interest you ✨"
          titleTypographyProps={{ component: 'h2', variant: 'h6' }}
        />
        <ImageList rowHeight={120} cols={3} gap={2}>
          {snaps.map((snap) => (
            <ImageListItem key={snap._id}>
              <SnapPreviewImage snap={snap} hover />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Fade>
  );
};
