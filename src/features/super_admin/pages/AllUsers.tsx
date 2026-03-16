import type { User } from "../../shared/models/user.type";
import { useState } from "react";
import SearchBar from "../../mananger/components/ui/SearchBar";
import Table from "../../shared/components/Table";
import UserTableRow from "../components/ui/UserTableRow";

function AllUsers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Admin" | "media" | "driver" | "Forman" | "normal user"
  >("all");

  const users: User[] = [
    {
      _id: "1",
      name: "John",
      surname: "Doe",
      email: "john@demo.com",
      role: "Admin",
    },
    {
      _id: "2",
      name: "Peter",
      surname: "Smith",
      email: "peter@demo.com",
      role: "forman",
    },
    {
      _id: "3",
      name: "David",
      surname: "Johnson",
      email: "david@demo.com",
      role: "driver",
    },
    {
      _id: "4",
      name: "Sarah",
      surname: "Williams",
      email: "sarah@demo.com",
      role: "media",
    },
    {
      _id: "5",
      name: "Michael",
      surname: "Brown",
      email: "michael@demo.com",
      role: "normal user",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.surname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = statusFilter === "all" || user.role === statusFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="space-y-6">
        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "Admin", "Forman", "media", "driver", "normal user"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`
            px-4 py-2 h-8 text-xs rounded-lg transition-all text-center
            ${
              statusFilter === status
                ? "bg-[#0f4c81] shadow text-white font-medium"
                : "text-neutral-500/80 bg-white/90 border border-neutral-500/20 font-semibold hover:text-black"
            }
          `}
                >
                  {status === "all"
                    ? "All"
                    : status === "Admin"
                      ? "Admins"
                      : status === "Forman"
                        ? "Managers"
                        : status === "media"
                          ? "Media"
                          : status === "normal user"
                            ? "Normal User"
                            : "Drivers"}
                </button>
              ),
            )}
          </div>
        </div>

        {/* USERS GRID */}
        <div className="flex flex-col gap-4">
          <Table
            heading="Platform Users"
            tableHeadings={["User Details", "Email Address", "Role", "Actions"]}
            row={filteredUsers.map((user) => (
              <UserTableRow 
                key={user.email} 
                user={user} 
                onDelete={(email) => console.log("Delete", email)} 
              />
            ))}
          />
        </div>
      </div>
    </>
  );
}

export default AllUsers;
