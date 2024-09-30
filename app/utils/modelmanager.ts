// utils/modelManager.ts
import { DEFAULT_MODELS } from "../constant";
import { Role } from "./auth";

interface RolebaseModelConfig {
  name: string;
  available: boolean;
  provider: {
    id: string;
    providerName: string;
    providerType: string;
  };
}

// 角色可以的模型
const roleModelMap: Record<Role, string[]> = {
  teacher: ["claude-3-sonnet-20240229", "gpt-4"],
  assistant: ["gpt-3.5-turbo", "gpt-4", "gemini-1.5-flash"],
  student: [
    "gpt-3.5-turbo",
    "gpt-4o-mini",
    "gpt-3.5-turbo",
    "claude-3-5-sonnet-20240620",
    "llama-3.1-sonar-small-128k-online",
  ],
  guest: [
    "gpt-3.5-turbo",
    "gemini-1.5-flash",
    "claude-3-sonnet-20240229",
    "llama-3.1-sonar-small-128k-online",
  ],
};

// 獲取角色可以用的模型
export function getModelsForRole(role: Role): RolebaseModelConfig[] {
  const allowedModelNames = roleModelMap[role];
  return DEFAULT_MODELS.filter((model) =>
    allowedModelNames.includes(model.name),
  );
}

// 更新角色的可用模型
export function updateRoleModels(role: Role, modelNames: string[]) {
  roleModelMap[role] = modelNames;
}

// 為角色添加模型
export function addModelToRole(role: Role, modelName: string) {
  if (!roleModelMap[role].includes(modelName)) {
    roleModelMap[role].push(modelName);
  }
}

// 從角色中移除model
export function removeModelFromRole(role: Role, modelName: string) {
  roleModelMap[role] = roleModelMap[role].filter((name) => name !== modelName);
}

// 檢查模型是否可以被角色所用
export function isModelAllowedForRole(role: Role, modelName: string): boolean {
  return roleModelMap[role].includes(modelName);
}

// 獲取能用特定模型的角色
export function getAllowedRoles(modelName: string): Role[] {
  return (Object.entries(roleModelMap) as [Role, string[]][])
    .filter(([_, models]) => models.includes(modelName))
    .map(([role]) => role);
}
