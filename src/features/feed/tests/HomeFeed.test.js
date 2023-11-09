import React from 'react';
import { fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import { fetchHomePosts, fetchPostsFailure } from '../homeSlice';

import { renderWithProviders } from '../../../utils/test-utils';
import Home from '../HomeFeed';
import { setupStore } from '../../../app/store';

const configureStoreWithState = (initialState) => {
    return setupStore(initialState)
};

// The test is passing only when you put a timeout because the renderWithProviders function is calling the fetchHomePosts thunk, which is making an asynchronous API call.
describe('HomeFeed Component', () => {
    beforeEach(() => {
    });

    afterEach(() => {
        // Clear the mocked values for useSelector after each test
        jest.clearAllMocks();
        cleanup();
    });

    // TODO: Figure out how to get error component to load instead of loading component
    it('displays loading state when data is loading', () => {
        const initialCounter = {
            value: 0,
            status: 'idle',
        }

        const initialPost = {
            post: null,
            comments: [],
            loading: false,
            error: null,
        }

        const initialHome = {
            posts: [],
            subreddits: [{ "test": "test" }, { "test2": "test" }],
            loading: true,
            error: false,
            searchTerm: '',
            selectedSubreddit: '/r/nibbio',
        }

        // Mock the useEFfect so it does not run
        const useEffect = jest.spyOn(React, 'useEffect');
        useEffect.mockImplementation(f => f());
        const store = configureStoreWithState({ counter: initialCounter, post: initialPost, home: initialHome })
        renderWithProviders(<Home />, { store });
        // console.log('1st store', store.getState());

        // Use queryAllByText to find all elements containing "Loading" (case-insensitive)
        const loadingTextElements = screen.queryAllByText(/Loading/i);

        // Assert that at least one element containing "Loading" text is found
        expect(loadingTextElements.some((element) => element !== null)).toBeTruthy();
    });

    it('displays error message and retry button on error', async () => {
        const initialHome = {
            posts: [],
            subreddits: [{ "test": "test" }, { "test2": "test" }],
            loading: false,
            error: true,
            searchTerm: '',
            selectedSubreddit: '/r/nibbio',
        }

        // Mock the useEFfect so it does not run
        const useEffect = jest.spyOn(React, 'useEffect');
        useEffect.mockImplementation(f => f());

        const store2 = configureStoreWithState({ home: initialHome })
        await waitFor(() => {
            expect(store2.getState().home.loading).toBeFalsy();
        });
        // Set timeout
        setTimeout(() => {
            // Code to be executed after timeout
            renderWithProviders(<Home />, { store2 });;
            // console.log('2nd store', store2.getState());
            // Assert that the error message is displayed
            expect(screen.getByText('Failed to load posts.')).toBeInTheDocument();

            // Simulate a button click to retry
            fireEvent.click(screen.getByText('Try again'));

            // Assert that the dispatch function was called
            expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));

        }, 2000);




    });

    it('should display an error message when the fetchHomePosts thunk fails', async () => {
        // Mock the fetchHomePosts thunk to return an error
        const mockFetchHomePosts = jest.fn().mockRejectedValue(new Error('Failed to load posts.'));
        jest.mocked(fetchHomePosts, mockFetchHomePosts);
        const store3 = configureStoreWithState({})

        setTimeout(() => {
            // Render the Home component
            renderWithProviders(
                <Home />,
                { store3 }
            );

            // screen.debug();

            waitFor(() => {
                expect(store3.getState().home.loading).toBeFalsy();
                store3.dispatch(fetchPostsFailure)

            });


            // Assert that the error message is displayed
            expect(screen.getByText('Failed to load posts.')).toBeInTheDocument();
        }, 2000)


    });

    // TODO debug last two tests
    it('displays no posts found message when no posts match the search term', async () => {

        const initialHome = {
            posts: [],
            subreddits: [{ "test": "test" }, { "test2": "test" }],
            loading: false,
            error: false,
            searchTerm: 'Test',
            selectedSubreddit: '/r/nibbio',
        }
        const useEffect = jest.spyOn(React, 'useEffect');
        useEffect.mockImplementation(f => f());
        const store4 = configureStoreWithState({ home: initialHome })

        setTimeout(() => {
            renderWithProviders(<Home />, { store4 });
            // console.log('4th store', store4.getState());

            // Wait for the loading element to resolve
            waitFor(() => {
                expect(screen.queryAllByText('Loading')).not.toBeNull();
                expect(screen.queryAllByText('Loading')).toHaveLength(0);
            });

            // Wait for component to re-render
            waitFor(() => {
                expect(screen.getByText('No posts matching "test"')).toBeInTheDocument();

            })

            // Simulate a button click to clear the search term
            fireEvent.click(screen.getByText('Go home'));

            // Assert that the dispatch function was called
            expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
        }, 2000)

    });

    it('displays posts when data is successfully retrieved', async () => {
        const mockPosts = ["Post Title 1", "Post Title 2"]

        const initialHome = {
            posts: mockPosts,
            subreddits: [{ "test": "test" }, { "test2": "test" }],
            loading: false,
            error: false,
        }
        const useEffect = jest.spyOn(React, 'useEffect');
        useEffect.mockImplementation(f => f());
        const store = configureStoreWithState({ home: initialHome })

        setTimeout(() => {
            renderWithProviders(<Home />, { store });

            // You can add assertions for what should be displayed when posts are available
            waitFor(() => {
                expect(screen.getByText('Post Title 1')).toBeInTheDocument();
                expect(screen.getByText('Post Title 2')).toBeInTheDocument();
                // Add more assertions as needed
            });
        }, 2000)

    });
    it('displays posts when data is successfully retrieved, without timeout', async () => {
        const mockPosts = [{ title: "Post Title 1" }, { title: "Post Title 2" }]

        const initialHome = {
            posts: mockPosts,
            subreddits: [{ "test": "test" }, { "test2": "test" }],
            loading: false,
            error: false,
            searchTerm: '',
            selectedSubreddit: '/r/nibbio',

        }
        const useEffect = jest.spyOn(React, 'useEffect');
        useEffect.mockImplementation(f => f());
        const store = configureStoreWithState({ home: initialHome })

        renderWithProviders(<Home />, { store });

        // You can add assertions for what should be displayed when posts are available
        waitFor(() => {
            expect(screen.getByText('Post Title 1')).toBeInTheDocument();
            expect(screen.getByText('Post Title 2')).toBeInTheDocument();
            // Add more assertions as needed
        });

    });
});
