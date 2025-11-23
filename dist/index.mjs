// src/modal.tsx
import * as React from "react";
import { createPortal } from "react-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var modalStack = [];
var nextZIndexBase = 50;
var ModalContext = React.createContext(null);
function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Modal.* components must be used inside <Modal>");
  }
  return context;
}
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
var variantHeaderClasses = {
  default: "am-modal-header-variant-default",
  danger: "am-modal-header-variant-danger",
  success: "am-modal-header-variant-success",
  info: "am-modal-header-variant-info"
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
      className: "am-modal-root",
      style: { zIndex },
      "aria-modal": "true",
      role: "dialog",
      children: [
        /* @__PURE__ */ jsx("div", { className: "am-modal-overlay", onClick: handleOverlayClick }),
        /* @__PURE__ */ jsxs(
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
              showCloseIcon && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "am-modal-close-btn",
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
function ModalHeader({
  className,
  children
}) {
  const { variant } = useModal();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "am-modal-header",
        variantHeaderClasses[variant],
        className
      ),
      children
    }
  );
}
function ModalBody({
  className,
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("am-modal-body", className), children });
}
function ModalFooter({
  className,
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("am-modal-footer", className), children });
}
function useModalClose() {
  const { close } = useModal();
  return close;
}
export {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useModalClose
};
