
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { Lock, Eye, EyeOff, Check } from 'lucide-react';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Password change attempt:', { currentPassword, newPassword });
      setLoading(false);
      toast.success("Password changed successfully!");
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-bold mb-8">Settings</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 rounded-xl">
                <h2 className="font-bold text-lg mb-4">Settings Menu</h2>
                <nav className="flex flex-col space-y-1">
                  <button className="py-2 px-3 rounded-lg bg-primary/10 text-primary font-medium text-left">
                    Password
                  </button>
                  <button className="py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
                    Notifications
                  </button>
                  <button className="py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
                    Privacy
                  </button>
                  <button className="py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
                    Connected Accounts
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 rounded-xl">
                <h2 className="font-bold text-xl mb-6">Change Password</h2>
                
                <form onSubmit={handlePasswordChange}>
                  {/* Current Password */}
                  <div className="mb-4">
                    <label htmlFor="current-password" className="block text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="input-field w-full pl-10 pr-10"
                        placeholder="Enter your current password"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* New Password */}
                  <div className="mb-4">
                    <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field w-full pl-10 pr-10"
                        placeholder="Enter your new password"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Confirm New Password */}
                  <div className="mb-6">
                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field w-full pl-10 pr-10"
                        placeholder="Confirm your new password"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg font-medium text-white flex items-center justify-center transition-all ${
                      loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Update Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
