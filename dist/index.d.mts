import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
type ModalAnimation = "scale" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "none";
type ModalVariant = "default" | "danger" | "success" | "info";
interface ModalProps {
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
declare function Modal({ open, onOpenChange, size, animation, showCloseIcon, className, disableOutsideClose, disableEscClose, children, variant, }: ModalProps): React.ReactPortal | null;
declare function ModalHeader({ className, children, }: {
    className?: string;
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function ModalBody({ className, children, }: {
    className?: string;
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function ModalFooter({ className, children, }: {
    className?: string;
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useModalClose(): () => void;

export { Modal, type ModalAnimation, ModalBody, ModalFooter, ModalHeader, type ModalProps, type ModalSize, type ModalVariant, useModalClose };
