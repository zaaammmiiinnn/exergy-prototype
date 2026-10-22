"use server";

export async function pingAction(payload?: string) {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  
  return {
    success: true,
    actionId: id,
    message: payload ? `Echo: ${payload}` : "Pong from Exergy Server Action",
    timestamp,
    notified: "sarfraz@exergy-solutions.com",
  };
}
