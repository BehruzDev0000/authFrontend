import type { Dispatch, SetStateAction, MouseEvent } from "react"

const Modal =({children,showModal,setShowModal}:{children:React.ReactNode,showModal:boolean,setShowModal:Dispatch<SetStateAction<boolean>>})=>{
    return (
        <div id="wrapper" onClick={(e:MouseEvent<HTMLDivElement>)=>e.target===e.currentTarget &&setShowModal(false)} className={`fixed top-0 ${showModal? '': 'scale-0'}  duration-300 left-0 right-0 bottom-0 bg-[#RRGGBBAA] backdrop-blur-md flex items-center justify-center z-50`}>
            <div className="absolute w-[450px] m-auto flex items-center justify-center  left-0 right-0  h-auto rounded-2xl p-5 bg-white">
                {children}

            </div>
        </div>
    )
}
export default Modal