import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useActivities } from '../../../contexts/ActivityContext';
import ActivityModal from '../../modal/ActivityModal';

interface TableauBodyProps {
    dateDebut: Date;
}

const TableauBody: React.FC<TableauBodyProps> = ({ dateDebut }) => {
    const { getActivitiesForTimeSlot } = useActivities();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedHour, setSelectedHour] = useState<number | undefined>(undefined);

    const getJoursDeLaSemaine = (dateDebut: Date) => {
        const jours = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(dateDebut);
            currentDate.setDate(dateDebut.getDate() + i);
            jours.push(currentDate);
        }
        return jours;
    };

    const heures = [];
    for (let heure = 7; heure <= 23; heure++) {
        heures.push(heure);
    }

    const datesDeLaSemaine = getJoursDeLaSemaine(dateDebut);

    const handleTimeSlotClick = (date: Date, hour: number) => {
        setSelectedDate(date);
        setSelectedHour(hour);
        setIsModalOpen(true);
    };

    const handleKeyDown = (event: React.KeyboardEvent, date: Date, hour: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleTimeSlotClick(date, hour);
        }
    };

    return (
        <div className="calendar-grid">
            <div className="container-fluid border">
                {heures.map((heure) => (
                    <div key={heure} className="row border-bottom" style={{ minHeight: '60px' }}>
                        <div className="col-1 d-flex align-items-center font-weight-bold border-end text-center">
                            <small>{heure}:00</small>
                        </div>
                        {datesDeLaSemaine.map((date, dayIndex) => {
                            const activities = getActivitiesForTimeSlot(date, heure);
                            
                            return (
                                <div 
                                    key={`${heure}-${dayIndex}`} 
                                    className="col border-end time-slot"
                                    onClick={() => handleTimeSlotClick(date, heure)}
                                    onKeyDown={(e) => handleKeyDown(e, date, heure)}
                                    role="button"
                                    tabIndex={0}
                                    style={{ minHeight: '60px', position: 'relative' }}
                                >
                                    {activities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="activity-block"
                                            style={{
                                                backgroundColor: getActivityColor(activity.color),
                                                color: 'white',
                                                padding: '2px 4px',
                                                margin: '1px 0',
                                                borderRadius: '3px',
                                                fontSize: '11px',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                            title={`${activity.title} (${activity.person})`}
                                        >
                                            <div className="fw-bold">{activity.title}</div>
                                            <div style={{ fontSize: '9px', opacity: 0.9 }}>
                                                {activity.person}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            
            <ActivityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
                selectedHour={selectedHour}
            />
        </div>
    );
};

// Fonction utilitaire pour obtenir les couleurs des activités
const getActivityColor = (color: string): string => {
    const colors = {
        orange: '#ff7a00',
        blue: '#007bff',
        green: '#28a745',
        purple: '#6f42c1',
        red: '#dc3545',
        yellow: '#ffc107'
    };
    return colors[color as keyof typeof colors] || colors.orange;
};

export default TableauBody;