import { signIn } from "next-auth/react";
import React, { useCallback, useMemo, useState, } from "react";
import { Github, Google, LoadingDots } from "~/app/_components/shared/icons";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "~/app/_components/ui/dialog";
import { Button } from "~/app/_components/ui/button";

const SignInModal = () => {
    const [signInClicked, setSignInClicked] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Sign In</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                    {/*<DialogDescription>*/}
                    {/*  This action cannot be undone. This will permanently delete your account*/}
                    {/*  and remove your data from our servers.*/}
                    {/*</DialogDescription>*/}
                </DialogHeader>
                <Button
                    disabled={signInClicked}
                    onClick={() => {
                        setSignInClicked(true);
                        signIn("google");
                    }}
                >
                    {signInClicked ? (
                        <LoadingDots color="#808080"/>
                    ) : (
                        <>
                            <Google className="h-5 w-5"/>
                            <p>&nbsp;Sign In with Google</p>
                        </>
                    )}
                </Button>
                <Button
                    disabled={signInClicked}
                    onClick={() => {
                        setSignInClicked(true);
                        signIn("github");
                    }}
                >
                    {signInClicked ? (
                        <LoadingDots color="#808080"/>
                    ) : (
                        <>
                            <Github className="h-5 w-5"/>
                            <p>&nbsp;Sign In with Github</p>
                        </>
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export function useSignInModal() {
    const [showSignInModal, setShowSignInModal] = useState(false);

    const SignInModalCallback = useCallback(() => {
        return <SignInModal/>;
    }, []);

    return useMemo(
        () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
        [setShowSignInModal, SignInModalCallback],
    );
}