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
export interface Options {
    engineConfig?: EngineConfig;
    imageConfig?: ImageConfig;
}
export default function ISG(query: string, options?: Options): Promise<string[]>;
//# sourceMappingURL=index.d.ts.map