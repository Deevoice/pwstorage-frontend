import React, { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import NotesIcon from '@mui/icons-material/Notes';
import { RecordFilterRequest } from '@/types/record';
import { RecordType } from '@/types/enums/record';
import { OrderByType } from '@/types/enums/filter';

interface SidebarProps {
    recordFilter: RecordFilterRequest;
    setRecordFilter: React.Dispatch<React.SetStateAction<RecordFilterRequest>>;
};

const Sidebar: React.FC<SidebarProps> = ({ recordFilter, setRecordFilter }) => {
    return (
        <div className="sidebar-menu">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-header__title">Filters</h2>
                    <FilterAltIcon />
                </div>

                <div className="sidebar-search">
                    <SearchIcon />
                    <input className="sidebar-search__input" type="text" placeholder="search item" />
                </div>

                <ul>
                    <li>
                        <button type="button" onClick={(_) => setRecordFilter({ updatedAtOrderBy: OrderByType.DESC })}>
                            <FormatListBulletedIcon />
                            <p>All items</p>
                        </button>
                    </li>

                    <li>
                        <button type="button" onClick={
                            (_) => setRecordFilter({ ...recordFilter, isFavorite: (!recordFilter.isFavorite) })
                        }>
                            <StarIcon />
                            <p>Favorites</p>
                            <i className="ai-chevron-down-small"></i>
                        </button>
                    </li>
                    {/* <li>
                        <button type="button">
                            <DeleteIcon />
                            <p>Trash</p>
                            <i className="ai-chevron-down-small"></i>
                        </button>
                    </li> */}
                </ul>

                <ul>
                    <h2 className="vault-tf__title">Types</h2>
                    <li>
                        <button type="button" onClick={(_) => setRecordFilter({  ...recordFilter, recordTypeEq: RecordType.LOGIN })}>
                            <PasswordIcon />
                            <p>Login</p>
                        </button>
                    </li>

                    <li>
                        <button type="button" onClick={(_) => setRecordFilter({  ...recordFilter, recordTypeEq: RecordType.CARD })}>
                            <CreditCardIcon />
                            <p>Card</p>
                            <i className="ai-chevron-down-small"></i>
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={(_) => setRecordFilter({  ...recordFilter, recordTypeEq: RecordType.NOTE })}>
                            <NotesIcon />
                            <p>Secure Note</p>
                            <i className="ai-chevron-down-small"></i>
                        </button>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
