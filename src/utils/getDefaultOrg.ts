export const getCurrentOrgId = () => {
  if (typeof window === 'object') {
    const curOrgID = document?.cookie?.replace(
      /(?:(?:^|.*;\s*)heap-org-id\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    return curOrgID ? parseInt(curOrgID, 10) : null;
  }
};
