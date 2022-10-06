import { FC } from "react";
import moment from "moment";
import { HiDownload } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { saveAs } from "file-saver";
import { ThumbnailProps } from "../DataProvider";

interface IPropsThumbnailCard {
  thumbnail: ThumbnailProps;
  deleteThumbnail: (id: string) => void;
}

const ThumbnailCard: FC<IPropsThumbnailCard> = ({
  thumbnail,
  deleteThumbnail,
}) => {
  const downloadImage = () => {
    saveAs(thumbnail.thumbnail, "thumbnail.jpg");
  };

  // const [show, setShow] = useState(false);

  return (
    <div
      className="thumbnai-image"
      // onMouseEnter={() => setShow(true)}
      // onMouseLeave={() => setShow(false)}
    >
      <img className="img-fluid" src={thumbnail.thumbnail} />
      <p style={{ marginTop: "10px" }}>
        Created on. {moment(thumbnail.date).format("MMM Do YY")}.
      </p>

      <div style={{ display: "flex" }}>
        <button
          className="btn btn-danger"
          onClick={() => deleteThumbnail(thumbnail._id)}
        >
          Delete <MdDelete size={20} />
        </button>

        <button
          className="btn btn-success"
          style={{ marginLeft: "3px" }}
          onClick={() => downloadImage()}
        >
          Download <HiDownload size={20} />
        </button>
      </div>
    </div>
  );
};

export default ThumbnailCard;
