import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import HeaderSearchAppBar from './components/TopNavigation';
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
  return (
    <Container>
      {/* <PrimarySearchAppBar /> */}
      <HeaderSearchAppBar />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI Create React App example
        </Typography>
        <Feed />
        <SubFeed />
        <Subcontent />
        {/* <>
          <body>
            <div>
              <ul
                class="MuiImageList-root MuiImageList-quilted css-rvv586-MuiImageList-root"
              >
                <article
                  class="post"
                >
                  <div
                    class="post-votes-container"
                  >
                    <button
                      aria-label="Up vote"
                      class="icon-action-button up-vote"
                      type="button"
                    >
                      <svg
                        baseProfile="tiny"
                        class="icon-action"
                        fill="currentColor"
                        height="1em"
                        stroke="currentColor"
                        stroke-width="0"
                        version="1.2"
                        viewBox="0 0 24 24"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z"
                        />
                      </svg>
                    </button>
                    <span
                      aria-busy="true"
                      aria-live="polite"
                    >
                      <span
                        class="react-loading-skeleton post-votes-value post-votes-value-loading"
                      >
                        ‌
                      </span>
                      <br />
                    </span>
                    <button
                      aria-label="Down vote"
                      class="icon-action-button down-vote"
                      type="button"
                    >
                      <svg
                        baseProfile="tiny"
                        class="icon-action"
                        fill="currentColor"
                        height="1em"
                        stroke="currentColor"
                        stroke-width="0"
                        version="1.2"
                        viewBox="0 0 24 24"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 21.312l-7.121-7.121c-1.17-1.17-1.17-3.073 0-4.242 1.094-1.094 2.978-1.138 4.121-.115v-4.834c0-1.654 1.346-3 3-3s3 1.346 3 3v4.834c1.143-1.023 3.027-.979 4.121.115 1.17 1.169 1.17 3.072 0 4.242l-7.121 7.121zm-5-10.242c-.268 0-.518.104-.707.293-.391.39-.391 1.023 0 1.414l5.707 5.707 5.707-5.707c.391-.391.391-1.024 0-1.414-.379-.379-1.035-.379-1.414 0l-3.293 3.293v-9.656c0-.551-.448-1-1-1s-1 .449-1 1v9.656l-3.293-3.293c-.189-.189-.439-.293-.707-.293z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    class="post-container"
                  >
                    <h3
                      class="post-title"
                    >
                      Loading
                      <span
                        aria-busy="true"
                        aria-live="polite"
                      >
                        <span
                          class="react-loading-skeleton"
                        >
                          ‌
                        </span>
                        <br />
                      </span>
                    </h3>
                    <div
                      class="post-image-container"
                    >
                      <span
                        aria-busy="true"
                        aria-live="polite"
                      >
                        <span
                          class="react-loading-skeleton"
                        >
                          ‌
                        </span>
                        <br />
                      </span>
                    </div>
                    <div
                      class="post-details"
                    >
                      <span>
                        <span
                          aria-busy="true"
                          aria-live="polite"
                        >
                          <span
                            class="react-loading-skeleton"
                          >
                            ‌
                          </span>
                          <br />
                        </span>
                      </span>
                      <span>
                        <span
                          aria-busy="true"
                          aria-live="polite"
                        >
                          <span
                            class="react-loading-skeleton"
                          >
                            ‌
                          </span>
                          <br />
                        </span>
                      </span>
                      <span
                        class="post-comments-container"
                      >
                        <button
                          aria-label="Show comments"
                          class="icon-action-button"
                          type="button"
                        >
                          <svg
                            baseProfile="tiny"
                            class="icon-action"
                            fill="currentColor"
                            height="1em"
                            stroke="currentColor"
                            stroke-width="0"
                            version="1.2"
                            viewBox="0 0 24 24"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 7c.542 0 1 .458 1 1v7c0 .542-.458 1-1 1h-8.829l-.171.171v-.171h-3c-.542 0-1-.458-1-1v-7c0-.542.458-1 1-1h12m0-2h-12c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3v-7c0-1.65-1.35-3-3-3z"
                            />
                          </svg>
                        </button>
                        <span
                          aria-busy="true"
                          aria-live="polite"
                        >
                          <span
                            class="react-loading-skeleton"
                          >
                            ‌
                          </span>
                          <br />
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              </ul>
            </div>
          </body>
        </> */}
        <Copyright />
      </Box>
    </Container>
  );
}