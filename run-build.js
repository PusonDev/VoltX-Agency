const path = require('path');
const cp = require('child_process');

const patchPath = path.resolve(__dirname, 'patch-node.js').replace(/\\/g, '/');
const nextBin = path.resolve(__dirname, 'node_modules/next/dist/bin/next');

process.env.NODE_OPTIONS = `--require "${patchPath}"`;

const command = process.argv[2] || 'build';
const child = cp.spawn(process.execPath, [nextBin, command], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
