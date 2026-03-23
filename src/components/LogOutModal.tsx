import { LogOutIcon } from "../assets/icons"

interface LogOutModalProps {
  handleLogOut: () => void
  setIsOpen: (isOpen: boolean) => void
}

const LogOutModal = ({ handleLogOut, setIsOpen }: LogOutModalProps) => {
  return (
    <div className="w-full text-center">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-[var(--color-danger)]">
        <LogOutIcon />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
        Tizimdan chiqmoqchimisiz?
      </h3>
      <p className="text-[var(--color-text-secondary)] text-sm mb-6">
        Hisobingizdan chiqib ketasiz
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="flex-1 px-4 py-3 bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-xl font-medium hover:bg-[var(--color-border)] transition-colors btn-press"
        >
          Yo'q, qolish
        </button>

        <button
          type="button"
          onClick={handleLogOut}
          className="flex-1 px-4 py-3 bg-[var(--color-danger)] text-white rounded-xl font-medium hover:bg-red-600 transition-colors btn-press"
        >
          Ha, chiqish
        </button>
      </div>
    </div>
  )
}

export default LogOutModal
