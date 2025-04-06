/**
 * ISG-Lightweight - Image Search and Download Library
 *
 * The main entry point for the ISG-Lightweight package, which provides
 * functionality for searching images online and optionally saving them locally.
 *
 * @module ISG-Lightweight
 * @author Gabuito
 * @version 1.0.0
 */
// Now import the functions after defining the interfaces they need
import { searchGoogleImage as GetURL } from "./tools/scraper.engine.js";
import { saveImageLocally as SaveFrom } from "./tools/local.save.js";
import ISG from "./tools/index.js";
// Export everything
export default ISG;
export { SaveFrom, GetURL };
//# sourceMappingURL=index.js.map