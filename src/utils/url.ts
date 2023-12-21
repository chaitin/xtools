export function parseUrlSearch(search: string) {
  const res: { [key: string]: string } = {};
  search
    .replace('?', '')
    .split('&')
    .filter((s) => s !== '')
    .reduce((pre, cur) => {
      const [key, value] = cur.split('=');
      pre[key] = decodeURIComponent(decodeURI(value));
      return pre;
    }, res);
  return res;
}

/**
 *
 * @param app_key guanshan
 * @return path /record?aa=bb#ccc
 */
export const getChildPath = (app_key: string) => {
  const match = location.href.match(/\/app(.+)$/);
  return match ? match[1].replace(`/${app_key}`, '') : '';
};
export const decodeUrl = (app_key: string, data: string) => {
  return `${location.protocol}//${app_key}.${location.hostname}${data}`;
};

export const encodeUrl = (url: string) => {
  const d = new URL(url);
  return d.pathname + d.search + d.hash;
};

export const isValidUrl = (url: string) => {
  const regex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
};

export const isPublicPage = (path: string) => {
  const rootPath = path.split('/')[0];
  return ['landing', 'tools'].includes(rootPath);
};
