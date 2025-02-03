import { SignedOut, UserButton, SignIn, SignUp } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "./ui/button";

const TopBar = () => {
  const { isAdmin } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // 'signin' or 'signup'

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 ">
      <div className="flex gap-2 items-center">
        <img src="./headphone1.png" alt="" className="size-12" />
        <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          CHATTERTUNES
        </p>
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
          <button
            onClick={() => setShowAuthModal(true)}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Sign In
          </button>
        </SignedOut>

        <UserButton />

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {authMode === "signin" ? "Sign In" : "Sign Up"}
                </h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-zinc-400 hover:text-zinc-200"
                >
                  &times;
                </button>
              </div>

              {authMode === "signin" ? (
                <SignIn
                  appearance={{
                    elements: {
                      formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
                      formFieldInput: "border border-zinc-700 rounded-md p-2",
                    },
                  }}
                />
              ) : (
                <SignUp
                  appearance={{
                    elements: {
                      formButtonPrimary: "bg-green-500 hover:bg-green-600",
                      formFieldInput: "border border-zinc-700 rounded-md p-2",
                    },
                  }}
                />
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={() =>
                    setAuthMode(authMode === "signin" ? "signup" : "signin")
                  }
                  className="text-blue-400 hover:text-blue-300"
                >
                  {authMode === "signin"
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;