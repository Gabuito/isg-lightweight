import { searchGoogleImage as Engine } from "./scraper.engine.js";
import { saveImageLocally as ImgFile } from "./local.save.js";

export interface EngineConfig {
  delay?: number;
  timeout?: number;
  debug_mode?: boolean;
  limit?: number;
}
export interface ImageConfig {
  format?: string;
  quality?: number;
  save_path?: string;
}
export interface ISGConfig {
  query: string;
  engine?: EngineConfig;
  image?: ImageConfig;

}

export interface Options{
  engineConfig?: EngineConfig;
  imageConfig?: ImageConfig;
} 

export default async function ISG(query: string, options?: Options ): Promise<string[]> {
  const results = await Engine(query, options!.engineConfig);
  if(options!.imageConfig){
    results.forEach(async (imageUrl) => await ImgFile(imageUrl, query, options!.imageConfig));
  };
  return results;
}
