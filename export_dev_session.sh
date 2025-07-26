#!/bin/bash

DATE=$(date +%F)
EXPORT_DIR=./dev_exports
mkdir -p "$EXPORT_DIR"
EXPORT_FILE="$EXPORT_DIR/export_dev_session_$DATE.txt"

echo "===== EXPORT SESSION DEV - $DATE =====" > "$EXPORT_FILE"
echo "" >> "$EXPORT_FILE"

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
    echo "=== $FILE ===" >> "$EXPORT_FILE"
    cat "$FILE" >> "$EXPORT_FILE"
    echo -e "\n\n" >> "$EXPORT_FILE"
  fi
done

STRUCT_FILE="structure_logs/full_structure_$DATE.txt"
if [ -f "$STRUCT_FILE" ]; then
  echo "=== STRUCTURE DU JOUR (50 dernières lignes) ===" >> "$EXPORT_FILE"
  tail -n 50 "$STRUCT_FILE" >> "$EXPORT_FILE"
  echo "" >> "$EXPORT_FILE"
fi

echo "✅ Export sauvegardé dans : $EXPORT_FILE"
