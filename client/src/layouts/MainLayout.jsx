import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="2xl:container mx-auto py-4 px-8 flex flex-col min-h-screen">
        <Header />
        <main className="mt-16 mb-44">
          <Outlet />
        </main>
      </div>
      <div className="bg-[#EFF0F2] pt-8">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
