// lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * 根據傳入的 Clerk Supabase JWT 創建 Supabase 客戶端
 * @param token Clerk Supabase JWT
 * @returns 配置了授權標頭的 SupabaseClient 實例
 */
export const createSupabaseClient = (token: string | null): SupabaseClient => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  });
};
