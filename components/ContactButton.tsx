import React from "react";

interface ContactButtonProps {
    handleContactClick: () => void;
  }

const ContactButton = ({ handleContactClick }: ContactButtonProps) => {
  return (
    <div>
      <button className="absolute top-[20px] text-white left-[30px] z-10 px-3 py-2 hover:bg-gray-500 rounded-lg" onClick={handleContactClick}>
        Contact
      </button>
    </div>
  );
};

export default ContactButton;
