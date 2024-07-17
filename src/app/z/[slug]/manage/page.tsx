import { db } from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { capitalize } from '@/lib/utils';
import { getAuthSession } from '@/lib/auth';
import GrantDropdown from '@/components/GrantDropdown';

interface pageProps {
    params: {
        slug: string;
    };
}

const page = async ({ params }: pageProps) => {
    const session = await getAuthSession();

    const user = await db.subscription.findFirst({
        where: {
            zone: {
                name: params.slug,
            },
            user: {
                id: session?.user.id,
            },
        },
    });

    const zone = await db.zone.findFirst({
        where: {
            name: params.slug,
        },
    });

    if (!zone || user?.role === 'GUEST' || !user) return notFound();

    const subscriptions = await db.subscription.findMany({
        where: {
            zone: {
                name: params.slug,
            },
        },
        include: {
            user: true,
        },
        orderBy: { role: 'asc' },
    });

    return (
        <div className="flex flex-col items-start gap-6">
            {/* heading */}
            <div className="border-b border-gray-200 pb-5">
                <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                    <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Manage Members
                    </h3>
                    <p className="ml-2 mt-1 truncate text-sm text-gray-500">
                        in z/{params.slug}
                    </p>
                </div>
            </div>
            {subscriptions?.length && (
                <div className="min-w-full">
                    {subscriptions?.map((sub, index) => {
                        return (
                            <div
                                key={index}
                                className="bg-white dark:bg-black shadow rounded-sm mb-2"
                            >
                                <div className="inline-flex items-center min-w-full justify-between p-4">
                                    <div className="inline-flex items-center gap-4">
                                        <Avatar>
                                            <div className="relative aspect-square h-full w-full rounded-e-full">
                                                <Image
                                                    fill
                                                    src={sub.user.image || ''}
                                                    alt="profile picture"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">
                                                <span className="text-sm text-zinc-400">
                                                    u/
                                                </span>
                                                {sub.user.username}
                                            </h4>
                                            <span>{capitalize(sub.role)}</span>
                                        </div>
                                    </div>
                                    {zone.creatorId !== sub.userId &&
                                        session?.user.id !== sub.userId && (
                                            <GrantDropdown
                                                isCreator={
                                                    zone.creatorId ===
                                                    session?.user.id
                                                }
                                                zoneId={zone.id}
                                                user={user}
                                                member={sub}
                                            />
                                        )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default page;
