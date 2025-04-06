/**
 * Module for handling local image saving operations
 *
 * Provides functionality to download images from URLs and save them
 * to the local filesystem with optional processing.
 *
 * @module local.save
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
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
export async function saveImageLocally(imageUrl, query, options) {
    try {
        const settings = {
            format: options?.format || 'webp',
            quality: options?.quality || 80,
        };
        const dir = path.join("./downloads", query);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Extract the image name from the URL
        const imageName = path.basename(imageUrl);
        // Define the full path to save the image
        const imagePath = path.join(dir, query.replaceAll(' ', '').toUpperCase() + "-" + Date.now());
        // Fetch the image and save it locally
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const image = Buffer.from(uint8Array);
        await sharp(image)
            .toFormat(settings.format, { quality: settings.quality }) // Você pode ajustar a qualidade (0-100)
            .toFile(imagePath + ".webp", (err, _) => {
            if (err) {
                throw new Error('Error saving image: ' + err.message);
            }
        });
        return;
    }
    catch (error) {
        throw new Error();
    }
}
//# sourceMappingURL=local.save.js.map