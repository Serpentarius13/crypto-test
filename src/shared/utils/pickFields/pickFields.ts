export function pickFields<
  T extends object,
  U extends Array<keyof T>,
  R extends { [P in U[number]]: T[P] }
>(object: T, fields: U): R {
  const newObject = fields.reduce((acc, cur) => {
    acc[cur] = object[cur];
    return acc;
  }, {} as any) as R;

  return newObject;
}
