import {
  MapPin,
  MessageCircle,
  Send,
  ThumbsUp,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import moment from "moment";
import Popup from "../Popup";

interface Comment {
  id: string;
  username: string;
  text: string;
  date: string;
  replies?: Comment[];
}

interface AnnouncementCardProps {
  Initials: string;
  announcerName: string;
  Areas: string[];
  sections: string[];
  likes: number;
  commentsCount?: number;
  content: string;
  imageurl?: string[];
  date: string;
  canManage?: boolean;
}

function AnnouncementCard({
  Initials,
  announcerName,
  Areas,
  sections,
  likes,
  content,
  date,
  commentsCount,
  imageurl,
  canManage,
}: AnnouncementCardProps) {
  const [areasPopupOpen, setAreasPopupOpen] = useState(false);
  const [sectionsPopupOpen, setSectionsPopupOpen] = useState(false);
  const [commentSectionOpen, setCommentSectionOpen] = useState<boolean>(false);
  const [commentsCountState, setCommentsCountState] = useState<number>(
    commentsCount || 0,
  );
  const [comment, setComment] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "Lihle Motaung",
      text: "This is a great announcement! Very informative.",
      date: new Date(Date.now() - 3600000).toISOString(),
      replies: [
        {
          id: "1-1",
          username: "Kamohelo",
          text: "Agreed, thanks for sharing!",
          date: new Date(Date.now() - 1800000).toISOString(),
        },
      ],
    },
    {
      id: "2",
      username: "John Doe",
      text: "Is there any more info on the area coverage?",
      date: new Date(Date.now() - 7200000).toISOString(),
      replies: [],
    },
  ]);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const isEditable = moment().diff(moment(date), "hours") < 24;
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const handleSendComment = (text: string) => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      username: "Current User",
      text,
      date: new Date().toISOString(),
      replies: [],
    };
    setComments([...comments, newComment]);
    setCommentsCountState(commentsCountState + 1);
    setComment("");
  };

  const handleSendReply = (parentId: string, text: string) => {
    if (!text.trim()) return;
    const newReply: Comment = {
      id: Date.now().toString(),
      username: "Current User",
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
    setCommentsCountState(commentsCountState + 1);
    setReplyText("");
    setReplyingToId(null);
  };
  return (
    <div className="flex flex-col h-auto p-5 border border-neutral-400/40 space-y-5 rounded-2xl bg-white w-full">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-row space-x-2">
          <div className="bg-linear-to-br from-blue-600 to-blue-900 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
            <span>{Initials}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold text-md">{announcerName}</span>
            <span className="text-neutral-500 text-xs">
              {moment(date).fromNow()}
            </span>
          </div>
        </div>
        {canManage && (
          <div className="relative">
            <button
              onClick={() => setOptionsOpen(true)}
              className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <MoreVertical className="size-5 text-neutral-500" />
            </button>
          </div>
        )}
      </div>
      {/* Area and section */}
      <div className="grid grid-cols-10 gap-2 text-neutral-500 text-sm font-semibold ">
        {/* Area */}
        {Areas &&
          Areas.slice(0, 5).map((area, index) => (
            <div
              key={index}
              className="text-[10px] text-blue-700 bg-blue-500/10 rounded-lg p-1 flex justify-center items-center space-x-1 gap-1 w-full"
            >
              <MapPin className="size-3" />
              <span className="line-clamp-1">{area}</span>
            </div>
          ))}
        {Areas && Areas.length > 5 && (
          <button
            onClick={() => setAreasPopupOpen(true)}
            className="text-[10px] text-blue-700 bg-blue-500/10 rounded-lg p-1 flex justify-center items-center gap-1 w-full hover:bg-blue-500/20 transition"
          >
            <span>{Areas.length - 5} more ...</span>
          </button>
        )}
        {/* Section */}
        {Areas &&
          Areas.length < 2 &&
          sections &&
          sections.slice(0, 5).map((section, index) => (
            <div
              key={index}
              className="text-[10px] text-neutral-500 font-semibold bg-neutral-500/15 rounded-lg p-1 flex items-center gap-1 w-full justify-center"
            >
              <span className="line-clamp-1">{section}</span>
            </div>
          ))}
        {Areas && Areas.length < 2 && sections && sections.length > 5 && (
          <button
            onClick={() => setSectionsPopupOpen(true)}
            className="text-[10px] text-neutral-500 font-semibold bg-neutral-500/15 rounded-lg p-1 flex justify-center items-center gap-1 w-full hover:bg-neutral-500/25 transition"
          >
            <span>{sections.length - 5} more ...</span>
          </button>
        )}
      </div>

      <div className="text-neutral-500 flex flex-col justify-between h-full space-y-2">
        <p className="text-sm text-gray-700 mt-2">{localContent}</p>
        {imageurl && imageurl.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 mb-5">
            {imageurl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Announcement image ${index + 1}`}
                onClick={() => setSelectedImage(url)}
                className="rounded-lg w-full h-54 object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        )}
        <div className="flex flex-row space-x-5 items-center pt-5 border-t border-gray-300/30">
          <div className="flex items-center gap-2">
            <ThumbsUp className="size-4 text-gray-500" />
            <span className="text-xs">{likes}</span>
          </div>
          <div
            className="flex items-center gap-2"
            onClick={() => setCommentSectionOpen(!commentSectionOpen)}
            title="comments"
          >
            <MessageCircle className="size-4 text-gray-500" />
            <span className="text-xs">{commentsCountState}</span>
          </div>
        </div>
        {commentSectionOpen && (
          <div
            className={`relative mt-5 space-y-3 h-fit overflow-scroll overflow-x-hidden`}
          >
            <div className="flex flex-col space-y-4 mb-16 pb-4">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div key={c.id} className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <div className="bg-linear-to-br from-blue-600 to-blue-900 h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {c.username.charAt(0)}
                      </div>
                      <div className="flex flex-col space-y-1 max-w-[85%]">
                        <div className="bg-neutral-100 rounded-2xl px-3 py-2">
                          <span className="text-xs font-bold block">
                            {c.username}
                          </span>
                          <p className="text-xs text-neutral-800">{c.text}</p>
                        </div>
                        <div className="flex items-center space-x-3 px-2">
                          <button
                            onClick={() => setReplyingToId(c.id)}
                            className="text-[10px] font-bold text-neutral-500 hover:underline"
                          >
                            Reply
                          </button>
                          <span className="text-[10px] text-neutral-400">
                            {moment(c.date).fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {c.replies && c.replies.length > 0 && (
                      <div className="ml-10 space-y-3">
                        {c.replies.map((r) => (
                          <div key={r.id} className="flex space-x-2">
                            <div className="bg-linear-to-br from-blue-600 to-blue-900 h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                              {r.username.charAt(0)}
                            </div>
                            <div className="flex flex-col space-y-1 max-w-[85%]">
                              <div className="bg-neutral-100 rounded-2xl px-3 py-2">
                                <span className="text-[10px] font-bold block">
                                  {r.username}
                                </span>
                                <p className="text-[10px] text-neutral-800">
                                  {r.text}
                                </p>
                              </div>
                              <div className="flex items-center space-x-3 px-2">
                                <span className="text-[10px] text-neutral-400">
                                  {moment(r.date).fromNow()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    {replyingToId === c.id && (
                      <div className="ml-10 flex space-x-2 items-center animate-fadeIn">
                        <div className="bg-linear-to-br from-blue-600 to-blue-900 h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          C
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
                            className="w-full text-[10px] bg-neutral-100 border-none py-1.5 px-3 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-neutral-400 text-xs py-4">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
            <div className="flex flex-row absolute bottom-0 w-full space-x-5">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Write a comment..."
                className="w-full text-sm border-2 border-neutral-500/30 py-1 px-5 rounded-lg"
              />
              <button
                onClick={() => handleSendComment(comment)}
                disabled={!comment.trim()}
                className={` w-fit p-2 rounded-xl flex items-center justify-center ${!comment.trim() ? "opacity-50 cursor-not-allowed bg-blue-800/40" : "bg-blue-500/70"}`}
                title="send"
              >
                <Send className="size-5 text-white/80" />
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full h-10 w-10 flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Popup isOpen={optionsOpen} onClose={() => setOptionsOpen(false)}>
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold">Manage Announcement</h2>

          {isEditable && (
            <button
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-100 transition"
              onClick={() => {
                setOptionsOpen(false);
                setEditPopupOpen(true);
              }}
            >
              <Edit className="size-4" />
              Edit Announcement
            </button>
          )}

          <button
            className="flex items-center gap-2 p-3 rounded-lg text-red-600 hover:bg-red-50 transition"
            onClick={() => {
              setOptionsOpen(false);
              console.log("Delete clicked");
            }}
          >
            <Trash2 className="size-4" />
            Delete Announcement
          </button>
        </div>
      </Popup>
      <Popup isOpen={areasPopupOpen} onClose={() => setAreasPopupOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">All Areas</h2>

          <div className="flex flex-wrap gap-2">
            {Areas.map((area, i) => (
              <div
                key={i}
                className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </Popup>
      <Popup
        isOpen={sectionsPopupOpen}
        onClose={() => setSectionsPopupOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">All Sections</h2>

          <div className="flex flex-wrap gap-2">
            {sections.map((section, i) => (
              <div
                key={i}
                className="px-3 py-2 text-sm bg-neutral-200 text-neutral-700 rounded-lg"
              >
                {section}
              </div>
            ))}
          </div>
        </div>
      </Popup>
      <Popup isOpen={editPopupOpen} onClose={() => setEditPopupOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Edit Announcement</h2>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-neutral-600">
              Content
            </label>
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              className="w-full h-32 p-3 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Update announcement content..."
            />
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              onClick={() => {
                setLocalContent(content); // Reset on cancel
                setEditPopupOpen(false);
              }}
              className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={() => setEditPopupOpen(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default memo(AnnouncementCard);
