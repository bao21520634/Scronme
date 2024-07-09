import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

export async function GET(req: Request) {
    const url = new URL(req.url);

    const session = await getAuthSession();

    let followedCommunitiesIds: string[] = [];

    if (session) {
        const followedCommunities = await db.subscription.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                zone: true,
            },
        });

        followedCommunitiesIds = followedCommunities.map((sub) => sub.zone.id);
    }

    try {
        const { limit, page, zoneName } = z
            .object({
                limit: z.string(),
                page: z.string(),
                zoneName: z.string().nullish().optional(),
            })
            .parse({
                zoneName: url.searchParams.get('zoneName'),
                limit: url.searchParams.get('limit'),
                page: url.searchParams.get('page'),
            });

        let whereClause = {};

        if (zoneName) {
            whereClause = {
                zone: {
                    name: zoneName,
                },
            };
        } else if (session) {
            whereClause = {
                zone: {
                    id: {
                        in: followedCommunitiesIds,
                    },
                },
            };
        }

        const posts = await db.post.findMany({
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                zone: true,
                votes: true,
                author: true,
                comments: true,
            },
            where: whereClause,
        });

        return new Response(JSON.stringify(posts));
    } catch (error) {
        return new Response('Could not fetch posts', { status: 500 });
    }
}
