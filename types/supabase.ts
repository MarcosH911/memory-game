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
          coins: number
          created_at: string
          diamonds: number
          id: string
          user_id: string
        }
        Insert: {
          coins?: number
          created_at?: string
          diamonds?: number
          id?: string
          user_id: string
        }
        Update: {
          coins?: number
          created_at?: string
          diamonds?: number
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_path: string
          created_at: string
          full_name: string
          id: string
          nickname: string | null
          role: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_path?: string
          created_at?: string
          full_name: string
          id?: string
          nickname?: string | null
          role: string
          user_id: string
          username: string
        }
        Update: {
          avatar_path?: string
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
      points_ranking_all_time: {
        Row: {
          avatar_path: string | null
          coins: number | null
          diamonds: number | null
          full_name: string | null
          max_level: number | null
        }
        Relationships: []
      }
      points_ranking_day: {
        Row: {
          avatar_path: string | null
          coins: number | null
          diamonds: number | null
          full_name: string | null
          max_level: number | null
        }
        Relationships: []
      }
      points_ranking_month: {
        Row: {
          avatar_path: string | null
          coins: number | null
          diamonds: number | null
          full_name: string | null
          max_level: number | null
        }
        Relationships: []
      }
      points_ranking_week: {
        Row: {
          avatar_path: string | null
          coins: number | null
          diamonds: number | null
          full_name: string | null
          max_level: number | null
        }
        Relationships: []
      }
      points_ranking_year: {
        Row: {
          avatar_path: string | null
          coins: number | null
          diamonds: number | null
          full_name: string | null
          max_level: number | null
        }
        Relationships: []
      }
      total_points: {
        Row: {
          total_coins: number | null
          total_diamonds: number | null
        }
        Relationships: []
      }
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
