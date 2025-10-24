import { IoMdCloseCircle } from "react-icons/io";
import type { Rate } from "../types/rate";

interface Props {
    setIsFormOpen :  React.Dispatch<React.SetStateAction<boolean>>;
    comment : string ; 
    setComment : React.Dispatch<React.SetStateAction<string>>;
    rate : Rate;
    setRate : React.Dispatch<React.SetStateAction<Rate>>;
    handleCreateReview : (e : React.FormEvent) => void;
}

const CreateReviewForm = ({setIsFormOpen , comment , setComment , rate , setRate , handleCreateReview} : Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center">
        <span
          onClick={() => setIsFormOpen(false)}
          className="absolute -top-4 -right-4 cursor-pointer z-50 bg-white rounded-full"
        >
          <IoMdCloseCircle size={30} color="red" />
        </span>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Wystaw opinię
        </h1>


        <form onSubmit={(e)=>handleCreateReview(e)}  className="flex flex-col gap-4" >
          <textarea
            placeholder="Napisz coś (opcjonalne)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            value={comment}
            onChange={(e) => {setComment(e.target.value)}}
            rows={3}
          />

            <div className="flex justify-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rate" value="RECOMMEND" checked={rate === "RECOMMEND"}
                    onChange={()=>setRate("RECOMMEND")} className="accent-green-600"/>
                    <span>Polecam👍</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rate" value="NOT_RECOMMEND" onChange={() => setRate("NOT_RECOMMEND")}
                    className="accent-red-600"/>
                    <span>Nie polecam 👎</span>
                </label>
            </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full" type="submit">
            Wyślij
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateReviewForm;