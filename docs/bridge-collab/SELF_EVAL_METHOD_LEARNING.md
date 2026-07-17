# Self-Evaluation & Method Learning (points I & J)

After every bridge collaboration, the engine evaluates the exchange (I) and updates a
rolling score per method (J). This is what makes collaboration **adaptive** rather than
hardcoded.

## I — Self Evaluation (post-bridge questions)

The engine answers, for the calling agent's log:

| Question | Why |
|---|---|
| Was the context **too large**? | If yes → tighten CEP assembly next time (stay at L1–L4). |
| Were **tokens wasted**? | If yes → shorter deltas, narrower questions, fewer parts. |
| Was the vendor **actually helpful**? | If no → penalty to that method's score. |
| Is there **new knowledge**? | If yes → it should have landed in `bank_knowledges` (≥70%). |
| Was the result **redundant**? | If yes → the bridge was unnecessary; lower future "need" for this type. |
| Should method **priority** change? | Feeds J. |

Output: a one-block `COLLAB-EVAL` note appended to the task/message log:

```
COLLAB-EVAL
  vendor:     <key>
  need_type:  <type>
  ctx_tokens: <sent>
  helpful:    yes|no
  new_knowledge: yes|no
  redundant:  yes|no
  note:       <one line>
```

## J — Method Learning (rolling score, never hardcoded)

Each **method** = `(vendor key, need_type, strategy)`. A method carries:

| Field | Meaning |
|---|---|
| `success` | count of helpful, non-redundant, banked results |
| `failure` | count of unhelpful / misread / rate-limited |
| `avg_tokens` | mean tokens sent per exchange |
| `avg_time` | mean turn time (send→verified) |
| `confidence` | mean verification confidence of results banked |

### Update rule (after each collaboration)

```
method.success   += 1   if helpful && new_knowledge && !redundant
method.failure   += 1   if !helpful || misread || rate_limited
method.avg_tokens = EMA(method.avg_tokens, ctx_tokens)
method.avg_time   = EMA(method.avg_time, turn_time)
method.confidence = EMA(method.confidence, verify_conf)
```

### Promotion / demotion (adaptive)

- A method with `success/(success+failure) > 0.7` and lower `avg_tokens` than peers →
  **promoted**: selected earlier by `VENDOR_REGISTRY.select_vendor`.
- A method with rising `failure` (esp. rate-limit/misread) → **demoted**: dropped in rank,
  eventually skipped until its score recovers.
- A newly added vendor starts with neutral scores and is tried once (exploration), then
  ranked by outcome. **No hardcoded ranking.**

### Why this satisfies "Jangan hardcoded"

- The engine does **not** contain `prefer gpt for code` style rules.
- Selection is driven by **observed** `success/failure/tokens/time/confidence`.
- A better method naturally rises; an incumbent can be dethroned without code change.
- Exploration (try the new/untried method occasionally) prevents the system from
  permanently ignoring a vendor it never scored.

## Storage

- Scores live **per topic/instance** and are **persisted by the caller** (the agent that
  invoked `bridge-collab`), not by the capability layer. Concrete pins:
  - **Instance workspace:** `brainstrom/<vendor-or-topic>/<topic>/method_scores.md`
    (create if absent; append per method, never rewrite wholesale).
  - **Cross-session recall:** Claude Code memory at
    `~/.claude/projects/<encoded-cwd>/memory/` (one `method-scores.md` per topic) — mirrors
    `knowledge-ops` Layer 2.
  - `<encoded-cwd>` = the cwd with all `/` → `-` (per autochain §5).
- Method scores are **inputs** to `VENDOR_REGISTRY.select_vendor`, not constants. The
  capability layer reads them; it never stores them — keeping the engine stateless.

## Relationship to CDE

Self-eval "helpful + new knowledge" raises the caller's **K** (Knowledge) confidence —
which is exactly the K-ladder rung 3 outcome. Redundant/!helpful → K does not rise, and
the caller may still need local research or human escalation.
