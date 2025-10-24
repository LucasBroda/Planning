import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export interface Activity {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: ActivityType;
  person: Person;
  color: ActivityColor;
  status: ActivityStatus;
  notes?: string;
}

export type ActivityType = 'Cours' | 'Sport' | 'Taff' | 'Anniversaire' | 'Loisir' | 'Rendez-vous' | 'Autre';
export type Person = 'Lucas' | 'Léa' | 'Les deux';
export type ActivityColor = 'orange' | 'blue' | 'green' | 'purple' | 'red' | 'yellow';
export type ActivityStatus = 'planifié' | 'confirmé' | 'annulé' | 'reporté' | 'terminé';

interface ActivityFilter {
  person?: Person;
  type?: ActivityType;
  status?: ActivityStatus;
}

interface ActivityContextType {
  activities: Activity[];
  filteredActivities: Activity[];
  filter: ActivityFilter;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  setFilter: (filter: ActivityFilter) => void;
  clearFilter: () => void;
  getActivitiesForDate: (date: Date) => Activity[];
  getActivitiesForTimeSlot: (date: Date, hour: number) => Activity[];
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};

interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider: React.FC<ActivityProviderProps> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<ActivityFilter>({});

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      if (filter.person && activity.person !== filter.person && activity.person !== 'Les deux') {
        return false;
      }
      if (filter.type && activity.type !== filter.type) {
        return false;
      }
      if (filter.status && activity.status !== filter.status) {
        return false;
      }
      return true;
    });
  }, [activities, filter]);

  const addActivity = (activityData: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 11)
    };
    setActivities(prev => [...prev, newActivity]);
  };

  const updateActivity = (id: string, updatedData: Partial<Activity>) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id ? { ...activity, ...updatedData } : activity
      )
    );
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const clearFilter = () => {
    setFilter({});
  };

  const getActivitiesForDate = (date: Date) => {
    return filteredActivities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate.toDateString() === date.toDateString();
    });
  };

  const getActivitiesForTimeSlot = (date: Date, hour: number) => {
    return getActivitiesForDate(date).filter(activity => {
      const startHour = Number.parseInt(activity.startTime.split(':')[0]);
      const endHour = Number.parseInt(activity.endTime.split(':')[0]);
      return hour >= startHour && hour < endHour;
    });
  };

  const value = useMemo(() => ({
    activities,
    filteredActivities,
    filter,
    addActivity,
    updateActivity,
    deleteActivity,
    setFilter,
    clearFilter,
    getActivitiesForDate,
    getActivitiesForTimeSlot
  }), [activities, filteredActivities, filter]);

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};