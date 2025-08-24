'use client';

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export function InstallPWAButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowButton(true);
        });
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            setShowButton(false);
            setDeferredPrompt(null);
        }
    };

    if (!showButton) return null;

    return (
        <button onClick={handleInstallClick} className="pwa-install-btn">
            Instalar app na tela inicial
        </button>
    );
}