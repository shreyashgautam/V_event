// pages/auth/Register.jsx
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../stores/auth-slice";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { toast } from "sonner";
import { Loader2, UserPlus, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userName: "",
    regNo: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success(`Welcome to V_Event, ${user.userName}! 🎉`, {
        description: "Your journey starts now.",
        duration: 4000,
        style: {
          background: "#ECFDF5", // emerald-50
          color: "#065F46",      // emerald-900
          border: "1px solid #34D399",
        },
      });

      setFormData({
        userName: "",
        regNo: "",
        email: "",
        password: "",
      });

      setTimeout(() => navigate("/auth/login"), 3000);
    }

    if (error) {
      toast.error("Registration Failed", {
        description: error,
        duration: 4000,
        style: {
          background: "#FEF2F2", // red-50
          color: "#991B1B",       // red-800
          border: "1px solid #F87171",
        },
      });
    }
  }, [isAuthenticated, error, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-24 h-24 bg-emerald-400 rounded-full blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-teal-400 rounded-full blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-cyan-400 rounded-full blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-blob animation-delay-6000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-xl">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Join V_Event
          </h1>
          <p className="text-gray-600 text-sm font-medium">Create your account and start exploring</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Create Your Account</CardTitle>
            <CardDescription className="text-gray-600">
              Join thousands of students in amazing college events
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {["userName", "regNo", "email", "password"].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field} className="text-sm font-semibold text-gray-700">
                    {field === "userName"
                      ? "Full Name"
                      : field === "regNo"
                      ? "Registration Number"
                      : field === "email"
                      ? "Email Address"
                      : "Password"}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    placeholder={`Enter your ${field === "userName" ? "full name" : field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-gray-900"
                  />
                </div>
              ))}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold mt-6 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            {/* Benefits */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 text-center mb-4">What you'll get:</h4>
              {["Access to exclusive events", "Network with students", "Track achievements"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <div className={`w-6 h-6 bg-${["emerald", "teal", "cyan"][i]}-100 rounded-full flex justify-center items-center`}>
                    <Star className={`w-3 h-3 text-${["emerald", "teal", "cyan"][i]}-600`} />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/auth/login" className="font-semibold text-emerald-600 hover:underline">
                  Sign in here
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
}
