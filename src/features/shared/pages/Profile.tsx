import { Camera, Loader2, Save } from "lucide-react";
import { memo, useState } from "react";
import InputField from "../components/ui/InputField";
import ActionButton from "../components/ui/ActionButton";

function Profile() {
  const [user] = useState<any>(null);
  const [loading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = useState({ phone: "", area: "", section: "" });

  const handleSave = async () => {
    setSaving(true);
    setSaving(false);
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-[#0f4c81]" />
      </div>
    );
  }
  return (
    <div className="lg:max-w-[50%] mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Profile
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col items-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center text-3xl font-bold text-slate-600 overflow-hidden">
            {user?.profile_image ? (
              <img
                src={user.profile_image}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              user?.full_name?.[0] || "U"
            )}
          </div>
          <label className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#0f4c81] flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#1a6db5] transition-colors">
            <Camera className="h-3.5 w-3.5 text-white" />
            <input
              title="Profile"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <p className="mt-3 font-semibold text-lg text-slate-900">
          {user?.full_name}
        </p>
        <p className="text-sm text-slate-400">{user?.email}</p>
        <span className="mt-2 px-3 py-1 rounded-lg bg-[#0f4c81]/10 text-[#0f4c81] text-xs font-medium capitalize">
          {user?.role || "user"}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Edit Profile</h2>
        <InputField label="Phone" value={form.phone} />
        <InputField label="Area" value={form.area} />
        <InputField label="Section" value={form.section} />
        <ActionButton
          label={`Save Changes`}
          Icon={saving ? Loader2 : Save}
          onClick={handleSave}
          isDisabled={saving}
        />
      </div>
    </div>
  );
}

export default memo(Profile);
