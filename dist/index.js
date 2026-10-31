"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentiles = calculatePercentiles;
exports.evaluateAgentRecommendation = evaluateAgentRecommendation;
exports.runTelemetry = runTelemetry;
const web3_js_1 = require("@solana/web3.js");
function calculatePercentiles(fees) {
    if (fees.length === 0) {
        return { min: 0, p50: 0, p75: 0, p95: 0, max: 0, sampleCount: 0 };
    }
    const sorted = [...fees].sort((a, b) => a - b);
    const getP = (p) => {
        const idx = Math.floor((p / 100) * (sorted.length - 1));
        return sorted[idx];
    };
    return {
        min: sorted[0],
        p50: getP(50),
        p75: getP(75),
        p95: getP(95),
        max: sorted[sorted.length - 1],
        sampleCount: sorted.length,
    };
}
function evaluateAgentRecommendation(percentiles) {
    const { p50, p95 } = percentiles;
    if (p95 > 250_000) {
        return {
            urgency: "URGENT",
            recommendedPriorityFeeMicroLamports: Math.round(p95 * 1.25),
            estimatedInclusionSlotWindow: 1,
            congestionStatus: "CRITICAL: Heavy contention on writable accounts.",
        };
    }
    else if (p95 > 50_000) {
        return {
            urgency: "HIGH",
            recommendedPriorityFeeMicroLamports: Math.round(p95 * 1.1),
            estimatedInclusionSlotWindow: 2,
            congestionStatus: "ELEVATED: Peak DeFi/Meme trading activity.",
        };
    }
    else if (p50 > 10_000) {
        return {
            urgency: "NORMAL",
            recommendedPriorityFeeMicroLamports: Math.round(p50 * 1.15),
            estimatedInclusionSlotWindow: 3,
            congestionStatus: "MODERATE: Normal chain traffic.",
        };
    }
    else {
        return {
            urgency: "LOW",
            recommendedPriorityFeeMicroLamports: Math.max(1_000, p50),
            estimatedInclusionSlotWindow: 4,
            congestionStatus: "QUIET: Baseline network load.",
        };
    }
}
async function runTelemetry(rpcUrl = "https://api.mainnet-beta.solana.com") {
    console.log("=================================================");
    console.log("⚡ SolanaPulse AI: Priority Fee & MEV Telemetry");
    console.log(`🔗 Target RPC: ${rpcUrl}`);
    console.log("=================================================");
    try {
        const connection = new web3_js_1.Connection(rpcUrl, "confirmed");
        // Raydium AMM Program ID as reference account
        const raydiumProgram = new web3_js_1.PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8");
        console.log(`Fetching recent prioritization fees for Raydium AMM [${raydiumProgram.toBase58()}]...`);
        const recentFees = await connection.getRecentPrioritizationFees({
            lockedWritableAccounts: [raydiumProgram],
        });
        const fees = recentFees.map((f) => f.prioritizationFee);
        const percentiles = calculatePercentiles(fees);
        const reco = evaluateAgentRecommendation(percentiles);
        console.log("\n📊 Telemetry Results (Last 150 Slots):");
        console.log(`- Samples Collected: ${percentiles.sampleCount}`);
        console.log(`- Min Fee: ${percentiles.min} µ-lamports`);
        console.log(`- P50 (Median): ${percentiles.p50} µ-lamports`);
        console.log(`- P75: ${percentiles.p75} µ-lamports`);
        console.log(`- P95: ${percentiles.p95} µ-lamports`);
        console.log(`- Max Fee: ${percentiles.max} µ-lamports`);
        console.log("\n🤖 Agentic Execution Recommendation:");
        console.log(`- Urgency Level: [${reco.urgency}]`);
        console.log(`- Recommended Fee: ${reco.recommendedPriorityFeeMicroLamports} µ-lamports`);
        console.log(`- Inclusion Slot Target: within ${reco.estimatedInclusionSlotWindow} slots`);
        console.log(`- Network Status: ${reco.congestionStatus}`);
        console.log("=================================================");
        return { percentiles, reco };
    }
    catch (err) {
        console.warn("RPC fetch failed or rate-limited. Running local simulation fallback...");
        const simulatedFees = Array.from({ length: 150 }, () => Math.floor(Math.random() * 80000));
        const percentiles = calculatePercentiles(simulatedFees);
        const reco = evaluateAgentRecommendation(percentiles);
        console.log("\n📊 Simulated Telemetry Results:");
        console.log(`- P50 (Median): ${percentiles.p50} µ-lamports`);
        console.log(`- P95: ${percentiles.p95} µ-lamports`);
        console.log(`- Recommended Fee: ${reco.recommendedPriorityFeeMicroLamports} µ-lamports`);
        console.log(`- Status: ${reco.congestionStatus}`);
        return { percentiles, reco };
    }
}
if (require.main === module) {
    runTelemetry();
}
