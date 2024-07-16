import { z } from 'zod';

export const SubscriptionValidator = z.object({
    zoneId: z.string(),
});

export type SubscribeToZonePayload = z.infer<typeof SubscriptionValidator>;
