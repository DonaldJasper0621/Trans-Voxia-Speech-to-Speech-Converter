import React, { useState } from 'react';
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";


const card = [
  { colSpan: "col-span-2" },
  { colSpan: "col-span-1" },
  { colSpan: "col-span-1" },
  { colSpan: "col-span-2" },
];

const CardLien = () => {
  const [selectedId, setSelectedId] = useState();

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <div className="relative grid grid-cols-3 gap-4 p-10 h-96 w-2/3 rounded-lg bg-violet-400">
        {card.map((item, index) => (
          <>
            <motion.div
              layoutId={index.toString()}
              key={index}
              className={clsx(
                "h-full rounded-lg bg-white cursor-pointer",
                item.colSpan
              )}
              onClick={() => setSelectedId(index)}
            ></motion.div>
            <AnimatePresence>
              {selectedId === index && (
                <motion.div
                  className="w-[35rem] absolute top-[30%] left-[20%] h-40 bg-black rounded-lg"
                  layoutId={selectedId.toString()}
                >
                  <motion.h5>hi</motion.h5>
                  <motion.button onClick={() => setSelectedId(null)}>
                    back
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ))}
      </div>
    </div>
  );
};

export default CardLien;




{/* <div className="flex justify-end mr-20 gap-6 mt-4">
<div class=" flex items-center w-full ml-9 mb-4 gap-8">
  <div className=" hover:border-b-2 hover:border-blue-500 flex">
    <MdOutlineVideoLibrary className="mr-2" size={25} />
    <NavLink to={"/service/medialibrary"} className="link">
      <span className=" font-semibold text-lg text-slate-500 ">
        MP4. File
      </span>
    </NavLink>
  </div>
  <div className="hover:border-b-2 hover:border-blue-500 flex">
    <FaRegFileAudio className="mr-2" size={25} />
    <NavLink to={"/service/medialibrary"} className="link">
      <span className=" font-semibold text-lg text-slate-500 ">
        MP3. File
      </span>
    </NavLink>
  </div>
  <div className="hover:border-b-2 hover:border-blue-500 flex">
    <MdOutlineDescription className="mr-2" size={25} />
    <NavLink to={"/service/medialibrary"} className="link">
      <span className=" font-semibold text-lg text-slate-500 ">
        TypeScript File
      </span>
    </NavLink>
  </div>
</div>

<input type="file" onChange={handleFileChange} />
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-justify rounded relative flex items-center justify-center z-50 border-spacing-5 w-28 p-2">
  <IoMdAddCircleOutline className="mr-2" />
  Upload
</button>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-justify rounded relative flex items-center justify-center z-50 w-28 p-2">
  {/* Icon component */}
//   Create Folder
// </button>
// </div>
// <div className="flex flex-wrap justify-center my-8 mt-9">
// {mockVideos.map((video, index) => (
//   <div
//     className="overflow-hidden shadow-lg my-2 mx-2 rounded-md w-96"
//     key={index}
//   >
//     <div className="px-6 py-4">
//       <div className="font-bold text-xl mb-2">{video}</div>
//       <video controls className="w-full h-48">
//         <source src={video} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   </div>
// ))}
// </div> */}