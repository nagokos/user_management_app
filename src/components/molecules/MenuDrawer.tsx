import { memo, VFC } from 'react';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import Drawer from '@mui/material/Drawer';

type Props = {
  onOpen: () => void;
  onClickPage: (path: string) => void;
  isOpen: boolean;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { onOpen, onClickPage, isOpen } = props;

  const setPushPath = (index: number): string => {
    let path = '';
    switch (index) {
      case 0:
        path = '/home';
        break;
      case 1:
        path = '/home/user_management';
        break;
      case 2:
        path = '/home/setting';
        break;
    }
    return path;
  };

  return (
    <Drawer open={isOpen} anchor="left" onClose={onOpen}>
      <Box sx={{ width: 250 }}>
        <List>
          {['TOP', 'ユーザー一覧', '設定'].map((text, index) => (
            <ListItem
              key={text}
              onClick={() => onClickPage(setPushPath(index))}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <GroupIcon />}
                  {index === 2 && <SettingsIcon />}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: 14,
                  }}
                  primary={text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
});
