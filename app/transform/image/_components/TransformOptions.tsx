import ResizeOptions from "./ResizeOptions"
import OverlayOptions from "./OverlayOptions"
import EffectsOptions from "./EffectsOptions"
import { Form } from "@/components/ui/form"
import AiOptions from "./AiOptions"
import { TransformType } from "@/validators/transformations.validator"

interface TransformOptionsProps {
    isPremium: boolean;
    title: string;
    form: any;
    handleSubmit: (handler: any) => any;
    control?: any;
    submitHandler: any;
    watchedOverlayType?: TransformType['overlay_type'];
    watchedPositionType?: TransformType['position_type'];
    watchedCropStrategy?: TransformType['crop_strategy'];
    watchedHeight?: TransformType['height'];
    watchedWidth?: TransformType['width'];
    watchedE_dropshadow?: TransformType['e_dropshadow'];
    watchedChange_bg?: TransformType['change_bg'];
    watchedEdit_image?: TransformType['edit_image'];
    watchedGen_image?: TransformType['gen_image'];
    watchedSharpen?: TransformType['sharpen'];
    watchedTrim_edges?: TransformType['trim_edges'];
    watchedShadow?: TransformType['shadow'];
    watchedGradient?: TransformType['gradient'];
}

export default function TransformOptions({
    title,
    isPremium,
    ...transform
}: TransformOptionsProps) {
  const {form, handleSubmit, submitHandler, watchedOverlayType, watchedPositionType, watchedCropStrategy, watchedHeight, watchedWidth, control, watchedE_dropshadow, watchedChange_bg, watchedEdit_image, watchedGen_image, watchedSharpen, watchedTrim_edges, watchedShadow, watchedGradient} = transform

  return (
    <Form {...form}>
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="py-3 px-5"
            autoComplete="false"
        >
            {title === "Resize and Crop" && <ResizeOptions watchedCropStrategy={watchedCropStrategy} watchedHeight={watchedHeight} watchedWidth={watchedWidth} control={control} form={form} />}

            {title === "Add overlays" && <OverlayOptions watchedOverlayType={watchedOverlayType} watchedPositionType={watchedPositionType} control={control} form={form} />}
            
            {(title === "AI Transformations" && isPremium) && <AiOptions watchedE_dropshadow={watchedE_dropshadow!} watchedChange_bg={watchedChange_bg!} watchedEdit_image={watchedEdit_image!} watchedGen_image={watchedGen_image!}  control={control} form={form} />}
            
            {title === "Effects and Enhancements" && <EffectsOptions  watchedSharpen={watchedSharpen!} watchedTrim_edges={watchedTrim_edges!} watchedShadow={watchedShadow!} watchedGradient={watchedGradient!} control={control} form={form} />}
        </form>
    </Form>
  )
}
