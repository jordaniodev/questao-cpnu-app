import { Button } from "@/components/ui/button";
import { Dialog, DialogClose,  DialogContent } from "@/components/ui/dialog";
import { Ads } from "@/types/Ads";
import { Question } from "@/types/Question";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";



export const AdsModal = ({ ads, question }: { ads: Ads; question: Question }) => {

    const [timeOutExitModal, setTimeOutExitModal] = useState<number>(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOutExitModal((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <Dialog defaultOpen={true} >
        <DialogContent className="flex flex-col gap-[16px]">
            <DialogTitle className="hidden">Titulo</DialogTitle>
            {ads.logo && <img className="max-w-[120px]" src={ads.logo} alt="" />}
            {ads.head && <h1 className="text-sky-600 text-xl font-extrabold">{ads.head}</h1>}
            <img src={ads.backgroundImage} alt="" />

            {ads.subhead && <p className="text-slate-900 text-xs font-normal font-['Rawline'] leading-none">{ads.subhead}</p>}
            {ads.link && (
                <a href={ads.link} target="_blank" className="w-full">
                    <Button className="w-full bg-emerald-500 ">{ads.cta}</Button>
                </a>
            )}

            {timeOutExitModal !== 0 && <Button  variant={'ghost'}>Pular em {timeOutExitModal}</Button>}
            {timeOutExitModal === 0 && (
                <DialogClose asChild>
                    <Button
                        variant={'ghost'}
                        onClick={() => {
                            window.location.href = `/questao/${question.id}${window.location.search}`;
                        }}
                    >
                        Pular Anuncio
                    </Button>
                </DialogClose>
            )}

        </DialogContent>
    </Dialog>
}