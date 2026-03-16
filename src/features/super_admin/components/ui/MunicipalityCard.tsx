import { Eye, Pencil, Trash } from "lucide-react";
import type { Municipality } from "../../models/Municipality.model";
import { useNavigate } from "react-router-dom";
import { SUPER_ADMIN_MUNICIPALITY_DETAILS_BYID } from "../../consts/routes.super_admin";

interface MunicipalityCardProps {
  municipality: Municipality;
  onEdit: () => void;
  onDelete: () => void;
}

function MunicipalityCard({
  municipality,
  onEdit,
  onDelete,
}: MunicipalityCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl hover:border-[#0f4c81]/30 hover:shadow-md transition-all group gap-6"
    >
      <div className="flex flex-row space-x-5 items-center">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#0f4c81]/10 to-[#0f4c81]/5 flex items-center justify-center font-bold text-2xl text-[#0f4c81] ring-1 ring-[#0f4c81]/10">
          {municipality.name[0]}
        </div>

        <div className="flex flex-col space-y-1">
          <span className="font-bold text-[#1e293b] text-lg">{municipality.name}</span>
          <div className="flex items-center space-x-2 text-neutral-500 text-sm">
            <span className="font-medium">{municipality.address.town}</span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs text-neutral-400">{municipality.address.province}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100">
        <button
          onClick={() => navigate(SUPER_ADMIN_MUNICIPALITY_DETAILS_BYID(municipality._id))}
          className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-[#0f4c81]/5 text-[#0f4c81] text-xs font-bold rounded-xl hover:bg-[#0f4c81]/10 transition-colors"
        >
          <Eye className="size-4 mr-2" />
          View Details
        </button>
        
        <button
          onClick={onEdit}
          className="p-2.5 rounded-xl bg-white border border-neutral-100 text-neutral-400 hover:text-[#0f4c81] hover:border-[#0f4c81]/30 hover:bg-[#0f4c81]/5 transition-all shadow-sm"
          title="Edit Municipality"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={onDelete}
          className="p-2.5 rounded-xl bg-white border border-neutral-100 text-neutral-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
          title="Delete Municipality"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}

export default MunicipalityCard;
