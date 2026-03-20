"use client";

import EvExpandableCard from "@/app/components/ui/EvExpandableCard";

export default function Page() {
  return (
    <main className="min-h-screen ev-bg-alt ev-pad-xl ev-flex ev-flex-col ev-items-center ev-gap-md">
      <EvExpandableCard
        title="Premium EV Charging Station"
        subtitle="Bangalore, Karnataka"
        image="https://i.pravatar.cc/150?u=station1"
        actionButton={
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200 ev-btn">
            Book Slot
          </button>
        }
      >
        Experience lightning-fast charging with our new 350kW DC fast chargers.
        Equipped with ultra-cooling technology, you can get an 80% charge in
        just 15 minutes. Amenities include a dedicated waiting lounge, free
        Wi-Fi, and a cafe.
      </EvExpandableCard>

      <EvExpandableCard
        title="Standard EV Hub"
        subtitle="Chennai, Tamil Nadu"
        actionButton={
          <button className="bg-gray-900 hover:bg-black text-white font-bold rounded-lg transition-colors duration-200 ev-btn">
            View Map
          </button>
        }
      >
        Reliable Level 2 charging stations perfect for overnight or
        long-duration parking. Features 24/7 security, covered parking, and easy
        payment via the app.
      </EvExpandableCard>

      <EvExpandableCard
        title="Compact City Charger"
        subtitle="Mumbai, Maharashtra"
      >
        Space-saving charging solutions designed for dense urban environments.
        Available at select public parking meters and curbside locations.
      </EvExpandableCard>
    </main>
  );
}
