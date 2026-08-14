import { useState } from 'react';
import Notices from '../admin/Notices';
import AddNotice from '../admin/AddNotice';

export default function MentorNotices({ user }) {
  const [currentSubView, setCurrentSubView] = useState('notices');

  const handleNavigate = (targetPage) => {
    if (targetPage === 'add-notice') {
      setCurrentSubView('add-notice');
    } else {
      setCurrentSubView('notices');
    }
  };

  if (currentSubView === 'add-notice') {
    return <AddNotice onNavigate={handleNavigate} isMentor={true} user={user} />;
  }

  return <Notices onNavigate={handleNavigate} isMentor={true} user={user} />;
}
