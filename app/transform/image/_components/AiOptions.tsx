"use client"

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { focusObjects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown} from "lucide-react";

export default function AiOptions({
  control,
  form, 
  watchedE_dropshadow, 
  watchedChange_bg, 
  watchedEdit_image, 
  watchedGen_image
}: {
  control: any,
  form: any,
  watchedE_dropshadow: boolean, 
  watchedChange_bg: boolean, 
  watchedEdit_image: boolean, 
  watchedGen_image: boolean
}) {
  return (
    <div className='flex flex-col gap-4'>

      <FormField
          control={control}
          name="bg_remove"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
              <div className="space-y-0.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Remove background
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>Add a drop shadow around an object in an image. You can control the direction, elevation, and saturation of the light source.</p>
                  </TooltipContent>
               </Tooltip>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

      <div className="p-3 border rounded-lg shadow-lg flex flex-col gap-4">
        <FormField
        control={control}
        name="e_dropshadow"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Drop shadow
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>Add a drop shadow around an object in an image. You can control the direction, elevation, and saturation of the light source.</p>
                  </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
        />

        {watchedE_dropshadow && <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="azimuth"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel>Azimuth</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={360}
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="elevation"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel>Elevation</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={90}
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="saturation"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel>Saturation</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>}
      </div>

      

      <div className="p-3 border rounded-lg shadow-lg flex flex-col gap-4">
            <FormField
            control={control}
            name="change_bg"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Change background
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>Easily transform the background of an image by providing a descriptive text prompt.</p>
                  </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
            />

            {watchedChange_bg && <FormField
                control={control}
                name="change_prompt"
                render={({ field }) => (
                    <FormItem className="grid gap-2">
                    <FormLabel>Prompt</FormLabel>
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
            />}
      </div>

      <div className="p-3 border rounded-lg shadow-lg flex flex-col gap-4">
            <FormField
            control={control}
            name="edit_image"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Edit Image
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>Modify the contents of an image using the e-edit transformation by providing a descriptive text prompt. The output image dimensions will be 1024x1024 if the input image is square. Otherwise, the output image dimensions will be one of 1536x1024 or 1024x1536, depending on which side is longer in the input image.</p>
                  </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
            />

            {watchedEdit_image && <FormField
                control={control}
                name="edit_prompt"
                render={({ field }) => (
                    <FormItem className="grid gap-2">
                    <FormLabel>Prompt</FormLabel>
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
            />}
      </div>

      <div className="p-3 border rounded-lg shadow-lg flex flex-col gap-4">
              <FormField
              control={control}
              name="gen_image"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                          <FormLabel>
                              Generate Image
                          </FormLabel>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="w-64 text-justify">
                          <p>You can generate an image based on a text prompt. The text prompt can simply describe the image you want to generate.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
              />

              {watchedGen_image && <FormField
                  control={control}
                  name="gen_image_prompt"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Prompt</FormLabel>
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
              />}
      </div>

      <FormField
          control={control}
          name="gen_variation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
              <div className="space-y-0.5">
                <Tooltip>
                      <TooltipTrigger asChild>
                          <FormLabel>
                              Generate Variation
                          </FormLabel>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="w-64 text-justify">
                          <p>This will generate a new image with slight variations from the original image. The variations include changes in color, texture, and other visual elements. However, the model will try to preserve the structure and essence of the original image.</p>
                      </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

      <FormField
          control={control}
          name="retouch"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
              <div className="space-y-0.5">
                <Tooltip>
                      <TooltipTrigger asChild>
                          <FormLabel>
                              Retouch
                          </FormLabel>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="w-64 text-justify">
                          <p>Improve the quality of an image using the e-retouch transformation parameter. The input image's resolution must be less than 16 MP.</p>
                      </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="upscale"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
              <div className="space-y-0.5">
                <Tooltip>
                      <TooltipTrigger asChild>
                          <FormLabel>
                              Upscale
                          </FormLabel>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="w-64 text-justify">
                          <p>Increase the resolution of an image using the e-upscale transformation parameter. The input image's resolution must be less than 16 MP. The output image's resolution will be 16 MP.</p>
                      </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

      <div className="p-3 border rounded-lg shadow-lg flex flex-col gap-4">
          <p className="text-sm underline">AI Cropping</p>
          <FormField
          control={control}
          name="face_crop"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
              <div className="space-y-0.5">
                <Tooltip>
                      <TooltipTrigger asChild>
                          <FormLabel>
                              Face crop
                          </FormLabel>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="w-64 text-justify">
                          <p>Crop an image based on the detected face using the fo-face transformation parameter. Optionally, zoom in or out using zoom transformation.</p>
                      </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      
        <FormField
            control={control}
            name="smart_crop"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
                <div className="space-y-0.5">
                  <Tooltip>
                        <TooltipTrigger asChild>
                            <FormLabel>
                                Smart crop
                            </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="w-64 text-justify">
                            <p>Automatically focus on the most important part of an image using the fo-auto transformation parameter.</p>
                        </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

        <FormField
          control={control}
          name="object_aware_crop"
          render={({ field }) => (
              <FormItem className="grid gap-2">
              <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel className="pl-1.5">
                          Object aware crop
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>We can also crop out a particular object of interest out of multiple different objects present in an image.</p>
                  </TooltipContent>
              </Tooltip>
              <Popover>
                  <PopoverTrigger asChild>
                  <FormControl>
                      <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                      )}
                      >
                      {field.value
                          ? focusObjects.objects.find(
                              (obj) => obj.value === field.value
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
                      <CommandEmpty>No object found.</CommandEmpty>
                      <CommandGroup>
                          {focusObjects.objects.map((obj) => (
                          <CommandItem
                              value={obj.label}
                              key={obj.value}
                              onSelect={() => {
                              form.setValue("object_aware_crop", obj.value)
                              }}
                          >
                              {obj.label}
                              <Check
                              className={cn(
                                  "ml-auto",
                                  obj.value === field.value
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
      </div>

    </div>
  )
}
