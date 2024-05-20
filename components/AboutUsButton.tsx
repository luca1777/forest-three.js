import React from "react";

interface ContactButtonProps {
    handleAboutUsClick: () => void;
  }

const AboutUsButton = ({ handleAboutUsClick }: ContactButtonProps) => {
  return (
    <div>
      <button className="absolute top-[20px] text-white left-[130px] z-10 px-3 py-2 hover:bg-gray-500 rounded-lg" onClick={handleAboutUsClick}>
        About Us
      </button>
    </div>
  );
};

export default AboutUsButton;
