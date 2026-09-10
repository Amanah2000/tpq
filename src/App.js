import { useState } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
  const [keterangan, setKeterangan] = useState('')
  const [jumlah, setJumlah] = useState('')
  const [jenis, setJenis] = useState('pemasukan')
  const [pesan, setPesan] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPesan('Menyimpan...')

    const { error } = await supabase
      .from('keuangan')
      .insert([{ keterangan, jumlah: parseInt(jumlah), jenis }])

    if (error) {
      setPesan('Gagal: ' + error.message)
    } else {
      setPesan('Alhamdulillah Data Tersimpan!')
      setKeterangan('')
      setJumlah('')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>TPQ AMANAH 2000</h1>
      <h3>Input Keuangan</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Jenis:</label><br/>
          <select value={jenis} onChange={(e) => setJenis(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Keterangan:</label><br/>
          <input type="text" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} required style={{ width: '100%', padding: '8px' }}/>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Jumlah Rp:</label><br/>
          <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} required style={{ width: '100%', padding: '8px' }}/>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', background: 'green', color: 'white', border: 'none' }}>
          Simpan Data
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '10px' }}>{pesan}</p>
    </div>
  )
}

export default App