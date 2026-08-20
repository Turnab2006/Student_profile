import StudentNotices from '../student/StudentNotices';

export default function MentorNotices({ user, onNavigate }) {
  return (
    <div className="w-full">
      <StudentNotices onNavigate={onNavigate} hideHeader={true} />
    </div>
  );
}

