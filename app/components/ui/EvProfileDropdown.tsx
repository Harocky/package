"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import EvPopupConfirm from "./EvPopupConfirm";

type Page = {
  label: string;
  href: string;
};

export default function EvProfileDropdown({ pages }: { pages: Page[] }) {
  const router = useRouter();

  // Separate states
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="ev-btn ev-btn-secondary cursor-pointer"
        style={{
          borderRadius: "var(--ev-radius-full)",
          padding: "var(--ev-space-xs)",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        👤
      </button>

      {menuOpen && (
        <>
          {/* Menu Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="ev-profile-menu">
            <div className="ev-profile-header">Account</div>

            <div className="ev-border-b ev-mar-y-xs" />

            {pages.map((p) => (
              <button
                key={p.href}
                className="ev-profile-item"
                onClick={() => {
                  router.push(p.href);
                  setMenuOpen(false);
                }}
              >
                {p.label}
              </button>
            ))}

            <div className="ev-border-b ev-mar-y-xs" />

            <button
              className="ev-profile-item is-danger"
              onClick={() => {
                setMenuOpen(false); // Close dropdown
                setLogoutPopupOpen(true); // Open Popup
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <EvPopupConfirm
        open={logoutPopupOpen}
        title="Logout"
        text="Are you sure you want to log out of your account?"
        onClose={() => setLogoutPopupOpen(false)}
        onConfirm={() => {
          console.log("Logged out successfully");
          router.push("/login");
        }}
      />
    </div>
  );
}
