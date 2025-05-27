/*
Header.tsx
This component renders the app header with a profile icon or Clerk UserButton for account access.

Functions:
- Header: Displays a profile icon if not signed in, or the UserButton if signed in.
*/

"use client";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  return (
    <header style={{ position: "absolute", top: 16, right: 24, zIndex: 1000 }}>
      {/* Show UserButton if signed in, otherwise show a profile icon that links to sign-in */}
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
      <SignedOut>
        <button
          onClick={() => router.push("/sign-in")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Sign in"
        >
          <FaUserCircle size={36} color="#888" />
        </button>
      </SignedOut>
    </header>
  );
} 