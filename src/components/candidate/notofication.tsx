'use client';

import { useEffect, useState } from "react";
import { getNotifications } from "../../services/candidateService";
interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
       const data = await getNotifications();

    setNotifications(data?.results || []);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <div className="text-slate-400">
          No notifications yet
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border ${
                n.is_read
                  ? "border-white/10 bg-white/5"
                  : "border-blue-500/30 bg-blue-500/10"
              }`}
            >
              <div className="font-medium">{n.title}</div>
              <div className="text-sm text-slate-300">
                {n.message}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {new Date(n.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}