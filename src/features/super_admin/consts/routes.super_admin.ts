export const SUPER_ADMIN_DASHBOARD = "/admin";
export const SUPER_ADMIN_USERS = "/admin/users";
export const SUPER_ADMIN_USERS_DEPARTMENT = "/admin/users/department";
export const SUPER_ADMIN_USERS_MUNICIPALITY = "/admin/users/municipality";
export const SUPER_ADMIN_ANNOUNCEMENTS = "/admin/announcements";
export const SUPER_ADMIN_CREATE_ANNOUNCEMENT = "/admin/announcements/create";
export const SUPER_ADMIN_PROFILE = "/admin/profile";
export const SUPER_ADMIN_SETTINGS = "/admin/settings";
export const SUPER_ADMIN_LOGS = "/admin/logs";
export const SUPER_ADMIN_ANALYTICS = "/admin/analytics";
export const SUPER_ADMIN_AREAS = "/admin/areas";
export const SUPER_ADMIN_DEPARTMENT = "/admin/department";
export const SUPER_ADMIN_MUNICIPALITY = "/admin/municipality";
export const SUPER_ADMIN_USER_DETAILS = "/admin/user/:_id";
export const SUPER_ADMIN_USER_DETAILS_BYID = (id: string) =>
  `/admin/user/${id}`;
export const SUPER_ADMIN_USER_INVITE = "/admin/user/invite";
export const SUPER_ADMIN_MUNICIPALITY_DETAILS = "/admin/municipality/:_id";
export const SUPER_ADMIN_MUNICIPALITY_DETAILS_BYID = (id: string) =>
  `/admin/municipality/${id}`;
export const SUPER_ADMIN_NOTIFICATIONS = "/admin/notifications";
