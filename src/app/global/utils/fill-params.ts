/**
 * Replaces URL parameters with provided values.
 * @param url - The URL containing parameters to replace.
 * @param params - The values to replace the parameters with.
 * @returns The URL with replaced parameters.
 */
export function fillParams(url: string, ...params: unknown[]) {
  let counter = -1;
  url.replace(/((:)(.*?))(\/|$)/g, (substring, args) => {
    counter++;
    url = url.replace(args, params[counter] as string ?? "");
    return url;
  });
  return url.replace(/\/+$/, "");
}
