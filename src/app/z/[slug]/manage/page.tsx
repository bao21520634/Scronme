import { db } from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { capitalize } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import {
    SlidersHorizontalIcon,
    BanIcon,
    XIcon,
    UserPenIcon,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { getAuthSession } from '@/lib/auth';

interface pageProps {
    params: {
        slug: string;
    };
}

const Options = ({ isCreator = false, user, member }: any) => {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <button className="hover:bg-zinc-100 dark:hover:bg-zinc-600 p-2 rounded-full">
                    <SlidersHorizontalIcon className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    {(isCreator || user === 'ADMIN') && (
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="gap-2">
                                <UserPenIcon className="w-4 h-4" />
                                Grant permissions
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {isCreator && (
                                        <>
                                            <DropdownMenuItem>
                                                <span>Set Admin</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span>Remove Admin</span>
                                            </DropdownMenuItem>
                                        </>
                                    )}

                                    <DropdownMenuSeparator />

                                    {(isCreator || user === 'ADMIN') && (
                                        <>
                                            <DropdownMenuItem>
                                                <span>Set Moderator</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span>Remove Moderator</span>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    )}

                    <DropdownMenuSeparator />

                    {(isCreator ||
                        (user === 'ADMIN' && member !== 'ADMIN')) && (
                        <DropdownMenuItem className="gap-2">
                            <XIcon className="w-4 h-4" />
                            Remove user
                        </DropdownMenuItem>
                    )}
                    {(isCreator ||
                        (user === 'ADMIN' && member !== 'ADMIN')) && (
                        <DropdownMenuItem className="gap-2 bg-red-700 text-white">
                            <BanIcon className="w-4 h-4" />
                            Ban user
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

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
                                            <Options
                                                isCreator={
                                                    zone.creatorId ===
                                                    session?.user.id
                                                }
                                                user={user.role}
                                                member={sub.role}
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
