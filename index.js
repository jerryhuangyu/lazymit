#!/usr/bin/env node
const { spawnSync } = require("node:child_process");
const { resolve } = require("node:path");

// workaround to disable ExperimentalWarning for end user(https://github.com/nodejs/node/issues/10802#issuecomment-491560449)
const scriptPath = resolve(__dirname, "app.mjs");
const args = ["--no-warnings=ExperimentalWarning", scriptPath, ...process.argv.slice(2)];
spawnSync("node", args, { stdio: "inherit" });