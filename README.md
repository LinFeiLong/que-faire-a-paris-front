# Que Faire à Paris

Application web permettant de découvrir et filtrer les événements à Paris en utilisant l'API OpenData Paris.

## Getting Started

Installer et lancer le serveur de développement :

```bash
npm i
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Fonctionnalités actuelles

- Recherche d'événements en temps réel
- Filtres multiples :
  - Période (date de début et fin)
  - Types de tarifs (sélection multiple)
  - Catégories (sélection multiple)
- Page de détail pour chaque événement
- Design responsive avec support du mode sombre
- Recherche avec debounce pour optimiser les performances

## Suggestions d'améliorations

### Optimisation des requêtes avec TanStack Query

L'implémentation actuelle utilise `useEffect` et `useState`. Voici comment on pourrait l'améliorer avec TanStack Query :

```typescript
import { useQuery } from "@tanstack/react-query";

// Définition des clés de requête
const eventKeys = {
  all: ["events"] as const,
  lists: () => [...eventKeys.all, "list"] as const,
  list: (filters: FilterOptions) => [...eventKeys.lists(), filters] as const,
  details: () => [...eventKeys.all, "detail"] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
};

// Hook personnalisé pour la liste d'événements
function useEvents(filters: FilterOptions) {
  return useQuery({
    queryKey: eventKeys.list(filters),
    queryFn: () => fetchEvents(filters),
    staleTime: 5 * 60 * 1000, // Données considérées fraîches pendant 5 minutes
  });
}

// Hook personnalisé pour les détails d'un événement
function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => fetchEventById(id),
    staleTime: 5 * 60 * 1000,
  });
}
```

Avantages de cette approche :

- Cache automatique avec invalidation intelligente
- États de chargement et d'erreur intégrés
- Actualisation automatique en arrière-plan
- Dédoublonnage des requêtes
- Support des mises à jour optimistes
- Facilite l'implémentation de la pagination infinie

### Autres améliorations possibles

#### Performance

- Virtualisation pour les longues listes avec `react-virtual`
- Pagination ou défilement infini
- Service worker pour le support hors-ligne
- Mise en cache des images avec next/image

#### Expérience utilisateur

- Animations avec Framer Motion
- Recherche avancée avec correspondance approximative
- Filtrage par géolocalisation
- Sauvegarde des préférences utilisateur
- Historique des recherches récentes

#### Tests

- Tests unitaires (Jest + React Testing Library)
- Tests E2E (Cypress/Playwright)
- Mock de l'API avec MSW
- Tests de performance avec Lighthouse

#### Architecture

- Gestion des erreurs avec Error Boundaries
- Logging et monitoring
- Alias TypeScript optimisés
- Variables d'environnement sécurisées
- État global avec Zustand ou Jotai

#### SEO & Accessibilité

- Métadonnées dynamiques
- Labels ARIA et navigation clavier
- Balisage schema.org
- Génération de sitemap
- Optimisation des performances Core Web Vitals

## Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- API OpenData Paris - Source des données

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation TanStack Query](https://tanstack.com/query/latest)
- [API OpenData Paris](https://opendata.paris.fr/)
