import { Footer } from "./Footer";
import { LeftMainProfil } from "./LeftMainProfil";
import { DaftarSayaMainProfil } from "./DaftarSayaMainProfil";
import { RightMainProfil } from "./RightMainProfil";

export const MainProfil = () => {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row pt-0 py-10 pl-6 md:px-20  md:justify-between pr-6">
        <LeftMainProfil />
        <RightMainProfil />
      </div>
      <DaftarSayaMainProfil />
      <Footer />
    </div>
  );
};
