#!/bin/bash

# ----------- CONFIG -----------
EXPORT_DIR="dev_exports"
NOW=$(date +"%Y-%m-%d_%H%M")
EXPORT_FILE="$EXPORT_DIR/rapport_frontend_${NOW}.txt"   # ← Modifié ici
SRC_DIR="src"

# ----------- PRÉPARATION -----------
mkdir -p "$EXPORT_DIR"
echo "=== RAPPORT COMPLET PROJET oùquandquoi.fr ===" > "$EXPORT_FILE"
echo "Généré le : $(date)" >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- DERNIER COMMIT GIT -----------
echo "----- DERNIER COMMIT GIT -----" >> "$EXPORT_FILE"
if git rev-parse --git-dir > /dev/null 2>&1; then
  git log -1 --pretty=format:"%h | %an | %ad | %s" --date=iso >> "$EXPORT_FILE"
else
  echo "(Pas de dépôt Git initialisé)" >> "$EXPORT_FILE"
fi
echo "" >> "$EXPORT_FILE"

# ----------- FICHIERS .md DANS LE PROJET -----------
echo "----- FICHIERS MARKDOWN (.md) DANS LE PROJET -----" >> "$EXPORT_FILE"
find . -type f -name "*.md" | sort >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- CONFIGURATION (package.json résumé) -----------
echo "----- CONFIGURATION (package.json résumé) -----" >> "$EXPORT_FILE"
if [ -f package.json ]; then
  cat package.json | grep -E '"name"|"version"|"dependencies"|"devDependencies"' | sed 's/^[ \t]*//' >> "$EXPORT_FILE"
fi
echo "" >> "$EXPORT_FILE"

# ----------- FICHIERS DE CONFIG CRITIQUES -----------
echo "----- FICHIERS DE CONFIG CRITIQUES -----" >> "$EXPORT_FILE"
ls -1 *.json *.js *.ts 2>/dev/null | grep -E "package|tsconfig|tailwind|vite|postcss" >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- APERÇU FICHIERS CRITIQUES (10 lignes max) -----------
for config in tailwind.config.ts tailwind.config.js vite.config.ts tsconfig.json postcss.config.js; do
  if [ -f "$config" ]; then
    echo "----- Aperçu de $config (10 premières lignes) -----" >> "$EXPORT_FILE"
    head -10 "$config" >> "$EXPORT_FILE"
    echo "" >> "$EXPORT_FILE"
  fi
done

# ----------- INFOS TAILWIND (VERSION) -----------
echo "----- INFOS TAILWIND (VERSION) -----" >> "$EXPORT_FILE"
npx tailwindcss --version 2>/dev/null || echo "(tailwindcss CLI non trouvée)" >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- ARBORESCENCE COMPLÈTE DE src/ -----------
echo "----- ARBORESCENCE COMPLÈTE DE src/ -----" >> "$EXPORT_FILE"
tree -a "$SRC_DIR" >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- RÉSUMÉ ROUTES/PAGES -----------
echo "----- RÉSUMÉ DES ROUTES/PAGES (React Router) -----" >> "$EXPORT_FILE"
grep -r --include="*.tsx" -E "<Route |Route path=" "$SRC_DIR" | sed -E 's/(.*):[[:space:]]*(.*)/\1 --> \2/' >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- LISTE DES FICHIERS IMPORTANTS -----------
echo "----- LISTE .tsx, .ts, .css, .json, images (src/) -----" >> "$EXPORT_FILE"
find "$SRC_DIR" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.json" -o -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) | sort >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- IMPORTS/EXPORTS -----------
echo "----- TOUS LES IMPORTS/EXPORTS (src/) -----" >> "$EXPORT_FILE"
grep -r --include="*.ts*" --include="*.js*" -E "import |export " "$SRC_DIR" | sort >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- COMPONENTS/CONTEXT/HOOKS EXPORTÉS -----------
echo "----- COMPONENTS/CONTEXT/HOOKS EXPORTÉS -----" >> "$EXPORT_FILE"
grep -r --include="*.tsx" -E "export (default )?(function|const|class|interface) " "$SRC_DIR" | cut -c1-180 >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- INDEX EXPORTS -----------
echo "----- FICHIERS index.ts OU index.tsx (barrel exports) -----" >> "$EXPORT_FILE"
find "$SRC_DIR" -type f \( -name "index.ts" -o -name "index.tsx" \) | sort >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- ASSETS (IMAGES, FONTS, ETC.) -----------
echo "----- ASSETS DANS src/ -----" >> "$EXPORT_FILE"
find "$SRC_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.webp" -o -name "*.ttf" -o -name "*.woff*" \) | sort >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- CSS NON IMPORTÉS (src/) -----------
echo "----- CSS NON IMPORTÉS (src/) -----" >> "$EXPORT_FILE"
ALL_CSS=$(find "$SRC_DIR" -type f -name "*.css" | sort)
USED_CSS=$(grep -rh --include="*.ts*" "import .*.css" "$SRC_DIR" | sed -E "s/.*[\\\"'](.+\\.css)[\\\"'].*/\\1/" | sort | uniq)
for css in $ALL_CSS; do
  base_css=$(basename "$css")
  if ! echo "$USED_CSS" | grep -q "$base_css"; then
    echo "$css" >> "$EXPORT_FILE"
  fi
done
echo "" >> "$EXPORT_FILE"

# ----------- FICHIERS ORPHELINS (non utilisés/importés) -----------
echo "----- FICHIERS ORPHELINS (non importés nulle part) -----" >> "$EXPORT_FILE"
for file in $(find "$SRC_DIR" -type f \( -name "*.tsx" -o -name "*.ts" \)); do
  base=$(basename "$file" .tsx)
  base_noext=$(basename "$file" .ts)
  if [[ "$base" != "main" && "$base" != "index" && "$base_noext" != "main" && "$base_noext" != "index" ]]; then
    if ! grep -rq "$base" "$SRC_DIR"; then
      echo "$file" >> "$EXPORT_FILE"
    fi
  fi
done
echo "" >> "$EXPORT_FILE"

# ----------- ALERTES/TODO/FIXME -----------
echo "----- TODO/ALERTES DÉTECTÉES DANS LE CODE -----" >> "$EXPORT_FILE"
grep -r --include="*.ts*" --include="*.js*" -E "TODO|FIXME|@todo|@fixme" "$SRC_DIR" | cut -c1-180 >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

# ----------- BLOC NOTES SESSION -----------
echo "----- NOTES SESSION (à remplir si besoin) -----" >> "$EXPORT_FILE"
echo "(Laisse ici tes remarques, instructions, ou questions pour la prochaine session ChatGPT)" >> "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

echo "=== FIN DU RAPPORT ===" >> "$EXPORT_FILE"
echo "✅ Rapport généré dans $EXPORT_FILE"
