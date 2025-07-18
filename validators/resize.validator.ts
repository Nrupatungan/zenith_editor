import { z } from "zod";

const ResizeSchema = z.object({
    width: 
        z.string()
        .optional(),

    height: 
        z.string()
        .optional(),

    aspect_ratio: 
        z.enum(["3-2", "4-3", "5-4", "16-10", "16-9", "1.85-1", "2.35-1"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    crop_strategy: 
        z.enum(["cm-pad_resize", "c-force", "c-at_max", "c-at_max_enlarge", "c-maintain_ratio", "cm-extract", "cm-pad_extract"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    focus: 
        z.enum(["fo-center", "fo-top", "fo-left", "fo-bottom", "fo-right", "fo-top_left", "fo-top_right", "fo-bottom_left", "fo-bottom_right", "fo-custom"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    padding_color: 
        z.string()
        .optional(),

}).superRefine((data, ctx) => {

    if (data.aspect_ratio) {
        if (!data.width && !data.height) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "When aspect_ratio is provided, either width or height must also be provided.",
            path: ["aspect_ratio"],
        });
        }

        if (data.width && data.height) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "When aspect_ratio is provided, either width or height must also be provided.",
            path: ["aspect_ratio"],
        });
        }
    }

    if (data.crop_strategy) {
        if (!data.width || !data.height) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "When crop_strategy is provided, both width and height must also be provided.",
            path: ["crop_strategy"],
        });
        }
    }
})

export type ResizeType = z.infer<typeof ResizeSchema>

export {
    ResizeSchema
}