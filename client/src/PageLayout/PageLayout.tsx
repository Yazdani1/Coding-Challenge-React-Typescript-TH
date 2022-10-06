import  { ReactNode, FC } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import NavbarMobileView from "../components/Sidebar/NavbarMobileView";
interface IPropsPageLayout {
  children: ReactNode;
}

const PageLayout: FC<IPropsPageLayout> = ({ children }) => {
  return (
    <div className="container-fluid">
      <NavbarMobileView />

      <div className="row">
        <div className="col-xl-2">
          <Sidebar />
        </div>
        <div className="col-xl-10">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
