export type Theme = {
  name: string
  value: string
  cssVars: Record<string, string>
}

export const themes: Theme[] = [
  {
    name: "Slate",
    value: "slate",
    cssVars: {
      "--primary": "222.2 47.4% 11.2%",
      "--primary-foreground": "210 40% 98%",
    },
  },
  {
    name: "Red",
    value: "red",
    cssVars: {
      "--primary": "0 72.2% 50.6%",
      "--primary-foreground": "0 85.7% 97.3%",
    },
  },
  {
    name: "Orange",
    value: "orange",
    cssVars: {
      "--primary": "24.6 95% 53.1%",
      "--primary-foreground": "60 9.1% 97.8%",
    },
  },
  {
    name: "Amber",
    value: "amber",
    cssVars: {
      "--primary": "38 92% 50%",
      "--primary-foreground": "38 92% 97.8%",
    },
  },
  {
    name: "Yellow",
    value: "yellow",
    cssVars: {
      "--primary": "47.9 95.8% 53.1%",
      "--primary-foreground": "26 83.3% 14.1%",
    },
  },
  {
    name: "Lime",
    value: "lime",
    cssVars: {
      "--primary": "85.5 93% 44.7%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Green",
    value: "green",
    cssVars: {
      "--primary": "142.1 76.2% 36.3%",
      "--primary-foreground": "355.7 100% 97.3%",
    },
  },
  {
    name: "Emerald",
    value: "emerald",
    cssVars: {
      "--primary": "160 84% 39%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Teal",
    value: "teal",
    cssVars: {
      "--primary": "173.4 80.4% 40%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Cyan",
    value: "cyan",
    cssVars: {
      "--primary": "189.5 94.5% 43.1%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Sky",
    value: "sky",
    cssVars: {
      "--primary": "198.6 88.7% 48.4%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Blue",
    value: "blue",
    cssVars: {
      "--primary": "221.2 83.2% 53.3%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Indigo",
    value: "indigo",
    cssVars: {
      "--primary": "225.9 70.7% 40.2%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Violet",
    value: "violet",
    cssVars: {
      "--primary": "262.1 83.3% 57.8%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Purple",
    value: "purple",
    cssVars: {
      "--primary": "272.1 91.7% 34.1%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Fuchsia",
    value: "fuchsia",
    cssVars: {
      "--primary": "301.7 95.4% 41.8%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Pink",
    value: "pink",
    cssVars: {
      "--primary": "322.1 73.3% 57.8%",
      "--primary-foreground": "0 0% 100%",
    },
  },
  {
    name: "Rose",
    value: "rose",
    cssVars: {
      "--primary": "349.7 89.2% 60.2%",
      "--primary-foreground": "0 0% 100%",
    },
  },
]

