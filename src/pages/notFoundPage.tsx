import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {

  const navigate = useNavigate();

  return (
    <section className=" bg-amber-50  w-screen grid grid-cols-2">

        <div className="col-span-1">
            <img src="/404notFound.png" alt="" />
        </div>

        <div className="flex flex-col justify-center items-center text-3xl gap-4">
          <h1 className="font-bold text-emerald-500">Uuups! Nie znaleźliśmy tej strony</h1>
          <span>Prawdopodobnie została usunięta lub przeniesiona</span>
          <br />
          <button className="flex flex-row p-3 bg-blue-700 text-white font-semibold rounded-full hover:cursor-pointer gap-3 items-center"
           onClick={()=>navigate("/")}>
            <FaArrowLeft/>
            Przejdź do strony głównej
          </button>
        </div>

        <div></div>
    </section>
  )
}

export default NotFoundPage