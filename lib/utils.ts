// import useModalStore from "@/store";
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

  if (!shadow) {
    return null;
  }

  let paramString = "e-shadow";

  if (shadow_blur || shadow_saturation || x_offset || y_offset) {
    paramString += "-";


    if (shadow_blur) {
      paramString += `bl-${shadow_blur}`;
    }

    if (shadow_saturation) {
      if (shadow_blur) {
        paramString += "_";
      }
      paramString += `st-${shadow_saturation}`;
    }

    if (x_offset) {
      if (shadow_blur || shadow_saturation) {
        paramString += "_";
      }
      const formattedXOffset = x_offset < 0 ? `N${Math.abs(x_offset)}` : x_offset;
      paramString += `x-${formattedXOffset}`;
    }

    if (y_offset) {
      if (shadow_blur || shadow_saturation || x_offset) {
        paramString += "_";
      }

      const formattedYOffset = y_offset < 0 ? `N${Math.abs(y_offset)}` : y_offset;
      paramString += `y-${formattedYOffset}`;
    }
  }

  return paramString;
}

function getDropShadow({e_dropshadow, azimuth, elevation, saturation}: {e_dropshadow:TransformType['e_dropshadow'], azimuth:TransformType['azimuth'], elevation:TransformType['elevation'], saturation:TransformType['saturation']}) {
  if (!e_dropshadow) {
    return null;
  }

  let paramString = "e-dropshadow";
  let parts = [];

  if (azimuth !== undefined && azimuth !== null) {
    parts.push(`az-${azimuth}`);
  }
  if (elevation !== undefined && elevation !== null) {
    parts.push(`el-${elevation}`);
  }
  if (saturation !== undefined && saturation !== null) {
    parts.push(`st-${saturation}`);
  }

  if (parts.length > 0) {
    paramString += "-" + parts.join("_");
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
    parts.push(`from-${from_color.slice(1).toUpperCase()}40`);
  }
  if (to_color) {
    parts.push(`to-${to_color.slice(1).toUpperCase()}40`);
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
  const {width, height, aspect_ratio, focus, crop_strategy, bg_remove, e_dropshadow, azimuth, elevation, saturation, change_bg, change_prompt, edit_image, edit_prompt, retouch, upscale, gen_image, gen_image_prompt, gen_variation, smart_crop, face_crop, object_aware_crop, contrast, sharpen, sharpen_val, shadow, shadow_blur, shadow_saturation, x_offset, y_offset, gradient, linear_direction, from_color, to_color, stop_point, grayscale, blur, trim_edges, trim_edges_val, border, border_color, rotate, flip, radius, background_color, opacity, O_width, O_height, O_background_color, O_radius_corner, O_rotate, overlay_type, text_align, text_flip, text_prompt, font_color, font_family, font_size, padding, position_type, line_height, typography, lx, ly, relative_position} = values;

  const params: string[] = [];

  if(bg_remove && !e_dropshadow){
    params.push("e-bgremove")
  }

  if(bg_remove && e_dropshadow){
    params.push(`e-bgremove:${getDropShadow({e_dropshadow, azimuth, elevation, saturation})!}`)
  }

  if(e_dropshadow && !bg_remove){
    params.push(getDropShadow({e_dropshadow, azimuth, elevation, saturation})!)
  }

  if(change_bg && change_prompt && !edit_image){
    params.push(`e-changebg-prompte-${stringToBase64Url(change_prompt)}`)
  }

  if(edit_image && edit_prompt && !change_bg){
    params.push(`e-edit-prompte-${stringToBase64Url(edit_prompt)}`)
  }

  // if(gen_image && gen_image_prompt){
  //   const {setUrl} = useModalStore();
  //   const newUrl = `${process.env.NEXT_PUBLIC_URL_ENDPOINT}/ik-genimg-prompt-${gen_image_prompt}]/gen-${Math.floor(Math.random() * 1000)}.jpg`
  //   setUrl(newUrl)
  // }

  if(retouch){
    params.push("e-retouch")
  }

  if(upscale){
    params.push("e-upscale")
  }

  if(sharpen && !sharpen_val){
    params.push("e-sharpen")
  }
  
  if(object_aware_crop){
    params.push(`fo-${object_aware_crop}`)
  }

  if(overlay_type === "text" && text_prompt){
    params.push("l-text")

    if(text_prompt){
      params.push(`ie-${encodeURIComponent(btoa(text_prompt))}`)
    }

    if(font_family){
      params.push(`ff-${font_family}`)
    }

    if(O_background_color){
      params.push(`bg-${O_background_color.slice(1).toUpperCase()}`)
    }

    if(font_color){
      params.push(`co-${font_color.slice(1).toUpperCase()}`)
    }

    if(font_size){
      params.push(`fs-${Number(font_size) < 0 ? "0" : font_size}`)
    }

    if(text_align){
      params.push(`ia-${text_align}`)
    }

    if(padding){
      params.push(`pa-${Number(padding) < 0 ? "0" : padding}`)
    }

    if(position_type === "positional" && relative_position){
      params.push(`lfo-${relative_position}`)
    }

    if(position_type === "axis"){
      if(lx){
        const formattedLx = lx < 0 ? `N${Math.abs(lx)}` : lx;
        params.push(`lx-${formattedLx}`)
      }

      if(ly){
        const formatteLy = ly < 0 ? `N${Math.abs(ly)}` : ly;
        params.push(`ly-${formatteLy}`)
      }
    }

    if(typography){
      params.push(`tg-${typography}`)
    }

    if(line_height){
      params.push(`lh-${Number(line_height) < 0 ? "0" : line_height}`)
    }

    if(O_width){
      params.push(`w-${Number(O_width) < 0 ? "0" : O_width}`)
    }

    if(O_radius_corner){
      params.push(`r-${Number(O_radius_corner) < 0 ? "0" : O_radius_corner}`)
    }

    if(O_rotate){
      const formattedRotate = O_rotate < 0 ? `N${Math.abs(O_rotate)}` : O_rotate;
      params.push(`rt-${formattedRotate}`)
    }

    if(text_flip){
      params.push(text_flip)
    }

    params.push("l-end")
  }

  if(overlay_type === "color_block"){
    params.push("l-image")

    params.push("i-ik_canvas")

    if(O_background_color){
      params.push(`bg-${O_background_color.slice(1).toUpperCase()}`)
    }

    if(O_width){
      params.push(`w-${Number(O_width) < 0 ? "0" : O_width}`)
    }

    if(O_height){
      params.push(`h-${Number(O_height) < 0 ? "0" : O_height}`)
    }

    if(O_radius_corner){
      params.push(`r-${Number(O_radius_corner) < 0 ? "0" : O_radius_corner}`)
    }

    if(position_type === "positional" && relative_position){
      params.push(`lfo-${relative_position}`)
    }

    if(position_type === "axis"){
      if(lx){
        const formattedLx = lx < 0 ? `N${Math.abs(lx)}` : lx;
        params.push(`lx-${formattedLx}`)
      }

      if(ly){
        const formatteLy = ly < 0 ? `N${Math.abs(ly)}` : ly;
        params.push(`ly-${formatteLy}`)
      }
    }

    params.push("l-end")
  }
  
  if(sharpen && sharpen_val){
    params.push(`e-sharpen-${sharpen_val}`)
  }

  if (shadow) {
    params.push(getShadowParam({shadow, shadow_blur, shadow_saturation, x_offset, y_offset})!);
  }

  if(blur){
    params.push(`bl-${getZero(blur)}`)
  }

  if (width && !gen_variation) {
    params.push(`w-${width}`);
  }
  if (height && !gen_variation) {
    params.push(`h-${height}`);
  }

  if (gen_variation && width && height) {
    params.push(`w-${width},h-${height}:e-genvar`)
  }

  if(face_crop && width && height){
    params.push('fo-face')
  }

  if(smart_crop && width && height){
    params.push('fo-auto')
  }

  const gradientParam = getGradientParam({gradient, linear_direction, from_color, to_color, stop_point});
  if (gradientParam) {
    params.push(gradientParam);
  }

  if(border && !border_color){
    params.push(`b-${getZero(border)}`);
  }

  if(border && border_color){
    params.push(`b-${getZero(border)}_${border_color.slice(1).toUpperCase()}`);
  }

  if(contrast){
    params.push("e-contrast")
  }

  if(grayscale){
    params.push("e-grayscale")
  }

  if(trim_edges && !trim_edges_val){
    params.push("trim")
  }

  if(trim_edges && trim_edges_val){
    params.push(`trim-${trim_edges_val}`)
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

  if (aspect_ratio) {
    params.push(`ar-${aspect_ratio}`);
  }

  if (crop_strategy) {
    if (crop_strategy === "cm-pad_extract" || crop_strategy === "cm-pad_resize") {
      params.push(crop_strategy);
      // Ensure padding_color is valid before adding
      if (background_color) {
          params.push(`bg-${background_color.slice(1).toUpperCase()}`);
      }
    } else {
      params.push(crop_strategy);
    }
  }

  if(background_color && !crop_strategy){
    params.push(`bg-${background_color.slice(1).toUpperCase()}`)
  }

  if(focus){
    if(crop_strategy !== 'c-force' && crop_strategy !== 'c-at_max' && crop_strategy !== "c-at_max_enlarge" && crop_strategy !== "cm-pad_extract"){
      params.push(focus)
    }
  }

  return params;
}