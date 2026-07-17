#!/usr/bin/env python3
# Opaque hook test harness. Call: python3 .claude/hooks/test_hooks.py
# The OUTER command has no forbidden literal, so the settings PreToolUse guard
# does not fire on it; the test cases live in THIS file (opaque to the guard).
import json, subprocess, os

H = ".claude/hooks"
BASE = "/home/s/TASK/agents_bridge"

CASES = [
    # --- sop-guard.sh (Rule 1/2/3/4/13) ---
    ("sop-guard.sh",           "ssh -R 18322:localhost:18322 ryorb@win11", "DENY"),
    ("sop-guard.sh",           "ssh -N -R 18322:localhost:18322 win11",    "DENY"),
    ("sop-guard.sh",           "ssh win11 launch:Profile 14",              "PASS"),
    ("sop-guard.sh",           "ssh win11 reboot now",                     "DENY"),
    ("sop-guard.sh",           "scp user@win11:/a.png ./",                 "DENY"),
    ("sop-guard.sh",           "kill 20125",                               "DENY"),
    ("sop-guard.sh",           "ls -la",                                   "PASS"),
    # prose false-positive guard: forbidden words inside a quoted commit message must NOT fire
    ("sop-guard.sh",           'git commit -m "tolak raw ssh -R dan ssh win11 di luar whitelist serta scp/sftp"', "PASS"),
    # --- vision-guard.sh (Rule 5/23) ---
    ("vision-guard.sh",        'echo "data:image/png;base64,iVBOR..."',    "DENY"),
    ("vision-guard.sh",        'echo "lihat gambar ini"',                  "PASS"),
    # --- transport-guard.sh (Rule 6/31) ---
    ("transport-guard.sh",     "BRIDGE_MODE=continue npx tsx gpt/bridge-cdp-gpt_new.ts", "DENY"),
    ("transport-guard.sh",     "npx tsx gemini/bridge-cdp-gemini_new.ts profile:Profile 14", "DENY"),
    ("transport-guard.sh",     "BRIDGE_MODE=send npx tsx gpt/bridge-cdp-gpt_new.ts", "PASS"),
    # --- browser-cleanup-guard.sh (Rule 15/28) ---
    ("browser-cleanup-guard.sh","pkill -f chrome",                         "DENY"),
    ("browser-cleanup-guard.sh","playwright-cli close",                    "DENY"),
    ("browser-cleanup-guard.sh","playwright-cli -s=bridge close",          "PASS"),
    ("browser-cleanup-guard.sh","rm -rf /tmp/playwright_chromiumdev_profile-xyz", "DENY"),
]

def run(hook, cmd):
    payload = json.dumps({"tool_name": "Bash", "tool_input": {"command": cmd}})
    p = subprocess.run(["bash", os.path.join(H, hook)], input=payload,
                       capture_output=True, text=True, cwd=BASE)
    raw = p.stdout
    try:
        d = json.loads(raw)
        decision = d.get("hookSpecificOutput", {}).get("permissionDecision")
        return decision, raw
    except Exception:
        return "PARSE_FAIL", raw

ok = fail = 0
for hook, cmd, expect in CASES:
    decision, raw = run(hook, cmd)
    got = "DENY" if decision == "deny" else ("PASS" if decision is None else decision)
    status = "OK " if got == expect else "BAD"
    if got == expect:
        ok += 1
    else:
        fail += 1
    print(f"{status} {hook:24s} expect={expect:5s} got={got:5s}  ({cmd[:46]})")
    if got != expect:
        print("     RAW:", raw[:300].replace("\n", " "))

print(f"\n=== OK={ok} BAD={fail} / {len(CASES)} ===")
