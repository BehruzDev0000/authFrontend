const LogOutModal = ({handleLogOut, setIsOpen}: {handleLogOut: () => void, setIsOpen: (isOpen: boolean) => void}) => {
  return (
         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 overflow-hidden">
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Tizimdan chiqmoqchimisiz?
            </h3>

            <div className="flex gap-3 justify-center mt-[20px]">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg"
              >
                Yo'q, qolish
              </button>

              <button
                type="button"
                onClick={handleLogOut}
                className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg"
              >
                Ha, chiqish
              </button>
            </div>
          </div>
        </div>
  )
}

export default LogOutModal