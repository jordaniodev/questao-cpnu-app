import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { CountQuestion } from "../CountQuestion/CountQuestion"

export const Header = () => {
    return <header className="w-full bg-sidebar-background items-center sticky top-0 z-10">
        <div className="flex justify-end items-center p-4 gap-4 max-w-[1280px] mx-auto">
            <div className="flex items-center gap-4 justify-between w-full">
                <a href="/">
                    <img src="/images/logo/concurso-app-icon.svg" alt="Logo" width={40} height={40} />
                </a>
                <SignedOut>
                    <div className="flex gap-[16px]">
                        <SignInButton >
                            <Button variant={'secondary'} size={'sm'} >Entrar</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button variant={'default'} size={'sm'}>Cadastrar</Button>
                        </SignUpButton>
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