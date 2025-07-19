import { optional, z } from "zod";

const EffectsSchema = z.object({
    contrast:
        z.boolean()
        .optional(),
    sharpen:
        z.number() //0-10
        .optional(),
    // Shadow properties
    shadow:
        z.boolean()
        .optional(),
    blur:
        z.number() //0-15
        .optional(),
    saturation: 
        z.number() //0-100
        .optional(),
    x_offset:
        z.number() //-100-0-100
        .optional(),
    y_offset:
        z.number()  //-100-0-100
        .optional(),
    // Gradient properties
    gradient:
        z.boolean()
        .optional(),
    linear_direction_type:
        z.enum(["number", "string"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),
    
    
})

export type EffectsType = z.infer<typeof EffectsSchema>

export {
    EffectsSchema
}