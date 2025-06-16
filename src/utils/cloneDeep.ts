function cloneDeep<T extends object = object>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Set) {
    return new Set([...obj].map((item) => cloneDeep(item))) as T;
  }

  if (obj instanceof Map) {
    return new Map(
      [...obj].map(([key, value]) => [cloneDeep(key), cloneDeep(value)]),
    ) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as T;
  }

  const result = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[key] = (
        typeof value === "object" && value !== null ? cloneDeep(value) : value
      ) as T[Extract<keyof T, string>];
    }
  }

  return result;
}

export { cloneDeep };
