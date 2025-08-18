import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto"

export interface ValidateProps{
    razorpay_payment_id: string, 
    razorpay_order_id: string, 
    razorpay_signature: string
}

export async function POST(request: NextRequest){
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature}:ValidateProps  = await request.json();

    const generatedHmac = crypto.createHmac('sha256', process.env.RAZORPAY_TEST_KEY_ID!)
    const hash = generatedHmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const generated_signature = hash.digest("hex")

    if (generated_signature !== razorpay_signature) {
        return NextResponse.json({result: true}, {status: 200})
    }
    
    return NextResponse.json({error: "Error Validating your order", result: false}, {status: 500})
}