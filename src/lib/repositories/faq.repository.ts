import { prisma } from "@/lib/prisma";

export async function findHomepageFaqs(limit = 6) {
  return prisma.faq.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: limit,
    select: { id: true, question: true, answer: true },
  });
}
