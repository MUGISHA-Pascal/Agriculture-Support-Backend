"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    globals: {
        "ts-jest": {
            isolatedModules: true,
        },
    },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ["ts", "js", "json"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
    coverageDirectory: "coverage",
};
exports.default = config;
