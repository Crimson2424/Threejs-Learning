// vite.config.js
import glsl from "file:///E:/Games/Threejs%20Learning/37%20halftone%20shading%20shaders/node_modules/vite-plugin-glsl/src/index.js";
var vite_config_default = {
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true,
    // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env)
    // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    // Output in the dist/ folder
    emptyOutDir: true,
    // Empty the folder first
    sourcemap: true
    // Add sourcemap
  },
  plugins: [
    glsl()
  ]
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxHYW1lc1xcXFxUaHJlZWpzIExlYXJuaW5nXFxcXDM3IGhhbGZ0b25lIHNoYWRpbmcgc2hhZGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcR2FtZXNcXFxcVGhyZWVqcyBMZWFybmluZ1xcXFwzNyBoYWxmdG9uZSBzaGFkaW5nIHNoYWRlcnNcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0dhbWVzL1RocmVlanMlMjBMZWFybmluZy8zNyUyMGhhbGZ0b25lJTIwc2hhZGluZyUyMHNoYWRlcnMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgZ2xzbCBmcm9tICd2aXRlLXBsdWdpbi1nbHNsJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcm9vdDogJ3NyYy8nLFxuICAgIHB1YmxpY0RpcjogJy4uL3N0YXRpYy8nLFxuICAgIGJhc2U6ICcuLycsXG4gICAgc2VydmVyOlxuICAgIHtcbiAgICAgICAgaG9zdDogdHJ1ZSwgLy8gT3BlbiB0byBsb2NhbCBuZXR3b3JrIGFuZCBkaXNwbGF5IFVSTFxuICAgICAgICBvcGVuOiAhKCdTQU5EQk9YX1VSTCcgaW4gcHJvY2Vzcy5lbnYgfHwgJ0NPREVTQU5EQk9YX0hPU1QnIGluIHByb2Nlc3MuZW52KSAvLyBPcGVuIGlmIGl0J3Mgbm90IGEgQ29kZVNhbmRib3hcbiAgICB9LFxuICAgIGJ1aWxkOlxuICAgIHtcbiAgICAgICAgb3V0RGlyOiAnLi4vZGlzdCcsIC8vIE91dHB1dCBpbiB0aGUgZGlzdC8gZm9sZGVyXG4gICAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLCAvLyBFbXB0eSB0aGUgZm9sZGVyIGZpcnN0XG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZSAvLyBBZGQgc291cmNlbWFwXG4gICAgfSxcbiAgICBwbHVnaW5zOlxuICAgIFtcbiAgICAgICAgZ2xzbCgpXG4gICAgXVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVcsT0FBTyxVQUFVO0FBRWxYLElBQU8sc0JBQVE7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLFFBQ0E7QUFBQSxJQUNJLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTSxFQUFFLGlCQUFpQixRQUFRLE9BQU8sc0JBQXNCLFFBQVE7QUFBQTtBQUFBLEVBQzFFO0FBQUEsRUFDQSxPQUNBO0FBQUEsSUFDSSxRQUFRO0FBQUE7QUFBQSxJQUNSLGFBQWE7QUFBQTtBQUFBLElBQ2IsV0FBVztBQUFBO0FBQUEsRUFDZjtBQUFBLEVBQ0EsU0FDQTtBQUFBLElBQ0ksS0FBSztBQUFBLEVBQ1Q7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
