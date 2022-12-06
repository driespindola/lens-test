import type { NextPage } from "next";

import Navbar from "@/components/Navbar";
import UploadVideo from "@/components/VideoUpload";

const Upload: NextPage = () => {
  return (
    <div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
      </div>
      <div className="flex gap-6 md:gap-20 mt-4">
        <UploadVideo />
      </div>
    </div>
  );
};

export default Upload;
