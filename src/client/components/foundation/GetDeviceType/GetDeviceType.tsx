import { useDeviceType } from '../../../hooks/useDeviceType';

import type { FC, ReactNode } from 'react';

export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;
export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

type Props = {
  children: ({ deviceType }: { deviceType: DeviceType }) => ReactNode;
};

export const GetDeviceType: FC<Props> = ({ children: render }) => {
  const deviceType = useDeviceType();
  return <>{render({ deviceType }) ?? null}</>;
};
