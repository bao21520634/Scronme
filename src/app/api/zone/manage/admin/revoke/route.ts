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

        const zone = await db.zone.findFirst({
            where: {
                id: zoneId,
                creatorId: session.user.id,
            },
        });

        if (!zone) {
            return new Response("You're not creator", {
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
                role: 'GUEST',
            },
        });

        return new Response(zoneId);
    } catch (error) {
        error;
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 });
        }

        return new Response(
            'Could not grant this user at this time. Please try later',
            { status: 500 },
        );
    }
}
