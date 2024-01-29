"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "~/app/_components/ui/command";
import {Home, LogIn, LogOut, Play} from "lucide-react";
import {getSession, signIn, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {Session} from "next-auth";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [session, setSession] = React.useState<Session | null>(null);

    const router = useRouter()

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
        });
    }, []);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const navigate = (path: string) => {
        router.push(path);
        setOpen(false);
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..."/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Actions">
                    <CommandItem onSelect={() => navigate('/')}>
                        <Home className="mr-2 h-4 w-4"/>
                        <span>Home</span>
                    </CommandItem>
                    <CommandItem onSelect={() => navigate('/start-process')}>
                        <Play className="mr-2 h-4 w-4"/>
                        <span>Start Process</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator/>
                <CommandGroup heading="User">
                    {!session && <CommandItem onSelect={() => signIn()}>
                        <LogIn className="mr-2 h-4 w-4"></LogIn>
                        <span>Sign In</span>
                    </CommandItem>}
                    {session && <CommandItem onSelect={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4"></LogOut>
                        <span>Sign Out</span>
                    </CommandItem>}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}