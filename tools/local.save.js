import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
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