import { isVPMaxMd, isVPMaxSm } from '../../../../theme/media-queries';

import { BottomNavigation } from './BottomNavigation';
import { TopNavigation } from '../TopNavigation';
import { SideNavigation } from '../SideNavigation';
import { useMediaQueries } from '../../../../hooks';

export const Navigation = () => {
  const [isMaxSm, isMaxMd] = useMediaQueries(isVPMaxSm, isVPMaxMd);

  return (
    <>
      <TopNavigation />
      {isMaxMd && <SideNavigation />}
      {isMaxSm && <BottomNavigation />}
    </>
  );
};
