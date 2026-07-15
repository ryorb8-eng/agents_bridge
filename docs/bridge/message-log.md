# Bridge Message Log

Session: <chat-url or label>
Remote AI: <e.g. ChatGPT @ chatgpt.com/c/6a55d793-...>
CDP endpoint: <host:port> (user-supplied)
Started: <YYYY-MM-DD HH:MM>

## Envelope format

```
SEQ | SENDER | TIMESTAMP | INTENT | PAYLOAD | OBSERVED
```

- `SEQ`        — monotonically increasing turn number
- `SENDER`     — `LOCAL` (this CLI) or `REMOTE` (the browser AI)
- `TIMESTAMP`  — local time of the action
- `INTENT`     — one short phrase describing the purpose of the turn
- `PAYLOAD`    — the verbatim message text (LOCAL) or verbatim reply (REMOTE)
- `OBSERVED`   — what the bridge saw after the turn (reply received / still generating /
                error / none)

---

## Transcript

```
0001 | LOCAL  | 2026-07-15 16:05 | greet        | "Hi, I'm the local AI bridging to you. Confirm you can see this." | reply received
0002 | REMOTE | 2026-07-15 16:05 | acknowledge  | "Yes, I can see your message. What do you need?" | none
```
