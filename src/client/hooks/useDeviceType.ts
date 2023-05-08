import { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';

const BOUNDARY_WIDTH = 1024;

export type DeviceTypeType = 'DESKTOP' | 'MOBILE';

export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceTypeType>(
    window.innerWidth >= BOUNDARY_WIDTH ? DeviceType.DESKTOP : DeviceType.MOBILE,
  );

  useEffect(() => {
    const listener = throttle(100, () => {
      setDeviceType(window.innerWidth >= BOUNDARY_WIDTH ? DeviceType.DESKTOP : DeviceType.MOBILE);
    });
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  return deviceType;
};
