import type { Dispatch, SetStateAction, MouseEvent } from "react"

interface ModalProps {
  children: React.ReactNode
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ children, showModal, setShowModal }: ModalProps) => {
  return (
    <div
      id="wrapper"
      onClick={(e: MouseEvent<HTMLDivElement>) =>
        e.target === e.currentTarget && setShowModal(false)
      }
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
        showModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`w-[90%] max-w-[450px] rounded-2xl p-6 bg-[var(--color-card)] border border-[var(--color-border)] shadow-2xl transition-all duration-300 ${
          showModal ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
