import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for admin operations
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: "volunteer" | "leadership" | "admin"
  created_at: string
  updated_at: string
}

export interface Opportunity {
  id: string
  title: string
  description: string | null
  location: string | null
  date_time: string | null
  max_volunteers: number | null
  current_volunteers: number
  created_by: string | null
  status: "active" | "inactive" | "completed"
  created_at: string
  updated_at: string
}

export interface VolunteerSignup {
  id: string
  opportunity_id: string
  volunteer_id: string
  status: "registered" | "confirmed" | "cancelled"
  created_at: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  template_type: "welcome" | "opportunity_reminder" | "confirmation" | "custom"
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface EmailServer {
  id: string
  name: string
  smtp_host: string
  smtp_port: number
  smtp_user: string
  smtp_password: string
  from_email: string
  is_active: boolean
  created_by: string | null
  created_at: string
}
