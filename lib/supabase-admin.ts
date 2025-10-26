import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase admin environment variables')
}

// ⚠️ ONLY use this on server-side (API routes)
// This bypasses Row Level Security (RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
