import { readdir, readFile, realpath, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const THEME_DIST_DIR = path.resolve(
  await realpath("node_modules/vuepress-theme-hope"),
  "dist",
);

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

const stripSourceMapComment = (code) =>
  code.replace(/\n?\/\/# sourceMappingURL=.*?(\r?\n)?$/m, "\n");

const main = async () => {
  let distStat;
  try {
    distStat = await stat(THEME_DIST_DIR);
  } catch {
    console.warn(
      `[fix-vuepress-theme-hope-sourcemap] skipped: ${THEME_DIST_DIR} does not exist`,
    );
    return;
  }

  if (!distStat.isDirectory()) {
    console.warn(
      `[fix-vuepress-theme-hope-sourcemap] skipped: ${THEME_DIST_DIR} is not a directory`,
    );
    return;
  }

  const files = await walk(THEME_DIST_DIR);
  const jsFiles = files.filter((file) => file.endsWith(".js"));

  if (jsFiles.length === 0) {
    console.warn("[fix-vuepress-theme-hope-sourcemap] skipped: no js files found");
    return;
  }

  let changedCount = 0;

  for (const file of jsFiles) {
    const original = await readFile(file, "utf-8");
    const fixed = stripSourceMapComment(original);

    if (fixed !== original) {
      await writeFile(file, fixed);
      changedCount += 1;
    }
  }

  if (changedCount === 0) {
    console.log("[fix-vuepress-theme-hope-sourcemap] no changes needed");
    return;
  }

  console.log(
    `[fix-vuepress-theme-hope-sourcemap] patched ${changedCount} file(s) under ${path.relative(process.cwd(), THEME_DIST_DIR)}`,
  );
};

await main();
