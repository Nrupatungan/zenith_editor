import { TransformType } from "@/validators/transformations.validator";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(fullName: string) {
  return fullName
    .split(' ')
    .map(name => name[0].toUpperCase())
    .join('');
}

function getOrdinal(n: number) {
  if (n > 3 && n < 21) return "th";
  switch (n % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

export function formatDateWithOrdinal(dateInput: string | number | Date) {
  const date = new Date(dateInput);
  const day = date.getDate();
  const ordinal = getOrdinal(day);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}${ordinal} ${year}`;
}

function stringToBase64Url(str: string) {
  // Encode the string to Base64
  const base64 = btoa(str);

  // Convert Base64 to Base64 URL-encoded by replacing '+' with '-', '/' with '_', and removing padding '='
  const base64Url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return base64Url;
}

function getShadowParam({shadow, shadow_blur, shadow_saturation, x_offset, y_offset}: {shadow: TransformType['shadow'], shadow_blur:TransformType['shadow_blur'], shadow_saturation: TransformType['shadow_saturation'], x_offset: TransformType['x_offset'], y_offset: TransformType['y_offset']}) {
  // If shadow is not enabled, return an empty string or null
  if (!shadow) {
    return null;
  }

  let paramString = "e-shadow";

  // Check if any of the specific shadow parameters are provided
  // If all are undefined/null/0, it means the default "e-shadow" is desired
  if (shadow_blur || shadow_saturation || x_offset || y_offset) {
    paramString += "-";

    // Append blur if provided
    if (shadow_blur) {
      paramString += `bl-${shadow_blur}`;
    }

    // Append saturation if provided
    if (shadow_saturation) {
      // Add underscore separator only if blur was added or it's the first parameter
      if (shadow_blur) {
        paramString += "_";
      }
      paramString += `st-${shadow_saturation}`;
    }

    // Append x-offset if provided
    if (x_offset) {
      // Add underscore separator only if blur or saturation was added
      if (shadow_blur || shadow_saturation) {
        paramString += "_";
      }
      const formattedXOffset = x_offset < 0 ? `N${Math.abs(x_offset)}` : x_offset;
      paramString += `x-${formattedXOffset}`;
    }

    // Append y-offset if provided, handling negative values with 'N'
    if (y_offset) {
      // Add underscore separator only if blur, saturation, or x-offset was added
      if (shadow_blur || shadow_saturation || x_offset) {
        paramString += "_";
      }
      // Handle negative y_offset with 'N' prefix
      const formattedYOffset = y_offset < 0 ? `N${Math.abs(y_offset)}` : y_offset;
      paramString += `y-${formattedYOffset}`;
    }
  }

  return paramString;
}

function getGradientParam({gradient, linear_direction, from_color, to_color, stop_point}: {gradient:TransformType['gradient'], linear_direction:TransformType['linear_direction'], from_color:TransformType['from_color'], to_color:TransformType['to_color'], stop_point:TransformType['stop_point']}) {
  if (!gradient) {
    return null;
  }

  let paramString = "e-gradient";
  let parts = [];

  if (linear_direction) {
    parts.push(`ld-${getZero(linear_direction)}`);
  }
  if (from_color) {
    parts.push(`from-${from_color}`);
  }
  if (to_color) {
    parts.push(`to-${to_color}`);
  }
  // Check for undefined/null as 0 is a valid stop_point
  if (stop_point !== undefined && stop_point !== null) {
    parts.push(`sp-${stop_point}`);
  }

  if (parts.length > 0) {
    paramString += "-" + parts.join("_");
  }

  return paramString;
}

function getZero(number: number){
  const zeroVal = number < 0 ? "0" : number;
  return zeroVal
}

export function buildParams(values: TransformType): string[]{
  const {width, height, padding_color, aspect_ratio, focus, crop_strategy, bg_remove, e_dropshadow, azimuth, elevation, saturation, change_bg, change_prompt, edit_image, edit_prompt, retouch, upscale, gen_image, gen_image_prompt, gen_variation, smart_crop, face_crop, object_aware_crop, contrast, sharpen, sharpen_val, shadow, shadow_blur, shadow_saturation, x_offset, y_offset, gradient, linear_direction, from_color, to_color, stop_point, grayscale, blur, trim_edges, trim_edges_val, border, border_color, rotate, flip, radius, background_color, opacity, O_width, O_height, O_background_color, O_radius_corner, O_rotate, overlay_type, text_align, text_flip, text_prompt, font_color, font_family, font_size, padding, position_type, line_height, typography, lx, ly, relative_position} = values;

  const params: string[] = [];

  if(sharpen && !sharpen_val){
    params.push("e-sharpen")
  }

  if(sharpen && sharpen_val){
    params.push(`e-sharpen-${sharpen_val}`)
  }

  if(trim_edges && !trim_edges_val){
    params.push("trim")
  }

  if(trim_edges && trim_edges_val){
    params.push(`trim-${trim_edges_val}`)
  }

  if (shadow) {
    params.push(getShadowParam({shadow, shadow_blur, shadow_saturation, x_offset, y_offset})!);
  }

  if(blur){
    params.push(`bl-${getZero(blur)}`)
  }

  if (width) {
    params.push(`w-${width}`);
  }
  if (height) {
    params.push(`h-${height}`);
  }

  const gradientParam = getGradientParam({gradient, linear_direction, from_color, to_color, stop_point});
  if (gradientParam) {
    params.push(gradientParam);
  }

  if(border && !border_color){
    params.push(`b-${getZero(border)}`);
  }

  if(border && border_color){
    params.push(`b-${getZero(border)}_${border_color}`);
  }

  if(contrast){
    params.push("e-contrast")
  }

  if(grayscale){
    params.push("e-grayscale")
  }

  if(rotate){
    const formattedRotateVal = rotate < 0 ? `N${Math.abs(rotate)}` : rotate;
    params.push(`rt-${formattedRotateVal}`)
  }

  if(flip){
    params.push(flip)
  }

  if(radius){
    params.push(`r-${radius}`)
  }

  if(opacity){
    params.push(`o-${getZero(opacity)}`)
  }

  if(background_color){
    params.push(`bg-${background_color}`)
  }

  if (aspect_ratio) {
    params.push(`ar-${aspect_ratio}`);
  }

  if (crop_strategy) {
    if (crop_strategy === "cm-pad_extract" || crop_strategy === "cm-pad_resize") {
      params.push(crop_strategy);
      // Ensure padding_color is valid before adding
      if (padding_color) {
          params.push(`bg-${padding_color.slice(1).toUpperCase()}`);
      }
    } else {
      params.push(crop_strategy);
    }
  }

  if(focus){
    if(crop_strategy !== 'c-force' && crop_strategy !== 'c-at_max' && crop_strategy !== "c-at_max_enlarge" && crop_strategy !== "cm-pad_extract"){
      params.push(focus)
    }
  }

  return params;
}