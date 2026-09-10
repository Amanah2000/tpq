import { useState } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0])
  const [keterangan, setKeterangan] = useState('')
  const [masuk, setMasuk] = useState('')
  const [keluar, setKeluar] = useState('')
  const [kategori, setKategori] = useState('pemasukan')
  const [pesan, setPesan] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPesan('Menyimpan...')

    const data = {
      tanggal,
      keterangan,
      masuk: kategori === 'pemasukan'? parseInt(masuk) || 0 : 0,
      keluar: kategori === 'pengeluaran'? parseInt(keluar) || 0 : 0,
      kategori
    }

    const { error } = await supabase.from('keuangan').insert([data])

    if (error) {
      setPesan('Gagal: ' + error.message)
    } else {
      setPesan('Alhamdulillah Data Tersimpan!')
      setKeterangan('')
      setMasuk('')
      setKeluar('')
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>TPQ AMANAH 2000</h1>
      <h3>Input Keuangan</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Tanggal:</label><br/>
          <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required style={{ width: '100%', padding: '8px' }}/>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Kategori:</label><br/>
          <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Keterangan:</label><br/>
          <input type="text" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} required style={{ width: '100%', padding: '8px' }}/>
        </div>

        {kategori === 'pemasukan'? (
          <div style={{ marginBottom: '10px' }}>
            <label>Jumlah Masuk Rp:</label><br/>
            <input type="number" value={masuk} onChange={(e) => setMasuk(e.target.value)} style={{ width: '100%', padding: '8px' }}/>
          </div>
        ) : (
          <div style={{ marginBottom: '10px' }}>
            <label>Jumlah Keluar Rp:</label><br/>
            <input type="number" value={keluar} onChange={(e) => setKeluar(e.target.value)} style={{ width: '100%', padding: '8px' }}/>
          </div>
        )}

        <button type="submit" style={{ width: '100%', padding: '10px', background: 'green', color: 'white', border: 'none' }}>
          Simpan Data
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>{pesan}</p>
    </div>
  )
}

export default App