import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      prettier,
    },
    ...eslint.configs.recommended,
    rules: {
      eqeqeq: "error", // == 대신 === 사용 강제
      curly: "error", // 블록문에서 {} 사용 강제
      "prefer-const": "error", // 변경되지 않는 변수 const 선언 강제
      "prettier/prettier": "error", // Prettier 룰 적용
      "react/react-in-jsx-scope": "off", // React 17+에서는 필요 없음
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "none" }, // 함수 매개변수 검사하지 않도록 설정
      ], // 사용하지 않는 변수 경고
      "react-hooks/rules-of-hooks": "error", // Hooks 규칙 검사
      "react-hooks/exhaustive-deps": "warn", // 의존성 배열 검사
    },
  },
  {
    ...react.configs.flat.recommended, //  React 기본 권장 규칙
    settings: {
      react: {
        version: "detect", // 설치된 React 버전 감지
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17 + 버전부터는 필요 없음
    },
  },
  // React Hooks 플러그인 활성화
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error", // Hooks 는 최상위에서 호출
      "react-hooks/exhaustive-deps": "warn", // useEffect 의 의존성 배열 검사
    },
  },
  prettierConfig,
];
