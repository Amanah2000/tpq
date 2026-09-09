import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lcthqecjwbmhhnguzluh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdGhxZWNqd2JtaGhuZ3V6bHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NTgxMDMsImV4cCI6MjEwNDQzNDEwM30.d982762ElZrLHZfC8Vx6i8Xp1pGEp55yrxgbsJaKODY'

export const supabase = createClient(supabaseUrl, supabaseKey)
export const ambilDataKeuangan = async () => {
  const { data, error } = await supabase
   .from('keuangan')
   .select('*')
   .order('tanggal', { ascending: false })

  if (error) {
    console.error('Error ambil data:', error)
    return []
  }
  return data
}

export const simpanDataKeuangan = async (dataBaru) => {
  const { data, error } = await supabase
   .from('keuangan')
   .insert([dataBaru])

  if (error) {
    console.error('Error simpan data:', error)
    throw error
  }
  return data
}

export const hapusDataKeuangan = async (id) => {
  const { error } = await supabase
   .from('keuangan')
   .delete()
   .eq('id', id)

  if (error) {
    console.error('Error hapus data:', error)
    throw error
  }
}