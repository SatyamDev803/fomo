import { CategoryConfig } from "@/types";

export const categoryConfig: Record<string, CategoryConfig> = {
  her: {
    label: "For Her",
    color: "pink",
    shade: 400,
    emoji: "🌸",
    bg: "pink-50",
    border: "pink-200",
    text: "pink-600",
  },
  him: {
    label: "For Him",
    color: "blue",
    shade: 400,
    emoji: "👔",
    bg: "blue-50",
    border: "blue-200",
    text: "blue-600",
  },
  family: {
    label: "For Family",
    color: "sky",
    shade: 400,
    emoji: "👨‍👩‍👧",
    bg: "sky-50",
    border: "sky-200",
    text: "sky-600",
  },
  kids: {
    label: "For Kids",
    color: "yellow",
    shade: 300,
    emoji: "🧸",
    bg: "yellow-50",
    border: "yellow-200",
    text: "yellow-600",
  },
  handmade: {
    label: "Handmade",
    color: "rose",
    shade: 300,
    emoji: "🤝",
    bg: "rose-50",
    border: "rose-200",
    text: "rose-600",
  },
  general: {
    label: "All Gifts",
    color: "purple",
    shade: 400,
    emoji: "🎁",
    bg: "purple-50",
    border: "purple-200",
    text: "purple-600",
  },
};

export const getCategoryTailwindClasses = (category: string) => {
  const config = categoryConfig[category] || categoryConfig.general;
  return config;
};
