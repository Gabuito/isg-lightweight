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

// Define interfaces first so they can be imported by other files
/**
 * Configuration options for the search engine behavior
 */
export interface EngineConfig {
  delay?: number;
  timeout?: number;
  debug_mode?: boolean;
  limit?: number;
}

/**
 * Configuration options for image processing and saving
 */
export interface ImageConfig {
  format?: string;
  quality?: number;
  save_path?: string;
}

/**
 * Combined configuration for ISG functionality
 */
export interface ISGConfig {
  query: string;
  engine?: EngineConfig;
  image?: ImageConfig;
}

/**
 * Combined options for ISG function parameters
 */
export interface Options {
  engineConfig?: EngineConfig;
  imageConfig?: ImageConfig;
}

// Now import the functions after defining the interfaces they need
import { searchGoogleImage as GetURL } from "./tools/scraper.engine.js";
import { saveImageLocally as SaveFrom } from "./tools/local.save.js";
import ISG from "./tools/index.js";

// Export everything
export default ISG;
export { SaveFrom, GetURL };