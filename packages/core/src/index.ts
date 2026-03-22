import type { ReplacementSchema } from "./types/replacementSchema";
import { convertFullToHalf, convertHalfToFull } from "./utils/convertText";

/**
 * テキストの整形を設定をもとに実行する
 *
 * @param text 整形前テキスト
 * @param config 整形の設定オブジェクト
 * @returns 整形済みテキスト
 */
export const formatText = (text: string, config: ReplacementSchema): string => {
  let result = text;

  config.processes.forEach((process) => {
    if (!process.enabled) {
      return;
    }

    switch (process.type) {
      case "replace":
        if (process.useRegex) {
          const re = new RegExp(process.from, "g");
          result = result.replaceAll(re, process.to);
        } else {
          result = result.replaceAll(process.from, process.to);
        }
        break;
      case "full-to-half":
        result = convertFullToHalf(result, process.target);
        break;
      case "half-to-full":
        result = convertHalfToFull(result, process.target);
        break;
      default: {
        const _exhaustiveCheck: never = process;
        throw new Error("Invalid type has detected calling `formatText`");
      }
    }
  });

  return result;
};
