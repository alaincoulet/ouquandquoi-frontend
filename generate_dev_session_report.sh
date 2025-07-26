#!/bin/bash

# === Configuration ===
DATE=$(date +%F)
EXPORT_DIR=./dev_exports
STRUCTURE_DIR=./structure_logs
mkdir -p "$EXPORT_DIR" "$STRUCTURE_DIR"
STRUCTURE_FILE="$STRUCTURE_DIR/full_structure_$DATE.txt"
REPORT_FILE="$EXPORT_DIR/dev_session_$DATE.txt"

# === Génération de la structure complète ===
find . -type f | sort > "$STRUCTURE_FILE"

# === Création du fichier de rapport ===
echo "🧠 Rapport de session de développement — $DATE" > "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# === Liste des fichiers clés à intégrer ===
FILES=(
  "package.json"
  "vite.config.ts"
  "tsconfig.json"
  "tailwind.config.ts"
  "postcss.config.js"
  "src/index.css"
  "src/main.tsx"
  "src/App.tsx"
)

for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "=== $FILE ===" >> "$REPORT_FILE"
    cat "$FILE" >> "$REPORT_FILE"
    echo -e "\n\n" >> "$REPORT_FILE"
  else
    echo "❌ $FILE est introuvable." >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
  fi
done

# === Ajout de la structure complète ===
echo "=== STRUCTURE COMPLÈTE DU PROJET ===" >> "$REPORT_FILE"
cat "$STRUCTURE_FILE" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "✅ Rapport généré : $REPORT_FILE"
