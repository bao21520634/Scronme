'use client';

import {
    BanIcon,
    Loader2,
    SlidersHorizontalIcon,
    UserPenIcon,
    XIcon,
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
import { useMutation } from '@tanstack/react-query';
import { GrantZoneAccessPayload } from '@/lib/validators/zone';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

const GrantDropdown = ({ isCreator = false, zoneId, user, member }: any) => {
    const router = useRouter();

    var { mutate: grantAdmin, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: GrantZoneAccessPayload = {
                zoneId,
                subscriberId: member.user.id,
            };

            const { data } = await axios.post(
                '/api/zone/manage/admin/grant',
                payload,
            );
            return data as string;
        },
        onError: () => {
            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            });
            toast({
                title: 'Success!',
                description: `${member.user.username} is Admin of z/`,
            });
        },
    });

    var { mutate: revokeAdmin, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: GrantZoneAccessPayload = {
                zoneId,
                subscriberId: member.user.id,
            };

            const { data } = await axios.post(
                '/api/zone/manage/admin/revoke',
                payload,
            );
            return data as string;
        },
        onError: () => {
            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            });
            toast({
                title: 'Success!',
                description: `${member.user.username} is Guest of z/`,
            });
        },
    });

    var { mutate: grantMod, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: GrantZoneAccessPayload = {
                zoneId,
                subscriberId: member.user.id,
            };

            const { data } = await axios.post(
                '/api/zone/manage/moderator/grant',
                payload,
            );
            return data as string;
        },
        onError: () => {
            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            });
            toast({
                title: 'Success!',
                description: `${member.user.username} is Mod of z/`,
            });
        },
    });

    var { mutate: revokeMod, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: GrantZoneAccessPayload = {
                zoneId,
                subscriberId: member.user.id,
            };

            const { data } = await axios.post(
                '/api/zone/manage/moderator/revoke',
                payload,
            );
            return data as string;
        },
        onError: () => {
            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            });
            toast({
                title: 'Success!',
                description: `${member.user.username} is Guest of z/`,
            });
        },
    });

    var { mutate: removeUser, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: GrantZoneAccessPayload = {
                zoneId,
                subscriberId: member.user.id,
            };

            const { data } = await axios.post(
                '/api/zone/manage/user/remove',
                payload,
            );
            return data as string;
        },
        onError: () => {
            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            });
            toast({
                title: 'Success!',
                description: `${member.user.username} is removed from z/`,
            });
        },
    });

    var { mutate: banUser, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: GrantZoneAccessPayload = {
                zoneId,
                subscriberId: member.user.id,
            };

            const { data } = await axios.post(
                '/api/zone/manage/user/ban',
                payload,
            );
            return data as string;
        },
        onError: () => {
            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            });
            toast({
                title: 'Success!',
                description: `${member.user.username} is banned from z/`,
            });
        },
    });

    var { mutate: unbanUser, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: GrantZoneAccessPayload = {
                zoneId,
                subscriberId: member.user.id,
            };

            const { data } = await axios.post(
                '/api/zone/manage/user/unban',
                payload,
            );
            return data as string;
        },
        onError: () => {
            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            });
            toast({
                title: 'Success!',
                description: `${member.user.username} is unbanned from z/`,
            });
        },
    });

    if (isLoading) {
        return <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />;
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <button className="hover:bg-zinc-100 dark:hover:bg-zinc-600 p-2 rounded-full">
                    <SlidersHorizontalIcon className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    {(isCreator || user.role === 'ADMIN') && (
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="gap-2">
                                <UserPenIcon className="w-4 h-4" />
                                Grant permissions
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {isCreator && (
                                        <>
                                            {member.role !== 'ADMIN' && (
                                                <DropdownMenuItem
                                                    onClick={() => grantAdmin()}
                                                >
                                                    <span>Change to Admin</span>
                                                </DropdownMenuItem>
                                            )}
                                            {member.role === 'ADMIN' && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        revokeAdmin()
                                                    }
                                                >
                                                    <span>Revoke Admin</span>
                                                </DropdownMenuItem>
                                            )}
                                        </>
                                    )}

                                    <DropdownMenuSeparator />

                                    {(isCreator || user.role === 'ADMIN') && (
                                        <>
                                            {member.role !== 'MODERATOR' && (
                                                <DropdownMenuItem
                                                    onClick={() => grantMod()}
                                                >
                                                    <span>
                                                        Change to Moderator
                                                    </span>
                                                </DropdownMenuItem>
                                            )}
                                            {member.role === 'MODERATOR' && (
                                                <DropdownMenuItem
                                                    onClick={() => revokeMod()}
                                                >
                                                    <span>
                                                        Revoke Moderator
                                                    </span>
                                                </DropdownMenuItem>
                                            )}
                                        </>
                                    )}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    )}

                    <DropdownMenuSeparator />

                    {(isCreator ||
                        (user.role === 'ADMIN' && member.role !== 'ADMIN')) && (
                        <DropdownMenuItem
                            className="gap-2"
                            onClick={() => removeUser()}
                        >
                            <XIcon className="w-4 h-4" />
                            Remove User
                        </DropdownMenuItem>
                    )}
                    {(isCreator ||
                        (user.role === 'ADMIN' && member.role !== 'ADMIN')) &&
                        member.role !== 'BANNED' && (
                            <DropdownMenuItem
                                className="gap-2 bg-red-700 text-white"
                                onClick={() => banUser()}
                            >
                                <BanIcon className="w-4 h-4" />
                                Ban User
                            </DropdownMenuItem>
                        )}
                    {(isCreator ||
                        (user.role === 'ADMIN' && member.role !== 'ADMIN')) &&
                        member.role === 'BANNED' && (
                            <DropdownMenuItem
                                className="gap-2 bg-red-700 text-white"
                                onClick={() => unbanUser()}
                            >
                                <BanIcon className="w-4 h-4" />
                                Unban User
                            </DropdownMenuItem>
                        )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default GrantDropdown;
