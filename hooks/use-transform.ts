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
      padding_color: undefined,
      crop_strategy: undefined,
      aspect_ratio: undefined,
      focus: undefined,
      //OVERLAY OPTIONS
      O_width: "",
      O_height: "",
      text_prompt: "",
      font_family: undefined,
      font_size: undefined,
      font_color: "#000000",
      O_background_color: "#FFFFFF",
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
      face_crop: false
      //EFFECTS OPTIONS
    }
  });
    
    const { handleSubmit, control, formState, watch, getValues, reset } = form;

    const watchedWidth = watch("width");
    const watchedHeight = watch("height");
    const watchedCropStrategy = watch("crop_strategy");
    const watchedAspectRatio = watch("aspect_ratio");
    const watchedFocus = watch("focus");
    const watchedPaddingColor = watch("padding_color");
    
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
    const watchedRotate = watch("O_rotate");
    const watchedRadiusCorner = watch("O_radius_corner");
    const watchedFlip = watch("text_flip");
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

        const newUrl = `${url}${transformationString}`;
        console.log("Submitting new URL:", newUrl);
        // setTransformUrl(newUrl);
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
    watchedWidth, watchedHeight, watchedCropStrategy, watchedTextPrompt, watchedFontFamily, watchedTypography, watchedRadiusCorner, watchedAspectRatio, watchedFocus, watchedPaddingColor, watchedOWidth, watchedOHeight, watchedFontSize, watchedFontColor, watchedBackgroundColor, watchedPadding, watchedLineHeight, watchedLx, watchedLy, watchedOverlayType, watchedTextAlign, watchedRotate, watchedFlip, watchedPositionType, watchedRelativePosition, watchedBg_remove, watchedE_dropshadow, watchedAzimuth, watchedElevation, watchedSaturation, watchedChange_bg, watchedChange_prompt, watchedEdit_image, watchedEdit_prompt, watchedRetouch, watchedUpscale, watchedGen_image, watchedGen_image_prompt, watchedGen_variation, watchedSmart_crop, watchedFace_crop , submitHandler, getValues
    ]);

    return {form, formState, handleSubmit, submitHandler, watchedOverlayType, watchedPositionType, control, watchedHeight, watchedWidth, watchedCropStrategy, watchedE_dropshadow, watchedChange_bg, watchedEdit_image, watchedGen_image}
}