
import DashboardWelcome from "../features/dashboard/components/DashboardWelcome";
import RecommendedProperties from "../features/dashboard/components/RecommendedProperties";

export default function BuyerDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl space-y-6 sm:space-y-8">
      <DashboardWelcome />

      <RecommendedProperties />
    </div>
  );
}
