import { useState } from "react";
import { Loader2, MessageCircle, Bell, RefreshCw } from "lucide-react";
import moment from "moment";

interface NotificationComment {
  id: string;
  author_name: string;
  author_email?: string;
  message: string;
  created_date: string;
  announcement_id: string;
  replies?: Array<{
    id: string;
    username: string;
    text: string;
    date: string;
  }>;
}

export default function Notifications() {
  const [loading] = useState(false);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const [comments, setComments] = useState<NotificationComment[]>([
    {
      id: "1",
      author_name: "John Doe",
      author_email: "john@example.com",
      message: "Thanks for letting us know!",
      created_date: "2026-03-14T10:30:00",
      announcement_id: "1",
      replies: [],
    },
    {
      id: "2",
      author_name: "Sarah Williams",
      author_email: "sarah@example.com",
      message: "Will this affect the whole area?",
      created_date: "2026-03-14T12:10:00",
      announcement_id: "1",
      replies: [],
    },
    {
      id: "3",
      author_name: "David Johnson",
      author_email: "david@example.com",
      message: "Looking forward to better roads.",
      created_date: "2026-03-13T15:20:00",
      announcement_id: "2",
      replies: [],
    },
  ]);

  const announcements = [
    {
      id: "1",
      message: "Water supply will be interrupted tomorrow for maintenance.",
    },
    {
      id: "2",
      message: "Road repairs scheduled in the central district this week.",
    },
  ];

  const handleSendReply = (parentId: string, text: string) => {
    if (!text.trim()) return;

    const newReply = {
      id: Date.now().toString(),
      username: "Manager", // Assuming the current user is a manager/admin
      text,
      date: new Date().toISOString(),
    };

    setComments(
      comments.map((c) => {
        if (c.id === parentId) {
          return { ...c, replies: [...(c.replies || []), newReply] };
        }
        return c;
      }),
    );

    setReplyText("");
    setReplyingToId(null);
  };

  const announcementMap = Object.fromEntries(
    announcements.map((a) => [a.id, a]),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-[#0f4c81]" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            User comments on announcements
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      {/* Content */}
      {comments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center">
          <Bell className="h-10 w-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No comments yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => {
            const ann = announcementMap[c.announcement_id];

            return (
              <div key={c.id} className="flex flex-col space-y-2">
                <div className="bg-white rounded-2xl border border-slate-200/60 p-4 flex gap-3 hover:shadow-sm transition-shadow">
                  {/* Avatar */}
                  <div className="h-9 w-9 rounded-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                    {c.author_name?.[0] || "U"}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-slate-900">
                        {c.author_name}
                      </span>

                      {c.author_email && (
                        <span className="text-[11px] text-slate-400">
                          {c.author_email}
                        </span>
                      )}

                      <span className="ml-auto text-[11px] text-slate-400">
                        {moment(c.created_date).fromNow()}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 mt-1">{c.message}</p>

                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => setReplyingToId(c.id)}
                        className="text-[11px] font-bold text-[#0f4c81] hover:underline"
                      >
                        Reply
                      </button>

                      {ann && (
                        <div className="flex items-start gap-1.5 bg-slate-50 rounded-lg px-2 py-0.5 border border-slate-200/50">
                          <MessageCircle className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-slate-500 line-clamp-1 max-w-[200px]">
                            {ann.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Replies List */}
                {c.replies && c.replies.length > 0 && (
                  <div className="ml-12 space-y-2 mt-1">
                    {c.replies.map((r) => (
                      <div
                        key={r.id}
                        className="flex gap-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100"
                      >
                        <div className="h-6 w-6 rounded-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-700 shrink-0">
                          {r.username.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-900">
                              {r.username}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {moment(r.date).fromNow()}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            {r.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                {replyingToId === c.id && (
                  <div className="ml-12 flex space-x-2 items-center animate-fadeIn mt-1">
                    <div className="h-6 w-6 rounded-full bg-linear-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      M
                    </div>
                    <div className="relative grow">
                      <input
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            handleSendReply(c.id, replyText);
                          if (e.key === "Escape") setReplyingToId(null);
                        }}
                        type="text"
                        placeholder="Write a reply..."
                        className="w-full text-xs bg-slate-100 border border-slate-200 py-1.5 px-3 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <button
                      onClick={() => handleSendReply(c.id, replyText)}
                      disabled={!replyText.trim()}
                      className="text-[11px] font-bold text-blue-600 disabled:opacity-50"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => setReplyingToId(null)}
                      className="text-[11px] font-bold text-slate-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

