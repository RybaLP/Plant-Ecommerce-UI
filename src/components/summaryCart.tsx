import { useState } from 'react'
import { MdDiscount } from "react-icons/md";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";

const SummaryCart = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [DiscountCode, setDiscountCode] = useState("");

  return (
    <section className='max-w-4xl bg-red-400'>

        <div>
            <div>
                <MdDiscount/>
            </div>
        
            <h1>
                Masz kod promocyjny?
            </h1>

            <div>
                {isOpen ? <FaArrowCircleUp/> : <FaArrowAltCircleDown/>}
            </div>

            {isOpen && (
                <div className='flex flex-row'>
                    <input type="text" className='' value={DiscountCode} onChange={(e)=>setDiscountCode(e.target.value)} />
                    <button className='p-5 bg-white'>
                        Aktywuj
                    </button>
                </div>
            )}

        </div>

    </section>
    )
}

export default SummaryCart;