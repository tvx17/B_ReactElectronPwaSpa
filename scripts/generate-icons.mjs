import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

await mkdir('public/icons', { recursive: true })
const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="#245c49"/><path d="M176 152h168v40H220v44h108v40H220v44h124v40H176z" fill="#ffffff"/></svg>')
for (const size of [192, 512]) {
  await sharp(svg).resize(size, size).png().toFile(`public/icons/icon-${size}.png`)
}
await sharp(svg).png().toFile('public/icons/icon-maskable-512.png')
