import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedSubreddit } from '../features/feed/homeSlice';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const menu1 = ['/r/javascript/', '/r/html/', '/r/css/', '/r/react/', '/r/webdev/']
const menu2 = ['/r/programming/', '/r/compsci/', '/r/coding/', '/r/codecademy/', '/r/data/']
const menu3 = ['/r/marvel/', '/r/starwars/']

export const RedditTabs = () => {
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
    };

    return (
        <>
            <Tabs>
                <Tab label="Tab 1" aria-controls="tab1-menu" aria-haspopup="true" onClick={(event) => handleMenuOpen(event, 'tab1')} />
                <Tab label="Tab 2" aria-controls="tab2-menu" aria-haspopup="true" onClick={(event) => handleMenuOpen(event, 'tab2')} />
                <Tab label="Tab 3" aria-controls="tab3-menu" aria-haspopup="true" onClick={(event) => handleMenuOpen(event, 'tab3')} />
            </Tabs>
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
