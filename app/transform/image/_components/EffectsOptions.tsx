"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";

export default function EffectsOptions({
  watchedSharpen, 
  watchedTrim_edges, 
  watchedShadow, 
  watchedGradient,
  control, 
}: {
  watchedSharpen: boolean, 
  watchedTrim_edges: boolean, 
  watchedShadow: boolean, 
  watchedGradient: boolean,
  control: any,
  form: any,
}) {
  return (
    <div className='flex flex-col gap-4'>
      <FormField
          control={control}
          name="contrast"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
              <div className="space-y-0.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Contrast
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>It is used to automatically enhance the contrast of the image by using the full intensity values that a particular image format allows. This means that the lighter sections of an image become even lighter and the darker sections become even brighter, thereby enhancing the contrast.</p>
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
          name="grayscale"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
              <div className="space-y-0.5">
                <Tooltip>
                      <TooltipTrigger asChild>
                          <FormLabel>
                              Grayscale
                          </FormLabel>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="w-40 text-justify">
                          <p>Used to turn an image into a grayscale version.</p>
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
            name="sharpen"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Sharpen
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>It is used to sharpen the input image. It is useful when highlighting the edges and finer details within an image.</p>
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

        {watchedSharpen && <FormField
            control={control}
            name="sharpen_val"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormControl>
                  <Slider defaultValue={[0]} value={field.value} max={10} step={1} onValueChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}
      </div>

      <div className="p-3 border rounded-lg shadow-lg flex flex-col gap-4">
        <FormField
          control={control}
          name="trim_edges"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Tooltip>
                <TooltipTrigger asChild>
                    <FormLabel>
                        Trim edges
                    </FormLabel>
                </TooltipTrigger>
                <TooltipContent side="top" className="w-64 text-justify">
                    <p>This is used to add a gradient overlay over an input image. The gradient formed is a linear gradient containing two colors, and it can be customized.</p>
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

        {watchedTrim_edges && <FormField
            control={control}
            name="trim_edges_val"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormControl>
                  <Slider defaultValue={[1]} value={field.value} min={1} max={99} step={1} onValueChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}
      </div>

      <div className="p-3 border rounded-lg shadow-lg flex flex-col gap-4">
        <FormField
          control={control}
          name="shadow"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Tooltip>
                <TooltipTrigger asChild>
                    <FormLabel>
                        Shadow
                    </FormLabel>
                </TooltipTrigger>
                <TooltipContent side="top" className="w-64 text-justify">
                    <p>The shadow is applied under the areas constituted by the non-transparent pixels in the input image. You can adjust the shadow's saturation, blur level, and positional offsets with the following parameters.</p>
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

        {watchedShadow && 
          <>
            <FormField
              control={control}
              name="shadow_blur"
              render={({ field }) => (
                <FormItem className='grid gap-3'>
                    <FormLabel>Blur</FormLabel>
                  <FormControl>
                    <Slider defaultValue={[0]} value={field.value} max={15} step={1} onValueChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="shadow_saturation"
              render={({ field }) => (
                <FormItem className='grid gap-3'>
                  <FormLabel>Saturation</FormLabel>
                  <FormControl>
                    <Slider defaultValue={[0]} value={field.value} max={100} step={1} onValueChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="x_offset"
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>X Offset</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={-100}
                        max={100}
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
                name="y_offset"
                render={({ field }) => (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Y Offset</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={-100}
                        max={100}
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        }

      </div>

      <div className="p-3 border rounded-lg shadow-lg flex flex-col gap-4">
        <FormField
          control={control}
          name="gradient"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Tooltip>
                <TooltipTrigger asChild>
                    <FormLabel>
                        Gradient
                    </FormLabel>
                </TooltipTrigger>
                <TooltipContent side="top" className="w-64 text-justify">
                    <p>This is used to add a gradient overlay over an input image. The gradient formed is a linear gradient containing two colors, and it can be customized.</p>
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

        {watchedGradient && <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="linear_direction"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Direction
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>Sets the direction vector of the linear gradient. For enhanced control over the direction, this parameter also accepts an integer in the range 0-359.</p>
                  </TooltipContent>
                </Tooltip>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={359}
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
            name="from_color"
            render={({ field }) => (
                <FormItem className='grid gap-2'>
                <FormLabel>From</FormLabel>
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
            name="to_color"
            render={({ field }) => (
                <FormItem className='grid gap-2'>
                <FormLabel>To</FormLabel>
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
          name="stop_point"
          render={({ field }) => (
            <FormItem className="grid gap-7">
                <FormLabel>Stop point</FormLabel>
              <FormControl>
                <Slider defaultValue={[0]} value={field.value} min={0.00} max={1} step={0.01} onValueChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        </div>}
        
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
            control={control}
            name="border"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Border width
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>This adds a border to the image. It accepts two parameters - the width of the border and the color of the border.</p>
                  </TooltipContent>
                </Tooltip>
                <FormControl>
                  <Input
                    type="number"
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
          name="border_color"
          render={({ field }) => (
              <FormItem className='grid gap-2'>
              <FormLabel>Border color</FormLabel>
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
            name="blur"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Blur
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>Used to specify the Gaussian blur that must be applied to an image. The value of bl specifies the radius of the Gaussian Blur that is to be applied. Higher the value, the larger the radius of the Gaussian Blur. Possible values include integers between 1 and 100.</p>
                  </TooltipContent>
                </Tooltip>
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

        <FormField
            control={control}
            name="rotate"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Rotate
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>It is used to specify the degree by which the output image must be rotated or specifies the use of EXIF Orientation Tag for the rotation of image using the auto parameter. Possible values - Any number for a clockwise rotation, or any number preceded with N for counter-clockwise rotation, and auto.</p>
                  </TooltipContent>
                </Tooltip>
                <FormControl>
                  <Input
                    type="number"
                    min={-180}
                    max={180}
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
          name="flip"
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Flip
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>It is used to flip/mirror an image horizontally, vertically, or in both directions. Possible values - h (horizontal), v (vertical), h_v (horizontal and vertical)</p>
                  </TooltipContent>
                </Tooltip>
              <Select onValueChange={field.onChange} value={field.value || "none"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a flip mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="fl-h">horizontal</SelectItem>
                  <SelectItem value="fl-v">vertical</SelectItem>
                  <SelectItem value="fl-h_v">both</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="radius"
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

        <FormField
          control={control}
          name="background_color"
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
            name="opacity"
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                      <FormLabel>
                          Opacity
                      </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-64 text-justify">
                      <p>It is used to specify the opacity level of the output image. A non-transparent image can be made semi-transparent by specifying an opacity level that is less than 100. An already transparent image is made more transparent based on the specified value. It accepts numerical values ranging from 0 to 100.</p>
                  </TooltipContent>
                </Tooltip>
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
      </div>

    </div>
  )
}
