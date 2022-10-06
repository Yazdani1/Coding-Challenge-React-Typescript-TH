import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {  Link } from "react-router-dom";
import Skelton from "../components/Skelton";
import PageLayout from "../PageLayout/PageLayout";
import CardLayout from "../components/CardLayout";
import {
  getAllUploadedImage,
  reduceImageSize,
  createThumbnail,
  ReduceImageSizeProps,
  CreateThumbnailProps,
} from "../API";
import UploadedImageCard from "../components/UploadedImageCard";

const CreateThumbnail = () => {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSkelton, setShowSkelton] = useState(false);

  const [success, setSuccess] = useState(false);

  // to generate thumbnail and save to database..
  const onSubmitCreateThumbnail = async (url: string) => {
    setLoading(true);
    try {
      const reduceImageSizePayload: ReduceImageSizeProps = { url: url };

      const { data } = await reduceImageSize(reduceImageSizePayload);

      if (data) {
        const thumbnailPayload: CreateThumbnailProps = {
          thumbnail: data.Location,
        };
        const res = await createThumbnail(thumbnailPayload);
        if (res) {
          setLoading(false);
          setSuccess(true);


          // setTimeout(() => {
          //   setSuccess(false);
          //   navigate("/");
          // }, 1000);
        }
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);

    }
  };

  // to get all the uploaded image..
  const loadAllImage = async () => {
    setShowSkelton(true);
    try {
      const res = await getAllUploadedImage();

      if (res) {
        setAllImages(res.data);
        setShowSkelton(false);

      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowSkelton(false);
    }
  };

  useEffect(() => {
    loadAllImage();
  }, []);

  return (
    <PageLayout>
      <div className="container">
        <CardLayout backgroun_color="white">
          <h4>
            From below image lists you can create your thumbnail by selecting
            an image.
          </h4>
        </CardLayout>

        {loading && (
          <CardLayout backgroun_color="orange">
            <h3>We are creating your thumbnail! please wait...</h3>
          </CardLayout>
        )}

        {success && (
          <CardLayout backgroun_color="green">
            <h3 style={{ color: "white" }}>
              Thumbnail has created successfully!. Visit thumbnail gallery
            </h3>
            <div style={{ display: "flex", margin: "15px" }}>
              <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                <button className="btn btn-primary">Thumbnail Gallery</button>
              </Link>
              <button
                style={{ marginLeft: "10px" }}
                className="btn btn-danger"
                onClick={() => setSuccess(false)}
              >
                Close
              </button>
            </div>
          </CardLayout>
        )}

        <CardLayout>
          {showSkelton ? (
            <div className="row">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <Skelton />
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {allImages &&
                allImages.map((images: any, index) => (
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" >
                    <div style={{ marginTop: "40px" }} key={index}>
                      <UploadedImageCard
                        image={images}
                        showGenerateThubnailButton={true}
                        createThumbnail={onSubmitCreateThumbnail}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardLayout>
      </div>

      <ToastContainer autoClose={8000} />
    </PageLayout>
  );
};

export default CreateThumbnail;
