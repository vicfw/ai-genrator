'use client';

import { useState } from 'react';

import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (e) {
      console.log(e, 'Bling error in subscription button component');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button
      disabled={loading}
      variant={isPro ? 'default' : 'premium'}
      onClick={onClick}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}{' '}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
