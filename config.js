// Configuração compartilhada do quiz
window.QUIZ = {
  supabaseUrl: "https://honbwpbeumaxdewdadyy.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvbmJ3cGJldW1heGRld2RhZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNzg3NzYsImV4cCI6MjEwNzc1NDc3Nn0.dfpnWpzmsZUDs3w8gM-fsXj5891EgNi9JAHobVgjv7U",
  // Ordem em que as fotos aparecem (já embaralhada; o gabarito fica só no banco)
  fotos: ["9ba9be0e","7c96bbdc","c3d9e316","16cf4d96","efb45881","ed08d88b","81eca09e","ffc7c5a2","cb4660e6","48392056","f65cd8dd","58fec479","e66d3a83","27ad1335","6bc4824a","74cb7e9d","f16a7953","39ffb95a","7fc3e1a9","b7a2c077","6159087e","ad2b2edc","92f4e486","3c95cd3d","561abb1f","c11abaed"],
  nomes: ["Ana Luiza","Annaisa","Bruno Cortez","Bruno Xavier","Denisa","Dila","Douglas","Eva","Guilherme","João","Kelen","Leila","Luana","Luciana","Maira","Maria Eduarda","Max","Nathania","Pamela","Reysner","Sara","Sueimy","Tayone","Thais Mozelli","Thais Ortelan","Thalita"]
};

window.rpc = async function (fn, body) {
  const r = await fetch(QUIZ.supabaseUrl + "/rest/v1/rpc/" + fn, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: QUIZ.supabaseKey,
      Authorization: "Bearer " + QUIZ.supabaseKey
    },
    body: JSON.stringify(body)
  });
  const txt = await r.text();
  const data = txt ? JSON.parse(txt) : null;
  if (!r.ok) throw new Error((data && data.message) || "Erro " + r.status);
  return data;
};
