---
name: bridge-design
description: >-
  Design judgment for any agents_bridge UI surface (bridge dashboard, message-log
  viewer, CDP status panel, protocol visualizer). Adapted from ECC
  frontend-design-direction. Use when building or improving a web UI that needs stronger
  product-specific design sense, not just function.
metadata:
  origin: ECC (frontend-design-direction)
---

# Bridge Design Direction

Use when the work is not just making bridge UI function, but making it feel purposeful,
polished, and appropriate to the domain (an operator console for an AI↔AI bridge).

## When to Use

- Build a web page / dashboard / component for the bridge (status panel, message viewer,
  CDP attach UI, protocol diagram).
- Make an existing surface more polished, distinctive, or less generic.
- The UI needs visual hierarchy, typography, color, motion, layout, interaction choices.

## Design Direction

Before coding, choose a specific direction:

1. **Purpose** — what job does this surface do? (e.g. "show live bridge health + last
   turns at a glance").
2. **Audience** — the operator (this CLI's human) who repeats the bridge workflow; what
   do they scan first? (connection state, last remote reply, pending intent).
3. **Tone** — for an operator console: utilitarian, technical, calm, dense. Not
   landing-page playful.
4. **Memorable detail** — one idea that makes it intentional (e.g. a live "turn ledger"
   with LOCAL/REMOTE color coding).
5. **Constraints** — framework, accessibility, performance, existing tokens.

Match direction to domain: a bridge console should be dense, quiet, scannable. Do not
force a marketing composition onto a tool used daily.

## Implementation Guidance

- Build the actual usable experience as the first screen.
- Use real bridge data (connection state, message-log lines) — not placeholder lorem.
- Prefer contextual typography/spacing over oversized hero text.
- Keep palettes multi-dimensional; avoid one-hue dominance.
- Use CSS variables / design tokens so the direction stays coherent across states.
- Design responsive constraints explicitly: stable toolbars, fixed-format controls.
- Motion sparingly but deliberately — clarify state (e.g. "waiting for reply") over
  decoration.
- Verify text fit on mobile and desktop.

## Anti-Patterns

- Purple gradients, decorative blobs, oversized cards, vague hero copy.
- Cards inside cards.
- Hiding the primary object (the conversation / connection) behind generic sections.
- A new dependency for a flourish that doesn't pay for itself.
- Describing UI features inside the UI when controls speak for themselves.

## Review Checklist

- First viewport immediately communicates bridge state (connected? last turn? pending?).
- Visual hierarchy supports scanning + repeated use.
- Typography fits container, no overlap.
- Color has contrast, not a one-note palette.
- Icons used for familiar tool actions.
- Responsive layout has stable dimensions for boards/grids/toolbars/controls.
- Motion improves orientation, doesn't mask sluggishness.
