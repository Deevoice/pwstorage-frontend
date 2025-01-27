import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

const Settings = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="" src="/" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >

                <MenuItem key={"settings"} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" className='settings-btn'>
                        {/* <button className='settings-btn__btn'>Settings</button> */}
                        <Link href="/settings">
                            Settings
                        </Link>
                        <SettingsIcon />
                    </Typography>
                </MenuItem>
                <MenuItem key={"logout"} onClick={handleCloseUserMenu} className='menu-item'>
                    <Typography textAlign="center" className='settings-btn'>
                        <button className='settings-btn__btn'>Logout</button>
                        <LogoutIcon />
                    </Typography>
                </MenuItem>
            </Menu>
        </Box >
    );
};

export default Settings;
