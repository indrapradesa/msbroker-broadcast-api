export function msgSales(props) {
  const { namaCustomer, namaSales, nomorSales } = { ...props };

  const hai = "Halo, " + namaCustomer;
  const awal =
    "Terima kasih atas kepercayaan Anda menggunakan layanan Kiosnet-Dasarata.";
  const sales =
    "Kami ingin menginformasikan bahwa Sales a.n " +
    "*" +
    namaSales +
    "*" +
    " ( Nomor : " +
    nomorSales +
    ") tidak lagi bekerja di Kiosnet-Dasarata.";
  const dd =
    "Jika Anda menerima panggilan atau pesan dari nomor yang mengatasnamakan Saudara " +
    "*" +
    namaSales +
    "*" +
    ", harap diabaikan karena mereka sudah tidak terkait dengan Kiosnet-Dasarata.";
  const layanan =
    "Untuk layanan maksimal dan tanggap cepat, termasuk pembayaran dan layanan pelanggan lainnya, Anda dapat menghubungi customer care kami di nomor +6281222213172.";
  const confirm =
    "Mohon balas pesan ini dengan " +
    '"Ya"' +
    " jika Anda telah menerima informasi ini, atau jika ada yang ingin ditanyakan, silakan konfirmasi ke nomor ini.";
  const terimakasih = "Terima kasih atas perhatian dan kerjasamanya.";
  const salam = "Salam,";
  const by = "Kiosnet-Dasarata";
  const isipesan = decodeURIComponent(
    hai +
      "\n" +
      "\n" +
      awal +
      "\n" +
      "\n" +
      sales +
      "\n" +
      dd +
      "\n" +
      layanan +
      "\n" +
      "\n" +
      confirm +
      "\n" +
      "\n" +
      terimakasih +
      "\n" +
      "\n" +
      salam +
      "\n" +
      "\n" +
      by
  );

  return isipesan;
}
