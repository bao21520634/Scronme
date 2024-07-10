import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ZoneValidator } from '@/lib/validators/zone';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { name } = ZoneValidator.parse(body);

        // check if zone already exists
        const zoneExists = await db.zone.findFirst({
            where: {
                name,
            },
        });

        if (zoneExists) {
            return new Response('Zone already exists', { status: 409 });
        }

        // create zone and associate it with the user
        const zone = await db.zone.create({
            data: {
                name,
                creatorId: session.user.id,
            },
        });

        // creator also has to be subscribed
        await db.subscription.create({
            data: {
                userId: session.user.id,
                zoneId: zone.id,
            },
        });

        return new Response(zone.name);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 });
        }

        return new Response('Could not create zone', { status: 500 });
    }
}
