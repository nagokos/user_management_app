import { ChangeEvent, memo, useState, VFC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import axios from 'axios';

import { User } from '../types/index';
import { useNavigate } from 'react-router';
import LoadingButton from '@mui/lab/LoadingButton';

export const Login: VFC = memo(() => {
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();

  const onInputUserId = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserId(event.target.value);
  };

  const userLogin = async () => {
    try {
      const res = await axios.get<User>(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      console.log(res);
      navigate('/home');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message);
      }
    }
  };

  return (
    <Grid sx={{ mt: 30 }} container alignItems="center" justifyContent="center">
      <Grid item>
        <Card sx={{ maxWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" textAlign="center">
              ユーザー管理
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ px: 5, py: 4 }}>
            <TextField
              label="ユーザーID"
              fullWidth
              value={userId}
              onChange={(event) => onInputUserId(event)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <LoadingButton>ログイン</LoadingButton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});
