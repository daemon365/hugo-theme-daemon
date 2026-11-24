#!/bin/bash

# Hugo Theme Daemon - Installation Verification Script
# This script checks if the theme is properly installed and configured

set -e

echo "🔍 Hugo Theme Daemon - Installation Check"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Hugo installation
echo "1. Checking Hugo installation..."
if command -v hugo &> /dev/null; then
    HUGO_VERSION=$(hugo version)
    echo -e "${GREEN}✓${NC} Hugo is installed: $HUGO_VERSION"
else
    echo -e "${RED}✗${NC} Hugo is not installed"
    echo "   Please install Hugo: https://gohugo.io/installation/"
    exit 1
fi
echo ""

# Check theme directory
echo "2. Checking theme structure..."
REQUIRED_DIRS=(
    "layouts"
    "layouts/_default"
    "layouts/partials"
    "static"
    "static/css"
    "static/js"
    "exampleSite"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir"
    else
        echo -e "${RED}✗${NC} $dir (missing)"
    fi
done
echo ""

# Check required files
echo "3. Checking required files..."
REQUIRED_FILES=(
    "theme.toml"
    "README.md"
    "LICENSE"
    "layouts/_default/baseof.html"
    "layouts/index.html"
    "static/css/main.css"
    "static/js/main.js"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (missing)"
    fi
done
echo ""

# Check example site
echo "4. Checking example site..."
if [ -f "exampleSite/config.yaml" ]; then
    echo -e "${GREEN}✓${NC} Example site configuration exists"
    
    # Check if theme is properly referenced
    if grep -q "hugo-theme-daemon" exampleSite/config.yaml; then
        echo -e "${GREEN}✓${NC} Theme is properly configured"
    else
        echo -e "${YELLOW}⚠${NC} Theme might not be properly configured in hugo.toml"
    fi
else
    echo -e "${RED}✗${NC} Example site configuration missing"
fi
echo ""

# Try to build example site
echo "5. Testing example site build..."
cd exampleSite 2>/dev/null || {
    echo -e "${RED}✗${NC} Cannot access exampleSite directory"
    exit 1
}

if hugo --themesDir ../.. --quiet 2>&1 | grep -q "Error"; then
    echo -e "${RED}✗${NC} Build failed"
    hugo --themesDir ../..
else
    echo -e "${GREEN}✓${NC} Build successful"
fi

cd ..
echo ""

# Summary
echo "=========================================="
echo -e "${GREEN}Installation check complete!${NC}"
echo ""
echo "📚 Next steps:"
echo "   1. Read README.md for setup instructions"
echo "   2. Test the example site:"
echo "      cd exampleSite"
echo "      hugo server --themesDir ../.. -D"
echo "   3. Customize the theme to your needs"
echo ""
echo "🎉 Enjoy Hugo Theme Daemon!"
