import { ArrowLeft } from "lucide-react";

export default function StudentProfile({ onBack }) {
  console.log("StudentProfile rendering");
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-blue-100 overflow-auto z-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b-2 border-blue-300 shadow-lg">
        <div className="flex items-center gap-4 px-8 py-6">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
            type="button"
          >
            <ArrowLeft size={24} className="text-blue-600 font-bold" />
          </button>
          <h1 className="text-3xl font-bold text-blue-800">Student Profile</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 border-4 border-blue-300">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">✓ Profile Page Active</h2>
            <p className="text-xl text-gray-700 mb-2">The student profile page is now rendering correctly.</p>
            <p className="text-lg text-gray-600">If you see this message, the navigation is working!</p>
            <button
              onClick={onBack}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
