# list_profil_vendor.md — Pemetaan Profil Chrome ↔ AI Vendor

**TUJUAN:** satu sumber kebenaran yang mencatat profil Chrome DebugProfile (Win11)
mana yang login ke vendor AI apa. Agent / subagent **WAJIB** cek file ini sebelum
membuka / mengemudikan / men-switch profil, dan sebelum menafsirkan `.log` bridge
(profil mana yang menghasilkan chat itu).

> Profil di sini = direktori `--profile-directory` di user-data-dir `ChromeDebugProfile`
> (Win11). Buka via gatekeeper: `ssh win11 launch:<ProfileName>`.

---

## 0. Aturan Wajib (untuk agent / subagent)

1. **SEBELUM** drive / read / send ke remote AI, CEK file ini → pastikan profil yang
   akan dibuka benar-benar login ke vendor tujuan. Jangan asumsikan "Profile 14 = GPT".
2. **SETIAP** run transport mencatat `profile` ke `.log` terkait (lihat §2). Bila `.log`
   tidak punya field `profile`, itu bug → perbaiki.
3. **DEFAULT profil = `Profile 14`** untuk semua vendor (`*_new.ts` dan `*_continue.ts`).
   Hanya keluar dari default bila:
   - MASTER **eksplisit** minta profil lain, ATAU
   - vendor **rate-limit** / gagal di `Profile 14`, ATAU
   - hal lain yang menyebabkan vendor gagal jalan di `Profile 14`.
   Saat fallback, rujuk daftar §1 di bawah.
4. **FREE-TIER LIMIT adalah per AKUN, bukan per profil.** Ganti profil HANYA me-reset
   limit bila profil tujuan login ke **akun berbeda**. Profil sama-akun / logout = tidak
   reset (→ `Bridge_automation_run_ChromeDebugProfile_win11_linux.md` §0 caveat).

---

## 1. Daftar Profil (umum)

| Profil | Vendor terisi | Catatan |
|---|---|---|
| `Profile 14` | ChatGPT + Claude.ai + Z.ai (semua vendor, akun utama) | **DEFAULT** semua transport. Conversation `c/6a578f51-...` (GPT) & `c/d63fd4ea-...` (Z) ada di sini. |
| `Profile 2` | ChatGPT + Claude.ai + Z.ai (akun cadangan) + **Gemini** | Fallback rate-limit untuk GPT/Claude/Z. **Gemini DEFAULT = Profile 2** (transport gemini taruh `BRIDGE_PROFILE='Profile 2'`). Reset limit HANYA jika login akun berbeda. |

> Whitelist gatekeeper (`$AllowedProfiles` di `chrome-debug-gate.ps1`) = `Profile 14`,
> `Profile 2`. Tambah profil → edit gatekeeper + file ini bersamaan.

---

## 2. Pemetaan spesifik (URL ↔ Profil)

Setiap `*_continue.ts` punya default conversation URL yang **hanya valid di profil
tertentu** (login-specific). Catat di sini agar tidak salah profil saat re-run:

| Transport | Default conversation URL | Hanya di profil | Catatan |
|---|---|---|---|
| `gpt/bridge-cdp-gpt_continue.ts` | `https://chatgpt.com/c/6a578f51-b1d4-83ec-b9c9-0afc00e55680` | `Profile 14` | chain Q15–Q17 (Geometry_Engine). |
| `z/bridge-cdp-z_continue.ts` | `https://chat.z.ai/c/d63fd4ea-d38f-499b-a2b4-96e92e134186` | `Profile 14` | (cek live bila perlu). |
| `claude/bridge-cdp-claude_continue.ts` | (lihat default di file transport) | `Profile 14` | isi saat diketahui. |
| `gemini/bridge-cdp-gemini_continue.ts` | `https://gemini.google.com/app/993698fe8a26cae6` | `Profile 2` | chain Gemini (Geometry_Engine). DEFAULT profil Gemini = Profile 2. |
| `gemini/bridge-cdp-gemini_new.ts` | `https://gemini.google.com/app` (homepage) | `Profile 2` | task baru / Vision Gemini. |
| `*_new.ts` (gpt/claude/z) | homepage vendor (chat baru) | `Profile 14` | default. |
| `*_new.ts` (gemini) | homepage Gemini (chat baru) | `Profile 2` | default Gemini. |

> Bila MASTER bilang "jalankan di profil lain", set env `BRIDGE_PROFILE=<Profil>` DAN
> pastikan URL/akun sesuai. Transport menulis `profile` ke `.log`.

---

## 3. Log terkait (field `profile` wajib ada)

| Log file | Transport | Field profil |
|---|---|---|
| `web-bridge-gpt.log` | `gpt/bridge-cdp-gpt_new.ts` | `profile` (sudah ada) |
| `web-bridge-claude.log` | `claude/bridge-cdp-claude_new.ts` | `profile` (wajib ada) |
| `web-bridge-z.log` | `z/bridge-cdp-z_new.ts` | `profile` (sudah ada) |
| `web-bridge-gemini.log` | `gemini/bridge-cdp-gemini_new.ts` | `profile` (sudah ada, = `Profile 2`) |
| `_continue.ts` | (gpt/claude/z) | **BELUM** tulis `.log` → lihat §4 |

---

## 4. TODO (bila MASTER minta): `_continue.ts` belum menulis `.log`

`gpt/claude/z/bridge-cdp-*_continue.ts` saat ini hanya `console.log` (tidak append ke
`web-bridge-<remote>.log`). Agar profil tercatat konsisten, tambahkan `logConversation`
berfield `profile` ke tiap `*_continue.ts` (sama pola seperti `*_new.ts`). Sampai itu
dilakukan, profil continue tercatat hanya di console + di default-URL §2 di atas.
