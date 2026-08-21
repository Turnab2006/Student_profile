import Activities from "../admin/Activities";

export default function StudentActivities({ onNavigate, user }) {
  return <Activities onNavigate={onNavigate} isStudent={true} user={user} />;
}
