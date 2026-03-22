import { describe, expect, it } from "vitest";
import { formatText } from "../src";
import type { ReplacementSchema } from "../src/types/replacementSchema";

describe("formatText", () => {
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

  describe('type: "half-to-full"', () => {});

  describe('type: "full-to-half"', () => {});

  describe("mixed type", () => {});
});
