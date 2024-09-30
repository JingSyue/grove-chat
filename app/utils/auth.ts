// utils/auth.ts
export type Role = "teacher" | "assistant" | "student" | "guest";
// 定義role層級
export const ROLE_HIERARCHY: Record<Role, number> = {
  teacher: 4,
  assistant: 3,
  student: 2,
  guest: 1,
};

// 檢查是否有權限
export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
