'use client'
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { CountQuestion } from "../CountQuestion/CountQuestion"
import Link from "next/link"
import { useAuthModal } from "@/app/(components)/AuthModal/index.hook"
import { MenuBar } from "../MenuBar/MenuBar"
import Image from "next/image"
import { ThemeToggle } from "../ThemeToggle/ThemeToggle"

export const Header = () => {
    const { openModal } = useAuthModal();

    const signIn = () => {
        openModal();
    }

    return <header className="w-full bg-sidebar-background items-center sticky top-0 z-10">
        <div className="flex justify-end items-center p-4 gap-4 max-w-[1280px] mx-auto">
            <div className="flex items-center gap-4 justify-between w-full">
                <Link href="/">
                    <Image src="/images/logo/concurso-app-icon.svg" alt="Logo" width={40} height={40} />
                </Link>
                <MenuBar className="bg-sidebar-background border-none hidden md:flex" />
                <SignedOut>
                    <div className="flex gap-[16px]">
                        <Button variant={'secondary'} size={'sm'} onClick={signIn}>Entrar</Button>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div className="flex items-center gap-4">
                        <CountQuestion />
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </div>
    </header>
}