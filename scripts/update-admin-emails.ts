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

async function updateEmails() {
  console.log("Connecting to Supabase at:", supabaseUrl);

  // 1. Check current admin_users
  const { data: currentAdmins, error: fetchErr } = await supabase.from("admin_users").select("*");
  if (fetchErr) {
    console.error("Error fetching admin_users:", fetchErr);
    return;
  }
  console.log("Current admin users in DB:", currentAdmins.map((u) => ({ email: u.email, role: u.role, name: u.full_name })));

  // 2. Update neuralwaves.official@gmail.com -> sarfraz@exergy-solutions.com
  const nwUser = currentAdmins.find((u) => u.email === "neuralwaves.official@gmail.com");
  if (nwUser) {
    const { error: updErr } = await supabase
      .from("admin_users")
      .update({
        email: "sarfraz@exergy-solutions.com",
        full_name: "Sarfraz",
        role: "founder",
      })
      .eq("id", nwUser.id);
    if (updErr) console.error("Error updating neuralwaves user:", updErr);
    else console.log("Updated neuralwaves.official@gmail.com -> sarfraz@exergy-solutions.com");
  } else {
    // Check if sarfraz already exists
    const exists = currentAdmins.some((u) => u.email === "sarfraz@exergy-solutions.com");
    if (!exists) {
      const { error: insErr } = await supabase.from("admin_users").insert({
        email: "sarfraz@exergy-solutions.com",
        full_name: "Sarfraz",
        role: "founder",
        is_active: true,
        password_hash: "ExergyFnd1",
      });
      if (insErr) console.error("Error inserting sarfraz user:", insErr);
      else console.log("Inserted new founder user: sarfraz@exergy-solutions.com");
    }
  }

  // 3. Update support@neuralwaves.in -> info@exergy-solutions.com
  const supportUser = currentAdmins.find((u) => u.email === "support@neuralwaves.in");
  if (supportUser) {
    const { error: updErr } = await supabase
      .from("admin_users")
      .update({
        email: "info@exergy-solutions.com",
        full_name: "Operations Admin",
        role: "admin",
      })
      .eq("id", supportUser.id);
    if (updErr) console.error("Error updating support user:", updErr);
    else console.log("Updated support@neuralwaves.in -> info@exergy-solutions.com");
  } else {
    const exists = currentAdmins.some((u) => u.email === "info@exergy-solutions.com");
    if (!exists) {
      const { error: insErr } = await supabase.from("admin_users").insert({
        email: "info@exergy-solutions.com",
        full_name: "Operations Admin",
        role: "admin",
        is_active: true,
        password_hash: "ExergyAdmin123!",
      });
      if (insErr) console.error("Error inserting info user:", insErr);
      else console.log("Inserted new admin user: info@exergy-solutions.com");
    }
  }

  // 4. Update site_settings
  await supabase
    .from("site_settings")
    .update({ value: ["sarfraz@exergy-solutions.com", "info@exergy-solutions.com"] })
    .eq("key", "notify_emails");

  await supabase
    .from("site_settings")
    .update({
      value: {
        address: "334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE",
        email: "info@exergy-solutions.com",
        phone: "+971 50 123 4567",
        admin_contact: "sarfraz@exergy-solutions.com",
      },
    })
    .eq("key", "contact_info");

  console.log("Updated site_settings notify_emails and contact_info");

  // 5. Verify final admin_users
  const { data: finalAdmins } = await supabase.from("admin_users").select("*");
  console.log("Final admin users in DB:", finalAdmins?.map((u) => ({ email: u.email, role: u.role, name: u.full_name })));
}

updateEmails();
