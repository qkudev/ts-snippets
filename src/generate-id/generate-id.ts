// Copied from https://github.com/ai/nanoid
//
// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

const generateId = (size = 21) => {
  let id = '';
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    // Using the bitwise AND operator to "cap" the value of
    // the random byte from 255 to 63, in that way we can make sure
    // that the value will be a valid index for the "chars" string.
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};

export default generateId;
