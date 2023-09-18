import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { messages } = body;

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const userId = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const isFreeTrailFinished = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!isFreeTrailFinished && !isPro) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.choices[0].message);
  } catch (e) {
    console.log('conversation api error', e);

    return new NextResponse('Internal error', { status: 500 });
  }
}
