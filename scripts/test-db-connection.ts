import { createClient } from "@supabase/supabase-js";
import * as fs from "node:fs";
import * as path from "node:path";

// Load .env.local if not already in process.env
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://twwdvliikafbtvzsotks.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, serviceKey);

async function testData() {
  const { data: services } = await supabase.from("services").select("slug, title");
  console.log("Services count:", services?.length || 0);

  const { data: industries } = await supabase.from("industries").select("slug, name");
  console.log("Industries count:", industries?.length || 0);

  const { data: qa } = await supabase.from("chat_qa_bank").select("id, question");
  console.log("Chat Q&A count:", qa?.length || 0);

  const { data: settings } = await supabase.from("site_settings").select("key");
  console.log("Site settings keys:", settings?.map((s) => s.key) || []);

  const { data: leads } = await supabase.from("leads").select("*");
  console.log("Leads count:", leads?.length || 0);
}

testData();
