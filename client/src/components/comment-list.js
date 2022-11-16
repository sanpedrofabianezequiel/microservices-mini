import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

export const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const fetchComments = useCallback(async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
