import * as playwright from 'playwright-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'

const coverPageHtml = (title: string, episode: string, authors: string) => {
  return `<html><body style="inset:0; margin: 0; padding: 0"><div style="overflow: hidden; font-family: Space Grotesk,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji; display: flex; flex-direction: column; width: 350px; height: 350px; background: rgba(0, 0, 0, 0) linear-gradient(to right bottom, rgb(212, 212, 216), rgb(103, 232, 249)) repeat scroll 0% 0% / auto padding-box border-box;">
  <h1 style="font-weight: bold; text-align: center; margin: 10px 0 0 0;">
    Mediocre Minds
  </h1>
    <img height="200" width="200" src="https://mediocreminds.vercel.app/_next/static/media/MMLogoBlack.8a48ef6e.png" style="margin: 0 auto; position: relative; top: -10px" />
  <p style="margin: 0 auto">
    Episode #${episode}
  </p>
  <h1 style="font-weight: bold; text-align: center; margin: 0 auto">
    ${title}
  </h1>
  <p style="text-align: center; margin: 0 auto">by ${authors}</p>
</div></html></body>
  `
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const browser = await playwright.launchChromium()

  const page = await browser.newPage({
    viewport: {
      width: 350,
      height: 350,
    },
  })

  const { title, episode, authors } = req.query
  await page.setContent(coverPageHtml(title as string, episode as string, authors as string))
  const data = await page.screenshot({
    type: 'png',
  })
  await browser.close()

  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')
  res.setHeader('Content-Type', 'image/png')

  res.end(data)
}
