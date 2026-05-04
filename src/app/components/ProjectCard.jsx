import React, { useState } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, detailedDescription, gitUrl, previewUrl }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div>
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPostion: "center", backgroundRepeat: "no-repeat" }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818]/0 hidden group-hover:flex group-hover:bg-[#181818]/85 transition-all duration-500 ">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
          </Link>
          <button
            type="button"
            onClick={() => setIsDetailsOpen(true)}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
            aria-label={`Open details for ${title}`}
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
          </button>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>

      {isDetailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-xl border border-[#33353F] bg-[#181818] p-6 text-white shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="rounded-md border border-[#ADB7BE] px-3 py-1 text-sm text-[#ADB7BE] hover:border-white hover:text-white"
                aria-label="Close project details"
              >
                Close
              </button>
            </div>
            <p className="mb-6 text-[#ADB7BE] whitespace-pre-line">{detailedDescription ? detailedDescription : description}</p>
            {previewUrl && (
              <Link
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-[#ADB7BE] px-4 py-2 font-medium text-black hover:bg-white"
              >
                Visit Live Preview
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
