// Namuna (mock) ma'lumotlar - keyinchalik real API bilan almashtiriladi.

export const KPIS = [
  {
    id: "revenue",
    label: "Umumiy daromad",
    value: "$184,920",
    delta: 12.5,
    trend: "up",
    color: "var(--brand)",
    spark: [12, 18, 14, 22, 26, 24, 31, 28, 35, 38, 42, 48],
  },
  {
    id: "orders",
    label: "Buyurtmalar",
    value: "1,284",
    delta: 8.2,
    trend: "up",
    color: "var(--c-blue)",
    spark: [20, 22, 19, 25, 28, 27, 30, 33, 31, 36, 40, 44],
  },
  {
    id: "customers",
    label: "Yangi mijozlar",
    value: "342",
    delta: -3.1,
    trend: "down",
    color: "var(--c-purple)",
    spark: [30, 28, 32, 27, 25, 26, 24, 23, 25, 22, 21, 20],
  },
  {
    id: "avg",
    label: "O'rtacha chek",
    value: "$1,440",
    delta: 5.7,
    trend: "up",
    color: "var(--c-green)",
    spark: [10, 12, 11, 14, 13, 16, 18, 17, 20, 22, 21, 24],
  },
];

export const REVENUE_DATA = [
  { month: "Yan", daromad: 9200, xarajat: 5400 },
  { month: "Fev", daromad: 11800, xarajat: 6100 },
  { month: "Mar", daromad: 10400, xarajat: 5800 },
  { month: "Apr", daromad: 14200, xarajat: 7200 },
  { month: "May", daromad: 16800, xarajat: 8100 },
  { month: "Iyn", daromad: 15400, xarajat: 7600 },
  { month: "Iyl", daromad: 18900, xarajat: 8800 },
  { month: "Avg", daromad: 21200, xarajat: 9400 },
  { month: "Sen", daromad: 19800, xarajat: 9100 },
  { month: "Okt", daromad: 23400, xarajat: 10200 },
  { month: "Noy", daromad: 25800, xarajat: 10900 },
  { month: "Dek", daromad: 28100, xarajat: 11600 },
];

export const SERVICE_SPLIT = [
  { name: "Body-kit montaj", value: 34, color: "#ff3d3d" },
  { name: "Tonirovka", value: 22, color: "#ff8a3d" },
  { name: "Disk & shina", value: 20, color: "#3d6bff" },
  { name: "Chip-tuning", value: 14, color: "#9b5dff" },
  { name: "Boshqalar", value: 10, color: "#22c58b" },
];

export const WEEKLY_ORDERS = [
  { day: "Du", orders: 18 },
  { day: "Se", orders: 24 },
  { day: "Ch", orders: 21 },
  { day: "Pa", orders: 32 },
  { day: "Ju", orders: 41 },
  { day: "Sh", orders: 48 },
  { day: "Ya", orders: 29 },
];

export const SATISFACTION = [
  { metric: "Sifat", value: 95 },
  { metric: "Tezlik", value: 82 },
  { metric: "Narx", value: 74 },
  { metric: "Servis", value: 91 },
  { metric: "Aniqlik", value: 88 },
];

export const ORDERS = [
  {
    id: "#APX-1042",
    customer: "Bobur Aliyev",
    car: "BMW M4",
    service: "Body-kit + tonirovka",
    amount: 6800,
    status: "Bajarilmoqda",
    date: "2026-06-12",
  },
  {
    id: "#APX-1041",
    customer: "Dilnoza Karimova",
    car: "Mercedes C63",
    service: "Chip-tuning",
    amount: 2100,
    status: "Yakunlandi",
    date: "2026-06-11",
  },
  {
    id: "#APX-1040",
    customer: "Sardor Tursunov",
    car: "Audi RS6",
    service: 'Disk 21" + podveska',
    amount: 7200,
    status: "Yakunlandi",
    date: "2026-06-10",
  },
  {
    id: "#APX-1039",
    customer: "Madina Yusupova",
    car: "Lexus LX",
    service: "To\u2019liq tuning",
    amount: 12400,
    status: "Kutilmoqda",
    date: "2026-06-10",
  },
  {
    id: "#APX-1038",
    customer: "Jasur Rahimov",
    car: "Toyota Camry",
    service: "Tonirovka",
    amount: 500,
    status: "Yakunlandi",
    date: "2026-06-09",
  },
  {
    id: "#APX-1037",
    customer: "Nodira Ismoilova",
    car: "Range Rover",
    service: "Sport vyxlop",
    amount: 2100,
    status: "Bajarilmoqda",
    date: "2026-06-08",
  },
  {
    id: "#APX-1036",
    customer: "Aziz Komilov",
    car: "Porsche 911",
    service: "Karbon kapot",
    amount: 2600,
    status: "Bekor qilindi",
    date: "2026-06-07",
  },
  {
    id: "#APX-1035",
    customer: "Kamola Saidova",
    car: "Tesla Model 3",
    service: "LED faralar",
    amount: 1900,
    status: "Yakunlandi",
    date: "2026-06-06",
  },
];

export const PRODUCTS = [
  {
    id: "p1",
    name: 'Forged Sport disklar 20"',
    category: "G\u2019ildiraklar",
    price: 3800,
    stock: 24,
    sold: 142,
    status: "Mavjud",
  },
  {
    id: "p2",
    name: "Karbon-fiber kapot",
    category: "Tana",
    price: 2600,
    stock: 8,
    sold: 67,
    status: "Kam qoldi",
  },
  {
    id: "p3",
    name: "Titan vyxlop tizimi",
    category: "Dvigatel",
    price: 2100,
    stock: 15,
    sold: 98,
    status: "Mavjud",
  },
  {
    id: "p4",
    name: "Brembo tormoz to\u2019plami",
    category: "Tormoz",
    price: 3400,
    stock: 0,
    sold: 54,
    status: "Tugagan",
  },
  {
    id: "p5",
    name: "LED matrix faralar",
    category: "Optika",
    price: 1900,
    stock: 31,
    sold: 121,
    status: "Mavjud",
  },
  {
    id: "p6",
    name: "Sport podveska coilover",
    category: "Xodovoy",
    price: 2800,
    stock: 6,
    sold: 73,
    status: "Kam qoldi",
  },
];

export const CUSTOMERS = [
  {
    id: "c1",
    name: "Bobur Aliyev",
    email: "bobur@mail.uz",
    orders: 7,
    spent: 24800,
    tier: "VIP",
    joined: "2024-03-11",
  },
  {
    id: "c2",
    name: "Dilnoza Karimova",
    email: "dilnoza@mail.uz",
    orders: 4,
    spent: 9200,
    tier: "Oltin",
    joined: "2024-07-22",
  },
  {
    id: "c3",
    name: "Sardor Tursunov",
    email: "sardor@mail.uz",
    orders: 5,
    spent: 15400,
    tier: "VIP",
    joined: "2024-01-09",
  },
  {
    id: "c4",
    name: "Madina Yusupova",
    email: "madina@mail.uz",
    orders: 2,
    spent: 13800,
    tier: "Oltin",
    joined: "2025-02-14",
  },
  {
    id: "c5",
    name: "Jasur Rahimov",
    email: "jasur@mail.uz",
    orders: 3,
    spent: 3400,
    tier: "Standart",
    joined: "2025-05-30",
  },
  {
    id: "c6",
    name: "Nodira Ismoilova",
    email: "nodira@mail.uz",
    orders: 6,
    spent: 18900,
    tier: "VIP",
    joined: "2024-09-03",
  },
];

export const ACTIVITY = [
  {
    id: 1,
    text: "Yangi buyurtma #APX-1042 qabul qilindi",
    time: "5 daqiqa oldin",
    type: "order",
  },
  {
    id: 2,
    text: "Brembo tormoz to\u2019plami tugadi",
    time: "32 daqiqa oldin",
    type: "stock",
  },
  {
    id: 3,
    text: "Dilnoza Karimova to\u2019lovni amalga oshirdi",
    time: "1 soat oldin",
    type: "payment",
  },
  {
    id: 4,
    text: "Yangi mijoz ro\u2019yxatdan o\u2019tdi: Aziz K.",
    time: "2 soat oldin",
    type: "customer",
  },
  {
    id: 5,
    text: "Buyurtma #APX-1036 bekor qilindi",
    time: "4 soat oldin",
    type: "cancel",
  },
];

export const statusToBadge = (status) => {
  switch (status) {
    case "Yakunlandi":
    case "Mavjud":
      return "badge--green";
    case "Bajarilmoqda":
    case "Kam qoldi":
      return "badge--amber";
    case "Kutilmoqda":
      return "badge--blue";
    default:
      return "badge--red";
  }
};

export const tierToBadge = (tier) => {
  switch (tier) {
    case "VIP":
      return "badge--red";
    case "Oltin":
      return "badge--amber";
    default:
      return "badge--blue";
  }
};
