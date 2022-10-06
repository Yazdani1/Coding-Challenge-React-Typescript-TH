import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import "react-toastify/dist/ReactToastify.css";
import CardLayout from "../components/CardLayout";
import Skelton from "../components/Skelton";
import "./UploadImage.css";
import {
  UploadImageAWSProps,
  uploadImageAWS,
  UploadImageProps,
  uploadImage,
  getAllUploadedImage,
  deleteUploadedImage,
} from "../API";
import UploadedImageCard from "../components/UploadedImageCard";
import PageLayout from "../PageLayout/PageLayout";

const UploadImage = () => {
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showSkelton, setShowSkelton] = useState(false);

  const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
  const [showFileName, setShowFileName] = useState<string>("");

  // to get all the posts

  const [allPosts, setAllPosts] = useState([]);

  // to upload image

  const handleImage = (e: any) => {
    setLoading(true);
    let file = e.target.files[0];

    setShowFileName(file.name);
    setPreview(window.URL.createObjectURL(file));

    Resizer.imageFileResizer(file, 900, 900, "JPEG", 100, 0, async (uri) => {
      try {
        const payload: UploadImageAWSProps = { image: uri };

        const { data } = await uploadImageAWS(payload);

        if (data) {
          toast.success("Image uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setOriginalImageUrl(data.Location);
          setLoading(false);
        }
      } catch (error: any) {
        toast.error(error.response && error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      }
    });
  };

  // to upload image

  const onSubmitUploadImage = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: UploadImageProps = {
        original_image: originalImageUrl,
      };

      const res = await uploadImage(payload);

      if (res) {
        toast.success("Image saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        loadAllUploadedImages();
        setLoading(false);
    
      }

      setOriginalImageUrl("");
      setShowFileName("");
      setPreview("");
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  // get all the posts

  const loadAllUploadedImages = async () => {
    setShowSkelton(true);
    try {
      const res = await getAllUploadedImage();

      if (res) {
        setAllPosts(res.data);
        setShowSkelton(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowSkelton(false);
    }
  };

  // to delete post

  const deleteSinglePost = async (id: string) => {
    try {
      const res = await deleteUploadedImage(id);

      if (res) {
        toast.success("Image deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        loadAllUploadedImages();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllUploadedImages();
  }, []);

  return (
    <PageLayout>
      <div className="container">
      {loading && (
          <CardLayout backgroun_color="orange">
            <h3>We are uploading your image! please wait...</h3>
          </CardLayout>
        )}

        <CardLayout backgroun_color="white">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="form-designs">
                <form>
                  <div className="imageupload-form">
                    <label className="form-control" >
                     <h4> {showFileName ? showFileName : "Upload Image..."}</h4>
                      <input
                        type="file"
                        onChange={handleImage}
                        className="form-control"
                        placeholder="Select a Image"
                        accept="image/*"
                        hidden
                      />
                    </label>
                    {preview && (
                      <img
                        src={preview}
                        height="80px"
                        width="80px"
                        style={{
                          borderRadius: "90px",
                          objectFit: "cover",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      />
                    )}
                  </div>

                  <div
                    className="button-submit"
                    aria-disabled={true}
                    onClick={(e) => onSubmitUploadImage(e)}
                  >
                    <p>{loading ? "Uploading..." : "Save Image"}</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardLayout>

        <CardLayout backgroun_color="white">
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
              {allPosts &&
                allPosts.map((image: any, index) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
                    
                  >
                    <div style={{ marginTop: "40px" }} key={index}>
                      <UploadedImageCard
                        image={image}
                        deleteSinglePost={deleteSinglePost}
                        showDeleteButton={true}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardLayout>

        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default UploadImage;
