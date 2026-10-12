// Single source of truth for the switchable themes.
// The actual colour values live in app/globals.css (:root[data-theme='…']).
// `swatch` is only used to paint the little picker dots.

export const THEME_KEY = 'rayyan-theme';
export const DEFAULT_THEME = 'aurora';

export const themes = [
  { id: 'aurora', label: 'Aurora', note: 'Violet + cyan', swatch: ['#a78bfa', '#22d3ee'] },
  { id: 'terminal', label: 'Terminal', note: 'Emerald + lime', swatch: ['#34d399', '#bef264'] },
  { id: 'ember', label: 'Ember', note: 'Crimson + amber', swatch: ['#ff4d6d', '#ff9f43'] },
  { id: 'arctic', label: 'Arctic', note: 'Blue + ice', swatch: ['#60a5fa', '#67e8f9'] },
];

export const themeIds = themes.map((t) => t.id);

// Runs before first paint (inline in <head>) so there is never a flash of the wrong theme.
export const themeInitScript = `(function(){try{var ids=${JSON.stringify(themeIds)};var t=localStorage.getItem('${THEME_KEY}');if(ids.indexOf(t)>-1){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`;
