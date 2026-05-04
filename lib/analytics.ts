type AnalyticsPayload = Record<string, string>;

export function trackEvent(name: string, payload: AnalyticsPayload) {
  console.info("[analytics]", name, payload);
}
