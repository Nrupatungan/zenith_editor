import { focusObjects, fontData } from "@/lib/data";
import { z } from "zod";

const fonts: string[] = fontData.fonts.map((font) => font.value);
const objects: string[] = focusObjects.objects.map((obj) => obj.value);

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

    text_prompt: 
        z.string()
        .optional(),

    font_family:
        z.enum([...fonts] as [string, ...string[]])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    font_size: 
        z.string()
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

    typography:
        z.enum(["b", "i", "b_i"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    O_background_color: //*
        z.string()
        .optional(),
    
    O_radius_corner: //*
        z.string()
        .optional(),
    
    O_rotate:
        z.number() //0-359
        .max(0, '0 to 359')
        .min(359, '0 to 359')
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
        z.boolean()
        .optional(),

    sharpen_val:
        z.number() //0-10
        .min(0)
        .max(10)
        .optional(),

    // Shadow properties
    shadow:
        z.boolean()
        .optional(),

    shadow_blur:
        z.number() //0-15
        .min(0)
        .max(15)
        .optional(),

    shadow_saturation: 
        z.number() //0-100
        .min(0)
        .max(100)
        .optional(),

    x_offset:
        z.number() //-100-0-100
        .min(-100)
        .max(100)
        .optional(),

    y_offset:
        z.number()  //-100-0-100
        .min(-100)
        .max(100)
        .optional(),

    // Gradient properties
    gradient:
        z.boolean()
        .optional(),
        
    linear_direction:
        z.number()  //0-359
        .min(0)
        .max(359)
        .optional(),

    from_color:
        z.string()
        .optional(),
    
    to_color:
        z.string()
        .optional(),
    
    stop_point:
        z.number()
        .min(0.01)
        .max(0.99)
        .optional(),

    grayscale:
        z.boolean()
        .optional(),

    blur:
        z.number()
        .min(0)
        .max(100)
        .optional(),

    trim_edges:
        z.boolean()
        .optional(),
    
    trim_edges_val:
        z.number()
        .min(1)
        .max(99)
        .optional(),
    
    border:
        z.number()
        .optional(),
    
    border_color:
        z.string()
        .optional(),

    rotate:
        z.number()
        .min(0, '0 to 359')
        .max(359, '0 to 359')
        .optional(),
    
    flip:
        z.enum(["fl-h", "fl-v", "fl-h_v"])
        .or(z.literal("none"))
        .transform(e => e === "none" ? undefined : e)
        .optional(),

    radius:
        z.string()
        .optional(),

    background_color:
        z.string()
        .optional(),

    opacity:
        z.number()
        .min(0)
        .max(100)
        .optional(),

    // AI SCHEMA
    bg_remove:
        z.boolean()
        .optional(),
    
    //shadow
    e_dropshadow:
        z.boolean()
        .optional(),
    
    azimuth:
        z.number()
        .min(0, "0-360")
        .max(360, "0-360")
        .optional(),
    
    elevation:
        z.number()
        .min(0, "0-90")
        .max(90, "0-90")
        .optional(),
    
    saturation:
        z.number()
        .min(0, "0-100")
        .max(100, "0-100")
        .optional(),
    
    // Change Background
    change_bg:
        z.boolean()
        .optional(),

    change_prompt:
        z.string()
        .optional(),

    // Edit Background
    edit_image:
        z.boolean()
        .optional(),

    edit_prompt:
        z.string()
        .optional(),

    retouch:
        z.boolean()
        .optional(),

    upscale:
        z.boolean()
        .optional(),
    
    //Gen Image
    gen_image:
        z.boolean()
        .optional(),
    
    gen_image_prompt:
        z.string()
        .optional(),
    
    //Gen Variation
    gen_variation:
        z.boolean()
        .optional(),

    face_crop:
        z.boolean()
        .optional(),

    smart_crop:
        z.boolean()
        .optional(),

    object_aware_crop:
        z.enum([...objects] as [string, ...string[]])
        .optional(),
})

export type TransformType = z.infer<typeof TransformSchema>

export {
    TransformSchema
}