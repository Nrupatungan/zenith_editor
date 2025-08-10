import { buildParams } from "@/lib/utils";
import useModalStore from "@/store";
import { TransformSchema, TransformType } from "@/validators/transformations.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";


export const useTransform = () => {
    const { url, setTransformUrl, setResetForm} = useModalStore();
    
    const form = useForm<TransformType>({
    resolver: zodResolver(TransformSchema),
    defaultValues: {
      //RESIZE OPTIONS 
      width: "",
      height: "",
      crop_strategy: undefined,
      aspect_ratio: undefined,
      focus: undefined,
      //OVERLAY OPTIONS
      O_width: "",
      O_height: "",
      text_prompt: "",
      font_family: undefined,
      font_size: undefined,
      font_color: "#ffffff",
      O_background_color: undefined,
      padding: "",
      line_height: "",
      typography: undefined,
      lx: undefined,
      ly: undefined,
      overlay_type: undefined,
      text_align: undefined,
      O_radius_corner: "",
      O_rotate: undefined,
      text_flip: undefined,
      position_type: undefined,
      relative_position: undefined,
      //AI OPTIONS
      bg_remove: false,
      e_dropshadow: false,
      azimuth: undefined,
      elevation: undefined,
      saturation: undefined,
      change_bg: false,
      change_prompt: "",
      edit_image: false,
      edit_prompt: "",
      retouch: false,
      upscale: false,
      gen_image: false,
      gen_image_prompt: "",
      gen_variation: false,
      smart_crop: false,
      face_crop: false,
      object_aware_crop: undefined,
      //EFFECTS OPTIONS
      contrast: false,
      sharpen: false,
      sharpen_val: undefined,
      shadow: false,
      shadow_blur: undefined,
      shadow_saturation: undefined,
      x_offset: undefined,
      y_offset: undefined,
      gradient: false,
      linear_direction: 0,
      from_color: "#ffffff50",
      to_color: undefined,
      stop_point: undefined,
      grayscale: false,
      blur: undefined,
      trim_edges: false,
      trim_edges_val: undefined,
      border: undefined,
      border_color: undefined,
      rotate: undefined,
      flip: undefined,
      radius: "",
      background_color: undefined,
      opacity: undefined,
    }
  });
    
    const { handleSubmit, control, formState, watch, getValues, reset } = form;

    const watchedWidth = watch("width");
    const watchedHeight = watch("height");
    const watchedCropStrategy = watch("crop_strategy");
    const watchedAspectRatio = watch("aspect_ratio");
    const watchedFocus = watch("focus");
    
    const watchedOWidth = watch("O_width");
    const watchedOHeight = watch("O_height");
    const watchedTextPrompt = watch("text_prompt");
    const watchedFontSize = watch("font_size");
    const watchedFontFamily = watch("font_family");
    const watchedFontColor = watch("font_color");
    const watchedBackgroundColor = watch("O_background_color");
    const watchedPadding = watch("padding");
    const watchedLineHeight = watch("line_height");
    const watchedTypography = watch("typography");
    const watchedLx = watch("lx");
    const watchedLy = watch("ly");
    const watchedOverlayType = watch("overlay_type");
    const watchedTextAlign = watch("text_align");
    const watchedoRotate = watch("O_rotate");
    const watchedRadiusCorner = watch("O_radius_corner");
    const watchedOFlip = watch("text_flip");
    const watchedPositionType = watch("position_type");
    const watchedRelativePosition = watch("relative_position");

    const watchedBg_remove = watch('bg_remove');
    const watchedE_dropshadow = watch('e_dropshadow');
    const watchedAzimuth = watch('azimuth');
    const watchedElevation = watch('elevation');
    const watchedSaturation = watch('saturation');
    const watchedChange_bg = watch('change_bg');
    const watchedChange_prompt = watch('change_prompt');
    const watchedEdit_image = watch('edit_image');
    const watchedEdit_prompt = watch('edit_prompt');
    const watchedRetouch = watch('retouch');
    const watchedUpscale = watch('upscale');
    const watchedGen_image = watch('gen_image');
    const watchedGen_image_prompt = watch('gen_image_prompt');
    const watchedGen_variation = watch('gen_variation');
    const watchedSmart_crop = watch('smart_crop');
    const watchedFace_crop = watch('face_crop');
    const watchedObject_aware_crop = watch('object_aware_crop');

    const watchedContrast = watch("contrast")
    const watchedSharpen = watch("sharpen")
    const watchedSharpen_val = watch("sharpen_val")
    const watchedShadow = watch("shadow")
    const watchedShadow_blur = watch("shadow_blur")
    const watchedShadow_saturation = watch("shadow_saturation")
    const watchedX_offset = watch("x_offset")
    const watchedY_offset = watch("y_offset")
    const watchedGradient = watch("gradient")
    const watchedLinear_direction = watch("linear_direction")
    const watchedFrom_color = watch("from_color")
    const watchedTo_color = watch("to_color")
    const watchedStop_point = watch("stop_point")
    const watchedGrayscale = watch("grayscale")
    const watchedBlur = watch("blur")
    const watchedTrim_edges = watch("trim_edges")
    const watchedTrim_edges_val = watch("trim_edges_val")
    const watchedBorder = watch("border")
    const watchedBorder_color = watch("border_color")
    const watchedRotate = watch("rotate")
    const watchedFlip = watch("flip")
    const watchedRadius = watch("radius")
    const watchedBackground_color = watch("background_color")
    const watchedOpacity = watch("opacity")

    const isInitialMount = useRef(true);
    
    const submitHandler = useCallback(async (values: TransformType) => {
        let transformationString;

        // Create a new object with "none" values replaced by undefined
        const cleanedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) =>
                value === "none" ? [key, undefined] : [key, value]
            )
        ) as TransformType;

        const paramsArray = buildParams(cleanedValues);

        if (paramsArray.length > 0) {
            transformationString = `?tr=${paramsArray.join(',')}`;
        } else {
            transformationString = '';
        }
        console.log(transformationString);
        const newUrl = `${url}${transformationString}`;
        setTransformUrl(newUrl);
    }, [url, setTransformUrl]);

    useEffect(() => {
        setResetForm(() => {
            reset();
            setTransformUrl(url); // Reset to the original image URL
        });
    }, [url, reset, setTransformUrl]);

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
    watchedWidth, watchedHeight, watchedCropStrategy, watchedTextPrompt, watchedFontFamily, watchedTypography, watchedRadiusCorner, watchedAspectRatio, watchedFocus, , watchedOWidth, watchedOHeight, watchedFontSize, watchedFontColor, watchedBackgroundColor, watchedPadding, watchedLineHeight, watchedLx, watchedLy, watchedOverlayType, watchedTextAlign, watchedoRotate, watchedOFlip, watchedPositionType, watchedRelativePosition, watchedBg_remove, watchedE_dropshadow, watchedAzimuth, watchedElevation, watchedSaturation, watchedChange_bg, watchedChange_prompt, watchedEdit_image, watchedEdit_prompt, watchedRetouch, watchedUpscale, watchedGen_image, watchedGen_image_prompt, watchedGen_variation, watchedSmart_crop, watchedFace_crop,watchedContrast, watchedSharpen, watchedSharpen_val, watchedShadow, watchedShadow_blur, watchedShadow_saturation, watchedX_offset, watchedY_offset, watchedGradient, watchedLinear_direction, watchedFrom_color, watchedTo_color, watchedStop_point, watchedGrayscale, watchedBlur, watchedTrim_edges, watchedTrim_edges_val, watchedBorder, watchedBorder_color, watchedRotate, watchedFlip, watchedRadius, watchedBackground_color, watchedOpacity, watchedObject_aware_crop, submitHandler, getValues
    ]);

    return {form, formState, handleSubmit, submitHandler, watchedOverlayType, watchedPositionType, control, watchedHeight, watchedWidth, watchedCropStrategy, watchedE_dropshadow, watchedChange_bg, watchedEdit_image, watchedGen_image, watchedSharpen, watchedShadow, watchedGradient, watchedTrim_edges,}
}