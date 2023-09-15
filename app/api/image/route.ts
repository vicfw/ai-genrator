import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt, amount = 1, resolution = '512x512' } = body;

    if (!prompt) {
      return new NextResponse('Prompt are required', { status: 400 });
    }

    if (!amount) {
      return new NextResponse('Amount are required', { status: 400 });
    }
    if (!resolution) {
      return new NextResponse('Resolution are required', { status: 400 });
    }

    const userId = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const isFreeTrailFinished = await checkApiLimit();

    if (!isFreeTrailFinished) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }

    const response = await openai.images.generate({
      prompt,
      size: resolution,
      n: +amount,
    });

    await increaseApiLimit();

    console.log(response, 'response from image route');

    return NextResponse.json(response.data);
  } catch (e) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
