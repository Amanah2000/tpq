import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
// import { getKeuangan, addKeuangan, hapusDataKeuangan } from './lib/keuanganApi'

function App() {
  const [pesan, setPesan] = useState('Loading...')

  useEffect(() => {
    setPesan('Alhamdulillah Web TPQ Udah Jalan! 🚀')
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>TPQ AMANAH 2000</h1>
      <p>{pesan}</p>
    </div>
  )
}

export default App