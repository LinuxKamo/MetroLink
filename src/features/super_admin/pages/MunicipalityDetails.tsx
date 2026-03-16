import { useState, memo } from "react";
import type { Municipality } from "../models/Municipality.model";
import {
  CircleOff,
  Pencil,
  Trash,
  MapPin,
  Building2,
  Users,
  Megaphone,
  MoreVertical,
  ChevronRight,
  Globe,
} from "lucide-react";
import ActionButton from "../../shared/components/ui/ActionButton";
import image from "../../../assets/back.png";
import type { Anouncement } from "../../mananger/models/Anouncement.model";
import AnnouncementCard from "../../shared/components/ui/AnnouncementCard";
import type { User } from "../../shared/models/user.type";

function MunicipalityDetails() {
  const [municipality] = useState<Municipality>({
    _id: "1",
    name: "Volloorus Municipality",
    address: {
      street: "123 Civic Centre Street",
      suburb: "Volloorus South",
      province: "Gauteng",
      postalCode: "1475",
      town: "Ekurhuleni",
    },
  });

  const [users] = useState<User[]>([
    {
      _id: "1",
      name: "John",
      surname: "Doe",
      email: "john.doe@ekurhuleni.gov.za",
      role: "Admin",
      status: "Active",
    },
    {
      _id: "2",
      name: "Kamohelo",
      surname: "Motaung",
      email: "k.motaung@ekurhuleni.gov.za",
      role: "Media Manager",
      status: "Active",
    },
    {
      _id: "3",
      name: "Sarah",
      surname: "Jenkins",
      email: "s.jenkins@ekurhuleni.gov.za",
      role: "Department Head",
      status: "Active",
    },
    {
      _id: "4",
      name: "David",
      surname: "Langa",
      email: "d.langa@ekurhuleni.gov.za",
      role: "Field Foreman",
      status: "Active",
    },
  ]);

  const announcements: Anouncement[] = [
    {
      Areas: ["Mailula", "Mabopane", "Soshanguve"],
      sections: ["Section 1", "Section 2"],
      likes: 42,
      content:
        "Planned water maintenance for the upcoming weekend. Please ensure all reservoirs are filled.",
      date: "2026-03-14",
      announcerName: "John Doe",
      Initials: "JD",
      imageurl: [image],
    },
    {
      Areas: ["Volloorus Central"],
      sections: ["Block A"],
      likes: 18,
      content:
        "New waste collection schedule starting from April 1st. Check your local notices for details.",
      date: "2026-03-12",
      announcerName: "Jane Smith",
      Initials: "JS",
    },
  ];

  const getInitials = (user: User) =>
    (user.name[0] + user.surname[0]).toUpperCase();

  return (
    <div className="flex flex-col space-y-8 pb-32 max-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm">
        <div className="h-32 bg-linear-to-r from-[#0f4c81]/80 to-[#1e293b] relative">
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="h-32 w-32 rounded-2xl bg-white p-2 shadow-lg border border-neutral-100">
              <div className="h-full w-full rounded-xl bg-neutral-100 flex items-center justify-center">
                <img
                  src={image}
                  alt="Municipality Logo"
                  className="h-full w-full object-cover opacity-80"
                />
              </div>
            </div>
            <div className="pb-4 flex flex-col">
              <h1 className="text-3xl font-extrabold text-[#1e293b]">
                {municipality.name}
              </h1>
              <div className="flex items-center space-x-2 text-neutral-500 font-medium">
                <MapPin className="size-4 text-[#0073d7]" />
                <span>
                  {municipality.address.town}, {municipality.address.province}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-20 flex items-center justify-end px-8 space-x-3">
          <ActionButton label="Edit Municipality" Icon={Pencil} />
          <ActionButton label="Public Website" Icon={Globe} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        {/* Left Stats & Info */}
        <div className="lg:col-span-1 space-y-6 sticky top-20">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <h3 className="font-bold text-[#1e293b] flex items-center gap-2 mb-6">
              <Building2 className="size-4 text-[#0f4c81]" />
              Office Information
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                  Physical Address
                </label>
                <p className="text-sm font-semibold text-[#334155] leading-relaxed">
                  {municipality.address.street}
                  <br />
                  {municipality.address.suburb}
                  <br />
                  {municipality.address.town}, {municipality.address.postalCode}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0f4c81]/5 rounded-xl border border-[#0f4c81]/10 group cursor-pointer hover:bg-[#0f4c81]/10 transition-colors">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0f4c81] uppercase tracking-wide">
                    Active Departments
                  </span>
                  <span className="text-2xl font-black text-[#0f4c81]">8</span>
                </div>
                <ChevronRight className="size-5 text-[#0f4c81] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Megaphone className="size-24 rotate-12" />
            </div>
            <h4 className="text-lg font-bold mb-2 relative z-10">
              Broadcast Alert
            </h4>
            <p className="text-neutral-400 text-xs mb-4 relative z-10 leading-relaxed">
              Send an urgent notification to all citizens within this
              municipality.
            </p>
            <button className="w-full py-3 bg-white text-[#1e293b] font-bold rounded-xl text-xs hover:bg-neutral-200 transition-colors relative z-10">
              Create New Broadcast
            </button>
          </div>
        </div>

        {/* Center/Right Content */}
        <div className="lg:col-span-2 space-y-8 overflow-y-scroll">
          {/* Managers Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-[#1e293b] flex items-center gap-2">
                <Users className="size-5 text-[#0f4c81]" />
                Municipality Management
              </h2>
              <button className="text-xs font-bold text-[#0f4c81] hover:underline">
                View All Users
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm hover:border-[#0f4c81]/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-linear-to-br from-[#0f4c81]/10 to-[#0f4c81]/5 flex items-center justify-center text-[#0f4c81] font-bold ring-1 ring-[#0f4c81]/10 group-hover:scale-105 transition-transform">
                      {getInitials(user)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1e293b]">
                        {user.name} {user.surname}
                      </span>
                      <span className="text-[10px] font-bold text-[#0f4c81] uppercase tracking-wide">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 text-neutral-300 hover:text-neutral-500 rounded-lg hover:bg-neutral-50">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-[#1e293b] flex items-center gap-2">
                <Megaphone className="size-5 text-[#0f4c81]" />
                Recent Announcements
              </h2>
              <span className="px-2 py-0.5 bg-neutral-100 rounded text-xs text-neutral-500 font-bold">
                Latest Updates
              </span>
            </div>

            <div className="space-y-6">
              {announcements.map((anniversary, index) => (
                <AnnouncementCard
                  key={index}
                  {...anniversary}
                  canManage={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-8 right-8 flex space-x-4 z-40">
        <div className="group relative mr-6">
          <ActionButton
            label="Block Municipality"
            Icon={CircleOff}
            color="bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 py-4 px-6 scale-110"
          />
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
            Suspend municipality access
          </div>
        </div>

        <div className="group relative">
          <ActionButton
            label="Delete Municipality"
            Icon={Trash}
            color="bg-[#1e293b] hover:bg-black shadow-lg shadow-neutral-300 py-4 px-6 scale-110"
          />
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
            Permanently remove record
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MunicipalityDetails);
