import Sidebar from "./Sidebar/Sidebar";
import Upload from "../components/Upload";

function RootLayout({ children }) {
  return (
    <div className="flex ">
      <Sidebar />
      <Upload />
      <main className="max-w-5xl flex-1 mx-auto py-4">{children}</main>
    </div>
  );
}

export default RootLayout;
