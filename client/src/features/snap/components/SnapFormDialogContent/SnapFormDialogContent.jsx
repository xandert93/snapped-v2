import { useMediaQuery, DialogContent } from '@material-ui/core';
import { ArrowBack, Close } from '@material-ui/icons';
import { isVPXs } from '../../../../theme/media-queries';
import { DialogHeader, DialogTitle } from '../../../../components';

import { useState } from 'react';

import { AsyncIconButton, DialogCloseButton } from '../../../ui/components';

import useStyles from './styles';

export const SnapFormDialogContent = ({ FormComponent, title, SubmitIcon }) => {
  const isXs = useMediaQuery(isVPXs);

  const [hasErr, setHasErr] = useState(false);
  const [isClean, setIsClean] = useState(true);

  return (
    <>
      <DialogHeader>
        <DialogCloseButton Icon={isXs ? ArrowBack : Close} />
        <DialogTitle children={title} />
        <AsyncIconButton
          type="submit"
          form="snap-form"
          Icon={SubmitIcon}
          size="h4"
          disabled={isClean || hasErr}
        />
        {/* <DialogSubmitButton form="snap-form" Icon={SubmitIcon} /> */}
      </DialogHeader>

      <DialogContent
        children={<FormComponent hasErr={hasErr} setHasErr={setHasErr} setIsClean={setIsClean} />}
      />
    </>
  );
};
