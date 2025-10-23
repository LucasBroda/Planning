import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar border-end h-100 w-100 p-0 m-0" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="d-flex flex-column align-items-center h-100 p-2">
                {/* Contenu de la sidebar */}
                <div className="mb-3">Sidebar</div>
            </div>
        </div>
    );
}

export default Sidebar;