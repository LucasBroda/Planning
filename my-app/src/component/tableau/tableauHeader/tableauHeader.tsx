// Fait moi un composant React TypeScript appelé TableauHeader qui composera l'en tête de mon calendrier, j'aimerais que cette en-tête affiche les jours de la semaine (Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche) ainsi que les dates correspondantes pour une semaine donnée. Le composant doit recevoir en props une date de début de semaine (un objet Date) et doit calculer et afficher les jours et les dates à partir de cette date de début. Le style doit être simple et épuré, avec une disposition en grille pour aligner les jours et les dates correctement. Pour le style fait en sorte d'utliser bootstrap.
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