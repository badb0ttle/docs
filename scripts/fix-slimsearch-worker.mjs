import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const DIST_DIR = path.resolve("src/.vuepress/dist");
const TARGET_PATTERN = /^slimsearch\.worker.*\.js$/;

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
};

const stripWorkerExport = (code) => {
  // plugin-slimsearch@2.0.0-rc.129 appends `export{}` in build worker output.
  return code
    .replace(/;?\s*export\s*\{\s*\}\s*;?\s*(\/\/# sourceMappingURL=)/, "\n$1")
    .replace(/;?\s*export\s*\{\s*\}\s*;?\s*$/, "");
};

const main = async () => {
  let distStat;
  try {
    distStat = await stat(DIST_DIR);
  } catch {
    console.warn(`[fix-slimsearch-worker] skipped: ${DIST_DIR} does not exist`);
    return;
  }

  if (!distStat.isDirectory()) {
    console.warn(`[fix-slimsearch-worker] skipped: ${DIST_DIR} is not a directory`);
    return;
  }

  const files = await walk(DIST_DIR);
  const workerFiles = files.filter((file) => TARGET_PATTERN.test(path.basename(file)));

  if (workerFiles.length === 0) {
    console.warn("[fix-slimsearch-worker] skipped: no slimsearch worker files found");
    return;
  }

  let changedCount = 0;

  for (const file of workerFiles) {
    const original = await readFile(file, "utf-8");
    const fixed = stripWorkerExport(original);

    if (fixed !== original) {
      await writeFile(file, fixed);
      changedCount += 1;
      console.log(`[fix-slimsearch-worker] patched: ${path.relative(process.cwd(), file)}`);
    }
  }

  if (changedCount === 0) {
    console.log("[fix-slimsearch-worker] no changes needed");
  }
};

await main();
