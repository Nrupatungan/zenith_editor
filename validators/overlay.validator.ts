import { z } from "zod";

const OverlaySchema = z.object({
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
        z.number()
        .optional(),

    transparency: //*
        z.number()
        .optional(),

    typography:
        z.enum(["b", "i", "b_i"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    background_color: //*
        z.string()
        .optional(),
    
    rotate:
        z.number()
        .optional(),

    flip:
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
})

export type OverlayType = z.infer<typeof OverlaySchema>

export {
    OverlaySchema
}