import Replicate from 'replicate';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

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
    const isPro = await checkSubscription();

    if (!isFreeTrailFinished && !isPro) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }
    const response = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt,
        },
      },
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response);
  } catch (e) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
