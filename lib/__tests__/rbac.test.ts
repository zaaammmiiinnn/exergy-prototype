import { describe, test } from "node:test";
import assert from "node:assert";

// Permission helper matching sidebar & middleware logic
export function canAccessAdminRoute(role: string, route: string): boolean {
  const normalizedRole = (role || "employee").toLowerCase().trim();
  if (normalizedRole === "employee") {
    if (route === "/admin") return true;
    return ["/admin/leads", "/admin/chats"].some(
      (allowed) => route === allowed || route.startsWith(allowed + "/")
    );
  }

  // founder and admin have access to all routes
  return true;
}

export function getVisibleAdminSidebarLinks(role: string): string[] {
  const allRoutes = [
    "/admin",
    "/admin/leads",
    "/admin/chats",
    "/admin/chatbot",
    "/admin/services",
    "/admin/industries",
    "/admin/settings",
  ];
  return allRoutes.filter((route) => canAccessAdminRoute(role, route));
}

describe("RBAC Permissions Matrix", () => {
  test("1. Founder has access to all links including Settings and Chatbot", () => {
    const routes = getVisibleAdminSidebarLinks("founder");
    assert.ok(routes.includes("/admin"));
    assert.ok(routes.includes("/admin/leads"));
    assert.ok(routes.includes("/admin/chats"));
    assert.ok(routes.includes("/admin/chatbot"));
    assert.ok(routes.includes("/admin/settings"));
    assert.strictEqual(canAccessAdminRoute("founder", "/admin/settings"), true);
    assert.strictEqual(canAccessAdminRoute("founder", "/admin/chatbot"), true);
  });

  test("2. Admin has access to all links including Settings and Chatbot", () => {
    const routes = getVisibleAdminSidebarLinks("admin");
    assert.ok(routes.includes("/admin"));
    assert.ok(routes.includes("/admin/leads"));
    assert.ok(routes.includes("/admin/chats"));
    assert.ok(routes.includes("/admin/chatbot"));
    assert.ok(routes.includes("/admin/settings"));
    assert.strictEqual(canAccessAdminRoute("admin", "/admin/settings"), true);
    assert.strictEqual(canAccessAdminRoute("admin", "/admin/chatbot"), true);
  });

  test("3. Employee can only access Dashboard, Leads, and Chats; blocked from Settings and Chatbot", () => {
    const routes = getVisibleAdminSidebarLinks("employee");
    assert.deepStrictEqual(routes, ["/admin", "/admin/leads", "/admin/chats"]);
    assert.strictEqual(canAccessAdminRoute("employee", "/admin/settings"), false);
    assert.strictEqual(canAccessAdminRoute("employee", "/admin/chatbot"), false);
    assert.strictEqual(canAccessAdminRoute("employee", "/admin/settings/security"), false);
    assert.strictEqual(canAccessAdminRoute("employee", "/admin/leads"), true);
    assert.strictEqual(canAccessAdminRoute("employee", "/admin"), true);
  });
});
