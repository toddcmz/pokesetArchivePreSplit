/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        primary1: "#D8D8EB",
        primary2: "#9A9ABD",
        primary3: "#525283",
        primary4: "#29295A",
        primary5: "#0B0B38",
        neutral1: "#F5F5F5",
        neutral2: "#E0DCDC",
        neutral3: "#CBC2C2",
        neutral4: "#978C8C",
        neutral5: "#665E5E",
        success1: "#B3DCD0",
        success2: "#8EC6B5",
        success3: "#4A8E7A",
        success4: "#1D604C",
        success5: "#093528",
        error1: "#EFC3B9",
        error2: "#E08A77",
        error3: "#C8543B",
        error4: "#7E2E1C",
        error5: "#501A0E",
        warning1: "#F2DCBA",
        warning2: "#D8B279",
        warning3: "#A37735",
        warning4: "#885C1A",
        warning5: "#66420B",
      }
    },
  },
  plugins: [],
}

