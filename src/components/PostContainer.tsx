import React, {useEffect, useState} from 'react';
import {postAPI} from "../services/postService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState(20);
    const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(limit);
    const [createPost, {}] = postAPI.useCreatePostMutation();
    const [removePost, {}] = postAPI.useDeletePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();

    useEffect(() => {
        // setTimeout(() => {
        //     setLimit(3);
        // }, 2000);
    }, [])

    const handleCreate = async () => {
        const title = prompt('Input title', 'new title');
        await createPost({
            title,
            body: title + ' body',
        } as IPost);
    }

    const handleRemove = (post: IPost) => {
        removePost(post);
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    }

    return (
        <div>
            <div className="post__list">
                <button onClick={handleCreate}>Add new post</button>
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>Error!</h1>}
                {posts && posts.map(post =>
                    <PostItem
                        key={post.id}
                        post={post}
                        remove={handleRemove}
                        update={handleUpdate}
                    />
                )}
            </div>
        </div>
    );
};

export default PostContainer;