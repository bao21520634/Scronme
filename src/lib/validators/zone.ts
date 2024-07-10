import { z } from 'zod';

export const ZoneValidator = z.object({
    name: z.string().min(3).max(21),
});

export const ZoneSubscriptionValidator = z.object({
    zoneId: z.string(),
});

export type CreateZonePayload = z.infer<typeof ZoneValidator>;
export type SubscribeToZonePayload = z.infer<typeof ZoneSubscriptionValidator>;