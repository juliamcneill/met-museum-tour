import React, { DetailedHTMLProps } from "react";

export const UIInput: React.FC<DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (
    props,
) => {
    return <input type="text" {...props} className={`h-8 border-b border-primary outline-none ${props.className}`} />;
};
