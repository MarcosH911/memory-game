export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      points: {
        Row: {
          id: string
          points: number
          profile_id: string
        }
        Insert: {
          id?: string
          points?: number
          profile_id: string
        }
        Update: {
          id?: string
          points?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          nickname: string | null
          role: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          nickname?: string | null
          role: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          nickname?: string | null
          role?: string
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
