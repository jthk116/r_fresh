import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({ isPosting, onStopPosting }) {
    const [posts, setPosts] = useState([]);

    function addPostHandler() {
        const newPost = { author: enteredAuthor, body: enteredBody };
        setPosts((prevPosts) => {
            return prevPosts.concat(newPost);
        });
        console.log('posts', posts);
    }

    return (
        <>
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewPost
                        onCancel={onStopPosting}
                        onAddPost={addPostHandler}
                    />
                </Modal>
            )}
            
            <ul className={classes.posts}>
                <Post author="Jay" body="Vue is nice!" />
                {posts.forEach((post) => {
                    return <Post author={post.author} body={post.body} />;
                })}
            </ul>
        </>
    );
}

export default PostsList;