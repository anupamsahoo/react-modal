// src/modal.tsx
"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import "./styles.css";

/* -------------------- Global stack (for stacked modals) -------------------- */

const modalStack: string[] = [];
let nextZIndexBase = 50;

/* -------------------- Types -------------------- */

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
export type ModalAnimation =
  | "scale"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "none";

export type ModalVariant = "default" | "danger" | "success" | "info";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: ModalSize;
  animation?: ModalAnimation;
  showCloseIcon?: boolean;
  className?: string;
  disableOutsideClose?: boolean;
  disableEscClose?: boolean;
  /** Theming: border + header styling */
  variant?: ModalVariant;
  children: React.ReactNode;
}

/* -------------------- Context -------------------- */

const ModalContext = React.createContext<{
  close: () => void;
  variant: ModalVariant;
} | null>(null);

function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Modal.* components must be used inside <Modal>");
  }
  return context;
}

/* -------------------- Utility -------------------- */

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/* -------------------- Styles -------------------- */

const sizeClasses: Record<ModalSize, string> = {
  sm: "am-modal-size-sm",
  md: "am-modal-size-md",
  lg: "am-modal-size-lg",
  xl: "am-modal-size-xl",
  full: "am-modal-size-full",
};

const animationClasses: Record<ModalAnimation, string> = {
  scale: "am-anim-scale",
  "slide-up": "am-anim-slide-up",
  "slide-down": "am-anim-slide-down",
  "slide-left": "am-anim-slide-left",
  "slide-right": "am-anim-slide-right",
  none: "",
};

const variantContainerClasses: Record<ModalVariant, string> = {
  default: "am-modal-variant-default",
  danger: "am-modal-variant-danger",
  success: "am-modal-variant-success",
  info: "am-modal-variant-info",
};

const variantHeaderClasses: Record<ModalVariant, string> = {
  default: "am-modal-header-variant-default",
  danger: "am-modal-header-variant-danger",
  success: "am-modal-header-variant-success",
  info: "am-modal-header-variant-info",
};

/* -------------------- Main Modal -------------------- */

export function Modal({
  open,
  onOpenChange,
  size = "lg",
  animation = "scale",
  showCloseIcon = true,
  className,
  disableOutsideClose,
  disableEscClose,
  children,
  variant = "default",
}: ModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const [zIndex, setZIndex] = React.useState<number>(50);

  // Unique id per modal instance
  const idRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!idRef.current) {
      if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        idRef.current = `mdl-${crypto.randomUUID()}`;
      } else {
        idRef.current = `mdl-${Math.random().toString(36).slice(2, 9)}`;
      }
    }
  }, []);

  // Register/unregister in global stack for stacking support
  React.useEffect(() => {
    if (!open) return;

    const id = idRef.current;
    if (!id) return;

    if (!modalStack.includes(id)) {
      modalStack.push(id);

      // Give this modal a unique z-index based on open order
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

  // Lock body scroll when any modal is open
  React.useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const close = () => onOpenChange(false);

  // ESC to close – only top modal reacts
  React.useEffect(() => {
    if (!open || disableEscClose) return;

    const handleEsc = (e: KeyboardEvent) => {
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

  const content = (
    <ModalContext.Provider value={{ close, variant }}>
      <div
        className="am-modal-root"
        style={{ zIndex }}
        aria-modal="true"
        role="dialog"
      >
        {/* Overlay */}
        <div className="am-modal-overlay" onClick={handleOverlayClick} />

        {/* Modal box */}
        <div
          className={cn(
            "am-modal-box",
            sizeClasses[size],
            animationClasses[animation],
            variantContainerClasses[variant],
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}

          {/* Floating Close icon (optional) */}
          {showCloseIcon && (
            <button
              type="button"
              className="am-modal-close-btn"
              onClick={close}
              aria-label="Close"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
          )}
        </div>
      </div>
    </ModalContext.Provider>
  );

  return createPortal(content, document.body);
}

/* -------------------- Sub Components -------------------- */

export function ModalHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { variant } = useModal();

  return (
    <div
      className={cn(
        "am-modal-header",
        variantHeaderClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export function ModalBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("am-modal-body", className)}>{children}</div>;
}

export function ModalFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("am-modal-footer", className)}>{children}</div>;
}

/* Optional hook to close modal from anywhere inside */
export function useModalClose() {
  const { close } = useModal();
  return close;
}
