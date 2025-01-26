import { useEffect, useState } from 'react';

export type Platform = 'ios' | 'android' | 'desktop';

export function usePlatform() {
  const [platform, setPlatform] = useState<Platform>('desktop');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    }
  }, []);

  return {
    platform,
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
    isMobile: platform === 'ios' || platform === 'android'
  };
}