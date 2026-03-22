import type { ReplacementSchema } from "./types/replacementSchema";

/**
 * テキストの整形を設定をもとに実行する
 *
 * @param text 整形前テキスト
 * @param config 整形の設定オブジェクト
 * @returns 整形済みテキスト
 */
export const formatText = (text: string, config: ReplacementSchema): string => {
  console.log(config);
  return text.trim().toUpperCase();
};

export function sum(a: number, b: number) {
  return a + b;
}
