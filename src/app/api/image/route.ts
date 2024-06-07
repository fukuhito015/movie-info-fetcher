import { NextResponse } from "next/server";
import OpenAI from "openai";

// ユーザーリストを取得するAPI
export async function POST(request: any) {
  const res = await request.json();
  const keyword = res.keyword;
  const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  });
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `「${keyword}」をイメージした画像。コンテンツポリシーにひっかからないように。`,
    n: 1, // 生成する画像の数
    quality: "standard",
    size: "1024x1024", // 画像のサイズ
  });
  console.log(response.data[0].url);
  return NextResponse.json({
    response: response.data[0].url,
  });
}
