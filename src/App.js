import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getKeuangan, addKeuangan, hapusDataKeuangan } from './lib/keuanganApi'
function App() {
  const [dataKeuangan, setDataKeuangan] = useState([])
  const [form, setForm] = useState({
    jenis: 'Pemasukan',
    tanggal: '',
    keterangan: '',
    nominal: ''
  })

  // AMBIL DATA DARI SUPABASE SAAT PERTAMA BUKA
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('keuangan')
      .select('*')
      .order('tanggal', { ascending: false })
    
    if (error) console.log('Error:', error)
    else setDataKeuangan(data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // SIMPAN DATA KE SUPABASE
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('keuangan')
      .insert([{ 
        jenis: form.jenis, 
        tanggal: form.tanggal, 
        keterangan: form.keterangan, 
        nominal: parseInt(form.nominal) 
      }])

    if (error) {
      alert('Gagal: ' + error.message)
    } else {
      alert('Berhasil!')
      setForm({ jenis: 'Pemasukan', tanggal: '', keterangan: '', nominal: '' })
      fetchData() // refresh tabel
    }
  }

  const totalPemasukan = dataKeuangan.filter(d => d.jenis === 'Pemasukan').reduce((sum, d) => sum + d.nominal, 0)
  const totalPengeluaran = dataKeuangan.filter(d => d.jenis === 'Pengeluaran').reduce((sum, d) => sum + d.nominal, 0)

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Keuangan TPQ</h1>
      
      <form onSubmit={handleSubmit}>
        <select name="jenis" value={form.jenis} onChange={handleChange}>
          <option value="Pemasukan">Pemasukan</option>
          <option value="Pengeluaran">Pengeluaran</option>
        </select>
        <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} required />
        <input type="text" name="keterangan" placeholder="Keterangan" value={form.keterangan} onChange={handleChange} required />
        <input type="number" name="nominal" placeholder="Nominal" value={form.nominal} onChange={handleChange} required />
        <button type="submit">Tambah</button>
      </form>

      <h2>Total Pemasukan: Rp {totalPemasukan.toLocaleString('id-ID')}</h2>
      <h2>Total Pengeluaran: Rp {totalPengeluaran.toLocaleString('id-ID')}</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataKeuangan}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="keterangan" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nominal" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <table border="1" style={{ marginTop: 20, width: '100%' }}>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Jenis</th>
            <th>Keterangan</th>
            <th>Nominal</th>
          </tr>
        </thead>
        <tbody>
          {dataKeuangan.map((d) => (
            <tr key={d.id}>
              <td>{d.tanggal}</td>
              <td>{d.jenis}</td>
              <td>{d.keterangan}</td>
              <td>Rp {d.nominal.toLocaleString('id-ID')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
