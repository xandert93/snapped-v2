export const genUploadConfig = (progressHandler) => {
  const handleProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);

    progressHandler(progress);
  };

  return { onUploadProgress: handleProgress };
};
