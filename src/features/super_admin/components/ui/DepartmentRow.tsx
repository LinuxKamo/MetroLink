import { memo } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface DepartmentRowProps {
  department: { _id: string; name: string };
  onEdit: (department: { _id: string; name: string }) => void;
  onDelete: (id: string) => void;
}

function DepartmentRow({ department, onEdit, onDelete }: DepartmentRowProps) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl hover:border-[#0f4c81]/30 hover:shadow-md transition-all group">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0f4c81]/10 to-[#0f4c81]/5 flex items-center justify-center font-bold text-[#0f4c81] ring-1 ring-[#0f4c81]/10">
          {department.name[0]}
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-[#1e293b] text-base">
            {department.name}
          </span>
          <span className="text-xs text-neutral-400 font-medium tracking-tight uppercase">
            Department Office
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(department)}
          className="p-2.5 rounded-xl bg-white border border-neutral-100 text-neutral-400 hover:text-[#0f4c81] hover:border-[#0f4c81]/30 hover:bg-[#0f4c81]/5 transition-all shadow-sm"
          title="Edit Department"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(department._id)}
          className="p-2.5 rounded-xl bg-white border border-neutral-100 text-neutral-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
          title="Delete Department"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default memo(DepartmentRow);
