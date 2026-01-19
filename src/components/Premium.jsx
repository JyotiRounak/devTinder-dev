import axios from "axios";
import {BASE_URL} from '../utils/constant';

const Premium = () => {
 const handlePayment = async(type)=>{
    try{
    const order = await axios.post(`${BASE_URL}payment/create`, { membershipType: type }, { withCredentials: true});

    const {amount, keyId, currency, notes, orderId} = order.data

    // It should open the razor pay dialog box
    const options = {
      "key": keyId, // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. 
      currency,
      "name": "Dev Tinder",
      "description": "Connect to other developers",
      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      prefill: {
        name: notes.firstName + " " +  notes.lastName,
        email: notes.emailId,
        contact: '9999999999'
      },
      "theme": {
          "color": "#3399cc"
      }
  };
    const rzp = new window.Razorpay(options);
      rzp.open();

    }
    catch(error){
        console.warn(error);
    }

 }
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">DevConnect Premium</h1>
        <p className="text-base-content/70 mt-2">
          Match smarter. Connect faster. Build better dev relationships.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6">
        {/* Free Plan */}
        <div className="card bg-base-100 shadow-xl border">
          <div className="card-body">
            <h2 className="card-title">Free</h2>
            <p className="text-3xl font-bold">$0</p>
            <p className="text-sm text-base-content/60">Forever</p>

            <ul className="mt-4 space-y-2">
              <li>✅ Limited daily swipes</li>
              <li>✅ Basic profile</li>
              <li>✅ Standard matching</li>
            </ul>

            <div className="card-actions mt-6">
              <button className="btn btn-outline btn-disabled w-full">
                Current Plan
              </button>
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="card bg-base-100 shadow-2xl border border-primary relative">
          <span className="badge badge-primary absolute top-4 right-4">
            Popular
          </span>

          <div className="card-body">
            <h2 className="card-title text-primary">Premium</h2>
            <p className="text-3xl font-bold">$9.99</p>
            <p className="text-sm text-base-content/60">per month</p>

            <ul className="mt-4 space-y-2">
              <li>🔥 Unlimited swipes</li>
              <li>🔥 See who liked you</li>
              <li>🔥 Boost profile visibility</li>
              <li>🔥 Advanced dev filters</li>
            </ul>

            <div className="card-actions mt-6">
              <button className="btn btn-primary w-full" onClick={()=> handlePayment("premium")}>
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="card bg-base-100 shadow-xl border">
          <div className="card-body">
            <h2 className="card-title">Pro</h2>
            <p className="text-3xl font-bold">$19.99</p>
            <p className="text-sm text-base-content/60">per month</p>

            <ul className="mt-4 space-y-2">
              <li>🚀 Everything in Premium</li>
              <li>🚀 Weekly profile boosts</li>
              <li>🚀 Direct messaging</li>
              <li>🚀 Pro verified badge</li>
            </ul>

            <div className="card-actions mt-6">
              <button className="btn btn-secondary w-full" onClick={()=> handlePayment("pro")}>
                Go Pro
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-sm text-base-content/60 text-center">
        Cancel anytime · No hidden charges · Built for developers ❤️
      </div>
    </div>
  );
};

export default Premium;
