// src/pages/home/index.tsx
import { useEffect, useState } from "react";
import { View, Text, Input, Button, Image } from "@tarojs/components";
import mainlogo from "../../assets/img/owdi-colors 1.png";
import micIcon from "../../assets/icons/icon-microphone.png";
import {
  getStars,
  getAvatarToken,
  getConversationUID,
} from "../../services/avatara";
import "./index.scss";

export default function Home() {
  const [star, setStar] = useState<any>(null);
  const [message, setMessage] = useState("Hai! OWDI siap dengerin cerita kamu...");
  const [conversationUID, setConversationUID] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");

  // Ambil karakter dari Avatara
  useEffect(() => {
    const fetchStar = async () => {
      try {
        const stars = await getStars(1, 1);
        if (stars.length > 0) {
          const firstStar = stars[0];
          setStar(firstStar);
          setMessage(firstStar.greeting_msg || "Hai! Aku Owdi ✨");
        }
      } catch (err) {
        console.error("Failed to fetch stars:", err);
      }
    };
    fetchStar();
  }, []);

  // Mulai percakapan (ambil token + conversation UID)
  const startConversation = async () => {
    if (!star) return;
    try {
      const tokenData = await getAvatarToken({ remote_id: "user-123" });
      const _token = tokenData?.token;
      setToken(_token);

      const uid = await getConversationUID(star.uid, _token);
      setConversationUID(uid);

      setMessage("Owdi siap ngobrol sama kamu 🎉");
    } catch (err) {
      console.error("Failed to start conversation:", err);
    }
  };

  return (
    <View className='home-page'>
      {/* ===== HEADER ===== */}
      <View className='header'>
        <View className='header-left'>
          <Image src={mainlogo} className='logo-img' />
        </View>
        <View className='header-center'>
          <Text className='tagline'>Own Digital Companion</Text>
        </View>
        <View className='header-right'>
          <Button className='cta'>Coba Sekarang!</Button>
        </View>
      </View>

      {/* ===== HERO ===== */}
      <View className='hero'>
        <View className='avatar-wrapper'>
          {star ? (
            <Image src={star.avatar_url} className='avatar-img' />
          ) : (
            <Text>Loading avatar...</Text>
          )}

          <View className='speech-bubble'>
            <Text>{message}</Text>
            <View className='bubble-tail' />
          </View>
        </View>

        {/* Input Box */}
        <View className='input-section'>
          <View className='input-container'>
            <Input
              placeholder='Kamu mau cerita apa sama Owdi?'
              className='text-input'
              value={userInput}
              onInput={(e) => setUserInput(e.detail.value)}
            />
            <Button className='start-button' onClick={startConversation}>
              <Text className='button-text'>Mulai Berbicara</Text>
              <Image src={micIcon} className='mic-icon' />
            </Button>
          </View>
        </View>
      </View>

      {/* ===== CATEGORY ===== */}
      <View className='categories'>
        <Text className='desc'>
          Curhat, tanya, atau berbagi cerita apapun OWDI selalu siap jadi Teman
          Digital kamu
        </Text>
        <View className='chip-list'>
          <View className='chip'>😅 Mau Curhat seru atau serius</View>
          <View className='chip'>🎧 Dengerin segala cerita kamu</View>
          <View className='chip'>🏃 Berbagi cerita aktivitasmu?</View>
          <View className='chip'>🔒 Ruang aman untukmu bercerita</View>
          <View className='chip highlight'>
            📌 Tanya apapun, mau resep coklat Dubai?
          </View>
        </View>
      </View>

      {/* ===== FOOTER ===== */}
      <View className='footer'>
        <Text className='logo'>🔴 OWDI</Text>
        <Text className='copyright'>
          Copyright © 2025 OWDI. All rights reserved.
        </Text>
      </View>
    </View>
  );
}
