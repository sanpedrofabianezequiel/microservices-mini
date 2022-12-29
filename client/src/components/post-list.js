import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { CommentCreate } from "./comment-create";
import { CommentList } from "./comment-list";

export const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchPosts = useCallback(async () => {
    const res = await axios.get("http://posts.com/posts");
    setPosts(res.data);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>;
};
