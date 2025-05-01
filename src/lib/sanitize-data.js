// remove undiefined values from complete object
export function sanitizeData(data) {
  return Object.fromEntries(
    //@ts-expect-error Object.entries is not supported in all browsers
    Object.entries(data).filter(([, value]) => value !== undefined)
  );
}
