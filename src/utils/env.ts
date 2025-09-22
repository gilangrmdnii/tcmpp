export const getEnv = (key: string): string | undefined => {
  try {
    if (
      typeof process !== "undefined" &&
      process.env &&
      Object.prototype.hasOwnProperty.call(process.env, key)
    ) {
      return process.env[key];
    }
  } catch (_) {}
  return undefined;
};
