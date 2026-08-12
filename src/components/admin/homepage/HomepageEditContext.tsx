"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { HomepageContent } from "@/lib/homepage";

type HomepageEditContextValue = {
  editing: boolean;
  content: HomepageContent;
  updateField: <K extends keyof HomepageContent>(key: K, value: HomepageContent[K]) => void;
  updateWhyUsItem: (index: number, field: "title" | "description", value: string) => void;
  updateProcessStep: (
    index: number,
    field: "title" | "description",
    value: string,
  ) => void;
  updateStat: (index: number, field: "label" | "value", value: string) => void;
  updateSeoParagraph: (index: number, value: string) => void;
  updateSeoBlock: (
    index: number,
    field: "title" | "content" | "linkLabel",
    value: string,
  ) => void;
  updateServiceArea: (
    index: number,
    field: "title" | "description",
    value: string,
  ) => void;
};

const HomepageEditContext = createContext<HomepageEditContextValue | null>(null);

export function HomepageEditProvider({
  initialContent,
  children,
}: {
  initialContent: HomepageContent;
  children: ReactNode;
}) {
  const [content, setContent] = useState<HomepageContent>(initialContent);

  const updateField = useCallback(
    <K extends keyof HomepageContent>(key: K, value: HomepageContent[K]) => {
      setContent((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateWhyUsItem = useCallback(
    (index: number, field: "title" | "description", value: string) => {
      setContent((prev) => ({
        ...prev,
        whyUsItems: prev.whyUsItems.map((item, i) =>
          i === index ? { ...item, [field]: value } : item,
        ),
      }));
    },
    [],
  );

  const updateProcessStep = useCallback(
    (index: number, field: "title" | "description", value: string) => {
      setContent((prev) => ({
        ...prev,
        processSteps: prev.processSteps.map((step, i) =>
          i === index ? { ...step, [field]: value } : step,
        ),
      }));
    },
    [],
  );

  const updateStat = useCallback((index: number, field: "label" | "value", value: string) => {
    setContent((prev) => ({
      ...prev,
      stats: prev.stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat)),
    }));
  }, []);

  const updateSeoParagraph = useCallback((index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      seoIntroParagraphs: prev.seoIntroParagraphs.map((p, i) => (i === index ? value : p)),
    }));
  }, []);

  const updateSeoBlock = useCallback(
    (index: number, field: "title" | "content" | "linkLabel", value: string) => {
      setContent((prev) => ({
        ...prev,
        seoBlocks: prev.seoBlocks.map((block, i) =>
          i === index ? { ...block, [field]: value } : block,
        ),
      }));
    },
    [],
  );

  const updateServiceArea = useCallback(
    (index: number, field: "title" | "description", value: string) => {
      setContent((prev) => ({
        ...prev,
        serviceAreas: prev.serviceAreas.map((area, i) =>
          i === index ? { ...area, [field]: value } : area,
        ),
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      editing: true,
      content,
      updateField,
      updateWhyUsItem,
      updateProcessStep,
      updateStat,
      updateSeoParagraph,
      updateSeoBlock,
      updateServiceArea,
    }),
    [
      content,
      updateField,
      updateWhyUsItem,
      updateProcessStep,
      updateStat,
      updateSeoParagraph,
      updateSeoBlock,
      updateServiceArea,
    ],
  );

  return (
    <HomepageEditContext.Provider value={value}>{children}</HomepageEditContext.Provider>
  );
}

export function useHomepageEdit() {
  return useContext(HomepageEditContext);
}
