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

export { Modal, type ModalProps };
