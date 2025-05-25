import { useContext, useEffect, useState } from "react";
import { LanggananCard } from "./LanggananCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { PaymentCodeGenerator } from "./PaymentCodeGenerator";
import { PopupContext } from "../SharedContext";
import { useNavigate } from "react-router-dom";

export const ShowPayment = () => {
  const [menit, setMenit] = useState(15);
  const [detik, setDetik] = useState(0);
  const [infoPayments, setInfoPayments] = useState(() => {
    const saved = localStorage.getItem("kreditcard");
    return saved ? JSON.parse(saved) : null;
  });
  const [paymentCode, setPaymentCode] = useState("");
  const { versiPembayaran, setVersiPembayaran } = useContext(PopupContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPaymentCode(PaymentCodeGenerator());
  }, []);

  let price = 0;
  moment.locale("id");
  let dateNow = moment().format("D MMMM YYYY");
  const date30DaysLater = moment().add(30, "days").format("D MMMM YYYY");

  if (infoPayments.versi === "Individual") price = 49;
  if (infoPayments.versi === "Berdua") price = 79;
  if (infoPayments.versi === "Keluarga") price = 159;

  useEffect(() => {
    setTimeout(() => {
      if (detik === 0) {
        setDetik(60);
        setMenit(menit - 1);
      }
      setDetik((detik) => detik - 1);
      if (menit === 0 && detik === 0) {
        navigate("/langganan");
        setInfoPayments("");
        setVersiPembayaran("");
      }
    }, 1000);
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText("02jd2h93");
  };

  const handlePayment = () => {
    localStorage.setItem("isSubscribe", JSON.stringify(true));
    localStorage.setItem("expiryDate", JSON.stringify(date30DaysLater));
    navigate("/series");
  };

  return (
    <div className="px-4 md:px-20 py-6 md:py-10">
      <div className="text-center py-4 md:py-6 grid gap-2 md:gap-4 bg-[#22282A]">
        <h1 className="text-lg md:text-xl">Lakukan Pembayaran Sebelum</h1>
        <div className="flex justify-center gap-1 md:gap-2">
          <p className="bg-[#E7E3FC14] px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base">
            00 Jam
          </p>
          <span className="flex items-center text-xl md:text-2xl">:</span>
          <p className="bg-[#E7E3FC14] px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base">
            {menit} Menit
          </p>
          <span className="flex items-center text-xl md:text-2xl">:</span>
          <p className="bg-[#E7E3FC14] px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base">
            {detik} Detik
          </p>
        </div>
      </div>
      <div className="px-2 md:px-20 py-4 md:py-10 flex flex-col gap-4 md:gap-10">
        <h1 className="text-xl md:text-3xl font-[600]">Ringkasan Pembayaran</h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
          {/* Subscription Card */}
          <div className="flex justify-center">
            {infoPayments.versi === "Individual" && (
              <LanggananCard
                versi="Individual"
                price="49,990"
                akun="1"
                kualitas="720p"
              />
            )}
            {infoPayments.versi === "Berdua" && (
              <LanggananCard
                versi="Berdua"
                price="79,990"
                akun="2"
                kualitas="1080p"
              />
            )}
            {infoPayments.versi === "Keluarga" && (
              <LanggananCard
                versi="Keluarga"
                price="159,990"
                akun="5-7"
                kualitas="4K"
              />
            )}
          </div>
          <div className="flex flex-col gap-3 md:gap-4 w-full">
            <h1 className="text-lg md:text-xl font-[600]">Metode Pembayaran</h1>
            {infoPayments.card && (
              <label className="w-full flex gap-2 px-4 md:px-6 py-2 border rounded-lg items-center">
                <input type="radio" defaultChecked />
                {infoPayments.card === "bca" && (
                  <div className="flex items-center gap-2">
                    <img
                      src="/cardkredit/bca.png"
                      className="w-6 h-6 md:w-auto md:h-auto rounded-full"
                    />
                    <span className="text-sm md:text-base">
                      BCA Virtual Account
                    </span>
                  </div>
                )}
                {infoPayments.card === "visa" && (
                  <div className="flex gap-1 md:gap-2">
                    <img
                      src="/cardkredit/american_express.png"
                      className="h-5 md:h-8"
                      alt="American Express"
                    />
                    <img
                      src="/cardkredit/jcb.png"
                      className="h-5 md:h-8"
                      alt="JCB"
                    />
                    <img
                      src="/cardkredit/mastercard.png"
                      className="h-5 md:h-8"
                      alt="Mastercard"
                    />
                    <img
                      src="/cardkredit/visa.png"
                      className="h-5 md:h-8"
                      alt="Visa"
                    />
                  </div>
                )}
              </label>
            )}
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-gray-300">Tanggal Pembelian</span>
              <span>{dateNow}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-gray-300">Kode Pembayaran</span>
              <div className="flex gap-2">
                <span>{paymentCode}</span>
                <button onClick={handleCopy}>
                  <FontAwesomeIcon icon={faCopy} size="sm" />
                </button>
              </div>
            </div>
            <h1 className="text-lg md:text-xl font-[600]">
              Ringkasan Transaksi
            </h1>
            <div className="space-y-1 md:space-y-0">
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-gray-300">
                  Paket Premium {infoPayments.versi}
                </span>
                <span>Rp{price},000</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-gray-300">Biaya Admin</span>
                <span>Rp3,000</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-gray-300">Total Pembayaran</span>
                <span>Rp{price + 3},000</span>
              </div>
            </div>
            <h1 className="text-lg md:text-xl font-[600]">
              Tata Cara Pembayaran
            </h1>
            <div className="text-gray-300 flex flex-col text-xs md:text-base space-y-1 md:space-y-0">
              {infoPayments.card === "bca" && (
                <div>
                  <p>
                    1. Buka aplikasi BCA Mobile Banking atau akses BCA Internet
                    Banking.
                  </p>
                  <p>2. Login ke akun Anda.</p>
                  <p>3. Pilih menu "Transfer" atau "Pembayaran".</p>
                  <p>
                    4. Pilih opsi "Virtual Account" atau "Virtual Account
                    Number".
                  </p>
                  <p>
                    5. Masukkan nomor virtual account dan jumlah pembayaran,
                    lalu konfirmasikan pembayaran
                  </p>
                </div>
              )}
              {infoPayments.card === "visa" && (
                <div>
                  <p>
                    1. Pilih metode pembayaran Visa di halaman checkout atau
                    pembayaran.
                  </p>
                  <p>2. Masukkan 16 digit nomor kartu Visa Anda yang valid.</p>
                  <p>
                    3. Isi tanggal kadaluarsa (MM/YY) dan kode keamanan CVV (3
                    digit).
                  </p>
                  <p>
                    4. Klik tombol 'Bayar' atau 'Lanjutkan' untuk memproses
                    pembayaran.
                  </p>
                  <p>
                    5. Ikuti instruksi verifikasi tambahan jika diminta (seperti
                    OTP atau 3D Secure).
                  </p>
                </div>
              )}
            </div>
            {/* Payment Button */}
            <button
              onClick={handlePayment}
              className="px-4 py-2 w-full md:w-auto text-white text-sm md:text-base rounded-full cursor-pointer bg-[#09147A] hover:bg-blue-900 md:px-8"
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
