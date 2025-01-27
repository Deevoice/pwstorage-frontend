import React from 'react';

import { useRouter } from 'next/router';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Settings from './settings';


const Header = () => {
    const router = useRouter();
    const isUserPage = ['/lk', '/settings'].includes(router.pathname);

    return (
        <header className='header'>
            <h1 className='header__title'><LockPersonIcon /> Password Storage</h1>
            {isUserPage && <Settings />}
        </header>
    );
};

export default Header;
