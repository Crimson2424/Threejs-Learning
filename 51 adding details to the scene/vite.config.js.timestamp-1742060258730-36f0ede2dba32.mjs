// vite.config.js
import glsl from "file:///E:/Games/Threejs%20Learning/51%20adding%20details%20to%20the%20scene/node_modules/vite-plugin-glsl/src/index.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxHYW1lc1xcXFxUaHJlZWpzIExlYXJuaW5nXFxcXDUxIGFkZGluZyBkZXRhaWxzIHRvIHRoZSBzY2VuZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcR2FtZXNcXFxcVGhyZWVqcyBMZWFybmluZ1xcXFw1MSBhZGRpbmcgZGV0YWlscyB0byB0aGUgc2NlbmVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0dhbWVzL1RocmVlanMlMjBMZWFybmluZy81MSUyMGFkZGluZyUyMGRldGFpbHMlMjB0byUyMHRoZSUyMHNjZW5lL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IGdsc2wgZnJvbSAndml0ZS1wbHVnaW4tZ2xzbCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHJvb3Q6ICdzcmMvJyxcbiAgICBwdWJsaWNEaXI6ICcuLi9zdGF0aWMvJyxcbiAgICBiYXNlOiAnLi8nLFxuICAgIHNlcnZlcjpcbiAgICB7XG4gICAgICAgIGhvc3Q6IHRydWUsIC8vIE9wZW4gdG8gbG9jYWwgbmV0d29yayBhbmQgZGlzcGxheSBVUkxcbiAgICAgICAgb3BlbjogISgnU0FOREJPWF9VUkwnIGluIHByb2Nlc3MuZW52IHx8ICdDT0RFU0FOREJPWF9IT1NUJyBpbiBwcm9jZXNzLmVudikgLy8gT3BlbiBpZiBpdCdzIG5vdCBhIENvZGVTYW5kYm94XG4gICAgfSxcbiAgICBidWlsZDpcbiAgICB7XG4gICAgICAgIG91dERpcjogJy4uL2Rpc3QnLCAvLyBPdXRwdXQgaW4gdGhlIGRpc3QvIGZvbGRlclxuICAgICAgICBlbXB0eU91dERpcjogdHJ1ZSwgLy8gRW1wdHkgdGhlIGZvbGRlciBmaXJzdFxuICAgICAgICBzb3VyY2VtYXA6IHRydWUgLy8gQWRkIHNvdXJjZW1hcFxuICAgIH0sXG4gICAgcGx1Z2luczpcbiAgICBbXG4gICAgICAgIGdsc2woKVxuICAgIF1cbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQThXLE9BQU8sVUFBVTtBQUUvWCxJQUFPLHNCQUFRO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixRQUNBO0FBQUEsSUFDSSxNQUFNO0FBQUE7QUFBQSxJQUNOLE1BQU0sRUFBRSxpQkFBaUIsUUFBUSxPQUFPLHNCQUFzQixRQUFRO0FBQUE7QUFBQSxFQUMxRTtBQUFBLEVBQ0EsT0FDQTtBQUFBLElBQ0ksUUFBUTtBQUFBO0FBQUEsSUFDUixhQUFhO0FBQUE7QUFBQSxJQUNiLFdBQVc7QUFBQTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLFNBQ0E7QUFBQSxJQUNJLEtBQUs7QUFBQSxFQUNUO0FBQ0o7IiwKICAibmFtZXMiOiBbXQp9Cg==
