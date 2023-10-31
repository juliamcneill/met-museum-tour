import React from "react";

interface DepartmentRibbonProps {
    style?: React.CSSProperties;
    className?: string;
    clickable: boolean;
    departmentName: string;
    onClick: () => void;
}

const DepartmentRibbon: React.FC<DepartmentRibbonProps> = ({
    style,
    className = "",
    clickable,
    departmentName,
    onClick,
}) => {
    return (
        <div
            style={style}
            className={`ribbon-clip-path w-fit max-w-[8rem] rounded-sm  text-center text-[.4rem] tracking-wide text-white md:font-extrabold ${
                clickable ? "cursor-pointer bg-red" : "bg-light"
            } ${className} `}
            onClick={clickable ? onClick : undefined}
        >
            {departmentName}
        </div>
    );
};

export default DepartmentRibbon;
