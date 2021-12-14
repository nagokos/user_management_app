import { VFC, memo, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { User } from '../../types/index';

type Props = {
  user: User;
  target: number;
  mouseMove: (id: number) => void;
  mouseLeave: () => void;
  openDialog: (user: User) => void;
};

export const UserCard: VFC<Props> = memo((props) => {
  const { user, target, mouseLeave, mouseMove, openDialog } = props;

  return (
    <Card
      sx={{
        borderRadius: 3,
        maxWidth: 325,
        marginRight: 'auto',
        marginLeft: 'auto',
        cursor: 'pointer',
      }}
      elevation={user.id === target ? 6 : 0}
      variant={user.id === target ? 'elevation' : 'outlined'}
      onMouseMove={() => mouseMove(user.id)}
      onMouseLeave={mouseLeave}
      onClick={() => openDialog(user)}
    >
      <CardMedia
        component="img"
        height="140"
        src="https://source.unsplash.com/9JrVrt5ToCQ"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
});
