import Replicate from 'replicate';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt } = body;

    const userId = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const isFreeTrailFinished = await checkApiLimit();

    if (isFreeTrailFinished) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }

    const response = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt,
        },
      },
    );

    await increaseApiLimit();

    return NextResponse.json(response);
  } catch (e) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
