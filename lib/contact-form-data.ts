export const contactReasons = [
  { value: "support", label: "Support" },
  { value: "business", label: "New Business Opportunities" },
  { value: "others", label: "Others" },
] as const

export type ContactReason = (typeof contactReasons)[number]["value"]

