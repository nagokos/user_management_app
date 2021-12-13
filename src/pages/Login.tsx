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
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuth } from '../hooks/useAuth';

export const Login: VFC = memo(() => {
  const [userId, setUserId] = useState<string>('');
  const { login, loading } = useAuth();

  const onInputUserId = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserId(event.target.value);
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
          <CardContent sx={{ px: 4, py: 4 }}>
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
            <LoadingButton
              loading={loading}
              onClick={() => login(userId)}
              variant="contained"
              fullWidth
              color="dark"
              disabled={!userId}
              sx={{ mt: 3 }}
            >
              ログイン
            </LoadingButton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});
