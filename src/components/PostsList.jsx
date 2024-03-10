import { useState, useEffect } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({ isPosting, onStopPosting }) {
    const [posts, setPosts] = useState([]);

    // useEffect is a hook that runs after the first render and after every update. Here, it avoids an infinite loop by passing an empty array as the second argument. This tells React to run the effect only once after the first render.
    // useEffect passes a function and an array. The function shouldn't be async because it returns a promise, and useEffect doesn't support promises.
    // Instead, you can create an async function inside useEffect with a function expression and call it immediately
    useEffect(() => {
        console.log('posts AFTER set', posts);
        async function fetchPosts() {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'GET'
            })
            const resData = await response.json();
            setPosts(resData.posts);
        }
        fetchPosts();
    }, []);

    function addPostHandler(postData) {
        console.log('addPostHandler postData', postData);
        fetch('http://localhost:8080/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
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