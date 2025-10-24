# Nivelles Station Trains Dashboard

## 🎯 Objectif
Réalisation d’un petit dashboard en **React** permettant d’afficher des informations sur les trains au départ/arrivée de **Nivelles** (ligne Bruxelles–Nivelles et Charleroi–Nivelles), à partir de l’API publique [iRail](https://api.irail.be).

## 📄 Fonctionnalités
- 📊 Tableau des prochains départs de Nivelles (limités aux 2 prochaines heures)  
- ⏱ Affichage du **retard moyen** sur la prochaine heure  
- ❌ Affichage du **taux d’annulation** des trains sur les 3 dernières heures  
- 🕒 Affichage de l’heure en temps réel  

## 🛠 Procédé technique
- Une requête principale pour récupérer les **départs** depuis Nivelles (filtrage côté React).  
- Une requête pour les **arrivées** à Nivelles (utilisée pour calculer les trains annulés).  
- Filtrage en React pour limiter les résultats à la bonne plage horaire (heure courante ± 1h ou 3h).  
- Gestion des erreurs et des requêtes concurrentes.  
- Rafraîchissement automatique toutes les **15 secondes**.  

## 💻 Tech stack
- [React](https://react.dev/)  
- [iRail API](https://api.irail.be)  
- [Tailwind CSS](https://tailwindcss.com/) (bonus, stylisation avec thème sombre et couleurs inspirées de la SNCB).
