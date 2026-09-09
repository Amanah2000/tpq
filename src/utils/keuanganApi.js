import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// AMBIL SEMUA DATA KEUANGAN
export async function ambilDataKeuangan() {
  const { data, error } = await supabase
   .from('keuangan')
   .select('*')
   .order('id', { ascending: false })
  
  if (error) {
    console.error('Error ambil data:', error)
    return []
  }
  return data
}

// SIMPAN DATA KEUANGAN BARU
export async function simpanDataKeuangan(data) {
  const { error } = await supabase
   .from('keuangan')
   .insert([data])
  
  if (error) {
    console.error('Error simpan data:', error)
    throw error
  }
}