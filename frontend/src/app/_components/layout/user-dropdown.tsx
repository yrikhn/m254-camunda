"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { Session } from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import * as React from "react";

export default function UserDropdown({ session }: { session: Session }) {
    const { name, email, image } = session?.user || {};
    const [openPopover, setOpenPopover] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        onClick={() => setOpenPopover(!openPopover)}
                        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
                    >
                        <Image
                            alt={email || "User"}
                            src={
                                image || `https://avatars.dicebear.com/api/micah/${email}.svg`
                            }
                            width={40}
                            height={40}
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account ({name})</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        {/*<Button onClick={() => signOut()}>*/}
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                        {/*</Button>*/}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}