import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getAuthorStatus } from "../src/.vuepress/components/authorStatus.ts";

test("the homepage status resolves to the corresponding message and animated sticker", async () => {
  for (const [key, label, message] of [
    ["work", "施工中", "正在给博客拧螺丝"],
    ["rest", "休息中", "站长去充电了"],
  ]) {
    const status = getAuthorStatus(key);
    assert.equal(status.label, label);
    assert.equal(status.message, message);

    const gif = await readFile(new URL(`../src/.vuepress/public${status.animation}`, import.meta.url));
    assert.equal(gif.subarray(0, 6).toString(), "GIF89a");
    assert.ok(gif.includes(Buffer.from("NETSCAPE2.0\x03\x01\x00\x00")));

    const still = await readFile(new URL(`../src/.vuepress/public${status.still}`, import.meta.url));
    assert.equal(still.subarray(1, 4).toString(), "PNG");
  }
});

test("missing or invalid frontmatter omits the status", () => {
  for (const key of [undefined, "holiday", "__proto__"]) {
    assert.equal(getAuthorStatus(key), undefined);
  }
});
