/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "media",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "black-main": "#000000",
        main: "#23F7DD",
        placeholder: "#3D3F46",
        live: "#23F773",
        pending: "#FEC163",
        red: "#DE4313",
        ended: "#878787"
      },
      fontFamily: {
        panchang: ["Panchang", "sans-serif"],
        hubot: ["HubotSans", "sans-serif"]
      },
      fontSize: {
        xxs: "10px",
        xs: "12px",
        sm: "14px"
      },
      boxShadow: {
        custom: "0px 0px 16px 0px #4B545D",
        reveal: "0px 5px 1.5px -4px #0808081F"
      },
      backgroundImage: {
        wallet: "url('/assets/images/bg_wallet.png')",
        "linear-main": "linear-gradient(90deg, #23F7DD 0%, #23F773 100%)",
        "border-navigator":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0%, rgba(229, 229, 229, 0.025) 100%)",
        "text-linear": "linear-gradient(90deg, #23F7DD 0%, #CCFFF9 100%)"
      }
    }
  }
}
