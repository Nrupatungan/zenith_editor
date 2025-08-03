import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay"

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_TEST_KEY_SECRET,
});


export async function POST(request: NextRequest){
    const {amount}: {amount: number} = await request.json()
    try {
        const order = await instance.orders.create({
            amount: (amount),
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(5)
        })

        return NextResponse.json({orderId: order.id}, {status: 200});
    } catch (error) {
        console.error("Error creating order:",error)
        return NextResponse.json(
            {error: "Failed to create an order"},
            {status: 500}
        )
    }
}