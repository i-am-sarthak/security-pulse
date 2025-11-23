import { useAuth } from "../context/useAuth";
import { Dashboard } from "./Dashboard";

export const DashboardPublicWrapper = () => {
  const { isAuthenticated } = useAuth();

  return <Dashboard readOnly={!isAuthenticated} />;
};
