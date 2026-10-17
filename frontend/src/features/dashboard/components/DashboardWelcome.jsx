
import PropertySearchBar from "./PropertySearchBar";

export default function DashboardWelcome() {
  return (
    <section
      className="
        relative isolate
        min-h-[440px] sm:min-h-[400px] lg:min-h-[385px]
        overflow-hidden
        rounded-lg
        border border-[#e1defe]
        bg-[#f7f7ff]
      "
    >
      {/* Background property image */}
      <img
        src="/images/dashboard/hero-house.svg"
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          h-full w-full
          object-cover object-center
          sm:left-auto sm:right-0
          sm:w-[58%]
        "
      />

      {/* Overlay to keep text readable */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-[#f7f7ff]/95
          via-[#f7f7ff]/90
          to-[#f7f7ff]/75
          sm:bg-gradient-to-r
          sm:from-[#f7f7ff]
          sm:via-[#f7f7ff]/95
          sm:to-transparent
        "
      />

      {/* Hero text */}
      <div
        className="
          relative z-10
          px-4 pt-6
          sm:px-7 sm:pt-8
          lg:px-8
        "
      >
        <h1
          className="
            max-w-sm
            text-2xl font-medium leading-tight tracking-tight
            text-[#171334]
            sm:text-3xl
            lg:text-4xl
          "
        >
          Easy way to find a perfect property
        </h1>

        <p
          className="
            mt-3 max-w-xs
            text-xs leading-relaxed
            text-[#666b93]
            sm:mt-4
          "
        >
          We provide a complete service for the sale, purchase or rental of
          real estate.
        </p>
      </div>

      {/* Search controls */}
      <div
        className="
          relative z-10
          mt-6 px-4 pb-5
          sm:px-7 sm:pb-6
          lg:absolute lg:bottom-0 lg:left-0 lg:right-0
          lg:mt-0 lg:pb-0
        "
      >
        <PropertySearchBar />
      </div>
    </section>
  );
}
