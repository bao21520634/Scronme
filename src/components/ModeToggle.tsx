'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { capitalize } from '@/lib/utils';

import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/Card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Themes</CardTitle>
                <CardDescription>
                    Please change a theme you are comfortable with.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative grid gap-1">
                    <Label className="sr-only" htmlFor="name">
                        Themes
                    </Label>
                    <div className="font-medium">{capitalize(theme)}</div>
                </div>
            </CardContent>

            <CardFooter>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="bottom" align="start">
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('system')}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    );
}
