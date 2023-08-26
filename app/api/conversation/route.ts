import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();

    const { messages } = body;

    if (!messages) {
      return new NextResponse(
        'Messages are required',
        { status: 400 },
      );
    }

    const userId = auth();

    if (!userId) {
      return new NextResponse(
        'Unauthorized',
        { status: 401 },
      );
    }

    try {
      const response =
        await openai.chat.completions.create(
          {
            model: 'gpt-3.5-turbo',
            messages,
          },
        );
      return NextResponse.json(
        response.choices[0].message,
      );
    } catch (e) {
      return new NextResponse(
        "couldn't connect to api ",
        { status: 500 },
      );
    }
  } catch (e) {
    return new NextResponse(
      'Internal error',
      { status: 500 },
    );
  }
}
