export interface CardSummary {
  candidate_id: string;
  global_order: number;
  word: string;
  pos: string;
  hidden_meaning_ja: string;
  known_meaning_ja: string;
  chunk: number;
  status?: string;
}
export interface ContentCard {
  candidate_id: string;
  global_order: number;
  index: number;
  word: string;
  pos: string;
  pronunciation_ipa?: string;
  pronunciation?: string;
  known_meaning_ja: string;
  hidden_meaning_ja: string;
  example_en: string;
  example_ja: string;
  core_image_explanation_ja: string;
  diagram_mermaid: string;
  usage_notes?: string[] | string;
  [key: string]: unknown;
}
export interface ContentMeta {
  count: number;
  batches: number;
  chunks: number;
  chunkSize: number;
  featured: CardSummary[];
}
export interface Session {
  ids: string[];
  startOffset: number;
  cursor: number;
  finished: boolean;
  startedAt: string;
}
export interface ReviewStat {
  correct: number;
  wrong: number;
  streak: number;
  dueAt: string;
  lastReviewedAt: string;
}
export interface Progress {
  schemaVersion: 1;
  revision: number;
  viewed: Record<string,string>;
  favorites: string[];
  reviews: Record<string,ReviewStat>;
  activeSession: Session | null;
  nextOffset: number;
  settings: { sound: boolean };
}
export type Tab = 'home' | 'study' | 'search' | 'review';
