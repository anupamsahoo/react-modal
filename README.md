# @anupamsahoo/react-modal

A clean, modern and fully reusable **React modal component** built for **Tailwind CSS v4**, with support for stacked modals, variants and scrollable bodies.

- Stacked modals (only the top layer reacts to ESC / overlay)
- Variants: `default`, `danger`, `success`, `info`
- Scrollable body with fixed header & footer
- Compound API: `<Modal> <ModalHeader> <ModalBody> <ModalFooter>`
- No provider or wrapper required
- Works with Next.js, Vite, CRA, Inertia, etc.

---

---

## [`Demo`](https://anupamsahoo.github.io/react-modal-demo/)

---

## Installation

```bash
npm install @anupamsahoo/react-modal
# or
yarn add @anupamsahoo/react-modal
# or
pnpm add @anupamsahoo/react-modal
```

## Basic Usage

```js
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@anupamsahoo/react-modal";

import "@anupamsahoo/react-modal/styles.css";

export default function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-slate-900 px-3 py-1.5 text-white"
      >
        Open modal
      </button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalHeader>
          <h2 className="text-lg font-semibold">Example modal</h2>
        </ModalHeader>

        <ModalBody>This modal is coming from an npm package 🎉</ModalBody>

        <ModalFooter>
          <button
            className="rounded-md border px-3 py-1.5 text-sm"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

## Variants

Use the `variant` prop to change the appearance:

```js
<Modal
  open={open}
  onOpenChange={setOpen}
  variant="danger" // default | danger | success | info
>
  <ModalHeader>
    <h2 className="text-lg font-semibold">Delete User</h2>
    <p className="text-sm text-muted-foreground">
      This action cannot be undone.
    </p>
  </ModalHeader>

  <ModalBody>Are you sure you want to delete this user?</ModalBody>

  <ModalFooter>
    <button onClick={() => setOpen(false)}>Cancel</button>
    <button className="bg-red-600 px-3 py-1.5 text-white rounded">
      Delete
    </button>
  </ModalFooter>
</Modal>
```

#### Available values:

```bash
"default" | "danger" | "success" | "info"
```

## Modal Sizes

```js
<Modal size="sm" />
<Modal size="md" />
<Modal size="lg" />     // default
<Modal size="xl" />
<Modal size="full" />
```

### Animations

```js
<Modal animation="scale" />       // default
<Modal animation="slide-up" />
<Modal animation="slide-down" />
<Modal animation="slide-left" />
<Modal animation="slide-right" />
<Modal animation="none" />
```

### Scrollable Content

The modal body automatically becomes scrollable when the content is long.

```js
<Modal open={open} onOpenChange={setOpen} size="xl">
  <ModalHeader>
    <h2>Users</h2>
  </ModalHeader>

  <ModalBody>
    {Array.from({ length: 50 }).map((_, i) => (
      <div key={i} className="border-b py-1">
        User {i + 1}
      </div>
    ))}
  </ModalBody>
</Modal>
```

No extra configuration required

### useModalClose() Hook

Close the modal from any component inside:

```js
import { useModalClose } from "@anupamsahoo/react-stacked-modal";

function InnerComponent() {
  const close = useModalClose();

  return (
    <button
      onClick={close}
      className="bg-slate-900 px-3 py-1.5 text-white rounded"
    >
      Close modal
    </button>
  );
}
```

### Stacked Modals (Automatic)

Only the **top modal** reacts to `ESC` and overlay click:

```js
const [firstOpen, setFirstOpen] = React.useState(false);
const [secondOpen, setSecondOpen] = React.useState(false);

<>
  <button onClick={() => setFirstOpen(true)}>Open First</button>

  <Modal open={firstOpen} onOpenChange={setFirstOpen}>
    <ModalHeader>
      <h2>First Modal</h2>
    </ModalHeader>

    <ModalBody>
      <button onClick={() => setSecondOpen(true)}>Open Second Modal</button>
    </ModalBody>
  </Modal>

  <Modal
    open={secondOpen}
    onOpenChange={setSecondOpen}
    size="sm"
    variant="info"
  >
    <ModalHeader>
      <h2>Second Modal (top)</h2>
    </ModalHeader>

    <ModalBody>I am stacked above the first modal.</ModalBody>
  </Modal>
</>;
```

- ESC closes only the top modal
- Overlay closes only the top modal
- Z-index handled automatically

### API

`<Modal />` Props
| Prop | Type | Default | Description |
|----------------------|----------------------------------------|-----------|--------------------------------|
| `open` | `boolean` | required | Controls visibility |
| `onOpenChange` | `(open: boolean) => void` | required | Called when modal should close |
| `size` | `sm` · `md` · `lg` · `xl` · `full` | `lg` | Modal size |
| `animation` | `scale` · `slide-up` · `slide-down` · `slide-left` · `slide-right` · `none` | `scale` | Animation style |
| `variant` | `default` · `danger` · `success` · `info` | `default` | Visual variant |
| `showCloseIcon` | `boolean` | `true` | Show close icon (×) |
| `disableOutsideClose`| `boolean` | `false` | Prevent overlay close |
| `disableEscClose` | `boolean` | `false` | Prevent ESC close |

### Tailwind v4 Setup (RECOMMENDED)

Your modal is framework agnostic and uses CSS variables for colors.
Paste this in `globals.css/app.css` or any root css

#### Light theme (Tailwind default)

```css
:root {
  /* Base colors */
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --border: #e2e8f0;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;

  /* Modal surface + text */
  --am-modal-bg: #ffffff;
  --am-modal-fg: #0f172a;
  --am-modal-border: #e2e8f0;

  /* Header + footer */
  --am-modal-header-bg: transparent;
  --am-modal-header-border: #e2e8f0;
  --am-modal-footer-border: #e2e8f0;

  /* Overlay (40% opacity and blur from component) */
  --am-modal-overlay-bg: rgba(0, 0, 0, 0.4);

  /* Semantic variants */
  --am-modal-danger-border: #ef4444;
  --am-modal-success-border: #22c55e;
  --am-modal-info-border: #0ea5e9;

  /* Close button */
  --am-modal-close-bg: #f1f5f9;
  --am-modal-close-bg-hover: #e2e8f0;
  --am-modal-close-fg: #0f172a;

  /* Radius sync */
  --am-modal-radius: 1rem;
}
```

#### Dark mode

```css
.dark {
  /* Base colors */
  --background: #020617;
  --foreground: #f8fafc;
  --card: #020617;
  --card-foreground: #f8fafc;
  --border: #334155;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;

  /* Modal surface + text */
  --am-modal-bg: #020617;
  --am-modal-fg: #f8fafc;
  --am-modal-border: #334155;

  /* Header + footer */
  --am-modal-header-bg: transparent;
  --am-modal-header-border: #334155;
  --am-modal-footer-border: #334155;

  /* Overlay (40% opacity + dark tone) */
  --am-modal-overlay-bg: rgba(2, 6, 23, 0.4);

  /* Semantic variants */
  --am-modal-danger-border: #f43f5e;
  --am-modal-success-border: #4ade80;
  --am-modal-info-border: #38bdf8;

  /* Close button */
  --am-modal-close-bg: rgba(255, 255, 255, 0.08);
  --am-modal-close-bg-hover: rgba(255, 255, 255, 0.15);
  --am-modal-close-fg: #f8fafc;

  /* Radius sync */
  --am-modal-radius: 1rem;
}
```

### Requirements

- React 18+
- Tailwind CSS v4
- Works with:
  - Next.js
  - Vite
  - Laravel + Inertia
  - Any React app

## Version Updates / Changelog

#### v1.0.0 → v1.0.19 — Internal development builds (not published to npm)

Key work done during internal versions:

- Built core React + Portal modal system
- Added stacking system (top modal only closes)
- Implemented ESC + overlay close handling
- Added scroll lock for <body>
- Created compound components: ModalHeader, ModalBody, ModalFooter
- Added animations: scale, slide-up, slide-down, slide-left, slide-right, none
- Added variants: default, danger, success, info
- Implemented size system: sm | md | lg | xl | full
- Introduced CSS variable theming (--am-modal-\*)
- Removed hard Tailwind color dependency
- Added light & dark mode support
- Added overlay blur + opacity control
- Added floating close button
- Ensured React 18 / 19 compatibility
- Built ESM + CJS with tsup
- Exported dist/ + styles.css
- Tested with Next.js, Inertia, Vite
- Created demo & documentation

### 1.0.20 — Official Public Release

- Official public npm release
- Fully framework-agnostic color system
- Tailwind v4 compatible
- Light & dark theme support
- Overlay blur with 0.4 opacity
- Modal sizes: sm | md | lg | xl | full
- Animations:
  - scale
  - slide-up
  - slide-down
  - slide-left
  - slide-right
  - none
- Variants:
  - default
  - danger
  - success
  - info
- ESC + overlay handling for top modal only
- Scroll lock on <body>
- useModalClose() hook
- Working with:
  - Next.js
  - Inertia
  - Vite

### License

MIT — Free for personal and commercial use

© Anupam Sahoo
