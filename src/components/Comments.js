import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PostLoading from '../features/post/PostLoading';

export default function Comments({ comments }) {
    const [visibleComments, setVisibleComments] = useState(10);
    const postComments = useSelector((state) => state.post.post.loadingComments);


    const handleShowMore = () => {
        setVisibleComments((prevVisibleComments) => prevVisibleComments + 10);
    };

    // TODO: Add a no posts found if comments are empty after fetching, use api to return empty array with 0 as first value or with state value state.home.posts.errorComments
    if (comments.length === 0 && postComments) {
        return <PostLoading />;
    }

    return (
        <>
            <List sx={{ width: '100%', bgcolor: 'background.paper', textAlign: 'center' }}>
                {comments.slice(0, visibleComments).map((comment) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={comment.author} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.author}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {comment.body}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
            {visibleComments < comments.length && (
                <button onClick={handleShowMore}>Show More</button>
            )}
        </>
    );
}