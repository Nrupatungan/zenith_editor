"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TransformType } from '@/validators/transformations.validator';

export default function ResizeOptions({
    watchedHeight,
    watchedWidth,
    watchedCropStrategy,
    control,
    form
}: {
    watchedHeight: string | undefined,
    watchedWidth: string | undefined,
    watchedCropStrategy: TransformType['crop_strategy']
    control: any
    form: any
}) {

  const getFocusOptions = (strategy: TransformType['crop_strategy']) => {
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
        <div className='flex flex-col gap-4'>
          
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={control}
              name="width"
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

            <FormField
              control={control}
              name="height"
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

            {!(watchedHeight && watchedWidth) && <FormField
            control={control}
            name="aspect_ratio"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
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
            control={control}
            name="focus"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
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
            control={control}
            name="crop_strategy"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
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
            name="background_color"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel>Padding Color</FormLabel>
                <FormControl>
                  <input
                    type="color"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}

        </div>
  )
}