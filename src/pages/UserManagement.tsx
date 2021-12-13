import { memo, useEffect, useState, VFC } from 'react';
import Grid from '@mui/material/Grid';
import { User } from '../types/index';

import axios from 'axios';
import { borderColor, Box } from '@mui/system';
import Container from '@mui/material/Container';
import { UserCard } from '../components/index';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Input, TextField } from '@mui/material';

export const UserManagement: VFC = memo(() => {
  const [user, setUser] = useState<User>(Object);
  const [users, setUsers] = useState<Array<User>>([]);
  const [target, setTarget] = useState<number>(0);
  const [dialog, setDialog] = useState<boolean>(false);

  const getUsers = async () => {
    const res = await axios.get<Array<User>>(
      'https://jsonplaceholder.typicode.com/users'
    );
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const mouseMove = (id: number) => {
    setTarget(id);
  };

  const mouseLeave = () => {
    setTarget(0);
  };

  const openDialog = (user: User) => {
    setDialog(true);
    setUser(user);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Grid spacing={3} container>
            {users.map((user) => (
              <Grid xs={12} sm={6} md={4} key={user.id} item>
                <UserCard
                  user={user}
                  target={target}
                  mouseMove={mouseMove}
                  mouseLeave={mouseLeave}
                  openDialog={openDialog}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Dialog
        sx={{
          maxWidth: 400,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
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
        <DialogContent dividers>
          <DialogContentText>ユーザー名</DialogContentText>
          <TextField color="dark" size="small" value={user.name} />
        </DialogContent>
      </Dialog>
    </>
  );
});
