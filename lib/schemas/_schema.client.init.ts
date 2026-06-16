"use client";
import { z } from "zod";
import { errorMap } from "@/lib/schemas/_schema.errorMap";

z.config({ customError: errorMap });
