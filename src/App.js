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
      <Link color="inherit" href="https://nicholasdagostino.co">
        Reddit minimalist clone
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const [currentSub, setCurrentSub] = React.useState(null);
  const [isSubFeed, setIsSubFeed] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState(null);
  const [isSelectedPost, setSelectedPost] = React.useState(null);

  const handleSelectedPost = (post) => {
    console.log('set selected post to: ', post)
    setSelectedPost(post);
    setCurrentPost(post);
  }

  const closeSelectedPost = () => {
    setSelectedPost(null);
    setCurrentPost(null);
  }

  const handleToggleSubFeed = (sub) => {
    setIsSubFeed(true);
    setSelectedPost(null);
    setCurrentSub(sub)
  };

  const handleToggleHomeFeed = () => {
    setIsSubFeed(false);
    setSelectedPost(null);
    setCurrentSub(null);
  }

  return (
    <Container>
      <TopNavigation
        toggleSubFeed={handleToggleSubFeed}
        toggleHomeFeed={handleToggleHomeFeed}
      />
      <Box sx={{ my: 4 }}>
        {isSelectedPost !== null ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Reddit Content Post
            </Typography>
            <Subcontent closeSelectedPost={closeSelectedPost} post={currentPost} />
          </>
        ) : (
          <>
            {isSubFeed ? (
              <>
                <Typography variant="h4" component="h1" gutterBottom>
                  Subfeed - {currentSub}
                </Typography>
                <SubFeed handleSelectedPost={handleSelectedPost} />
              </>
            ) : (
              <>
                <Typography variant="h4" component="h1" gutterBottom>
                  Home feed - Comp Sci
                </Typography>
                <Feed handleSelectedPost={handleSelectedPost} />
              </>
            )}
          </>
        )}
        <Copyright />
      </Box>
    </Container>
  );
}
