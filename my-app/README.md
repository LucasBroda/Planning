## Planning des tâches

| Tâche | Statut | Priorité | Assigné à | Date limite |
|-------|--------|----------|-----------|-------------|
| Définir les fonctionnalités pour le planning | ✅ Terminé | Haute | Lucas | TBD |
| Conception du design UI/UX | ⏳ À faire | Haute | Lucas | TBD |
| Sélection des technologies | ⏳ À faire | Moyenne | Lucas | TBD |
| Configuration du déploiement privé | ⏳ À faire | Basse | Lucas | TBD |
| Tests et validation | ⏳ À faire | Moyenne | Lucas | TBD |

### Légende des statuts
- ✅ Terminé
- 🔄 En cours
- ⏳ À faire
- ❌ Bloqué

## Fonctionnalités Planning 

- Ajouter une case dans le calendrier (Cours/Sport/Taff/Anniversaire ...)
- Faire en sorte de pouvoir spécifier l'horaire de l'activité
- Faire en sorte de fournir le calendrier du mois
- Faire en sorte de fournir une charte des couleurs en fonction des activités
- Faire en sorte d'uploud un calendrier déjà présent ? Qui s'ajouterais dans le calendrier déjà existant ?
- Faire un filtre en fonction de la personne ou des activités 
- Pouvoir ajouter des détails sur une activité ou une journée 
- Pouvoir annuler une activité ou la reporter à une autre journée/un autre horaire
- Faire un système de notifications ? 
- Pouvoir modifier le status d'une activité
- Faire en sorte que moi ou Léa puisse mettre une note sur l'activité ou la journée 
- (Optionnel) -> ajouter des outils par rapport à la gestion de notre budget, exemple : faire un tableau où on met notre budget par mois et il fait en sorte de répartir les frais et nous dire combien de sous il nous reste par exemple pour le loisir ou quoi


## Style

- Assez soft, un peu à la Google Calendar mais un peu plus moderne et sombre
- Présentation sous forme de semaine
- Responsive car sera principalement utilisée sous mobile (React ?)
- Ne pas trop surchargé la page ou les fonctionnalités
- Charte graphique avec du orange/blanc


## Choix des technologies

- React car cool pour application mobile avec Vite pour la config car c'est cool et permet de custom la config du projet facilement
- Framework CSS -> Bootstrap


## Décomposition en composants etc 

- Une modale (Avec possibilité de sélectionner la date de l'activité, la durée etc, le type de l'activité etc ...)
- Un composant calendrier header où on affiche seulement les dates du calendrier sous forme jour/mois
- Un composant calendrier body où on appelera la modal pour ajouter une activité
- Un composant nextWeek ou un truc du jour que l'on appelera dans calendrier header qui permet de passer d'une semaine à l'autre
- Un composant sidebar qui sera à droite
- Dans sidebar un composant filter ?
- Des composants respectifs pour gérer les semaines ou les années
- Un composant profil
- Dans profil, des composants par rapport à la gestion du budget, pas prioritaire
- Un composant couleur ? Pour gérer la couleur de l'activité
- CalendarGrid ou WeekView : Le composant principal qui organise les jours
- DayColumn : Composant pour chaque jour de la semaine
- TimeSlot : Composant pour les créneaux horaires dans chaque jour
- ActivityBlock : Composant pour afficher une activité dans le calendrier
- ActivityProvider : Context/Provider pour gérer l'état global des activités
- CalendarProvider : Pour gérer la date courante, la vue (semaine/mois)
