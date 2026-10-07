export type UserDashboardData = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;

  newUsers: {
    current: number;
    previous: number;
    changePercent: number | null;
  };
};