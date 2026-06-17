"use client"

import React from "react";
import {z} from "zod";
import {errorMap} from "@/lib/schemas/_schema.errorMap";

z.config({customError: errorMap})

const ZodCustomErrorMapComp = ({children}: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default ZodCustomErrorMapComp;


