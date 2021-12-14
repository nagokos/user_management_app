import { memo, useEffect, useState, VFC } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';

import { UserCard } from '../components/index';
import { UserDialog } from '../components/molecules/UserDialog';
import { User } from '../types/index';

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
    setUser({ ...user });
  };

  const updateUser = (user: User) => {
    const index = users.findIndex((oldUser) => oldUser.id === user.id);
    users.splice(index, 1, user);
    const newUsers = users;
    setUsers(newUsers);
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
      <UserDialog
        updateUser={updateUser}
        closeDialog={closeDialog}
        dialog={dialog}
        user={user}
      />
    </>
  );
});
