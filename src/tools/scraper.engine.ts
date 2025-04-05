import puppeteer, {type Browser, type Page } from "puppeteer";
import type { EngineConfig } from "./index.js";

export async function searchGoogleImage(query: string, config? : EngineConfig ): Promise<string[]> {
  const options = {
    delay: config?.delay || 500,
    timeout: config?.timeout || 2000,
    debug_mode: config?.debug_mode || false,
    limit: config?.limit || 1
  }
  const browser: Browser = await puppeteer.launch({ 
    headless: !options.debug_mode, 
    args: ['--no-sandbox', '--disable-setuid-sandbox'],

  });
  try {
    const page: Page = await browser.newPage();
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`;
    await page.goto(searchUrl);
    try {
      const cookieButton = await page.waitForSelector('button[aria-label="Aceitar todos"], button[aria-label="Accept all"]', 
        { timeout: options.timeout });
      if (cookieButton) await cookieButton.click();
    } catch (error) {
    }
    await page.waitForSelector('#search', { timeout: options.timeout });
    if(options.limit > 200){
      await page.mouse.wheel({ deltaY: 1.1 * options.limit });
    }
    const elements = (await page.$$('#search g-img[class]')).slice(0, options.limit *2).filter((_,index)=>index%2 === 0); 
    const imageUrls: string[] = [];
    let i = 0;
    while (i < elements.length) {
      await elements[i].click();    
      await new Promise(resolve => setTimeout(resolve, options.timeout));

      browser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
          const newPage = await target.page();
          if((newPage?.url() !== searchUrl || !newPage.url().toString().includes('google.com'))) {
            await newPage!.bringToFront();
            await new Promise(resolve => setTimeout(resolve, options.timeout));
            if(!newPage?.isClosed) await newPage!.close();
          }
        }});



      const imageUrl = await page.evaluate(() => {
        const imgElements = document.querySelectorAll('img[src]');
        let imgElement: any;
        for (const img of imgElements) {
          const src = img.getAttribute('src');
          if (src && !src.startsWith('data:') && !src.startsWith('https://encrypted') && src.includes('https://') && !src.includes('gstatic') && !src.includes('googleusercontent')) {
            imgElement = img!;
            break;
          }
        }
        if (!imgElement) return null;
        return imgElement.getAttribute('src');
      });
      if (!imageUrl) {
        throw new Error('get URL failed');
      }
      imageUrls.push(imageUrl);
      i++;
    }
    return imageUrls;
  } finally {
    await browser.close();
  }
}