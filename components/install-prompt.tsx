"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const INSTALL_PROMPT_KEY = "_install_prompt_dismissed_until";
const ASK_LATER_DELAY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export function InstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installPromptDismissedUntil, setInstallPromptDismissedUntil] =
    useLocalStorage<number | null>(INSTALL_PROMPT_KEY, null);
  const [dontAskAgain, setDontAskAgain] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the default behavior to keep the event available for later use
      event.preventDefault();

      // Save the event for later use
      setDeferredEvent(event as BeforeInstallPromptEvent);

      // Only show the prompt if it hasn't been dismissed recently
      const now = Date.now();
      if (!installPromptDismissedUntil || now >= installPromptDismissedUntil) {
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    async function registerSw() {
      if (!("serviceWorker" in navigator)) {
        console.warn("Service workers are not supported.");
        return;
      }

      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        console.log("Service worker registration succeeded:", registration);
      } catch (error) {
        console.error(
          `Service worker registration failed: ${JSON.stringify(error)}`
        );
      }
    }
    registerSw();

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, [installPromptDismissedUntil]);

  useEffect(() => {
    // Check if the install prompt should be shown based on the dismissed timestamp
    const now = Date.now();
    if (
      deferredEvent &&
      (!installPromptDismissedUntil || now >= installPromptDismissedUntil)
    ) {
      setIsVisible(true);
    }
  }, [deferredEvent, installPromptDismissedUntil]);

  const install = async () => {
    if (!deferredEvent) return;
    try {
      await deferredEvent.prompt();
      const { outcome } = await deferredEvent.userChoice;
      if (outcome === "accepted") {
        setDeferredEvent(null);
      } else {
        // toast.error("You cancelled the installation");
      }
    } catch (error) {
      console.error(error);
      toast.error("Installation encountered an error. ");
    }
    setIsVisible(false);
  };

  const handleClose = () => {
    if (dontAskAgain) {
      // If "Don't ask again" is checked, set a far future date
      const farFuture = Date.now() + 365 * 24 * 60 * 60 * 1000; // 1 year from now
      setInstallPromptDismissedUntil(farFuture);
    } else {
      // Otherwise, use the standard 7-day delay
      const now = Date.now();
      setInstallPromptDismissedUntil(now + ASK_LATER_DELAY);
    }
    setIsVisible(false);
    setDontAskAgain(false); // Reset the checkbox for next time
  };

  if (!deferredEvent) return null;

  return (
    <>
      {/* Full screen overlay that appears when the prompt is visible */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-200 pointer-events-none" />
      )}

      <div className="fixed bottom-4 right-4 z-50">
        {isVisible ? (
          <div className="border border-primary/20 rounded-lg bg-background shadow-lg w-full min-w-[250px] max-w-[90vw] sm:max-w-[min(320px,90vw)] md:max-w-[min(350px,90vw)] animate-in fade-in duration-200">
            <div className="p-3 sm:p-4 md:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-primary-foreground">
                    <Image
                      alt=""
                      height={32}
                      width={32}
                      src={"/logo.png"}
                      className="h-full w-full object-contain p-1 rounded-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-medium truncate">
                      Install Our App
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      For a better, faster experience
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                  onClick={handleClose}
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <Button onClick={install} className="mt-3 w-full " size="sm">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Install Now</span>
              </Button>
              <div hidden className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="dont-ask-again"
                  checked={dontAskAgain}
                  onCheckedChange={(checked) => setDontAskAgain(!!checked)}
                />
                <Label htmlFor="dont-ask-again" className="text-xs">
                  Don't ask me again
                </Label>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full shadow-md border-primary/20 bg-background hover:bg-background/80
                          animate-in fade-in 
                          hover:scale-105 transition-transform duration-150"
            onClick={() => setIsVisible(true)}
            title="Install Our App"
          >
            <Download className="h-5 w-5 text-primary" />
            <span className="sr-only">Show install prompt</span>
          </Button>
        )}
      </div>
    </>
  );
}
