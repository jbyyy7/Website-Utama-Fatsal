// Database types for Yayasan Fathus Salafi
// These tables are SHARED across all systems (Website, SIAKAD, LMS)

export type UserRole = 
  | 'Admin'
  | 'Foundation Head'
  | 'Principal'
  | 'Staff'
  | 'Teacher'
  | 'Student'

export type Gender = 'L' | 'P'

export type SchoolLevel = 'MA' | 'MTs' | 'MI' | 'RA' | 'TK'

export interface Profile {
  id: string
  email: string
  full_name: string
  identity_number?: string
  role: UserRole
  school_id?: string
  
  // Student specific fields
  place_of_birth?: string
  date_of_birth?: string
  gender?: Gender
  religion?: string
  address?: string
  phone_number?: string
  parent_name?: string
  parent_phone_number?: string
  
  // Teacher specific fields
  subject_ids?: string[]
  
  // Common fields
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface School {
  id: string
  name: string
  level: SchoolLevel
  address?: string
  
  // Location-based attendance
  latitude?: number
  longitude?: number
  location_name?: string
  radius?: number
  location_attendance_enabled?: boolean
  
  // Gate attendance
  gate_attendance_enabled?: boolean
  gate_qr_enabled?: boolean
  gate_face_enabled?: boolean
  gate_manual_enabled?: boolean
  gate_check_in_start?: string
  gate_check_in_end?: string
  gate_late_threshold?: string
  gate_check_out_start?: string
  gate_check_out_end?: string
  gate_notify_parents?: boolean
  gate_notify_on_late?: boolean
  
  created_at?: string
  updated_at?: string
}

export interface Class {
  id: string
  school_id: string
  name: string
  level?: string
  homeroom_teacher_id?: string
  academic_year: string
  created_at?: string
  updated_at?: string
}

export interface Subject {
  id: string
  school_id: string
  name: string
  code?: string
  description?: string
  created_at?: string
}

export interface ClassMember {
  id: string
  class_id: string
  profile_id: string
  role: 'student' | 'teacher'
  created_at?: string
}

// Website-specific tables

export type PPDBStatus = 'pending' | 'accepted' | 'rejected'

export interface PPDBRegistration {
  id: string
  registration_number: string
  school_id: string
  
  // Student data
  student_name: string
  student_nisn?: string
  place_of_birth: string
  date_of_birth: string
  gender: Gender
  religion: string
  address: string
  phone_number?: string
  
  // Parent data
  parent_name: string
  parent_phone: string
  parent_email: string
  
  // Documents (Supabase Storage URLs)
  photo_url?: string
  birth_certificate_url?: string
  family_card_url?: string
  
  // Status
  status: PPDBStatus
  notes?: string
  verified_at?: string
  verified_by?: string
  
  created_at?: string
  updated_at?: string
}

export interface News {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  cover_image_url?: string
  author_id: string
  published: boolean
  published_at?: string
  created_at?: string
  updated_at?: string
}

export interface Gallery {
  id: string
  title: string
  description?: string
  media_url: string
  media_type: 'image' | 'video'
  school_id?: string
  created_at?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  replied: boolean
  created_at?: string
}
