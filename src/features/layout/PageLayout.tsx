import {
  ChartArea,
  FileCheck,
  Home,
  LayoutPanelLeft,
  MapPin,
  Megaphone,
  Truck,
  User,
  Activity,
  Users,
  HousePlus,
  Bell,
} from "lucide-react";

import type { MenuItem } from "./menuItem";
import { Outlet } from "react-router-dom";

import {
  SUPER_ADMIN_DASHBOARD,
  SUPER_ADMIN_USERS,
  SUPER_ADMIN_ANNOUNCEMENTS,
  SUPER_ADMIN_LOGS,
  SUPER_ADMIN_ANALYTICS,
  SUPER_ADMIN_AREAS,
  SUPER_ADMIN_MUNICIPALITY,
  SUPER_ADMIN_NOTIFICATIONS,
} from "../super_admin/consts/routes.super_admin";

import {
  MANANGER_ANALYTICS,
  MANANGER_ANNOUNCEMENTS,
  MANANGER_AREAS,
  MANANGER_DASHBOARD,
  MANANGER_DRIVERS,
  MANANGER_NOTIFICATIONS,
  MANANGER_TRIPTRACKING,
  MANANGER_USERS,
} from "../mananger/consts/route.mananger";

import {
  MEDIA_ANNOUNCEMENTS,
  MEDIA_HOME,
  MEDIA_NOTIFICATIONS,
  MEDIA_PROFILE,
} from "../media/const/routes.media";

import Sidebar from "../mananger/components/Sidebar";
import { useCollapse } from "../shared/context/collapse.context";
import { useRoleSelection } from "../shared/context/roleselection.context";

function PageLayout() {
  const { currentRole } = useRoleSelection();
  const { collapsed } = useCollapse();

  const mediaTeamNav: MenuItem[] = [
    { name: "Home", icon: Home, url: MEDIA_HOME },
    { name: "Announcements", icon: Megaphone, url: MEDIA_ANNOUNCEMENTS },
    { name: "Notifications", icon: Bell, url: MEDIA_NOTIFICATIONS },
    { name: "Profile", icon: User, url: MEDIA_PROFILE },
  ];

  const managerNav: MenuItem[] = [
    { name: "Dashboard", icon: LayoutPanelLeft, url: MANANGER_DASHBOARD },
    { name: "Announcements", icon: Megaphone, url: MANANGER_ANNOUNCEMENTS },
    { name: "Drivers", icon: Truck, url: MANANGER_DRIVERS },
    { name: "Trip Tracking", icon: FileCheck, url: MANANGER_TRIPTRACKING },
    { name: "Areas", icon: MapPin, url: MANANGER_AREAS },
    { name: "Users", icon: Users, url: MANANGER_USERS },
    { name: "Analytics", icon: ChartArea, url: MANANGER_ANALYTICS },
    { name: "Notifications", icon: Bell, url: MANANGER_NOTIFICATIONS },
  ];

  const adminNav: MenuItem[] = [
    { name: "Dashboard", icon: LayoutPanelLeft, url: SUPER_ADMIN_DASHBOARD },
    { name: "Users", icon: Users, url: SUPER_ADMIN_USERS },
    { name: "Announcements", icon: Megaphone, url: SUPER_ADMIN_ANNOUNCEMENTS },
    { name: "Municipalities", icon: HousePlus, url: SUPER_ADMIN_MUNICIPALITY },
    { name: "Areas", icon: MapPin, url: SUPER_ADMIN_AREAS },
    { name: "Logs", icon: Activity, url: SUPER_ADMIN_LOGS },
    { name: "Analytics", icon: ChartArea, url: SUPER_ADMIN_ANALYTICS },
    { name: "Notifications", icon: Bell, url: SUPER_ADMIN_NOTIFICATIONS },
  ];

  let currentNav: MenuItem[] = [];

  switch (currentRole) {
    case "superadmin":
      currentNav = adminNav;
      break;

    case "manager":
      currentNav = managerNav;
      break;

    case "mediateam":
      currentNav = mediaTeamNav;
      break;

    default:
      currentNav = [];
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar list={currentNav} />

      {/* Main Content */}
      <main
        className={`${
          !collapsed ? "ml-70" : "ml-30"
        } lg:px-10 flex-1 overflow-y-auto space-y-3 pt-10 pb-10 transition-all duration-300`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;
