import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function RegisterPage({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [userEmailOtp, setUserEmailOtp] = useState("");
  const [userMobileOtp, setUserMobileOtp] = useState("");

  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isSendingMobileOtp, setIsSendingMobileOtp] = useState(false);
  const [mobileOtpCooldown, setMobileOtpCooldown] = useState(0);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  useEffect(() => {
    let timer;
    if (mobileOtpCooldown > 0) {
      timer = setTimeout(() => setMobileOtpCooldown(mobileOtpCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [mobileOtpCooldown]);

  const sendEmailOtp = async () => {
    if (!name || !email) {
      alert("Please enter your name and email");
      return;
    }

    setIsSendingEmailOtp(true);
    
    try {
      const otp = generateOTP();
      setEmailOtp(otp);

      const templateParams = {
        to_name: name,
        to_email: email,
        otp: otp,
      };

      await emailjs.send(
        "service_6zl4r1u",
        "template_dirse39",
        templateParams,
        "ac-gq1LEr-eIEIIcL"
      );
      
      alert("Email OTP sent successfully!");
    } catch (error) {
      alert("Failed to send email OTP");
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const sendMobileOtp = async () => {
    if (!contact) {
      alert("Please enter your mobile number");
      return;
    }

    setIsSendingMobileOtp(true);
    setMobileOtpCooldown(30);
    
    try {
      const otp = generateOTP();
      setMobileOtp(otp);
      alert(`OTP sent to ${contact}: ${otp}`);
    } catch (error) {
      alert("Failed to send mobile OTP");
    } finally {
      setIsSendingMobileOtp(false);
    }
  };

  const resendMobileOtp = () => {
    if (mobileOtpCooldown > 0) {
      alert(`Please wait ${mobileOtpCooldown} seconds before resending`);
      return;
    }
    sendMobileOtp();
  };

  const verifyEmailOtp = () => {
    if (userEmailOtp === emailOtp) {
      setEmailVerified(true);
      alert("Email verified successfully!");
      sendMobileOtp();
    } else {
      alert("Incorrect OTP");
    }
  };

  const verifyMobileOtp = () => {
    if (userMobileOtp === mobileOtp) {
      setMobileVerified(true);
      alert("Mobile verified successfully!");
    } else {
      alert("Incorrect OTP");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!emailVerified || !mobileVerified) {
      alert("Please verify both email and mobile");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      console.log("Registered:", { name, email, contact, password });
      setIsLoading(false);
      alert("Registration successful!");
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">Create an Account</h2>
          <p className="text-center text-blue-100 mt-1">
            Join us today and unlock amazing features
          </p>
        </div>

        <div className="p-6">
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={emailVerified}
                />
                {!emailVerified && (
                  <button
                    type="button"
                    onClick={sendEmailOtp}
                    disabled={isSendingEmailOtp}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
                  >
                    {isSendingEmailOtp ? "Sending..." : "Get OTP"}
                  </button>
                )}
              </div>
            </div>

            {!emailVerified && emailOtp && (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userEmailOtp}
                    onChange={(e) => setUserEmailOtp(e.target.value)}
                    maxLength="6"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={verifyEmailOtp}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  disabled={mobileVerified}
                />
                {emailVerified && !mobileVerified && (
                  <button
                    type="button"
                    onClick={sendMobileOtp}
                    disabled={isSendingMobileOtp || mobileOtpCooldown > 0}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-70"
                  >
                    {isSendingMobileOtp ? "Sending..." : mobileOtpCooldown > 0 ? `${mobileOtpCooldown}s` : "Get OTP"}
                  </button>
                )}
              </div>
            </div>

            {emailVerified && !mobileVerified && mobileOtp && (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userMobileOtp}
                    onChange={(e) => setUserMobileOtp(e.target.value)}
                    maxLength="6"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={verifyMobileOtp}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Verify
                  </button>
                </div>
                <button
                  type="button"
                  onClick={resendMobileOtp}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Resend OTP
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !emailVerified || !mobileVerified}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition disabled:opacity-70"
            >
              {isLoading ? "Processing..." : "Register Now"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitch}
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}