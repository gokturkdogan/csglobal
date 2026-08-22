import type { ForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/types";

type Props = {
  messages: ForeignConsultancyMessages;
};

export function ForeignConsultancyTranslationNotice({ messages }: Props) {
  const text = messages.common.contentTranslationPending.trim();
  if (!text) return null;

  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      {text}
    </div>
  );
}
