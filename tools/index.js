import { searchGoogleImage as Engine } from "./scraper.engine.js";
import { saveImageLocally as ImgFile } from "./local.save.js";
export default async function ISG(query, options) {
    const results = await Engine(query, options.engineConfig);
    if (options.imageConfig) {
        results.forEach(async (imageUrl) => await ImgFile(imageUrl, query, options.imageConfig));
    }
    ;
    return results;
}
//# sourceMappingURL=index.js.map