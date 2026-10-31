import { NextResponse } from "next/server";
import { assertAdminAuthorized } from "@/app/actions/admin-auth";
import { chatRepository } from "@/lib/chat/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const knowledge = await chatRepository.getKnowledgeList();
    return NextResponse.json({ success: true, knowledge });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load knowledge entries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Only founders and admins can edit chatbot knowledge
    await assertAdminAuthorized(["founder", "admin"]);
    const body = await req.json();
    const { action, id, item, updates } = body;

    if (action === "add") {
      if (!item?.question || !item?.answer) {
        return NextResponse.json(
          { success: false, error: "Question and answer are required." },
          { status: 400 }
        );
      }
      const created = await chatRepository.addKnowledgeItem({
        category: item.category || "general",
        question: item.question.trim(),
        keywords: Array.isArray(item.keywords) ? item.keywords : [],
        synonyms: Array.isArray(item.synonyms) ? item.synonyms : [],
        answer: item.answer.trim(),
        destination_url: item.destination_url || undefined,
        is_active: item.is_active !== false,
        priority: typeof item.priority === "number" ? item.priority : 5,
        source_page: item.source_page || "General",
      });
      return NextResponse.json({ success: true, item: created });
    }

    if (action === "update") {
      if (!id || !updates) {
        return NextResponse.json(
          { success: false, error: "Missing entry ID or update fields." },
          { status: 400 }
        );
      }
      const updated = await chatRepository.updateKnowledgeItem(id, updates);
      return NextResponse.json({ success: true, item: updated });
    }

    if (action === "delete") {
      if (!id) {
        return NextResponse.json(
          { success: false, error: "Missing entry ID to delete." },
          { status: 400 }
        );
      }
      const deleted = await chatRepository.deleteKnowledgeItem(id);
      return NextResponse.json({ success: true, deleted });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Supported: add, update, delete" },
      { status: 400 }
    );
  } catch (error: any) {
    const isAuthError =
      error?.message?.includes("Unauthorized") || error?.message?.includes("Forbidden");
    return NextResponse.json(
      { success: false, error: error.message || "Failed to modify knowledge" },
      { status: isAuthError ? 403 : 500 }
    );
  }
}
