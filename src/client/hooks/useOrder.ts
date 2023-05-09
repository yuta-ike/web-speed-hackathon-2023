import { useAuthUser } from './useAuthUser';

export const useOrder = () => {
  const { authUser } = useAuthUser();
  const order = authUser == undefined ? undefined : authUser.orders[0]?.items ?? [];

  return { order };
};
