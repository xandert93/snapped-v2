import { Grid, useMediaQuery } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { DIALOGS, DROPDOWNS } from '../../../../../constants/modal-constants';

import { isVPMinLg, isVPMinMd, isVPXl, isVPXs } from '../../../../../theme/media-queries';

import { NotificationIconBadge } from '../../../../notification/components';
import { useMediaQueries } from '../../../../../hooks';

import { genProfilePath } from '../../../../../utils/routing-utils';
import {
  DropDownIcon,
  IconButton,
  Link,
  MessengerIcon,
  ShopIcon,
  Tooltip,
} from '../../../../../components';
import { DropDownManagerButton } from '../../DropDownManagerButton';
import { selectAuthUserUsername } from '../../../../user/state/user-selectors';
import { PATHS } from '../../../../../constants/routing-constants';
import { AuthUserAvatar } from '../../../../user/components';

import { ProfileChip } from '../ProfileChip';
import { openDialog } from '../../../state/ui-slice';
import { forwardRef } from 'react';

export const TopNavigationActions = () => {
  const [isXs, isMinMd, isMinLg, isXl] = useMediaQueries(isVPXs, isVPMinMd, isVPMinLg, isVPXl);

  const username = useSelector(selectAuthUserUsername);

  return (
    <>
      {isMinMd && (
        <Grid item component={Link} to={genProfilePath(username)}>
          <Tooltip title="See your Profile">
            {isXl ? <ProfileChip /> : <AuthUserAvatar fontSize={25.7} border hover />}
          </Tooltip>
        </Grid>
      )}
      <Grid item>
        <Tooltip title="See Notifications">
          <NotificationsButton children={<NotificationIconBadge />} />
        </Tooltip>
      </Grid>

      <Grid item>
        <Tooltip title="See Chats">
          <DropDownManagerButton id={''} children={<MessengerIcon />} />
        </Tooltip>
      </Grid>

      {isMinLg && (
        <>
          {/* <Grid item component={Link} to={PATHS.SHOP}>
            <Tooltip title="Visit Store">
              <IconButton children={<ShopIcon />} />
            </Tooltip>
          </Grid> */}
          <Grid item>
            <Tooltip title="Account">
              <DropDownManagerButton id={DROPDOWNS.ACCOUNT} children={<DropDownIcon />} />
            </Tooltip>
          </Grid>
        </>
      )}
    </>
  );
};

const NotificationsButton = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const isXs = useMediaQuery(isVPXs);

  const handleIconButtonClick = () => dispatch(openDialog(DIALOGS.NOTIFICATIONS));

  return !isXs ? (
    <DropDownManagerButton id={DROPDOWNS.NOTIFICATIONS} ref={ref} {...props} />
  ) : (
    <IconButton onClick={handleIconButtonClick} ref={ref} {...props} />
  );
});
