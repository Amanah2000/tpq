import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xxxxx.supabase.co' // GANTI PUNYA SAMPEAN
const supabaseKey = 'eyJhbGciOi...xxx' // GANTI PUNYA SAMPEAN
const supabase = createClient(supabaseUrl, supabaseKey)

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