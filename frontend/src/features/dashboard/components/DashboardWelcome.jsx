
import PropertySearchBar from "./PropertySearchBar";
import heroHouse from "../../../assets/Hero Section House.png";

export default function DashboardWelcome() {
  return (
    <section
      className="
        relative isolate z-20
        flex min-h-[440px] flex-col
        overflow-visible rounded-xl
        border border-[#e1defe]
        bg-[#f7f7ff]
        sm:min-h-[410px]
        lg:min-h-[400px]
      "
    >
      {/* Background property image */}
      <img
         src={heroHouse}
  alt="House featured on Hamro Listings"
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          h-full w-full
          object-cover object-center
          sm:left-auto sm:right-0
          sm:w-[58%]
        "
      />

      {/* Readability overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-gradient-to-b
          from-[#f7f7ff]/85
          via-[#f7f7ff]/65
          to-[#f7f7ff]/35
          sm:bg-gradient-to-r
          sm:from-[#f7f7ff]/90
          sm:via-[#f7f7ff]/65
          sm:to-transparent
        "
      />

      {/* Hero text */}
      <div
        className="
          relative z-10
          px-5 pt-7
          sm:px-8 sm:pt-9
          lg:px-10 lg:pt-10
        "
      >
        <h1
          className="
            max-w-md
            text-2xl font-medium
            leading-tight tracking-tight
            text-[#171334]
            sm:text-3xl
            lg:max-w-lg lg:text-4xl
          "
        >
          Easy way to find a perfect property
        </h1>

        <p
          className="
            mt-3 max-w-sm
            text-sm leading-6
            text-[#666b93]
            sm:mt-4 sm:max-w-md
            sm:text-base sm:leading-7
          "
        >
          We provide a complete service for the sale, purchase or rental of
          real estate.
        </p>
      </div>

      {/* Search controls stay in normal document flow */}
      <div
        className="
          relative z-10
          mt-auto px-5
          pb-6 pt-7
          sm:px-8 sm:pb-8 sm:pt-8
          lg:px-10 lg:pb-7
        "
      >
        <PropertySearchBar />
      </div>
    </section>
  );
}
