// Dummy data layer. Every export here mirrors the shape of the future REST
// responses, so swapping to the real API is a change in this file only.

export type Status =
  | "ACTIVE"
  | "PENDING"
  | "REJECTED"
  | "EXPIRED"
  | "PAUSED"
  | "CREATED"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED"
  | "INITIATED"
  | "VERIFIED";

export type Category = {
  id: string;
  name: string;
  parent: string | null;
  storeCount: number;
  status: Status;
};

export const categories: Category[] = [
  { id: "cat_01", name: "Restaurants", parent: null, storeCount: 128, status: "ACTIVE" },
  { id: "cat_02", name: "Cafes", parent: "Restaurants", storeCount: 64, status: "ACTIVE" },
  { id: "cat_03", name: "Salons & Spa", parent: null, storeCount: 47, status: "ACTIVE" },
  { id: "cat_04", name: "Gyms & Fitness", parent: null, storeCount: 39, status: "ACTIVE" },
  { id: "cat_05", name: "Hotels", parent: null, storeCount: 22, status: "ACTIVE" },
  { id: "cat_06", name: "Retail", parent: null, storeCount: 86, status: "ACTIVE" },
  { id: "cat_07", name: "Electronics", parent: "Retail", storeCount: 31, status: "ACTIVE" },
  { id: "cat_08", name: "Grocery", parent: null, storeCount: 58, status: "ACTIVE" },
  { id: "cat_09", name: "Services", parent: null, storeCount: 41, status: "PENDING" },
  { id: "cat_10", name: "Events", parent: null, storeCount: 12, status: "PAUSED" },
];

export type Merchant = {
  id: string;
  businessName: string;
  owner: string;
  phone: string;
  category: string;
  city: string;
  storeCount: number;
  kycStatus: Status;
  status: Status;
  joinedOn: string;
};

export const merchants: Merchant[] = [
  { id: "mrc_1042", businessName: "ABC Fitness Group", owner: "Rohan Mehta", phone: "+91 98220 41120", category: "Gyms & Fitness", city: "Pune", storeCount: 4, kycStatus: "VERIFIED", status: "ACTIVE", joinedOn: "2026-06-14" },
  { id: "mrc_1043", businessName: "Café Kettle", owner: "Ananya Deshpande", phone: "+91 90110 77821", category: "Cafes", city: "Pune", storeCount: 3, kycStatus: "VERIFIED", status: "ACTIVE", joinedOn: "2026-06-28" },
  { id: "mrc_1044", businessName: "Saffron Table", owner: "Imran Shaikh", phone: "+91 98700 12093", category: "Restaurants", city: "Mumbai", storeCount: 2, kycStatus: "VERIFIED", status: "ACTIVE", joinedOn: "2026-07-03" },
  { id: "mrc_1045", businessName: "Glow Studio Salon", owner: "Priya Nair", phone: "+91 99400 55210", category: "Salons & Spa", city: "Nagpur", storeCount: 1, kycStatus: "PENDING", status: "PENDING", joinedOn: "2026-08-19" },
  { id: "mrc_1046", businessName: "Volt Electronics", owner: "Karan Malhotra", phone: "+91 98111 30045", category: "Electronics", city: "Delhi", storeCount: 5, kycStatus: "VERIFIED", status: "ACTIVE", joinedOn: "2026-05-22" },
  { id: "mrc_1047", businessName: "DailyBasket Grocery", owner: "Sneha Kulkarni", phone: "+91 97660 88431", category: "Grocery", city: "Pune", storeCount: 7, kycStatus: "PENDING", status: "PENDING", joinedOn: "2026-09-01" },
  { id: "mrc_1048", businessName: "The Kirana Corner", owner: "Vikas Patil", phone: "+91 90280 66710", category: "Grocery", city: "Nashik", storeCount: 1, kycStatus: "REJECTED", status: "REJECTED", joinedOn: "2026-08-05" },
  { id: "mrc_1049", businessName: "Aurora Hotels", owner: "Meera Iyer", phone: "+91 98450 22119", category: "Hotels", city: "Bengaluru", storeCount: 3, kycStatus: "VERIFIED", status: "ACTIVE", joinedOn: "2026-04-11" },
];

export type Store = {
  id: string;
  merchantId: string;
  merchant: string;
  storeName: string;
  address: string;
  city: string;
  pincode: string;
  latitude: number;
  longitude: number;
  category: string;
  rating: number;
  openNow: boolean;
  activeOffers: number;
  status: Status;
};

export const stores: Store[] = [
  { id: "str_2201", merchantId: "mrc_1042", merchant: "ABC Fitness Group", storeName: "ABC Fitness · Kothrud", address: "Paud Road, Kothrud", city: "Pune", pincode: "411038", latitude: 18.5074, longitude: 73.8077, category: "Gyms & Fitness", rating: 4.8, openNow: true, activeOffers: 3, status: "ACTIVE" },
  { id: "str_2202", merchantId: "mrc_1042", merchant: "ABC Fitness Group", storeName: "ABC Fitness · Bandra West", address: "Linking Road, Bandra West", city: "Mumbai", pincode: "400050", latitude: 19.0596, longitude: 72.8295, category: "Gyms & Fitness", rating: 4.6, openNow: true, activeOffers: 2, status: "ACTIVE" },
  { id: "str_2203", merchantId: "mrc_1042", merchant: "ABC Fitness Group", storeName: "ABC Fitness · Dharampeth", address: "West High Court Road", city: "Nagpur", pincode: "440010", latitude: 21.1458, longitude: 79.0882, category: "Gyms & Fitness", rating: 4.4, openNow: false, activeOffers: 1, status: "PENDING" },
  { id: "str_2204", merchantId: "mrc_1042", merchant: "ABC Fitness Group", storeName: "ABC Fitness · Saket", address: "Press Enclave Road, Saket", city: "Delhi", pincode: "110017", latitude: 28.5245, longitude: 77.2066, category: "Gyms & Fitness", rating: 4.2, openNow: false, activeOffers: 0, status: "PAUSED" },
  { id: "str_2205", merchantId: "mrc_1043", merchant: "Café Kettle", storeName: "Café Kettle · Baner", address: "Baner Road", city: "Pune", pincode: "411045", latitude: 18.5590, longitude: 73.7868, category: "Cafes", rating: 4.7, openNow: true, activeOffers: 2, status: "ACTIVE" },
  { id: "str_2206", merchantId: "mrc_1044", merchant: "Saffron Table", storeName: "Saffron Table · Andheri", address: "Veera Desai Road, Andheri West", city: "Mumbai", pincode: "400053", latitude: 19.1364, longitude: 72.8296, category: "Restaurants", rating: 4.5, openNow: true, activeOffers: 1, status: "ACTIVE" },
  { id: "str_2207", merchantId: "mrc_1045", merchant: "Glow Studio Salon", storeName: "Glow Studio · Sitabuldi", address: "Central Avenue, Sitabuldi", city: "Nagpur", pincode: "440012", latitude: 21.1466, longitude: 79.0849, category: "Salons & Spa", rating: 4.3, openNow: true, activeOffers: 0, status: "PENDING" },
  { id: "str_2208", merchantId: "mrc_1046", merchant: "Volt Electronics", storeName: "Volt · Nehru Place", address: "Nehru Place Market", city: "Delhi", pincode: "110019", latitude: 28.5494, longitude: 77.2513, category: "Electronics", rating: 4.1, openNow: true, activeOffers: 4, status: "ACTIVE" },
];

export type Offer = {
  id: string;
  title: string;
  merchant: string;
  store: string;
  type: "FLAT_PCT" | "FLAT_AMT" | "BOGO";
  value: string;
  validFrom: string;
  validTo: string;
  redemptions: number;
  status: Status;
};

export const offers: Offer[] = [
  { id: "off_5501", title: "Flat 20% off membership", merchant: "ABC Fitness Group", store: "Kothrud, Pune", type: "FLAT_PCT", value: "20% · cap ₹1,999", validFrom: "2026-09-01", validTo: "2026-09-15", redemptions: 214, status: "ACTIVE" },
  { id: "off_5502", title: "BOGO personal training", merchant: "ABC Fitness Group", store: "Bandra West, Mumbai", type: "BOGO", value: "2 sessions", validFrom: "2026-09-10", validTo: "2026-09-30", redemptions: 0, status: "PENDING" },
  { id: "off_5503", title: "₹500 off annual plan", merchant: "ABC Fitness Group", store: "All stores", type: "FLAT_AMT", value: "₹500 flat", validFrom: "2026-09-01", validTo: "2026-09-30", redemptions: 0, status: "CREATED" },
  { id: "off_5504", title: "15% off day pass", merchant: "ABC Fitness Group", store: "Dharampeth, Nagpur", type: "FLAT_PCT", value: "15%", validFrom: "2026-08-15", validTo: "2026-08-29", redemptions: 96, status: "EXPIRED" },
  { id: "off_5505", title: "Buy 1 get 1 filter coffee", merchant: "Café Kettle", store: "Baner, Pune", type: "BOGO", value: "1 + 1", validFrom: "2026-09-05", validTo: "2026-09-25", redemptions: 431, status: "ACTIVE" },
  { id: "off_5506", title: "Flat ₹300 off above ₹1,200", merchant: "Saffron Table", store: "Andheri, Mumbai", type: "FLAT_AMT", value: "₹300 flat", validFrom: "2026-09-02", validTo: "2026-10-02", redemptions: 188, status: "ACTIVE" },
  { id: "off_5507", title: "10% off all accessories", merchant: "Volt Electronics", store: "Nehru Place, Delhi", type: "FLAT_PCT", value: "10% · cap ₹800", validFrom: "2026-09-08", validTo: "2026-09-22", redemptions: 0, status: "PENDING" },
  { id: "off_5508", title: "Spa combo 25% off", merchant: "Glow Studio Salon", store: "Sitabuldi, Nagpur", type: "FLAT_PCT", value: "25%", validFrom: "2026-09-12", validTo: "2026-10-12", redemptions: 0, status: "PENDING" },
];

export type Transaction = {
  id: string;
  utr: string;
  customer: string;
  merchant: string;
  store: string;
  offer: string;
  billAmount: number;
  discount: number;
  payable: number;
  rewardPoints: number;
  paidAt: string;
  status: Status;
};

export const transactions: Transaction[] = [
  { id: "pay_int_55210", utr: "UPI2026090812345678", customer: "Aarav K.", merchant: "ABC Fitness Group", store: "Kothrud, Pune", offer: "Flat 20% off membership", billAmount: 4999, discount: 999, payable: 4000, rewardPoints: 80, paidAt: "2026-09-09 09:12", status: "SUCCESS" },
  { id: "pay_int_55211", utr: "UPI2026090812345691", customer: "Nikita S.", merchant: "Café Kettle", store: "Baner, Pune", offer: "Buy 1 get 1 filter coffee", billAmount: 480, discount: 240, payable: 240, rewardPoints: 5, paidAt: "2026-09-09 08:54", status: "SUCCESS" },
  { id: "pay_int_55212", utr: "—", customer: "Rahul M.", merchant: "Saffron Table", store: "Andheri, Mumbai", offer: "Flat ₹300 off above ₹1,200", billAmount: 1650, discount: 300, payable: 1350, rewardPoints: 0, paidAt: "2026-09-09 08:31", status: "PENDING" },
  { id: "pay_int_55213", utr: "UPI2026090812345702", customer: "Divya P.", merchant: "Volt Electronics", store: "Nehru Place, Delhi", offer: "10% off all accessories", billAmount: 3200, discount: 320, payable: 2880, rewardPoints: 58, paidAt: "2026-09-09 07:47", status: "SUCCESS" },
  { id: "pay_int_55214", utr: "—", customer: "Sameer J.", merchant: "ABC Fitness Group", store: "Bandra West, Mumbai", offer: "BOGO personal training", billAmount: 2400, discount: 1200, payable: 1200, rewardPoints: 0, paidAt: "2026-09-08 21:19", status: "FAILED" },
  { id: "pay_int_55215", utr: "UPI2026090812345715", customer: "Isha R.", merchant: "Café Kettle", store: "Baner, Pune", offer: "Buy 1 get 1 filter coffee", billAmount: 620, discount: 310, payable: 310, rewardPoints: 6, paidAt: "2026-09-08 19:02", status: "SUCCESS" },
  { id: "pay_int_55216", utr: "UPI2026090812345720", customer: "Mohit A.", merchant: "ABC Fitness Group", store: "Kothrud, Pune", offer: "Flat 20% off membership", billAmount: 4999, discount: 999, payable: 4000, rewardPoints: 80, paidAt: "2026-09-08 17:40", status: "REFUNDED" },
  { id: "pay_int_55217", utr: "UPI2026090812345733", customer: "Tanvi B.", merchant: "Saffron Table", store: "Andheri, Mumbai", offer: "Flat ₹300 off above ₹1,200", billAmount: 2100, discount: 300, payable: 1800, rewardPoints: 36, paidAt: "2026-09-08 14:23", status: "SUCCESS" },
];

export const merchantProfile = {
  businessName: "ABC Fitness Group",
  legalName: "ABC Wellness Ventures Pvt Ltd",
  owner: "Rohan Mehta",
  email: "rohan@abcfitness.in",
  phone: "+91 98220 41120",
  category: "Gyms & Fitness",
  gstin: "27AABCA1234C1Z5",
  upiVpa: "abcfitness@upi",
  kycStatus: "VERIFIED" as Status,
  city: "Pune",
  since: "June 2026",
};

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  hint: string;
};

export const merchantKpis: Kpi[] = [
  { label: "Revenue · 7 days", value: "₹4,82,910", delta: "+12.4%", trend: "up", hint: "Across 4 stores" },
  { label: "Redemptions", value: "1,847", delta: "+8.1%", trend: "up", hint: "Offers claimed this week" },
  { label: "Active stores", value: "3 / 4", delta: "1 pending", trend: "flat", hint: "Nagpur awaiting approval" },
  { label: "Avg. discount", value: "₹164", delta: "-3.2%", trend: "down", hint: "Per redeemed bill" },
];

export const adminKpis: Kpi[] = [
  { label: "Merchants", value: "428", delta: "+18", trend: "up", hint: "New this month" },
  { label: "Discoverable stores", value: "1,264", delta: "+52", trend: "up", hint: "Live on the map" },
  { label: "Pending approvals", value: "23", delta: "+6", trend: "down", hint: "Merchants, stores & offers" },
  { label: "GMV · 30 days", value: "₹1.42 Cr", delta: "+21.7%", trend: "up", hint: "Settled through UPI" },
];

// 90 days of revenue / redemption series for the area chart.
export const revenueSeries = (() => {
  const out: { date: string; revenue: number; redemptions: number }[] = [];
  const end = new Date("2026-09-09T00:00:00Z");
  for (let i = 89; i >= 0; i--) {
    const d = new Date(end.getTime() - i * 86400000);
    const wave = Math.sin(i / 6) * 0.18 + Math.sin(i / 21) * 0.12;
    const growth = 1 + (89 - i) / 220;
    const weekend = d.getUTCDay() === 0 || d.getUTCDay() === 6 ? 1.24 : 1;
    const revenue = Math.round(42000 * growth * weekend * (1 + wave));
    const redemptions = Math.round(revenue / 265);
    out.push({ date: d.toISOString().slice(0, 10), revenue, redemptions });
  }
  return out;
})();

export const approvalQueue = [
  { id: "apr_01", kind: "Merchant", title: "DailyBasket Grocery", detail: "Pune · 7 stores · KYC submitted", submitted: "2 hours ago" },
  { id: "apr_02", kind: "Store", title: "Glow Studio · Sitabuldi", detail: "Nagpur 440012 · Map pin set", submitted: "5 hours ago" },
  { id: "apr_03", kind: "Offer", title: "BOGO personal training", detail: "ABC Fitness · Mumbai · Sep 10–30", submitted: "yesterday" },
  { id: "apr_04", kind: "Offer", title: "10% off all accessories", detail: "Volt Electronics · Delhi · Sep 8–22", submitted: "yesterday" },
  { id: "apr_05", kind: "Merchant", title: "Glow Studio Salon", detail: "Nagpur · 1 store · KYC pending", submitted: "2 days ago" },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
