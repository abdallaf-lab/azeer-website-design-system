// Ambient declaration so `tsc --noEmit` accepts side-effect CSS imports
// (e.g. `import "./globals.css"`). Next's bundler handles the actual CSS.
declare module "*.css";
