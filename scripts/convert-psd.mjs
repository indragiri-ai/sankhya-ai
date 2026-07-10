/** One-off: convert the client's PSD logo to PNG (no ImageMagick on box). */
import fs from "node:fs";
import Psd from "@webtoon/psd";
import { PNG } from "pngjs";

const [, , input, output] = process.argv;
const psd = Psd.default ? Psd.default.parse(fs.readFileSync(input).buffer) : Psd.parse(fs.readFileSync(input).buffer);
const pixels = await psd.composite();
const png = new PNG({ width: psd.width, height: psd.height });
png.data = Buffer.from(pixels);
fs.writeFileSync(output, PNG.sync.write(png));
console.log(`${output}: ${psd.width}x${psd.height}`);
