import ResizeOptions from "./ResizeOptions"
import OverlayOptions from "./OverlayOptions"
import EffectsOptions from "./EffectsOptions"
import { Form } from "@/components/ui/form"
import { useTransform } from "@/hooks/use-transform"
import AiOptions from "./AiOptions"

export default function TransformOptions({
    title
}: {title: string}) {
  const { form, handleSubmit, submitHandler, watchedOverlayType, watchedPositionType, watchedCropStrategy, watchedHeight, watchedWidth, control } = useTransform();

  return (
    <Form {...form}>
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="py-3 px-5"
            autoComplete="false"
        >
            {title === "Resize and Crop" && <ResizeOptions watchedCropStrategy={watchedCropStrategy} watchedHeight={watchedHeight} watchedWidth={watchedWidth} control={control} />}

            {title === "Add overlays" && <OverlayOptions watchedOverlayType={watchedOverlayType} watchedPositionType={watchedPositionType} control={control} />}
            
            {title === "AI Transformations" && <AiOptions/>}
            
            {title === "Effects and Enhancements" && <EffectsOptions />}
        </form>
    </Form>
  )
}
