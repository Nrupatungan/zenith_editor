import { z } from "zod";

const TransformSchema = z.object({
    // RESIZE SCHEMA
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

    // OVERLAY SCHEMA
    overlay_type: 
        z.enum(["text", "color_block"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),
    
    O_width: //*
        z.string()
        .optional(),
    
    O_height: 
        z.string()
        .optional(),

    font_size: 
        z.number()
        .optional(),

    font_color:
        z.string()
        .optional(),

    text_align:
        z.enum(["left", "right", "center"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    padding:
        z.string()
        .optional(),

    transparency: //*
        z.number()
        .optional(),

    typography:
        z.enum(["b", "i", "b_i"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    O_background_color: //*
        z.string()
        .optional(),
    
    rotate:
        z.number()
        .optional(),
    
    text_flip:
        z.enum(["fl-h", "fl-v", "fl-h_v"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),
    
    line_height:
        z.string()
        .optional(),

    position_type: 
        z.enum(["positional", "axis"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),
    
    lx: //Axis
        z.number()
        .optional(),
    
    ly: //Axis
        z.number()
        .optional(),
    
    relative_position: //Positional
        z.enum(["center", "top", "left", "bottom", "right", "top_left", "top_right", "bottom_left", "bottom_right"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    // EFFECTS SCHEMA
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

    shadow_blur:
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
        
    linear_direction:
        z.number()  //0-359
        .optional(),

    from_color:
        z.string()
        .optional(),
    
    to_color:
        z.string()
        .optional(),
    
    stop_point:
        z.number()
        .optional(),

    grayscale:
        z.boolean()
        .optional(),

    blur:
        z.number()
        .optional(),
    
    trim_edges:
        z.number()
        .optional(),
    
    border:
        z.number()
        .optional(),
    
    border_color:
        z.string()
        .optional(),
    
    flip:
        z.enum(["fl-h", "fl-v", "fl-h_v"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    radius:
        z.number()
        .optional(),

    background_color:
        z.string()
        .optional(),

    opacity:
        z.number()
        .optional(),
})

export type TransformType = z.infer<typeof TransformSchema>

export {
    TransformSchema
}