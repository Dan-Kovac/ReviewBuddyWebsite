"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import { TrialDialog } from "@/components/trial-dialog";

type TrialContextValue = {
  openTrial: () => void;
};

const TrialContext = createContext<TrialContextValue | null>(null);

export function TrialProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  const openTrial = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) {
      return;
    }

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
