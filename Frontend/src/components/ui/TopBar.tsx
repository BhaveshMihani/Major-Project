/*************  ✨ Codeium Command ⭐  *************/

import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStores";
import { Link } from "react-router-dom";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

/**
 * The top bar of the app, containing the app name and user info.
 *
 * @returns The top bar component.
 */
const TopBar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 ">
      <div className="flex gap-2 items-center">
        <img src="./headphone1.png" alt="" className="size-12"/>
        <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">CHATTERTUNES</p>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
