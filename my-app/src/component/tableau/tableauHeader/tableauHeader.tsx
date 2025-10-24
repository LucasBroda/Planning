import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCalendar } from '../../../contexts/CalendarContext';

const joursDeLaSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const moisNoms = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const TableauHeader: React.FC = () => {
    const { currentWeekStart, goToPreviousWeek, goToNextWeek, goToCurrentWeek } = useCalendar();

    const getJoursDeLaSemaine = (dateDebut: Date) => {
        const jours = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(dateDebut);
            currentDate.setDate(dateDebut.getDate() + i);
            jours.push(currentDate);
        }
        return jours;
    };

    const getWeekInfo = (dateDebut: Date) => {
        const endDate = new Date(dateDebut);
        endDate.setDate(dateDebut.getDate() + 6);
        
        const startMonth = moisNoms[dateDebut.getMonth()];
        const endMonth = moisNoms[endDate.getMonth()];
        const year = dateDebut.getFullYear();
        
        if (startMonth === endMonth) {
            return `${startMonth} ${year}`;
        } else {
            return `${startMonth} - ${endMonth} ${year}`;
        }
    };

    const datesDeLaSemaine = getJoursDeLaSemaine(currentWeekStart);
    const weekInfo = getWeekInfo(currentWeekStart);
    const today = new Date();

    return (
        <div className="calendar-header bg-dark text-white">
            {/* Navigation et titre de la semaine */}
            <div className="container-fluid py-3">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <h4 className="mb-0 text-orange">Planning - {weekInfo}</h4>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="btn-group" role="group">
                            <button 
                                className="btn btn-outline-orange btn-sm"
                                onClick={goToPreviousWeek}
                                title="Semaine précédente"
                            >
                                ← Précédent
                            </button>
                            <button 
                                className="btn btn-orange btn-sm"
                                onClick={goToCurrentWeek}
                                title="Semaine actuelle"
                            >
                                Aujourd'hui
                            </button>
                            <button 
                                className="btn btn-outline-orange btn-sm"
                                onClick={goToNextWeek}
                                title="Semaine suivante"
                            >
                                Suivant →
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4 text-end">
                        <small className="text-muted">
                            Semaine du {datesDeLaSemaine[0].getDate()} au {datesDeLaSemaine[6].getDate()}
                        </small>
                    </div>
                </div>
            </div>
            
            {/* En-têtes des jours */}
            <div className="container-fluid">
                <div className="row text-center font-weight-bold border-bottom border-secondary">
                    <div className="col-1 border-end border-secondary p-2">
                        <small>Heures</small>
                    </div>
                    {joursDeLaSemaine.map((jour, index) => {
                        const currentDate = datesDeLaSemaine[index];
                        const isToday = currentDate.toDateString() === today.toDateString();
                        
                        return (
                            <div key={`${jour}-${index}`} className={`col border-end border-secondary p-2 ${isToday ? 'bg-orange text-dark' : ''}`}>
                                <div className="fw-bold">{jour}</div>
                                <div className="small">
                                    {currentDate.getDate()}/{currentDate.getMonth() + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TableauHeader;