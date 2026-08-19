import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Mail,
  PhoneCall,
  Eye,
  MessageSquare,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  List,
  LayoutGrid,
  Building2,
  X,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Filter,
  User,
  Send,
  Award,
  Target,
  Camera,
  Globe,
  Heart,
  MapPin,
  Home,
  Droplet,
  Calendar,
  Users,
  Briefcase,
  Star,
  Shield,
  Check,
  BookOpen,
  BookAudio,
  Flag,
  CreditCard,
  Code,
  Lightbulb,
  Clock,
  RefreshCw,
  Brain,
  FileText
} from 'lucide-react';

function CalendarWrittenIcon({ size = 20, className = "text-[#7656f4]" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2.2" />
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2.2" />
      <line x1="3" y1="9.5" x2="21" y2="9.5" strokeWidth="1.8" />
      <rect x="6.5" y="12" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="11" y="12" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="15.5" y="12" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="6.5" y="16" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="11" y="16" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="15.5" y="16" width="2" height="2" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function OpenVolumeBookIcon({ size = 22, className = "text-[#7656f4] mt-0.5 flex-shrink-0" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      <line x1="5" y1="7" x2="8" y2="7" strokeWidth="1.8" />
      <line x1="5" y1="10" x2="9" y2="10" strokeWidth="1.8" />
      <line x1="15" y1="7" x2="19" y2="7" strokeWidth="1.8" />
      <line x1="15" y1="10" x2="19" y2="10" strokeWidth="1.8" />
    </svg>
  );
}

function ClassRollBadgeIcon({ size = 22, className = "text-[#7656f4] mt-0.5 flex-shrink-0" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <circle cx="8" cy="10" r="2" />
      <path d="M5 16c0-1.8 1.3-2.5 3-2.5s3 .7 3 2.5" />
      <line x1="13" y1="9" x2="19" y2="9" strokeWidth="2" />
      <line x1="13" y1="12.5" x2="18" y2="12.5" strokeWidth="2" />
      <line x1="13" y1="16" x2="16.5" y2="16" strokeWidth="2" />
    </svg>
  );
}

function UnivRollBadgeIcon({ size = 22, className = "text-[#7656f4] mt-0.5 flex-shrink-0" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M4 10.5h5.5M6.75 7v7M4 13.5h5.5" strokeWidth="1.5" />
      <line x1="12.5" y1="9" x2="19" y2="9" strokeWidth="2" />
      <line x1="12.5" y1="12.5" x2="18" y2="12.5" strokeWidth="2" />
      <line x1="12.5" y1="16" x2="16.5" y2="16" strokeWidth="2" />
    </svg>
  );
}

function TotalRolesBadgeIcon({ size = 20, className = "text-[#7656f4]" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M7 8.5h3.5" strokeWidth="2" />
      <path d="M7 12h2.5" strokeWidth="2" />
      <path d="M7 15.5h4" strokeWidth="2" />
      <path d="M14 9.5l1.5 1.5 3.5-3.5" strokeWidth="2" />
    </svg>
  );
}

function KeyStrengthsRibbonIcon({ size = 22, className = "text-[#7656f4]" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="9" r="6" />
      <circle cx="12" cy="9" r="2" />
      <path d="M8.5 14.5L6 21l6-2.5 6 2.5-2.5-6.5" />
    </svg>
  );
}

function WhiteFilledPurpleBorderCameraIcon({ size = 21 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path
        d="M23 19A2 2 0 0 1 21 21H3A2 2 0 0 1 1 19V8A2 2 0 0 1 3 6H7L9 3H15L17 6H21A2 2 0 0 1 23 8V19Z"
        fill="white"
        stroke="#7656f4"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.5" r="4" stroke="#7656f4" strokeWidth="1.8" fill="#7656f4" />
      <circle cx="13.2" cy="12.3" r="1.2" fill="white" />
    </svg>
  );
}

function MenteeHexagonBadge() {
  return (
    <div className="relative w-52 h-38 sm:w-64 sm:h-44 rounded-[36px] bg-gradient-to-br from-[#f6f1ff] via-[#ebdfff] to-[#e0ceff] flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#dfcefe] shadow-2xs">
      {/* Decorative ambient background glows */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#7656f4]/25 blur-xl pointer-events-none" />
      <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-white/75 blur-lg pointer-events-none" />

      {/* Floating dot particles surrounding the hexagon badge */}
      <div className="absolute inset-0 pointer-events-none opacity-65">
        <div className="absolute top-4 left-6 w-2 h-2 rounded-full bg-[#7656f4]" />
        <div className="absolute top-10 left-11 w-1.5 h-1.5 rounded-full bg-[#9b7bf7]" />
        <div className="absolute bottom-6 left-7 w-2.5 h-2.5 rounded-full bg-[#7656f4]/40" />
        <div className="absolute top-7 right-10 w-2 h-2 rounded-full bg-[#7656f4]/60" />
        <div className="absolute bottom-8 right-7 w-1.5 h-1.5 rounded-full bg-[#7656f4]" />
        <div className="absolute bottom-5 left-20 w-2 h-2 rounded-full bg-[#9b7bf7]" />
        <div className="absolute top-4 left-24 w-1.5 h-1.5 rounded-full bg-[#7656f4]" />
      </div>

      {/* 3D Purple Rounded Hexagon Badge */}
      <div className="relative flex items-center justify-center z-10">
        <svg width="104" height="114" viewBox="0 0 100 110" fill="none" className="drop-shadow-xl">
          {/* Hexagon Path with Smooth Rounded Vertex Corners */}
          <path
            d="M44.5 3.8a11 11 0 0 1 11 0l35.8 20.7a11 11 0 0 1 5.5 9.5v41.4a11 11 0 0 1-5.5 9.5L55.5 105.6a11 11 0 0 1-11 0L8.7 84.9a11 11 0 0 1-5.5-9.5V34a11 11 0 0 1 5.5-9.5L44.5 3.8z"
            fill="url(#hexGradientMenteeFigma)"
          />
          <defs>
            <linearGradient id="hexGradientMenteeFigma" x1="0" y1="0" x2="100" y2="110" gradientUnits="userSpaceOnUse">
              <stop stopColor="#936efa" />
              <stop offset="1" stopColor="#5b37ea" />
            </linearGradient>
          </defs>
          {/* Person Icon Head */}
          <circle cx="50" cy="39" r="14.5" fill="white" />
          {/* Person Icon Torso / Shoulders */}
          <path
            d="M23 80.5C23 67 35 56.5 50 56.5C65 56.5 77 67 77 80.5C77 82.4 75.4 84 73.5 84H26.5C24.6 84 23 82.4 23 80.5Z"
            fill="white"
          />
        </svg>

        {/* Checkmark Badge on Bottom Right */}
        <div className="absolute -bottom-2 -right-2.5 w-9.5 h-9.5 rounded-full bg-[#5b37ea] border-2 border-white flex items-center justify-center text-white shadow-lg">
          <Check size={19} strokeWidth={3.5} />
        </div>
      </div>
    </div>
  );
}

function JsLogoIcon({ size = 29 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="flex-shrink-0 rounded-[5px] shadow-2xs">
      <rect width="24" height="24" rx="4" fill="#f7df1e" />
      <path d="M12.5 17.5c.8 0 1.5-.4 1.5-1.2v-5h1.8v5.1c0 2.2-1.4 3.1-3.3 3.1-1.6 0-2.8-.7-3.3-1.8l1.4-.9c.3.7.9 1.1 1.9 1.1zM18.8 17.6c.9 0 1.7-.5 1.7-1.3 0-.9-.7-1.2-1.7-1.6l-.6-.2c-1.4-.6-2.3-1.3-2.3-2.8 0-1.7 1.4-2.8 3.3-2.8 1.4 0 2.5.5 3 1.6l-1.4.9c-.3-.6-.8-.9-1.6-.9-.8 0-1.4.4-1.4 1 0 .7.5 1 1.5 1.4l.6.2c1.7.7 2.5 1.4 2.5 2.9 0 1.9-1.5 3-3.6 3-2 0-3.1-.9-3.7-2l1.4-.9c.4.8 1.2 1.5 2.3 1.5z" fill="#000" />
    </svg>
  );
}

function ReactLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#61dafb]/15 flex items-center justify-center flex-shrink-0">
      <svg width={size - 7} height={size - 7} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="10" fill="#00d8ff" />
        <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00d8ff" strokeWidth="7" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00d8ff" strokeWidth="7" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00d8ff" strokeWidth="7" transform="rotate(120 50 50)" />
      </svg>
    </div>
  );
}

function NodeLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#539e43]/15 flex items-center justify-center flex-shrink-0">
      <svg width={size - 7} height={size - 7} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2z" fill="#539e43" />
        <path d="M12 4.5l7.5 4.3v6.4L12 19.5l-7.5-4.3V8.8L12 4.5z" fill="#fff" opacity="0.25" />
        <path d="M11.5 15.5v-4.8l-3.2 1.8v2.2l-1.5-.9v-3.7l1.5-.9 4.7 2.7v3.6l-1.5.9z" fill="#fff" />
      </svg>
    </div>
  );
}

function MongoLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#13aa52]/15 flex items-center justify-center flex-shrink-0">
      <svg width={size - 9} height={size - 7} viewBox="0 0 24 24" fill="#13aa52">
        <path d="M12 1.5C12 1.5 5.5 6.8 5.5 13.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5C18.5 6.8 12 1.5 12 1.5zm.7 17.5V13c0-.4-.3-.7-.7-.7s-.7.3-.7.7v6c-2.8-.4-5-2.8-5-5.7 0-4.8 4.7-9.3 5.7-10.2 1 1 5.7 5.4 5.7 10.2 0 2.9-2.2 5.3-5 5.7z" />
      </svg>
    </div>
  );
}

function HtmlLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#e34f26]/15 flex items-center justify-center flex-shrink-0">
      <svg width={size - 7} height={size - 7} viewBox="0 0 24 24" fill="none">
        <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" fill="#e34f26" />
        <path d="M12 3.8v16.4l5.9-1.5L19.2 3.8H12z" fill="#ef652a" />
        <path d="M7.3 7h9.4l-.2 2.5H9.7l.3 3.5h6.4l-.6 6.3-3.8 1-3.8-1-.3-3h2.3l.1 1.4 1.7.5 1.7-.5.2-2H7.6L7.3 7z" fill="#fff" />
      </svg>
    </div>
  );
}

function CssLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#1572b6]/15 flex items-center justify-center flex-shrink-0">
      <svg width={size - 7} height={size - 7} viewBox="0 0 24 24" fill="none">
        <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" fill="#1572b6" />
        <path d="M12 3.8v16.4l5.9-1.5L19.2 3.8H12z" fill="#33a9dc" />
        <path d="M7.3 7h9.4l-.3 3.5H9.7l.3 3.5h6.4l-.6 6.3-3.8 1-3.8-1-.3-3h2.3l.1 1.4 1.7.5 1.7-.5.2-2.5H7.5L7.3 7z" fill="#fff" />
      </svg>
    </div>
  );
}

function ExpressLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-800 font-extrabold text-[12px] flex items-center justify-center flex-shrink-0 tracking-tight">
      ex
    </div>
  );
}

function SqlLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#7656f4]/15 text-[#7656f4] flex items-center justify-center flex-shrink-0">
      <svg width={size - 9} height={size - 9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    </div>
  );
}

function TsLogoIcon({ size = 29 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="flex-shrink-0 rounded-[5px] shadow-2xs">
      <rect width="24" height="24" rx="4" fill="#3178c6" />
      <path d="M11.5 10.5h-3v-1.8h8v1.8h-3v7.5h-2v-7.5zM15 14.8c.8.6 1.8 1.1 2.8 1.1 1 0 1.5-.4 1.5-.9 0-.6-.5-.9-1.7-1.4l-.7-.3c-1.5-.6-2.4-1.4-2.4-2.8 0-1.8 1.4-3.1 3.7-3.1 1.3 0 2.4.4 3.1.9l-.8 1.5c-.6-.4-1.5-.7-2.3-.7-1 0-1.5.4-1.5.9 0 .5.4.8 1.6 1.3l.7.3c1.6.6 2.5 1.4 2.5 2.9 0 1.9-1.5 3.1-3.9 3.1-1.5 0-2.7-.5-3.5-1.1l.9-1.7z" fill="#fff" />
    </svg>
  );
}

function TailwindLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#0284c7] flex items-center justify-center flex-shrink-0">
      <svg width={size - 9} height={size - 9} viewBox="0 0 24 24" fill="#06b6d4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 19.201 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C17.536 6.182 16.175 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 13.201 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C11.536 13.382 10.175 12 6.001 12z"/>
      </svg>
    </div>
  );
}

function GitLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
      <svg width={size - 11} height={size - 11} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    </div>
  );
}

function RestApiLogoIcon({ size = 29 }) {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#7656f4]/15 text-[#7656f4] flex items-center justify-center flex-shrink-0">
      <svg width={size - 9} height={size - 9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        <path d="m11 13-2 2 2 2" />
        <path d="m15 13 2 2-2 2" />
      </svg>
    </div>
  );
}

function TwoBuildingsIcon({ size = 24, className = "text-slate-600" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21h18" />
      <path d="M5 21V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14" />
      <path d="M11 21V10a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v11" />
      <path d="M7 10h.01" />
      <path d="M7 13h.01" />
      <path d="M7 16h.01" />
      <path d="M14 13h.01" />
      <path d="M14 16h.01" />
      <path d="M17 13h.01" />
      <path d="M17 16h.01" />
    </svg>
  );
}

function ActionEyeIcon({ size = 18, className = "text-[#7656f4]" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ActionMessageIcon({ size = 18, className = "text-[#7656f4]" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="8" y1="8" x2="16" y2="8" strokeWidth="2" />
      <line x1="8" y1="12" x2="13" y2="12" strokeWidth="2" />
    </svg>
  );
}

function ViewMenteeDetail({ mentee, onClose, onSendMessage }) {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'academic' | 'parents' | 'experience' | 'skills'

  return (
    <div className="flex flex-col gap-2.5 pb-12 w-full text-slate-800 font-sans animate-fade-in p-2 sm:px-5 sm:py-2.5">
      {/* TOP HEADER BAR */}
      <div className="flex items-center justify-between px-1 py-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f3ecfe] text-[#7656f4] flex items-center justify-center font-bold">
            <User size={24} className="fill-[#7656f4] text-[#7656f4]" />
          </div>
          <div>
            <h1 className="text-[22px] font-semibold text-[#1e1548]">View Mentee</h1>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
          title="Close View"
        >
          <X size={24} />
        </button>
      </div>

      {/* MAIN CONTAINER FOR TABS AND HERO BANNER */}
      <div className="bg-white rounded-3xl border border-slate-100/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-6">
        {/* NAVIGATION TABS BAR */}
        <div className="bg-[#fbfafd] border border-slate-200/60 rounded-2xl p-1.5 flex items-center justify-center gap-1 overflow-x-auto max-w-full mx-auto shadow-2xs">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'personal'
                ? 'bg-[#f0eaff] text-[#7656f4] shadow-2xs border-b-2 border-[#7656f4]'
                : 'text-[#524d6e] hover:text-[#1e1548] hover:bg-slate-50'
            }`}
          >
            <User size={22} className={activeTab === 'personal' ? 'fill-[#7656f4] text-[#7656f4]' : 'fill-[#625c7e] text-[#625c7e]'} />
            <span>Personal Details</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200/90 mx-1 flex-shrink-0" />

          <button
            onClick={() => setActiveTab('academic')}
            className={`px-4 py-2 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'academic'
                ? 'bg-[#f0eaff] text-[#7656f4] shadow-2xs border-b-2 border-[#7656f4]'
                : 'text-[#524d6e] hover:text-[#1e1548] hover:bg-slate-50'
            }`}
          >
            <GraduationCap size={22} className={activeTab === 'academic' ? 'text-[#7656f4]' : 'text-[#625c7e]'} />
            <span>Academic Details</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200/90 mx-1 flex-shrink-0" />

          <button
            onClick={() => setActiveTab('parents')}
            className={`px-4 py-2 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'parents'
                ? 'bg-[#f0eaff] text-[#7656f4] shadow-2xs border-b-2 border-[#7656f4]'
                : 'text-[#524d6e] hover:text-[#1e1548] hover:bg-slate-50'
            }`}
          >
            <Users size={22} className={activeTab === 'parents' ? 'text-[#7656f4]' : 'text-[#625c7e]'} />
            <span>Parents Details</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200/90 mx-1 flex-shrink-0" />

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'experience'
                ? 'bg-[#f0eaff] text-[#7656f4] shadow-2xs border-b-2 border-[#7656f4]'
                : 'text-[#524d6e] hover:text-[#1e1548] hover:bg-slate-50'
            }`}
          >
            <Briefcase size={22} className={activeTab === 'experience' ? 'text-[#7656f4]' : 'text-[#625c7e]'} />
            <span>Experience</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200/90 mx-1 flex-shrink-0" />

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'skills'
                ? 'bg-[#f0eaff] text-[#7656f4] shadow-2xs border-b-2 border-[#7656f4]'
                : 'text-[#524d6e] hover:text-[#1e1548] hover:bg-slate-50'
            }`}
          >
            <Star size={22} className={activeTab === 'skills' ? 'text-[#7656f4]' : 'text-[#625c7e]'} />
            <span>Skills</span>
          </button>
        </div>

        {/* TAB CONTENT AREAS */}
        {activeTab === 'personal' && (
          <div className="flex flex-col gap-6">
            {/* MENTEE PROFILE CARD (HERO BANNER) */}
            <div className="bg-gradient-to-r from-[#fbfafd] via-[#f7f3fe] to-[#f2eafe] rounded-3xl border border-[#e8ddfd] py-[17.5px] px-5 sm:py-[21.5px] sm:px-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left z-10">
                {/* Profile Avatar with Camera Button */}
                <div className="relative flex-shrink-0">
                  <img
                    src={mentee.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
                    alt={mentee.name || "Mentee"}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md object-cover"
                  />
                  <button
                    className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[#7656f4] hover:bg-[#6242e2] text-white flex items-center justify-center border-2 border-white shadow-md transition-transform hover:scale-105 cursor-pointer"
                    title="Update Profile Photo"
                  >
                    <WhiteFilledPurpleBorderCameraIcon size={21} />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <h2 className="text-[22px] sm:text-[24px] font-bold text-[#7656f4]">
                    {mentee.name || "Tanuka Saha"}
                  </h2>
                  
                  <div className="flex items-center justify-center sm:justify-start">
                    <span className="text-[15.5px] font-bold text-[#7656f4]">
                      Mentee ID: {mentee.id || "MNT23051068"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-[15px] text-slate-500 font-medium pt-2">
                    <div className="flex items-center gap-2">
                      <PhoneCall size={17} className="text-[#7656f4]" />
                      <span>{mentee.phone || "+91 9123456789"}</span>
                    </div>

                    <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <Mail size={17} className="text-[#7656f4]" />
                      <span>{mentee.email || "tanuka@gmail.com"}</span>
                    </div>

                    <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <GraduationCap size={17} className="text-[#7656f4]" />
                      <span>{mentee.collegeEmail || "uiet2021cs19@uie.ac.in"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hexagon Graphic Badge */}
              <MenteeHexagonBadge />
            </div>

            {/* PERSONAL INFORMATION CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2.5 mb-5 pb-2.5 border-b border-slate-100">
                <div className="w-9 h-9 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                  <User size={19} className="fill-[#7656f4] text-[#7656f4]" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1e1548]">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Column 1 */}
                <div className="space-y-3.5 md:border-r md:border-slate-100 md:pr-5">
                  <div className="flex items-start gap-2.5">
                    <CalendarWrittenIcon size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[12.5px] font-semibold text-slate-400 block">Date of Birth</span>
                      <p className="text-[14px] font-medium text-slate-800">10-08-2004</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <User size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[12.5px] font-semibold text-slate-400 block">Gender</span>
                      <p className="text-[14px] font-medium text-slate-800">Female</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Droplet size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[12.5px] font-semibold text-slate-400 block">Blood Group</span>
                      <p className="text-[14px] font-medium text-slate-800">A+</p>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-3.5 md:border-r md:border-slate-100 md:pr-5">
                  <div className="flex items-start gap-2.5">
                    <Globe size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[12.5px] font-semibold text-slate-400 block">Country</span>
                      <p className="text-[14px] font-medium text-slate-800">India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Heart size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[12.5px] font-semibold text-slate-400 block">State</span>
                      <p className="text-[14px] font-medium text-slate-800">West Bengal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <TwoBuildingsIcon size={26} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[12.5px] font-semibold text-slate-400 block">City</span>
                      <p className="text-[14px] font-medium text-slate-800">Kolkata</p>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[12.5px] font-semibold text-slate-400 block">Zip Code</span>
                      <p className="text-[14px] font-medium text-slate-800">700096</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Home size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-[12.5px] font-semibold text-slate-400 block">Address</span>
                      <p className="text-[14px] font-medium text-slate-800 leading-snug">
                        Flat 3B, Sunrise Apartments, Sector V,<br />
                        Salt Lake, Kolkata, West Bengal, India - 700096
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT DETAILS CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2.5 mb-5 pb-2.5 border-b border-slate-100">
                <div className="w-9 h-9 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                  <PhoneCall size={19} />
                </div>
                <h3 className="text-[16px] font-bold text-[#1e1548]">Contact Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex items-start gap-2.5 md:border-r md:border-slate-100 md:pr-5">
                  <PhoneCall size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Contact Number</span>
                    <p className="text-[14px] font-medium text-slate-800">+91 9123456789</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 md:border-r md:border-slate-100 md:pr-5">
                  <Mail size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">College Email ID</span>
                    <p className="text-[14px] font-medium text-slate-800">uiet2021cs19@uie.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Personal Email ID</span>
                    <p className="text-[14px] font-medium text-slate-800">tanuka@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {activeTab === 'academic' && (
        <div className="flex flex-col gap-6">
          {/* ACADEMIC DETAILS CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-5 pb-2.5 border-b border-slate-100">
              <div className="w-9 h-9 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold">
                <GraduationCap size={19} />
              </div>
              <h3 className="text-[16px] font-bold text-[#1e1548]">Academic Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="space-y-4 md:border-r md:border-slate-100 md:pr-6">
                <div className="flex items-start gap-3">
                  <CalendarWrittenIcon size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Session</span>
                    <p className="text-[14px] font-bold text-slate-800">2024-2028</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <OpenVolumeBookIcon size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Program</span>
                    <p className="text-[14px] font-bold text-slate-800">B. Tech</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TwoBuildingsIcon size={26} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Department</span>
                    <p className="text-[14px] font-bold text-slate-800 leading-snug">{mentee.department}</p>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4 md:border-r md:border-slate-100 md:pr-6">
                <div className="flex items-start gap-3">
                  <User size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Admission Year</span>
                    <p className="text-[14px] font-bold text-slate-800">2024</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Flag size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Passing Year</span>
                    <p className="text-[14px] font-bold text-slate-800">2028</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarWrittenIcon size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Current Year &amp; Semester</span>
                    <p className="text-[14px] font-bold text-slate-800">1st Year, 1st Semester</p>
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ClassRollBadgeIcon size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Class Roll No.</span>
                    <p className="text-[14px] font-bold text-slate-800">{mentee.rollNo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClassRollBadgeIcon size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">University Roll No.</span>
                    <p className="text-[14px] font-bold text-slate-800">11700124550</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award size={22} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[12.5px] font-semibold text-slate-400 block">Registration No.</span>
                    <p className="text-[14px] font-bold text-slate-800">11700236545</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACADEMIC RECORDS SECTION */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-bold text-[#1e1548]">Academic Records</h3>

            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8f5fe] border-b border-slate-200/60">
                      <th className="py-3 px-5 text-[13.5px] font-semibold text-[#7656f4] tracking-wider uppercase border-r border-slate-200/50">EXAMINATION</th>
                      <th className="py-3 px-5 text-[13.5px] font-semibold text-[#7656f4] tracking-wider uppercase border-r border-slate-200/50">BOARD / UNIVERSITY</th>
                      <th className="py-3 px-5 text-[13.5px] font-semibold text-[#7656f4] tracking-wider uppercase text-center border-r border-slate-200/50">YEAR</th>
                      <th className="py-3 px-5 text-[13.5px] font-semibold text-[#7656f4] tracking-wider uppercase text-right">PERCENTAGE / CGPA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13.5px] font-medium text-slate-700">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-slate-800 border-r border-slate-100">10th (Secondary)</td>
                      <td className="py-3.5 px-5 text-slate-600 border-r border-slate-100">West Bengal Board of Secondary Education</td>
                      <td className="py-3.5 px-5 text-center font-medium text-slate-600 border-r border-slate-100">2020</td>
                      <td className="py-3.5 px-5 text-right font-bold text-slate-800">89.60%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-slate-800 border-r border-slate-100">12th (Higher Secondary)</td>
                      <td className="py-3.5 px-5 text-slate-600 border-r border-slate-100">West Bengal Council of Higher Secondary Education</td>
                      <td className="py-3.5 px-5 text-center font-medium text-slate-600 border-r border-slate-100">2022</td>
                      <td className="py-3.5 px-5 text-right font-bold text-slate-800">91.20%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-slate-800 border-r border-slate-100">B. Tech 1st Semester</td>
                      <td className="py-3.5 px-5 text-slate-600 border-r border-slate-100">Maulana Abul Kalam Azad University of Technology</td>
                      <td className="py-3.5 px-5 text-center font-medium text-slate-600 border-r border-slate-100">2024</td>
                      <td className="py-3.5 px-5 text-right font-bold text-slate-800">8.45 CGPA</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-slate-800 border-r border-slate-100">B. Tech 2nd Semester</td>
                      <td className="py-3.5 px-5 text-slate-600 border-r border-slate-100">Maulana Abul Kalam Azad University of Technology</td>
                      <td className="py-3.5 px-5 text-center font-medium text-slate-600 border-r border-slate-100">2024</td>
                      <td className="py-3.5 px-5 text-right font-bold text-slate-800">8.78 CGPA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'parents' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col gap-6">
          {/* MAIN HEADER */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              <Users size={22} className="text-[#7656f4]" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#1e1548]">Parents' Details</h3>
              <p className="text-[12.5px] font-medium text-slate-400 mt-0.5">
                Information about the mentee's parents.
              </p>
            </div>
          </div>

          {/* FATHER'S DETAILS CARD */}
          <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-4 sm:p-5 flex flex-col gap-4">
            <div className="bg-[#f2ebfe]/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#7656f4] text-white flex items-center justify-center font-bold">
                <User size={15} className="fill-white text-white" />
              </div>
              <h4 className="text-[14.5px] font-bold text-[#1e1548]">Father's Details</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
              <div className="flex items-start gap-2.5">
                <User size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Name</span>
                  <p className="text-[14px] font-bold text-slate-800">Ayan Saha</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <PhoneCall size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Contact Number</span>
                  <p className="text-[14px] font-bold text-slate-800">+91 7823678236</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Email ID</span>
                  <p className="text-[14px] font-bold text-slate-800">ayansaha12@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Occupation</span>
                  <p className="text-[14px] font-bold text-slate-800">Doctor</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/50">
              <MapPin size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[12px] font-semibold text-slate-400 block">Address</span>
                <p className="text-[13.5px] font-medium text-slate-800 leading-snug">
                  Flat 3B, Sunrise Apartments, Sector V,<br />
                  Salt Lake, Kolkata, West Bengal, India - 700026
                </p>
              </div>
            </div>
          </div>

          {/* MOTHER'S DETAILS CARD */}
          <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-4 sm:p-5 flex flex-col gap-4">
            <div className="bg-[#f2ebfe]/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#7656f4] text-white flex items-center justify-center font-bold">
                <User size={15} className="fill-white text-white" />
              </div>
              <h4 className="text-[14.5px] font-bold text-[#1e1548]">Mother's Details</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
              <div className="flex items-start gap-2.5">
                <User size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Name</span>
                  <p className="text-[14px] font-bold text-slate-800">Keya Saha</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <PhoneCall size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Contact Number</span>
                  <p className="text-[14px] font-bold text-slate-800">+91 7823678236</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Email ID</span>
                  <p className="text-[14px] font-bold text-slate-800">keyasaha12@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Occupation</span>
                  <p className="text-[14px] font-bold text-slate-800">Housewife</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/50">
              <MapPin size={20} className="text-[#7656f4] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[12px] font-semibold text-slate-400 block">Address</span>
                <p className="text-[13.5px] font-medium text-slate-800 leading-snug">
                  Flat 3B, Sunrise Apartments, Sector V,<br />
                  Salt Lake, Kolkata, West Bengal, India - 700026
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col gap-6">
          {/* MAIN HEADER */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              <Briefcase size={22} className="text-[#7656f4]" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#1e1548]">Experience Details</h3>
              <p className="text-[12.5px] font-medium text-slate-400 mt-0.5">
                Information about the mentee's work experience.
              </p>
            </div>
          </div>

          {/* TOP SUMMARY STAT CARDS WRAPPER IN LIGHT PURPLE */}
          <div className="bg-[#f6efff] rounded-2xl border border-[#e8dffd] p-4 sm:p-4.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-[#ede5fe]/90 p-4 flex items-center gap-3.5 shadow-2xs">
                <div className="w-11 h-11 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <CalendarWrittenIcon size={20} className="text-[#7656f4]" />
                </div>
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Total Experience</span>
                  <p className="text-[15px] font-bold text-slate-900 mt-0.5">2 Years 4 Months</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#ede5fe]/90 p-4 flex items-center gap-3.5 shadow-2xs">
                <div className="w-11 h-11 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <TwoBuildingsIcon size={25} className="text-[#7656f4]" />
                </div>
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Total Organizations</span>
                  <p className="text-[15px] font-bold text-slate-900 mt-0.5">2</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#ede5fe]/90 p-4 flex items-center gap-3.5 shadow-2xs">
                <div className="w-11 h-11 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <TotalRolesBadgeIcon size={20} className="text-[#7656f4]" />
                </div>
                <div>
                  <span className="text-[12px] font-semibold text-slate-400 block">Total Roles</span>
                  <p className="text-[15px] font-bold text-slate-900 mt-0.5">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* WORK EXPERIENCE TIMELINE SECTION */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-bold text-[#1e1548]">Work Experience</h3>

            <div className="bg-white rounded-2xl border border-slate-200/70 p-5 sm:p-6 shadow-2xs">
              <div className="relative flex flex-col gap-6 pl-5">
                {/* Timeline Item 1 */}
                <div className="relative flex items-start gap-4 pb-6 border-b border-slate-100">
                  {/* Dot 1: Thin white outer circle + inner purple dot */}
                  <div className="absolute -left-[25px] top-[12px] w-4 h-4 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10 shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-[#7656f4]" />
                  </div>

                  {/* Light gray vertical line touching Dot 1 and Dot 2 */}
                  <div className="absolute -left-[18px] top-[26px] -bottom-[38px] w-[1.5px] bg-slate-300" />

                  <div className="w-10 h-10 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    <TwoBuildingsIcon size={24} className="text-[#7656f4]" />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-[16px] font-bold text-[#1e1548]">Software Developer</h4>
                      <span className="px-3 py-1 bg-[#f8f5fe] text-[#7656f4] border border-[#e8dffd] rounded-lg text-[12px] font-semibold w-fit">
                        1 Year 5 Months
                      </span>
                    </div>

                    <p className="text-[13.5px] font-bold text-[#7656f4]">TechNova Solutions Pvt. Ltd.</p>

                    <div className="flex flex-wrap items-center gap-3 text-[12.5px] font-semibold text-slate-400 py-1">
                      <div className="flex items-center gap-1.5">
                        <CalendarWrittenIcon size={15} className="text-[#7656f4]" />
                        <span>Jan 2023 - Present</span>
                      </div>
                      <span className="text-slate-300">|</span>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={15} className="text-[#7656f4]" />
                        <span>Kolkata, West Bengal</span>
                      </div>
                    </div>

                    <p className="text-[13px] text-slate-600 leading-relaxed pt-1">
                      Developed and maintained web applications using React.js, Node.js and MongoDB.<br />
                      Collaborated with cross-functional teams to deliver high-quality software solutions.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative flex items-start gap-4">
                  {/* Dot 2: Thin white outer circle + inner purple dot */}
                  <div className="absolute -left-[25px] top-[12px] w-4 h-4 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10 shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-[#7656f4]" />
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    <TwoBuildingsIcon size={24} className="text-[#7656f4]" />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-[16px] font-bold text-[#1e1548]">Junior Software Developer</h4>
                      <span className="px-3 py-1 bg-[#f8f5fe] text-[#7656f4] border border-[#e8dffd] rounded-lg text-[12px] font-semibold w-fit">
                        5 Months
                      </span>
                    </div>

                    <p className="text-[13.5px] font-bold text-[#7656f4]">CodeVerse Technologies</p>

                    <div className="flex flex-wrap items-center gap-3 text-[12.5px] font-semibold text-slate-400 py-1">
                      <div className="flex items-center gap-1.5">
                        <CalendarWrittenIcon size={15} className="text-[#7656f4]" />
                        <span>Aug 2022 - Dec 2022</span>
                      </div>
                      <span className="text-slate-300">|</span>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={15} className="text-[#7656f4]" />
                        <span>Kolkata, West Bengal</span>
                      </div>
                    </div>

                    <p className="text-[13px] text-slate-600 leading-relaxed pt-1">
                      Assisted in developing and testing scalable web applications.<br />
                      Worked on bug fixes and performance improvements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM KEY STRENGTHS BANNER */}
          <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-4 sm:p-4.5 flex flex-col items-start gap-1.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold shadow-2xs">
                <KeyStrengthsRibbonIcon size={22} className="text-[#7656f4]" />
              </div>
              <span className="text-[15px] font-bold text-[#1e1548]">Key Strengths from Experience</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:pl-[52px]">
              {['Problem Solving', 'Team Collaboration', 'React.js', 'Node.js', 'MongoDB', 'Agile Development'].map((strength) => (
                <span key={strength} className="px-3 py-1 bg-white border border-[#e0d5fe] text-[#7656f4] rounded-xl text-[12.5px] font-semibold shadow-2xs">
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col gap-6">
          {/* MAIN HEADER */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              <Star size={20} className="text-[#7656f4]" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#1e1548]">Skills &amp; Competencies</h3>
              <p className="text-[12.5px] font-medium text-slate-400 mt-0.5">
                Overview of the mentee's technical and professional skills.
              </p>
            </div>
          </div>

          {/* 1. TECHNICAL SKILLS SECTION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code size={20} className="text-[#7656f4]" />
              <h4 className="text-[15.5px] font-bold text-[#1e1548]">Technical Skills</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
              {/* Column 1 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <JsLogoIcon />
                    <span>JavaScript</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '90%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">90%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <ReactLogoIcon />
                    <span>React.js</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '85%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">85%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <NodeLogoIcon />
                    <span>Node.js</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '80%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">80%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <MongoLogoIcon />
                    <span>MongoDB</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '75%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">75%</span>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <HtmlLogoIcon />
                    <span>HTML5</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '95%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">95%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <CssLogoIcon />
                    <span>CSS3</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '90%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">90%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <ExpressLogoIcon />
                    <span>Express.js</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '75%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">75%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <SqlLogoIcon />
                    <span>SQL</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '70%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">70%</span>
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <TsLogoIcon />
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '80%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">80%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <TailwindLogoIcon />
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '80%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">80%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <GitLogoIcon />
                    <span>Git &amp; GitHub</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '85%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">85%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-[14px] font-bold text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <RestApiLogoIcon />
                    <span>REST API</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-[135px]">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7656f4] rounded-full" style={{ width: '75%' }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#7656f4] w-7.5 text-right">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SOFT SKILLS SECTION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-[#7656f4]" />
              <h4 className="text-[14.5px] font-bold text-[#1e1548]">Soft Skills</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Soft Skill 1 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <Lightbulb size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[13px] font-bold text-[#1e1548]">Problem Solving</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-[#7656f4]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Excellent</span>
                  </div>
                </div>
              </div>

              {/* Soft Skill 2 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <MessageSquare size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[13px] font-bold text-[#1e1548]">Communication</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((dot) => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-[#7656f4]" />
                      ))}
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Very Good</span>
                  </div>
                </div>
              </div>

              {/* Soft Skill 3 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <Users size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[13px] font-bold text-[#1e1548]">Teamwork</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-[#7656f4]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Excellent</span>
                  </div>
                </div>
              </div>

              {/* Soft Skill 4 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <Clock size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[13px] font-bold text-[#1e1548]">Time Management</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((dot) => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-[#7656f4]" />
                      ))}
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Very Good</span>
                  </div>
                </div>
              </div>

              {/* Soft Skill 5 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <RefreshCw size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[13px] font-bold text-[#1e1548]">Adaptability</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((dot) => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-[#7656f4]" />
                      ))}
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Very Good</span>
                  </div>
                </div>
              </div>

              {/* Soft Skill 6 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <Flag size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[13px] font-bold text-[#1e1548]">Leadership</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((dot) => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-[#7656f4]" />
                      ))}
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Good</span>
                  </div>
                </div>
              </div>

              {/* Soft Skill 7 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <Brain size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[13px] font-bold text-[#1e1548]">Critical Thinking</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-[#7656f4]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Excellent</span>
                  </div>
                </div>
              </div>

              {/* Soft Skill 8 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0">
                  <Eye size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-[13px] font-bold text-[#1e1548]">Attention to Detail</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((dot) => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-[#7656f4]" />
                      ))}
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Very Good</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CERTIFICATIONS SECTION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award size={18} className="text-[#7656f4]" />
              <h4 className="text-[14.5px] font-bold text-[#1e1548]">Certifications</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Cert 1 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  <FileText size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-2">
                  <h5 className="text-[13px] font-bold text-[#1e1548] leading-snug">JavaScript (ES6) Essential Training</h5>
                  <div className="flex items-center justify-between text-[11.5px] font-medium text-slate-400 pt-1">
                    <span>Coursera</span>
                    <span>Jan 2023</span>
                  </div>
                </div>
              </div>

              {/* Cert 2 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  <FileText size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-2">
                  <h5 className="text-[13px] font-bold text-[#1e1548] leading-snug">React - The Complete Guide (incl. Hooks)</h5>
                  <div className="flex items-center justify-between text-[11.5px] font-medium text-slate-400 pt-1">
                    <span>Udemy</span>
                    <span>Mar 2023</span>
                  </div>
                </div>
              </div>

              {/* Cert 3 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  <FileText size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-2">
                  <h5 className="text-[13px] font-bold text-[#1e1548] leading-snug">Node.js - Advanced Concepts</h5>
                  <div className="flex items-center justify-between text-[11.5px] font-medium text-slate-400 pt-1">
                    <span>Pluralsight</span>
                    <span>Jun 2023</span>
                  </div>
                </div>
              </div>

              {/* Cert 4 */}
              <div className="bg-[#fbfafd] rounded-2xl border border-slate-200/70 p-3.5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f0eaff] text-[#7656f4] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  <FileText size={18} className="text-[#7656f4]" />
                </div>
                <div className="flex-1 space-y-2">
                  <h5 className="text-[13px] font-bold text-[#1e1548] leading-snug">MongoDB for Developers</h5>
                  <div className="flex items-center justify-between text-[11.5px] font-medium text-slate-400 pt-1">
                    <span>MongoDB University</span>
                    <span>Aug 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
const customMenteeRecords = [
  { name: 'Tanuka Saha', rollNo: 'CSE2024012', department: 'Computer Science & Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9123930828', studentEmail: 'cse202413@recruit.org.in', avatar: '/tanuka_saha_avatar.png' },
  { name: 'Aarav Sharma', rollNo: 'IT2024002', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9128449997', studentEmail: 'it2024002@recruit.org.in', avatar: '/aarav_sharma_avatar.png' },
  { name: 'Aarav Sharma 2', rollNo: 'IT2024022', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9997921760', studentEmail: 'it2024022@recruit.org.in', avatar: '/aarav_sharma_avatar.png' },
  { name: 'Aarav Sharma 3', rollNo: 'IT2024042', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9323772077', studentEmail: 'it2024042@recruit.org.in', avatar: '/aarav_sharma_avatar.png' },
  { name: 'Amitav Basu', rollNo: 'ECE2024018', department: 'Electronics & Comm. Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9417720899', studentEmail: 'ece2024018@recruit.org.in' },
  { name: 'Amitav Basu 2', rollNo: 'ECE2024038', department: 'Electronics & Comm. Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9676268411', studentEmail: 'ece2024038@recruit.org.in' },
  { name: 'Ananya Das', rollNo: 'ME2024005', department: 'Mechanical Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9472612618', studentEmail: 'me2024005@recruit.org.in' },
  { name: 'Ananya Das 2', rollNo: 'ME2024025', department: 'Mechanical Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9652496638', studentEmail: 'me2024025@recruit.org.in' },
  { name: 'Ananya Das 3', rollNo: 'ME2024045', department: 'Mechanical Engineering', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9371847237', studentEmail: 'me2024045@recruit.org.in' },
  { name: 'Arpan Ghosh', rollNo: 'IT2024012', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9916430472', studentEmail: 'it2024012@recruit.org.in' },
  { name: 'Arpan Ghosh 2', rollNo: 'IT2024032', department: 'Information Technology', mentorEmail: 'arindam.roy@trackademy.in', phone: '+91 9621720096', studentEmail: 'it2024032@recruit.org.in' }
];

const initialMentees = Array.from({ length: 50 }, (_, i) => {
  if (i < customMenteeRecords.length) {
    const rec = customMenteeRecords[i];
    const avatarId = (i % 70) + 1;
    const avatarGender = (i % 2 === 0) ? 'women' : 'men';
    return {
      id: `MNT-${1000 + i}`,
      name: rec.name,
      rollNo: rec.rollNo,
      department: rec.department,
      mentorEmail: rec.mentorEmail,
      phone: rec.phone,
      studentEmail: rec.studentEmail,
      avatar: rec.avatar || `https://randomuser.me/api/portraits/${avatarGender}/${avatarId}.jpg`,
      isOnline: i % 3 !== 0,
      attendance: `${88 + (i % 12)}%`,
      credits: 90 + (i * 3) % 80,
      status: 'Active',
      year: `${(i % 4) + 1}rd Year`
    };
  }

  const names = [
    'Riya Sen', 'Vikram Roy', 'Sohan Mukherjee', 'Priya Roy', 'Rahul Verma',
    'Sneha Banerjee', 'Dev Kumar', 'Ishita Bose', 'Meera Nair', 'Karan Patel',
    'Pooja Gupta', 'Subhajit Dutta', 'Taniya Chatterji', 'Nandini Das', 'Rohan Mehta'
  ];
  const depts = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Comm. Engineering',
    'Electrical Engineering',
    'Mechanical Engineering'
  ];
  const prefixes = ['CSE', 'IT', 'ECE', 'EE', 'ME'];
  
  const nameIdx = i % names.length;
  const deptIdx = i % depts.length;
  const prefix = prefixes[deptIdx];
  const rollNum = `${prefix}2024${String(i + 1).padStart(3, '0')}`;
  
  const avatarId = (i % 70) + 1;
  const avatarGender = (i % 2 === 0) ? 'women' : 'men';
  
  return {
    id: `MNT-${1000 + i}`,
    name: `${names[nameIdx]} ${Math.floor(i / 15) + 1}`,
    rollNo: rollNum,
    department: depts[deptIdx],
    mentorEmail: 'arindam.roy@trackademy.in',
    phone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
    studentEmail: `${rollNum.toLowerCase()}@recruit.org.in`,
    avatar: `https://randomuser.me/api/portraits/${avatarGender}/${avatarId}.jpg`,
    isOnline: i % 3 !== 0,
    attendance: `${85 + (i % 15)}%`,
    credits: 80 + (i * 3) % 100,
    status: 'Active',
    year: `${(i % 4) + 1}rd Year`
  };
});

const DEPARTMENTS = [
  'All Departments',
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Comm. Engineering',
  'Electrical Engineering',
  'Mechanical Engineering'
];

export default function MentorMentees({ onNavigate }) {
  const navigate = useNavigate();

  const handleGoToMessages = (mentee) => {
    if (onNavigate) {
      onNavigate('messages');
    } else {
      navigate('/mentor/messages');
    }
  };

  const [mentees, setMentees] = useState(initialMentees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState('All Mentors');
  const [sortBy, setSortBy] = useState('Name (A-Z)');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState(null); // For Profile view modal
  const [messagingMentee, setMessagingMentee] = useState(null); // For Quick Message modal
  const [toastMessage, setToastMessage] = useState(null);

  // New Mentee Form State
  const [newMentee, setNewMentee] = useState({
    name: '',
    rollNo: '',
    program: 'B.Tech',
    department: 'Computer Science & Engineering',
    year: '1st Year',
    mentorEmail: 'kaushik.c@trackademy.edu',
    phone: '',
    studentEmail: '',
  });

  // Message Form State
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');

  // Toast notification helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter & Sort Logic
  const filteredMentees = useMemo(() => {
    return mentees.filter((m) => {
      const text = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !text ||
        m.name.toLowerCase().includes(text) ||
        m.rollNo.toLowerCase().includes(text) ||
        m.studentEmail.toLowerCase().includes(text) ||
        m.phone.includes(text);
      
      const matchesDept =
        selectedDepartment === 'all' ||
        selectedDepartment === 'All Departments' ||
        m.department === selectedDepartment;

      const matchesProgram =
        selectedProgram === 'all' ||
        selectedProgram === 'All Programs' ||
        m.program === selectedProgram;

      const matchesYear =
        selectedYear === 'all' ||
        selectedYear === 'All Years' ||
        m.year === selectedYear;

      return matchesSearch && matchesDept && matchesProgram && matchesYear;
    }).sort((a, b) => {
      if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
      if (sortBy === 'Name (Z-A)') return b.name.localeCompare(a.name);
      if (sortBy === 'Roll No') return a.rollNo.localeCompare(b.rollNo);
      return 0;
    });
  }, [mentees, searchTerm, selectedDepartment, selectedProgram, selectedYear, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredMentees.length / rowsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * rowsPerPage;
  const paginatedMentees = filteredMentees.slice(startIndex, startIndex + rowsPerPage);

  // Handlers
  const handleAddMenteeSubmit = (e) => {
    e.preventDefault();
    if (!newMentee.name || !newMentee.rollNo) {
      triggerToast('Please fill in required fields (Name & Roll No)');
      return;
    }

    const createdMentee = {
      id: `MNT-${Date.now()}`,
      name: newMentee.name,
      rollNo: newMentee.rollNo,
      program: newMentee.program || 'B.Tech',
      department: newMentee.department,
      year: newMentee.year || '1st Year',
      mentorEmail: newMentee.mentorEmail || 'kaushik.c@trackademy.edu',
      phone: newMentee.phone || '+91 9123456789',
      studentEmail: newMentee.studentEmail || `${newMentee.rollNo.toLowerCase()}@student.edu`,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      isOnline: true,
      attendance: '95%',
      credits: 100,
      status: 'Active',
    };

    setMentees((prev) => [createdMentee, ...prev]);
    setShowAddModal(false);
    setNewMentee({
      name: '',
      rollNo: '',
      program: 'B.Tech',
      department: 'Computer Science & Engineering',
      year: '1st Year',
      mentorEmail: 'kaushik.c@trackademy.edu',
      phone: '',
      studentEmail: '',
    });
    triggerToast(`Added ${createdMentee.name} to assigned mentees successfully!`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      triggerToast('Please write a message before sending.');
      return;
    }
    triggerToast(`Message sent to ${messagingMentee.name} (${messagingMentee.studentEmail})`);
    setMessagingMentee(null);
    setMessageSubject('');
    setMessageBody('');
  };

  // Render View Mentee Detail Page when selectedMentee is active
  if (selectedMentee) {
    return (
      <ViewMenteeDetail
        mentee={selectedMentee}
        onClose={() => setSelectedMentee(null)}
        onSendMessage={(m) => {
          setSelectedMentee(null);
          setMessagingMentee(m);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2.5 text-slate-800 font-sans p-2 sm:px-5 sm:py-2.5 pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl animate-fade-in border border-slate-700">
          <Sparkles className="text-emerald-400" size={18} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* SEARCH AND FILTERS BAR (EXACTLY MATCHING USER SCREENSHOT) */}
      <div className="flex items-center gap-3 flex-wrap bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search students by name, ID or email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300 text-gray-800"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* All Programs Dropdown */}
        <div className="relative">
          <select
            value={selectedProgram}
            onChange={(e) => {
              setSelectedProgram(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none min-w-[140px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
          >
            <option value="all">All Programs</option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.Tech Lateral">B.Tech Lateral</option>
            <option value="M.Tech">M.Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* All Years Dropdown */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none min-w-[120px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
          >
            <option value="all">All Years</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* All Departments Dropdown */}
        <div className="relative">
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none min-w-[150px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science & Engineering">CSE</option>
            <option value="Electrical Engineering">EE</option>
            <option value="Electronics & Comm. Engineering">ECE</option>
            <option value="Information Technology">IT</option>
            <option value="Mechanical Engineering">ME</option>
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* List / Grid View Toggles (Moved into top bar) */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 ml-auto">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            title="List View"
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-[#7656f4] shadow-sm border border-[#e2d9fd] font-bold'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            title="Grid View"
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-[#7656f4] shadow-sm border border-[#e2d9fd] font-bold'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* CONTENT AREA: LIST VIEW OR GRID VIEW */}
      {viewMode === 'list' ? (
        /* TABLE LIST VIEW MATCHING SCREENSHOT EXACTLY */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f0eaff] text-[#7656f4] text-[11.5px] font-extrabold uppercase tracking-wider border-b border-[#e2d9fd]">
                  <th className="py-3.5 px-4 sm:px-5">MENTEE</th>
                  <th className="py-3.5 px-4">ID / COLLEGE ROLL NO.</th>
                  <th className="py-3.5 px-4">DEPARTMENT</th>
                  <th className="py-3.5 px-4">EMAIL</th>
                  <th className="py-3.5 px-4">CONTACT</th>
                  <th className="py-3.5 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
                {paginatedMentees.length > 0 ? (
                  paginatedMentees.map((mentee) => (
                    <tr
                      key={mentee.id}
                      className="hover:bg-[#f0eaff]/40 transition-colors group"
                    >
                      {/* MENTEE (Avatar + Name) */}
                      <td className="py-3.5 px-4 sm:px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <img
                              src={mentee.avatar}
                              alt={mentee.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  'https://ui-avatars.com/api/?name=' +
                                  encodeURIComponent(mentee.name) +
                                  '&background=7656f4&color=fff';
                              }}
                            />
                            {mentee.isOnline && (
                              <span
                                title="Active Online"
                                className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0 shadow-sm"
                              />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-[13px] text-slate-900 group-hover:text-[#7656f4] transition-colors block">
                              {mentee.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ID / COLLEGE ROLL NO. (Pill badge) */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-3 py-1 bg-[#f0eaff] text-[#7656f4] border border-[#e2d9fd] rounded-full text-[12px] font-semibold tracking-wide">
                          {mentee.rollNo}
                        </span>
                      </td>

                      {/* DEPARTMENT */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-medium text-[13px] leading-snug block">
                          {mentee.department}
                        </span>
                      </td>

                      {/* EMAIL (Student / Mentee Email) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail size={14} className="text-[#7656f4] flex-shrink-0" />
                          <span className="text-[13px]">{mentee.studentEmail || mentee.email}</span>
                        </div>
                      </td>

                      {/* CONTACT (Phone number only) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <PhoneCall size={14} className="text-[#7656f4] flex-shrink-0" />
                          <span className="text-[13px] font-medium">{mentee.phone}</span>
                        </div>
                      </td>

                      {/* ACTIONS (Eye + Message) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-2.5">
                          {/* View Profile Action */}
                          <button
                            onClick={() => setSelectedMentee(mentee)}
                            title="View Mentee Profile"
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200/90 text-[#7656f4] hover:border-[#7656f4] hover:bg-[#f0eaff] transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <ActionEyeIcon size={18} />
                          </button>

                          {/* Quick Message Action -> Redirects to Message Section */}
                          <button
                            onClick={() => handleGoToMessages(mentee)}
                            title="Open Message Section"
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200/90 text-[#7656f4] hover:border-[#7656f4] hover:bg-[#f0eaff] transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <ActionMessageIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search size={32} className="text-slate-300" />
                        <p className="text-sm font-semibold">No mentees found</p>
                        <p className="text-xs text-slate-400">
                          Try adjusting your search query or department filter
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER CONTROL INSIDE THE SAME CARD MATCHING SCREENSHOT */}
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 bg-white">
            {/* Rows per page dropdown */}
            <div className="flex items-center gap-2.5 text-[13px] text-slate-600 font-medium z-10">
              <span>Rows per page:</span>
              <div className="relative">
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-slate-200/90 rounded-xl text-[12px] font-semibold text-slate-800 outline-none cursor-pointer hover:border-slate-300"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={14}
                />
              </div>
            </div>

            {/* Page navigation controls: << < 1 2 3 4 5 > >> (CENTER ALIGNED) */}
            <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center gap-3.5 text-slate-600">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={validCurrentPage === 1}
                className="p-1 rounded-lg text-slate-500 hover:text-[#7656f4] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronsLeft size={16} />
              </button>

              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={validCurrentPage === 1}
                className="p-1 rounded-lg text-slate-500 hover:text-[#7656f4] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                      validCurrentPage === pageNum
                        ? 'bg-[#7656f4] text-white shadow-sm shadow-[#7656f4]/20'
                        : 'text-slate-600 hover:text-[#7656f4] hover:bg-[#f0eaff]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={validCurrentPage === totalPages}
                className="p-1 rounded-lg text-slate-500 hover:text-[#7656f4] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={validCurrentPage === totalPages}
                className="p-1 rounded-lg text-slate-500 hover:text-[#7656f4] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW LAYOUT MATCHING SCREENSHOT EXACTLY */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedMentees.map((mentee) => (
            <div
              key={mentee.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
            >
              {/* Mentee Header: Avatar + Name + Roll Badge */}
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={mentee.avatar}
                    alt={mentee.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://ui-avatars.com/api/?name=' +
                        encodeURIComponent(mentee.name) +
                        '&background=7656f4&color=fff';
                    }}
                  />
                  {mentee.isOnline && (
                    <span className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0 shadow-xs" />
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-[#7656f4] text-[14px] leading-snug">
                    {mentee.name}
                  </h3>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#f0eaff] text-[#7656f4] border border-[#e2d9fd] rounded-full text-[11px] font-semibold tracking-wide w-max">
                    {mentee.rollNo}
                  </span>
                </div>
              </div>

              {/* Contact Info: Phone & Email */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-2 text-[12px] text-slate-700 font-medium">
                  <PhoneCall size={13} className="text-[#7656f4] flex-shrink-0" />
                  <span>{mentee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-slate-600">
                  <Mail size={13} className="text-[#7656f4] flex-shrink-0" />
                  <span className="truncate">{mentee.studentEmail}</span>
                </div>
              </div>

              {/* Action Buttons: View Profile & Message */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedMentee(mentee)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#f0eaff] hover:bg-[#7656f4] text-[#7656f4] hover:text-white rounded-xl text-[12px] font-semibold transition-all cursor-pointer border border-[#e2d9fd]"
                >
                  <ActionEyeIcon size={16} />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => handleGoToMessages(mentee)}
                  title="Open Message Section"
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-[#f0eaff] text-[#7656f4] rounded-xl border border-slate-200/90 hover:border-[#7656f4] transition-all cursor-pointer flex-shrink-0 shadow-2xs"
                >
                  <ActionMessageIcon size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL 1: ADD NEW MENTEE --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#f0eaff] text-[#7656f4] rounded-xl">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Add New Mentee</h3>
                  <p className="text-xs text-slate-500">Assign a student profile to your mentorship</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMenteeSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanuka Saha"
                  value={newMentee.name}
                  onChange={(e) => setNewMentee({ ...newMentee, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    College Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE2024012"
                    value={newMentee.rollNo}
                    onChange={(e) => setNewMentee({ ...newMentee, rollNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Department
                  </label>
                  <select
                    value={newMentee.department}
                    onChange={(e) => setNewMentee({ ...newMentee, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4] bg-white"
                  >
                    {DEPARTMENTS.filter((d) => d !== 'All Departments').map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Mentor Email
                </label>
                <input
                  type="email"
                  value={newMentee.mentorEmail}
                  onChange={(e) => setNewMentee({ ...newMentee, mentorEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+91 9123930828"
                    value={newMentee.phone}
                    onChange={(e) => setNewMentee({ ...newMentee, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Student Email
                  </label>
                  <input
                    type="email"
                    placeholder="student@recruit.org.in"
                    value={newMentee.studentEmail}
                    onChange={(e) => setNewMentee({ ...newMentee, studentEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#7656f4] hover:bg-[#6242e2] text-white rounded-xl text-sm font-semibold shadow-md shadow-purple-600/20 cursor-pointer"
                >
                  Confirm & Add Mentee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* --- MODAL 3: QUICK MESSAGE --- */}
      {messagingMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#f0eaff] text-[#7656f4] rounded-xl">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Send Message to {messagingMentee.name}
                  </h3>
                  <p className="text-xs text-slate-500">{messagingMentee.studentEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setMessagingMentee(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Assignment Review & Feedback"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message Content *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your mentorship message here..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#7656f4] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setMessagingMentee(null)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#7656f4] text-white rounded-xl text-sm font-semibold hover:bg-[#5b3be8] shadow-md shadow-[#7656f4]/20"
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FILTER DRAWER --- */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between animate-slide-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="text-[#7656f4]" size={20} />
                  <h3 className="font-extrabold text-slate-900 text-lg">Filter Mentees</h3>
                </div>
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Sort Order
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white"
                  >
                    <option value="Name (A-Z)">Name (A-Z)</option>
                    <option value="Name (Z-A)">Name (Z-A)</option>
                    <option value="Roll No">Roll No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedDepartment('All Departments');
                  setSearchTerm('');
                  setSortBy('Name (A-Z)');
                  setShowFilterDrawer(false);
                }}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 py-2.5 bg-[#7656f4] text-white rounded-xl text-sm font-semibold hover:bg-[#5b3be8]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
