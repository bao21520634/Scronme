import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    };
}

const page = async ({ params }: PageProps) => {
    const { slug } = params;

    const session = await getAuthSession();

    const zone = await db.zone.findFirst({
        where: { name: slug },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    zone: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: INFINITE_SCROLL_PAGINATION_RESULTS,
            },
        },
    });

    if (!zone) return notFound();

    return (
        <>
            <h1 className="font-bold text-3xl md:text-4xl h-14">
                z/{zone.name}
            </h1>
            <MiniCreatePost session={session} />
            <PostFeed initialPosts={zone.posts} zoneName={zone.name} />
        </>
    );
};

export default page;
