const API_ROOT = "https://www.reddit.com"

// get subredditposts
export const getSubredditPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}${subreddit}.json`);
    const json = await response.json();

    return json.data.children.map((post) => post.data);
};
// get subreddits
export const getSubreddits = async () => {
    const response = await fetch(`${API_ROOT}/subreddits/search.json?q=mechanical+engineering`);
    const json = await response.json();

    return json.data.children.map((subreddit) => subreddit.data);
};
// get all posts for array of subreddits

export const getAllPosts = async (subreddits) => {
    const posts = [];

    for (let i = 0; i < Math.min(subreddits.length, 3); i++) {
        const subreddit = subreddits[i];
        const response = await fetch(`${API_ROOT}${subreddit.url}.json`);
        const json = await response.json();
        const subredditPosts = json.data.children.map((post) => post.data);

        posts.push(...subredditPosts);
    }

    return posts;
};

// getpostcomments
export const getPostComments = async (permalink) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    const json = await response.json();
    return json[1].data.children.map((subreddit) => subreddit.data);
};

// TODO : Cleanup response jsons