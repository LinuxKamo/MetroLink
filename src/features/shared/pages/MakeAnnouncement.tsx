import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Upload,
  Loader2,
  Send,
  Globe,
  MapPin,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MANANGER_ANNOUNCEMENTS } from "../../mananger/consts/route.mananger";
import { useRoleSelection } from "../context/roleselection.context";
import { MEDIA_ANNOUNCEMENTS } from "../../media/const/routes.media";
import { SUPER_ADMIN_ANNOUNCEMENTS } from "../../super_admin/consts/routes.super_admin";

type Area = {
  id: number;
  name: string;
  sections: string[];
};

type User = {
  full_name: string;
  email: string;
  profile_image?: string;
};

type FormState = {
  message: string;
  visibility: "public" | "specific";
  tag_areas: string[];
  tag_sections: string[];
};

export default function MakeAnnouncement() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { currentRole } = useRoleSelection();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const [form, setForm] = useState<FormState>({
    message: "",
    visibility: "public",
    tag_areas: [],
    tag_sections: [],
  });

  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Demo Data
  useEffect(() => {
    const demoAreas: Area[] = [
      {
        id: 1,
        name: "Mailula",
        sections: ["Section 1", "Section 2", "Section 3"],
      },
      {
        id: 2,
        name: "Mabopane",
        sections: ["Block A", "Block B", "Block C"],
      },
      {
        id: 3,
        name: "Soshanguve",
        sections: ["Zone 1", "Zone 2", "Zone 3"],
      },
      {
        id: 4,
        name: "Garankuwa",
        sections: ["Area 1", "Area 2"],
      },
    ];

    const demoUser: User = {
      full_name: "John Doe",
      email: "john@municipality.gov",
      profile_image: "",
    };

    setAreas(demoAreas);
    setUser(demoUser);
  }, []);

  const toggleArea = (area: string) => {
    setForm((prev) => ({
      ...prev,
      tag_areas: prev.tag_areas.includes(area)
        ? prev.tag_areas.filter((x) => x !== area)
        : [...prev.tag_areas, area],
      tag_sections: [],
    }));
  };

  const toggleSection = (section: string) => {
    setForm((prev) => ({
      ...prev,
      tag_sections: prev.tag_sections.includes(section)
        ? prev.tag_sections.filter((x) => x !== section)
        : [...prev.tag_sections, section],
    }));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUploading(true);

    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));

    setMediaFiles((prev) => [...prev, ...urls]);

    setUploading(false);
  };

  const handlePost = async () => {
    setSaving(true);

    const postData = {
      author_name: user?.full_name || "Senior",
      author_image: user?.profile_image || "",
      visibility: form.visibility,
      message: form.message,
      tag_areas: form.tag_areas,
      tag_sections: form.tag_sections,
      media_urls: mediaFiles,
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    console.log("Demo Announcement:", postData);

    setTimeout(() => {
      setSaving(false);
      alert("Announcement created (demo)");
    }, 800);
  };

  const selectedAreas = areas.filter((a) => form.tag_areas.includes(a.name));
  const availableSections = selectedAreas.flatMap((a) => a.sections);

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            navigate(
              currentRole === "superadmin"
                ? SUPER_ADMIN_ANNOUNCEMENTS
                : currentRole === "manager"
                  ? MANANGER_ANNOUNCEMENTS
                  : MEDIA_ANNOUNCEMENTS,
            )
          }
          title="back"
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            New Announcement
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Share an update with the community
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-5">
        {/* Author */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-[#0f4c81] to-[#38bdf8] flex items-center justify-center text-white font-semibold text-sm">
            {user?.full_name?.[0] || "S"}
          </div>

          <div>
            <p className="font-semibold text-sm text-slate-900">
              {user?.full_name || "Senior"}
            </p>
            <p className="text-[11px] text-slate-400">{user?.email}</p>
          </div>
        </div>

        {/* Visibility */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Visibility</p>

          <div className="flex gap-2">
            {["public", "specific"].map((v) => (
              <button
                key={v}
                onClick={() =>
                  setForm({
                    ...form,
                    visibility: v as "public" | "specific",
                    tag_areas: [],
                    tag_sections: [],
                  })
                }
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  form.visibility === v
                    ? "bg-[#0f4c81] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {v === "public" ? (
                  <div className="text-xs flex flex-row space-x-3 items-center">
                    <Globe className="size-4" /> <span>Global</span>
                  </div>
                ) : (
                  <div className="text-xs flex flex-row space-x-3 items-center">
                    <MapPin className="size-4" /> <span>Specific Area</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Areas */}
        {form.visibility === "specific" && (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-2">Tag Areas</p>

              <div className="flex flex-wrap gap-2">
                {areas.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggleArea(a.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      form.tag_areas.includes(a.name)
                        ? "bg-[#0f4c81] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            {availableSections.length > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-2">Tag Sections</p>

                <div className="flex flex-wrap gap-2">
                  {availableSections.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSection(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        form.tag_sections.includes(s)
                          ? "bg-[#0f4c81] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Message */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Message</p>

          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Write your announcement..."
            className="w-full rounded-xl min-h-35 resize-none border border-slate-200 p-3"
          />
        </div>

        {/* Media */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Media (optional)</p>

          <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:bg-slate-50 transition-colors">
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            ) : (
              <>
                <Upload className="h-5 w-5 text-slate-400" />
                <span className="text-sm text-slate-400">
                  Upload photos or videos
                </span>
              </>
            )}

            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaUpload}
            />
          </label>
        </div>

        {/* Preview images */}
        {mediaFiles.length > 0 && (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
            {mediaFiles.map((url, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={url}
                  className="w-full h-32 object-cover rounded-lg"
                />

                {hoveredIndex === i && (
                  <button
                    onClick={() => removeMedia(i)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handlePost}
          disabled={!form.message.trim() || saving}
          className="bg-[#0f4c81] hover:bg-[#1a6db5] text-white rounded-xl w-full py-2 flex items-center justify-center gap-2"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Post Announcement
        </button>
      </div>
    </>
  );
}
