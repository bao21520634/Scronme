'use client';

import { Prisma, Zone } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/Command';
import { Users } from 'lucide-react';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
    const [input, setInput] = useState<string>('');
    const pathname = usePathname();
    const commandRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const request = debounce(async () => {
        refetch();
    }, 300);

    const debounceRequest = useCallback(() => {
        request();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        isFetching,
        data: queryResults,
        refetch,
        isFetched,
    } = useQuery({
        queryFn: async () => {
            if (!input) return [];
            const { data } = await axios.get(`/api/search?q=${input}`);
            return data as (Zone & {
                _count: Prisma.ZoneCountOutputType;
            })[];
        },
        queryKey: ['search-query'],
        enabled: false,
    });

    useEffect(() => {
        setInput('');
    }, [pathname]);

    return (
        <Command
            ref={commandRef}
            className="relative bg-white dark:bg-[#313131] rounded-lg border max-w-lg z-50 overflow-visible"
        >
            <CommandInput
                isLoading={isFetching}
                onValueChange={(text) => {
                    setInput(text);
                    debounceRequest();
                }}
                value={input}
                className="outline-none border-none focus:border-none focus:outline-none ring-0"
                placeholder="Search communities..."
            />

            {input.length > 0 && (
                <CommandList className="absolute bg-white dark:bg-[#313131] top-full inset-x-0 shadow rounded-b-md">
                    {isFetched && (
                        <CommandEmpty>No results found.</CommandEmpty>
                    )}
                    {(queryResults?.length ?? 0) > 0 ? (
                        <CommandGroup heading="Communities">
                            {queryResults?.map((zone) => (
                                <CommandItem
                                    onSelect={() => {
                                        router.push(`/z/${zone.name}`);
                                        router.refresh();
                                    }}
                                    key={zone.id}
                                    value={zone.name}
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    <a href={`/z/${zone.name}`}>
                                        z/{zone.name}
                                    </a>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ) : null}
                </CommandList>
            )}
        </Command>
    );
};

export default SearchBar;
