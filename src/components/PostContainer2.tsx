import React from 'react';
import {postAPI} from "../services/postService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer2 = () => {
    // const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(20, {
    //     pollingInterval: 5000,
    // });
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(10);

    return (
        <div>
            <div className="post__list">

                <button onClick={() => refetch()}>Refetch</button>
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>Error!</h1>}
                {posts && posts.map(post =>
                    <PostItem key={post.id} post={post} />
                )}
            </div>
        </div>
    );
};

export default PostContainer2;