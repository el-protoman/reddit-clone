import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getComments } from './postSlice';
import { increment } from '../counter/counterSlice';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FaceIcon from '@mui/icons-material/Face';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import he from 'he';
import Comments from '../../components/Comments';
import './Card.css';
import Badge from '@mui/material/Badge';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

// TODO: Add upvote capability

function ContentCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [upVotes, setUpVotes] = React.useState(0);
    const { post, style, onClick, handleSelectedPost, closeSelectedPost, comments } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        setIsFavorite(false)
        setUpVotes(post.ups)
    }, [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (!expanded) {
            dispatch(getComments(post))
            dispatch(increment());
        }
    };

    if (!handleSelectedPost) {
        const decodedText = he.decode(post.selftext);

        return (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="author">
                            {post.author}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            aria-label="actions"
                            onClick={() => {
                                closeSelectedPost();
                            }}
                        >

                            <ArrowBackIcon />

                        </IconButton>
                    }
                    title={post.title}
                    subheader={post.created}
                />
                {post && (post.post_hint === 'image') && (
                    <CardMedia
                        component="img"
                        className='post-image'
                        image={post.is_gallery ? post.thumbnail : post.url}
                        alt="reddit"
                        onClick={onClick}
                    />
                )}
                {post && (post.post_hint === 'self' || post.is_self) && (
                    <CardContent className="responsive-div" onClick={onClick}
                    >
                        <div dangerouslySetInnerHTML={{ __html: decodedText }}></div>
                    </CardContent>
                )}
                {(post && post.post_hint === 'hosted:video') && (
                    <CardMedia
                        component="video"
                        className='post-video'
                        src={post.media.reddit_video.fallback_url}
                        controls
                        onClick={onClick}
                    />
                )}
                {post && (!post.post_hint && !post.is_self) && (
                    <CardMedia
                        component="img"
                        className='post-image'
                        image='https://preview.redd.it/a-cool-guide-to-120-mind-blowing-ai-tools-v0-02d2sre14ccb1.jpg?auto=webp&s=d7f389731fd927f35385ae67f3e909c39a95f280'
                        alt="reddit"
                        onClick={onClick}
                    />
                )}

                <CardContent className="responsive-div">
                    <Typography variant="body2" color="text.secondary">
                        {post.content_categories ?
                            (post.content_categories.map((category, index) => (
                                <Chip
                                    key={index}
                                    icon={<FaceIcon />}
                                    label={category}
                                    variant="outlined"
                                />
                            ))) : ('reddit')
                        }
                    </Typography>
                </CardContent>
            </Card>
        )
    } else {
        const decodedText = he.decode(post.selftext);
        return (
            <Card sx={style} className='post-container'>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="author">
                            {post.author}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            aria-label="actions"
                            onClick={() => {
                                handleSelectedPost(post);
                                dispatch(getComments(post))
                                console.log('select vert icon inside card')
                            }}
                        >

                            <MoreVertIcon />

                        </IconButton>
                    }
                    title={post.title}
                    subheader={post.created}
                />
                {post && (post.post_hint === 'image') && (
                    <CardMedia
                        component="img"
                        className='post-image'
                        image={post.is_gallery ? post.thumbnail : post.url}
                        alt="reddit"
                        onClick={onClick}
                    />
                )}
                {post && (post.post_hint === 'self' || post.is_self) && (
                    <CardContent className="responsive-div" onClick={onClick}
                    >
                        <div className="responsive-div" dangerouslySetInnerHTML={{ __html: decodedText }}></div>
                    </CardContent>
                )}
                {post && (post.post_hint === 'hosted:video') && (
                    <CardMedia
                        component="video"
                        className='post-video'
                        src={post.media.reddit_video.fallback_url}
                        controls
                        onClick={onClick}
                    />
                )}
                {post && (!post.post_hint && !post.is_self) && (
                    <CardMedia
                        component="img"
                        className='post-image'
                        image={post.is_gallery ? post.thumbnail : post.url}
                        alt="reddit"
                        onClick={onClick}
                    />
                )}
                <CardContent className="responsive-div">
                    <Typography variant="body2" color="text.secondary">
                        {post && (post.content_categories) ?
                            (post.content_categories.map((category, index) => (
                                <Chip
                                    key={index}
                                    icon={<FaceIcon />}
                                    label={category}
                                    variant="outlined"
                                />
                            ))) : ('reddit')
                        }
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {/* Add upvote capability */}
                    <Badge color="primary" badgeContent={upVotes} max={9999}>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={() => {
                                setIsFavorite(prevState => !prevState);
                                !isFavorite && setUpVotes(upVotes + 1)
                            }}
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
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                {post && (<Collapse in={expanded} timeout="auto" unmountOnExit={true}>
                    <CardContent className="responsive-div">
                        {!comments ? (
                            <Comments key={post.id} comments={post.comments} />
                        ) : (
                            <Comments key={comments.id} comments={comments} />
                        )}
                    </CardContent>
                </Collapse>)}
            </Card>
        );
    }
}

export default ContentCard;

// export default React.memo(ContentCard, (prevProps, nextProps) => {
//     // only update if the posts prop has changed
//     return prevProps.posts !== nextProps.posts;
// });