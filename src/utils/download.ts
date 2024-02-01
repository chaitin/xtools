export const saveFile = (text: string, name: string) => {
  const url = URL.createObjectURL(
    new Blob([text], { type: 'application/octet-stream' })
  );
  const aTag = document.createElement('a');
  aTag.style.display = 'none';
  aTag.href = url;
  aTag.download = name;
  document.body.appendChild(aTag);
  aTag.click();
  URL.revokeObjectURL(url);
};
