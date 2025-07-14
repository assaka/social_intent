export interface TrackingProvider {
  name: string;
  provider: string;
  category: string;
  data_is_sent_to: string;
  tracking_method: string;
}

export interface TrackingCookie {
  name: string;
  provider: string;
  category: string;
  data_is_sent_to: string;
  lifetime: string;
}

export interface TrackingJavaScript {
  name: string;
  provider: string;
  category: string;
  transfer_size: string;
  blocking_time: string;
}

export interface Lighthouse {
  performance: number;
  accessibility: number;
  best_practices: number;
  seo: number;
}

export interface AnalysisData {
  tracking_providers: TrackingProvider[];
  tracking_cookies: TrackingCookie[];
  tracking_javascript: TrackingJavaScript[];
  lighthouse: Lighthouse;
  summarizer: string;
  suggestions: string[];
}