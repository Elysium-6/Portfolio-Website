import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

const ProjectCard = ({ imgUrl, title, type, description, detailedDescription, details, tags, gitUrl, previewUrl, videoUrl, community }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div>
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPostion: "center", backgroundRepeat: "no-repeat" }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818]/0 hidden group-hover:flex group-hover:bg-[#181818]/85 transition-all duration-500 ">
          <button
            type="button"
            onClick={() => setIsDetailsOpen(true)}
            className="rounded-full border border-white px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-[#181818]"
          >
            More details
          </button>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h5 className="text-xl font-semibold">{title}</h5>
          {community && (
            <span className="rounded-full border border-red-500 bg-red-500/15 px-2 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-red-300">
              Community
            </span>
          )}
        </div>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>

      <ProjectDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={title}
        type={type}
        description={detailedDescription || description}
        details={details}
        tags={tags}
        gitUrl={gitUrl}
        previewUrl={previewUrl}
        videoUrl={videoUrl}
        imgUrl={imgUrl}
      />
    </div>
  );
};

export default ProjectCard;
