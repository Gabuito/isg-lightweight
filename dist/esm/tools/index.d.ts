/**
 * Main functionality for image search and download operations
 *
 * This module contains the primary interfaces and functions for searching
 * and downloading images from Google Images.
 *
 * @module tools
 */
import type { Options } from "../index.js";
/**
 * Main function to search for images and optionally save them locally
 *
 * @async
 * @param {string} query - The search query string for finding images
 * @param {Options} [options] - Optional configuration for search engine and image processing
 * @returns {Promise<string[]>} Promise resolving to an array of image URLs found
 */
declare function ISG(query: string, options?: Options): Promise<string[]>;
export default ISG;
