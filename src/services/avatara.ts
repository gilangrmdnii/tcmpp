// src/services/avatara.ts
import { StreamAvatarServerHelper } from "@avatara/avatar-stream/server";
import { getEnv } from "@utils/env";

// ⚠️ NOTE: NEXT_PUBLIC berarti key akan exposed di client
const API_KEY =
  getEnv("TARO_PUBLIC_AVATARA_KEY") || "pLMtRb1RHfpagJKMC7hslJ6Apeuh0WXQ";

// Inisialisasi SDK Avatara
export const streamAvatarServer = new StreamAvatarServerHelper({
  apikey: API_KEY,
});

// ================== WRAPPER FUNCTIONS ==================

// Character
export const getStars = async (page = 1, limit = 10) => {
  return await streamAvatarServer.getStars({ page, limit });
};

export const getStarByUID = async (uid: string) => {
  return await streamAvatarServer.getStarByUID(uid);
};

// Token
export const getAvatarToken = async (params: {
  remote_id: string;
  dob?: string;
  gender?: "male" | "female";
  name?: string;
  nickname?: string;
}) => {
  return await streamAvatarServer.getToken(params);
};

// Conversation
export const getConversationUID = async (
  star_uid: string,
  token: string
): Promise<string> => {
  return await streamAvatarServer.getConversationUID(star_uid, token);
};

// Video
export const getVideo = async (url: string) => {
  return await streamAvatarServer.getVideo(url);
};

// Speech-to-Speech + Transcript
export const stsWithTranscript = async (
  conversation_uid: string,
  audioFile: File | Blob,
  token: string
) => {
  const formData = new FormData();
  formData.append("conversation_uid", conversation_uid);
  formData.append("audio", audioFile);

  return await streamAvatarServer.stsWithTranscript(formData, token);
};
