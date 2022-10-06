import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import Skelton from "../components/Skelton";
import PageLayout from "../PageLayout/PageLayout";
import CardLayout from "../components/CardLayout";
import ThumbnailCard from "../components/ThumbnailCard";
import { getAllThumbnails, deleteThumbnail } from "../API";
const Thumbnail = () => {
  const [allThumbnails, setAllThumbnails] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllThumbnails = async () => {
    setLoading(true);
    try {
      const res = await getAllThumbnails();

      if (res) {
        setAllThumbnails(res.data);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  // to delete post

  const deleteSingleThumbnail = async (id: string) => {
    try {
      const res = await deleteThumbnail(id);

      if (res) {
        toast.success("Thumbnail Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        loadAllThumbnails();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllThumbnails();
  }, []);

  return (
    <PageLayout>
      <div className="container">
        <CardLayout>
          <div>
            <h3>Select an image to create thumbnail</h3>
            <Link
              to={"/create-thumbnail"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <button className="btn btn-primary">
                Select Image <MdNavigateNext size={25} color="white" />
              </button>
            </Link>
          </div>
        </CardLayout>

        <CardLayout backgroun_color="black">
          <h5 style={{ color: "white" }}>Previously created thumbnail lists</h5>
        </CardLayout>

        <CardLayout backgroun_color="white">
          {loading ? (
            <div className="row">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <Skelton />
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {allThumbnails &&
                allThumbnails.map((thumbnail: any, index) => (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div style={{ marginTop: "40px" }} key={index}>
                      <ThumbnailCard
                        thumbnail={thumbnail}
                        deleteThumbnail={deleteSingleThumbnail}
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

export default Thumbnail;
