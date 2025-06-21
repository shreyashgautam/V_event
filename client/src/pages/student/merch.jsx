import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardTitle } from '../../components/ui/card';
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import { toast } from 'sonner';
import { fetchFilteredMerch } from '../../stores/student/merch-slice';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../stores/student/payment-slice';
import { buyMerch, fetchStudentBuys } from '../../stores/student/buy-slice';

const gradientClasses = [
  'from-purple-500 to-pink-500',
  'from-indigo-500 to-blue-500',
  'from-green-400 to-lime-500',
  'from-yellow-400 to-orange-500',
  'from-red-400 to-pink-500',
  'from-sky-400 to-indigo-500',
  'from-rose-400 to-pink-600',
  'from-emerald-400 to-teal-500',
];
const getRandomGradient = () => gradientClasses[Math.floor(Math.random() * gradientClasses.length)];

const Merchandise = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const merchandiseData = useSelector((state) => state.merch.merchList);
  const { myBuys } = useSelector((state) => state.studentBuy);
  const regNo = user?.regNo;

  useEffect(() => {
    dispatch(fetchFilteredMerch());
    if (regNo) dispatch(fetchStudentBuys(regNo));
  }, [dispatch, regNo]);

  const hasAlreadyBought = (merchId) => myBuys?.some(item => item.merchId === merchId);

  const handleBuy = async (item) => {
    if (!regNo) return toast.error("Please log in to buy merchandise.");
    if (hasAlreadyBought(item.merchId)) return toast.error("You've already bought this item.");

    try {
      const amount = Math.round(item.price * 100);
      const { payload: orderRes, error } = await dispatch(createRazorpayOrder(amount));
      if (error || !orderRes?.orderId) return toast.error("Order creation failed");

      const options = {
        key: 'rzp_test_mpqsLM52WL3cHu', // Replace with live key on production
        amount,
        currency: 'INR',
        name: 'TechFest Merchandise',
        description: item.name,
        order_id: orderRes.orderId,
        handler: async (response) => {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount,
              regNo,
            };

            const { payload: verifyRes } = await dispatch(verifyRazorpayPayment(verifyPayload));
            if (!verifyRes?.success) return toast.error("Payment verification failed.");

            await dispatch(buyMerch({ regNo, merchId: item.merchId })).unwrap();
            toast.success("🎉 Payment successful and merch bought!");
          } catch (err) {
            console.error(err);
            toast.error("❌ Payment verification failed.");
          }
        },
        prefill: {
          name: user.name || 'Student',
          email: user.email || 'student@example.com',
        },
        theme: {
          color: '#6366f1',
        },
      };

      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => new window.Razorpay(options).open();
        document.body.appendChild(script);
      } else {
        new window.Razorpay(options).open();
      }

    } catch (err) {
      console.error(err);
      toast.error("Unexpected error during purchase.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Official Merchandise
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Show your love for tech events with exclusive premium merchandise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {merchandiseData.map((item) => {
            const isBought = hasAlreadyBought(item.merchId);
            const gradient = getRandomGradient();

            return (
              <Card key={item.merchId} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <button className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {!item.noOfPieces && (
                    <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white text-center py-2 rounded-lg font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-600 font-medium">{item.category}</span>
                  </div>

                  <CardTitle className="text-lg font-bold text-gray-800 leading-tight">
                    {item.name}
                  </CardTitle>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-2xl font-bold text-gray-800">₹{item.price}</span>
                    <button
                      disabled={!item.noOfPieces || isBought}
                      onClick={() => handleBuy(item)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        !item.noOfPieces || isBought
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105'
                      }`}
                    >
                      {isBought ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                      <span>{isBought ? "Already Bought" : "Buy"}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
