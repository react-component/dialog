module.exports = {
  setupFiles: ["./tests/setup.js"],
  setupFilesAfterEnv: ["./tests/setupFilesAfterEnv.ts"],
  snapshotSerializers: [require.resolve("enzyme-to-json/serializer")],
};
