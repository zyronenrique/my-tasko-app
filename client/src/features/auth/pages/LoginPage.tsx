import { memo } from "react";
import { Eye, EyeClosed, CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { useWatch } from "react-hook-form";

const LoginPage = memo(() => {
  const {
    form,
    showPassword,
    setShowPassword,
    onSubmit,
    isPending,
    serverError,
  } = useLogin();

  const { register, formState: { errors } } = form;
  const email = useWatch({
    control: form.control,
    name: "email",
  });
  const password = useWatch({
    control: form.control,
    name: "password",
  });
  const errorMessage =
    serverError ||
    errors.email?.message ||
    errors.password?.message;

  return (
    <motion.div
      className={`relative max-w-md flex-1 bg-white py-10 px-15 rounded-lg shadow-lg`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{
        duration: 0.3,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.4 },
      }}
    >
      {/* Error message display */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            className="relative flex mt-5 mb-4 py-5 px-15 bg-[#FBE6E6] text-xs justify-center items-center rounded-sm shadow-sm drop-shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <CircleAlert
              size={20}
              className="absolute top-auto left-6 text-red-600"
            />
            <p className="text-[#D30001]">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <h2 className="text-center text-xl font-bold mb-4">Login</h2>
      <form onSubmit={onSubmit}>
        {/* Email input */}
        <div className="mt-10 mb-4 text-left relative">
          <input
            disabled={isPending}
            type="email"
            id="email"
            autoComplete="email"
            required
            autoFocus
            minLength={1}
            maxLength={30}
            className={`w-full font-bold p-4 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-[#2C3E50] focus:outline-none ${email ? "border-[#2C3E50]" : "border-gray-300"}`}
            placeholder=" "
            {...register("email")}
          />
          <label
            htmlFor="email"
            className={`absolute text-sm font-medium left-4 text-[#2C3E50] px-1 transition-all duration-300 transform ${email ? "bg-white -top-2.5 text-[#2C3E50] text-sm" : "top-4 text-gray-500 text-base"}`}
          >
            Email
          </label>
        </div>
        {/* Password input */}
        <div className="mt-5 mb-4 text-left relative">
          <input
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
        </div>
        <motion.button
          type="submit"
          title="Login"
          disabled={isPending}
          className={`w-full mt-6 bg-[#2C3E50] text-white p-4 rounded-lg shadow-md drop-shadow-lg ${isPending ? "opacity-80 cursor-not-allowed" : "hover:font-medium hover:border-[#386BF6] hover:bg-[#34495e]"}`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          <span>Login</span>
        </motion.button>
      </form>
    </motion.div>
  );
});

export default LoginPage;
