import { useState, useEffect } from 'react';

function App() {
  const [tanggal, setTanggal] = useState('');
  const [jam, setJam] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [pemasukan, setPemasukan] = useState('');
  const [pengeluaran, setPengeluaran] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);

  // GANTI LINK INI
  const URL_GOOGLE_SHEET = "https://script.google.com/macros/s/PASTE_URL_BAPAK_DI_SINI/exec";
  const URL_GET_DATA = "https://script.google.com/macros/s/PASTE_URL_BAPAK_DI_SINI/exec"; // sama aja

  // Ambil data & hitung saldo saat pertama buka
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(URL_GET_DATA);
    const data = await res.json();
    
    let masuk = 0;
    let keluar = 0;
    data.forEach(row => {
      masuk += Number(row.pemasukan) || 0;
      keluar += Number(row.pengeluaran) || 0;
    });
    setTotalPemasukan(masuk);
    setTotalPengeluaran(keluar);
  }

  const handleTambah = async () => {
    if(!keterangan) return alert("Keterangan wajib diisi");
    
    const dataBaru = {
      tanggal: tanggal || new Date().toISOString().slice(0,10),
      jam: jam || new Date().toLocaleTimeString('id-ID'),
      keterangan,
      pemasukan: Number(pemasukan) || 0,
      pengeluaran: Number(pengeluaran) || 0,
    };

    setLoading(true);
    await fetch(URL_GOOGLE_SHEET, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(dataBaru)
    });
    alert("Data berhasil disimpan!");
    setKeterangan(''); setPemasukan(''); setPengeluaran('');
    fetchData(); // refresh saldo
    setLoading(false);
  }

  const saldo = totalPemasukan - totalPengeluaran;

  return (
    <div style={{padding: '20px', background: '#111', color: 'white', minHeight: '100vh', fontFamily: 'Arial'}}>
      <h2>Laporan Keuangan TPQ</h2>

      {/* BOX SALDO */}
      <div style={{background: '#1f1f1f', padding: '15px', borderRadius: '10px', marginBottom: '20px'}}>
        <p>Total Pemasukan: <b style={{color: 'lightgreen'}}>Rp {totalPemasukan.toLocaleString('id-ID')}</b></p>
        <p>Total Pengeluaran: <b style={{color: 'salmon'}}>Rp {totalPengeluaran.toLocaleString('id-ID')}</b></p>
        <hr />
        <h3>Saldo: <b style={{color: saldo >= 0? 'lightgreen' : 'salmon'}}>Rp {saldo.toLocaleString('id-ID')}</b></h3>
      </div>
      
      {/* FORM INPUT */}
      <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} />
      <input type="time" value={jam} onChange={e => setJam(e.target.value)} />
      <input placeholder="Keterangan" value={keterangan} onChange={e => setKeterangan(e.target.value)} />
      <input placeholder="Pemasukan" type="number" value={pemasukan} onChange={e => setPemasukan(e.target.value)} />
      <input placeholder="Pengeluaran" type="number" value={pengeluaran} onChange={e => setPengeluaran(e.target.value)} />
      
      <button onClick={handleTambah} disabled={loading}>
        {loading? "Menyimpan..." : "Tambah & Simpan"}
      </button>
    </div>
  );
}

export default App;