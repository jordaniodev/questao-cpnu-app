
import { useModal } from "@ebay/nice-modal-react";
import clsx from "clsx";

import type {
  ModalSize,
  ResponsiveModalActionsProps,
  ResponsiveModalProps,
} from "./responsiveModal.type";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaContent, CredenzaFooter, CredenzaHeader, CredenzaTitle } from "@/components/ui/credenza";
import { cn } from "@/lib/utils";

const SIZE_CLASS: Record<ModalSize, string> = {
  xs: "!max-w-[360px]",
  sm: "!max-w-[420px]",
  md: "!max-w-[560px]",
  lg: "!max-w-[720px]",
  xl: "!max-w-[920px]",
}; //@todo: define the sizes in the Design System

export const ResponsiveModal = ({
  title,
  children,
  footer,
  size = "sm",
  hideCloseButton,
  blockClose,
  onOpenChange,
  onClose,
  contentClassName,
  headerClassName,
}: ResponsiveModalProps) => {
  const modal = useModal();

  return (
    <Credenza
      open={modal.visible}
      onOpenChange={(open) => {
        if (!open && !blockClose) modal.hide();
        onOpenChange?.(open, modal);
        if (!open && onClose) onClose();
      }}
    >
      <CredenzaContent
        aria-describedby={title ? `Modal ${title}` : undefined}
        className={clsx(
          "gap-0 py-0 rounded-xl pr-6 pt-6 pl-6 pb-10 rounded-b-none md:rounded-b-xl",
          hideCloseButton && "[&>button]:hidden",
          SIZE_CLASS[size],
          contentClassName,
        )}
      >
        {title && (
          <CredenzaHeader className={cn("py-1", headerClassName)}>
            <CredenzaTitle className="text-sm font-bold text-neutral leading-5">
              {title}
            </CredenzaTitle>
          </CredenzaHeader>
        )}

        {children}

        {footer && (
          <CredenzaFooter
            className={clsx(
              "w-full flex items-center gap-4 py-6",
              "flex-col-reverse md:flex-row",
            )}
          >
            {footer}
          </CredenzaFooter>
        )}
      </CredenzaContent>
    </Credenza>
  );
};

export const ResponsiveModalAction = ({
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel = "Confirm",
  confirmType = "button",
  confirmIcon,
  disabled,
  reverseOnMobile = true,
  confirmIsDestructive,
  confirmDisabled,
  footerClassName,
}: ResponsiveModalActionsProps) => {
  return (
    <CredenzaFooter
      className={clsx(
        "w-full flex items-center gap-4 py-6 px-0",
        reverseOnMobile && "flex-col-reverse md:flex-row",
        footerClassName,
      )}
    >
      {cancelLabel && (
        <Button
          type="reset"
          variant="secondary"
          onClick={onCancel}
          className="flex-1 w-full"
        >
          {cancelLabel}
        </Button>
      )}
      <Button
        type={confirmType}
        onClick={onConfirm}
        disabled={confirmDisabled || disabled}
        className="flex-1 w-full"
        variant={confirmIsDestructive ? "destructive" : "default"}
      >
        {confirmIcon && confirmIcon}
        {confirmLabel}
      </Button>
    </CredenzaFooter>
  );
};