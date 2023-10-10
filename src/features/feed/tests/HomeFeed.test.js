import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubredditPosts } from '../../../api/reddit';


import { renderWithProviders } from '../../../utils/test-utils';
import Home from '../HomeFeed';

// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => () => { }),
    useSelector: jest.fn(),
}));

describe('HomeFeed Component', () => {
    beforeEach(() => {
        // Mock the initial state for each slice
        useSelector.mockReturnValueOnce(0); // counter slice
        useSelector.mockReturnValueOnce({
            loading: false,
            error: null,
        }); // home slice
        useSelector.mockReturnValueOnce({
            loading: false,
            error: null,
            posts: [],
        }); // post slice
    });
    it('displays loading state when data is loading', () => {
        useSelector.mockReturnValue({
            loading: true,
        });
        const dispatchMock = jest.fn(); // Create a mock dispatch function
        useDispatch.mockReturnValue(dispatchMock); // Mock the useDispatch hook to return the mock dispatch function
        renderWithProviders(<Home />);

        // Use queryAllByText to find all elements containing "Loading" (case-insensitive)
        const loadingTextElements = screen.queryAllByText(/Loading/i);

        // Assert that at least one element containing "Loading" text is found
        expect(loadingTextElements.some((element) => element !== null)).toBeTruthy();
    });

    // TODO debug last two tests
    it('displays error message and retry button on error', () => {
        useSelector.mockReturnValue({
            error: true,
        });
        const dispatchMock = jest.fn();
        useDispatch.mockReturnValue(dispatchMock);
        renderWithProviders(<Home />);

        // Assert that the error message is displayed
        expect(screen.getByText('Failed to load posts.')).toBeInTheDocument();

        // Simulate a button click to retry
        fireEvent.click(screen.getByText('Try again'));

        // Assert that the dispatch function was called
        expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    });

    it('displays no posts found message when no posts match the search term', async () => {
        const posts = await getSubredditPosts('/r/pics/');
        useSelector.mockReturnValueOnce({
            posts: [],
            searchTerm: 'test',
            loading: true,
            error: false,
            selectedSubreddit: '/r/nibbio/',
        });
        const dispatchMock = jest.fn();
        useDispatch.mockReturnValue(dispatchMock);
        renderWithProviders(<Home />);

        // Wait for the loading element to resolve
        await waitFor(() => {
            expect(screen.queryAllByText('Loading')).not.toBeNull();
            expect(screen.queryAllByText('Loading')).toHaveLength(0);
        });

        useSelector.mockReturnValueOnce({
            posts: posts,
            searchTerm: 'test',
            loading: false,
            error: false,
            selectedSubreddit: '/r/nibbio/',
        });
        console.log('mock posts array: ', posts)

        // Wait for component to re-render
        await waitFor(() => {
            expect(screen.getByText('No posts matching "test"')).toBeInTheDocument();

        })

        // Simulate a button click to clear the search term
        fireEvent.click(screen.getByText('Go home'));

        // Assert that the dispatch function was called
        expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    });

    it('displays posts when data is successfully retrieved', async () => {
        const mockPosts = await getSubredditPosts('/r/pics/');

        useSelector.mockReturnValue({
            posts: mockPosts,
        });
        const dispatchMock = jest.fn();
        useDispatch.mockReturnValue(dispatchMock);
        renderWithProviders(<Home />);

        // You can add assertions for what should be displayed when posts are available
        await waitFor(() => {
            expect(screen.getByText('Post Title 1')).toBeInTheDocument();
            expect(screen.getByText('Post Title 2')).toBeInTheDocument();
            // Add more assertions as needed
        });
    });
});
