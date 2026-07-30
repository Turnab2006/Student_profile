import { ChevronDown } from "lucide-react";

export default function AdminProfile({ name = "Admin User", role = "Super admin", avatar = "A" }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-right leading-tight">
        <p className="text-sm font-semibold text-gray-700">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden text-sm font-semibold text-gray-600">
        <span className="text-xs font-bold">{avatar}</span>
      </div>
      <ChevronDown size={14} className="text-gray-400" />
    </div>
  );
}