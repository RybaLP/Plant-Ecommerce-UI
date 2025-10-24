import type { FormEvent, SetStateAction } from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
    setIsOpen : React.Dispatch<SetStateAction<boolean>>;
    handleDeleteReview : () => void;
}

const DeleteReview = ( {setIsOpen , handleDeleteReview} : Props ) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center">
        
        <span
          onClick={() => setIsOpen(false)}
          className="absolute -top-4 -right-4 cursor-pointer z-50 bg-white rounded-full"
        >
          <IoMdCloseCircle size={30} color="red" />
        </span>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Czy napewno
        </h1>

        <p className="text-gray-600 mb-6">
            Czy napewno chcesz usunąć recenzję?
        </p>

        <div className="text-center flex flex-row items-center justify-center gap-7">
            <button onClick={()=>handleDeleteReview()} className="p-3 border-black border-2 rounded-2xl bg-emerald-500 font-bold text-white hover:cursor-pointer">Tak</button>
            <button onClick={()=>setIsOpen(false)} className="p-3 hover:cursor-pointer rounded-2xl font-semibold border-2 border-black">Nie</button>
        </div>

      </div>
    </div>
  );
};
export default DeleteReview;