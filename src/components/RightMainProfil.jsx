import { useState } from "react";
import { Link } from "react-router-dom";

export const RightMainProfil = () => {
  const [isSubscribe, setIsSubscribe] = useState(() => {
    const saved = localStorage.getItem("isSubscribe");
    return saved ? JSON.parse(saved) : null;
  });
  const [expiryDate, setExpiryDate] = useState(() => {
    const saved = localStorage.getItem("expiryDate")
    return saved ? JSON.parse(saved) : null;
  })

  return (
    <>
      {isSubscribe ? (
        <div className="berlangganan bg-gradient-to-r from-[#5370D4] to-[#192DB7] text-white p-6 w-full md:w-[470px] md:h-[193px] gap-4 rounded-2xl relative top-8 right-0 flex flex-col">
          <button className="px-6 py-1 text-[#0F1E93] font-[600] bg-[#C1C2C4] rounded-full w-20">Aktif</button>
          <div className="grid gap-1">
            <p className="text-2xl font-[600]">Akun Premium Individual✨</p>
            <p className="text-sm">Saat ini kamu sedang menggunakan akses akun premium</p>
            </div>
            <p className="text-gray-300">Berlaku hingga {expiryDate}</p>
        </div>
      ) : (
        <div className="berlangganan bg-[#3D4142] text-white p-6 w-full md:w-[450px] h-[230px] md:h-[193px] rounded-2xl relative top-13 right-0 flex">
          <div className="gambar w-[82px] h-[82px] md:w-[95px] md:h-[78px]">
            <img src="/Warning.png" alt="" />
          </div>
          <div>
            <h1 className="text-lg font-[600]">
              Saat ini anda belum berlangganan
            </h1>
            <p className="w-9/10">
              Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
            </p>
            <Link
              to="/langganan"
              className="absolute right-4 bottom-4 bg-[#2F3334] transform cursor-pointer duration-300 hover:bg-[#444a4b] rounded-full px-4 py-2"
            >
              Mulai Berlangganan
            </Link>
          </div>
        </div>
      )}
    </>
  );
};