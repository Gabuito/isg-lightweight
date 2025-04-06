import type { EngineConfig } from "../index.js";
/**
 * Searches Google Images for the given query and extracts image URLs
 *
 * @async
 * @function searchGoogleImage
 * @param {string} query - The search query string for Google Images
 * @param {EngineConfig} [config] - Optional configuration for the search engine behavior
 * @returns {Promise<string[]>} Promise resolving to an array of direct image URLs
 */
export declare function searchGoogleImage(query: string, config?: EngineConfig): Promise<string[]>;
