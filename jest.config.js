module.exports = {
    clearMocks: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/build/",
      "/coverage/",
      "/scripts/"
    ],
    // ... other Jest options
  };
  