import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TableauHeaderProps {
    dateDebut: Date;
}

const joursDeLaSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const TableauHeader: React.FC<TableauHeaderProps> = ({ dateDebut }) => {
    const getJourDeLaSemaine = (dateDebut: Date) => {
        const jours = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(dateDebut);
            currentDate.setDate(dateDebut.getDate() + i);
            jours.push(currentDate);
        }
        return jours;
    };

    const datesDeLaSemaine = getJourDeLaSemaine(dateDebut);

    return (
        <div className="container">
            <div className="row text-center font-weight-bold border-bottom">
                {joursDeLaSemaine.map((jour, index) => (
                    <div key={index} className="col">
                        <div>{jour}</div>
                        <div>{datesDeLaSemaine[index].getDate()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableauHeader;