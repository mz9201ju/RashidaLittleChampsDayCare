import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const rootDir = process.cwd()
const inputDir = path.join(rootDir, 'public')
const outputDir = path.join(rootDir, 'public', 'gallery')
const widths = [480, 900, 1280]
const jpgQuality = 72
const webpQuality = 68

function isImageFile(fileName) {
  return /^\d+\.(jpg|jpeg|png)$/i.test(fileName)
}

async function ensureOutputDir() {
  await fs.mkdir(outputDir, { recursive: true })
}

async function optimizeOne(fileName) {
  const match = fileName.match(/^(\d+)\./)
  if (!match) return

  const id = match[1]
  const inputPath = path.join(inputDir, fileName)

  for (const width of widths) {
    const basePipeline = sharp(inputPath).rotate().resize({
      width,
      withoutEnlargement: true,
    })

    const jpgPath = path.join(outputDir, `${id}-${width}.jpg`)
    const webpPath = path.join(outputDir, `${id}-${width}.webp`)

    await basePipeline
      .clone()
      .jpeg({ quality: jpgQuality, mozjpeg: true, progressive: true })
      .toFile(jpgPath)

    await basePipeline
      .clone()
      .webp({ quality: webpQuality, effort: 6 })
      .toFile(webpPath)
  }
}

async function main() {
  await ensureOutputDir()
  const files = (await fs.readdir(inputDir)).filter(isImageFile).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  if (files.length === 0) {
    console.log('No numbered source images found in public/. Expected files like 1.jpg, 2.jpg ...')
    return
  }

  for (const fileName of files) {
    await optimizeOne(fileName)
    console.log(`Optimized ${fileName}`)
  }

  console.log(`Done. Generated responsive images in ${path.relative(rootDir, outputDir)}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
