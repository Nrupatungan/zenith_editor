"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { buildParams } from '@/lib/utils';
import useModalStore from '@/store';
import { ResizeSchema, ResizeType } from '@/validators/resize.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form';

export default function ResizeOptions() {
  const { url, setTransformUrl } = useModalStore();

  const form = useForm<ResizeType>({
    resolver: zodResolver(ResizeSchema),
    defaultValues: {
      width: "",
      height: "",
      padding_color: "#ff0000",
      // Set to undefined by default to reflect the schema's transformed state
      crop_strategy: undefined,
      aspect_ratio: undefined,
      focus: undefined,
    }
  });

  const { handleSubmit, control, formState, watch, getValues, reset } = form;

  const watchedWidth = watch("width");
  const watchedHeight = watch("height");
  const watchedCropStrategy = watch("crop_strategy");
  const watchedAspectRatio = watch("aspect_ratio");
  const watchedFocus = watch("focus");
  const watchedPaddingColor = watch("padding_color");

  const isInitialMount = useRef(true);

  const submitHandler = useCallback(async (values: ResizeType) => {
    let transformationString;

    const paramsArray = buildParams(values);

    if (paramsArray.length > 0) {
      transformationString = `?tr=${paramsArray.join(',')}`;
    } else {
      transformationString = '';
    }

    const newUrl = `${url}${transformationString}`;
    console.log("Submitting new URL:", newUrl);
    setTransformUrl(newUrl);
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
    watchedCropStrategy,
    watchedAspectRatio,
    watchedFocus,
    watchedPaddingColor,
    submitHandler,
    getValues
  ]);


  const handleResetForm = () => {
    reset({
      width: "",
      height: "",
      padding_color: "#ff0000",
      crop_strategy: undefined,
      aspect_ratio: undefined,
      focus: undefined,
    });
    
    setTransformUrl(url); // Reset to the original image URL
  };


  const getFocusOptions = (strategy: ResizeType['crop_strategy']) => {
    switch (strategy) {
      case 'cm-pad_resize':
        return (
          <>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="fo-center">Center</SelectItem>
            <SelectItem value="fo-top">Top</SelectItem>
            <SelectItem value="fo-left">Left</SelectItem>
            <SelectItem value="fo-bottom">Bottom</SelectItem>
            <SelectItem value="fo-right">Right</SelectItem>
          </>
        );
      case 'c-maintain_ratio':
        return (
          <>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="fo-custom">Custom</SelectItem>
          </>
        );
      case 'cm-extract':
        return (
          <>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="fo-center">Center</SelectItem>
            <SelectItem value="fo-top">Top</SelectItem>
            <SelectItem value="fo-left">Left</SelectItem>
            <SelectItem value="fo-bottom">Bottom</SelectItem>
            <SelectItem value="fo-right">Right</SelectItem>
            <SelectItem value="fo-top_left">Top left</SelectItem>
            <SelectItem value="fo-top_right">Top right</SelectItem>
            <SelectItem value="fo-bottom_left">Bottom left</SelectItem>
            <SelectItem value="fo-bottom_right">Bottom right</SelectItem>
          </>
        );
      default:
        return (
          <>
            <SelectItem value="none">None</SelectItem>
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
          </>
        );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="p-3"
        autoComplete="false"
      >
        <div className='flex flex-col gap-4'>
          
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={control}
              name="width"
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

            <FormField
              control={control}
              name="height"
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

            {!(watchedHeight && watchedWidth) && <FormField
            control={form.control}
            name="aspect_ratio"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Aspect ratio</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || "none"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an aspect ratio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="3-2">3:2</SelectItem>
                    <SelectItem value="4-3">4:3</SelectItem>
                    <SelectItem value="5-4">5:4</SelectItem>
                    <SelectItem value="16-10">16:10</SelectItem>
                    <SelectItem value="16-9">16:9</SelectItem>
                    <SelectItem value="1.85-1">1.85:1</SelectItem>
                    <SelectItem value="2.35-1">2.35:1</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />}

          {(watchedCropStrategy !== 'c-force' && watchedCropStrategy !== 'c-at_max' && watchedCropStrategy !== "c-at_max_enlarge" && watchedCropStrategy !== "cm-pad_extract") && <FormField
            control={form.control}
            name="focus"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Focus</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || "none"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a focus type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getFocusOptions(watchedCropStrategy)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />}
          </div>

          <FormField
            control={form.control}
            name="crop_strategy"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Crop Strategy</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || "none"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a crop strategy" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Select an option</SelectItem>
                    <SelectItem value="cm-pad_resize">Pad Resize</SelectItem>
                    <SelectItem value="c-force">Forced</SelectItem>
                    <SelectItem value="c-at_max">Max Size</SelectItem>
                    <SelectItem value="c-at_max_enlarge">Max Size Enlarge</SelectItem>
                    <SelectItem value="c-maintain_ratio">Maintain Ratio</SelectItem>
                    <SelectItem value="cm-extract">Extract</SelectItem>
                    <SelectItem value="cm-pad_extract">Pad Extract</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {(watchedCropStrategy === "cm-pad_extract" || watchedCropStrategy === "cm-pad_resize") && <FormField
            control={control}
            name="padding_color"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Padding Color</FormLabel>
                <FormControl className='w-20'>
                  <Input
                    type="color"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}

          {/* <Button
            type="button" // Change type to "button" to prevent accidental form submission
            className='w-full cursor-pointer'
            onClick={handleResetForm} // Call your custom reset handler
          >
            Reset
          </Button> */}

          {/* <Button
            type="submit"
            disabled={formState.isSubmitting}
            className="w-full cursor-pointer"
          >
            Apply Changes
          </Button> */}

        </div>
      </form>
    </Form>
  )
}