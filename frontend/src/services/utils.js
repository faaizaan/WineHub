export const getCloudinaryImage = (url, width = 600, height = 400) => {
  if (!url || !url.includes("/upload/")) return url;

  return url.replace("/upload/", `/upload/w_${width},h_${height},c_fill/`);
};
