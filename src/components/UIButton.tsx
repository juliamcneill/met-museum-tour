import { Button, ButtonProps } from "@mui/material";
import React from "react";

export const UIButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            variant="outlined"
            {...props}
            className={`rounded-lg border-primary bg-white p-2.5 font-sans normal-case text-primary shadow hover:border-primary hover:bg-white hover:text-dark hover:shadow-dark ${props.className}`}
        />
    );
};
