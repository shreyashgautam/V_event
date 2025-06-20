import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Trophy, Star, Gift, X, Sparkles, Crown, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../stores/student/payment-slice';
import { fetchStudentRegistrations, registerForEvent } from '../../stores/student/register-slice';
import { fetchTeamsByLeader } from '../../stores/student/team-slice';

const gradientClasses = [
  'from-purple-500 to-pink-500',
  'from-indigo-500 to-blue-500',
  'from-green-400 to-lime-500',
  'from-yellow-400 to-orange-500',
  'from-red-400 to-pink-500',
  'from-sky-400 to-indigo-500',
  'from-rose-400 to-pink-600',
];

const getRandomGradient = () =>
  gradientClasses[Math.floor(Math.random() * gradientClasses.length)];

const EventDetailsModal = ({ event, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const gradient = getRandomGradient();

  const { user } = useSelector(state => state.auth);
  const { teams } = useSelector(state => state.team);
  const { registeredEvents } = useSelector(state => state.studentRegister);

  const [selectTeamModal, setSelectTeamModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState('');

  useEffect(() => {
    if (user?.regNo) {
      dispatch(fetchStudentRegistrations(user.regNo));
    }
  }, [user?.regNo, dispatch]);

  useEffect(() => {
    const regNo = localStorage.getItem('regNo');
    if (regNo) dispatch(fetchTeamsByLeader(regNo));
  }, [dispatch]);

  useEffect(() => {
    const loadRazorpay = () => {
      if (!document.querySelector('#razorpay-script')) {
        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };
    loadRazorpay();
  }, []);

  const isAlreadyRegistered = !!event?._id && registeredEvents?.some(
    reg => reg.eventId?._id === event._id || reg.eventId === event._id
  );

  const startPayment = async (teamId) => {
    try {
      const amount = Math.round(event.fees * 100); // 🔧 Ensure integer
      const { payload: orderData, error } = await dispatch(createRazorpayOrder(amount));
      if (error || !orderData?.orderId) return toast.error('Order creation failed');

      const options = {
        key: 'rzp_test_mpqsLM52WL3cHu',
        amount: orderData.amount,
        currency: orderData.currency,
        name: event.name,
        description: event.description,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            const paymentPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: orderData.amount,
               regNo: user.regNo,
          
            };

            const { payload: verifyRes } = await dispatch(verifyRazorpayPayment(paymentPayload));
            if (!verifyRes?.success) return toast.error('Payment verification failed');

            const selectedTeam = teams.find((team) => team.teamId === teamId);
            if (!selectedTeam) return toast.error('Selected team not found');

            const registrationPayload = {
              regNo: user.regNo,
              eventId: event._id,
              eventName: event.name,
              eventOrg: event.organisation,
              teamId: selectedTeam.teamId,
              teamName: selectedTeam.teamName,
              teamMembers: selectedTeam.teamMembers,
            };

            const { payload: regRes } = await dispatch(registerForEvent(registrationPayload));
            if (regRes?.success) {
              toast.success('Registration successful!');
              onClose();
            } else {
              toast.error('Payment done, but registration failed.');
            }
          } catch (e) {
            console.error(e);
            toast.error('Verification error occurred.');
          }
        },
        prefill: {
          name: localStorage.getItem('name') || 'Student',
          email: localStorage.getItem('email') || 'student@example.com',
        },
        theme: { color: '#9333ea' },
      };

      if (typeof window.Razorpay === 'undefined') return toast.error('Razorpay not loaded');
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error('Unexpected error occurred');
    }
  };

  const handleRegisterNow = () => {
    const validTeams = teams.filter((team) => team.teamMembers.length === parseInt(event.members));
    if (!validTeams.length) {
      return toast.error(`Create a team with exactly ${event.members} members.`);
    }
    setSelectTeamModal(true);
  };

  const handleTeamSelect = (e) => setSelectedTeamId(e.target.value);

  const handleTeamConfirm = () => {
    if (!selectedTeamId) return toast.error('Please select a team');
    setSelectTeamModal(false);
    startPayment(selectedTeamId);
  };

  if (!isOpen || !event) return null;

  const validTeams = teams.filter(team => team.teamMembers.length === parseInt(event.members));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl relative border border-gray-100">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side - Image */}
          <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 h-64 lg:h-full rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <img
              src={event.image || 'https://via.placeholder.com/600x400'}
              alt="Event Visual"
              className="object-cover w-full h-full mix-blend-overlay"
            />
            {/* Floating Elements */}
            <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold text-sm">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Premium Event
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="p-8 lg:p-10 overflow-y-auto space-y-8 bg-gradient-to-br from-gray-50 to-white">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{event.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard icon={<Calendar />} label="Date & Time" value={new Date(event.date).toLocaleString()} />
              <InfoCard icon={<MapPin />} label="Venue" value={event.venue} />
              <InfoCard icon={<Users />} label="Team Size" value={`${event.members} Members`} />
              <InfoCard icon={<Trophy />} label="Organized By" value={event.organisation} />
              <InfoCard icon={<Star />} label="Rating" value={`${event.rating || '4.5'} ⭐`} />
              <InfoCard icon={<Gift />} label="Registration Fee" value={`₹${event.fees}`} highlight />
            </div>

            {/* Registration Button */}
            <div className="pt-4">
              <button
                disabled={isAlreadyRegistered}
                onClick={handleRegisterNow}
                className={`w-full relative overflow-hidden ${
                  isAlreadyRegistered
                    ? 'bg-gradient-to-r from-green-400 to-green-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]'
                } text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isAlreadyRegistered ? <Check className="w-5 h-5" /> : <Crown className="w-5 h-5" />}
                  {isAlreadyRegistered ? 'Successfully Registered' : 'Register Now'}
                </div>
                {!isAlreadyRegistered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Team Selection Modal */}
        {selectTeamModal && (
          <div className="absolute inset-0 z-50 bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-red-900/95 backdrop-blur-xl flex flex-col justify-center items-center p-6">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-100">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Team</h3>
                <p className="text-gray-600">Choose the perfect team for this competition</p>
              </div>

              {/* Team Selection */}
              <div className="space-y-4 mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Available Teams</label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {validTeams.map((team) => (
                    <div
                      key={team.teamId}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedTeamId === team.teamId
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedTeamId(team.teamId)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedTeamId === team.teamId
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedTeamId === team.teamId && (
                                <Check className="w-2.5 h-2.5 text-white" />
                              )}
                            </div>
                            <h4 className="font-bold text-gray-900">{team.teamName}</h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              ID: {team.teamId}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{team.teamMembers.length} members</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleTeamConfirm}
                  disabled={!selectedTeamId}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    selectedTeamId
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Crown className="w-5 h-5" />
                    Proceed to Payment
                  </div>
                </button>
                <button
                  onClick={() => setSelectTeamModal(false)}
                  className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, highlight }) => (
  <div className={`p-4 rounded-2xl transition-all duration-300 hover:shadow-md ${
    highlight 
      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200' 
      : 'bg-white border border-gray-100 hover:border-gray-200'
  }`}>
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        highlight 
          ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-500 text-sm mb-1">{label}</p>
        <p className={`font-bold ${highlight ? 'text-orange-700 text-xl' : 'text-gray-900 text-lg'}`}>
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default EventDetailsModal;