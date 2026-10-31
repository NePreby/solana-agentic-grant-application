import assert from "node:assert";
import test from "node:test";
import { calculatePercentiles, evaluateAgentRecommendation } from "./index";

test("calculatePercentiles handles empty array gracefully", () => {
  const result = calculatePercentiles([]);
  assert.strictEqual(result.sampleCount, 0);
  assert.strictEqual(result.p50, 0);
  assert.strictEqual(result.p95, 0);
});

test("calculatePercentiles accurately determines median and 95th percentile", () => {
  const samples = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const result = calculatePercentiles(samples);
  assert.strictEqual(result.sampleCount, 10);
  assert.strictEqual(result.min, 100);
  assert.strictEqual(result.max, 1000);
  assert.strictEqual(result.p50, 500);
  assert.strictEqual(result.p95, 900);
});

test("evaluateAgentRecommendation flags URGENT when p95 exceeds 250,000", () => {
  const p = { min: 1000, p50: 80000, p75: 150000, p95: 300000, max: 500000, sampleCount: 100 };
  const reco = evaluateAgentRecommendation(p);
  assert.strictEqual(reco.urgency, "URGENT");
  assert.strictEqual(reco.recommendedPriorityFeeMicroLamports, 375000);
  assert.strictEqual(reco.estimatedInclusionSlotWindow, 1);
});

test("evaluateAgentRecommendation handles LOW urgency for calm slots", () => {
  const p = { min: 0, p50: 500, p75: 1200, p95: 5000, max: 10000, sampleCount: 100 };
  const reco = evaluateAgentRecommendation(p);
  assert.strictEqual(reco.urgency, "LOW");
  assert.strictEqual(reco.recommendedPriorityFeeMicroLamports, 1000);
  assert.strictEqual(reco.estimatedInclusionSlotWindow, 4);
});
