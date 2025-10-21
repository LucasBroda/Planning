import React, { JSX } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TableauBodyProps {
    dateDebut: Date;
}

const joursDeLaSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const TableauBody: React.FC<TableauBodyProps> = ({ dateDebut }) => {

    const getJourDeLaSemaine = (dateDebut: Date) => {
        const jours = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(dateDebut);
            currentDate.setDate(dateDebut.getDate() + i);
            jours.push(currentDate);
        }
        return jours;
    };

    const getMoisPourDate = (date: Date) => {
        const currentDate = new Date(date);
        
        const mois = currentDate.getMonth() + 1;

        return mois;
    };

    const heures = [];
    for (let heure = 7; heure <= 23; heure++) {
        heures.push(heure);
    }

    const datesDeLaSemaine = getJourDeLaSemaine(dateDebut);

    return (
        
        <div className="container">
            <div className="container">
            <div className="row text-center font-weight-bold border-bottom">
                <div className="col-1"></div>
                {joursDeLaSemaine.map((jour, index) => (
                    <div key={`${jour}-${index}`} className="col">
                        <div>{jour}</div>
                        <div>{datesDeLaSemaine[index].getDate()}/{getMoisPourDate(datesDeLaSemaine[index])}</div>
                    </div>
                ))}
            </div>
        </div>
            {heures.map((heure, index) => (
                <div key={heure} className="row border-bottom" style={{ height: '40px' }}>
                    <div className="col-1 d-flex align-items-center font-weight-bold">{heure}:00</div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                </div>
            ))}
        </div>
    );
};

export default TableauBody;