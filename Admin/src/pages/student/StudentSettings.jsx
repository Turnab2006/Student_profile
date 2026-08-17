import { useState } from "react";
import {
  Settings,
  Lock,
  Bell,
  Eye,
  Shield,
  Smartphone,
  Save,
  CheckCircle2,
  Mail
} from "lucide-react";

export default function StudentSettings({ hideHeader = false }) {
  const [activeTab, setActiveTab] = useState("general");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [notificationPreferences, setNotificationPreferences] = useState({
    examResults: true,
    notices: true,
    attendanceAlerts: true,
    mentorMessages: true,
    eventReminders: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 font-['Roboto',sans-serif]">
      {!hideHeader && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-['Barlow',sans-serif]">
            Student Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-['Barlow',sans-serif]">
            Manage your account security, notification alerts, and student preferences.
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "general"
              ? "bg-[#E7EFFE] text-[#2384FD]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          General &amp; Preferences
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "security"
              ? "bg-[#E7EFFE] text-[#2384FD]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Security &amp; Password
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "notifications"
              ? "bg-[#E7EFFE] text-[#2384FD]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Notification Preferences
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>Your preferences and settings have been successfully saved!</span>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === "general" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            Account Preferences
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Tuhina Banerjee"
                  disabled
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Registered Email
                </label>
                <input
                  type="email"
                  defaultValue="tuhinabanerjee134@gmail.com"
                  disabled
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  defaultValue="Computer Science & Engineering"
                  disabled
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  College Roll No
                </label>
                <input
                  type="text"
                  defaultValue="CSE2024012"
                  disabled
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Save size={15} />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "security" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            Change Portal Password
          </h3>

          <form onSubmit={handleSave} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new strong password"
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Lock size={15} />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            Notification Alert Preferences
          </h3>

          <div className="space-y-4 max-w-xl">
            {Object.entries({
              examResults: "Publishing of Semester Results & Marksheets",
              notices: "Urgent Campus Notices & Department Circulars",
              attendanceAlerts: "Attendance below 85% Warning Notifications",
              mentorMessages: "Direct Messages from Assigned Faculty Mentor",
              eventReminders: "Hackathons and Campus Activity Reminders",
            }).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
                <input
                  type="checkbox"
                  checked={notificationPreferences[key]}
                  onChange={(e) =>
                    setNotificationPreferences((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-[#2384FD] rounded-sm focus:ring-blue-500 cursor-pointer"
                />
              </label>
            ))}
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#2384FD] hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Save size={15} />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
