import { z } from "zod";

const PaymentDetailsSchema = z.object({
    billing_name: z.string().nonempty(),
    email: z.string().nonempty().email(),
    phone_number: z.string().nonempty(),
    gstin: z.string().nonempty(),
    billing_address: z.string().nonempty()
})

export type PaymentDetailsType = z.infer<typeof PaymentDetailsSchema>

export {
    PaymentDetailsSchema
}