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

    const getMoisPourDate = (date: Date) => {
        const currentDate = new Date(date);
        
        const mois = currentDate.getMonth() + 1;

        return mois;
    }

    const datesDeLaSemaine = getJourDeLaSemaine(dateDebut);

    return (
        <></>
    );
};

export default TableauHeader;