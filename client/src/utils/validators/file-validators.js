const MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/gif': 'gif',
};

const checkFileType = (type) => {
  const isValid = MIME_TYPES[type];

  if (!isValid)
    throw {
      title: `Invalid file type (${type})`,
      text: 'Please choose an image (.png, .jpeg or .gif)',
    };
};

const MAX_IMAGE_SIZE = 12 * 1024 * 1024; // 12MB

const checkFileSize = (size) => {
  const isValid = size <= MAX_IMAGE_SIZE;

  if (!isValid)
    throw {
      title: 'File too large',
      text: 'Please select an image smaller than 12MB',
    };
};

export const getFileSizeStr = (size) => {
  return `File is approx. ${(size / 1000000).toFixed(2)} MB`;
};

export const validateImageFile = (file) => {
  checkFileType(file.type);
  checkFileSize(file.size);
};
