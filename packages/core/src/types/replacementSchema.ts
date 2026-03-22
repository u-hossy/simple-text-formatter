/**
 * スキーマのバージョン
 */
type SchemaVersion = 1;

/**
 * すべての置換処理に共通する基本プロパティ
 */
interface ProcessBase {
  label?: string;
  enabled: boolean;
}

/**
 * 指定された文字列や正規表現を別の文字列に置換する処理
 */
interface ReplaceProcess extends ProcessBase {
  type: "replace";
  from: string;
  to: string;
  useRegex: boolean;
}

/**
 * 半角/全角変換の対象となる文字種の指定
 */
interface ConvertTarget {
  alphabet: boolean;
  number: boolean;
  katakana: boolean;
  space: boolean;
  symbol: boolean;
}

/**
 * 指定された文字種を半角から全角に変換する処理
 */
interface HalfToFullProcess extends ProcessBase {
  type: "half-to-full";
  target: ConvertTarget;
}

/**
 * 指定された文字種を全角から半角に変換する処理
 */
interface FullToHalfProcess extends ProcessBase {
  type: "full-to-half";
  target: ConvertTarget;
}

/**
 * 実行可能な各置換処理のユニオン型
 */
type Process = ReplaceProcess | HalfToFullProcess | FullToHalfProcess;

/**
 * 置換処理の全体設定
 */
interface ReplacementSchema {
  schemaVersion: SchemaVersion;
  processes: Process[];
}

export type { ConvertTarget, ReplacementSchema };
