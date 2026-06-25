import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Settings, Bell, Trash2, Logs } from "lucide-react";
import TasKO from '../assets/tasko.webp';
import LogoutModal from "../features/auth/pages/LogoutModal";
import { useUnreadCount } from "../hooks/useNotifications";
import { useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { data: unreadcount } = useUnreadCount();
  const { data: user } = useMe();
  return (
    <>
      <div className='w-full flex justify-between py-2 px-4 border-b border-gray-200 shadow-sm'>
        <div className='flex w-36 items-center justify-center space-x-4'>
          <img
            loading="lazy"
            src={TasKO}
            alt="TasKO Logo"
            className="block h-auto object-contain"
          />
        </div>
        <div className='flex items-center justify-center space-x-4'>
          <motion.button
            title="Notifications"
            type="button"
            className={`relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=> navigate("/dashboard/notifications")}
          >
            <Bell size={24} />
            <span className="absolute -top-1.5 -right-2 size-5 flex rounded-full items-center justify-center bg-sky-300 text-xs font-medium">
              {unreadcount?.unreadcount || 0}
            </span>
          </motion.button>
          <div className="relative">
            <motion.div
              className="rounded-full border border-gray-200 shadow-sm hover:cursor-pointer overflow-hidden shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=> setOpenMenu(!openMenu)}
            >
              <img
                loading="lazy"
                src={TasKO}
                alt="Student Avatar"
                className="h-10 w-10 object-contain"
              />
            </motion.div>
            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{opacity: 0, y: -10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -10}}
                  transition={{duration: 0.2, ease: "easeInOut"}}
                  className="absolute top-12 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col"
                >
                  <div>
                    <div className='flex flex-col justify-center p-4 border-b-2 border-gray-200'>
                      <h1 className='text-lg font-bold'>{user?.user.name}</h1>
                      <p className='text-sm'>{user?.user.email}</p>
                    </div>
                    <button
                      type="button"
                      className="w-full flex items-center px-6 py-4 space-x-2 hover:bg-gray-100"
                      onClick={() => navigate("/dashboard/trash")}
                    >
                      <Trash2 size={20} />
                      <span>Trash Bin</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center px-6 py-4 space-x-2 hover:bg-gray-100"
                      onClick={() => navigate("/dashboard/activities")}
                    >
                      <Logs size={20} />
                      <span>Activity Logs</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center px-6 py-4 space-x-2 hover:bg-gray-100"
                      onClick={() => setOpenLogoutModal(!openLogoutModal)}
                    >
                      <LogOut className="inline" size={24} />
                      <span>Log out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {openLogoutModal && (
        <div className={"fixed inset-0 bg-black/80 z-50 backdrop-blur-sm flex items-center justify-center"}>
          <LogoutModal isOpen={openLogoutModal} onClose={() => setOpenLogoutModal(!openLogoutModal)} />
        </div>
      )}
    </>
  )
}

export default Header;
