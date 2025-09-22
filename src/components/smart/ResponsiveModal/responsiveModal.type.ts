import type { NiceModalHandler } from "@ebay/nice-modal-react";
import type { ReactNode } from "react";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ResponsiveModalProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  hideCloseButton?: boolean;
  blockClose?: boolean;
  onOpenChange?: (open: boolean, modal: NiceModalHandler) => void;
  onClose?: () => void;
  contentClassName?: string;
  headerClassName?: string;
}

export interface ResponsiveModalActionsProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmType?: "button" | "submit";
  confirmIcon?: ReactNode;
  confirmDisabled?: boolean;
  reverseOnMobile?: boolean;
  confirmIsDestructive?: boolean;
  disabled?: boolean;
  footerClassName?: string;
}