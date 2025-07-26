#!/bin/bash

DATE=$(date +%F)
STRUCTURE_DIR=./structure_logs
mkdir -p "$STRUCTURE_DIR"
find . -type f | sort > "$STRUCTURE_DIR/full_structure_$DATE.txt"

echo "✅ Structure complète enregistrée dans : $STRUCTURE_DIR/full_structure_$DATE.txt"
