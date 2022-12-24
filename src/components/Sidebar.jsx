import React from "react";
// import userImage from "../images/user.png";
import userImage from "../images/profile.jpg";

const Sidebar = () => {
  return (
    <div className="bg-white flex flex-col gap-3 p-5 rounded-lg shadow">
      <div className="px-1 pb-2">
        <img src={userImage} alt="user" className="rounded-full" />
      </div>
      <div>
        <h3 className="font-semibold">Name:</h3>
        <p className="font-mono">Ayomikun Sheyitan</p>
      </div>
      <div>
        <h3 className="font-semibold">Course:</h3>
        <p className="font-mono">ENGLISH LANGUAGE</p>
      </div>
    </div>
  );
};

export default Sidebar;
