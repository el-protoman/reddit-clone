import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { TopNavigation } from './components/TopNavigation';
import Feed from './components/Feed';
import SubFeed from './components/SubFeed';
import Subcontent from './components/Subcontent';

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
  const [isSubFeed, setIsSubFeed] = React.useState(false);

  const handleToggleSubFeed = () => {
    setIsSubFeed(true);
  };

  const handleToggleHomeFeed = () => {
    setIsSubFeed(false);
  }

  return (
    <Container>
      <TopNavigation
        toggleSubFeed={handleToggleSubFeed}
        toggleHomeFeed={handleToggleHomeFeed}
      />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI Create React App example
        </Typography>
        {isSubFeed ? <SubFeed /> : <Feed />}
        <Subcontent />
        <Copyright />
      </Box>
    </Container>
  );
}
