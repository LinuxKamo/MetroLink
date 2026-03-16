import { useState } from "react";
import SearchBar from "../../mananger/components/ui/SearchBar";
import Table from "../../shared/components/Table";
import type { User } from "../../shared/models/user.type";
import UserTableRow from "../components/ui/UserTableRow";

function DepartmentUsers() {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<
    "all" | "water" | "road" | "waste" | "power"
  >("all");

  const users: User[] = [
    {
      _id: "1",
      name: "John",
      surname: "Doe",
      email: "john@demo.com",
      role: "Admin",
      department: "water",
      status: "active",
      municipality: "Johannesburg",
      phone: "0812345678",
      profile_image: "",
    },
    {
      _id: "2",
      name: "Peter",
      surname: "Smith",
      email: "peter@demo.com",
      role: "Forman",
      department: "water",
      status: "active",
      municipality: "Cape Town",
      phone: "0823456789",
      profile_image: "",
    },
    {
      _id: "3",
      name: "David",
      surname: "Johnson",
      email: "david@demo.com",
      role: "Driver",
      department: "road",
      status: "inactive",
      municipality: "Durban",
      phone: "0834567890",
      profile_image: "",
    },
    {
      _id: "4",
      name: "Sarah",
      surname: "Williams",
      email: "sarah@demo.com",
      role: "Media",
      department: "water",
      status: "active",
      municipality: "Pretoria",
      phone: "0845678901",
      profile_image: "",
    },
    {
      _id: "5",
      name: "Michael",
      surname: "Brown",
      email: "michael@demo.com",
      role: "Normal User",
      department: "road",
      status: "inactive",
      municipality: "Bloemfontein",
      phone: "0856789012",
      profile_image: "",
    },
  ];

  // Filtered users based on search, department, and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.surname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" ||
      user.department?.toLowerCase() === departmentFilter.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex-1">
          <SearchBar
            placeholder="Search user"
            value={search}
            onChange={setSearch}
          />
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap gap-2">
          {["all", "water", "road", "waste", "power"].map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept as any)}
              className={`px-4 py-2 h-8 text-xs rounded-lg transition-all text-center ${
                departmentFilter.toLowerCase() === dept.toLowerCase()
                  ? "bg-[#0f4c81] shadow text-white font-medium"
                  : "text-neutral-500/80 bg-white/90 border border-neutral-500/20 font-semibold hover:text-black"
              }`}
            >
              {dept === "all"
                ? "All"
                : dept.charAt(0).toUpperCase() + dept.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* USERS GRID */}
      <div className="flex flex-col gap-4">
        <Table
          heading="Department Users"
          tableHeadings={[
            "User Details",
            "Email",
            "Status",
            "Role",
            "Department",
            "Actions",
          ]}
          row={filteredUsers.map((user) => (
            <UserTableRow
              key={user.email}
              user={user}
              showStatus={true}
              showDepartment={true}
              onDelete={(email) => console.log("Delete", email)}
            />
          ))}
        />
      </div>
    </div>
  );
}

export default DepartmentUsers;
