import Browser from "../components/browser";
import FilterComponent from "../components/Filter";
import ViewDetails from "../components/cart";

function CustomerView() {
  return (
    <>
      <div>
        <Browser />
        <FilterComponent />
        <ViewDetails />
      </div>
    </>
  );
}

export default CustomerView;
