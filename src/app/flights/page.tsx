import { FlightFilters } from "@Components/shared/common/FlightFilters";
import { FlightBookingModal } from "@Components/shared/FlightsPage/FlightBookingModal";
import { FlightListWithTabs } from "@Components/shared/FlightsPage/Lists";
import { Layout } from "@Components/shared/Layout";

const FlightsPage = () => (
  <Layout>
    <div className="min-h-screen w-full bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Search Flights</h1>
          <FlightBookingModal />
        </div>
        <FlightFilters />

        <div className="space-y-6">
          {/* <FlightList /> */}
          <FlightListWithTabs />
        </div>
      </div>
    </div>
  </Layout>
);

export default FlightsPage;
