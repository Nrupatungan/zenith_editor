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
      width: "",
      height: "",
      padding_color: "#FF0000",
      crop_strategy: undefined,
      aspect_ratio: undefined,
      focus: undefined,
      O_width: "",
      O_height: "",
      font_size: undefined,
      font_color: "#000000",
      O_background_color: "#FFFFFF",
      padding: "",
      line_height: "",
      transparency: undefined,
      lx: undefined,
      ly: undefined,
      overlay_type: undefined,
      text_align: undefined,
      rotate: undefined,
      text_flip: undefined,
      position_type: undefined,
      relative_position: undefined
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
    const watchedFontSize = watch("font_size");
    const watchedFontColor = watch("font_color");
    const watchedBackgroundColor = watch("O_background_color");
    const watchedPadding = watch("padding");
    const watchedLineHeight = watch("line_height");
    const watchedTransparency = watch("transparency");
    const watchedLx = watch("lx");
    const watchedLy = watch("ly");
    const watchedOverlayType = watch("overlay_type");
    const watchedTextAlign = watch("text_align");
    const watchedRotate = watch("rotate");
    const watchedFlip = watch("text_flip");
    const watchedPositionType = watch("position_type");
    const watchedRelativePosition = watch("relative_position");

    const isInitialMount = useRef(true);
    
    const submitHandler = useCallback(async (values: TransformType) => {
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
    watchedWidth, watchedHeight, watchedCropStrategy, watchedAspectRatio, watchedFocus, watchedPaddingColor, watchedOWidth, watchedOHeight, watchedFontSize, watchedFontColor, watchedBackgroundColor, watchedPadding, watchedLineHeight, watchedTransparency, watchedLx, watchedLy, watchedOverlayType, watchedTextAlign, watchedRotate, watchedFlip, watchedPositionType, watchedRelativePosition, submitHandler, getValues
    ]);

    return {form, formState, handleSubmit, submitHandler, watchedOverlayType, watchedPositionType, control, watchedHeight, watchedWidth, watchedCropStrategy}
}