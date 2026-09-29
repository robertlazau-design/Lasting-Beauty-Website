export interface ServiceVariation {
  id: string;
  name: string;
  price: number;
  duration: string;
  bookingUrl: string;
  description?: string;
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
    id: "cornrows",
    name: "Cornrows & Braids",
    styles: [
      {
        id: "straight-back",
        name: "Straight Back Cornrows",
        variations: [
          {
            id: "sb-2",
            name: "2 Straight Back",
            price: 95,
            duration: "1h 15m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-19361dab-3ceb-425d-a7a2-4510172d350c"
          },
          {
            id: "sb-4",
            name: "4 Straight Back",
            price: 150,
            duration: "2h 15m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-9582cfd7-2b91-4fd5-9595-66fc3edbf59f"
          },
          {
            id: "sb-6",
            name: "6 Straight Back",
            price: 187,
            duration: "2h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-626f9ab8-62b6-4ad3-aa77-3d9b0bd0f3af"
          },
          {
            id: "sb-8",
            name: "8 Straight Back",
            price: 225,
            duration: "3h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-3e629606-5474-44e3-9cee-ecb62fd0b8df"
          },
          {
            id: "sb-10",
            name: "10 Straight Back",
            price: 262,
            duration: "3h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-b1865106-4432-4aaf-8f89-939b2a979cf9"
          }
        ]
      },
      {
        id: "boho-cornrows",
        name: "Boho Cornrows (with Curls)",
        variations: [
          {
            id: "boho-6",
            name: "6 Boho Cornrows",
            price: 225,
            duration: "3h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-96d10061-19cd-4cfe-870b-d8f62dc59229"
          },
          {
            id: "boho-8",
            name: "8 Boho Cornrows",
            price: 262,
            duration: "3h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-30abe8cf-ecf0-4561-9b43-46adbdf9e534"
          },
          {
            id: "boho-10",
            name: "10 Boho Cornrows",
            price: 300,
            duration: "4h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-ef216efa-ea70-4876-8919-3b07e0c8c0bb"
          },
          {
            id: "boho-pony",
            name: "Boho Cornrows - Ponytail",
            price: 375,
            duration: "5h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-055d0e8d-b7b6-41f4-a5d2-9691e44c143f"
          }
        ]
      },
      {
        id: "half-cornrows",
        name: "Half Cornrows (Braids + Natural Hair)",
        variations: [
          {
            id: "half-4-6",
            name: "4-6 Half Cornrows",
            price: 187,
            duration: "2h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-9efdee2f-5f5d-4470-90f4-e13b76955558"
          },
          {
            id: "half-8-10",
            name: "8-10 Half Cornrows",
            price: 262,
            duration: "3h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-48b85b13-8685-4472-be45-09a7bb1688ca"
          },
          {
            id: "half-12-15",
            name: "12 -15 Half Cornrows",
            price: 337,
            duration: "4h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-0cb5d9a9-2265-41f5-9b85-7692ec3083b6"
          },
          {
            id: "half-smedium",
            name: "6 Half Cornrows > SMedium Singles",
            price: 300,
            duration: "4h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-029aec38-c215-4eb8-bc71-92c64fb5682c"
          },
          {
            id: "half-large",
            name: "6 Half Cornrows > Large Singles",
            price: 337,
            duration: "4h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-80f00b2b-41b4-4658-8bfc-b52dbac340d7"
          }
        ]
      },
      {
        id: "dutch-braids",
        name: "Wash & Dutch Braids",
        variations: [
          {
            id: "wash-dutch",
            name: "Wash & 2 Dutch/French Braids",
            price: 55,
            duration: "45m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-5c4441e5-0065-4450-bd76-aa48dbfad421"
          }
        ]
      }
    ]
  },
  {
    id: "curls-silk-press",
    name: "Silk Press & Natural Curls",
    styles: [
      {
        id: "silk-press-style",
        name: "Classic Silk Press",
        variations: [
          {
            id: "silk-press",
            name: "Silk Press (Wash, Blow-Dry & Press)",
            price: 187,
            duration: "2h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-79329c7f-ea69-422e-a773-76c92b4fa4fc"
          }
        ]
      },
      {
        id: "curly-styling",
        name: "Curl Transformation & Hydration",
        variations: [
          {
            id: "curl-transformation",
            name: "Curly Transformation",
            price: 187,
            duration: "2h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-43ac327f-49c3-4b0f-8611-fd7504dad90f"
          },
          {
            id: "wash-n-go",
            name: "Wash n Go!",
            price: 150,
            duration: "1h 45m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-821ef605-c047-411b-a346-2f60ece61ca0"
          }
        ]
      },
      {
        id: "women-twists",
        name: "Natural Hair Twists",
        variations: [
          {
            id: "twists-natural",
            name: "Women’s Twists",
            price: 150,
            duration: "2h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-9a1c4548-dd7b-4090-952a-82e5dcfe2f51"
          }
        ]
      }
    ]
  },
  {
    id: "mens-styles",
    name: "Men's Styles",
    styles: [
      {
        id: "mens-box-braids",
        name: "Men's Box Braids",
        variations: [
          {
            id: "mens-box-small",
            name: "Men's Small Box Braids",
            price: 262,
            duration: "3h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-db4499c2-6c3e-4744-9e95-0e70acd8ca34"
          },
          {
            id: "mens-box-medium",
            name: "Men's Medium Box Braids",
            price: 225,
            duration: "3h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-f0851738-b70d-4feb-97a0-9068e01c770f"
          },
          {
            id: "mens-box-large",
            name: "Men's Large Box Braids",
            price: 112,
            duration: "1h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-8e52d48e-19fd-4349-9008-d0965f27a544"
          }
        ]
      },
      {
        id: "mens-twists-coils",
        name: "Men's Twists & Coils",
        variations: [
          {
            id: "mens-smedium-twists",
            name: "Men's Smedium Braid > 2 Strand Twists",
            price: 300,
            duration: "4h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-39d1acb9-654b-4581-8928-3e69b458b42a"
          },
          {
            id: "mens-finger-coils",
            name: "Men's Finger Coils",
            price: 150,
            duration: "2h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-8e50be2f-f357-46e1-ae6f-1c6eab783f69"
          }
        ]
      }
    ]
  },
  {
    id: "treatments-consultations",
    name: "Treatments & Consultations",
    styles: [
      {
        id: "scalp-conditioning",
        name: "Scalp Health & Hair Care",
        variations: [
          {
            id: "full-scalp-treatment",
            name: "Full Scalp Detox Treatment",
            price: 262,
            duration: "3h 30m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-bcbde127-603c-40db-a6b7-1295e5db442a"
          },
          {
            id: "deep-wash-buildup",
            name: "Deep Wash for Scalp Buildup",
            price: 25,
            duration: "20m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-2f03847d-80ee-4f11-8aa4-53008ca40003"
          },
          {
            id: "box-braid-takedown",
            name: "Box Braid Take-Down Service",
            price: 75,
            duration: "3h",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-dbd6eda2-0997-4693-a2af-1993fb20992b"
          }
        ]
      },
      {
        id: "consultations-styles",
        name: "Consultations & Inquiries",
        variations: [
          {
            id: "consult-in-person",
            name: "Style Consultation (In-Person)",
            price: 0,
            duration: "10m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-9463a716-bbf0-4936-817e-fbd58fd8e86d"
          },
          {
            id: "consult-virtual",
            name: "Style Consultation (Virtual FaceTime/Zoom)",
            price: 0,
            duration: "15m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-0f8a5020-b161-4efc-ae16-68f3b0588e6f"
          },
          {
            id: "consult-detangle",
            name: "Detangle Consultation",
            price: 0,
            duration: "15m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-3669c7ed-d230-4e76-9684-eee6e6ace5eb"
          },
          {
            id: "consult-curly",
            name: "Curly Hair Consultation",
            price: 55,
            duration: "45m",
            bookingUrl: "https://lastingbeauty11.glossgenius.com/book?service_token=1000f-4961a7d5-1cb2-4f07-b967-9c3130b86230"
          }
        ]
      }
    ]
  }
];
