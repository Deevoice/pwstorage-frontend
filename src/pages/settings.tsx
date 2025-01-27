import React, { useEffect, useState } from 'react';
import { Block } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { getUser } from '@/api/user';
import { UserData } from '@/types/user';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LanguageIcon from '@mui/icons-material/Language';
import DevicesIcon from '@mui/icons-material/Devices';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const SettingsPage: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        (async () => {
            const userData = await getUser();
            setUser(userData as UserData);
        })();
    }, []);

    return (
        <div className="settings-container">
            <div className="settings-card">
                <div className="profile-block">
                    <Avatar alt="" src="/" />
                    {
                        user ? (
                            <h3>{user.name}</h3>
                        ) : null
                    }
                </div>
                <div className="account-block">
                    <h3 className='settings-chapter__title'>Account</h3>
                    <li className='chapter-item'>
                        <AccountBoxIcon />
                        <h5>Account details</h5>
                    </li>
                </div>
                <div className="settings-chapter">
                    <h3 className='settings-chapter__title'>Settings</h3>
                    <li className='chapter-item'>
                        <NightlightIcon />
                        <h5>Mode</h5>
                    </li>
                    <li className="chapter-item">
                        <LanguageIcon />
                        <h5>Language</h5>
                    </li>
                    <li className="chapter-item">
                        <DevicesIcon />
                        <h5>Devices</h5>
                    </li>
                    <li className="chapter-item">
                        <AccessTimeFilledIcon />
                        <h5>Session expiration</h5>
                    </li>
                </div>
                <div className="delete-block">
                    <button>delete account</button>
                </div>
            </div >
        </div >
    );
};

export default SettingsPage;
