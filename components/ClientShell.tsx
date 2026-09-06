"use client";

import React, { useState, createContext, useContext } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LeadFunnelModal } from "./LeadFunnelModal";
import { FloatingFastTrack } from "./FloatingFastTrack";
import { CaseStudyModal } from "./CaseStudyModal";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./Toast";
import { CaseStudy } from "@/lib/types";

interface ScopingContextType {
  openScopingModal: (squadSlug?: string) => void;
  openCaseStudyModal: (caseStudy: CaseStudy) => void;
}

const ScopingContext = createContext<ScopingContextType>({
  openScopingModal: () => {},
  openCaseStudyModal: () => {},
});

export const useScoping = () => useContext(ScopingContext);

export const ClientShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSquad, setActiveSquad] = useState<string>("shopify");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const handleOpenScoping = (squadSlug?: string) => {
    if (squadSlug) setActiveSquad(squadSlug);
    setModalOpen(true);
  };

  const handleOpenCaseStudy = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setCaseStudyOpen(true);
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <ScopingContext.Provider
          value={{
            openScopingModal: handleOpenScoping,
            openCaseStudyModal: handleOpenCaseStudy,
          }}
        >
          <div className="flex min-h-screen flex-col bg-canvas text-text-primary selection:bg-volt-mint/20 selection:text-text-primary transition-colors duration-200">
            <Navbar onOpenLeadModal={handleOpenScoping} />
            <main className="flex-1">{children}</main>
            <Footer />

            {/* Scoping Modal */}
            <LeadFunnelModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              initialSquadSlug={activeSquad}
            />

            {/* Internal Case Study Architecture Breakdown Modal */}
            <CaseStudyModal
              caseStudy={selectedCaseStudy}
              isOpen={caseStudyOpen}
              onClose={() => setCaseStudyOpen(false)}
              onInitiateScoping={(slug) => {
                setCaseStudyOpen(false);
                handleOpenScoping(slug);
              }}
            />

            {/* Floating Scoping Quick-Dock */}
            <FloatingFastTrack onOpenLeadModal={() => handleOpenScoping()} />
          </div>
        </ScopingContext.Provider>
      </ToastProvider>
    </ThemeProvider>
  );
};
