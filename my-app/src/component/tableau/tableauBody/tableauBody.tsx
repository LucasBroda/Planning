import React, { JSX } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
interface TableauBodyProps {
    dateDebut: Date;
}

let tableauHeader: JSX.Element;

const TableauBody: React.FC<TableauBodyProps> = ({ dateDebut }) => {
    const heures = [];
    for (let heure = 7; heure <= 23; heure++) {
        heures.push(heure);
    }

    return (
        <div className="container">
            {heures.map((heure, index) => (
                <div key={index} className="row border-bottom" style={{ height: '40px' }}>
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