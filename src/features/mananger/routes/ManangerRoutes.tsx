import { Route } from "react-router-dom";
import {
  MANANGER_ANALYTICS,
  MANANGER_ANNOUNCEMENTS,
  MANANGER_AREAS,
  MANANGER_CREATE_ANNOUNCEMENT,
  MANANGER_DRIVER_PROFILE,
  MANANGER_DRIVERS,
  MANANGER_NOTIFICATIONS,
  MANANGER_TRIPTRACKING,
  MANANGER_USERS,
} from "../consts/route.mananger";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Drivers from "../pages/Drivers";
import Announcements from "../../shared/pages/Announcements";
import PageLayout from "../../layout/PageLayout";
import TripTracking from "../pages/TripTracking";
import Areas from "../pages/Areas";
import Analytics from "../pages/Analytics";
import DriverProfile from "../pages/DriverProfile";
import MakeAnnouncement from "../../shared/pages/MakeAnnouncement";
import Notifications from "../../shared/pages/Notifications";

export const ManangerRoutes = () => {
  return (
    <Route path="/manager" element={<PageLayout />}>
      <Route index element={<Dashboard />} />
      <Route path={MANANGER_USERS} element={<Users />} />
      <Route path={MANANGER_DRIVERS} element={<Drivers />} />
      <Route path={MANANGER_ANNOUNCEMENTS} element={<Announcements />} />
      <Route path={MANANGER_TRIPTRACKING} element={<TripTracking />} />
      <Route path={MANANGER_AREAS} element={<Areas />} />
      <Route path={MANANGER_ANALYTICS} element={<Analytics />} />
      <Route path={MANANGER_DRIVER_PROFILE} element={<DriverProfile />} />
      <Route
        path={MANANGER_CREATE_ANNOUNCEMENT}
        element={<MakeAnnouncement />}
      />
      <Route path={MANANGER_NOTIFICATIONS} element={<Notifications />} />
    </Route>
  );
};
