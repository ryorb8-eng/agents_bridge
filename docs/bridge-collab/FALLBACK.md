# Fallback & Recovery (point G)

When a vendor fails, the collaboration must **degrade gracefully** — never silently break
the task, never loop forever. The engine applies a fixed recovery ladder.

## Failure modes

| Mode | Signal | Detection |
|---|---|---|
| **Timeout** | no stable reply within watchdog | bridge-protocol wait; `webchain-*` ≥2× → STUCK |
| **Rate limit** | "too many requests" / 429-style | remote reply text or transport error |
| **Context overflow** | reply truncated / "context length" error | CEP L6 refused; remote asks to resend |
| **Misread context** | answer is off-topic / contradicts given facts | VERIFY flags low confidence / contradiction |
| **Bridge down** | PHASE 0 fails (driver/CDP/snapshot) | AGENTS.md readiness gate |

## Recovery ladder (ordered)

```
FAIL
 │
 ▼ (1) RETRY ONCE         ← transient (timeout/blip). Same vendor, same session.
 │        success → continue
 │        fail ↓
 ▼ (2) SWITCH VENDOR      ← pick next available from VENDOR_REGISTRY (different key).
 │        success → continue; record method failure for the failed vendor
 │        fail ↓
 ▼ (3) DEGRADE LOCAL      ← no vendor available. Handle with local research/subagent.
 │        record: "collaboration unavailable"
 │        if task NEEDS external (K still <95% and local exhausted):
 ▼ (4) ESCALATE HUMAN     ← ASK USER with a written gap report (KNOWLEDGE_GAP.md).
```

## Per-mode handling

### Timeout
- Retry once (same session). If `webchain-*` ≥2× timeout → **STUCK** (existing rule), do
  not spin. Switch vendor or degrade.

### Rate limit
- Do **not** hammer. Switch to another vendor from the registry (different account/profile
  = different limit, per `list_profil_vendor.md`). Record a method penalty (rate-limited
  vendor drops in score). If all rate-limited → degrade local + flag for human later.

### Context overflow
- The remote asked for context it already should have → it lost state. Re-send via DCP
  `Previous Session / Reference / Continue From` (resume, minimal). If it still overflows,
  drop to CEP L3–L4 only (task + relevant files, no full snippets) and ask a narrower
  question.

### Misread context
- VERIFY catches it (low confidence / contradiction). Do **not** bank the answer. Re-send a
  tighter CEP package (one question, more relevant files) or switch vendor for an
  independent take. If ≥2 vendors misread → the *local* context package is the problem →
  fix the package, not the vendors.

### Bridge down (PHASE 0 fail)
- STOP bridging. Report the exact failure (AGENTS.md). Degrade local. Do not fake a
  turn. The lifecycle's "CONTINUE TASK" returns with "collaboration skipped" so the caller
  knows K may still be low.

## Loop caps (no infinite recovery)

| Loop | Cap | After cap |
|---|---|---|
| Retry (same vendor) | 1 | switch vendor |
| Switch vendor | until registry exhausted | degrade local |
| Degrade → escalate | 1 | ask user (human is terminal) |

## What fallback must NEVER do

- Loop forever retrying a dead vendor.
- Spend the user's quota on repeated failures.
- Act on a misread/low-confidence remote reply (ADR-0004 + VERIFY gate).
- Skip CONTINUE TASK — the caller must always get a result (even "skipped, K low").
