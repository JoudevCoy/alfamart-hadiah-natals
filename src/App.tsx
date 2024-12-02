import React from "react";
import "./App.css";
import welcomeImg from "@/assets/welcome.jpg";
import iconImg from "@/assets/icon.jpg";
import Quester from "@/components/Quester";
import { useNavigate } from "react-router-dom";
import { gRoutes } from "@/lib/router";

const questions = [
  { title: "Siapa pendiri Alfamart?", trueQuest: "Djoko Susanto", falseQuest: "Raffi Ahmad" },
  { title: "Alfamart berasal dari Indonesia?", trueQuest: "Benar", falseQuest: "Salah" },
  { title: "Logo Alfamart didominasi warna merah dan kuning?", trueQuest: "Benar", falseQuest: "Salah" },
];

function App() {
  console.log("Rendering App Component");
  
  const navigate = useNavigate();
  const [questState, setQuestState] = React.useState(0);

  const handleQuestState = (isSucces: boolean) => {
    if (isSucces) {
      if (questState < questions.length - 1) {
        setQuestState((state) => state + 1);
      } else {
        navigate(gRoutes.UPLOAD);
      }
    } else {
      alert("Jawaban Salah! Mulai dari awal.");
      setQuestState(0);
    }
  };

  return (
    <>
      <nav className="w-full bg-red-600 py-4">
        <img className="w-[120px] mx-auto" src={iconImg} alt="Logo Alfamart" />
        <h1 className="text-2xl text-white text-center mx-auto py-5 font-black">
          Selamat Anda Mendapatkan Hadiah iPhone Gratis Dari Alfamart
        </h1>
        <img src={welcomeImg} alt="Welcome" className="w-full" />
      </nav>

      <section>
        <p className="text-[1rem] font-bold text-center py-2">
          Silahkan menjawab kuis di bawah ini dengan benar!
        </p>
      </section>

      <section>
        {questState < questions.length ? (
          <Quester
            handleFunc={handleQuestState}
            title={questions[questState].title}
            trueQuest={questions[questState].trueQuest}
            falseQuest={questions[questState].falseQuest}
          />
        ) : (
          <div className="text-center py-4">
            <h2 className="text-xl font-bold">Terima kasih telah mengikuti kuis!</h2>
            <p>Silakan ikuti instruksi berikutnya.</p>
          </div>
        )}
      </section>
    </>
  );
}

export default App;