import React from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedSubreddit } from '../features/feed/homeSlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const menu1 = ['/r/javascript/', '/r/HTML/', '/r/csshelp/', '/r/reactjs/', '/r/webdev']
const menu2 = ['/r/programming', '/r/compsci/', '/r/coding/', '/r/codecademy/', '/r/data/']
const menu3 = ['/r/marvel/', '/r/starwars/']

export const RedditTabs = (props) => {
    const { toggleSubFeed } = props;
    const [selectedTab, setSelectedTab] = React.useState(1);
    const [openTab, setOpenTab] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch();

    const handleMenuOpen = (event, tab) => {
        setAnchorEl(event.currentTarget);
        setOpenTab(tab);
    };

    const handleMenuClose = (selectedItem) => {
        setAnchorEl(null);
        setOpenTab(null);
        dispatch(setSelectedSubreddit(selectedItem.target.textContent))
        console.log('dispatched sub: ', selectedItem.target.textContent)
        toggleSubFeed(selectedItem.target.textContent);
        console.log('switching to sub')
    };

    return (
        <>
            <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)}>
                <Tab value={0} label="Coding" aria-controls="tab1-menu" aria-haspopup="true" onClick={(event) => handleMenuOpen(event, 'tab1')} />
                <Tab value={1} label="CompSci" aria-controls="tab2-menu" aria-haspopup="true" onClick={(event) => handleMenuOpen(event, 'tab2')} />
                <Tab value={2} label="Media" aria-controls="tab3-menu" aria-haspopup="true" onClick={(event) => handleMenuOpen(event, 'tab3')} />
            </Tabs >
            <Menu
                id="tab1-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openTab === 'tab1'}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                getContentAnchorEl={null}
            >
                {menu1.map((item, index) => (
                    <MenuItem key={index} onClick={handleMenuClose}>{item}</MenuItem>
                ))}
            </Menu>
            <Menu
                id="tab2-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openTab === 'tab2'}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                getContentAnchorEl={null}
            >
                {menu2.map((item, index) => (
                    <MenuItem key={index} onClick={handleMenuClose}>{item}</MenuItem>
                ))}
            </Menu>
            <Menu
                id="tab3-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openTab === 'tab3'}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                getContentAnchorEl={null}
            >
                {menu3.map((item, index) => (
                    <MenuItem key={index} onClick={handleMenuClose}>{item}</MenuItem>
                ))}
            </Menu>
        </>
    )
}
