"use client";
import { logoutUser } from "@/actions/user-action";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header(props: any) {
  const { user } = props;
  const router = useRouter();

  if (!user) return null; // hide header if not logged in

  const logout = async() => {
    debugger;
    await logoutUser()
  };

  return (
    <header className="bg-yellow-300 shadow-md py-3 px-6 flex justify-between items-center">
      {/* Left Button: Home */}
      <div className="flex items-center gap-4">
        {!user.isAdmin && <Link
          href="/events"
          className="text-yellow-900 font-bold hover:text-yellow-700"
        >
          Events
        </Link>}

        {/* Admin Only */}
        {user.isAdmin && (
          <><Link
            href="/admin/dashboard"
            className="text-yellow-900 font-bold hover:text-yellow-700"
          >
            Dashboard
          </Link>

           <Link
            href="/admin/events"
            className="text-yellow-900 font-bold hover:text-yellow-700"
          >
            Events
          </Link></>
        )}

        {/* Normal User Only */}
        {!user.isAdmin && (
          <Link
            href="/my-bookings"
            className="text-yellow-900 font-bold hover:text-yellow-700"
          >
            My Bookings
          </Link>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <span className="text-yellow-900 font-semibold">
          Welcome, {user.username}
        </span>

        <button
          onClick={logout}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
