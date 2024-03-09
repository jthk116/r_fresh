import { useState, useEffect } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({ isPosting, onStopPosting }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log('posts AFTER set', posts);
    }, [posts]);

    function addPostHandler(postData) {
        console.log('addPostHandler postData', postData);
        // const newPost = { author: enteredAuthor, body: enteredBody };
        setPosts((prevPosts) => [postData, ...prevPosts]);
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
            
            {posts.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>No posts yet</h2>
                    <p>Get started by adding a new post!</p>
                </div>
            )}
            {posts.length > 0 && (
                <ul className={classes.posts}>
                    {posts.map((post, i) => <Post author={post.author} body={post.body} key={i} />)}
                </ul>
            )}
        </>
    );
}

export default PostsList;