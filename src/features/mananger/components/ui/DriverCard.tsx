import { memo, useState } from "react";
import { formatAnnouncementDate } from "../../utils/date";
import ActionButton from "../../../shared/components/ui/ActionButton";
import Popup from "../../../shared/components/Popup";
import type { Area } from "../../models/Area.model";
import InputFieldDropDown from "./InputFieldDropDown";
import type { Section } from "../../models/Section.model";
import { MANANGER_DRIVER_PROFILE_DETAIL } from "../../consts/route.mananger";
import { useNavigate } from "react-router-dom";

interface DriverCardProps {
  initials: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  licensePlate: string;
  truckCapacity: number;
  status: "on trip" | "available";
  lastTripDate: string;
}
function DriverCard({
  name,
  surname,
  email,
  phoneNumber,
  licensePlate,
  truckCapacity,
  status,
  initials,
  lastTripDate,
}: DriverCardProps) {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSections, setSelectedSections] = useState<Section[]>([]);
  const areas: Area[] = [
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
        { _id: 1, name: "Section 1", image_url: ["./mask.png", "./mask.png"] },
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
        { _id: 2, name: "Section 2", image_url: ["./mask.png", "./mask.png"] },
        { _id: 3, name: "Section 3", image_url: ["./mask.png"] },
      ],
    },
    {
      _id: 4,
      name: "Garankuwa",
      municipality: "Tshwane Municipality",
      sections: [
        { _id: 1, name: "Section 1", image_url: ["./mask.png", "./mask.png"] },
        { _id: 2, name: "Section 2", image_url: ["./mask.png", "./mask.png"] },
      ],
    },
    {
      _id: 5,
      name: "Pretoria",
      municipality: "Tshwane Municipality",
      sections: [
        { _id: 1, name: "Section 1", image_url: ["./mask.png", "./mask.png"] },
        { _id: 2, name: "Section 2", image_url: ["./mask.png"] },
        { _id: 3, name: "Section 3", image_url: ["./mask.png", "./mask.png"] },
        { _id: 4, name: "Section 4", image_url: ["./mask.png"] },
      ],
    },
  ];
  const trips: Array<Area> = [
    {
      _id: "1",
      name: "Mailula",
      municipality: "Municipality of Vosloorus",
      sections: [
        {
          _id: "1",
          image_url: ["https://example.com/image1.jpg"],
          name: "Section 1",
        },
        {
          _id: "2",
          image_url: ["https://example.com/image2.jpg"],
          name: "Section 2",
        },
        {
          _id: "3",
          image_url: ["https://example.com/image3.jpg"],
          name: "Section 3",
        },
      ],
    },
    {
      _id: "1",
      name: "Extension 28",
      municipality: "Municipality of Vosloorus",
      sections: [
        {
          _id: "1",
          image_url: ["https://example.com/image1.jpg"],
          name: "Section 1",
        },
        {
          _id: "2",
          image_url: ["https://example.com/image2.jpg"],
          name: "Section 2",
        },
        {
          _id: "3",
          image_url: ["https://example.com/image3.jpg"],
          name: "Section 3",
        },
        {
          _id: "4",
          image_url: ["https://example.com/image4.jpg"],
          name: "Section 4",
        },
      ],
    },
  ];

  const [showAreaSections, setShowAreaSections] = useState<Section[]>([]);
  const toggleAreaSections = (areaId: string) => {
    const area = areas.find((a) => String(a._id) === areaId);

    if (area) {
      setShowAreaSections(area.sections);
    } else {
      setShowAreaSections([]);
    }
  };
  const toggleSection = (section: Section) => {
    const exists = selectedSections.find((s) => s._id === section._id);

    if (exists) {
      setSelectedSections(
        selectedSections.filter((s) => s._id !== section._id),
      );
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="p-4 rounded-2xl border border-neutral-400/20 bg-white/80 flex flex-col space-y-4 hover:bg-neutral-400/5">
        <div
          onClick={() => navigate(MANANGER_DRIVER_PROFILE_DETAIL("1"))}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <div className="flex flex-row space-x-4">
            <div className="bg-linear-to-br from-blue-600 to-blue-900 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
              <span>{initials}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-md">{name}</span>
              <span className="text-neutral-500 text-xs">{email}</span>
            </div>
          </div>
          {/* Status */}
          <span
            className={`px-2 py-2 rounded-lg text-xs font-medium ${
              status === "on trip"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="text-neutral-500 text-xs">
            Last Trip: {formatAnnouncementDate(lastTripDate)}
          </span>
          {/* Action Button */}
          <ActionButton
            onClick={() => setOpenPopup(!openPopup)}
            label="Assign Trip"
          />
        </div>
      </div>
      {openPopup && (
        <Popup isOpen={openPopup} onClose={() => setOpenPopup(false)}>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row space-x-2 bg-neutral-400/10 mt-5 p-4 rounded-lg">
              <div className="bg-linear-to-br from-blue-600 to-blue-900 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                <span>{initials}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-semibold text-md">{name} {surname}</span>
                <span className="text-neutral-500 text-xs">{email}</span>
              </div>
            </div>

            {/* Basic Driver Details */}
            <div className="flex flex-col space-y-2 text-neutral-600/90 bg-neutral-400/10 p-4 rounded-lg">
              <span className="text-sm font-bold">Driver Information</span>
              <div className="flex flex-col space-y-1 text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Phone:</span>
                  <span>{phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Email:</span>
                  <span>{email}</span>
                </div>
              </div>
            </div>

            {/* Truck Details */}
            <div className="flex flex-col space-y-2 text-neutral-600/90 bg-neutral-400/10 p-4 rounded-lg">
              <span className="text-sm font-bold">Truck Details</span>
              <div className="flex flex-col space-y-1 text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Registration:</span>
                  <span className="uppercase font-semibold">{licensePlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Capacity:</span>
                  <span>{truckCapacity.toLocaleString()} Liters</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 text-neutral-600/90 bg-neutral-400/10 p-4 rounded-lg">
              <span className="text-sm font-bold">Trip Logs</span>
              <div className="text-xs font-medium">
                {trips && trips.length > 0 ? (
                  trips.map((trip) => (
                    <div key={trip._id} className="">
                      <span className=" line-clamp-1">
                        {trip.name} (
                        {trip.sections.map((s) => s.name).join(", ")})
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-neutral-500 text-sm">
                    No trip logs available.
                  </span>
                )}
              </div>
            </div>
            <div>
              <InputFieldDropDown
                value={selectedArea}
                onChange={(value) => {
                  setSelectedArea(value);
                  toggleAreaSections(value);
                  setSelectedSections([]); // reset when area changes
                }}
                placeholder="Select an area"
                label="Select Area"
                options={areas.map((area) => ({
                  label: area.name,
                  value: String(area._id),
                }))}
              />
              {showAreaSections.length > 0 && (
                <div className="mt-4 flex flex-col space-y-3">
                  <span className="text-xs font-semibold text-neutral-500">
                    Select Sections
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {showAreaSections.map((section) => {
                      const isSelected = selectedSections.some(
                        (s) => s._id === section._id,
                      );

                      return (
                        <div
                          key={section._id}
                          onClick={() => toggleSection(section)}
                          className={`text-xs text-center cursor-pointer py-1 px-2 rounded-lg transition font-medium
                            ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : " bg-neutral-500/20 hover:bg-blue-50"
                            }`}
                        >
                          {section.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <ActionButton label="Assign Trip" isDisabled={true} />
          </div>
        </Popup>
      )}
    </>
  );
}

export default memo(DriverCard);
