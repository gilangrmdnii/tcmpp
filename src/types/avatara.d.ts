// src/types/avatara.d.ts

export interface Star {
  uid: string;
  name: string;
  nickname?: string;
  gender?: "male" | "female";
  avatar_url?: string;
  description?: string;
  [key: string]: any; // fallback kalau ada field tambahan
}

export interface StarListResponse {
  data: Star[];
  page: number;
  limit: number;
  total: number;
}

export interface TokenResponse {
  token: string;
  expires_in: number; // dalam detik
}

export interface ConversationResponse {
  conversation_uid: string;
}

export interface VideoResponse {
  url: string;
  duration: number;
  format: string;
  [key: string]: any;
}

export interface TranscriptResponse {
  text: string;
  audio_url?: string; // kalau speech-to-speech
  confidence?: number;
  [key: string]: any;
}
