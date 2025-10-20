import React from "react";

/**
 * 🏠 Home Page — Clean Fullscreen Centered Layout
 * - Transparent overlay card on blurred background
 * - Fully responsive & mobile friendly
 */
export default function Home() {
  const siteData = {
    siteName: "Rashida Little Champs DayCare",
    description: `
      Rashida Little Champs DayCare is a Day Care Center & Head Start Center located in Bellevue, WA that services all of Bellevue & the surrounding areas.
      We offer Child Care, Toddler Care, Home Day Care, Day Care Services, Child Care Services, Child Education, Child Care Development,
      Well Mannered Services, Family Day Care, Home Child Care, 24/7 Day Care Service & more.
      Our staff are highly trained to care for and help develop your kids' creative, physical, and analytical skills.
      If you are looking for a Fun Play Day Care, Preschool or After School Program, then Rashida Little Champs DayCare is the smart choice.
      We will treat your children as if they are our own. Call us today to inquire about our programs and to schedule a tour of our facility.
    `,
    backgroundImage:
      "https://cdn.pixabay.com/photo/2017/02/12/14/45/kids-2062436_1280.jpg",
    footerText: "Page 1 • Welcome to our storybook 🌷",
  };

  const { siteName, description, backgroundImage, footerText } = siteData;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-[#fffafc]">
      {/* 🔹 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(6px) brightness(1.05)",
          transform: "scale(1.03)",
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      {/* 💖 Content Card */}
      <main className="relative z-10 w-full max-w-5xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-10 sm:p-14 border border-white/40 text-center">
        <h1 className="font-chewy text-4xl sm:text-6xl text-gray-900 mb-6">
          {siteName}
        </h1>

        <p
          className="text-base sm:text-lg leading-relaxed font-medium text-gray-800"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </main>

      {/* 📄 Footer */}
      <footer className="relative z-10 text-gray-700 text-sm italic mt-8 mb-6">
        {footerText}
      </footer>
    </div>
  );
}
