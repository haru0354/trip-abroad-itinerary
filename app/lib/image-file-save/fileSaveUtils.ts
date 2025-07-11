"use server";

import { supabase } from "@/app/util/supabase";

export const fileSaveBlogUtils = async (image: File) => {
  try {
    const fileName = image.name;
    const directory = "travel-memory-life";
    const saveFileUrl = `/${directory}/${fileName}`;

    await supabase.storage.from("blog").upload(saveFileUrl, image);

    const { data } = supabase.storage.from('blog').getPublicUrl(saveFileUrl)

    const fileUrl = data.publicUrl

    return { fileUrl, fileName };
  } catch (error) {
    console.error("画像を保存時にエラーが発生しました", error);
    throw error;
  }
};

export const fileSaveItineraryUtils = async (image: File, userId: number) => {
  try {
    const fileName = `${Date.now()}_${image.name}`;
    const directory = `itinerary/${userId}`;
    const saveFileUrl = `${directory}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("itinerary")
      .upload(saveFileUrl, image);

    if (uploadError) {
      console.error("アップロードエラー:", uploadError.message);
      throw uploadError;
    }
    
    const { data } = supabase.storage.from('itinerary').getPublicUrl(saveFileUrl);
    const fileUrl = data.publicUrl

    return { fileUrl, fileName };
  } catch (error) {
    console.error("画像を保存時にエラーが発生しました", error);
    throw error;
  }
};
