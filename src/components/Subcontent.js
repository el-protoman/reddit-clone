import React, { useState } from 'react';
import Comments from './Comments';
import ContentCard from '../features/post/Card';
import { CardActions } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useDispatch } from 'react-redux';
import { upVotePost } from '../features/post/postSlice';




export default function Subcontent(props) {
    const [isFavorite, setIsFavorite] = React.useState(false);

    const { closeSelectedPost, post } = props
    const dispatch = useDispatch();



    if (!post) {
        return null; // or handle with an empty post
    }

    return (
        <>
            <ContentCard closeSelectedPost={closeSelectedPost} key={post.id} post={post} />
            <div>
                <CardActions disableSpacing>
                    {/* Add upvote capability */}
                    <Badge color="primary" badgeContent={post.ups} max={9999}>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={() => { setIsFavorite(prevState => !prevState); !isFavorite && dispatch(upVotePost()) }}
                        >
                            {isFavorite ? (
                                <FavoriteIcon color="primary" />
                            ) : (
                                <FavoriteIcon color="action" />
                            )}
                        </IconButton>
                    </Badge>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>

                </CardActions>
                <Comments comments={post.comments} />
            </div>
        </>
    );
}
