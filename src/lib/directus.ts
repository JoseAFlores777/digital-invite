// Barrel file to keep Directus responsibilities separated
// Interfaces
export type { InvitationContent, Guest } from "@/lib/directus-interfaces";

// Client
export { getDirectusClient } from "@/server/directus-client";

// Services
export { getInvitationContent } from "@/server/services/invitation.service";
export { getDigitalGuests } from "@/server/services/guests.service";
