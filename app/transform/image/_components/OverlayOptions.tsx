"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { buildParams } from "@/lib/utils";
import useModalStore from "@/store";
import { OverlaySchema, OverlayType } from "@/validators/overlay.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function OverlayOptions() {
    const { url, setTransformUrl } = useModalStore();
    
    const form = useForm<OverlayType>({
    resolver: zodResolver(OverlaySchema),
    defaultValues: {
      O_width: "",
      O_height: "",
      font_size: undefined,
      font_color: "#000000",
      background_color: "#FFFFFF",
      padding: "",
      line_height: "",
      transparency: undefined,
      lx: undefined,
      ly: undefined,
      overlay_type: undefined,
      text_align: undefined,
      rotate: undefined,
      flip: undefined,
      position_type: undefined,
      relative_position: undefined
    }
  });
    
    const { handleSubmit, control, formState, watch, getValues, reset } = form;

    const watchedWidth = watch("O_width");
    const watchedHeight = watch("O_height");
    const watchedFontSize = watch("font_size");
    const watchedFontColor = watch("font_color");
    const watchedBackgroundColor = watch("background_color");
    const watchedPadding = watch("padding");
    const watchedLineHeight = watch("line_height");
    const watchedTransparency = watch("transparency");
    const watchedLx = watch("lx");
    const watchedLy = watch("ly");
    const watchedOverlayType = watch("overlay_type");
    const watchedTextAlign = watch("text_align");
    const watchedRotate = watch("rotate");
    const watchedFlip = watch("flip");
    const watchedPositionType = watch("position_type");
    const watchedRelativePosition = watch("relative_position");

    const isInitialMount = useRef(true);
    
    const submitHandler = useCallback(async (values: OverlayType) => {
    let transformationString;

    const paramsArray = buildParams(values);

    if (paramsArray.length > 0) {
        transformationString = `?tr=${paramsArray.join(',')}`;
    } else {
        transformationString = '';
    }

    const newUrl = `${url}${transformationString}`;
    console.log("Submitting new URL:", newUrl);
    // setTransformUrl(newUrl);
    }, [url, setTransformUrl]);

    useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }

    const timeout = setTimeout(() => {
        submitHandler(getValues());
    }, 300);

    return () => clearTimeout(timeout);
    }, [
    watchedWidth,
    watchedHeight,
    watchedFontSize,
    watchedFontColor,
    watchedBackgroundColor,
    watchedPadding,
    watchedLineHeight,
    watchedTransparency,
    watchedLx,
    watchedLy,
    watchedOverlayType,
    watchedTextAlign,
    watchedRotate,
    watchedFlip,
    watchedPositionType,
    watchedRelativePosition,
    submitHandler,
    getValues
    ]);

    const handleResetForm = () => {
        reset({
            O_width: "",
            O_height: "",
            font_size: undefined,
            font_color: "#000000",
            background_color: "#FFFFFF",
            padding: undefined,
            line_height: "",
            transparency: undefined,
            lx: undefined,
            ly: undefined,
            overlay_type: undefined,
            text_align: undefined,
            rotate: undefined,
            flip: undefined,
            position_type: undefined,
            relative_position: undefined
        });
        
        setTransformUrl(url); // Reset to the original image URL
    };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="p-3"
        autoComplete="false"
      >
        <div className='flex flex-col gap-4'>
            <FormField
                control={form.control}
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
                    name="background_color"
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
                            control={form.control}
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
                            control={form.control}
                            name="flip"
                            render={({ field }) => (
                            <FormItem className='grid gap-3'>
                                <FormLabel>Rotate</FormLabel>
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
                                <FormLabel>Rotate</FormLabel>
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
                    control={form.control}
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
                        control={form.control}
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

            <Button
                type="button" // Change type to "button" to prevent accidental form submission
                className='w-full cursor-pointer'
                onClick={handleResetForm} // Call your custom reset handler
            >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}
