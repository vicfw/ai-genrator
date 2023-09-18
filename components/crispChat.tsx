'use client';

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('b9ecdfc1-e796-4857-935a-7b235a22c80e');
  }, []);

  return null;
};
