"use server"
import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

type Res =
  { success: true; }
| { success: false; error: string; statusCode: 401 | 500 | 404 };

/**
 * Updates a payment record to mark it as premium.
 * This action should be called after a successful payment webhook
 * to update the status of the specific transaction.
 *
 * @param {string} userId The userId of the user.
 * @param {string} razorpay_payment_id The ID of the payment from Razorpay.
 * @param {string} billing_name The name of the payer
 * @param {string} email The email of the payer
 * @param {string} phone_number The phone number of the payer
 * @param {string} gstin The gstin of the payer
 * @param {string} billing_address The billing address of the payer
 * @returns {Promise<Res>} An object indicating success or failure.
 */

interface PaymentActionProps { 
    userId: string,
    razorpay_payment_id: string,
    billing_name: string,
    email: string,
    phone_number: string,
    gstin: string,
    billing_address: string,
}

export async function paymentAction({
    userId,
    razorpay_payment_id,
    billing_name,
    email,
    phone_number,
    gstin,
    billing_address,
}: PaymentActionProps ): Promise<Res>{
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if(!existingUser){
            return { success: false, error: "User Not found", statusCode: 404}
        }

        await prisma.payment.create({
            data: {
                razorpay_payment_id,
                isPremium: true,
                userId,
                billing_name,
                email,
                phone_number,
                gstin,
                billing_address,
            }
        })

        return { success: true };
    } catch (error) {
        console.error("Update error:", error);
        return {
            success: false,
            error: "Internal Server Error",
            statusCode: 500,
        };
    }
}
