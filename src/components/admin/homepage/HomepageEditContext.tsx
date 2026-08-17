"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { HomepageContent, HomeCountryOption } from "@/lib/homepage";
import { HOMEPAGE_FAQ_MAX } from "@/lib/homepage";

type HomepageEditContextValue = {
  editing: boolean;
  content: HomepageContent;
  countryOptions: HomeCountryOption[];
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
    field: "title" | "content" | "linkLabel" | "image",
    value: string,
  ) => void;
  updateServiceArea: (
    index: number,
    field: "title" | "description",
    value: string,
  ) => void;
  updateFaq: (index: number, field: "question" | "answer", value: string) => void;
  updateHeroQuickLinkSlug: (index: number, slug: string) => void;
  updatePopularCountrySlug: (index: number, slug: string) => void;
  addFaq: () => void;
  removeFaq: (index: number) => void;
};

const HomepageEditContext = createContext<HomepageEditContextValue | null>(null);

export function HomepageEditProvider({
  initialContent,
  countryOptions,
  children,
}: {
  initialContent: HomepageContent;
  countryOptions: HomeCountryOption[];
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
    (index: number, field: "title" | "content" | "linkLabel" | "image", value: string) => {
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

  const updateFaq = useCallback(
    (index: number, field: "question" | "answer", value: string) => {
      setContent((prev) => ({
        ...prev,
        faqs: prev.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
      }));
    },
    [],
  );

  const addFaq = useCallback(() => {
    setContent((prev) => {
      if (prev.faqs.length >= HOMEPAGE_FAQ_MAX) return prev;
      return {
        ...prev,
        faqs: [
          ...prev.faqs,
          {
            id: crypto.randomUUID(),
            question: "Yeni soru",
            answer: "Cevabı buraya yazın.",
          },
        ],
      };
    });
  }, []);

  const removeFaq = useCallback((index: number) => {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  }, []);

  const updateHeroQuickLinkSlug = useCallback((index: number, slug: string) => {
    setContent((prev) => ({
      ...prev,
      heroQuickLinkSlugs: prev.heroQuickLinkSlugs.map((item, i) =>
        i === index ? slug : item,
      ),
    }));
  }, []);

  const updatePopularCountrySlug = useCallback((index: number, slug: string) => {
    setContent((prev) => ({
      ...prev,
      popularCountrySlugs: prev.popularCountrySlugs.map((item, i) =>
        i === index ? slug : item,
      ),
    }));
  }, []);

  const value = useMemo(
    () => ({
      editing: true,
      content,
      countryOptions,
      updateField,
      updateWhyUsItem,
      updateProcessStep,
      updateStat,
      updateSeoParagraph,
      updateSeoBlock,
      updateServiceArea,
      updateFaq,
      updateHeroQuickLinkSlug,
      updatePopularCountrySlug,
      addFaq,
      removeFaq,
    }),
    [
      content,
      countryOptions,
      updateField,
      updateWhyUsItem,
      updateProcessStep,
      updateStat,
      updateSeoParagraph,
      updateSeoBlock,
      updateServiceArea,
      updateFaq,
      addFaq,
      removeFaq,
      updateHeroQuickLinkSlug,
      updatePopularCountrySlug,
    ],
  );

  return (
    <HomepageEditContext.Provider value={value}>{children}</HomepageEditContext.Provider>
  );
}

export function useHomepageEdit() {
  return useContext(HomepageEditContext);
}
