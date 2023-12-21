import { ApplicationInfo } from '@/types';
export const encodeUrl = (url: string) => {
  const d = new URL(url);
  return d.pathname + d.search + d.hash;
};
export const enterApp = (app: ApplicationInfo) => {
  const matchKey = app.url_prefix.split('.')[0].match(/^https?:\/\/(.+)/);
  //   const target = `${app.url_prefix}?${qs.stringify({ app_id: app.id })}`;
  window.open(
    `/app/${matchKey ? matchKey[1] : ''}${encodeUrl(app.url_prefix)}`,
    '_blank'
  );
};
