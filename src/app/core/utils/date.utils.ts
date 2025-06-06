export function mapDates<T extends Record<string, unknown>>(
  input: T,
  dateKeys: (keyof T)[]
): T {
  const result = { ...input };

  for (const key of dateKeys) {
    if (typeof input[key] === 'string') {
      // assert it is safe to override the type here
      result[key] = new Date(input[key]) as unknown as T[typeof key];
    }
  }

  return result;
}
