import { CollectionIcon, RightArrowIcon, TrendingIcon } from "../../assets/icons"
import { RedefineBg, Audio } from "../../assets/images"

const Home = () => {
  return (
    <div className="w-full animate-fade-in">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 pb-12">
        {/* Hero Section */}
        <div className="w-full relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group hover-lift">
          <img
            src={RedefineBg}
            alt="Redefine Background"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white max-w-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4 text-yellow-400 font-bold tracking-wider text-xs md:text-sm uppercase">
              <CollectionIcon />
              <span>New Collection 2024</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Redefine Your Everyday Style.
            </h2>
            <button className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all duration-300 hover:scale-105 btn-press text-sm md:text-base">
              Shop Now <RightArrowIcon />
            </button>
          </div>
        </div>

        {/* Trending Section */}
        <div>
          <div className="flex justify-between items-end mb-6 md:mb-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <TrendingIcon />
                Trending Now
              </h3>
              <p className="text-[var(--color-text-secondary)] mt-1 text-sm md:text-base">
                Most coveted items this week
              </p>
            </div>
            <button className="text-sm font-bold text-[var(--color-primary)] hover:underline btn-press">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((item, index) => (
              <div
                key={item}
                className="stagger-item group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={Audio}
                  alt="Audio"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                  <p className="text-xs md:text-sm opacity-80 mb-1">Electronics</p>
                  <h4 className="text-lg md:text-xl font-bold">Wireless Headphones</h4>
                  <p className="mt-2 font-bold text-emerald-400">$299</p>
                </div>
                {/* Hover Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="card bg-[var(--color-surface)] rounded-2xl md:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border-0">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-3 md:mb-4">
              Join The Club
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 md:mb-8 text-sm md:text-base">
              Get exclusive access to new drops and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email address"
                className="flex-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded-full px-6 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all"
              />
              <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-full font-bold transition-all duration-300 btn-press">
                Subscribe
              </button>
            </div>
          </div>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
