import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ZoneSubscriptionValidator } from '@/lib/validators/zone';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { zoneId } = ZoneSubscriptionValidator.parse(body);

        // check if user has already subscribed or not
        const subscriptionExists = await db.subscription.findFirst({
            where: {
                zoneId,
                userId: session.user.id,
            },
        });

        if (!subscriptionExists) {
            return new Response(
                "You've not been subscribed to this zone, yet.",
                {
                    status: 400,
                },
            );
        }

        // create zone and associate it with the user
        await db.subscription.delete({
            where: {
                userId_zoneId: {
                    zoneId,
                    userId: session.user.id,
                },
            },
        });

        return new Response(zoneId);
    } catch (error) {
        error;
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 });
        }

        return new Response(
            'Could not unsubscribe from zone at this time. Please try later',
            { status: 500 },
        );
    }
}
