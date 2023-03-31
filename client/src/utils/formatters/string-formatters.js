export const removeExtraSpaces = (str) => str.replace(/\s+/, ' ').trim();

export const numOf = (num, str) => `${num} ${str}${num === 1 ? '' : 's'}`;

export const formatTags = (tags) => {
  if (tags.length) {
    return tags
      .join(',')
      .replace(/[#,.]/g, ' ') //remove all hashtags/commas/periods from String, for ""
      .trim() //remove any " " at start or end
      .split(/[ ,]+/); //split into array, using whitespace+ or comma+ as delimiter
  } else return [];
};

// from IGC
export const linkifyOptions = {
  formatHref: (href, type) => {
    if (type === 'hashtag') {
      href = '/explore/tags/' + href.substring(1);
    }
    if (type === 'mention') {
      href = '/' + href.substring(1);
    }
    return href;
  },
  className: 'styled-link',
  attributes: {
    target: {
      url: '_blank',
    },
  },
};
