import { ChevronDown, MapPin, Pencil, Plus, Trash, X } from "lucide-react";
import { memo, useState } from "react";
import type { Area } from "../../models/Area.model";
import type { Section } from "../../models/Section.model";
import Popup from "../../../shared/components/Popup";
import ActionButton from "../../../shared/components/ui/ActionButton";
import InputField from "../../../shared/components/ui/InputField";
import InputFieldDropDown from "./InputFieldDropDown";
import { MUNICIPALITIES } from "../../consts/municipalities";
import { useRoleSelection } from "../../../shared/context/roleselection.context";

interface AreaRowParam {
  area: Area;
  announcementNumber?: number;
}

function AreaRow({ area, announcementNumber }: AreaRowParam) {
  const [expanded, setExpanded] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editArea, setEditArea] = useState<Area | null>(null);
  const { currentRole } = useRoleSelection();

  const [form, setForm] = useState<{
    name: string;
    municipality: string;
    sections: Section[];
  }>({
    name: "",
    municipality: "",
    sections: [],
  });

  const [sectionInput, setSectionInput] = useState("");
  const openEdits = (area: Area) => {
    setEditArea(area);

    setForm({
      name: area.name,
      municipality: area.municipality || "",
      sections: area.sections || [],
    });

    setOpenEdit(true);
  };

  const handleDelete = async (area: Area) => {
    if (!confirm(`Delete area "${area.name}"?`)) return;

    // TODO: call API here
  };

  const addSection = () => {
    const trimmed = sectionInput.trim();
    if (!trimmed) return;

    // Create a temporary section object with a generated _id
    const newSection: Section = {
      _id: Date.now().toString(), // temporary id, replace with real from API
      name: trimmed,
      image_url: [],
    };

    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));

    setSectionInput("");
  };

  const removeSection = (sectionId: string | number) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s._id !== sectionId),
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.municipality || form.sections.length === 0) return;

    if (editArea) {
      // update API
      console.log("Update area", form);
    } else {
      // create API
      console.log("Create area", form);
    }

    setOpenEdit(false);
  };

  return (
    <>
      <div className="w-full bg-white border border-neutral-200 shadow-sm rounded-2xl hover:border-[#0f4c81]/30 hover:shadow-md transition-all group overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex space-x-4 items-center">
            <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-[#0f4c81]/10 to-[#0f4c81]/5 flex items-center justify-center text-[#0f4c81] ring-1 ring-[#0f4c81]/10">
              <MapPin className="size-6" />
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#0f4c81] font-bold uppercase tracking-tight">
                    {area.municipality}
                  </span>
                  <span className="text-lg font-bold text-[#1e293b]">
                    {area.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#0f4c81] text-white text-[10px] font-bold rounded-lg uppercase">
                  {announcementNumber ?? 0} Monthly Posts
                </span>
              </div>

              <span className="text-neutral-400 text-sm font-medium">
                {area.sections.length} Active Sections
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl hover:bg-neutral-200 transition-colors"
            >
              {expanded ? "Hide Sections" : "View Sections"}
              <ChevronDown
                className={`size-4 ml-2 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>

            <button
              onClick={() => openEdits(area)}
              className="p-2.5 rounded-xl bg-white border border-neutral-100 text-neutral-400 hover:text-[#0f4c81] hover:border-[#0f4c81]/30 hover:bg-[#0f4c81]/5 transition-all shadow-sm"
              title="Edit Area"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => handleDelete(area)}
              className="p-2.5 rounded-xl bg-white border border-neutral-100 text-neutral-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
              title="Delete Area"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>

        {expanded && (
          <div className="px-6 pb-6 pt-0 animate-fadeIn">
            <div className="pt-6 border-t border-neutral-100">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
                Sections in this area
              </p>

              <div className="flex flex-wrap gap-2">
                {area.sections?.map((section) => (
                  <div
                    key={section._id}
                    className="px-4 py-2 bg-neutral-50 text-[#334155] border border-neutral-100 rounded-xl text-xs font-semibold hover:border-[#0f4c81]/20 hover:bg-white transition-all cursor-default"
                  >
                    {section.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EDIT POPUP */}
      {openEdit && (
        <Popup isOpen={openEdit} onClose={() => setOpenEdit(false)}>
          <div className="space-y-4">
            {currentRole === "superadmin" && (
              <InputFieldDropDown
                label="Municipality"
                value={form.municipality}
                placeholder="Select Municipality"
                options={MUNICIPALITIES}
                onChange={(v) =>
                  setForm((prev) => ({ ...prev, municipality: v }))
                }
              />
            )}
            <InputField
              label="Area Name"
              value={form.name}
              placeholder="e.g. North District"
              onChange={(v) => setForm((prev) => ({ ...prev, name: v }))}
            />

            {/* Sections */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5">
                Sections <span className="text-red-500">*</span>
                <span className="text-slate-400 font-normal ml-1">
                  (at least one required)
                </span>
              </label>

              <div className="flex items-center gap-2">
                <InputField
                  label=""
                  value={sectionInput}
                  placeholder="e.g. Block A"
                  onChange={setSectionInput}
                />

                <button
                  title="Add section"
                  onClick={addSection}
                  className="rounded-xl p-2 h-9 mt-2 bg-[#0f4c81] text-white hover:opacity-90"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              {form.sections.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.sections.map((s) => (
                    <span
                      key={s._id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0f4c81]/10 text-[#0f4c81] rounded-lg text-sm font-medium"
                    >
                      {s.name}

                      <button
                        title="close"
                        onClick={() => removeSection(s._id)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-red-500 mt-2">
                  Add at least one section
                </p>
              )}
            </div>

            <ActionButton
              label={editArea ? "Save Changes" : "Create Area"}
              onClick={handleSubmit}
            />
          </div>
        </Popup>
      )}
    </>
  );
}

export default memo(AreaRow);
