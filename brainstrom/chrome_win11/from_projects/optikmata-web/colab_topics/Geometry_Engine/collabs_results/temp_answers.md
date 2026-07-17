## C2 — Geometry Engine Panel: tambah Config (DB/Backend/Frontend) seperti contoh TARGET

2026-07-17T20:11:12Z | vendor=gpt profile=14 mode=new
session: https://chatgpt.com/c/6a5a8c3e-d094-83ec-be7e-0458d8bea8dc
title: Geometry Engine Config Proposal | replyChars=7309

---


Proposal Extension: Geometry Engine Config (DB + Backend + Frontend)

Berdasarkan capture panel saat ini, pola yang sudah ada cukup jelas:

Toggle feature sudah persist ke platform_config

Tiap feature memiliki group (Primitive Library, Skeleton Editor, Render Pipeline, dst)

Tidak ada perubahan arsitektur yang diperlukan

Yang kurang adalah Configuration Panel untuk setiap feature seperti panel TARGET (Metadata, Parameter, Action, Preview)

Proposal berikut mempertahankan seluruh arsitektur existing dan hanya melakukan extension.

1. Architecture
Geometry Engine

├── Feature Toggle
│      platform_config
│
├── Config Panel (baru)
│      geometry_config
│          Metadata
│          Editor
│          Render
│          Primitive
│          Export
│
├── Preview
│
└── Save
       ↓
platform_config
geometry_config

Prinsip:

Toggle
    ↓

enabled / disabled

Config
    ↓

JSON Configuration

Preview
    ↓

Live Preview

Action
    ↓

Save

Tidak mengubah flow existing.

2. DB Proposal

Masih memakai platform_config.

Tetapi JSON dipisah per module.

Contoh key:

geometry.metadata
geometry.primitive
geometry.skeleton
geometry.frame
geometry.render
geometry.fx
geometry.export
Contoh schema
SQL
ALTER TABLE platform_config
ADD COLUMN IF NOT EXISTS config_scope text DEFAULT 'geometry';

ALTER TABLE platform_config
ADD COLUMN IF NOT EXISTS config_json jsonb DEFAULT '{}';
Proposal insert
SQL
INSERT INTO platform_config
(
    config_key,
    config_scope,
    enabled,
    config_json
)
VALUES
(
    'geometry.metadata',
    'geometry',
    true,
'{
    "category":"Frame",
    "family":"Default",
    "material":"Acetate",
    "size":52,
    "style":"Classic"
}'
);

Primitive

SQL
INSERT INTO platform_config
VALUES
(
DEFAULT,
'geometry.primitive',
'geometry',
true,
'{
    "circle":true,
    "halfCircle":true,
    "arc":true,
    "bezier":true,
    "outline":true
}'
);

Skeleton

JSON
{
    "snap":true,
    "grid":8,
    "pivot":"center",
    "anchorVisible":true,
    "rotationStep":15
}

Render

JSON
{
    "shadow":false,
    "material":"glass",
    "outline":true,
    "svgPrecision":3,
    "previewScale":1
}

Export

JSON
{
    "svg":true,
    "json":true,
    "compress":false,
    "pretty":true
}
Alternatif (lebih scalable)

Jika config akan semakin besar:

geometry_engine_config

Schema

SQL
CREATE TABLE geometry_engine_config
(
    id uuid primary key,
    section text,
    scope text,
    config jsonb,
    enabled boolean,
    updated_at timestamptz
);

Tetapi saya tetap merekomendasikan platform_config karena sesuai constraint.

3. Backend

Route

GET

/api/admin/geometry/config

Return

TypeScript
type GeometryConfigResponse = {

    metadata: MetadataConfig;

    primitive: PrimitiveConfig;

    skeleton: SkeletonConfig;

    render: RenderConfig;

    frame: FrameConfig;

    fx: FXConfig;

};

Update

POST

/api/admin/geometry/config

Body

TypeScript
{

    section:"primitive",

    value:{...}

}

Signature

TypeScript
export async function getGeometryConfig():

Promise<GeometryConfig>

Update

TypeScript
export async function updateGeometryConfig(

section:string,

config:unknown

)

Validation

Menggunakan Zod

TypeScript
const PrimitiveSchema=z.object({

circle:z.boolean(),

arc:z.boolean(),

outline:z.boolean(),

bezier:z.boolean(),

});

Example Route

TypeScript
export async function GET() {

const data=await loadGeometryConfig();

return Response.json(data);

}

POST

TypeScript
export async function POST(req:Request){

const body=await req.json();

PrimitiveSchema.parse(body.value);

await saveConfig(body);

return Response.json({

success:true

});

}

RLS

Hanya

role='admin'

boleh update.

Role lain:

SELECT only

atau deny.

4. Config Loader

Proposal util

TypeScript
loadGeometryConfig()

Internal

platform_config

↓

group by

↓

geometry.*

↓

JSON

↓

React

Output

TypeScript
{

metadata:{},

primitive:{},

skeleton:{},

render:{},

frame:{},

fx:{}

}
5. React Component
GeometryConfigPanel

│
├── Metadata
├── Anchor
├── Material
├── Border
├── Preview
└── Action

Props

TypeScript
interface Props{

config:GeometryConfig;

onSave():void;

}

Layout

────────────────────────

Metadata

────────────────────────

Name

Category

Family

Style

Material

Size

────────────────────────

Anchor

────────────────────────

Anchor ID

X

Y

Locked

Pivot

────────────────────────

Border

────────────────────────

Outline

Inline

Stroke

Opacity

────────────────────────

Material

────────────────────────

Color

Gradient

Glass

Shadow

────────────────────────

Preview

────────────────────────

SVG Canvas

Zoom

Reset

────────────────────────

Action

────────────────────────

Save

Cancel

Export SVG

Import SVG

────────────────────────

Persis mengikuti pola panel TARGET.

6. Metadata Section
TypeScript
<Card>

<TextField

label="Frame Name"

/>

<Select

label="Category"

/>

<Select

label="Material"

/>

<Select

label="Family"

/>

<NumberInput

label="Lens Width"

/>

</Card>
7. Anchor Section
TypeScript
<Card>

Number X

Number Y

Rotation

Pivot

Locked

Snap

</Card>
8. Border Section
TypeScript
Outline

Inline

Stroke Width

Stroke Color

Opacity

9. Material Section
Primary Color

Secondary

Gradient

Glass Effect

Shadow

Reflection

10. Preview

Mirip panel kanan TARGET.

+----------------------+

Canvas

+

Zoom +

Zoom -

Reset

Fit

Center

Grid

+

+----------------------+

Component

TypeScript
<GeometryPreview

config={config}

/>
11. Action Footer
SAVE

CANCEL

EXPORT SVG

IMPORT SVG

COPY JSON

RESET DEFAULT

12. React Tree
GeometryEnginePage

│

├── TogglePanel

│

├── GeometryConfigPanel

│      ├── MetadataCard
│      ├── AnchorCard
│      ├── BorderCard
│      ├── MaterialCard
│      ├── PreviewCard
│      └── ActionCard

│

└── SaveProvider
13. Config JSON Example
JSON
{
  "metadata": {
    "name": "Classic Frame",
    "category": "Frame",
    "family": "Wayfarer",
    "material": "Acetate",
    "style": "Modern",
    "size": 52
  },
  "anchor": {
    "pivot": "center",
    "x": 0,
    "y": 0,
    "rotation": 0,
    "locked": false,
    "snap": true
  },
  "border": {
    "outline": true,
    "inline": false,
    "stroke": 2,
    "opacity": 1
  },
  "material": {
    "primary": "#111111",
    "secondary": "#444444",
    "gradient": false,
    "glass": true,
    "shadow": true
  },
  "preview": {
    "zoom": 1,
    "grid": true,
    "fit": true
  },
  "export": {
    "svg": true,
    "json": true,
    "compress": false
  }
}
14. Asumsi

Karena capture hanya memperlihatkan daftar feature dan toggle, beberapa detail panel kanan pada TARGET tidak terlihat langsung di halaman Geometry Engine saat ini. Proposal ini mengasumsikan:

Setiap feature group (Primitive Library, Skeleton Editor, Frame Architecture, Render Pipeline, FX, Base Render Model) dapat memiliki satu objek konfigurasi JSON masing-masing.

Penyimpanan tetap menggunakan pola platform_config yang sudah dipakai toggle LIVE, dengan config_json sebagai payload terstruktur.

Preview menggunakan komponen SVG/canvas yang sudah atau akan dipakai oleh Geometry Engine, sehingga panel konfigurasi hanya mengubah state dan tidak mengubah pipeline rendering yang ada.

API baru hanya menjadi wrapper baca/tulis konfigurasi dan tidak menggantikan mekanisme feature flag yang sudah berjalan.

--- END C2 ---

