export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, params);
  }
};

// Standard VoltX Event Triggers
export const trackTelegramClick = (sourceLocation: string, squadSlug?: string) => {
  trackEvent("click_telegram_contact", {
    source: sourceLocation,
    target_squad: squadSlug || "global",
  });
};

export const trackLeadSubmit = (squadSlug: string, budgetBracket: string) => {
  trackEvent("generate_lead", {
    squad: squadSlug,
    budget: budgetBracket,
  });
};
