# @anupamsahoo/react-modal

A clean, modern and fully reusable **React modal component** built for **Tailwind CSS v4**, with support for stacked modals, variants and scrollable bodies.

- Stacked modals (only the top layer reacts to ESC / overlay)
- Variants: `default`, `danger`, `success`, `info`
- Scrollable body with fixed header & footer
- Compound API: `<Modal> <ModalHeader> <ModalBody> <ModalFooter>`
- No provider or wrapper required
- Works with Next.js, Vite, CRA, Inertia, etc.

---

## Installation

```bash
npm install @anupamsahoo/react-modal
# or
yarn add @anupamsahoo/react-modal
# or
pnpm add @anupamsahoo/react-modal
```

## Tailwind Setup (IMPORTANT)

This package is built for Tailwind CSS v4 and ships its own animation styles.

In your main CSS file (for example: `src/index.css`, `app.css`):

```
@import "tailwindcss";

/* Required for react-modal animations */
@import "@anupamsahoo/react-modal/styles.css";
```

- No manual keyframes required
- No Tailwind config changes
- Plug & play

## Basic Usage

```js
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@anupamsahoo/react-modal";

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

### Requirements

- React 18+
- Tailwind CSS v4
- Works with:
  - Next.js
  - Vite
  - Laravel + Inertia
  - Any React app

### License

MIT — Free for personal and commercial use

© Anupam Sahoo
