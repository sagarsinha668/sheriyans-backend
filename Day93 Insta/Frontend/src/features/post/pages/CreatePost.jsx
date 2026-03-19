import {useState,useRef} from "react";
import "../style/createpost-imagelabel.scss"
const CreatePost = () => {
  return (
    <main>
      <div className="create-post-page">
        <div className="form-container">
          <h1>Create Post</h1>
          <form action="">
            <label className="post-image-label" htmlFor="post-image">select Image</label>
            <input hidden type="file" name="post-image" id="post-image" />
            <input type="text" name="caption" id="caption" placeholder="Caption" />
            <button type="submit">Create Post</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreatePost;
