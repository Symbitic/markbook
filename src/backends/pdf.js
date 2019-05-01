/**
 * Create a PDF file using puppeteer-core
 */
import nodeWhich from 'which'
import path from 'path'
import puppeteer from 'puppeteer-core'
import util from 'util'
import { status, warn } from '../common/log'

const which = util.promisify(nodeWhich)

export default async function (config) {
  let executablePath = null
  const names = ['chrome', 'chromium', 'chrome-browser', 'chromium-browser']

  const pdf = path.join(config.destination, 'print.pdf')
  const PATH = process
    .cwd()
    .concat(':')
    .concat(process.env.PATH)

  const html = `file://${path
    .resolve(config.destination, 'print.html')
    .replace(/\\/g, '/')
    .replace(/^([^/])/, '/$1')}`

  for (const name of names) {
    executablePath = await which(name, { path: PATH }).catch(() => false)
    if (executablePath) {
      break
    }
  }

  // Halt if Chrome/Chromium not found.
  if (!executablePath) {
    warn('Chrome not found - not building PDF')
    return
  }

  const browser = await puppeteer.launch({ executablePath })
  const page = await browser.newPage()

  await page.goto(html, { waitUntil: 'networkidle2' })

  status('Writing print.pdf')

  await page.pdf({
    format: 'A4',
    path: pdf,
    printBackground: true
  })

  await browser.close()
}
