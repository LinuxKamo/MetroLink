import { Route } from "react-router-dom";
import {
  SUPER_ADMIN_USERS,
  SUPER_ADMIN_ANNOUNCEMENTS,
  SUPER_ADMIN_LOGS,
  SUPER_ADMIN_ANALYTICS,
  SUPER_ADMIN_AREAS,
  SUPER_ADMIN_MUNICIPALITY,
  SUPER_ADMIN_MUNICIPALITY_DETAILS,
  SUPER_ADMIN_USER_DETAILS,
  SUPER_ADMIN_USERS_MUNICIPALITY,
  SUPER_ADMIN_NOTIFICATIONS,
  SUPER_ADMIN_CREATE_ANNOUNCEMENT,
} from "../consts/routes.super_admin";
import PageLayout from "../../layout/PageLayout";
import Dashboard from "../pages/Dashboard";
import Logs from "../pages/Logs";
import Analytics from "../pages/Analytics";
import Announcements from "../../shared/pages/Announcements";
import Areas from "../pages/Areas";
import MunicipalityDetails from "../pages/MunicipalityDetails";
import UserDetails from "../pages/UserDetails";
import AllUsers from "../pages/AllUsers";
import MunicipalityUsers from "../pages/MunicipalityUsers";
import UsersManagement from "../pages/UsersManagement";
import MunicipalityPage from "../pages/Municipality";
import Notifications from "../../shared/pages/Notifications";
import MakeAnnouncement from "../../shared/pages/MakeAnnouncement";

export const SuperAdminRoutes = () => {
  return (
    <Route path={"/admin"} element={<PageLayout />}>
      <Route index element={<Dashboard />} />
      <Route path={SUPER_ADMIN_USERS} element={<UsersManagement />}>
        <Route index element={<AllUsers />} />
        <Route
          path={SUPER_ADMIN_USERS_MUNICIPALITY}
          element={<MunicipalityUsers />}
        />
      </Route>
      <Route path={SUPER_ADMIN_ANNOUNCEMENTS} element={<Announcements />} />
      <Route
        path={SUPER_ADMIN_CREATE_ANNOUNCEMENT}
        element={<MakeAnnouncement />}
      />
      <Route path={SUPER_ADMIN_LOGS} element={<Logs />} />
      <Route path={SUPER_ADMIN_ANALYTICS} element={<Analytics />} />
      <Route path={SUPER_ADMIN_AREAS} element={<Areas />} />
      <Route path={SUPER_ADMIN_MUNICIPALITY} element={<MunicipalityPage />} />
      <Route
        path={SUPER_ADMIN_MUNICIPALITY_DETAILS}
        element={<MunicipalityDetails />}
      />
      <Route path={SUPER_ADMIN_USER_DETAILS} element={<UserDetails />} />
      <Route path={SUPER_ADMIN_NOTIFICATIONS} element={<Notifications />} />
    </Route>
  );
};
