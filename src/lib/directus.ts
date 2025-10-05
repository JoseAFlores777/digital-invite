// Barrel file to keep Directus responsibilities separated
// Interfaces
export type * as DirectusTypes from "@/lib/directus-interfaces";

// Client
export { getDirectusClient } from "@/server/directus-client";

// Services
export { getInvitationContent } from "@/server/services/invitation.service";
export { getDigitalGuests } from "@/server/services/guests.service";
export { getWeddingInvitations, getInvitationById } from "@/server/services/invitations.service";
export { getWeddingById } from "@/server/services/weddings.service";
