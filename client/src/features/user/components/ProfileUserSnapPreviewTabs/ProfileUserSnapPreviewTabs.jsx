import { Tab } from '@material-ui/core';
import { ImageGridIcon } from '../../../../components';
import { ProfileSnapPreviewTabs } from '../ProfileSnapPreviewTabs';

export const ProfileUserSnapPreviewTabs = () => {
  return (
    <ProfileSnapPreviewTabs value="">
      <Tab icon={<ImageGridIcon />} value="" />
    </ProfileSnapPreviewTabs>
  );
};
