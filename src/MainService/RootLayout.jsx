import Sidebar from "./Sidebar/Sidebar";
import Upload from "../components/Upload";

function RootLayout({ children }) {
  return (
    <div className="flex ">
      <Sidebar />
      <Upload />
      <main className="">{children}</main>
    </div>
  );
}

export default RootLayout;
