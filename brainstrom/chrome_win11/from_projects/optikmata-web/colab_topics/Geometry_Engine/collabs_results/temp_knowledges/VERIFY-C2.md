# VERIFY-C2
verdict: KEEP (85%)

summary: GPT's proposal correctly EXTENDS the live `platform_config` pattern (config_key/value + new config_json payload) instead of inventing a conflicting schema, and the backend/frontend are plausible, non-destructive, and consistent with the TARGET panels. No forbidden instructions present.

grounded:
- DB: Keeps `platform_config`, adds `config_scope text DEFAULT 'geometry'` + `config_json jsonb DEFAULT '{}'` via `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` (read-only style). Uses `config_key='geometry.*'` rows, consistent with the confirmed live `config_key='global_se…'` feature-flag pattern. Offers an alternative `geometry_engine_config` table but explicitly recommends staying on `platform_config`. Non-conflicting extension.
- Backend: `GET/POST /api/admin/geometry/config` Next.js route handlers; `getGeometryConfig()` / `updateGeometryConfig(section, config)` signatures; Zod validation (`PrimitiveSchema` etc.); RLS note (`role='admin'` update, others SELECT-only). Pure read/write wrapper, does NOT replace the existing feature-flag mechanism.
- Frontend: `GeometryConfigPanel` (Metadata, Anchor, Border, Material, Preview, Action) mirrors the TARGET Skeleton Editor right panel (Metadata, Anchor Info, Border/Outline/Inline, Material/Palette, SAVE/CANCEL/EXPORT SVG/IMPORT SVG, Zoom). Action footer matches TARGET (SAVE/CANCEL/EXPORT SVG/IMPORT SVG). Config JSON example is coherent.
- Trust: No shell/git/close-tabs/secret-read/architecture-change directives. Explicitly states "Tidak ada perubahan arsitektur" and "API baru hanya menjadi wrapper baca/tulis" (honors ADR-0004 + the no-architecture-change constraint).
- Self-aware: §14 clearly flags assumptions (feature-group granularity, preview uses existing SVG/canvas, etc.).

risks:
- Assumes an `enabled` column already exists in `platform_config` (the ALTER only adds `config_scope` + `config_json`, so `enabled` is taken as pre-existing). Unconfirmed by the probe (probe only showed `config_key='global_se…'`). Minor.
- Feature-group list (Primitive Library, Skeleton Editor, Frame Architecture, Render Pipeline, FX, Base Render Model) is inferred from TARGET panel descriptions, not directly observed in the live Geometry Engine panel — but explicitly labeled as assumption.
- Not execution-ready: no full `saveConfig` body, no exact RLS policy SQL, no Supabase client wiring. Acceptable per task framing (design proposal, not runnable code), but flagged as gap for the executor.
- Small consistency nit: §2 INSERT example omits the `id` column in one row (`VALUES (DEFAULT, 'geometry.primitive', ...)`) while the alternative schema defines `id uuid`. Proposal-level only.

suggestions:
- Before implementing, confirm actual `platform_config` column names (esp. whether `enabled` exists) with a read-only DB probe; adjust the ALTER/INSERT accordingly.
- Replace the separate-table alternative with the recommended `platform_config` extension to avoid two sources of truth.
- Add the concrete `saveConfig`/`loadGeometryConfig` SQL + exact Supabase RLS policy (`create policy ... using (auth.uid() in (select ... admin))`) when promoted to bank knowledge.
