const rawPublicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicBasePath = rawPublicBasePath === "/" ? "" : rawPublicBasePath;

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) {
    return `${publicBasePath}/${path}`;
  }
  return `${publicBasePath}${path}`;
}
