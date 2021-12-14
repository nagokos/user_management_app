import { VFC, memo, useState, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

import { MenuIconButton, MenuDrawer } from '../index';
import { useSize } from '../../hooks/index';

export const Header: VFC = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickPage = useCallback((path: string): void => {
    navigate(path);
    setIsOpen(false);
  }, []);

  const { isMobile } = useSize();

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 6 }}>
        <AppBar elevation={0} position="static">
          <Toolbar>
            <Box component="div" sx={{ flexGrow: 1 }}>
              <Typography
                component="span"
                sx={{ cursor: 'pointer', mr: 3, '&:hover': { opacity: 0.9 } }}
                onClick={() => onClickPage('/home')}
              >
                ユーザー管理アプリ
              </Typography>
              {!isMobile && (
                <>
                  <Typography
                    component="span"
                    sx={{
                      cursor: 'pointer',
                      mr: 3,
                      '&:hover': { opacity: 0.9 },
                    }}
                    onClick={() => onClickPage('/home/user_management')}
                  >
                    ユーザー一覧
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.9 } }}
                    onClick={() => onClickPage('/home/setting')}
                  >
                    設定
                  </Typography>
                </>
              )}
            </Box>
            {isMobile && <MenuIconButton onOpen={onOpen} />}
          </Toolbar>
        </AppBar>
      </Box>
      <MenuDrawer isOpen={isOpen} onOpen={onOpen} onClickPage={onClickPage} />
    </>
  );
});
