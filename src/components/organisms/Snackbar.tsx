import { Snackbar as Flash } from '@mui/material';
import { memo, VFC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useSize } from '../../hooks/index';
import { snackbarMessage, snackbarState } from '../../store/index';

export const Snackbar: VFC = memo(() => {
  const [open, setOpen] = useRecoilState(snackbarState);
  const message = useRecoilValue(snackbarMessage);
  const { isMobile } = useSize();

  const hide = () => {
    setOpen(false);
  };

  return (
    <div>
      <Flash
        anchorOrigin={
          isMobile
            ? { vertical: 'bottom', horizontal: 'center' }
            : { vertical: 'top', horizontal: 'right' }
        }
        open={open}
        onClose={hide}
        message={message}
      />
    </div>
  );
});
