import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableauBody from './tableauBody/tableauBody';
import Sidebar from '../sidebar/sidebar';

interface CalendrierProps {
    dateDebut: Date;
}

const Calendrier: React.FC<CalendrierProps> = ({ dateDebut }) => {
    return (
        <div className="calendrier-container">
            <div className="d-flex h-100" style={{ margin: 0, padding: 0 }}>
                <div style={{ width: '15%', margin: 0, padding: 0 }}>
                    <Sidebar />
                </div>
                <div style={{ width: '85%', margin: 0, padding: 0 }}>
                    <TableauBody dateDebut={dateDebut} />
                </div>
            </div>
        </div>
    );
};

export default Calendrier;