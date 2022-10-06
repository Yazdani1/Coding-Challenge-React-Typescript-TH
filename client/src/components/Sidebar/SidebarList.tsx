import React, { FC } from "react";
import "./SidebarList.css";

import { FcGallery } from "react-icons/fc";

import { BsFillCloudUploadFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";

import { NavLink } from "react-router-dom";

interface IPropsSidebarList {
  expandSidebar: boolean;
}

const SidebarList: FC<IPropsSidebarList> = ({ expandSidebar }) => {
  return (
    <React.Fragment>
      {expandSidebar ? (
        <div className="navbar-items">
          <ul>
            <li className="nav-item">
              <NavLink
                to={"/"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
                end
              >
                <IoIosImages size={25} color="yellow" /> Thumbnail
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/upload-image"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <BsFillCloudUploadFill size={25} color="yellow" /> Upload Image
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/create-thumbnail"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <FcGallery size={25} /> Create Thumbnail
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-items-only-icons">
          <ul>
            <li className="nav-item">
              <NavLink
                to={"/"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
                end
              >
                <IoIosImages size={25} color="yellow" />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/upload-image"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <BsFillCloudUploadFill size={25} color="yellow" />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/create-thumbnail"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "white",
                        textDecoration: "none",
                        borderLeft: "3px solid yellow",
                      }
                    : { color: "white", textDecoration: "none" }
                }
              >
                <FcGallery size={25} />
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default SidebarList;
