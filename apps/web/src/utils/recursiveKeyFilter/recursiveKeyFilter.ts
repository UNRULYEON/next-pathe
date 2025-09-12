export const recursiveKeyFilter = (
  object: Record<string | number | symbol, unknown>,
  keys: string[],
): Record<string | number | symbol, unknown> => {
  let resultObj: Record<string | number | symbol, unknown>;

  if (Array.isArray(object)) {
    resultObj = [] as unknown as Record<string | number | symbol, unknown>;
  } else {
    resultObj = {};
  }

  Object.keys(object).forEach((key) => {
    if (~keys.indexOf(key)) {
      return;
    }

    const value = object[key];
    if (
      value != null &&
      typeof value === "object" &&
      Object.keys(value as object).length
    ) {
      resultObj[key] = recursiveKeyFilter(
        value as Record<string | number | symbol, unknown>,
        keys,
      );
    } else {
      resultObj[key] = value;
    }
  });

  return resultObj;
};
