
export interface ToxicityScores {
  toxic: number;
  severe_toxic: number;
  obscene: number;
  threat: number;
  insult: number;
  identity_hate: number;
}

export interface ToxicSpan {
  start: number;
  end: number;
  label: string;
  text: string;
}

export interface ClassificationResult {
  scores: ToxicityScores;
  spans: ToxicSpan[];
  modelVersion: string;
  latencyMs: number;
  explanation: string;
}

export type ModerationAction = 'ALLOW' | 'FLAG' | 'BLOCK';

export interface MessageRecord {
  id: string;
  text: string;
  timestamp: string;
  scores: ToxicityScores;
  action: ModerationAction;
  userId: string;
}

export enum AppTab {
  DETECTOR = 'detector',
  DASHBOARD = 'dashboard',
  ARCHITECTURE = 'architecture',
  MLOPS = 'mlops'
}
