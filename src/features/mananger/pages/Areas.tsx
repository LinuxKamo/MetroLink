import { Loader2, MapPin, Plus, X } from "lucide-react";
import SearchBar from "../components/ui/SearchBar";
import { useEffect, useState } from "react";
import ActionButton from "../../shared/components/ui/ActionButton";
import type { Area } from "../models/Area.model";
import AreaRow from "../components/ui/AreaRow";
import Popup from "../../shared/components/Popup";
import InputField from "../../shared/components/ui/InputField";
import type { Section } from "../models/Section.model";

function Areas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    const areases: Area[] = [
      {
        _id: 1,
        name: "Mailula",
        municipality: "Municipality of Vosloorus",
        sections: [
          {
            _id: 1,
            name: "Section 1",
            image_url: ["./mask.png", "./mask.png", "./mask.png"],
          },
          { _id: 2, name: "Section 2", image_url: ["./mask.png"] },
        ],
      },
      {
        _id: 2,
        name: "Mabopane",
        municipality: "Tshwane Municipality",
        sections: [
          {
            _id: 1,
            name: "Section 1",
            image_url: ["./mask.png", "./mask.png"],
          },
        ],
      },
      {
        _id: 3,
        name: "Soshanguve",
        municipality: "Tshwane Municipality",
        sections: [
          {
            _id: 1,
            name: "Section 1",
            image_url: ["./mask.png", "./mask.png", "./mask.png"],
          },
          {
            _id: 2,
            name: "Section 2",
            image_url: ["./mask.png", "./mask.png"],
          },
          { _id: 2, name: "Section 2", image_url: ["./mask.png"] },
        ],
      },
      {
        _id: 4,
        name: "Garankuwa",
        municipality: "Tshwane Municipality",
        sections: [
          {
            _id: 1,
            name: "Section 1",
            image_url: ["./mask.png", "./mask.png"],
          },
          {
            _id: 2,
            name: "Section 2",
            image_url: ["./mask.png", "./mask.png"],
          },
        ],
      },
      {
        _id: 5,
        name: "Pretoria",
        municipality: "Tshwane Municipality",
        sections: [
          {
            _id: 1,
            name: "Section 1",
            image_url: ["./mask.png", "./mask.png"],
          },
          { _id: 2, name: "Section 2", image_url: ["./mask.png"] },
          {
            _id: 2,
            name: "Section 2",
            image_url: ["./mask.png", "./mask.png"],
          },
          { _id: 2, name: "Section 2", image_url: ["./mask.png"] },
        ],
      },
    ];
    setLoading(true);

    // load from API later
    setAreas(areases);

    setLoading(false);
  };
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
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Areas</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage delivery areas and their sections
          </p>
        </div>

        <ActionButton
          label="Add Area"
          Icon={Plus}
          onClick={() => setOpenCreate(!openCreate)}
        />
      </div>

      {/* SEARCH */}
      <div className="relative">
        <SearchBar
          placeholder="Search areas..."
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* LIST */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : areas.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/60">
          <MapPin className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No areas yet</p>
          <p className="text-slate-400 text-sm mt-1">
            Create your first area to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {areas
            .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
            .map((area) => (
              <AreaRow key={area._id} area={area} />
            ))}
        </div>
      )}

      {openCreate && (
        <Popup isOpen={openCreate} onClose={() => setOpenCreate(!openCreate)}>
          <div className="space-y-4">
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

            <ActionButton label={"Create Area"} onClick={handleSubmit} />
          </div>
        </Popup>
      )}
    </>
  );
}

export default Areas;
