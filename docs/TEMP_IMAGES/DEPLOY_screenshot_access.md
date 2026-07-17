# DEPLOY — limited screenshot-sync access on Win11

This file tells MASTER exactly what to paste into
`C:\Users\ryoro\.ssh\authorized_keys` on the Win11 box, and the helper script to drop
in `C:\bridge\`. The Linux side (`bridge-image-analyst` / `bridge-image-publish` skills,
the dedicated key, the fetch script) is ALREADY built in the repo — only the Win11 side
is manual, because the existing scoped SSH key is locked to the gatekeeper
(`command="...chrome-debug-gate.ps1",restrict`) and CANNOT edit `authorized_keys` itself.

> **Subfolders:** the scoped key stays `restrict`ed and only runs `screenshot-sync.ps1`
> (it does NOT gate per-argument). Recursive listing was previously disabled *inside* the
> script (`Get-ChildItem -File`, no `-Recurse`). The script in this repo has been updated
> to walk subfolders — every resolved path is STILL confined to `Screenshots` by the
> `Assert-SafeChild` / `Resolve-SafeRel` guard (a symlinked subfolder that escapes the
> folder is skipped, never read). **`authorized_keys` needs NO change** — paste the
> updated `screenshot-sync.ps1` and subfolder `list`/`get-all`/`list-sub` work.

---

## Step 1 — append this line to `C:\Users\ryoro\.ssh\authorized_keys`

> Append (do NOT replace) the existing line. Keep the `chrome-debug-gate.ps1` line intact.

```
command="powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\bridge\screenshot-sync.ps1",restrict,from="192.168.1.3",no-pty,no-agent-forwarding,no-X11-forwarding,no-port-forwarding ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFNEc30clKdKD7JaHmDPRKM5SDee6DK/P70JSVyaDbRL screenshot-sync@linux
```

What each restriction does:

| token | effect |
|---|---|
| `command="...screenshot-sync.ps1"` | the key runs **only** this script; any command you pass (`ssh screenshot <n>`) is handed to the script as its argument. No shell. |
| `restrict` | disables port/X11/agent forwarding + PTY + shell. Superset of the others below; listed explicitly for clarity. |
| `from="192.168.1.3"` | only the Linux box's LAN IP may use this key (matches the existing rule's `from=`). |
| `no-pty` / `no-agent-forwarding` / `no-X11-forwarding` / `no-port-forwarding` | belt-and-suspenders; `restrict` already covers these. |

**Least privilege by design:** the public key above
(`id_ed25519_bridge_screenshots.pub`) is a **dedicated** key, NOT the gatekeeper key.
Compromise of one does not grant the other.

---

## Step 2 — drop `C:\bridge\screenshot-sync.ps1` (filtering helper)

Save the script from `docs/TEMP_IMAGES/screenshot-sync.ps1` (in this repo) to
`C:\bridge\screenshot-sync.ps1` on Win11. It is a **read-only** filter:

- Only copies files from `C:\Users\ryoro\Pictures\Screenshots\`.
- Rejects any path outside that folder (symlink/relative/absolute escapes).
- **Never edits or deletes** the source. (To delete from Win11 you would have to do it
  yourself — the script has no `Remove-Item`.)
- Filenames are whitelisted to the Screenshots folder's real files; no wild interpolation
  into a shell.

Usage the Linux side calls:

| action | what it returns |
|---|---|
| `ssh screenshot list` | newline-separated filenames under Screenshots (**recursive** — nested paths like `TARGET\foo.png`) |
| `ssh screenshot list-sub <sub>` | filenames inside ONE subfolder (e.g. `ssh screenshot list-sub TARGET`) |
| `ssh screenshot get <filename>` | **Base64** of that one file on stdout (name may include a subfolder, e.g. `TARGET\foo.png`); Linux decodes it |
| `ssh screenshot get-all` | Base64 of every file (**recursive**, nested paths preserved), separated by a sentinel line `::FILE:: <name>` |
| `ssh screenshot help` | usage |

> Nested files are emitted with their relative path from `Screenshots` (e.g.
> `TARGET\foo.png`); the Linux side converts `\`→`/` and writes a REAL nested
> folder, preserving the subfolder layers. Read-only: no write/delete on Win11.

---

## Step 3 — verify (from Linux)

```bash
ssh screenshot list            # now lists ALL PNGs, including subfolders
ssh screenshot list-sub TARGET # list just TARGET\
ssh screenshot get "TARGET\foo.png" | base64 -d > /tmp/test.png
file /tmp/test.png             # PNG image data
```

If `ssh screenshot ...` says "command not found" / "not recognized", the key's
`command=` is not being honoured — re-check Step 1 (the line must be a single unbroken
line in `authorized_keys`, and `C:\bridge\screenshot-sync.ps1` must exist).

---

## Rollback

To revoke: delete the appended line from `authorized_keys`. No other change needed.
