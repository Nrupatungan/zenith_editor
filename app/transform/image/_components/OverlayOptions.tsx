"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";


export default function OverlayOptions({
    watchedOverlayType,
    watchedPositionType,
    control
}: {
    watchedOverlayType: "text" | "color_block" | undefined,
    watchedPositionType: "axis" | "positional" | undefined,
    control: any
}) {

  return (
        <div className='flex flex-col gap-4'>
            <FormField
                control={control}
                name="overlay_type"
                render={({ field }) => (
                <FormItem className='grid gap-3'>
                    <FormLabel>Overlay type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || "none"}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select an overlay type" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="none">Select an option</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="color_block">Color Block</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            {!(watchedOverlayType !== "color_block" && watchedOverlayType !== "text") &&
                <div className='flex flex-col gap-4'>
                    <div className="grid grid-cols-2 gap-3">
                    <FormField
                    control={control}
                    name="O_width"
                    render={({ field }) => (
                        <FormItem className='grid gap-3'>
                        <FormLabel>Width</FormLabel>
                        <FormControl>
                            <Input
                            type="text"
                            placeholder="e.g. 10"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />

                    {watchedOverlayType !== "text" && 
                        <FormField
                        control={control}
                        name="O_height"
                        render={({ field }) => (
                            <FormItem className='grid gap-3'>
                            <FormLabel>Height</FormLabel>
                            <FormControl>
                                <Input
                                type="text"
                                placeholder="e.g. 10"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                    }

                    <FormField
                    control={control}
                    name="O_background_color"
                    render={({ field }) => (
                        <FormItem className='grid gap-3'>
                        <FormLabel>Background</FormLabel>
                        <FormControl>
                            <Input
                            type="color"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />

                    {watchedOverlayType !== "color_block" &&
                        <>
                            <FormField
                            control={control}
                            name="font_color"
                            render={({ field }) => (
                                <FormItem className='grid gap-3'>
                                <FormLabel>Font color</FormLabel>
                                <FormControl>
                                    <Input
                                    type="color"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                            control={control}
                            name="line_height"
                            render={({ field }) => (
                                <FormItem className='grid gap-3'>
                                <FormLabel>Line height</FormLabel>
                                <FormControl>
                                    <Input
                                    type="text"
                                    placeholder="e.g. 10"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                            control={control}
                            name="font_size"
                            render={({ field }) => (
                                <FormItem className='grid gap-3'>
                                <FormLabel>Font size</FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    placeholder="eg 0"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                            control={control}
                            name="padding"
                            render={({ field }) => (
                                <FormItem className='grid gap-3'>
                                <FormLabel>Padding</FormLabel>
                                <FormControl>
                                    <Input
                                    type="text"
                                    placeholder="eg 0"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                                )}
                            />
                            
                            <FormField
                            control={control}
                            name="text_align"
                            render={({ field }) => (
                            <FormItem className='grid gap-3'>
                                <FormLabel>Text align</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || "none"}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select an overlay type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="color_block">Block</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                            />

                            <FormField
                            control={control}
                            name="text_flip"
                            render={({ field }) => (
                            <FormItem className='grid gap-3'>
                                <FormLabel>Text flip</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || "none"}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select an overlay type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="fl-h" >Horizon</SelectItem>
                                    <SelectItem value="fl-v">Vertical</SelectItem>
                                    <SelectItem value="fl-h_v">Both</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                            />

                            <FormField
                            control={control}
                            name="rotate"
                            render={({ field }) => (
                                <FormItem className='grid gap-3'>
                                <FormLabel>Text rotate</FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    placeholder="eg 0"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                                )}
                            />
                        </>
                    }

                    <FormField
                    control={control}
                    name="transparency"
                    render={({ field }) => (
                        <FormItem className='grid gap-3'>
                        <FormLabel>Alpha</FormLabel>
                        <FormControl>
                            <Input
                            type="number"
                            placeholder="eg 0"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                    />
                
            
                    </div>

                    <FormField
                    control={control}
                    name="position_type"
                    render={({ field }) => (
                    <FormItem className='grid gap-3'>
                        <FormLabel>Position type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || "none"}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select an overlay type" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="none">Select an option</SelectItem>
                            <SelectItem value="positional">Positional</SelectItem>
                            <SelectItem value="axis">Axis</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                    />

                    { watchedPositionType === "axis" && 
                        <div className="flex gap-3">
                            <FormField
                            control={control}
                            name="lx"
                            render={({ field }) => (
                                <FormItem className='grid gap-3'>
                                <FormLabel>LX-axis</FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    placeholder="eg 0"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={control}
                            name="ly"
                            render={({ field }) => (
                                <FormItem className='grid gap-3'>
                                <FormLabel>LY-axis</FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    placeholder="eg 0"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                    }

                    {watchedPositionType === "positional" && 
                        <FormField
                        control={control}
                        name="relative_position"
                        render={({ field }) => (
                        <FormItem className='grid gap-3'>
                            <FormLabel>Relative position</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || "none"}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select an overlay type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="none">Select an option</SelectItem>
                                <SelectItem value="fo-custom">Custom</SelectItem>
                                <SelectItem value="fo-center">Center</SelectItem>
                                <SelectItem value="fo-top">Top</SelectItem>
                                <SelectItem value="fo-left">Left</SelectItem>
                                <SelectItem value="fo-bottom">Bottom</SelectItem>
                                <SelectItem value="fo-right">Right</SelectItem>
                                <SelectItem value="fo-top_left">Top left</SelectItem>
                                <SelectItem value="fo-top_right">Top right</SelectItem>
                                <SelectItem value="fo-bottom_left">Bottom left</SelectItem>
                                <SelectItem value="fo-bottom_right">Bottom right</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                        />
                    }
                </div>
            }
            
        </div>
  )
}
