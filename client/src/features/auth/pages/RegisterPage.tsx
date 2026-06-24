import { memo } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { motion } from "framer-motion";
import PasswordRequirements from "./PasswordRequirements";
import { useRegister } from "../hooks/useRegister";
import { useWatch } from "react-hook-form";
import { ErrorIcon } from "../../../pages/icons";

const RegisterPage = memo(() => {
  const {
    password,
    showPassword,
    isPasswordFocused,
    allPasswordValid,
    setShowPassword,
    setIsPasswordFocused,
    form,
    onSubmit,
    isPending,
    serverError,
  } = useRegister();

  const { register, control, formState: { errors } } = form;
  const fullName = useWatch({
    control,
    name: "fullName",
    defaultValue: "",
  });
  const email = useWatch({
    control,
    name: "email",
    defaultValue: "",
  });
  const errorMessage =
    serverError ||
    errors.fullName?.message ||
    errors.email?.message ||
    errors.password?.message;

  return (
    <motion.div
      className={`relative max-w-md bg-white py-10 px-15 rounded-lg shadow-lg`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{
        duration: 0.3,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.4 },
      }}
    >
      {errorMessage && (
        <motion.div
          className="relative flex mt-2 mb-4 py-5 px-15 bg-[#FBE6E6] text-xs justify-center items-center rounded-sm shadow-sm drop-shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <ErrorIcon />
          <p>{errorMessage}</p>
        </motion.div>
      )}
      <h2 className="text-center text-xl font-bold mb-4">
        Register
      </h2>
      <form onSubmit={onSubmit}>
        {/* Full Name input */}
        <div className="mt-6 text-left relative">
          <input
            disabled={isPending}
            type="text"
            id="fullname"
            autoComplete="name"
            required
            autoFocus
            minLength={1}
            maxLength={30}
            className={`w-full font-bold p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-[#2C3E50] focus:outline-none ${fullName ? "border-[#2C3E50]" : "border-gray-300"}`}
            placeholder=" "
            {...register("fullName")}
          />
          <label
            className={`absolute text-sm font-medium left-4 text-[#2C3E50] px-1 transition-all duration-300 transform ${fullName ? "bg-white -top-2.5 text-[#2C3E50] text-sm" : "top-4 text-gray-500 text-base"}`}
            htmlFor="fullname"
          >
            Full Name
          </label>
        </div>
        {/* Email input */}
        <div className="mt-4 text-left relative">
          <input
            disabled={isPending}
            type="email"
            id="email"
            autoComplete="email"
            required
            minLength={1}
            maxLength={30}
            className={`w-full font-bold p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-[#2C3E50] focus:outline-none ${email ? "border-[#2C3E50]" : "border-gray-300"}`}
            placeholder=" "
            {...register("email")}
          />
          <label
            className={`absolute text-sm font-medium left-4 text-[#2C3E50] px-1 transition-all duration-300 transform ${email ? "bg-white -top-2.5 text-[#2C3E50] text-sm" : "top-4 text-gray-500 text-base"}`}
            htmlFor="email"
          >
            Email
          </label>
        </div>
        {/* Password input */}
        <div className="mt-4 text-left relative">
          <motion.input
            disabled={isPending}
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            required
            minLength={8}
            maxLength={20}
            className={`w-full font-bold p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-[#2C3E50] focus:outline-none ${password ? "border-[#2C3E50]" : "border-gray-300"}`}
            placeholder=" "
            {...register("password")}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          {/* Toggle password visibility */}
          <button
            type="button"
            className="absolute right-4 top-4.5 border-none bg-transparent cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye
                size={24}
                color={`${password ? "#2C3E50" : "oklch(87.2% 0.01 258.338)"}`}
              />
            ) : (
              <EyeClosed
                size={24}
                color={`${password ? "#2C3E50" : "oklch(87.2% 0.01 258.338)"}`}
              />
            )}
          </button>
          <label
            htmlFor="password"
            className={`absolute text-sm font-medium left-4 text-[#2C3E50] px-1 transition-all duration-300 transform ${password ? "bg-white -top-2.5 text-[#2C3E50] text-sm" : "top-4 text-gray-500 text-base"}`}
          >
            Password
          </label>
          {/* Password requirements */}
          <PasswordRequirements
            password={password}
            isPasswordFocused={isPasswordFocused}
            allPasswordValid={allPasswordValid}
          />
        </div>
        {/* Register button */}
        <motion.button
          type="submit"
          title="Register"
          className={`w-full mt-4 bg-[#2C3E50] text-white p-4 rounded-lg shadow-md drop-shadow-lg ${isPending ? "opacity-50 cursor-not-allowed" : "hover:font-medium hover:border-[#386BF6] hover:bg-[#34495e]"}`}
          disabled={isPending}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          <span>Register</span>
        </motion.button>
      </form>
    </motion.div>
  );
});

export default RegisterPage;
