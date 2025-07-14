import { AnalysisData } from "../types";

const sampleData: AnalysisData = {
  tracking_providers: [
    {
      name: "Google Tag Manager",
      provider: "Google",
      category: "Tag Management",
      data_is_sent_to: "US",
      tracking_method: "Client-side",
    },
  ],
  tracking_cookies: [
    {
      name: "_ga",
      provider: "Google",
      category: "Analytics",
      data_is_sent_to: "US",
      lifetime: "7 days",
    },
    {
      name: "_ga_XY13FVB28P",
      provider: "Google",
      category: "Analytics",
      data_is_sent_to: "US",
      lifetime: "7 days",
    },
  ],
  tracking_javascript: [
    {
      name: "G gtag.js",
      provider: "Google",
      category: "Analytics",
      transfer_size: "377.8 KB",
      blocking_time: "76 ms",
    },
  ],
  lighthouse: {
    performance: 47,
    accessibility: 96,
    best_practices: 100,
    seo: 92,
  },
  summarizer:
    "The website utilizes Google Tag Manager and Google Analytics, employing cookies like '_ga' and '_ga_XY13FVB28P'. Data is transferred to the US. Performance score is low, indicating potential optimization needs.",
  suggestions: [
    "Ensure GDPR and CCPA compliance regarding data transfer to the US.",
    "Provide clear and comprehensive information about Google Analytics cookies in the privacy policy.",
    "Obtain user consent for analytics tracking, especially considering data transfer to the US.",
    "Optimize website performance to improve user experience and SEO.",
    "Implement measures to anonymize IP addresses to enhance user privacy.",
  ],
};

export default sampleData;
