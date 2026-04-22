#!/usr/bin/env bash

# Convert images to AVIF at multiple sizes
# For each image, all sizes are converted in parallel

SOURCE_DIR="$PWD/original-current"
OUTPUT_DIR="$PWD"

# Sizes to generate (width in pixels).
# If you ever change this, then also update the HTML!
SIZES=(400 800 1200 1920 2560)

# Quality setting (1-100, higher = better quality)
QUALITY=80

echo "Converting images from $SOURCE_DIR to $OUTPUT_DIR"

for img in "$SOURCE_DIR"/*; do
    [ -e "$img" ] || continue  # skip if glob matched nothing
    [ -f "$img" ] || continue  # skip subdirectories

    # Get filename without extension
    filename=$(basename "$img")
    name="${filename%.*}"

    echo "Processing: $filename"

    # Start all size conversions in parallel
    pids=()
    for size in "${SIZES[@]}"; do
        output_name="${name}-${size}.avif"
        magick "$img" -resize "${size}x" -quality "$QUALITY" "$OUTPUT_DIR/$output_name" &
        pids+=($!)
        echo "  Started: $output_name (PID: ${pids[-1]})"
    done

    # Wait for all sizes of this image to complete
    for pid in "${pids[@]}"; do
        wait "$pid"
    done

    echo "  Finished: $filename"
    echo ""
done

echo "Done!"