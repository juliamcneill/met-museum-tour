import met from "../assets/met.jpg";
import React from "react";

const MetImage: React.FC = () => {
    return (
        <div className="mx-auto mt-4 flex justify-center rounded border border-primary bg-white">
            <img className="w-9/12 py-6" src={met} alt="Line drawing of the Metropolitan Museum of Art"></img>
        </div>
    );
};

export default MetImage;
