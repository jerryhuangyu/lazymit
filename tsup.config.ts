import { defineConfig } from "tsup";

export default defineConfig({
	format: ["esm"],
	entry: ["./src/app.tsx"],
	dts: true,
	shims: true,
	skipNodeModulesBundle: true,
	clean: true,
	onSuccess: "cp index.js dist",
});
