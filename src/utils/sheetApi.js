const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyd82YajAiwBdW16DGuM4XrXqnZ97wpW08I3e_oaez24qYWa7v07K1ULMByvzCwa0vE/exec"

export async function simpanKeSheet(data) {
  const formData = new FormData();
  formData.append("tanggal", data.tanggal);
  formData.append("jenis", data.jenis);
  formData.append("keterangan", data.keterangan);
  formData.append("jumlah", data.jumlah);
  await fetch(WEB_APP_URL, { method: "POST", body: formData });
}

export async function ambilDataSheet() {
  const res = await fetch(WEB_APP_URL);
  const data = await res.json();
  return data.slice(1);
}