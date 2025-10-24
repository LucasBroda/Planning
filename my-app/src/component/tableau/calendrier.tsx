import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableauHeader from './tableauHeader/tableauHeader';
import TableauBody from './tableauBody/tableauBody';
import Sidebar from '../sidebar/sidebar';
import { useCalendar } from '../../contexts/CalendarContext';

const Calendrier: React.FC = () => {
    const { currentWeekStart } = useCalendar();
    
    return (
        <div className="calendrier-container">
            {/* Structure principale avec conteneurs comme demandé dans le README */}
            <div className="calendar-wrapper">
                {/* Conteneur global avec titre + semaine */}
                <div className="calendar-main">
                    <TableauHeader />
                    
                    {/* Conteneur avec sidebar + calendrier */}
                    <div className="d-flex h-100" style={{ margin: 0, padding: 0 }}>
                        <div style={{ width: '15%', margin: 0, padding: 0 }}>
                            <Sidebar />
                        </div>
                        <div style={{ width: '85%', margin: 0, padding: 0 }}>
                            <TableauBody dateDebut={currentWeekStart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendrier;