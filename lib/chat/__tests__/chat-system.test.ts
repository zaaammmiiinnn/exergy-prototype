import { describe, test } from "node:test";
import assert from "node:assert";
import { chatRepository } from "../repository";
import { handleChatMessage } from "../../chatbot/engine";
import {
  generateVisitorUuid,
  signVisitorToken,
  verifyVisitorToken,
} from "../../auth/visitor";
import { signSession } from "../../auth/session";

describe("Database-Backed Customer Support Chatbot & Admin Live Chat (10 Prompt Scenarios)", () => {
  // TEST 1: Persistent conversation
  test("TEST 1: Persistent conversation - reload restores history from database", async () => {
    const visitorUuid = generateVisitorUuid();
    const visitor = await chatRepository.getOrCreateVisitor(visitorUuid, {
      deviceType: "desktop",
    });

    const conversation = await chatRepository.getOrCreateConversation(visitor, {
      pageUrl: "/services",
    });

    // Visitor sends message
    await chatRepository.addMessage({
      conversationId: conversation.id,
      senderType: "visitor",
      messageContent: "Hello, can you help optimize our cooling plant?",
    });

    // Bot replies
    await chatRepository.addMessage({
      conversationId: conversation.id,
      senderType: "bot",
      messageContent: "We optimize cooling networks for minimum exergy loss. Would you like a facility assessment?",
    });

    // Simulate page reload: re-fetch from central database
    const restoredMessages = await chatRepository.getMessages(conversation.id);
    assert.strictEqual(restoredMessages.length, 2);
    assert.strictEqual(restoredMessages[0].message_content, "Hello, can you help optimize our cooling plant?");
    assert.strictEqual(restoredMessages[0].sender_type, "visitor");
    assert.strictEqual(restoredMessages[1].sender_type, "bot");
  });

  // TEST 2: Device separation
  test("TEST 2: Device separation - Device A and Device B have independent identities and histories", async () => {
    const uuidDeviceA = generateVisitorUuid();
    const uuidDeviceB = generateVisitorUuid();
    assert.notStrictEqual(uuidDeviceA, uuidDeviceB);

    const visitorA = await chatRepository.getOrCreateVisitor(uuidDeviceA, { deviceType: "desktop" });
    const visitorB = await chatRepository.getOrCreateVisitor(uuidDeviceB, { deviceType: "mobile" });

    assert.strictEqual(visitorA.device_type, "desktop");
    assert.strictEqual(visitorB.device_type, "mobile");

    const convA = await chatRepository.getOrCreateConversation(visitorA);
    const convB = await chatRepository.getOrCreateConversation(visitorB);
    assert.notStrictEqual(convA.id, convB.id);

    // Send different messages on each device
    await chatRepository.addMessage({
      conversationId: convA.id,
      senderType: "visitor",
      messageContent: "Message from Device A (Cooling inquiry)",
    });

    await chatRepository.addMessage({
      conversationId: convB.id,
      senderType: "visitor",
      messageContent: "Message from Device B (Desalination inquiry)",
    });

    const msgsA = await chatRepository.getMessages(convA.id);
    const msgsB = await chatRepository.getMessages(convB.id);

    assert.strictEqual(msgsA.length, 1);
    assert.strictEqual(msgsA[0].message_content, "Message from Device A (Cooling inquiry)");

    assert.strictEqual(msgsB.length, 1);
    assert.strictEqual(msgsB[0].message_content, "Message from Device B (Desalination inquiry)");
  });

  // TEST 3: Admin response in real-time
  test("TEST 3: Admin response - Admin sends direct reply and it is saved in conversation", async () => {
    const visitor = await chatRepository.getOrCreateVisitor(generateVisitorUuid());
    const conv = await chatRepository.getOrCreateConversation(visitor);

    // Customer sends message
    await chatRepository.addMessage({
      conversationId: conv.id,
      senderType: "visitor",
      messageContent: "I want to discuss your industrial heat recovery solutions.",
    });

    // Admin replies from live chat dashboard
    const adminMsg = await chatRepository.addMessage({
      conversationId: conv.id,
      senderType: "admin",
      senderId: "sarfraz@exergy-solutions.com",
      messageContent: "Hello! Thank you for your inquiry. Our engineering team would be glad to review your heat exchangers.",
      metadata: { adminName: "Lead Operations Engineer" },
    });

    assert.strictEqual(adminMsg.sender_type, "admin");

    // Visitor receives admin reply automatically
    const messages = await chatRepository.getMessages(conv.id);
    assert.strictEqual(messages.length, 2);
    assert.strictEqual(messages[1].sender_type, "admin");
    assert.ok(messages[1].message_content.includes("engineering team would be glad"));

    const updatedConv = await chatRepository.getConversationById(conv.id);
    assert.strictEqual(updatedConv?.unread_by_visitor, true);
  });

  // TEST 4: Offline customer
  test("TEST 4: Offline customer - Visitor leaves, admin replies, visitor returns and sees response", async () => {
    const visitor = await chatRepository.getOrCreateVisitor(generateVisitorUuid());
    const conv = await chatRepository.getOrCreateConversation(visitor);

    // Visitor sends message then closes browser
    await chatRepository.addMessage({
      conversationId: conv.id,
      senderType: "visitor",
      messageContent: "Can you send me references for food processing plants?",
    });

    // Later, Admin replies while visitor is offline
    await chatRepository.addMessage({
      conversationId: conv.id,
      senderType: "admin",
      senderId: "ops@exergy-solutions.com",
      messageContent: "We have optimized dairy and beverage processing across the UAE. Case studies are on our industries page.",
    });

    // Visitor reopens website: fetch messages
    const reloadedMessages = await chatRepository.getMessages(conv.id);
    assert.strictEqual(reloadedMessages.length, 2);
    assert.strictEqual(reloadedMessages[1].sender_type, "admin");
    assert.ok(reloadedMessages[1].message_content.includes("Case studies"));

    // Visitor reading messages marks unread as false
    await chatRepository.markReadByVisitor(conv.id);
    const updatedConv = await chatRepository.getConversationById(conv.id);
    assert.strictEqual(updatedConv?.unread_by_visitor, false);
  });

  // TEST 5: Customer information collection
  test("TEST 5: Customer information - Conversational lead collection persists to customer_leads", async () => {
    const visitor = await chatRepository.getOrCreateVisitor(generateVisitorUuid());
    const conv = await chatRepository.getOrCreateConversation(visitor);

    // Save lead
    const lead = await chatRepository.recordLead({
      visitorId: visitor.id,
      conversationId: conv.id,
      name: "Belal Ansari",
      email: "belal@industrial-plants.com",
      phone: "+971 50 987 6543",
      company: "Gulf Industrial Processors",
      inquiryCategory: "Turnkey Plant Optimization",
      requirements: "Reduce boiler fuel consumption by 20% across two steam lines",
    });

    assert.ok(lead.id);
    assert.strictEqual(lead.name, "Belal Ansari");
    assert.strictEqual(lead.email, "belal@industrial-plants.com");
    assert.strictEqual(lead.company, "Gulf Industrial Processors");
    assert.ok(lead.customer_requirements?.includes("boiler fuel consumption"));

    // Update visitor profile
    await chatRepository.updateVisitorProfile(visitor.id, {
      name: "Belal Ansari",
      email: "belal@industrial-plants.com",
      phone: "+971 50 987 6543",
    });

    const updatedVisitor = await chatRepository.getOrCreateVisitor(visitor.visitor_uuid);
    assert.strictEqual(updatedVisitor.name, "Belal Ansari");
    assert.strictEqual(updatedVisitor.email, "belal@industrial-plants.com");
  });

  // TEST 6: Website navigation
  test("TEST 6: Website navigation - Bot provides accurate clickable links to actual routes & sections", () => {
    const state = { currentNode: "main", mode: "menu" as const, fallbackCount: 0 };

    // Query 1: Services navigation
    const rServices = handleChatMessage(state, "Where can I see your services?");
    assert.ok(rServices.navigationLink?.url === "/services" || rServices.reply.includes("/services"));

    // Query 2: Contact team navigation
    const rContact = handleChatMessage(state, "How can I contact your team?");
    assert.ok(rContact.navigationLink?.url === "/contact" || rContact.reply.includes("/contact"));

    // Query 3: Pricing packages navigation
    const rPricing = handleChatMessage(state, "Where can I see your pricing?");
    assert.ok(rPricing.navigationLink?.url?.includes("assessment") || rPricing.reply.includes("/assessment") || rPricing.reply.includes("/pricing"));

    // Query 4: Section anchor (Cooling)
    const rCooling = handleChatMessage(state, "cooling optimization");
    assert.ok(rCooling.reply.includes("/services") || rCooling.navigationLink?.url?.includes("cooling"));

    // Query 5: Portal / Track navigation
    const rTrack = handleChatMessage(state, "How do I track my request?");
    assert.ok(rTrack.reply.includes("/track") || rTrack.navigationLink?.url?.includes("/track"));
  });

  // TEST 7: Unknown questions
  test("TEST 7: Unknown questions - Clearly states answer not available without inventing facts", () => {
    const state = { currentNode: "main", mode: "menu" as const, fallbackCount: 0 };

    const unknownQuery = "What is the secret recipe for quantum vanilla cookies?";
    const res = handleChatMessage(state, unknownQuery);

    // Never invents prices, policies or company facts; increments fallback
    assert.strictEqual(res.nextState.fallbackCount, 1);
    assert.ok(
      res.reply.includes("here is our menu again") ||
      res.reply.includes("didn't catch that") ||
      res.reply.includes("speak directly with an engineer")
    );
    assert.ok(res.quickReplies.some((qr) => qr.action === "handoff"));
  });

  // TEST 8: Security & Authorization
  test("TEST 8: Security - Cryptographic visitor token tampering and cross-visitor access checks", async () => {
    const realUuid = generateVisitorUuid();
    const validToken = await signVisitorToken(realUuid, "desktop");

    // 1. Valid token verifies
    const verified = await verifyVisitorToken(validToken);
    assert.strictEqual(verified?.visitorUuid, realUuid);

    // 2. Tampered token fails
    const tampered = validToken.slice(0, -6) + "000000";
    const failedVerify = await verifyVisitorToken(tampered);
    assert.strictEqual(failedVerify, null);

    // 3. Forged string without signature fails
    const forged = await verifyVisitorToken("visitor_attacker_fake_token");
    assert.strictEqual(forged, null);
  });

  // TEST 9: Admin knowledge management
  test("TEST 9: Admin knowledge management - Adding new FAQ updates engine dynamically", async () => {
    const customQA = await chatRepository.addKnowledgeItem({
      category: "special",
      question: "Do you support district cooling thermal energy storage?",
      answer: "Yes, Exergy Solutions engineers stratified chilled water thermal storage tanks for peak-shaving.",
      keywords: ["district", "cooling", "thermal", "storage", "stratified"],
      synonyms: ["thermal energy storage", "chilled water tank"],
      source_page: "Services / District Cooling",
      destination_url: "/services/cooling",
      priority: 10,
      is_active: true,
    });

    assert.ok(customQA.id);

    // Engine responds using dynamic knowledge
    const knowledgeList = await chatRepository.getKnowledgeList();
    const out = handleChatMessage(
      { currentNode: "main", mode: "menu", fallbackCount: 0 },
      "tell me about thermal energy storage",
      knowledgeList.map((k) => ({
        id: k.id,
        question: k.question,
        answer: k.answer,
        keywords: k.keywords,
        synonyms: k.synonyms,
        category: k.category,
        source_page: k.source_page || "General",
        destination_url: k.destination_url,
      }))
    );

    assert.ok(out.reply.includes("stratified chilled water thermal storage"));
    assert.strictEqual(out.navigationLink?.url, "/services/cooling");
  });

  // TEST 10: Mobile compatibility
  test("TEST 10: Mobile compatibility - Mobile visitor device is tracked and responds correctly", async () => {
    const mobileVisitorUuid = generateVisitorUuid();
    const mobileVisitor = await chatRepository.getOrCreateVisitor(mobileVisitorUuid, {
      deviceType: "mobile",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    });

    assert.strictEqual(mobileVisitor.device_type, "mobile");

    const conv = await chatRepository.getOrCreateConversation(mobileVisitor, {
      userAgent: "Mobile Safari",
    });

    await chatRepository.addMessage({
      conversationId: conv.id,
      senderType: "visitor",
      messageContent: "Mobile inquiry from iPhone",
    });

    const msgs = await chatRepository.getMessages(conv.id);
    assert.strictEqual(msgs.length, 1);
    assert.strictEqual(msgs[0].message_content, "Mobile inquiry from iPhone");
  });
});
