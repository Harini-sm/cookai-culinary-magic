export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      amounts: {
        Row: {
          ingredient_id: number | null
          measurement_id: number | null
          quantity: number
          recipe_id: number | null
        }
        Insert: {
          ingredient_id?: number | null
          measurement_id?: number | null
          quantity: number
          recipe_id?: number | null
        }
        Update: {
          ingredient_id?: number | null
          measurement_id?: number | null
          quantity?: number
          recipe_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "amounts_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amounts_measurement_id_fkey"
            columns: ["measurement_id"]
            isOneToOne: false
            referencedRelation: "measurements"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      measurements: {
        Row: {
          id: number
          unit: string
        }
        Insert: {
          id?: number
          unit: string
        }
        Update: {
          id?: number
          unit?: string
        }
        Relationships: []
      }
      pantry_recipes: {
        Row: {
          cooking_skill: string | null
          cuisine: string | null
          dietary_preference: string | null
          image_url: string | null
          ingredients_name: string | null
          ingredients_with_quantities: string | null
          instructions: string | null
          meal_type: string | null
          name: string | null
          total_time: number | null
        }
        Insert: {
          cooking_skill?: string | null
          cuisine?: string | null
          dietary_preference?: string | null
          image_url?: string | null
          ingredients_name?: string | null
          ingredients_with_quantities?: string | null
          instructions?: string | null
          meal_type?: string | null
          name?: string | null
          total_time?: number | null
        }
        Update: {
          cooking_skill?: string | null
          cuisine?: string | null
          dietary_preference?: string | null
          image_url?: string | null
          ingredients_name?: string | null
          ingredients_with_quantities?: string | null
          instructions?: string | null
          meal_type?: string | null
          name?: string | null
          total_time?: number | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          cooking_skill: string | null
          cuisine: string | null
          dietary_preference: string | null
          id: number
          image_url: string | null
          ingredients_name: string[] | null
          ingredients_with_quantities: Json | null
          instructions: string | null
          meal_type: string | null
          name: string
          total_time: number | null
        }
        Insert: {
          cooking_skill?: string | null
          cuisine?: string | null
          dietary_preference?: string | null
          id?: number
          image_url?: string | null
          ingredients_name?: string[] | null
          ingredients_with_quantities?: Json | null
          instructions?: string | null
          meal_type?: string | null
          name: string
          total_time?: number | null
        }
        Update: {
          cooking_skill?: string | null
          cuisine?: string | null
          dietary_preference?: string | null
          id?: number
          image_url?: string | null
          ingredients_name?: string[] | null
          ingredients_with_quantities?: Json | null
          instructions?: string | null
          meal_type?: string | null
          name?: string
          total_time?: number | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
