// Fait en sorte de créer un composant React TypeScript appelé Calendrier qui utilise les composants TableauHeader et TableauBody pour afficher un calendrier hebdomadaire complet. Assure-toi que le composant est bien structuré et utilise les classes Bootstrap appropriées pour une mise en page réactive.
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableauHeader from './tableauHeader/tableauHeader';
import TableauBody from './tableauBody/tableauBody';

interface CalendrierProps {
    dateDebut: Date;
}

const Calendrier: React.FC<CalendrierProps> = ({ dateDebut }) => {
    return (
        <div className="calendrier-container">
            <div className="container">
                <TableauHeader dateDebut={dateDebut} />
                <TableauBody dateDebut={dateDebut} />
            </div>
        </div>
    );
};

export default Calendrier;