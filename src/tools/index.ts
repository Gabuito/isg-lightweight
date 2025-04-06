/**
 * Main functionality for image search and download operations
 * 
 * This module contains the primary interfaces and functions for searching
 * and downloading images from Google Images.
 * 
 * @module tools
 */

// Import the functions but don't re-export them yet
import { searchGoogleImage } from "./scraper.engine.js";
import { saveImageLocally } from "./local.save.js";

// Import types from main index - we'll create a direct reference without circular imports
import type { EngineConfig, ImageConfig, Options } from "../index.js";

/**
 * Main function to search for images and optionally save them locally
 * 
 * @async
 * @param {string} query - The search query string for finding images
 * @param {Options} [options] - Optional configuration for search engine and image processing
 * @returns {Promise<string[]>} Promise resolving to an array of image URLs found
 */
async function ISG(query: string, options?: Options): Promise<string[]> {
  const results = await searchGoogleImage(query, options?.engineConfig);
  if(options?.imageConfig){
    for (const imageUrl of results) {
      await saveImageLocally(imageUrl, query, options.imageConfig);
    }
  }
  return results;
}

// Export the main function as default
export default ISG;
