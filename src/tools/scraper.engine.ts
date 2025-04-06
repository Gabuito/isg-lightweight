/**
 * Web scraping engine for Google Images searches
 * 
 * This module handles the process of searching for images on Google Images
 * using Puppeteer for browser automation. It manages browser sessions,
 * interacts with search results, and extracts image URLs.
 * 
 * @module scraper.engine
 */
import puppeteer, { type Browser, type Page, type ElementHandle } from "puppeteer";
import type { EngineConfig } from "../index.js";

/**
 * Scraper options with default values applied
 */
interface ScraperOptions {
  delay: number;
  timeout: number;
  debug_mode: boolean;
  limit: number;
}

/**
 * Simple delay function that returns a promise
 * @param ms Milliseconds to delay
 */
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Searches Google Images for the given query and extracts image URLs
 * 
 * @async
 * @function searchGoogleImage
 * @param {string} query - The search query string for Google Images
 * @param {EngineConfig} [config] - Optional configuration for the search engine behavior
 * @returns {Promise<string[]>} Promise resolving to an array of direct image URLs
 */
export async function searchGoogleImage(query: string, config?: EngineConfig): Promise<string[]> {
  // Initialize configuration with defaults
  const options: ScraperOptions = {
    delay: config?.delay || 1000,
    timeout: config?.timeout || 5000,
    debug_mode: config?.debug_mode || false,
    limit: config?.limit || 1
  }
  
  const imageUrls: string[] = [];

  // Browser setup
  const browser : Browser = await puppeteer.launch({ 
    headless: options.debug_mode ? false : true, 
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
      ],
    protocolTimeout: 30000,
  });
  
  try {
    const page: Page = await browser.newPage();

    await page.setViewport({
      width: 10000 * options.limit,
      height: 480
    });
    
    // Set navigation timeouts
    page.setDefaultNavigationTimeout(options.timeout * 2);
    page.setDefaultTimeout(options.timeout * 2);
    
    // Navigate to search page and handle consent
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`;
    await page.goto(searchUrl);
    
    try {
      const cookieButton = await page.waitForSelector('button[aria-label="Aceitar todos"], button[aria-label="Accept all"]', 
        { timeout: options.timeout });
      if (cookieButton) await cookieButton.click();
    } catch (error) {
      // Ignore cookie consent errors
    }
    
    await page.waitForSelector('#search', { timeout: options.timeout });
    await delay(options.delay/2);
    
    // Load more results for larger requests
    if(options.limit > 6){
      await page.evaluate((limit) => {
        window.scrollBy(0, window.innerHeight * limit * 10000);
        document.querySelectorAll('a[href*="/search?"], #search g-img:not([class])').forEach(el => el.remove());
        document.querySelectorAll('scrolling-carousel').forEach(el => el.remove());
        document.querySelectorAll('a[data-navigation="server"], span').forEach(el => el.remove());
        document.querySelectorAll('*[href]').forEach(el => el.removeAttribute('href'));
      }, options.limit);
      await delay(options.delay * 4);
    }
    
    // Image thumbnail selection
    const thumbnails: ElementHandle[] = await page.$$('#search g-img[class][style]');
    let usableThumbnails = thumbnails.slice(0, options.limit + 5)
      .filter(thumbnail => thumbnail && typeof thumbnail.click === 'function');
        
    // Extract images sequentially
    let i = 0;
    while (imageUrls.length < options.limit && i < usableThumbnails.length) {
      try {
        // Click and prepare the thumbnail view
        await usableThumbnails[i].click();
        
        // Clean up modal dialog elements
        await page.evaluate(() => {
          document.querySelectorAll('div[role="dialog"]').forEach(el => el.removeEventListener('click', () => {}));
          document.querySelectorAll('*[href]').forEach(el => el.removeAttribute('href'));
          document.querySelectorAll('h1, scrolling-carousel, a[data-navigation="server"], span, a[href*="/search?"]').forEach(el => el.remove());
        });
        
        await delay(options.delay * 2);
        
        // Extract the actual image URL
        const imageUrl = await page.evaluate(() => {
          // Clean up extraneous elements
          document.querySelectorAll('scrolling-carousel, h1, a[data-navigation="server"], span, a[href*="/search?"]').forEach(el => el.remove());
          
          // Remove pseudo-elements with content
          document.querySelectorAll('*').forEach(el => {
            const beforeStyle = window.getComputedStyle(el, '::before');
            const content = beforeStyle.getPropertyValue('content');
            if (content && content !== 'none' && content !== '' && content !== 'normal') {
              el.remove();
            }
          });

          // Find valid image elements
          const imgs = Array.from(document.querySelectorAll('img[src]'))
            .filter(img => {
              const src = img.getAttribute('src');
              return src && 
                    src.startsWith('http') && 
                    !src.includes('gstatic') && 
                    !src.includes('googleusercontent');
            });
            
          return imgs.length > 0 ? imgs[0].getAttribute('src') : null;
        });
        
        // Store unique URLs
        if (imageUrl && !imageUrls.includes(imageUrl)) {
          imageUrls.push(imageUrl);
        }
        
        i++;
        await delay(options.delay);
        
      } catch (err) {
        console.error('Error processing image:', err instanceof Error ? err.message : String(err));
        i++;
      }
    }
    
    return imageUrls;
  } catch (error) {
    console.error('Error in searchGoogleImage:', error);
    return imageUrls;
  } finally {
    // Browser cleanup
    if (browser) {
      try {
        await browser.close();
      } catch (error) {
        console.error('Error closing browser:', error);
      }
    }
  }
}