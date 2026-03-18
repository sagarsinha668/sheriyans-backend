import { useContext } from "react";
import { PostContext } from "../post.context";
import {getFeed} from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, setPost, feed, setFeed } = context;

     const handleGetFeed = async () => {
    setLoading();
    const data = await getFeed();
    console.log(data);
    setFeed(data.post)
    setLoading(false)
  };

  return { loading, post, feed, handleGetFeed };
};
