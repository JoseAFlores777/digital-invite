export type GuestStatus = "unknown" | "accepted" | "declined";
export type InvitationStatus =
  | "draft"
  | "sent"
  | "bounced"
  | "accepted_all"
  | "accepted_partial"
  | "declined_all";

export async function fetchInvitationById(id: string) {
  const res = await fetch(`/api/invitation-by-id?id=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("failed_to_fetch_invitation");
  return (await res.json()).invitation as any;
}

export async function patchGuestStatus(guestId: string, status: GuestStatus) {
  const map: Record<GuestStatus, string> = {
    unknown: "unknown",
    accepted: "accepted",
    declined: "declined",
  };
  const payload = { guestId, rsvp_status: map[status] };
  const res = await fetch("/api/guest-status", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("failed_to_update_status");
  return await res.json();
}

export async function fetchWeddingGeneralities(weddingId: string) {
  const params = new URLSearchParams();
  if (weddingId) params.set("wedding_id", weddingId);
  const res = await fetch(`/api/wedding-generalities?${params.toString()}`);
  if (!res.ok) throw new Error("failed_to_fetch_wedding");
  return await res.json();
}

export async function patchInvitationStatus(invitationId: string, status: InvitationStatus) {
  const res = await fetch("/api/invitation-status", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ invitationId, status }),
  });
  if (!res.ok) throw new Error("failed_to_update_invitation_status");
  return await res.json();
}

export async function patchInvitationDeadline(invitationId: string, rsvp_deadline: string | null) {
  const res = await fetch("/api/invitation-deadline", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ invitationId, rsvp_deadline }),
  });
  if (!res.ok) throw new Error("failed_to_update_invitation_deadline");
  return await res.json();
}
