<p align="center">
  <img src="https://i.postimg.cc/Vv8ttvC2/Sem-T-tulo-1.png" alt="ISG-Lightweight Logo" width="500"
 margin-bottom="-100px" />
<h1 align="center">
  ISG-Lightweight
</h1>
</p>

A lightweight, easy-to-use package for searching Google Images and optionally downloading them locally. Built with Puppeteer for reliable web scraping and Sharp for high-quality image processing.

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-Compatible-blue?logo=typescript" alt="TypeScript Compatible"/>
</p>

> **Note**: ISG-Lightweight is fully asynchronous. All functions return Promises and should be used with async/await or Promise chains.

## Project Origin

ISG-Lightweight was created out of the need for an easy-to-use tool to quickly capture placeholder images during learning and development processes. While developing applications and websites, having quick access to relevant images for testing layouts, components, and user interfaces is invaluable. This library aims to simplify that process, providing a straightforward way to obtain test images without interrupting your workflow. We hope this tool can help others who need similar functionality during their own learning journey and development projects.


Based on [pevers/images-scraper](https://github.com/pevers/images-scraper)


## Installation

```bash
npm install isg-lightweight
```

## Local Development

To use ISG-Lightweight locally during development:

1. Clone the repository:

```bash
git clone https://github.com/gabuioli/ISG-Lightweight.git
cd ISG-Lightweight
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Create a global symlink:

```bash
npm link
```

5. In your project, link to the local version:

```bash
cd /path/to/your/project
npm link isg-lightweight
```

This creates a symbolic link from your global node_modules to your local development version, allowing you to test changes immediately.

## Basic Usage

### ES Modules (ESM)

```javascript
import ISG from 'isg-lightweight';

// Get image URLs only
const imageUrls = await ISG('cute cats');
console.log(imageUrls);
// Output: ['https://example.com/cat1.jpg', 'https://example.com/cat2.jpg']
```

### CommonJS

```javascript
const { default: ISG } = require('isg-lightweight');

// Get image URLs only
(async () => {
  const imageUrls = await ISG('cute cats');
  console.log(imageUrls);
  // Output: ['https://example.com/cat1.jpg', 'https://example.com/cat2.jpg']
})();
```

### Search and Save Images Locally

#### ESM

```javascript
import ISG from 'isg-lightweight';

// Search for images and save them locally
const imageUrls = await ISG('cute cats', {
  imageConfig: {
    format: 'webp',
    quality: 85
  }
});

// Images will be saved to ./downloads/cute cats/
```

#### CommonJS

```javascript
const { default: ISG } = require('isg-lightweight');

(async () => {
  // Search for images and save them locally
  const imageUrls = await ISG('cute cats', {
    imageConfig: {
      format: 'webp',
      quality: 85
    }
  });
  
  // Images will be saved to ./downloads/cute cats/
})();
```

### Using Individual Functions

#### ESM

```javascript
import { GetURL, SaveFrom } from 'isg-lightweight';

// Only search for images
const imageUrls = await GetURL('mountain landscapes', { 
  limit: 5,
  timeout: 3000 
});

// Manually save an image
await SaveFrom('https://example.com/landscape.jpg', 'landscapes', { 
  format: 'png',
  quality: 90 
});
```

#### CommonJS

```javascript
const { GetURL, SaveFrom } = require('isg-lightweight');

(async () => {
  // Only search for images
  const imageUrls = await GetURL('mountain landscapes', { 
    limit: 5,
    timeout: 3000 
  });

  // Manually save an image
  await SaveFrom('https://example.com/landscape.jpg', 'landscapes', { 
    format: 'png',
    quality: 90 
  });
})();
```

## API Reference

### Main Function

#### `ISG(query, options?)`

The main function that searches for images and optionally saves them locally.

- **query**: `string` - The search query
- **options**: `Options` (optional) - Configuration options
- **returns**: `Promise<string[]>` - Array of image URLs

### Configuration Interfaces

#### `EngineConfig`

Configuration for the search engine behavior.

| Property   | Type    | Default | Description                                  |
| ---------- | ------- | ------- | -------------------------------------------- |
| delay      | number  | 500     | Delay between operations in milliseconds     |
| timeout    | number  | 2000    | Timeout for operations in milliseconds       |
| debug_mode | boolean | false   | Whether to run in debug mode (shows browser) |
| limit      | number  | 1       | Maximum number of images to retrieve         |

#### `ImageConfig`

Configuration for image processing and saving.

| Property  | Type   | Default       | Description                                          |
| --------- | ------ | ------------- | ---------------------------------------------------- |
| format    | string | 'webp'        | Image format to save as (e.g., "webp", "jpg", "png") |
| quality   | number | 80            | Quality of the saved image (0-100)                   |
| save_path | string | './downloads' | Directory path to save images                        |

#### `Options`

Combined options for the ISG function.

| Property     | Type         | Description                         |
| ------------ | ------------ | ----------------------------------- |
| engineConfig | EngineConfig | Configuration for the search engine |
| imageConfig  | ImageConfig  | Configuration for image processing  |

### Individual Functions

#### `GetURL(query, config?)`

Searches Google Images for the given query and extracts image URLs.

- **query**: `string` - The search query
- **config**: `EngineConfig` (optional) - Engine configuration
- **returns**: `Promise<string[]>` - Array of image URLs

#### `SaveFrom(imageUrl, query, options?)`

Downloads an image from a URL and saves it to the local filesystem.

- **imageUrl**: `string` - The URL of the image to download
- **query**: `string` - The search query (for folder naming)
- **options**: `ImageConfig` (optional) - Image configuration
- **returns**: `Promise<void>`

## Advanced Examples

### Maximum Customization

#### ESM

```javascript
import ISG from 'isg-lightweight';

const imageUrls = await ISG('vintage cars', {
  engineConfig: {
    limit: 20,       // Get 20 images
    timeout: 5000,    // 5 second timeout
    delay: 1000,      // 1 second delay
    debug_mode: true  // Show browser window for debugging
  },
  imageConfig: {
    format: 'jpg',    // Save as JPG
    quality: 95,      // High quality
    save_path: './my-car-images'  // Custom save location
  }
});
```

#### CommonJS

```javascript
const { default: ISG } = require('isg-lightweight');

(async () => {
  const imageUrls = await ISG('vintage cars', {
    engineConfig: {
      limit: 20,       // Get 20 images
      timeout: 5000,    // 5 second timeout
      delay: 1000,      // 1 second delay
      debug_mode: true  // Show browser window for debugging
    },
    imageConfig: {
      format: 'jpg',    // Save as JPG
      quality: 95,      // High quality
      save_path: './my-car-images'  // Custom save location
    }
  });
})();
```

### Error Handling

#### ESM

```javascript
import ISG from 'isg-lightweight';

try {
  const imageUrls = await ISG('rare butterflies', {
    engineConfig: { limit: 10 }
  });
  console.log(`Found ${imageUrls.length} images`);
} catch (error) {
  console.error('Error searching images:', error.message);
}
```

#### CommonJS

```javascript
const { default: ISG } = require('isg-lightweight');

(async () => {
  try {
    const imageUrls = await ISG('rare butterflies', {
      engineConfig: { limit: 10 }
    });
    console.log(`Found ${imageUrls.length} images`);
  } catch (error) {
    console.error('Error searching images:', error.message);
  }
})();
```

## Known Issues

- Highly dependent on stable internet connection
- Current performance is O(n²) (work in progress to reduce to O(n))
- Instability when using tunneling and VPNs
- Occasional Google CAPTCHA challenges
- Heavy dependency on Google's frontend structure

## Core Dependencies

- Node.js (v16+)
- Puppeteer

## Important Disclaimer

**Legal Notice**: ISG-Lightweight is a tool for searching and downloading images from Google Images. The use of any images obtained through this tool is solely the responsibility of the end user.

Please be aware that:

- Many images found on Google are protected by copyright
- Using images without proper permission may violate copyright laws
- This tool does not filter results based on usage rights or licenses
- The developers of ISG-Lightweight assume no liability for the misuse of images obtained through this tool

We strongly recommend that you:

- Only use images you have the right to use
- Check image licensing before using in any project
- Consider using images with permissive licenses (e.g., Creative Commons)
- Respect the rights of content creators and copyright holders
- Limit usage primarily to educational, learning, and personal purposes
- For commercial projects, ensure you have proper licensing for all images

This tool is recommended primarily for educational purposes, learning environments, and personal use where placeholder or sample images are needed temporarily. For production or commercial applications, always ensure you have the appropriate rights to use any images.

By using this tool, you acknowledge that you are responsible for complying with all applicable laws regarding the usage of the images you download.

## License

MIT License

Copyright (c) 2025 Gabuito

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files.
