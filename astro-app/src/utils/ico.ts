/**
 * Builds a valid ICO file from an array of PNG buffers.
 * Modern ICO allows embedded PNGs (no BMP conversion needed).
 *
 * Format: https://en.wikipedia.org/wiki/ICO_(file_format)
 */
export function pngsToIco(pngs: Buffer[]): Buffer {
  const HEADER_SIZE = 6;
  const ENTRY_SIZE = 16;
  const directorySize = HEADER_SIZE + ENTRY_SIZE * pngs.length;

  // ICO header: reserved(2) + type=1(2) + count(2)
  const header = Buffer.alloc(HEADER_SIZE);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  let offset = directorySize;

  const entries = pngs.map(png => {
    // PNG dimensions start at byte 16 in the IHDR chunk
    const w = png.readUInt32BE(16);
    const h = png.readUInt32BE(20);

    const entry = Buffer.alloc(ENTRY_SIZE);
    entry.writeUInt8(w >= 256 ? 0 : w, 0); // 0 = 256px
    entry.writeUInt8(h >= 256 ? 0 : h, 1);
    entry.writeUInt8(0, 2); // color count (0 = no limit)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // image data offset
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs]);
}
