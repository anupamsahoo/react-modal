// src/modal.tsx
import * as React from "react";
import { createPortal } from "react-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var modalStack = [];
var nextZIndexBase = 50;
var ModalContext = React.createContext(null);
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
var sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[min(100vw-2rem,80rem)]"
};
var animationClasses = {
  scale: "animate-modal-scale-in",
  "slide-up": "animate-modal-slide-up",
  "slide-down": "animate-modal-slide-down",
  "slide-left": "animate-modal-slide-left",
  "slide-right": "animate-modal-slide-right",
  none: ""
};
var variantContainerClasses = {
  default: "",
  danger: "border-red-500/60",
  success: "border-emerald-500/60",
  info: "border-sky-500/60"
};
function Modal({
  open,
  onOpenChange,
  size = "lg",
  animation = "scale",
  showCloseIcon = true,
  className,
  disableOutsideClose,
  disableEscClose,
  children,
  variant = "default"
}) {
  const [mounted, setMounted] = React.useState(false);
  const [zIndex, setZIndex] = React.useState(50);
  const idRef = React.useRef(null);
  React.useEffect(() => {
    if (!idRef.current) {
      if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        idRef.current = `mdl-${crypto.randomUUID()}`;
      } else {
        idRef.current = `mdl-${Math.random().toString(36).slice(2, 9)}`;
      }
    }
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const id = idRef.current;
    if (!id) return;
    if (!modalStack.includes(id)) {
      modalStack.push(id);
      setZIndex(nextZIndexBase);
      nextZIndexBase += 2;
    }
    return () => {
      const idx = modalStack.indexOf(id);
      if (idx > -1) {
        modalStack.splice(idx, 1);
      }
      if (modalStack.length === 0) {
        nextZIndexBase = 50;
      }
    };
  }, [open]);
  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);
  const close = () => onOpenChange(false);
  React.useEffect(() => {
    if (!open || disableEscClose) return;
    const handleEsc = (e) => {
      if (e.key !== "Escape") return;
      const id = idRef.current;
      if (!id) return;
      const topId = modalStack[modalStack.length - 1];
      const isTop = topId === id;
      if (isTop) {
        close();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, disableEscClose, onOpenChange]);
  if (!mounted || !open) return null;
  const handleOverlayClick = () => {
    if (disableOutsideClose) return;
    const id = idRef.current;
    if (!id) return;
    const topId = modalStack[modalStack.length - 1];
    const isTop = topId === id;
    if (isTop) {
      close();
    }
  };
  const content = /* @__PURE__ */ jsx(ModalContext.Provider, { value: { close, variant }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 flex items-center justify-center px-4 py-6",
      style: { zIndex },
      "aria-modal": "true",
      role: "dialog",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 bg-black/45 backdrop-blur-[1px] animate-overlay-fade-in",
            onClick: handleOverlayClick
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "relative z-10 w-full max-h-[85vh] overflow-hidden rounded-2xl border bg-white text-slate-900 shadow-2xl flex flex-col dark:bg-slate-900 dark:text-slate-50",
              sizeClasses[size],
              animationClasses[animation],
              variantContainerClasses[variant],
              className
            ),
            onClick: (e) => e.stopPropagation(),
            children: [
              children,
              showCloseIcon && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-black/10 text-slate-800 hover:bg-black/20 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20",
                  onClick: close,
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsx("span", { className: "text-lg leading-none", children: "\xD7" })
                }
              )
            ]
          }
        )
      ]
    }
  ) });
  return createPortal(content, document.body);
}
export {
  Modal
};
