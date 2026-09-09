import { supabase } from '../supabaseClient'

export async function getKeuangan() {
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

export async function addKeuangan({ tanggal, kategori, keterangan, nominal }) {
  const payload = {
    tanggal,
    kategori,
    keterangan,
    masuk: nominal >= 0? nominal : null,
    keluar: nominal < 0? Math.abs(nominal) : null
  }

  const { data, error } = await supabase
   .from('keuangan')
   .insert([payload])
   .select()

  if (error) {
    console.error('Error simpan data:', error)
    throw error
  }
  return data[0]
}

export async function hapusDataKeuangan(id) {
  const { error } = await supabase
   .from('keuangan')
   .delete()
   .eq('id', id)
  
  if (error) throw error
}