'use client';

import Empty from '@/components/Empty';
import Heading from '@/components/Heading';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Z from 'zod';
import { formSchema } from './constants';

const ImagePage = () => {
  const router = useRouter();

  const [images, setImages] = useState<
    string[]
  >([]);
  const form = useForm<
    Z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading =
    form.formState.isSubmitting;

  const onSubmit = async (
    values: Z.infer<typeof formSchema>,
  ) => {
    try {
      setImages([]);

      const response = await axios.post(
        '/api/image',
        values,
      );

      const urls = response.data.map(
        (image: { url: string }) =>
          image.url,
      );

      setImages(urls);

      form.reset();
    } catch (e: any) {
      // TODO : open pro modal
      console.log(
        e,
        'from conversation page',
      );
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt to an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit,
              )}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={
                          isLoading
                        }
                        placeholder="A picture of a horse in Swiss alps ?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                <FormField
                  name="amount"
                  control={form.control}
                  render={({
                    field,
                  }) => (
                    <FormItem className="col-span-12 lg:col-span-2 w-full"></FormItem>
                  )}
                />
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-12 ">
              <Loader />
            </div>
          )}
          {!images.length &&
            !isLoading && (
              <Empty label="No images generated." />
            )}
          <div>
            images will be render here
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
