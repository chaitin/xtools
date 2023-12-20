import { useRouter } from 'next/router';

export const usePath = (): {
  root: string;
  path: string;
  getResolvedPath: (path: string) => string;
} => {
  const router = useRouter();
  const currentPath = router.pathname;
  const paths = currentPath.split("/")?.filter((path) => path !== "");
  const currentPathRoot = paths?.[0] ?? "/";
  const getResolvedPath = (path: string): string => {
    let resolvedPath = location.pathname;
    if (path) {
      paths.push(path);
      paths.unshift("");
      resolvedPath = paths.join("/");
    }
    return resolvedPath;
  };

  return { root: currentPathRoot, path: currentPath, getResolvedPath };
};
