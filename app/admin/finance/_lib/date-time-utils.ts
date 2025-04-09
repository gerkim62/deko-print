// Helper to get the start of today.
export function getTodayStart(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
// Helper to get the start of yesterday.
export function getYesterdayStart(todayStart: Date): Date {
  return new Date(todayStart.getTime() - 86400000); // 1 day = 86,400,000 ms
}
// Helper to get the start of the current week (assuming week starts on Monday).
export function getWeekStart(todayStart: Date): Date {
  // JavaScript getDay() returns 0 (Sunday) to 6 (Saturday).
  // Calculate diff from Monday: if today is Monday, diff = 0;
  // if today is Sunday (0), diff = 6.
  const day = todayStart.getDay();
  const diff = day === 0 ? 6 : day - 1;
  return new Date(todayStart.getTime() - diff * 86400000);
}
// Helper to get the start of last week.
export function getLastWeekStart(weekStart: Date): Date {
  return new Date(weekStart.getTime() - 7 * 86400000);
}
// Helper to get the start of the current month.
export function getMonthStart(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), 1);
}
// Helper to get the start of last month.
export function getLastMonthStart(now: Date): Date {
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  return new Date(year, month, 1);
}
