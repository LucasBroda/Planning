import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useActivities, ActivityType, Person, ActivityStatus } from '../../contexts/ActivityContext';
import { loadSampleData } from '../../data/sampleData';

const Sidebar: React.FC = () => {
    const { filter, setFilter, clearFilter, activities, addActivity } = useActivities();
    const [activeSection, setActiveSection] = useState<string>('filters');

    const handleFilterChange = (key: keyof typeof filter, value: string | undefined) => {
        setFilter({
            ...filter,
            [key]: value === '' ? undefined : value
        });
    };

    const getActivityStats = () => {
        const stats = {
            total: activities.length,
            lucas: activities.filter(a => a.person === 'Lucas' || a.person === 'Les deux').length,
            lea: activities.filter(a => a.person === 'Léa' || a.person === 'Les deux').length,
            confirmed: activities.filter(a => a.status === 'confirmé').length,
            planned: activities.filter(a => a.status === 'planifié').length
        };
        return stats;
    };

    const stats = getActivityStats();

    return (
        <div className="sidebar border-end h-100 w-100 p-0 m-0">
            <div className="d-flex flex-column h-100">
                {/* Header */}
                <div className="sidebar-header p-3 border-bottom border-secondary">
                    <h6 className="text-orange mb-0 fw-bold">Planning</h6>
                    <small className="text-muted">Lucas & Léa</small>
                </div>

                {/* Navigation */}
                <div className="sidebar-nav p-2">
                    <div className="btn-group-vertical w-100">
                        <button
                            className={`btn btn-sm ${activeSection === 'filters' ? 'btn-orange' : 'btn-outline-secondary'} mb-1`}
                            onClick={() => setActiveSection('filters')}
                        >
                            🔍 Filtres
                        </button>
                        <button
                            className={`btn btn-sm ${activeSection === 'stats' ? 'btn-orange' : 'btn-outline-secondary'} mb-1`}
                            onClick={() => setActiveSection('stats')}
                        >
                            📊 Stats
                        </button>
                        <button
                            className={`btn btn-sm ${activeSection === 'profile' ? 'btn-orange' : 'btn-outline-secondary'} mb-1`}
                            onClick={() => setActiveSection('profile')}
                        >
                            👤 Profil
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="sidebar-content flex-grow-1 p-2 overflow-auto">
                    {activeSection === 'filters' && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="filter-person" className="form-label small text-white">Personne</label>
                                <select
                                    id="filter-person"
                                    className="form-select form-select-sm bg-secondary text-white border-secondary"
                                    value={filter.person || ''}
                                    onChange={(e) => handleFilterChange('person', e.target.value as Person)}
                                >
                                    <option value="">Tous</option>
                                    <option value="Lucas">Lucas</option>
                                    <option value="Léa">Léa</option>
                                    <option value="Les deux">Les deux</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="filter-type" className="form-label small text-white">Type</label>
                                <select
                                    id="filter-type"
                                    className="form-select form-select-sm bg-secondary text-white border-secondary"
                                    value={filter.type || ''}
                                    onChange={(e) => handleFilterChange('type', e.target.value as ActivityType)}
                                >
                                    <option value="">Tous</option>
                                    <option value="Cours">Cours</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Taff">Taff</option>
                                    <option value="Anniversaire">Anniversaire</option>
                                    <option value="Loisir">Loisir</option>
                                    <option value="Rendez-vous">Rendez-vous</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="filter-status" className="form-label small text-white">Statut</label>
                                <select
                                    id="filter-status"
                                    className="form-select form-select-sm bg-secondary text-white border-secondary"
                                    value={filter.status || ''}
                                    onChange={(e) => handleFilterChange('status', e.target.value as ActivityStatus)}
                                >
                                    <option value="">Tous</option>
                                    <option value="planifié">Planifié</option>
                                    <option value="confirmé">Confirmé</option>
                                    <option value="annulé">Annulé</option>
                                    <option value="reporté">Reporté</option>
                                    <option value="terminé">Terminé</option>
                                </select>
                            </div>

                            <button
                                className="btn btn-outline-orange btn-sm w-100"
                                onClick={clearFilter}
                            >
                                Effacer les filtres
                            </button>
                        </div>
                    )}

                    {activeSection === 'stats' && (
                        <div>
                            <div className="mb-3">
                                <h6 className="text-orange">Statistiques</h6>
                                <ul className="list-unstyled small">
                                    <li className="mb-1">
                                        <span className="text-muted">Total:</span> 
                                        <span className="float-end fw-bold">{stats.total}</span>
                                    </li>
                                    <li className="mb-1">
                                        <span className="text-muted">Lucas:</span> 
                                        <span className="float-end">{stats.lucas}</span>
                                    </li>
                                    <li className="mb-1">
                                        <span className="text-muted">Léa:</span> 
                                        <span className="float-end">{stats.lea}</span>
                                    </li>
                                    <li className="mb-1">
                                        <span className="text-muted">Confirmés:</span> 
                                        <span className="float-end text-success">{stats.confirmed}</span>
                                    </li>
                                    <li className="mb-1">
                                        <span className="text-muted">Planifiés:</span> 
                                        <span className="float-end text-warning">{stats.planned}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-3">
                                <h6 className="text-orange">Légende des couleurs</h6>
                                <div className="small">
                                    <div className="mb-1">🟠 Orange - Principal</div>
                                    <div className="mb-1">🔵 Bleu - Travail</div>
                                    <div className="mb-1">🟢 Vert - Sport</div>
                                    <div className="mb-1">🟣 Violet - Loisir</div>
                                    <div className="mb-1">🔴 Rouge - Urgent</div>
                                    <div className="mb-1">🟡 Jaune - Personnel</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'profile' && (
                        <div>
                            <div className="mb-3">
                                <h6 className="text-orange">Profil</h6>
                                <div className="small text-muted">
                                    <p>Paramètres et préférences du planning.</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6 className="small text-white">Notifications</h6>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="notif-rappels" defaultChecked />
                                    <label className="form-check-label small" htmlFor="notif-rappels">
                                        Rappels d'activités
                                    </label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6 className="small text-white">Données de test</h6>
                                <button 
                                    className="btn btn-outline-orange btn-sm w-100 mb-2"
                                    onClick={() => loadSampleData(addActivity)}
                                    disabled={activities.length > 0}
                                >
                                    <small>📝 Charger données démo</small>
                                </button>
                            </div>

                            <div className="mb-3">
                                <h6 className="small text-white">Gestion Budget</h6>
                                <button className="btn btn-outline-secondary btn-sm w-100">
                                    <small>💰 Budget (bientôt)</small>
                                </button>
                            </div>

                            <div className="mt-auto">
                                <hr className="border-secondary" />
                                <div className="text-center">
                                    <small className="text-muted">Version 1.0</small>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;