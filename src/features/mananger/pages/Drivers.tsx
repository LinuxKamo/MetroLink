import { memo, useState } from "react";
import DriverCard from "../components/ui/DriverCard";
import ActionButton from "../../shared/components/ui/ActionButton";
import { UserRoundPlus } from "lucide-react";
import SearchBar from "../components/ui/SearchBar";
import Popup from "../../shared/components/Popup";
import InputField from "../../shared/components/ui/InputField";

function Drivers() {
  const [search, setSearch] = useState("");
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "available" | "on trip"
  >("all");
  const drivers: Array<{
    email: string;
    name: string;
    surname: string;
    initials: string;
    status: "available" | "on trip";
    lastTripDate: string;
    phoneNumber: string;
    licensePlate: string;
    truckCapacity: number;
  }> = [
    {
      email: "text@texr.com",
      name: "John",
      surname: "Doe",
      initials: "JD",
      status: "available",
      lastTripDate: "2026-02-15",
      phoneNumber: "+27 12 345 6789",
      licensePlate: "ZN 123 GP",
      truckCapacity: 5000,
    },
    {
      email: "text@texr.com",
      name: "Jane",
      surname: "Smith",
      initials: "JS",
      status: "on trip",
      lastTripDate: "2026-02-15",
      phoneNumber: "+27 98 765 4321",
      licensePlate: "RS 987 MP",
      truckCapacity: 8000,
    },
    {
      email: "text@texr.com",
      name: "Mike",
      surname: "Johnson",
      initials: "MJ",
      status: "available",
      lastTripDate: "2026-02-15",
      phoneNumber: "+27 45 678 1234",
      licensePlate: "KP 456 NW",
      truckCapacity: 12000,
    },
    {
      email: "text@texr.com",
      name: "Sarah",
      surname: "Wilson",
      initials: "SW",
      status: "available",
      lastTripDate: "2026-02-15",
      phoneNumber: "+27 32 109 8765",
      licensePlate: "WQ 321 LP",
      truckCapacity: 10000,
    },
  ];
  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(search.toLowerCase()) ||
      driver.surname.toLowerCase().includes(search.toLowerCase()) ||
      driver.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || driver.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col space-y-1">
          <h2 className="text-2xl font-bold mt-5">Drivers</h2>
          <span className="text-neutral-500/70 text-sm">
            Manage your drivers and their assignments
          </span>
        </div>
        <ActionButton label="Invite driver" Icon={UserRoundPlus} onClick={()=>setOpenInviteModal(!openInviteModal)} />
      </div>
      <div className="flex flex-row gap-3 items-center">
        {/* Search */}
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Status Filters */}
        {["all", "available", "on trip"].map((status) => (
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
              : status === "available"
                ? "Available"
                : "On Trip"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredDrivers.map((driver, index) => (
          <DriverCard
            key={index}
            email={driver.email}
            initials={driver.initials}
            lastTripDate={driver.lastTripDate}
            name={driver.name}
            surname={driver.surname}
            phoneNumber={driver.phoneNumber}
            licensePlate={driver.licensePlate}
            truckCapacity={driver.truckCapacity}
            status={driver.status}
          />
        ))}
      </div>

      {openInviteModal && (
        <Popup
          isOpen={openInviteModal}
          onClose={() => setOpenInviteModal(false)}
        >
          <div className="space-y-3">
            <h1 className="font-semibold text-lg">Invite Driver</h1>
            <div className="flex flex-col space-y-2">
              <InputField label="Name" placeholder="First name" />
              <InputField label="Surname" placeholder="Last name" />
              <InputField label="Email" placeholder="Email address" />
              <InputField label="Phone Number" placeholder="Phone number" />
              <InputField label="Vehicle registration/ Licence Plate" placeholder="Vehicle registration or licence plate" />
              <InputField type="number" label="Truvk water Capacity(liters)" placeholder="Capacity in liters" />
              <InputField type="number" label="Estimated Trip Duration(Minutes)" placeholder="Duration in minutes" />
              <div className="h-4"></div>
              <ActionButton isDisabled={true} label="Send Invite" />
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}

export default memo(Drivers);
