import { NextResponse } from "next/server";
import OpenAI from "openai";

// ユーザーリストを取得するAPI
export async function POST(request: any) {
  const res = await request.json();
  const requestText = res.description;
  const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    // model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
        以下に該当する映画を3つ紹介してください。

        ${requestText}
        
        システムで使用するため、フォーマットは必ず回答例のJSONフォーマット（配列）でお願いします。
        JSONのキーは以下のとおりとしてください。すべて必須です。
        ・id: 連番の固有値、数値型
        ・year: 公開年（数値型）
        ・title: 映画タイトル（文字型）
        ・persons: 出演者（文字型配列）
        ・abstract: 概要（文字型）
        ・description: ストーリーの詳細（文字型）
        ・keywords: 映画の特徴を表すキーワード（文字型配列）

        以下は回答例です。
        [
          {
            "id": 1,
            "year": 2004,
            "title": "バック・トゥ・ザ・フューチャー",
            "persons": ["マイケル・J・フォックス", "クリストファー・ロイド"],
            "abstract": "高校生が発明したタイムマシンで過去や未来へと冒険するSFコメディ映画。",
            "description": "高校生マーティ・マクフライは、発明家の友人ドクと共にタイムマシンで過去の1955年へと飛ばされてしまう。彼らは未来を変えるために過去での出来事に介入し、その結果さまざまな問題が発生する。",
            "keywords": ["デロリアン型タイムマシン","ロックンロールとスケートボード","1955年、1985年、そして未来"]
          },
          ....
        ]
    
        理由や注意事項、補足、特記事項、回答不要です。問題が発生した場合は空配列（[]）を回答してください。
        `,
      },
    ],
    stream: false,
  });
  const answer = response.choices[0].message["content"];
  const result = String(answer)
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/.*(\[.*{.*}.*\])/, "");
  console.log(result);
  return NextResponse.json({
    response: JSON.parse(result),
  });
}
