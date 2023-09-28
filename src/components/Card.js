import * as React from 'react';
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
import he from 'he';
import Comments from './Comments';
// import './Card.css'

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

export default function ContentCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const { post, style, onClick } = props;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (!post) {
        return (
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            Test Author
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Test Title"
                    subheader="Test Date"
                />
                <CardMedia
                    component="img"
                    image='https://preview.redd.it/a-cool-guide-to-120-mind-blowing-ai-tools-v0-02d2sre14ccb1.jpg?auto=webp&s=d7f389731fd927f35385ae67f3e909c39a95f280'
                    alt="reddit"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
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
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {post.author}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={post.title}
                    subheader={post.created}
                />
                {post.post_hint === 'image' && (
                    <CardMedia
                        component="img"
                        className='post-image'
                        image={post.is_gallery ? post.thumbnail : post.url}
                        alt="reddit"
                        onClick={onClick}
                    />
                )}
                {(post.post_hint === 'self' || post.is_self) && (
                    <CardContent onClick={onClick}
                    >
                        <div dangerouslySetInnerHTML={{ __html: decodedText }}></div>
                    </CardContent>
                )}
                {post.post_hint === 'hosted:video' && (
                    <CardMedia
                        component="video"
                        className='post-video'
                        src={post.media.reddit_video.fallback_url}
                        controls
                        onClick={onClick}
                    />
                )}
                {!post.post_hint && !post.is_self && (
                    <CardMedia
                        component="img"
                        className='post-image'
                        image={post.is_gallery ? post.thumbnail : post.url}
                        alt="reddit"
                        onClick={onClick}
                    />
                )}
                <CardContent>
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
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
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
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Comments />
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}
