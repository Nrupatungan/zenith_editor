import { z } from "zod";

const OverlayModalSchema = z.object({
    overlay_type: z.enum(["text", "color"]),
    position_type: z.enum(["positional", "axis"]),
    width: z.string(),
    height: z.string(),
    lx: z.number(),
    ly: z.number(),
    relative_position: z.enum(["center", "top", "left", "bottom", "right", "top_left", "top_right", "bottom_left", "bottom_right"]),
})

export type OverlayModalType = z.infer<typeof OverlayModalSchema>

export {
    OverlayModalSchema
}