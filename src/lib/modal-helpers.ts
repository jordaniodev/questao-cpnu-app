'use client'
import NiceModal from "@ebay/nice-modal-react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const openModal = (id: string, props?: any) => {
  return NiceModal.show(id, props);
};

export const closeModal = (id: string) => {
  return NiceModal.hide(id);
};