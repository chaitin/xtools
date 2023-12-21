import { useRouter } from 'next/router';

export const useNavigateParams = () => {
  const router = useRouter();

  return (path: string) => {
    router.push({ pathname: path, query: router.query });
  };
};
