'use client'

import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { usePaymentModal } from "./index.hook";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const PaymentModal = () => {
    const { isOpen, closeModal } = usePaymentModal();

    if (!isOpen) return null;
    return (
        <Dialog open={isOpen} onOpenChange={open => { if (!open) closeModal(); }}>
            <DialogContent>
            <DialogTitle className="text-foreground text-xl font-bold leading-7">Responda questões ilimitadas de temas específicos do CPNU</DialogTitle>
            <p className="text-foreground text-sm font-normal">Torne-se PRO para ter acesso a questões de temas específicos do CPNU à sua escolha!</p>
            <div className="mt-[32px] flex flex-col px-4 pt-6 pb-4 relative rounded-2xl outline outline-offset-[-1px] outline-border justify-start items-start gap-4">
                <span className="px-3 py-1.5 mt-[-32px] mx-auto z-1 bg-orange-500 rounded-2xl items-center text-center justify-start text-orange-50 text-[10px] font-bold uppercase leading-[10px]">Preço por tempo limitado!</span>
                <span className="w-full text-center text-foreground text-sm font-bold leading-none">Assinatura com questões ilimitadas até a prova (05/10/2025)</span>
                <div className="p-6 w-full bg-sidebar-accent rounded-lg flex flex-col justify-center items-center gap-2"> 
                    <span className="line-through text-foreground text-sm font-normal leading-none">R$ 29,99 </span>
                    <span className="text-emerald-500 font-bold text-3xl leading-9">R$ 9,97</span>
                </div>
                <a href="https://pay.hotmart.com/R102024553L?off=ean2y8f4" target="_blank" className="w-full">
                    <Button variant="default" className="w-full bg-emerald-500 hover:bg-emerald-500">
                        Assinar agora
                    </Button>
                </a>
            </div>
            </DialogContent>
        </Dialog>
    )
}