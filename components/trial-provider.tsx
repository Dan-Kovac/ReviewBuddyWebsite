"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { TrialDialog } from "@/components/trial-dialog";

type TrialContextValue = {
  openTrial: (plan?: "starter" | "growth") => void;
};

const TrialContext = createContext<TrialContextValue | null>(null);

export function TrialProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<"starter" | "growth" | undefined>(undefined);

  const openTrial = useCallback((chosen?: "starter" | "growth") => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) {
      return;
    }

    setPlan(chosen);
    dialog.showModal();
    setOpen(true);
  }, []);

  const closeTrial = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
  }, []);

  return (
    <TrialContext.Provider value={{ openTrial }}>
      {children}
      <TrialDialog
        dialogRef={dialogRef}
        open={open}
        titleId={titleId}
        plan={plan}
        onClose={closeTrial}
      />
    </TrialContext.Provider>
  );
}

export function useTrial() {
  const value = useContext(TrialContext);
  if (!value) {
    throw new Error("useTrial must be used within TrialProvider");
  }

  return value;
}
