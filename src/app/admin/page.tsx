"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Lock,
  LogOut,
  CalendarDays,
  MessageSquare,
  BedDouble,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";
import type { BookingRequest, Enquiry, Room } from "@/lib/types";

type Tab = "bookings" | "enquiries" | "rooms";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
  checked_in: "bg-blue-500/20 text-blue-400",
  completed: "bg-gray-500/20 text-gray-400",
  new: "bg-yellow-500/20 text-yellow-400",
  reviewed: "bg-blue-500/20 text-blue-400",
  responded: "bg-green-500/20 text-green-400",
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-admin-token": token || "",
    }),
    [token]
  );

  // Fetch data when token or tab changes
  useEffect(() => {
    if (!token) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        if (tab === "bookings") {
          const res = await fetch("/api/admin/bookings", { headers: headers() });
          const data = await res.json();
          setBookings(data.bookings || []);
        } else if (tab === "enquiries") {
          const res = await fetch("/api/admin/enquiries", { headers: headers() });
          const data = await res.json();
          setEnquiries(data.enquiries || []);
        } else {
          const res = await fetch("/api/admin/rooms", { headers: headers() });
          const data = await res.json();
          setRooms(data.rooms || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, tab, headers]);

  const handleLogin = async () => {
    if (!pin || pin.length < 4) {
      setLoginError("Please enter a 4-digit PIN.");
      return;
    }
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        sessionStorage.setItem("admin_token", data.token);
        setToken(data.token);
      } else {
        setLoginError(data.error || "Invalid PIN.");
      }
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setPin("");
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ id, status }),
      });
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: status as BookingRequest["status"] } : b
        )
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const toggleRoomAvailability = async (id: string, isAvailable: boolean) => {
    try {
      await fetch("/api/admin/rooms", {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ id, isAvailable }),
      });
      setRooms((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isAvailable } : r))
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const refresh = () => {
    setLoading(true);
    // Re-trigger effect
    setTab((t) => t);
    // Force refetch
    const fetchData = async () => {
      try {
        if (tab === "bookings") {
          const res = await fetch("/api/admin/bookings", { headers: headers() });
          const data = await res.json();
          setBookings(data.bookings || []);
        } else if (tab === "enquiries") {
          const res = await fetch("/api/admin/enquiries", { headers: headers() });
          const data = await res.json();
          setEnquiries(data.enquiries || []);
        } else {
          const res = await fetch("/api/admin/rooms", { headers: headers() });
          const data = await res.json();
          setRooms(data.rooms || []);
        }
      } catch (err) {
        console.error("Refresh error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  // ── LOGIN SCREEN ──
  if (!token) {
    return (
      <div className="min-h-screen bg-hotel-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-2xl font-serif font-bold text-white">24|7</span>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mt-1">
              Admin Dashboard
            </p>
          </div>

          <div className="bg-hotel-900 border border-white/5 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-gold-500" />
              <h2 className="text-white font-medium">Enter Admin PIN</h2>
            </div>

            <input
              type="password"
              maxLength={10}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setLoginError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter PIN"
              className="w-full bg-hotel-800 border border-white/10 text-white text-center text-2xl tracking-[0.5em] px-4 py-4 focus:border-gold-500 focus:outline-none transition-colors mb-4"
              autoFocus
            />

            {loginError && (
              <p className="text-red-400 text-sm text-center mb-4">{loginError}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-hotel-950 font-bold py-3 transition-colors flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──
  return (
    <div className="min-h-screen bg-hotel-950">
      {/* Top Bar */}
      <header className="bg-hotel-900 border-b border-white/5 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-serif font-bold text-white">24|7</span>
            <span className="text-xs tracking-wider uppercase text-gold-500 hidden sm:inline">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              className="p-2 text-hotel-400 hover:text-white transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-hotel-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-hotel-900 p-1 w-fit">
          {[
            { key: "bookings" as Tab, label: "Bookings", icon: CalendarDays },
            { key: "enquiries" as Tab, label: "Enquiries", icon: MessageSquare },
            { key: "rooms" as Tab, label: "Rooms", icon: BedDouble },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === key
                  ? "bg-gold-500 text-hotel-950"
                  : "text-hotel-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
          </div>
        )}

        {/* BOOKINGS TAB */}
        {!loading && tab === "bookings" && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif text-white">
              Booking Requests ({bookings.length})
            </h2>
            {bookings.length === 0 ? (
              <p className="text-hotel-500 py-8">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-hotel-900 border border-white/5 p-4 sm:p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold">
                            {b.guest_name}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 uppercase font-semibold ${
                              STATUS_COLORS[b.status] || ""
                            }`}
                          >
                            {b.status.replace("_", " ")}
                          </span>
                        </div>
                        <span className="text-sm text-gold-500 font-mono">
                          {b.confirmation_code}
                        </span>
                      </div>
                      <span className="text-lg font-semibold text-gold-400">
                        {formatNaira(b.estimated_total)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-hotel-600 block text-xs">Room</span>
                        <span className="text-hotel-300">{b.room_name}</span>
                      </div>
                      <div>
                        <span className="text-hotel-600 block text-xs">Check-in</span>
                        <span className="text-hotel-300">{b.check_in}</span>
                      </div>
                      <div>
                        <span className="text-hotel-600 block text-xs">Check-out</span>
                        <span className="text-hotel-300">{b.check_out}</span>
                      </div>
                      <div>
                        <span className="text-hotel-600 block text-xs">Guests</span>
                        <span className="text-hotel-300">
                          {b.adults}A, {b.children}C · {b.nights}N
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-hotel-500 mb-3">
                      {b.guest_phone} · {b.guest_email}
                    </div>

                    {b.special_requests && (
                      <p className="text-sm text-hotel-500 italic mb-3">
                        &quot;{b.special_requests}&quot;
                      </p>
                    )}

                    {/* Status Update */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-hotel-600">Update:</span>
                      {(
                        ["pending", "confirmed", "cancelled", "checked_in", "completed"] as const
                      ).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateBookingStatus(b.id, s)}
                          disabled={b.status === s}
                          className={`text-xs px-2 py-1 border transition-colors ${
                            b.status === s
                              ? "border-gold-500/30 text-gold-400 cursor-default"
                              : "border-white/5 text-hotel-500 hover:text-white hover:border-white/20"
                          }`}
                        >
                          {s.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ENQUIRIES TAB */}
        {!loading && tab === "enquiries" && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif text-white">
              Enquiries ({enquiries.length})
            </h2>
            {enquiries.length === 0 ? (
              <p className="text-hotel-500 py-8">No enquiries yet.</p>
            ) : (
              <div className="space-y-3">
                {enquiries.map((e) => (
                  <div
                    key={e.id}
                    className="bg-hotel-900 border border-white/5 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold">
                        {e.guest_name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 uppercase font-semibold ${
                          STATUS_COLORS[e.status] || ""
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>
                    <p className="text-sm text-gold-400 mb-1 font-medium">
                      {e.subject}
                    </p>
                    <p className="text-sm text-hotel-400 mb-3">{e.message}</p>
                    <div className="text-xs text-hotel-600">
                      {e.guest_phone} · {e.guest_email}
                      {e.service_interest &&
                        ` · Interest: ${e.service_interest}`}
                      {" · "}
                      {new Date(e.created_at).toLocaleDateString("en-NG")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ROOMS TAB */}
        {!loading && tab === "rooms" && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif text-white">
              Rooms & Apartments ({rooms.length})
            </h2>
            {rooms.length === 0 ? (
              <p className="text-hotel-500 py-8">No rooms found.</p>
            ) : (
              <div className="space-y-3">
                {rooms.map((r) => (
                  <div
                    key={r.id}
                    className="bg-hotel-900 border border-white/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{r.name}</span>
                        <span className="text-xs px-2 py-0.5 bg-hotel-800 text-hotel-400 uppercase">
                          {r.type}
                        </span>
                      </div>
                      <span className="text-sm text-gold-400">
                        {formatNaira(r.pricePerNight)}/night
                      </span>
                      <span className="text-sm text-hotel-600 ml-3">
                        Capacity: {r.capacity.adults}A, {r.capacity.children}C
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        toggleRoomAvailability(r.id, !r.isAvailable)
                      }
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        r.isAvailable
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      }`}
                    >
                      {r.isAvailable ? "Available" : "Unavailable"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
