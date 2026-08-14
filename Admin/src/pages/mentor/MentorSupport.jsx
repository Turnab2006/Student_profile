import Support from '../admin/Support';

export default function MentorSupport({ onNavigate }) {
  return <Support isMentor={true} onNavigate={onNavigate} />;
}
