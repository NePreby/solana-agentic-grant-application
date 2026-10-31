"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const node_test_1 = __importDefault(require("node:test"));
const index_1 = require("./index");
(0, node_test_1.default)("calculatePercentiles handles empty array gracefully", () => {
    const result = (0, index_1.calculatePercentiles)([]);
    node_assert_1.default.strictEqual(result.sampleCount, 0);
    node_assert_1.default.strictEqual(result.p50, 0);
    node_assert_1.default.strictEqual(result.p95, 0);
});
(0, node_test_1.default)("calculatePercentiles accurately determines median and 95th percentile", () => {
    const samples = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    const result = (0, index_1.calculatePercentiles)(samples);
    node_assert_1.default.strictEqual(result.sampleCount, 10);
    node_assert_1.default.strictEqual(result.min, 100);
    node_assert_1.default.strictEqual(result.max, 1000);
    node_assert_1.default.strictEqual(result.p50, 500);
    node_assert_1.default.strictEqual(result.p95, 900);
});
(0, node_test_1.default)("evaluateAgentRecommendation flags URGENT when p95 exceeds 250,000", () => {
    const p = { min: 1000, p50: 80000, p75: 150000, p95: 300000, max: 500000, sampleCount: 100 };
    const reco = (0, index_1.evaluateAgentRecommendation)(p);
    node_assert_1.default.strictEqual(reco.urgency, "URGENT");
    node_assert_1.default.strictEqual(reco.recommendedPriorityFeeMicroLamports, 375000);
    node_assert_1.default.strictEqual(reco.estimatedInclusionSlotWindow, 1);
});
(0, node_test_1.default)("evaluateAgentRecommendation handles LOW urgency for calm slots", () => {
    const p = { min: 0, p50: 500, p75: 1200, p95: 5000, max: 10000, sampleCount: 100 };
    const reco = (0, index_1.evaluateAgentRecommendation)(p);
    node_assert_1.default.strictEqual(reco.urgency, "LOW");
    node_assert_1.default.strictEqual(reco.recommendedPriorityFeeMicroLamports, 1000);
    node_assert_1.default.strictEqual(reco.estimatedInclusionSlotWindow, 4);
});
