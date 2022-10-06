import { FC } from "react";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { FiRotateCw } from "react-icons/fi";

import { UserPostListProps } from "../DataProvider";
import "./UploadedImageCard.css";

interface PostListsProps {
  image: UserPostListProps;
  deleteSinglePost?: (id: string) => void;
  createThumbnail?: (url: string) => void;
  showDeleteButton?: boolean;
  showGenerateThubnailButton?: boolean;
}

const PostLists: FC<PostListsProps> = ({
  image,
  deleteSinglePost,
  createThumbnail,
  showDeleteButton,
  showGenerateThubnailButton,
}) => {
  return (
    <div className="image-card">
      <img className="img-fluid" src={image.original_image} />
      <p>Uploaded on. {moment(image.date).format("MMM Do YY")}.</p>

      {showDeleteButton && (
        <button
          className="btn btn-danger"
          onClick={() => deleteSinglePost?.(image._id)}
        >
          Delete <MdDelete size={20} />
        </button>
      )}

      {showGenerateThubnailButton && (
        <button
          className="btn btn-success"
          onClick={() => createThumbnail?.(image.original_image)}
        >
          Create Thumbnail <FiRotateCw size={20}/>
        </button>
      )}
    </div>
  );
};

export default PostLists;
