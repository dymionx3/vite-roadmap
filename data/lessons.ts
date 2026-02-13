
import { Lesson, Difficulty } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Architecture & Entry',
    difficulty: Difficulty.Beginner,
    visual: 'folder-tree',
    content: `Vite revolutionizes the entry point of your web applications. Unlike traditional bundlers that treat JavaScript as the root, Vite treats your index.html as the primary entry point.
    
This allows Vite to parse your HTML and discover <script type="module"> tags directly, enabling it to serve source code over native ESM without pre-bundling.`,
    codeSnippet: `my-project/
├── index.html (Root Entry)
├── package.json
├── vite.config.ts
└── src/
    ├── main.ts
    └── App.tsx`,
    quiz: [
      {
        question: "Why does Vite use index.html as the entry point instead of a JS file?",
        options: ["To make the bundle larger", "To allow the browser to crawl module imports directly", "Because HTML is faster than JS", "It's a requirement of Rollup"],
        correctAnswer: "To allow the browser to crawl module imports directly",
        explanation: "By using index.html, Vite lets the browser's native module loader discover and request exactly what it needs."
      }
    ]
  },
  {
    id: 'l2',
    title: 'Scaffolding & Templates',
    difficulty: Difficulty.Beginner,
    visual: 'cli-scaffold',
    content: `The 'create-vite' CLI is the gateway to modern web dev. It offers zero-config templates for every major framework.
    
Using templates ensures you have the correct TypeScript configurations, build targets, and dev server settings out of the box.`,
    codeSnippet: `npm create vite@latest my-app --template react-ts`,
    quiz: [
      {
        question: "What is the primary benefit of using a Vite template?",
        options: ["It writes the app for you", "Pre-configured build and dev environment", "It makes the app run on old browsers", "It replaces the need for Node.js"],
        correctAnswer: "Pre-configured build and dev environment",
        explanation: "Templates provide the essential configurations like tsconfig and vite.config optimized for your chosen framework."
      }
    ]
  },
  {
    id: 'l3',
    title: 'HMR Dynamics',
    difficulty: Difficulty.Beginner,
    visual: 'hmr',
    content: `Hot Module Replacement (HMR) in Vite is near-instant. It works by keeping the current app state while swapping out only the modified module.
    
This is achieved via a persistent WebSocket connection between the browser and the Vite dev server.`,
    practice: {
      title: "HMR Style Test",
      description: "Update the CSS to see HMR in action without a page refresh.",
      initialCode: "body {\n  background: #000;\n  color: #fff;\n  transition: all 0.5s;\n}",
      type: 'css'
    }
  },
  {
    id: 'l4',
    title: 'Native ESM Loading',
    difficulty: Difficulty.Beginner,
    visual: 'esm-loading',
    content: `In development, Vite serves your code as Native ES Modules. 
    
This means the browser handles the heavy lifting of resolving imports. Vite only transforms the code (e.g., TS to JS) as the browser requests each individual file.`,
    quiz: [
      {
        question: "How does 'Native ESM' improve development speed?",
        options: ["It bundles everything into one file", "It skips bundling entirely for source code", "It uses Webpack internally", "It only works offline"],
        correctAnswer: "It skips bundling entirely for source code",
        explanation: "By serving files individually, Vite avoids the 'bundle overhead' that slows down large projects in other tools."
      }
    ]
  },
  {
    id: 'l5',
    title: 'Asset Processing',
    difficulty: Difficulty.Beginner,
    content: `Vite handles assets like images, CSS, and JSON automatically. 
    
When you import an image, Vite returns the public URL or base64 data depending on file size, allowing for seamless asset management in your JS files.`,
    codeSnippet: `import logo from './assets/logo.svg'\nimport config from './data.json'`,
    quiz: [
      {
        question: "What happens to small images imported in Vite?",
        options: ["They are deleted", "They are base64 inlined", "They are uploaded to a CDN", "They are ignored"],
        correctAnswer: "They are base64 inlined",
        explanation: "Vite inlines small assets to reduce the number of HTTP requests your app needs to make."
      }
    ]
  },
  {
    id: 'l6',
    title: 'Environment Variables',
    difficulty: Difficulty.Intermediate,
    visual: 'env-flow',
    content: `Vite uses 'import.meta.env' for environment access. 
    
Security is prioritized: only variables prefixed with 'VITE_' are bundled into your client code, keeping your database secrets safe on the server.`,
    codeSnippet: `// .env\nVITE_API_KEY=xyz_123\nDATABASE_SECRET=hidden\n\n// main.js\nconsole.log(import.meta.env.VITE_API_KEY)`,
    quiz: [
      {
        question: "Why is the VITE_ prefix required?",
        options: ["To make it harder to type", "To prevent leaking private server secrets", "It is a requirement of JavaScript", "To speed up the build"],
        correctAnswer: "To prevent leaking private server secrets",
        explanation: "Without a prefix, every environment variable on your machine could accidentally end up in the public bundle."
      }
    ]
  },
  {
    id: 'l7',
    title: 'Configuration Mastery',
    difficulty: Difficulty.Intermediate,
    content: `The 'vite.config.ts' file is the nerve center of your project. 
    
You can define path aliases (like @ for /src), configure third-party plugins, and define global constants that are injected during the build process.`,
    codeSnippet: `export default defineConfig({\n  resolve: {\n    alias: { '@': path.resolve(__dirname, './src') }\n  }\n})`,
    practice: {
      title: "Config Simulation",
      description: "Simulate a dynamic counter logic that uses a 'VITE_API' mock.",
      initialCode: "const api = 'https://api.vite.dev';\ndocument.getElementById('btn').onclick = () => {\n  console.log(`Pinging ${api}...`);\n  document.getElementById('status').innerText = 'Connected';\n}",
      type: 'js'
    }
  },
  {
    id: 'l8',
    title: 'Server Proxying',
    difficulty: Difficulty.Intermediate,
    visual: 'proxy-flow',
    content: `Developing locally often leads to CORS errors when calling external APIs. 
    
Vite's built-in dev server can act as a proxy, rerouting local requests to your backend server while making the browser believe the request is local.`,
    codeSnippet: `server: {\n  proxy: {\n    '/api': 'http://localhost:5000'\n  }\n}`,
    quiz: [
      {
        question: "What problem does the Vite proxy solve?",
        options: ["Slow internet", "Cross-Origin Resource Sharing (CORS) issues", "Minification", "Database management"],
        correctAnswer: "Cross-Origin Resource Sharing (CORS) issues",
        explanation: "Proxies make cross-origin requests appear local, bypassing browser security restrictions during development."
      }
    ]
  },
  {
    id: 'l9',
    title: 'Vitest Integration',
    difficulty: Difficulty.Intermediate,
    visual: 'testing-loop',
    content: `Vitest is the next-gen testing framework designed specifically for Vite. 
    
It uses the same transformation pipeline as the dev server, meaning your tests run in the exact same environment as your code.`,
    codeSnippet: `import { test, expect } from 'vitest'\n\ntest('math', () => {\n  expect(1 + 1).toBe(2)\n})`,
    quiz: [
      {
        question: "Why is Vitest faster than other test runners?",
        options: ["It uses less memory", "It reuses Vite's transformation cache", "It doesn't run tests", "It is written in C++"],
        correctAnswer: "It reuses Vite's transformation cache",
        explanation: "By sharing Vite's pipeline, Vitest doesn't have to re-compile your code from scratch."
      }
    ]
  },
  {
    id: 'l10',
    title: 'Production Bundling',
    difficulty: Difficulty.Advanced,
    visual: 'bundling',
    content: `In production, speed shifts from 'dev-refresh' to 'runtime-load'. 
    
Vite uses Rollup to perform sophisticated tree-shaking and chunk splitting, ensuring your users only download the bare minimum code needed.`,
    quiz: [
      {
        question: "Which tool does Vite use for the production build?",
        options: ["Webpack", "esbuild", "Rollup", "Babel"],
        correctAnswer: "Rollup",
        explanation: "Vite uses esbuild for development but relies on Rollup's mature plugin ecosystem for optimized production bundles."
      }
    ]
  },
  {
    id: 'l11',
    title: 'SSR & Hydration',
    difficulty: Difficulty.Advanced,
    visual: 'ssr-hydration',
    content: `Server-Side Rendering (SSR) involves rendering your app to HTML on the server first. 
    
Vite provides the hooks needed to bundle your app for a Node environment, then 'hydrates' it on the client for full interactivity.`,
    codeSnippet: `const { render } = await vite.ssrLoadModule('/src/entry-server.ts')`,
    quiz: [
      {
        question: "What is 'Hydration' in the context of SSR?",
        options: ["Adding water to servers", "Attaching event listeners to server-rendered HTML", "Downloading images", "Compressing files"],
        correctAnswer: "Attaching event listeners to server-rendered HTML",
        explanation: "Hydration turns 'dry' static HTML from the server into a 'wet' interactive application in the browser."
      }
    ]
  },
  {
    id: 'l12',
    title: 'Library Mode',
    difficulty: Difficulty.Advanced,
    visual: 'lib-mode',
    content: `Library mode allows you to build shared component libraries. 
    
You can externalize dependencies (like React) so that they aren't bundled twice when someone installs your package.`,
    codeSnippet: `build: {\n  lib: { entry: 'src/main.ts', formats: ['es', 'umd'] },\n  rollupOptions: { external: ['react'] }\n}`,
    quiz: [
      {
        question: "Why would you externalize 'react' in library mode?",
        options: ["To make it run faster", "To avoid duplicate React instances in the user's app", "To make the file smaller", "React is not allowed in libraries"],
        correctAnswer: "To avoid duplicate React instances in the user's app",
        explanation: "React relies on a single instance to manage state; having two versions bundled will break the application."
      }
    ]
  }
];
