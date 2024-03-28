/**
 * Extracts params from path by given pattern
 *
 * @example
 * const params = extractParams('/user/:userId', '/user/1')
 * console.log(params)    // { userId: '1' }
 */
function extractParams(pattern: string, path: string): Record<string, string> {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');
  const params: Record<string, string> = {};

  if (patternParts.length !== pathParts.length) {
    return {};
  }

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];

    if (patternPart.startsWith(':')) {
      const paramName = patternPart.slice(1);
      params[paramName] = pathPart;
    } else if (patternPart !== pathPart) {
      return {};
    }
  }

  return params;
}

export default extractParams;
