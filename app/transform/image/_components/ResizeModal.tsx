"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { buildResizeParams } from '@/lib/utils';
import useModalStore from '@/store';
import { ResizeModalSchema, ResizeModalType } from '@/validators/resize.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';

const ResizeModal = () => {
  const {resizeModalState, closeResizeModal, url, setTransformUrl} = useModalStore();

  const form = useForm<ResizeModalType>({
    resolver: zodResolver(ResizeModalSchema),
    defaultValues: {
      width: "",
      height: "",
      padding_color: "#ff0000"
    }
  })

  const {handleSubmit, control, formState, watch} = form;
  
  const strategy = watch("crop_strategy");
  const height = watch("height");
  const width = watch("width");

  const handleClose = () => {
    form.reset();
    closeResizeModal();
  }
  
  const submit = async (values: ResizeModalType) => {
    let transformationString;

    const paramsArray = buildResizeParams(values)

    if (paramsArray.length > 0) {
      transformationString = `?tr=${paramsArray.join(',')}`;
    }

    console.log(transformationString);
    setTransformUrl(`${url}${transformationString}`);
    handleClose();
  };

  const getFocusOptions = (strategy: ResizeModalType['crop_strategy']) => {
  switch (strategy) {
    case 'cm-pad_resize':
      return (
        <>
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
          <SelectItem value="fo-custom">Custom</SelectItem>
        </>
      );
    case 'cm-extract':
      return (
        <>
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

  if(!resizeModalState) return null;

  return (
    <div data-slot="dialog-portal"
    >
      <div
        data-state={resizeModalState ? "open" : "closed"}
        data-slot="dialog-overlay"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60"
        onClick={handleClose} // Added onClick event to close modal
      >
        <div
          data-slot="dialog-content"
          data-state={resizeModalState ? "open" : "closed"}
          className="bg-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[350px] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-4 shadow-lg duration-200"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <button
            data-state={resizeModalState ? "open" : "closed"}
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            onClick={handleClose}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </button>

          <h2>Resize and crop</h2>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(submit)}
              className="p-3"
              autoComplete="false"
            >
              <div className='flex flex-col gap-4'>
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

                {!(height && width) && <FormField
                  control={form.control}
                  name="aspect_ratio"
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel>Aspect Ratio</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an aspect ratio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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

                <FormField
                  control={form.control}
                  name="crop_strategy"
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel>Crop Strategy</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a crop strategy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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

                {(strategy !== 'c-force' && strategy !== 'c-at_max' && strategy !== "c-at_max_enlarge" && strategy !== "cm-pad_extract") && <FormField
                  control={form.control}
                  name="focus"
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel>Focus</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a focus type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getFocusOptions(strategy)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />}
          
                {(strategy === "cm-pad_extract" || strategy === "cm-pad_resize") && <FormField
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

                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full cursor-pointer"
                >
                  Submit
                </Button>

              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ResizeModal