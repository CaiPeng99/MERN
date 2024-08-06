import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  
  useEffect(() => {
    const getPosts = async () => {
      // setLoading(true);
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      // console.log("getPost's data: ", data);
      dispatch(setPosts({ posts: data.post }));
      // console.log("getPost's data's DISPATH Done!!!!")
      // setLoading(false);
    };
  
    const getUserPosts = async () => {
      // setLoading(true);
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      // console.log("getUserPosts's data: ", data);
      dispatch(setPosts({ posts: data.post }));
      // setLoading(false);
    };
    if (isProfile) {
      getUserPosts();
      // innerFuc();
    } else {
      // console.log("isProfile func works: ")
      // innerFuc_2();
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log("Before Return, my posts: ", posts);
  // console.log("Posts is An Array: ", posts.isArray);
  return (
    <>
      {
      // loading ? null :
      posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;