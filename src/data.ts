export interface ServiceVariation {
  id: string;
  name: string;
  price: number;
  duration: string;
  bookingUrl: string;
}

export interface ServiceStyle {
  id: string;
  name: string;
  variations: ServiceVariation[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  styles: ServiceStyle[];
}

export const services: ServiceCategory[] = [
  {
    id: "braids",
    name: "Braids & Cornrows",
    styles: [
      {
        id: "knotless",
        name: "Knotless Box Braids",
        variations: [
          {
            id: "knotless-smedium",
            name: "Smedium - Mid Back",
            price: 260,
            duration: "5h 30m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/knotless-smedium"
          },
          {
            id: "knotless-medium",
            name: "Medium - Waist Length",
            price: 230,
            duration: "4h 30m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/knotless-medium"
          },
          {
            id: "knotless-large",
            name: "Large - Waist Length",
            price: 190,
            duration: "3h 30m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/knotless-large"
          }
        ]
      },
      {
        id: "boho",
        name: "Boho Knotless",
        variations: [
          {
            id: "boho-s-mid",
            name: "Small - Mid Back",
            price: 280,
            duration: "6h",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/boho-sm"
          },
          {
            id: "boho-m-waist",
            name: "Medium - Waist Length",
            price: 240,
            duration: "5h",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/boho-mw"
          }
        ]
      },
      {
        id: "straight-back",
        name: "Straight Back Cornrows",
        variations: [
          {
            id: "sb-4",
            name: "4 Braids",
            price: 65,
            duration: "1h 15m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/straight-back-4"
          },
          {
            id: "sb-6",
            name: "6 Braids",
            price: 85,
            duration: "1h 45m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/straight-back-6"
          },
          {
            id: "sb-8",
            name: "8 Braids",
            price: 105,
            duration: "2h 15m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/straight-back-8"
          },
          {
            id: "sb-10",
            name: "10 Braids",
            price: 125,
            duration: "2h 45m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/straight-back-10"
          }
        ]
      }
    ]
  },
  {
    id: "silk-press",
    name: "Silk Press & Curls",
    styles: [
      {
        id: "silk-press-classic",
        name: "Classic Silk Press",
        variations: [
          {
            id: "sp-natural",
            name: "Natural Hair",
            price: 85,
            duration: "2h",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/sp-nat"
          },
          {
            id: "sp-extensions",
            name: "With Extensions (Leave-out)",
            price: 120,
            duration: "3h",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/sp-ext"
          }
        ]
      },
      {
        id: "curl-transformation",
        name: "Curl Transformation",
        variations: [
          {
            id: "curl-def",
            name: "Curl Definition & Hydration Treatment",
            price: 95,
            duration: "2h",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/curl-transform"
          }
        ]
      }
    ]
  },
  {
    id: "maintenance",
    name: "Maintenance & Men",
    styles: [
      {
        id: "wash-treat",
        name: "Wash & Treatment",
        variations: [
          {
            id: "scalp-treatment",
            name: "Scalp Detox & Treatment",
            price: 65,
            duration: "1h 15m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/scalp-treat"
          },
          {
            id: "deep-condition",
            name: "Deep Conditioning + Trim",
            price: 55,
            duration: "1h",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/treat-dc"
          }
        ]
      },
      {
        id: "mens-braids",
        name: "Men's Styles",
        variations: [
          {
            id: "mens-cornrows",
            name: "Basic Cornrows",
            price: 50,
            duration: "1h",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/mens-cornrows"
          },
          {
            id: "mens-box",
            name: "Box Braids / Twists",
            price: 80,
            duration: "2h",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/mens-box"
          },
          {
            id: "mens-two-strand",
            name: "Two-Strand Twists",
            price: 75,
            duration: "1h 45m",
            bookingUrl: "https://lastingbeauty.glossgenius.com/services/mens-twists"
          }
        ]
      }
    ]
  }
];
