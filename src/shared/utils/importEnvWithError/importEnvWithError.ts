export function importEnvWithError<T = string>(key: string): T {
  const value = import.meta.env[key];

  if (!value) throw new Error(`${key} doesnt exist `);

  return value as T;
}
