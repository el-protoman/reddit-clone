const API_ROOT = "https://www.reddit.com"

// get subredditposts
export const getSubredditPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}${subreddit}.json`);
    const json = await response.json();

    return json.data.children.map((post) => post.data);
};
// get subreddits

// getpostcomments

