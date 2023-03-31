import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUnseenNotificationCount } from '../features/notification/state/notification-selectors';

export const useSetDocumentTitle = (pageTitle) => {
  const unseenNotifCount = useSelector(selectUnseenNotificationCount);

  useEffect(() => {
    const notifText = unseenNotifCount ? `(${unseenNotifCount})` : '';

    document.title = `snapped! ${notifText} • ${pageTitle}`;
  }, [pageTitle, unseenNotifCount]);
};
