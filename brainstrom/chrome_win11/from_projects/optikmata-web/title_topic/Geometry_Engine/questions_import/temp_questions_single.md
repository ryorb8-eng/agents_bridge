## Q7 — Temple flag no-op + parity violation (D-6/D-7)
`geometry_engine_temple_enabled` HANYA swap direct-generator ↔ compiled-centerline,
keduanya panggil `generateTempleArmD()` → geometri bit-identik → toggle
admin "Enable Temple" **tak berdampak visual** (`glassesLayout.tsx:275-276,548-570`).
Lebih parah: temple **selalu render** (component di-push unconditional, `:794-806`),
melanggar invariant "default OFF ⇒ byte-identik legacy" (`:200-201`).

**Q7a.** Apakah intended temple-toggle jadi no-op? Jika ya, label "LIVE" di admin
(`geometry-engine/page.tsx:96`) = misleading — harusnya ganti label?
**Q7b.** Bagaimana caranya beri TRUE show/hide gate (prop `showTemple` / flag
`temple_enabled` independen dr compiler) sehingga toggle berdampak nyata TANPA
mengubah parity legacy-path?