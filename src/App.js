import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import PrimarySearchAppBar from './components/Header';
import HeaderSearchAppBar from './components/TopNavigation';
import Feed from './components/Feed';
import SubFeed from './components/SubFeed';
import Subcontent from './components/Subcontent';
// import ProTip from './ProTip';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Container>
      {/* <PrimarySearchAppBar /> */}
      <HeaderSearchAppBar />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI Create React App example
        </Typography>
        <Feed />
        {/* <SubFeed /> */}
        <Subcontent />
        {/* <ProTip /> */}
        <Copyright />
      </Box>
    </Container>
  );
}