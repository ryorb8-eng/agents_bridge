---
name: bridge-image-publish
description: >-
  MULTI-VENDOR skill: turn a local image in docs/TEMP_IMAGES/screenshots into a
  public RAW URL any bridge remote (ChatGPT / Claude / Z / Gemini) can read, then
  push that URL to the remote AI for Vision analysis. Single source of truth for the
  "image -> public URL" step so the per-vendor web-dom-* skills no longer each hardcode
  the github-raw method. Read this BEFORE pasting an image URL into any remote.
metadata:
  origin: agents_bridge (extracted from web-dom-chatgpt §5 Vision bonus)
  confidence: live-observed
  note: >-
    The local Claude CLI has NO Vision. The remote AI is our "eyes": we hand it a
    public image URL, it returns a textual description, and that text becomes the
    local AI's understanding. This skill is the vendor-agnostic publishing step;
    the per-vendor web-dom-* skill owns the send/scrape of that description.
---

# bridge-image-publish — make an image publicly readable (multi-vendor)

**Why this skill exists:** previously each `web-dom-<remote>` duplicated the github-raw
URL recipe (`web-dom-chatgpt §5`). That drifted. This skill is the **single source of
truth** for publishing; the web-dom-* skills now say "publish via `bridge-image-publish`,
paste the returned RAW URL" instead of re-implementing it.

---

## 1. Prereq — the image must be in the repo

Images live in `docs/TEMP_IMAGES/screenshots/`. If the image is still on Win11, fetch it
first (see `bridge-image-analyst` → sync step, or run
`./scripts/fetch_screenshots.sh get "<name>"`). Do **not** paste a `file://` or local
path into a remote AI — it cannot read your LAN. It needs an http(s) URL.

## 2. Publish (get a public RAW URL)

```bash
git add docs/TEMP_IMAGES/screenshots/<name>
git commit -m "img: add <name> for vision analysis"
git push
```

The public RAW URL (works for ChatGPT / Claude / Z / Gemini — all can ingest a github
raw/Raw Github URL):

```
https://github.com/ryorb8-eng/agents_bridge/raw/refs/heads/main/docs/TEMP_IMAGES/screenshots/<name>
```

> Replace spaces in `<name>` with `%20` if the remote AI is finicky about raw spaces in
> URLs (most are fine, but `%20` is safest). Example:
> `.../screenshots/Screenshot%202026-07-17%20172739.png`

**Cadence:** you may batch several images into one commit/push (one push per analysis
batch is fine — the RAW URL is stable per filename on `main`).

## 3. Hand to the remote AI (vendor-agnostic)

Paste the RAW URL into the composer of the chosen remote (pick the remote per
`bridge-collab`'s decision matrix — GPT/Claude/Z/Gemini all do Vision). Use the
image-to-markdown / describe-image prompt from `docs/prompts/prompt_image-to-markdown.md`.
The remote returns TEXT; that text is the local AI's "vision."

- The remote-specific **send + scrape** of that description is owned by
  `web-dom-<remote>` (e.g. `gpt/bridge-cdp-gpt_new.ts` Vision mode for ChatGPT).
- This skill only owns **steps 1–2 (publish)**. It does NOT name a vendor.

## 4. Cleanup (optional)

`docs/TEMP_IMAGES/` is gitignored-ish working space; prune old images/metadata when no
longer needed. Never commit secrets as images.

---

## 5. Auto-learning

If github's RAW URL pattern changes (e.g. raw.githubusercontent vs /raw/), update this
skill once; all web-dom-* skills inherit it by reference.
