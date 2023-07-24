export interface SanitizeHtmlOptions {
  allowedTags: string[];
  allowedAttributes: Record<string, string[]>;
}
