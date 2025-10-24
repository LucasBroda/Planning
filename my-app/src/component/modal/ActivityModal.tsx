import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useActivities, Activity, ActivityType, Person, ActivityColor, ActivityStatus } from '../../contexts/ActivityContext';

interface ActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate?: Date;
    selectedHour?: number;
    editingActivity?: Activity | null;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ 
    isOpen, 
    onClose, 
    selectedDate, 
    selectedHour,
    editingActivity 
}) => {
    const { addActivity, updateActivity } = useActivities();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
        startTime: selectedHour ? `${selectedHour.toString().padStart(2, '0')}:00` : '09:00',
        endTime: selectedHour ? `${(selectedHour + 1).toString().padStart(2, '0')}:00` : '10:00',
        type: 'Autre' as ActivityType,
        person: 'Lucas' as Person,
        color: 'orange' as ActivityColor,
        status: 'planifié' as ActivityStatus,
        notes: ''
    });

    useEffect(() => {
        if (editingActivity) {
            setFormData({
                title: editingActivity.title,
                description: editingActivity.description || '',
                date: editingActivity.date.toISOString().split('T')[0],
                startTime: editingActivity.startTime,
                endTime: editingActivity.endTime,
                type: editingActivity.type,
                person: editingActivity.person,
                color: editingActivity.color,
                status: editingActivity.status,
                notes: editingActivity.notes || ''
            });
        } else if (selectedDate && selectedHour !== undefined) {
            setFormData(prev => ({
                ...prev,
                date: selectedDate.toISOString().split('T')[0],
                startTime: `${selectedHour.toString().padStart(2, '0')}:00`,
                endTime: `${(selectedHour + 1).toString().padStart(2, '0')}:00`
            }));
        }
    }, [editingActivity, selectedDate, selectedHour]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingActivity) {
            updateActivity(editingActivity.id, {
                ...formData,
                date: new Date(formData.date)
            });
        } else {
            addActivity({
                ...formData,
                date: new Date(formData.date)
            });
        }
        
        onClose();
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            startTime: '09:00',
            endTime: '10:00',
            type: 'Autre',
            person: 'Lucas',
            color: 'orange',
            status: 'planifié',
            notes: ''
        });
    };

    const handleClose = () => {
        onClose();
        resetForm();
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content bg-dark text-white">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title text-orange">
                            {editingActivity ? 'Modifier l\'activité' : 'Nouvelle activité'}
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={handleClose}
                        ></button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="activity-title" className="form-label">Titre *</label>
                                        <input
                                            id="activity-title"
                                            type="text"
                                            className="form-control bg-secondary text-white border-secondary"
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="activity-type" className="form-label">Type d'activité</label>
                                        <select
                                            id="activity-type"
                                            className="form-select bg-secondary text-white border-secondary"
                                            value={formData.type}
                                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ActivityType }))}
                                        >
                                            <option value="Cours">Cours</option>
                                            <option value="Sport">Sport</option>
                                            <option value="Taff">Taff</option>
                                            <option value="Anniversaire">Anniversaire</option>
                                            <option value="Loisir">Loisir</option>
                                            <option value="Rendez-vous">Rendez-vous</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="activity-date" className="form-label">Date</label>
                                        <input
                                            id="activity-date"
                                            type="date"
                                            className="form-control bg-secondary text-white border-secondary"
                                            value={formData.date}
                                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="activity-start-time" className="form-label">Heure de début</label>
                                        <input
                                            id="activity-start-time"
                                            type="time"
                                            className="form-control bg-secondary text-white border-secondary"
                                            value={formData.startTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="activity-end-time" className="form-label">Heure de fin</label>
                                        <input
                                            id="activity-end-time"
                                            type="time"
                                            className="form-control bg-secondary text-white border-secondary"
                                            value={formData.endTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="activity-person" className="form-label">Personne</label>
                                        <select
                                            id="activity-person"
                                            className="form-select bg-secondary text-white border-secondary"
                                            value={formData.person}
                                            onChange={(e) => setFormData(prev => ({ ...prev, person: e.target.value as Person }))}
                                        >
                                            <option value="Lucas">Lucas</option>
                                            <option value="Léa">Léa</option>
                                            <option value="Les deux">Les deux</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="activity-color" className="form-label">Couleur</label>
                                        <select
                                            id="activity-color"
                                            className="form-select bg-secondary text-white border-secondary"
                                            value={formData.color}
                                            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value as ActivityColor }))}
                                        >
                                            <option value="orange">🟠 Orange</option>
                                            <option value="blue">🔵 Bleu</option>
                                            <option value="green">🟢 Vert</option>
                                            <option value="purple">🟣 Violet</option>
                                            <option value="red">🔴 Rouge</option>
                                            <option value="yellow">🟡 Jaune</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="activity-status" className="form-label">Statut</label>
                                        <select
                                            id="activity-status"
                                            className="form-select bg-secondary text-white border-secondary"
                                            value={formData.status}
                                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ActivityStatus }))}
                                        >
                                            <option value="planifié">Planifié</option>
                                            <option value="confirmé">Confirmé</option>
                                            <option value="annulé">Annulé</option>
                                            <option value="reporté">Reporté</option>
                                            <option value="terminé">Terminé</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="activity-description" className="form-label">Description</label>
                                <textarea
                                    id="activity-description"
                                    className="form-control bg-secondary text-white border-secondary"
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="activity-notes" className="form-label">Notes</label>
                                <textarea
                                    id="activity-notes"
                                    className="form-control bg-secondary text-white border-secondary"
                                    rows={2}
                                    value={formData.notes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                    placeholder="Notes personnelles..."
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="modal-footer border-secondary">
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-orange"
                            >
                                {editingActivity ? 'Modifier' : 'Ajouter'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ActivityModal;