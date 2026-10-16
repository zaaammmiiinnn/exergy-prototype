import { describe, test } from "node:test";
import assert from "node:assert";
import { handleChatMessage, ChatSessionState } from "../engine";

function createInitialState(): ChatSessionState {
  return {
    currentNode: "main",
    mode: "menu",
    fallbackCount: 0,
  };
}

describe("Deterministic Chatbot Engine", () => {
  test("1. Number navigation routes correctly to child nodes", () => {
    const state = createInitialState();

    // 1 -> Services
    const r1 = handleChatMessage(state, "1");
    assert.strictEqual(r1.nextState.currentNode, "services");
    assert.ok(r1.reply.includes("Cooling optimization"));

    // 2 -> Industries
    const r2 = handleChatMessage(state, "2");
    assert.strictEqual(r2.nextState.currentNode, "industries");
    assert.ok(r2.reply.includes("Paper Mills"));

    // 3 -> Assessment
    const r3 = handleChatMessage(state, "3");
    assert.strictEqual(r3.nextState.currentNode, "assessment");
    assert.ok(r3.reply.includes("performance guarantee"));

    // 6 -> Handoff
    const r6 = handleChatMessage(state, "6");
    assert.strictEqual(r6.nextState.currentNode, "handoff");
    assert.ok(r6.reply.includes("neuralwaves.official@gmail.com"));
  });

  test("2. Global shortcuts (menu, 0, start over) reset to main menu", () => {
    const state: ChatSessionState = {
      currentNode: "services",
      mode: "menu",
      fallbackCount: 2,
    };

    const rMenu = handleChatMessage(state, "menu");
    assert.strictEqual(rMenu.nextState.currentNode, "main");
    assert.strictEqual(rMenu.nextState.fallbackCount, 0);

    const rZero = handleChatMessage(state, "0");
    assert.strictEqual(rZero.nextState.currentNode, "main");

    const rStartOver = handleChatMessage(state, "start over");
    assert.strictEqual(rStartOver.nextState.currentNode, "main");
  });

  test("3. Human handoff keywords immediately trigger handoff", () => {
    const state = createInitialState();
    const keywords = ["human", "speak to an agent", "person", "need engineer", "call me"];

    for (const kw of keywords) {
      const res = handleChatMessage(state, kw);
      assert.strictEqual(res.nextState.currentNode, "handoff");
      assert.ok(res.reply.includes("neuralwaves.official@gmail.com"));
    }
  });

  test("4. Back / 9 shortcut ascends to parent node", () => {
    const inServices: ChatSessionState = {
      currentNode: "services",
      mode: "menu",
      fallbackCount: 0,
    };

    const rBack = handleChatMessage(inServices, "back");
    assert.strictEqual(rBack.nextState.currentNode, "main");

    const rNine = handleChatMessage(inServices, "9");
    assert.strictEqual(rNine.nextState.currentNode, "main");
  });

  test("5. Q&A bank keyword matching retrieves exact answers with source page", () => {
    const state = createInitialState();

    // Test Exergy definition
    const rExergy = handleChatMessage(state, "what is exergy?");
    assert.ok(rExergy.reply.includes("useful work energy can actually do"));
    assert.ok(rExergy.reply.includes("Source: Approach"));

    // Test savings
    const rSavings = handleChatMessage(state, "how much can I save on costs?");
    assert.ok(rSavings.reply.includes("25–30%"));
    assert.ok(rSavings.reply.includes("Source: About / Benefits"));

    // Test guarantee
    const rGuarantee = handleChatMessage(state, "what does guarantee turnkey mean?");
    assert.ok(rGuarantee.reply.includes("contractual performance guarantees"));
    assert.ok(rGuarantee.reply.includes("Source: Benefits"));
  });

  test("6. Fallback ladder increments count and escalates to human on 2nd fallback", () => {
    const state0 = createInitialState();

    // Fallback 1: unrecognized input
    const f1 = handleChatMessage(state0, "random gibberish asdfghjkl");
    assert.strictEqual(f1.nextState.fallbackCount, 1);
    assert.ok(f1.reply.includes("here is our menu again"));

    // Fallback 2: second unrecognized input
    const f2 = handleChatMessage(f1.nextState, "more nonsense 1234567890???");
    assert.strictEqual(f2.nextState.fallbackCount, 2);
    assert.ok(f2.reply.includes("speak directly with an engineer in Dubai"));

    // Counter resets on any recognized command
    const recovered = handleChatMessage(f2.nextState, "1");
    assert.strictEqual(recovered.nextState.fallbackCount, 0);
    assert.strictEqual(recovered.nextState.currentNode, "services");
  });

  test("7. Extreme edge inputs (emoji, HTML, punctuation, long strings) handle safely", () => {
    const state = createInitialState();

    // HTML / Script injection attempt
    const rXSS = handleChatMessage(state, "<script>alert('xss')</script>");
    assert.strictEqual(rXSS.nextState.fallbackCount, 1);

    // Emoji input
    const rEmoji = handleChatMessage(state, "🏭 🔥 ⚡ 💧");
    assert.strictEqual(rEmoji.nextState.fallbackCount, 1);

    // Very long string
    const longString = "energy ".repeat(300);
    const rLong = handleChatMessage(state, longString);
    assert.ok(rLong.reply.length > 0);
  });
});
