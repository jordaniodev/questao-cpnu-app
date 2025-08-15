"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block flex-1 bg-cover bg-center" style={{ backgroundImage: 'url(/images/cover.png)' }} />
      <div className="flex-1 flex items-center justify-center">
        <SignIn appearance={
          {elements:{
            headerTitle: 'Entrrar na sua conta',
            footerActionText: 'Não tem uma conta? Cadastre-se',
          }}
        } signUpUrl='/sign-up' signUpForceRedirectUrl={'/escolha-bloco'} forceRedirectUrl="/escolha-bloco" />
      </div>
    </div>
  );
}
