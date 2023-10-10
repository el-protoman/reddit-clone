import React from 'react';
import ContentCard from '../post/Card';
import { TaggedContentCard } from 'react-ui-cards';
import './Home.css'

function ImageItem({ post, handleSelectedPost, comments, selectedItemId, setSelectedItemId }) {
    // Render each image item here, using the post and handleSelectedPost props

    const isSelected = selectedItemId === post.id;
    const handleClick = () => {
        if (isSelected) {
            // If already selected, close the card by setting selectedItemId to null
            setSelectedItemId(null);
        } else {
            // If not selected, open the card by setting selectedItemId to the post's id
            setSelectedItemId(post.id);
            console.log('selectedPost', post)
        }
    };

    return (
        // Render main feed as unselected or selected post(card)
        <>
            <div className={`image-item ${isSelected ? 'selected' : ''}`}>
                {/* selectedItem is different from post and was causing rerendering after comments have been fetched */}
                {isSelected ? (
                    <ContentCard handleSelectedPost={handleSelectedPost}
                        key={post.id}
                        comments={comments}
                        post={post}
                        // style={{ width: '100%' }}
                        onClick={handleClick}
                    />

                ) : (
                    <div className="custom-tagged-content-card">
                        <TaggedContentCard
                            thumbnail={post.is_gallery ? post.thumbnail : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.cultofmac.com%2Fwp-content%2Fuploads%2F2016%2F11%2FReddit.png&f=1&nofb=1&ipt=deeda785a453787cb58ece603dbdffbf4b9b1a1759d7563d59fd31b841e0d53b&ipo=images'}
                            title={post.title.slice(0, 100)}
                            description={post.is_self ? post.selftext.slice(0, 60) : ''}
                            tags={post.content_categories ?
                                post.content_categories : ['reddit']}
                            onClick={handleClick}
                        />
                    </div >
                )
                }
            </div>
        </>
    );
}

export default ImageItem
// export default React.memo(ImageItem);