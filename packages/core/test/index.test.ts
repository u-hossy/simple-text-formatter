// TODO: テストケースをWeb UIで処理を実装するときに追加する

import { describe, expect, it } from "vitest";
import { formatText } from "../src";
import type { ReplacementSchema } from "../src/types/replacementSchema";

describe("formatText", () => {
  describe("common", () => {
    it("skips process which enabled is false", () => {
      // Arrange
      const text = "せんせきせん";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: false,
            type: "replace",
            from: "せん",
            to: "すん",
            useRegex: false,
          },
          {
            enabled: true,
            type: "replace",
            from: "せき",
            to: "すき",
            useRegex: false,
          },
        ],
      };
      const expected = "せんすきせん";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe('type: "replace"', () => {
    it("removes spaces in English", () => {
      // Arrange
      const text = "I Have A Pen";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "replace",
            from: " ",
            to: "",
            useRegex: false,
          },
        ],
      };
      const expected = "IHaveAPen";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("removes spaces in Japanese", () => {
      // Arrange
      const text = "この　りんごは　赤い";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "replace",
            from: "　",
            to: "",
            useRegex: false,
          },
        ],
      };
      const expected = "このりんごは赤い";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("removes spaces with regular expression", () => {
      // Arrange
      const text = "Alice Says: この　りんごは　あかいですねぇ";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "replace",
            from: "[ 　]",
            to: "",
            useRegex: true,
          },
        ],
      };
      const expected = "AliceSays:このりんごはあかいですねぇ";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("replaces Japanese letters", () => {
      // Arrange
      const text = "せんせきせん";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "replace",
            from: "せん",
            to: "すん",
            useRegex: false,
          },
        ],
      };
      const expected = "すんせきすん";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe('type: "half-to-full"', () => {
    it("converts half width numbers to full width", () => {
      // Arrange
      const text = "時は1582年";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "half-to-full",
            target: {
              alphabet: false,
              number: true,
              katakana: false,
              space: false,
              symbol: false,
            },
          },
        ],
      };
      const expected = "時は１５８２年";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("converts half width alphabets to full width", () => {
      // Arrange
      const text = "Example Inc.";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "half-to-full",
            target: {
              alphabet: true,
              number: false,
              katakana: false,
              space: false,
              symbol: false,
            },
          },
        ],
      };
      const expected = "Ｅｘａｍｐｌｅ Ｉｎｃ.";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("converts half width katakana to full width", () => {
      // Arrange
      const text = "ｺﾝﾊﾞﾝﾜ世界のＡＢＣabc１２３123さん";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "half-to-full",
            target: {
              alphabet: false,
              number: false,
              katakana: true,
              space: false,
              symbol: false,
            },
          },
        ],
      };
      const expected = "コンバンワ世界のＡＢＣabc１２３123さん";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("converts half width alphabets and spaces to full width", () => {
      // Arrange
      const text = "Sample Japan合同会社";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "half-to-full",
            target: {
              alphabet: true,
              number: false,
              katakana: false,
              space: true,
              symbol: false,
            },
          },
        ],
      };
      const expected = "Ｓａｍｐｌｅ　Ｊａｐａｎ合同会社";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("converts half width alphabets and symbols to full width", () => {
      // Arrange
      const text =
        "ABC! ＡＢＣ！ def@ ｄｅｆ＠ ghi# ｇｈｉ＃ (Test_01) [Data: 100%]";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "half-to-full",
            target: {
              alphabet: true,
              number: false,
              katakana: false,
              space: false,
              symbol: true,
            },
          },
        ],
      };
      const expected =
        "ＡＢＣ！ ＡＢＣ！ ｄｅｆ＠ ｄｅｆ＠ ｇｈｉ＃ ｇｈｉ＃ （Ｔｅｓｔ＿01） ［Ｄａｔａ： 100％］";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe('type: "full-to-half"', () => {
    it("converts full width numbers to half width", () => {
      // Arrange
      const text = "時は１５８２年";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "full-to-half",
            target: {
              alphabet: false,
              number: true,
              katakana: false,
              space: false,
              symbol: false,
            },
          },
        ],
      };
      const expected = "時は1582年";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("converts full width alphabets to half width", () => {
      // Arrange
      const text = "Ｅｘａｍｐｌｅ Ｉｎｃ.";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "full-to-half",
            target: {
              alphabet: true,
              number: false,
              katakana: false,
              space: false,
              symbol: false,
            },
          },
        ],
      };
      const expected = "Example Inc.";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("converts full width katakana to half width", () => {
      // Arrange
      const text = "コンバンワ世界のＡＢＣabc１２３123さん";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "full-to-half",
            target: {
              alphabet: false,
              number: false,
              katakana: true,
              space: false,
              symbol: false,
            },
          },
        ],
      };
      const expected = "ｺﾝﾊﾞﾝﾜ世界のＡＢＣabc１２３123さん";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("converts full width alphabets and spaces to half width", () => {
      // Arrange
      const text = "Ｓａｍｐｌｅ　Ｊａｐａｎ合同会社";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "full-to-half",
            target: {
              alphabet: true,
              number: false,
              katakana: false,
              space: true,
              symbol: false,
            },
          },
        ],
      };
      const expected = "Sample Japan合同会社";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });

    it("converts full width alphabets and symbols to half width", () => {
      // Arrange
      const text =
        "ABC! ＡＢＣ！ def@ ｄｅｆ＠ ghi# ｇｈｉ＃ （Ｔｅｓｔ＿０１） ［Ｄａｔａ： 100％］";
      const config: ReplacementSchema = {
        schemaVersion: 1,
        processes: [
          {
            enabled: true,
            type: "full-to-half",
            target: {
              alphabet: true,
              number: false,
              katakana: false,
              space: false,
              symbol: true,
            },
          },
        ],
      };
      const expected = "ABC! ABC! def@ def@ ghi# ghi# (Test_０１) [Data: 100%]";

      // Act
      const result = formatText(text, config);

      // Assert
      expect(result).toBe(expected);
    });
  });

  // describe("mixed type", () => {});
});
