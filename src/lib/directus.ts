// Barrel file to keep Directus responsibilities separated
// Interfaces
export type * as DirectusTypes from "@/lib/directus-interfaces";

// Client
export { getDirectusClient } from "@/server/directus-client";

// Services
export { getInvitationContent } from "@/server/services/invitation.service";
export { getDigitalGuestsRx } from "@/server/services/guests.service";
