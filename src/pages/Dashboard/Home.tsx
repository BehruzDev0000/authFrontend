import { CollectionIcon, RightArrowIcon, TrendingIcon } from "../../assets/icons"
import { RedefineBg, Audio } from "../../assets/images"

const Home = () => {
  return (
     <div className="w-full pt-[40px]">
      <div className="w-[80%] mx-auto flex flex-col gap-[48px] pb-[48px]">
      
          <div className="w-full relative h-[400px] rounded-xl overflow-hidden cursor-pointer group">

          <img
            src={RedefineBg}
            alt="Redefine Background"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-12 text-white max-w-xl">
          <div className="flex items-center gap-2 mb-4 text-yellow-400 font-bold tracking-wider text-sm uppercase">
            <CollectionIcon/>
            <span>New Collection 2024</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">Redefine Your Everyday Style.</h2>
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
            Shop Now <RightArrowIcon/>
          </button>
      </div>
        </div>
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingIcon/>
                Trending Now
              </h3>
              <p className="text-gray-500 mt-1">Most coveted items this week</p>
            </div>
            <button className="text-sm font-bold text-gray-900 hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
              <img src={Audio} alt="Audio" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-80 mb-1">Electronics</p>
                <h4 className="text-xl font-bold">Wireless Headphones</h4>
                <p className="mt-2 font-medium">
                  $ 299
                </p>
              </div>
            </div>
            <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
              <img src={Audio} alt="Audio" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-80 mb-1">Electronics</p>
                <h4 className="text-xl font-bold">Wireless Headphones</h4>
                <p className="mt-2 font-medium">
                  $ 299
                </p>
              </div>
            </div>
            <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
              <img src={Audio} alt="Audio" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-80 mb-1">Electronics</p>
                <h4 className="text-xl font-bold">Wireless Headphones</h4>
                <p className="mt-2 font-medium">
                  $ 299
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden mt-[40px]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Join The Club</h2>
              <p className="text-gray-400 mb-8">Get exclusive access to new drops and special offers.</p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input type="email" name="email" id="email" placeholder="Your email address" className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">Subscribe</button>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home