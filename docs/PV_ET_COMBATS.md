# PV et combats — fonctionnement

- `S.hp` représente les PV persistants du chasseur et est enregistré en sauvegarde locale (et dans les exports).
- Les anciennes sauvegardes sans `hp` sont migrées avec les PV maximums de leurs statistiques.
- Les donjons commencent avec `S.hp`, sans guérison automatique. Les dégâts reçus dans les donjons et contre les Boss sont immédiatement conservés.
- À 0 PV, on ne peut ni entrer dans un donjon ni relancer un Boss. Une défaite ne restaure plus les PV.
- Une potion consommée dans l'en-tête hors combat soigne, sans possibilité de dépasser les PV maximums. Le soin en combat est aussi conservé.
- Un entraînement libre commence avec des PV temporaires pleins (sans consommer les PV persistants), et sa réussite restaure **35 PV** permanents (plafonnés au maximum).
- La jauge de frappe distingue visuellement la zone dorée (« Touché ») et la zone verte (« Parfait »). Cliquer sur « Frapper ! » arrête la jauge.
- La couleur visuelle de chaque matière chargée est lue depuis son fichier `js/content/*.js`. Le déblocage manuel reste contrôlé par `js/navigation.js`.

Pour changer les soins d'entraînement, modifier `soinEntrainement()` dans `js/game-engine.js`.
