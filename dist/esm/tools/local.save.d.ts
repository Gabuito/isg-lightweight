import type { ImageConfig } from '../index.js';
/**
 * Downloads an image from a URL and saves it to the local filesystem
 *
 * This function fetches an image from the provided URL, processes it
 * according to the specified options, and saves it to disk. Images are
 * organized in folders based on the search query and given unique filenames.
 *
 * @async
 * @function saveImageLocally
 * @param {string} imageUrl - The URL of the image to download
 * @param {string} query - The search query used (for folder naming)
 * @param {ImageConfig} [options] - Configuration options for saving the image
 * @returns {Promise<void>} Promise that resolves when the image is successfully saved
 * @throws {Error} If there's an error fetching, processing, or saving the image
 * @example
 * // Save an image with default settings
 * await saveImageLocally("https://example.com/image.jpg", "sunset");
 *
 * // Save with custom options
 * await saveImageLocally("https://example.com/image.jpg", "sunset", {
 *   format: "png",
 *   quality: 95,
 *   save_path: "./custom_folder"
 * });
 */
export declare function saveImageLocally(imageUrl: string, query: string, options?: ImageConfig): Promise<void>;
