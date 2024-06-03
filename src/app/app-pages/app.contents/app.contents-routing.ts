import { Routes } from '@angular/router';

export const ContentsRoutes: Routes = [
  {
    path: 'about-dictionary',
    loadComponent: () =>
      import('./about-dictionary/about-dictionary.component').then((c) => c.AboutDictionaryComponent)
  },
  {
    path: 'council-decision',
    loadComponent: () =>
      import('./council-decision/council-decision.component').then((c) => c.CouncilDecisionComponent)
  },
  {
    path: 'dictionary-word',
    loadComponent: () =>
      import('./dictionary-word/dictionary-word.component').then((c) => c.DictionaryWordComponent)
  },
  {
    path: 'standard-guide',
    loadComponent: () =>
      import('./standard-guide/standard-guide.component').then((c) => c.StandardGuideComponent)
  },
  {
    path: 'participants',
    loadComponent: () =>
      import('./participants/participants.component').then((c) => c.ParticipantsComponent)
  },
  {
    path: 'participant-details',
    loadComponent: () =>
      import('./participants/participant-modal/participant-modal.component').then((c) => c.ParticipantModalComponent)
  }
];
