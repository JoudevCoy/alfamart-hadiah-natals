import React from "react";

interface Props {
  title: string;
  trueQuest: string;
  falseQuest: string;
  handleFunc: (isSuccess: boolean) => void;
}

const Quester: React.FC<Props> = ({ handleFunc, title, trueQuest, falseQuest }) => {
  console.log("Rendering Quester Component");
  
  const [order, setOrder] = React.useState(0);

  React.useEffect(() => {
    const rand = Math.random(); // Random value between 0 and 1
    setOrder(Math.round(rand)); // Convert to 0 or 1
  }, []);

  return (
    <div className="px-5 py-5 bg-amber-300">
      <h1 className="text-center text-[1.5rem] font-bold pb-2">{title}</h1>
      {order === 0 ? (
        <>
          <button
            onClick={() => handleFunc(true)}
            type="button"
            className="bg-red-500 w-full py-2 rounded-2xl text-white"
          >
            {trueQuest}
          </button>
          <p className="text-center">— or —</p>
          <button
            onClick={() => handleFunc(false)}
            type="button"
            className="bg-red-500 w-full py-2 rounded-2xl text-white"
          >
            {falseQuest}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => handleFunc(false)}
            type="button"
            className="bg-red-500 w-full py-2 rounded-2xl text-white"
          >
            {falseQuest}
          </button>
          <p className="text-center">— or —</p>
          <button
            onClick={() => handleFunc(true)}
            type="button"
            className="bg-red-500 w-full py-2 rounded-2xl text-white"
          >
            {trueQuest}
          </button>
        </>
      )}
    </div>
  );
};

export default Quester;