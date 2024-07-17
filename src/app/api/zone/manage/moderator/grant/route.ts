import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ZoneMemberValidator } from '@/lib/validators/zone';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { subscriberId, zoneId } = ZoneMemberValidator.parse(body);

        // check if user has already subscribed or not
        const subscription = await db.subscription.findFirst({
            where: {
                zoneId,
                userId: subscriberId,
            },
        });

        if (subscription?.role !== 'ADMIN') {
            return new Response("You'r not Admin", {
                status: 400,
            });
        }

        // create zone and associate it with the user
        await db.subscription.update({
            where: {
                userId_zoneId: {
                    zoneId,
                    userId: subscriberId,
                },
            },
            data: {
                role: 'MODERATOR',
            },
        });

        return new Response(zoneId);
    } catch (error) {
        error;
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 });
        }

        return new Response(
            'Could not remove this user from zone at this time. Please try later',
            { status: 500 },
        );
    }
}
