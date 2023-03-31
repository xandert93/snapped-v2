import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Tab } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { selectAuthUserUsername } from '../../state/user-selectors';

import { ImageGridIcon, PrivateIcon, PublicIcon } from '../../../../components';
import { ProfileSnapPreviewTabs } from '../ProfileSnapPreviewTabs';
import { useUpdateEffect } from '../../../../hooks';

export const AuthUserSnapPreviewTabs = () => {
  const initialPathname = useParams().tab || '';
  const [pathname, setPathname] = useState(initialPathname);
  const history = useHistory();

  const username = useSelector(selectAuthUserUsername);

  const handleTabChange = (e, value) => {
    setPathname(value);
  };

  useUpdateEffect(() => {
    history.push(`/${username}/${pathname}`);
  }, [pathname]);

  return (
    <ProfileSnapPreviewTabs value={pathname} onChange={handleTabChange}>
      <Tab icon={<PublicIcon />} value="" />
      <Tab icon={<PrivateIcon />} value="private" />
      <Tab icon={<ImageGridIcon />} value="all" disabled />
    </ProfileSnapPreviewTabs>
  );
};
