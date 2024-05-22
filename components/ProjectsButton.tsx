import React from "react";

interface ContactButtonProps {
    handleProjectsClick: () => void;
  }

const ProjectsButton = ({ handleProjectsClick }: ContactButtonProps) => {
  return (
    <div>
      <button className="absolute top-[20px] text-white left-[240px] z-10 px-3 py-2 hover:bg-gray-500 rounded-lg" onClick={handleProjectsClick}>
        Projects
      </button>
    </div>
  );
};

export default ProjectsButton;