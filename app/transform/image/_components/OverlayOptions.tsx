"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { fontData } from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Check, ChevronsUpDown, CircleOff, Info, Italic } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


export default function OverlayOptions({
    watchedOverlayType,
    watchedPositionType,
    control,
    form
}: {
    watchedOverlayType: "text" | "color_block" | undefined,
    watchedPositionType: "axis" | "positional" | undefined,
    control: any,
    form: any
}) {

  return (
        <div className='flex flex-col gap-4'>
            <FormField
                control={control}
                name="overlay_type"
                render={({ field }) => (
                <FormItem className='grid gap-2'>
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
                <>
                    {watchedOverlayType !== "color_block" &&
                        <>
                            <FormField
                                control={control}
                                name="text_prompt"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                    <FormLabel>Text prompt</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                            )}
                            />

                            <FormField
                            control={control}
                            name="font_family"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                <FormLabel>Font family</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-[200px] justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value
                                            ? fontData.fonts.find(
                                                (font) => font.value === field.value
                                            )?.label
                                            : "Select font family"}
                                        <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                        placeholder="Search font..."
                                        className="h-9"
                                        />
                                        <CommandList>
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                            {fontData.fonts.map((font) => (
                                            <CommandItem
                                                value={font.label}
                                                key={font.value}
                                                onSelect={() => {
                                                form.setValue("font_family", font.value)
                                                }}
                                            >
                                                {font.label}
                                                <Check
                                                className={cn(
                                                    "ml-auto",
                                                    font.value === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                                />
                                            </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        </CommandList>
                                    </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                                control={control}
                                name="typography"
                                render={() => (
                                    <FormItem>
                                        <ToggleGroup type="single" variant="outline">
                                            <ToggleGroupItem value="b" aria-label="Toggle bold"
                                            className="data-[state=on]:bg-gray-300 dark:data-[state=on]:bg-gray-600"
                                            onClick={() => {
                                                form.setValue("typography", "b")
                                            }}
                                            title="Bold"
                                            >
                                                <Bold className="h-4 w-4" />
                                            </ToggleGroupItem>
                                            
                                            <ToggleGroupItem value="i" aria-label="Toggle italic"
                                            className="data-[state=on]:bg-gray-300 dark:data-[state=on]:bg-gray-600"
                                            onClick={() => {
                                                form.setValue("typography", "i")
                                            }}
                                            title="Italic"
                                            >
                                                <Italic className="h-4 w-4" />
                                            </ToggleGroupItem>

                                            <ToggleGroupItem value="b_i" aria-label="Toggle italic"
                                            className="data-[state=on]:bg-gray-300 dark:data-[state=on]:bg-gray-600 flex gap-0"
                                            onClick={() => {
                                                form.setValue("typography", "b_i")
                                            }}
                                            title="Bold_italic"
                                            >
                                                <Bold className="size-3" />
                                                <Italic className="size-3" />
                                            </ToggleGroupItem>

                                            <ToggleGroupItem value="none" aria-label="Toggle italic"
                                            className="data-[state=on]:bg-gray-300 dark:data-[state=on]:bg-gray-600 flex gap-0"
                                            onClick={() => {
                                                form.setValue("typography", "none")
                                            }}
                                            title="None"
                                            >
                                                <CircleOff className="size-4"/>
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    <FormMessage />
                                    </FormItem>
                            )}
                            />
                        </>
                    }

                    <div className='flex flex-col gap-4'>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                            control={control}
                            name="O_width"
                            render={({ field }) => (
                                <FormItem className='grid gap-2'>
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
                                    <FormItem className='grid gap-2'>
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
                                <FormItem className='grid gap-2'>
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

                            <FormField
                            control={control}
                            name="O_radius_corner"
                            render={({ field }) => (
                                <FormItem className='grid gap-2'>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <FormLabel className="flex justify-between">
                                                Radius
                                                <Info className="size-3 text-teal-300 mr-2"/>
                                            </FormLabel>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="w-64 text-justify">
                                            <p>It is used to control the radius of the corner. To get a circle or oval shape, set the value to max.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <FormControl>
                                        <Input
                                        type="text"
                                        placeholder="0 or max"
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
                                        <FormItem className='grid gap-2'>
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
                                        <FormItem className='grid gap-2'>
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
                                        <FormItem className='grid gap-2'>
                                        <FormLabel>Font size</FormLabel>
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
                                    name="padding"
                                    render={({ field }) => (
                                        <FormItem className='grid gap-2'>
                                        <FormLabel>Padding</FormLabel>
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
                                    name="text_align"
                                    render={({ field }) => (
                                    <FormItem className='grid gap-2'>
                                        <FormLabel>Text align</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value || "none"}>
                                        <FormControl>
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select an overlay type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="left">Left</SelectItem>
                                            <SelectItem value="right">Right</SelectItem>
                                            <SelectItem value="center">Center</SelectItem>
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
                                    <FormItem className='grid gap-2'>
                                        <FormLabel>Text flip</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value || "none"}>
                                        <FormControl>
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select an overlay type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="fl-h" >Horizontal</SelectItem>
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
                                    name="O_rotate"
                                    render={({ field }) => (
                                        <FormItem className='grid gap-2'>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <FormLabel className="flex justify-between">
                                                        Text rotate
                                                        <Info className="size-3 text-teal-300"/>
                                                    </FormLabel>
                                                </TooltipTrigger>
                                                <TooltipContent side="right" className="w-64 text-justify">
                                                    <p>It is used to specify the degree by which the overlay text must be rotated. It accepts any number 0 to 180 for a clockwise rotation, or any number preceded with &quot;-&quot; e.g. -45, or -180 for counter-clockwise rotation.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            
                                            <FormControl>
                                                <Input
                                                type="number"
                                                min={-180}
                                                max={180}
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
                                          
                        </div>

                        <FormField
                        control={control}
                        name="position_type"
                        render={({ field }) => (
                        <FormItem className='grid gap-2'>
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
                                    <FormItem className='grid gap-2'>
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
                                    <FormItem className='grid gap-2'>
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
                            <FormItem className='grid gap-2'>
                                <FormLabel>Relative position</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || "none"}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select an overlay type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">Select an option</SelectItem>
                                    <SelectItem value="center">Center</SelectItem>
                                    <SelectItem value="top">Top</SelectItem>
                                    <SelectItem value="left">Left</SelectItem>
                                    <SelectItem value="bottom">Bottom</SelectItem>
                                    <SelectItem value="right">Right</SelectItem>
                                    <SelectItem value="top_left">Top left</SelectItem>
                                    <SelectItem value="top_right">Top right</SelectItem>
                                    <SelectItem value="bottom_left">Bottom left</SelectItem>
                                    <SelectItem value="bottom_right">Bottom right</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                            />
                        }
                    </div>
                </>
                
            }
            
        </div>
  )
}
