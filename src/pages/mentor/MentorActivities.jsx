import { useState } from 'react';
import Activities from '../admin/Activities';
import AddActivity from '../admin/AddActivity';

export default function MentorActivities({ user }) {
  const [currentSubView, setCurrentSubView] = useState('activities');

  const handleNavigate = (targetPage) => {
    if (targetPage === 'add-activity') {
      setCurrentSubView('add-activity');
    } else {
      setCurrentSubView('activities');
    }
  };

  if (currentSubView === 'add-activity') {
    return <AddActivity onNavigate={handleNavigate} isMentor={true} user={user} />;
  }

  return <Activities onNavigate={handleNavigate} isMentor={true} user={user} />;
}
