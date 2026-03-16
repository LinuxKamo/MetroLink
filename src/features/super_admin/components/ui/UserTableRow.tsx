import { memo } from "react";
import { Trash2, MoreVertical, Eye } from "lucide-react";
import type { User } from "../../../shared/models/user.type";
import { useNavigate } from "react-router-dom";
import { SUPER_ADMIN_USER_DETAILS_BYID } from "../../consts/routes.super_admin";

interface UserTableRowProps {
  user: User;
  onDelete?: (email: string) => void;
  showStatus?: boolean;
  showDepartment?: boolean;
  showMunicipality?: boolean;
}

function UserTableRow({ 
  user, 
  onDelete, 
  showStatus = false, 
  showDepartment = false, 
  showMunicipality = false 
}: UserTableRowProps) {
  const navigate = useNavigate();

  const getInitials = (name: string, surname: string) => {
    return (name[0] || "") + (surname[0] || "");
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "text-blue-600 bg-blue-50";
      case "manager":
      case "forman":
        return "text-purple-600 bg-purple-50";
      case "media":
        return "text-green-600 bg-green-50";
      case "driver":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-neutral-600 bg-neutral-50";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-green-600 bg-green-50";
      case "inactive":
        return "text-red-600 bg-red-50";
      default:
        return "text-neutral-400 bg-neutral-50";
    }
  };

  return (
    <tr className="group hover:bg-neutral-50/50 transition-colors">
      <td className="py-4 pl-4 first:rounded-l-2xl">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-[#0f4c81]/10 to-[#0f4c81]/5 flex items-center justify-center text-[#0f4c81] font-bold text-xs ring-1 ring-[#0f4c81]/10">
            {getInitials(user.name, user.surname)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#1e293b]">
              {user.name} {user.surname}
            </span>
            <span className="text-[11px] text-neutral-400 font-medium">
              {user.email}
            </span>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-neutral-500 font-medium">{user.email}</td>

      {showStatus && (
        <td className="py-4 px-4">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusColor(user.status)}`}>
            {user.status || "N/A"}
          </span>
        </td>
      )}

      <td className="py-4 px-4">
        <span
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getRoleColor(user.role)}`}
        >
          {user.role}
        </span>
      </td>

      {showDepartment && (
        <td className="py-4 px-4 text-neutral-500 font-medium capitalize">
          {user.department || "N/A"}
        </td>
      )}

      {showMunicipality && (
        <td className="py-4 px-4 text-[#0f4c81] font-semibold">
          {user.municipality || "N/A"}
        </td>
      )}

      <td className="py-4 pr-4 last:rounded-r-2xl text-right">
        <div className="flex items-center justify-end space-x-2">
          <button
            className="p-2 hover:bg-[#0f4c81]/5 text-neutral-400 hover:text-[#0f4c81] rounded-lg transition-colors"
            onClick={() => user._id && navigate(SUPER_ADMIN_USER_DETAILS_BYID(user._id))}
            title="View Details"
          >
            <Eye className="size-4" />
          </button>
          <button
            className="p-2 hover:bg-red-50 text-neutral-400 hover:text-red-500 rounded-lg transition-colors"
            onClick={() => onDelete?.(user.email)}
            title="Delete User"
          >
            <Trash2 className="size-4" />
          </button>
          <button className="p-2 hover:bg-neutral-100 text-neutral-400 rounded-lg transition-colors">
            <MoreVertical className="size-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default memo(UserTableRow);
