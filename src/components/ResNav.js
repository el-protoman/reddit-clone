import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePosts, setSearchTerm } from '../features/feed/homeSlice';
import { setSelectedSubreddit } from '../features/feed/homeSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RedditIcon from '@mui/icons-material/Reddit';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


const pages = ['Coding', 'CompSci', 'Media'];
const menu1 = ['/r/javascript/', '/r/HTML/', '/r/csshelp/', '/r/reactjs/', '/r/webdev']
const menu2 = ['/r/programming', '/r/compsci/', '/r/coding/', '/r/codecademy/', '/r/data/']
const menu3 = ['/r/marvel/', '/r/starwars/']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
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
        // vertical padding + font size from searchIcon
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

function ResponsiveAppBar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElSubmenu, setAnchorElSubmenu] = useState(null);
    const [selectedSubmenu, setSelectedSubmenu] = useState(null);
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

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        setAnchorElSubmenu(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        setAnchorElSubmenu(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        setAnchorElSubmenu(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setAnchorElSubmenu(null);
    };

    const handleOpenSubmenu = (event, tab) => {
        setAnchorElSubmenu(event.currentTarget);
        setSelectedSubmenu(tab);
    };

    const handleMenuOpen = (event, tab) => {
        setAnchorElNav(event.currentTarget);
        setAnchorElSubmenu(tab);
    };

    const handleMenuClose = (selectedItem) => {
        setAnchorElNav(null);
        setAnchorElSubmenu(null);
        console.log('selectedItem', selectedItem)
        dispatch(setSelectedSubreddit(selectedItem))
        console.log('dispatched sub: ', selectedItem)
        toggleSubFeed(selectedItem);
        console.log('switching to sub')
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <RedditIcon onClick={onHomeIconClick} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MINI
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))} */}
                            {pages.map((page, index) => (
                                <Button
                                    key={page}
                                    onClick={(event) => handleOpenSubmenu(event, page)}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Menu
                                anchorEl={anchorElSubmenu}
                                open={Boolean(anchorElSubmenu)}
                                onClose={() => setAnchorElSubmenu(null)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                {selectedSubmenu === 'Coding' && (
                                    menu1.map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleMenuClose(item)}>
                                            {item}
                                        </MenuItem>
                                    ))
                                )}
                                {selectedSubmenu === 'CompSci' && (
                                    menu2.map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleMenuClose(item)}>
                                            {item}
                                        </MenuItem>
                                    ))
                                )}
                                {selectedSubmenu === 'Media' && (
                                    menu3.map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleMenuClose(item)}>
                                            {item}
                                        </MenuItem>
                                    ))
                                )}
                            </Menu>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MINI
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                onClick={(event) => handleOpenSubmenu(event, page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Menu
                            anchorEl={anchorElSubmenu}
                            open={Boolean(anchorElSubmenu)}
                            onClose={() => setAnchorElSubmenu(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {selectedSubmenu === 'Coding' && (
                                menu1.map((item, index) => (
                                    <MenuItem key={index} onClick={() => handleMenuClose(item)}>
                                        {item}
                                    </MenuItem>
                                ))
                            )}
                            {selectedSubmenu === 'CompSci' && (
                                menu2.map((item, index) => (
                                    <MenuItem key={index} onClick={() => handleMenuClose(item)}>
                                        {item}
                                    </MenuItem>
                                ))
                            )}
                            {selectedSubmenu === 'Media' && (
                                menu3.map((item, index) => (
                                    <MenuItem key={index} onClick={() => handleMenuClose(item)}>
                                        {item}
                                    </MenuItem>
                                ))
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
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
                    </Box>


                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
