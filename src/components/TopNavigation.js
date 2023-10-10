import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePosts, setSearchTerm } from '../features/feed/homeSlice';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import RedditIcon from '@mui/icons-material/Reddit';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { RedditTabs } from './Tabs';
import Box from '@mui/material/Box';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 'auto', // Right align the search bar field
    width: 'fit-content', // Adjust the width to fit the content
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const TopNavigation = (props) => {
    const { toggleSubFeed, toggleHomeFeed } = props;
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const searchTerm = useSelector((state) => state.home.searchTerm);
    const dispatch = useDispatch();

    const onSearchTermChange = (e) => {
        console.log('input in search bar: ', e.target.value)
        setSearchTermLocal(e.target.value);
    };

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const onSearchTermSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
        console.log('dispatched with search: ', searchTermLocal)
    }

    const onHomeIconClick = () => {
        // Return to home view logic here
        dispatch(fetchHomePosts());
        toggleHomeFeed()
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onHomeIconClick}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h5">
                    <RedditIcon /> mini
                </Typography>
                <RedditTabs toggleSubFeed={toggleSubFeed} />
                <form onSubmit={onSearchTermSubmit}>
                    <Search onMouseLeave={onSearchTermSubmit} onClose={onSearchTermSubmit}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchTermLocal}
                            onChange={onSearchTermChange}
                        />
                    </Search>
                </form>
            </Toolbar>
        </AppBar>
    );
}

