"use server";

import { supabase } from "../util/supabase";

export const FileSaveUtils = async (image: File) => {
  try {
    const fileName = image.name;
    const directory = "travel-memory-life";
    const saveFileUrl = `/${directory}/${fileName}`;

    await supabase.storage.from("blog").upload(saveFileUrl, image);

    const { data } = supabase.storage.from('blog').getPublicUrl(saveFileUrl)

    const fileUrl = data.publicUrl

    console.log("画像の保存に成功しました。");
    return { fileUrl, fileName };
  } catch (error) {
    console.error("画像を保存時にエラーが発生しました", error);
    throw error;
  }
};

export const FileSaveItineraryUtils = async (image: File, userId: string) => {
  try {
    const fileName = `${Date.now()}_${image.name}`;
    const directory = `itinerary/${userId}`;
    const saveFileUrl = `${directory}/${fileName}`;

    await supabase.storage.from("itinerary").upload(saveFileUrl, image);

    const { data } = supabase.storage.from('itinerary').getPublicUrl(saveFileUrl);
    const fileUrl = data.publicUrl

    console.log("画像の保存に成功しました。");
    return { fileUrl, fileName };
  } catch (error) {
    console.error("画像を保存時にエラーが発生しました", error);
    throw error;
  }
};
