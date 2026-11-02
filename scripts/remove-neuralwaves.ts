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

async function purgeNeuralwaves() {
  console.log("Connecting to Supabase at:", supabaseUrl);

  // 1. Delete all neuralwaves from admin_users
  const { data: deletedUsers, error: delUserErr } = await supabase
    .from("admin_users")
    .delete()
    .ilike("email", "%neuralwaves%")
    .select();
  if (delUserErr) {
    console.error("Error deleting neuralwaves from admin_users:", delUserErr);
  } else {
    console.log("Deleted admin_users:", deletedUsers);
  }

  // 2. Also check if any full_name has neural waves
  const { data: deletedByName, error: delNameErr } = await supabase
    .from("admin_users")
    .delete()
    .ilike("full_name", "%neural%waves%")
    .select();
  if (!delNameErr && deletedByName && deletedByName.length > 0) {
    console.log("Deleted admin_users by name:", deletedByName);
  }

  // 3. Update site_settings notify_emails
  const cleanEmails = [
    "sarfraz@exergy-solutions.com",
    "aon.naqvi@exergy-solutions.com",
    "info@support.exergy-solutions.com"
  ];
  const { error: settingsErr } = await supabase
    .from("site_settings")
    .update({ value: cleanEmails })
    .eq("key", "notify_emails");
  if (settingsErr) {
    console.error("Error updating site_settings notify_emails:", settingsErr);
  } else {
    console.log("Updated site_settings notify_emails to company emails:", cleanEmails);
  }

  // 4. Clean customer_leads if any neuralwaves exist
  const { data: deletedLeads, error: delLeadsErr } = await supabase
    .from("customer_leads")
    .delete()
    .ilike("email", "%neuralwaves%")
    .select();
  if (!delLeadsErr && deletedLeads && deletedLeads.length > 0) {
    console.log("Deleted customer_leads with neuralwaves:", deletedLeads.length);
  }

  // 5. Verify final admin_users
  const { data: finalAdmins } = await supabase.from("admin_users").select("email, role, full_name");
  console.log("Final admin_users in DB:", finalAdmins);
}

purgeNeuralwaves().catch(console.error);

