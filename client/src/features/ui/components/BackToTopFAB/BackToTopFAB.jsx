import { useMediaQuery } from '@material-ui/core';
import { isVPMinMd } from '../../../../theme/media-queries';

import { ScrollableFAB } from '../ScrollableFAB';
import { scrollToTop } from '../../../../utils/document';
import { Icon, ArrowUpIcon } from '../../../../components';

export const BackToTopFAB = () => {
  const isMinMd = useMediaQuery(isVPMinMd);

  return (
    isMinMd && (
      <ScrollableFAB ifDown title="Go back to top" onClick={scrollToTop}>
        <Icon variant="h3" component={ArrowUpIcon} />
      </ScrollableFAB>
    )
  );
};
