import { Activity } from '../contexts/ActivityContext';

export const sampleActivities: Omit<Activity, 'id'>[] = [
  {
    title: 'Cours de React',
    description: 'Cours sur les hooks avancés',
    date: new Date(2025, 9, 21, 9, 0), // 21 octobre 2025, 9h
    startTime: '09:00',
    endTime: '11:00',
    type: 'Cours',
    person: 'Lucas',
    color: 'blue',
    status: 'confirmé',
    notes: 'Ne pas oublier le laptop'
  },
  {
    title: 'Sport - Salle',
    description: 'Séance de musculation',
    date: new Date(2025, 9, 21, 18, 0), // 21 octobre 2025, 18h
    startTime: '18:00',
    endTime: '19:30',
    type: 'Sport',
    person: 'Les deux',
    color: 'green',
    status: 'planifié'
  },
  {
    title: 'Réunion équipe',
    description: 'Point hebdomadaire',
    date: new Date(2025, 9, 22, 14, 0), // 22 octobre 2025, 14h
    startTime: '14:00',
    endTime: '15:30',
    type: 'Taff',
    person: 'Lucas',
    color: 'orange',
    status: 'confirmé'
  },
  {
    title: 'Rendez-vous médecin',
    description: 'Contrôle de routine',
    date: new Date(2025, 9, 23, 10, 0), // 23 octobre 2025, 10h
    startTime: '10:00',
    endTime: '11:00',
    type: 'Rendez-vous',
    person: 'Léa',
    color: 'red',
    status: 'confirmé',
    notes: 'Apporter la carte vitale'
  },
  {
    title: 'Sortie cinéma',
    description: 'Nouveau film Marvel',
    date: new Date(2025, 9, 25, 20, 0), // 25 octobre 2025, 20h
    startTime: '20:00',
    endTime: '22:30',
    type: 'Loisir',
    person: 'Les deux',
    color: 'purple',
    status: 'planifié'
  },
  {
    title: 'Anniversaire Marie',
    description: 'Fête chez ses parents',
    date: new Date(2025, 9, 26, 15, 0), // 26 octobre 2025, 15h
    startTime: '15:00',
    endTime: '19:00',
    type: 'Anniversaire',
    person: 'Les deux',
    color: 'yellow',
    status: 'confirmé',
    notes: 'Penser au cadeau'
  }
];

export const loadSampleData = (addActivity: (activity: Omit<Activity, 'id'>) => void) => {
  for (const activity of sampleActivities) {
    addActivity(activity);
  }
};