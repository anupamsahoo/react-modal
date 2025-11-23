"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Modal: () => Modal
});
module.exports = __toCommonJS(index_exports);

// src/modal.tsx
var React = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_jsx_runtime = require("react/jsx-runtime");
var modalStack = [];
var nextZIndexBase = 50;
var ModalContext = React.createContext(null);
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
var sizeClasses = {
  sm: "am-modal-size-sm",
  md: "am-modal-size-md",
  lg: "am-modal-size-lg",
  xl: "am-modal-size-xl",
  full: "am-modal-size-full"
};
var animationClasses = {
  scale: "am-anim-scale",
  "slide-up": "am-anim-slide-up",
  "slide-down": "am-anim-slide-down",
  "slide-left": "am-anim-slide-left",
  "slide-right": "am-anim-slide-right",
  none: ""
};
var variantContainerClasses = {
  default: "am-modal-variant-default",
  danger: "am-modal-variant-danger",
  success: "am-modal-variant-success",
  info: "am-modal-variant-info"
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
  const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalContext.Provider, { value: { close, variant }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "am-modal-root",
      style: { zIndex },
      "aria-modal": "true",
      role: "dialog",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "am-modal-overlay", onClick: handleOverlayClick }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: cn(
              "am-modal-box",
              sizeClasses[size],
              animationClasses[animation],
              variantContainerClasses[variant],
              className
            ),
            onClick: (e) => e.stopPropagation(),
            children: [
              children,
              showCloseIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "am-modal-close-btn",
                  onClick: close,
                  "aria-label": "Close",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-lg leading-none", children: "\xD7" })
                }
              )
            ]
          }
        )
      ]
    }
  ) });
  return (0, import_react_dom.createPortal)(content, document.body);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Modal
});
