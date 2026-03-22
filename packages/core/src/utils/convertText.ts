// TODO: カナ文字、記号正規表現まわりが怪しいからリファクタリングする

import moji from "moji";
import type { ConvertTarget } from "./../types/replacementSchema";

const HALF_ALPHABET_RE = /[A-Za-z]+/g;
const HALF_NUMBER_RE = /[0-9]+/g;
const HALF_KATAKANA_RE =
  /([\uff66-\uff9c]\uff9e)|([\uff8a-\uff8e]\uff9f)|([\uff61-\uff9f])/g;
const HALF_SPACE_RE = / +/g;
const HALF_SYMBOL_RE = /[!-/:-@[-`{-~]+/g;

const FULL_ALPHABET_RE = /[Ａ-Ｚａ-ｚ]+/g;
const FULL_NUMBER_RE = /[０-９]+/g;
const FULL_KATAKANA_RE = /[ァ-ヶヷ-ヺー。「」、・]+/g;
const FULL_SPACE_RE = /　+/g;
const FULL_SYMBOL_RE = /[！-／：-＠［-｀｛-～]+/g;

type CHAR_SORT =
  | "HE" // 半角英数
  | "ZE" // 全角英数
  | "HS" // 半角スペース
  | "ZS" // 全角スペース
  | "HK" // 半角カナ
  | "ZK"; // 全角カナ

const convertMatched = (
  text: string,
  pattern: RegExp,
  from: CHAR_SORT,
  to: CHAR_SORT,
): string => {
  return text.replaceAll(pattern, (matched) =>
    moji(matched).convert(from, to).toString(),
  );
};

/**
 * 指定された文字の種類を半角から全角に変換する関数
 *
 * @param text 変換する文字列
 * @param target 変換する対象の指定
 * @returns 全角に変換後の文字列
 */
const convertHalfToFull = (text: string, target: ConvertTarget): string => {
  let converted = text;

  if (target.katakana) {
    converted = convertMatched(converted, HALF_KATAKANA_RE, "HK", "ZK");
  }
  if (target.alphabet) {
    converted = convertMatched(converted, HALF_ALPHABET_RE, "HE", "ZE");
  }
  if (target.number) {
    converted = convertMatched(converted, HALF_NUMBER_RE, "HE", "ZE");
  }
  if (target.symbol) {
    converted = convertMatched(converted, HALF_SYMBOL_RE, "HE", "ZE");
  }
  if (target.space) {
    converted = convertMatched(converted, HALF_SPACE_RE, "HS", "ZS");
  }

  return converted;
};

/**
 * 指定された文字の種類を全角から半角に変換する関数
 *
 * @param text 変換する文字列
 * @param target 変換する対象の指定
 * @returns 半角に変換後の文字列
 */
const convertFullToHalf = (text: string, target: ConvertTarget): string => {
  let converted = text;

  if (target.katakana) {
    converted = convertMatched(converted, FULL_KATAKANA_RE, "ZK", "HK");
  }
  if (target.alphabet) {
    converted = convertMatched(converted, FULL_ALPHABET_RE, "ZE", "HE");
  }
  if (target.number) {
    converted = convertMatched(converted, FULL_NUMBER_RE, "ZE", "HE");
  }
  if (target.symbol) {
    converted = convertMatched(converted, FULL_SYMBOL_RE, "ZE", "HE");
  }
  if (target.space) {
    converted = convertMatched(converted, FULL_SPACE_RE, "ZS", "HS");
  }

  return converted;
};

export { convertFullToHalf, convertHalfToFull };
