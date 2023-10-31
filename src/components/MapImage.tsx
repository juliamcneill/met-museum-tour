import map from "../assets/map.jpg";
import { Department, getDepartmentLocationStyles } from "../types";
import DepartmentRibbon from "./DepartmentRibbon";
import React from "react";

// TODO: Create type with all departments and figure out way to align to external API

interface MapImageProps {
    // TODO: Define type
    results: any;
    setSelectedDepartment: React.Dispatch<React.SetStateAction<Department>>;
}

const MapImage: React.FC<MapImageProps> = ({ results, setSelectedDepartment }) => {
    return (
        <div className="relative flex h-full w-full justify-center overflow-scroll rounded border-b border-primary bg-white">
            <div className="relative h-fit w-full">
                <img
                    src={map}
                    onClick={() => setSelectedDepartment(undefined)}
                    alt="Line drawing map of the Metropolitan Museum of Art"
                />
                {Object.values(Department).map((department) => {
                    return (
                        <DepartmentRibbon
                            key={department}
                            style={getDepartmentLocationStyles(department)}
                            clickable={!!results[department]}
                            className="absolute left-[20%] top-[55%]"
                            // TODO: Can we get this from departmentName property?
                            onClick={() => setSelectedDepartment(department)}
                            departmentName={department}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MapImage;
