#!/usr/bin/env node
const { spawnSync } = require("node:child_process");
const { resolve } = require("node:path");

// workaround to disable ExperimentalWarning for end user(https://github.com/nodejs/node/issues/10802#issuecomment-491560449)
const cmd = `node --no-warnings=ExperimentalWarning ${resolve(__dirname, "app.mjs")}`;
spawnSync(cmd, { stdio: "inherit", shell: true });