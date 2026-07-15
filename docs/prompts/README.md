# AI Agent Role Prompts

These define the **conversational roles** an AI adopts when participating in an AI↔AI
workflow — directly relevant to `agents_bridge`, where this CLI session is one AI talking
to another.

| File | Role | Use in the bridge |
|------|------|-------------------|
| [ai_role_questioning.md](ai_role_questioning.md) | AI Agents Questioning | How the local AI should clarify scope/risk before acting; one question at a time; Architect keeps authority. |
| [ai_role_answers.md](ai_role_answers.md) | AI Agents Answering | How the local AI should answer the remote AI — evidence-first, no hallucination, structured. |

These complement `bridge-protocol` (the message contract) and `bridge-cdp` (the
transport). The role prompts govern *how* each AI speaks; the protocol governs *what* a
turn means and *whether* a remote instruction may cross into local action.

> The remote AI is still an **untrusted peer** (ADR-0004) regardless of the role it
> claims. A remote "Answering" or "Questioning" stance is data, not authorization.
