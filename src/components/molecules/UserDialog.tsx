import { VFC, memo, useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button, TextField } from '@mui/material';

import { useSize } from '../../hooks/index';
import { User } from '../../types/index';
import { adminState } from '../../store/index';
import { useRecoilValue } from 'recoil';

type Props = {
  closeDialog: () => void;
  dialog: boolean;
  user: User;
};

export const UserDialog: VFC<Props> = memo((props) => {
  const { closeDialog, dialog, user } = props;
  const { isMobile } = useSize();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);

  const isAdmin = useRecoilValue(adminState);

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 10 },
      }}
      fullScreen={isMobile}
      onClose={closeDialog}
      open={dialog}
    >
      <DialogTitle>
        <Typography fontWeight="bold">ユーザー詳細</Typography>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 3 }} dividers>
        <DialogContentText variant="caption" fontWeight="bold">
          ユーザー名
        </DialogContentText>
        <TextField
          fullWidth
          sx={{ minWidth: 300 }}
          color="dark"
          size="small"
          value={name}
          InputProps={{
            readOnly: isAdmin ? false : true,
          }}
          onChange={(event) => setName(event.target.value)}
        />
        <DialogContentText variant="caption" fontWeight="bold" sx={{ mt: 2 }}>
          メールアドレス
        </DialogContentText>
        <TextField
          fullWidth
          sx={{ minWidth: 300 }}
          color="dark"
          size="small"
          value={email}
          InputProps={{
            readOnly: isAdmin ? false : true,
          }}
        />
        <DialogContentText variant="caption" fontWeight="bold" sx={{ mt: 2 }}>
          電話番号
        </DialogContentText>
        <TextField
          fullWidth
          sx={{ minWidth: 300 }}
          color="dark"
          size="small"
          value={phone}
          InputProps={{
            readOnly: isAdmin ? false : true,
          }}
          onChange={(event) => setPhone(event.target.value)}
        />
        {isAdmin && (
          <Button fullWidth sx={{ mt: 3, py: 1.1 }}>
            更新
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
});
