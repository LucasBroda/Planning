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
                <div className="row justify-content-center">
                    <div className="col-12">
                        <TableauHeader dateDebut={dateDebut} />
                        <TableauBody dateDebut={dateDebut} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendrier;