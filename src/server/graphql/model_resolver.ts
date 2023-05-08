export type GraphQLModelResolver<T> = {
  [P in keyof T as T[P] extends object ? P : never]?: (parent: T, args: Record<string, any>) => T[P] | Promise<T[P]>;
};
