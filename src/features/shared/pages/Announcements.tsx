import { memo, useState } from "react";
import ActionButton from "../components/ui/ActionButton";
import { ArrowUpDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MANANGER_CREATE_ANNOUNCEMENT } from "../../mananger/consts/route.mananger";
import AnnouncementCard from "../components/ui/AnnouncementCard";
import image from "../../../assets/back.png";
import type { Anouncement } from "../../mananger/models/Anouncement.model";
import { useRoleSelection } from "../context/roleselection.context";
import { SUPER_ADMIN_CREATE_ANNOUNCEMENT } from "../../super_admin/consts/routes.super_admin";
import { MEDIA_MAKE_ANNOUNCEMTS } from "../../media/const/routes.media";

function Announcements() {
  const navigate = useNavigate();
  const [areaFilter, setAreaFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const { currentRole } = useRoleSelection();

  const announcements: Anouncement[] = [
    {
      Areas: [
        "Mailula",
        "Mabopane",
        "Soshanguve",
        "Garankuwa",
        "Pretoria",
        "Mabopane",
        "Soshanguve",
        "Garankuwa",
        "Pretoria",
      ],
      sections: ["Section 1", "Section 2"],
      likes: 12,
      content: "This is an announcement for Mailula area.",
      date: "2026-03-04",
      announcerName: "John Doe",
      Initials: "JD",
      imageurl: [image],
    },
    {
      Areas: ["Mailula"],
      sections: ["Section 1", "Section 2"],
      likes: 12,
      content: "This is an announcement for Mailula area.",
      date: "2026-02-17",
      announcerName: "John Doe",
      Initials: "JD",
      imageurl: [image],
    },
    {
      Areas: ["Mailula"],
      sections: ["Section 1", "Section 2"],
      likes: 12,
      content: "This is an announcement for Mailula area.",
      date: "2026-02-18",
      announcerName: "John Doe",
      Initials: "JD",
      imageurl: [image, image, image, image],
    },
    {
      Areas: ["Mailula"],
      sections: ["Section 1", "Section 2"],
      likes: 12,
      content: "This is an announcement for Mailula area.",
      date: "2026-02-19",
      announcerName: "John Doe",
      Initials: "JD",
    },
    {
      Areas: ["Mailula"],
      sections: ["Section 1", "Section 2"],
      likes: 12,
      content: "This is an announcement for Mailula area.",
      date: "2026-02-20",
      announcerName: "John Doe",
      Initials: "JD",
      imageurl: [image],
    },
  ];

  const areas = ["all", "Mailula", "Mabopane", "Soshanguve", "Garankuwa"];

  const filteredAnnouncements = announcements
    .filter((a) => {
      if (areaFilter === "all") return true;
      return a.Areas.includes(areaFilter);
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold mt-5">Announcements</h1>
          <span className="text-neutral-500/70 text-sm">
            Overview of All announcements
          </span>
        </div>

        <ActionButton
          label="Make Announcement"
          Icon={Plus}
          onClick={() =>
            navigate(
              currentRole === "superadmin"
                ? SUPER_ADMIN_CREATE_ANNOUNCEMENT
                : currentRole === "manager"
                  ? MANANGER_CREATE_ANNOUNCEMENT
                  : MEDIA_MAKE_ANNOUNCEMTS,
            )
          }
        />
      </div>

      {/* Area Filters */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <button
          onClick={() =>
            setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
          }
          className="flex flex-row items-center space-x-3 px-4 py-2 h-8 text-xs rounded-lg transition-all
        text-neutral-500 bg-white/90 border border-neutral-500/20 font-semibold"
        >
          <ArrowUpDown className="size-3" />{" "}
          <span
            title={`sort from ${sortOrder != "newest" ? "Newest" : "Oldest"}`}
          >
            {sortOrder === "newest" ? "Newest" : "Oldest"}
          </span>
        </button>
        {areas.map((area) => (
          <button
            key={area}
            onClick={() => setAreaFilter(area)}
            className={`px-4 py-2 h-8 text-xs rounded-lg transition-all
            ${
              areaFilter === area
                ? "bg-[#0f4c81] shadow text-white font-medium"
                : "text-neutral-500/80 bg-white/90 border border-neutral-500/20 font-semibold"
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Announcements */}
      <div className="space-y-5 mt-5 flex flex-col justify-center items-center">
        {filteredAnnouncements.map((announcement, index) => (
          <AnnouncementCard key={index} {...announcement} canManage={true} />
        ))}
      </div>
    </>
  );
}

export default memo(Announcements);
