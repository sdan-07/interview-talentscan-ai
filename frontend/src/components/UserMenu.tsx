import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { user, loading, handleLogout } = useAuth();

  const initial = user?.username?.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const onLogout = async () => {
    await handleLogout();
    setOpen(false);
    navigate("/");
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="Open user menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="
          h-11 w-11
          rounded-full
          border border-pink-400/40
          bg-pink-500/10
          text-pink-100
          shadow-lg shadow-pink-950/20
          flex items-center justify-center
          font-bold
          transition
          hover:border-pink-300
          hover:bg-pink-500/20
          focus:outline-none
          focus:ring-2
          focus:ring-pink-400
          cursor-pointer
        "
      >
        {initial}
      </button>

      {open && (
        <div
          role="menu"
          className="
            absolute right-0 top-13
            z-50
            w-56
            overflow-hidden
            rounded-2xl
            border border-[#584049]
            bg-[#1c1b1c]
            shadow-2xl shadow-black/40
          "
        >
          <div className="border-b border-[#584049] px-4 py-3">
            <p className="truncate text-sm font-semibold text-white">
              {user?.username || "User"}
            </p>
            <p className="truncate text-xs text-[#dfbec9]">{user?.email}</p>
          </div>

          <Link
            to="/home"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              px-4 py-3
              text-sm text-[#e5e2e3]
              transition
              hover:bg-pink-500/10
              hover:text-pink-100
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-pink-300"
              aria-hidden="true"
            >
              <path d="m3 10 9-7 9 7" />
              <path d="M5 10v10h14V10" />
              <path d="M9 20v-6h6v6" />
            </svg>
            Home
          </Link>

          <button
            type="button"
            role="menuitem"
            disabled={loading}
            onClick={onLogout}
            className="
              flex w-full items-center gap-3
              px-4 py-3
              text-left text-sm text-[#e5e2e3]
              transition
              hover:bg-pink-500/10
              hover:text-pink-100
              disabled:cursor-wait
              disabled:opacity-70
              cursor-pointer
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-pink-300"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
      )}
    </div>
  );
}
