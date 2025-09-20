/**
 * Fretboard Class
 * Handles rendering and interaction with the fretboard diagram
 */
class Fretboard {
    constructor(containerId, musicTheory) {
        this.container = document.getElementById(containerId);
        this.musicTheory = musicTheory;
        this.svg = null;
        
        // Default settings
        this.settings = {
            tuning: ['E', 'B', 'G', 'D', 'A', 'E'], // Reversed tuning order (from high to low)
            startFret: 0,
            endFret: 12,
            stringHeight: 1,
            fretWidth: 1,
            displayMode: 'intervals', // intervals, notes, roman, solfege
            colorTheme: 'default',
            customColors: {},
            fretNumbersPlacement: 'below', // below, above
            fretNumbersPosition: 'center', // center, left, right
            fretNumbersSize: 12, // font size in px
            fretNumbersOffset: 0, // vertical offset in px
            fretMarkersPlacement: 'on', // on, above, below
            fretMarkersOffset: 0, // vertical offset in px
            noteSize: 15, // radius in px
            noteShape: 'circle', // circle, square, diamond, triangle, hexagon
            noteFont: 'Tahoma', // font family
            noteFontSize: 12, // font size in px
            noteEffect: 'none', // none, glow, shadow, outline, highlight
            noteGradient: false, // true to use gradient, false for solid color
            noteOffset: 0, // offset from string position
            visibleStrings: undefined,
            stringStartFrets: undefined,
            stringEndFrets: undefined,
            fretStyle: 'solid',
            stringStyle: undefined,
            stringThickness: undefined,
            stringOpacity: undefined,
            stringEffect: undefined,
            stringGradient: undefined,
        };
        
        // Display state
        this.currentKey = 'C';
        this.currentPatternType = 'scale';
        this.currentPattern = 'major';
        this.activeNotes = [];
        
        // Dimensions
        this.dimensions = {
            width: 1000,
            height: 250,
            margin: {
                top: 40,
                right: 30,
                bottom: 30,
                left: 70
            },
            fretSpacing: 80,
            stringSpacing: 30
        };
        
        this._debouncedRedraw = null;
        
        // Add selection state for multiple notes
        this.selectedMarkers = [];
    }
    
    /**
     * Update settings and redraw the fretboard
     */
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.draw();
    }
    
    /**
     * Update the current musical pattern
     */
    updatePattern(key, patternType, pattern) {
        this.currentKey = key;
        this.currentPatternType = patternType;
        this.currentPattern = pattern;
        
        // Update active notes based on the pattern
        if (patternType === 'scale') {
            this.activeNotes = this.musicTheory.getScaleNotes(key, pattern);
        } else if (patternType === 'chord') {
            this.activeNotes = this.musicTheory.getChordNotes(key, pattern);
        } else if (patternType === 'interval') {
            const targetNote = this.musicTheory.getNoteFromInterval(key, pattern);
            this.activeNotes = [key, targetNote].filter((note, index, self) => self.indexOf(note) === index);
        }
        
        this.draw();
    }
    
    /**
     * Draw the fretboard with current settings
     */
    draw() {
        // Clear previous content
        this.container.innerHTML = '';
        
        // Update dimensions based on number of strings and frets
        const stringCount = this.settings.tuning.length;
        const fretCount = this.settings.endFret - this.settings.startFret + 1;
        
        this.dimensions.height = Math.max(150, stringCount * this.dimensions.stringSpacing + 60);
        this.dimensions.width = Math.max(100, fretCount * this.dimensions.fretSpacing + 100);
        
        // Create SVG element
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('class', 'fretboard-svg');
        this.svg.setAttribute('viewBox', `0 0 ${this.dimensions.width} ${this.dimensions.height}`);
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute("tabindex", "0");
        this.svg.setAttribute("role", "img");
        this.svg.setAttribute("aria-label", "Fretboard diagram for key " + this.currentKey + ", pattern " + this.currentPattern);
        this.container.appendChild(this.svg);
        
        // Attach event listener for scroll
        this.container.addEventListener("scroll", this.debouncedRedrawNotes.bind(this));
        
        // Draw the components
        this.drawFretboard();
        this.drawNotes();
    }
    
    /**
     * Draw the basic fretboard structure (strings, frets, markers)
     */
    drawFretboard() {
        // Adjust fret spacing and string spacing based on viewport width for responsive design
        if (window.innerWidth < 600) {
            this.dimensions.fretSpacing = 40;
            this.dimensions.stringSpacing = 20;
        } else {
            this.dimensions.fretSpacing = 80;
            this.dimensions.stringSpacing = 30;
        }
        const { width, height, margin, fretSpacing, stringSpacing } = this.dimensions;
        const { startFret, endFret, tuning, stringHeight, fretWidth, fretNumbersPlacement, fretNumbersPosition, 
                fretNumbersSize, fretNumbersOffset, fretStyle } = this.settings;
        const stringCount = tuning.length;
        
        // Get colors from theme
        const colors = this.getThemeColors();
        
        // Update string spacing from settings if available
        if (this.settings.stringSpacing) {
            this.dimensions.stringSpacing = this.settings.stringSpacing;
        }
        
        // Draw the fretboard background
        const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        background.setAttribute('x', margin.left);
        background.setAttribute('y', margin.top);
        background.setAttribute('width', width - margin.left - margin.right);
        background.setAttribute('height', (stringCount - 1) * this.dimensions.stringSpacing + 10);
        background.setAttribute('fill', colors.background);
        background.setAttribute('rx', '5');
        this.svg.appendChild(background);
        
        // Draw strings
        for (let i = 0; i < stringCount; i++) {
            const y = margin.top + i * this.dimensions.stringSpacing;
            const string = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            string.setAttribute('class', 'string');
            string.setAttribute('x1', margin.left);
            string.setAttribute('y1', y);
            string.setAttribute('x2', width - margin.right);
            string.setAttribute('y2', y);
            
            // Get string thickness directly from settings - use stringHeight as the primary thickness control
            const stringThickness = this.settings.stringHeight; 
            
            // Apply string style
            if (this.settings.stringStyle) {
                switch (this.settings.stringStyle) {
                    case 'dashed':
                        string.setAttribute('stroke-dasharray', '8,4');
                        break;
                    case 'dotted':
                        string.setAttribute('stroke-dasharray', '2,2');
                        break;
                    case 'double':
                        // For double, we just make it thicker
                        string.setAttribute('stroke-width', stringThickness * 1.5);
                        // Add a second thinner line below for double effect
                        const doubleString = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        doubleString.setAttribute('x1', margin.left);
                        doubleString.setAttribute('y1', y + 2);
                        doubleString.setAttribute('x2', width - margin.right);
                        doubleString.setAttribute('y2', y + 2);
                        doubleString.setAttribute('stroke', colors.strings);
                        doubleString.setAttribute('stroke-width', stringThickness * 0.5);
                        this.svg.appendChild(doubleString);
                        break;
                    case 'longDash':
                        string.setAttribute('stroke-dasharray', '15,5');
                        break;
                    case 'shortDash':
                        string.setAttribute('stroke-dasharray', '5,3');
                        break;
                    case 'dashDot':
                        string.setAttribute('stroke-dasharray', '8,3,1,3');
                        break;
                    case 'dashDotDot':
                        string.setAttribute('stroke-dasharray', '8,3,1,3,1,3');
                        break;
                    case 'wave':
                        // Create a wavy string using a path instead of a line
                        const wavePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        const amplitude = stringThickness * 2;
                        const frequency = 20;
                        let d = `M ${margin.left} ${y}`;
                        
                        for (let i = margin.left; i <= width - margin.right; i += 5) {
                            const yOffset = amplitude * Math.sin((i - margin.left) / frequency);
                            d += ` L ${i} ${y + yOffset}`;
                        }
                        
                        wavePath.setAttribute('d', d);
                        wavePath.setAttribute('fill', 'none');
                        wavePath.setAttribute('stroke', colors.strings);
                        wavePath.setAttribute('stroke-width', stringThickness);
                        this.svg.appendChild(wavePath);
                        return; // Skip the original string
                    case 'zigzag':
                        // Create a zigzag string using a path
                        const zigzagPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        const zHeight = stringThickness * 2;
                        const zWidth = 10;
                        let zd = `M ${margin.left} ${y}`;
                        
                        for (let i = margin.left + zWidth; i <= width - margin.right; i += zWidth * 2) {
                            zd += ` H ${i} V ${y + zHeight} H ${i + zWidth} V ${y}`;
                        }
                        
                        zigzagPath.setAttribute('d', zd);
                        zigzagPath.setAttribute('fill', 'none');
                        zigzagPath.setAttribute('stroke', colors.strings);
                        zigzagPath.setAttribute('stroke-width', stringThickness);
                        this.svg.appendChild(zigzagPath);
                        return; // Skip the original string
                    case 'textured':
                        // Create a textured line with short dashes and varying offset
                        this.svg.appendChild(string);
                        
                        const textureCount = 100;
                        for (let i = 0; i < textureCount; i++) {
                            const dash = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            const dashX = margin.left + (width - margin.left - margin.right) * (i / textureCount);
                            const dashOffset = (Math.random() - 0.5) * stringThickness * 2;
                            
                            dash.setAttribute('x1', dashX);
                            dash.setAttribute('y1', y + dashOffset);
                            dash.setAttribute('x2', dashX + 3);
                            dash.setAttribute('y2', y + dashOffset);
                            dash.setAttribute('stroke', colors.strings);
                            dash.setAttribute('stroke-width', stringThickness * 0.7);
                            
                            this.svg.appendChild(dash);
                        }
                        return; // Skip further processing
                    case 'spiral':
                        // Create a spiral wrapping effect
                        const spiralPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        const spiralFreq = 12;
                        const spiralAmp = stringThickness * 1.5;
                        
                        let spiralD = `M ${margin.left} ${y}`;
                        for (let i = margin.left; i <= width - margin.right; i += 2) {
                            const phase = (i - margin.left) / spiralFreq;
                            const yOffset = spiralAmp * Math.sin(phase);
                            const xOffset = spiralAmp * Math.cos(phase) * 0.3;
                            
                            spiralD += ` L ${i + xOffset} ${y + yOffset}`;
                        }
                        
                        spiralPath.setAttribute('d', spiralD);
                        spiralPath.setAttribute('fill', 'none');
                        spiralPath.setAttribute('stroke', colors.strings);
                        spiralPath.setAttribute('stroke-width', stringThickness);
                        this.svg.appendChild(spiralPath);
                        return; // Skip the original string
                    case 'dual-color':
                        // Create a dual-colored string
                        const dualColor1 = colors.strings;
                        const dualColor2 = this.lightenColor(colors.strings, 30);
                        
                        // First half
                        const dualString1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        dualString1.setAttribute('x1', margin.left);
                        dualString1.setAttribute('y1', y);
                        dualString1.setAttribute('x2', margin.left + (width - margin.left - margin.right) / 2);
                        dualString1.setAttribute('y2', y);
                        dualString1.setAttribute('stroke', dualColor1);
                        dualString1.setAttribute('stroke-width', stringThickness);
                        
                        // Second half
                        const dualString2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        dualString2.setAttribute('x1', margin.left + (width - margin.left - margin.right) / 2);
                        dualString2.setAttribute('y1', y);
                        dualString2.setAttribute('x2', width - margin.right);
                        dualString2.setAttribute('y2', y);
                        dualString2.setAttribute('stroke', dualColor2);
                        dualString2.setAttribute('stroke-width', stringThickness);
                        
                        this.svg.appendChild(dualString1);
                        this.svg.appendChild(dualString2);
                        return; // Skip the original string
                    case 'celtic':
                        // Create a celtic knot pattern
                        const celticPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        const knotSize = stringThickness * 3;
                        const knotSpacing = knotSize * 5;
                        
                        let celticD = `M ${margin.left} ${y}`;
                        
                        for (let i = margin.left + knotSpacing; i < width - margin.right; i += knotSpacing) {
                            celticD += ` L ${i - knotSize} ${y}`;
                            // Draw a simple knot
                            celticD += ` C ${i - knotSize/2} ${y - knotSize}, ${i + knotSize/2} ${y - knotSize}, ${i + knotSize} ${y}`;
                            celticD += ` C ${i + knotSize/2} ${y + knotSize}, ${i - knotSize/2} ${y + knotSize}, ${i - knotSize} ${y}`;
                        }
                        
                        // Add remaining straight section
                        celticD += ` L ${width - margin.right} ${y}`;
                        
                        celticPath.setAttribute('d', celticD);
                        celticPath.setAttribute('fill', 'none');
                        celticPath.setAttribute('stroke', colors.strings);
                        celticPath.setAttribute('stroke-width', stringThickness * 0.7);
                        this.svg.appendChild(celticPath);
                        return; // Skip the original string
                    case 'flame':
                        // Create a flame-like wavy pattern
                        const flamePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        const flameFreq = 30;
                        const flameAmp = stringThickness * 3;
                        
                        let flameD = `M ${margin.left} ${y}`;
                        for (let i = margin.left; i <= width - margin.right; i += 2) {
                            const phase = (i - margin.left) / flameFreq;
                            const yOffset = flameAmp * Math.sin(phase);
                            const xOffset = flameAmp * Math.cos(phase) * 0.3;
                            
                            flameD += ` L ${i + xOffset} ${y + yOffset}`;
                        }
                        
                        flamePath.setAttribute('d', flameD);
                        flamePath.setAttribute('fill', 'none');
                        flamePath.setAttribute('stroke', colors.strings);
                        flamePath.setAttribute('stroke-width', stringThickness);
                        
                        // Add a glow filter
                        const flameFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                        const flameFilterId = `flame-filter-${Math.random().toString(36).substring(2, 9)}`;
                        flameFilter.setAttribute('id', flameFilterId);
                        
                        const flameBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
                        flameBlur.setAttribute('stdDeviation', '1.5');
                        flameBlur.setAttribute('result', 'blur');
                        
                        flameFilter.appendChild(flameBlur);
                        
                        const defsFl = this.svg.querySelector('defs') || 
                                    this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
                        defsFl.appendChild(flameFilter);
                        
                        flamePath.setAttribute('filter', `url(#${flameFilterId})`);
                        this.svg.appendChild(flamePath);
                        return; // Skip the original string
                }
            }
            
            string.setAttribute('stroke', colors.strings);
            string.setAttribute('stroke-width', stringThickness);
            
            // Apply string effects
            if (this.settings.stringEffect) {
                switch (this.settings.stringEffect) {
                    case 'glow':
                        this.applyGlowEffect(string, colors.strings);
                        break;
                    case 'shadow':
                        this.applyShadowEffect(string);
                        break;
                    case 'highlight':
                        // Add a highlight line above the string
                        const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        highlight.setAttribute('x1', margin.left);
                        highlight.setAttribute('y1', y - 1);
                        highlight.setAttribute('x2', width - margin.right);
                        highlight.setAttribute('y2', y - 1);
                        highlight.setAttribute('stroke', this.lightenColor(colors.strings, 50));
                        highlight.setAttribute('stroke-width', 1);
                        highlight.setAttribute('stroke-opacity', 0.5);
                        this.svg.appendChild(highlight);
                        break;
                    case 'metallic':
                        // Create a metallic effect with multiple gradient lines
                        this.applyMetallicEffect(string, y, margin.left, width - margin.right, colors.strings);
                        break;
                }
            }
            
            this.svg.appendChild(string);
            
            // String labels (tuning)
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('class', 'string-label');
            label.setAttribute('x', margin.left - 10);
            label.setAttribute('y', y + 5);
            label.textContent = tuning[i];
            this.svg.appendChild(label);
        }
        
        // Draw frets
        for (let i = 0; i <= endFret - startFret; i++) {
            const x = margin.left + i * fretSpacing;
            const fret = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            fret.setAttribute('class', 'fret');
            fret.setAttribute('x1', x);
            fret.setAttribute('y1', margin.top);
            fret.setAttribute('x2', x);
            fret.setAttribute('y2', margin.top + (stringCount - 1) * this.dimensions.stringSpacing);
            fret.setAttribute('stroke', colors.frets);
            fret.setAttribute('stroke-width', fretWidth); // Use fretWidth directly
            
            // Apply fret style if specified
            if (fretStyle && fretStyle !== 'solid') {
                this.applyFretStyle(fret, fretStyle, colors);
            }
            
            this.svg.appendChild(fret);
            
            // Fret numbers
            const fretNumber = startFret + i;
            if (fretNumber > 0) {
                const number = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                number.setAttribute('class', 'fret-number');
                
                // Determine x position based on position setting
                let xPos = x - fretSpacing/2; // Default center
                if (fretNumbersPosition === 'left') {
                    xPos = x - fretSpacing + 10;
                } else if (fretNumbersPosition === 'right') {
                    xPos = x - 10;
                }
                
                // Determine y position based on placement setting
                let yPos;
                if (fretNumbersPlacement === 'above') {
                    yPos = margin.top - 10 + fretNumbersOffset;
                    number.setAttribute('text-anchor', fretNumbersPosition === 'center' ? 'middle' : 
                                                      fretNumbersPosition === 'left' ? 'start' : 'end');
                } else { // Below
                    const stringCount = this.settings.tuning.length;
                    yPos = margin.top + stringCount * this.dimensions.stringSpacing + 20 + fretNumbersOffset;
                    number.setAttribute('text-anchor', fretNumbersPosition === 'center' ? 'middle' : 
                                                      fretNumbersPosition === 'left' ? 'start' : 'end');
                }
                
                number.setAttribute('x', xPos);
                number.setAttribute('y', yPos);
                number.setAttribute('font-size', `${fretNumbersSize}px`);
                number.textContent = fretNumber;
                this.svg.appendChild(number);
            }
        }
        
        // Draw the last fret boundary explicitly
        const lastFretX = margin.left + (endFret - startFret + 1) * fretSpacing;
        const lastFret = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lastFret.setAttribute('class', 'fret');
        lastFret.setAttribute('x1', lastFretX);
        lastFret.setAttribute('y1', margin.top);
        lastFret.setAttribute('x2', lastFretX);
        lastFret.setAttribute('y2', margin.top + (stringCount - 1) * this.dimensions.stringSpacing);
        lastFret.setAttribute('stroke', colors.frets);
        lastFret.setAttribute('stroke-width', fretWidth); // Use fretWidth directly
        this.svg.appendChild(lastFret);
        
        // Draw fret markers (dots at frets 3, 5, 7, 9, 12, etc.)
        const markerFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
        for (let fret of markerFrets) {
            if (fret >= startFret && fret <= endFret) {
                const fretPosition = fret - startFret;
                const x = margin.left + fretPosition * fretSpacing - fretSpacing/2;
                
                // Determine y position based on fret markers placement setting
                let y;
                if (this.settings.fretMarkersPlacement === 'above') {
                    y = margin.top - 15;
                } else if (this.settings.fretMarkersPlacement === 'below') {
                    const stringCount = this.settings.tuning.length;
                    y = margin.top + stringCount * this.dimensions.stringSpacing + 15;
                } else { // On
                    y = margin.top + (stringCount - 1) * this.dimensions.stringSpacing / 2;
                }
                
                if (fret === 12 || fret === 24) {
                    // Double dot markers
                    const spacing = stringCount > 3 ? this.dimensions.stringSpacing : 10;
                    y = margin.top + (stringCount - 1) * this.dimensions.stringSpacing / 2;
                    
                    this.drawFretMarker(x, y - spacing/2, colors.markers);
                    this.drawFretMarker(x, y + spacing/2, colors.markers);
                } else {
                    // Single dot markers
                    this.drawFretMarker(x, y, colors.markers);
                }
            }
        }
    }
    
    /**
     * Draw a fret marker (dot)
     */
    drawFretMarker(x, y, color) {
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        marker.setAttribute('class', 'fret-marker');
        marker.setAttribute('cx', x);
        marker.setAttribute('cy', y);
        marker.setAttribute('r', 5);
        marker.setAttribute('fill', color);
        this.svg.appendChild(marker);
    }
    
    /**
     * Draw notes on the fretboard
     */
    drawNotes() {
        const { margin, fretSpacing, stringSpacing } = this.dimensions;
        const { startFret, endFret, tuning, displayMode, visibleStrings, stringStartFrets, stringEndFrets } = this.settings;
        const colors = this.getThemeColors();
        
        // For each string and fret, check if there's a note to display
        for (let stringIndex = 0; stringIndex < tuning.length; stringIndex++) {
            // Skip if this string is set to not show notes
            if (visibleStrings && visibleStrings[stringIndex] === false) {
                continue; // Skip showing notes but the string itself is still drawn in drawFretboard
            }
            
            const openStringNote = tuning[stringIndex];
            const stringY = margin.top + stringIndex * this.dimensions.stringSpacing;
            
            // Get the start and end frets for this specific string, or use the global settings
            const stringStart = stringStartFrets && stringStartFrets[stringIndex] !== undefined ? 
                stringStartFrets[stringIndex] : startFret;
                
            const stringEnd = stringEndFrets && stringEndFrets[stringIndex] !== undefined ? 
                stringEndFrets[stringIndex] : endFret;
            
            for (let fretNum = stringStart; fretNum <= stringEnd; fretNum++) {
                // Skip if outside the global fretboard range
                if (fretNum < startFret || fretNum > endFret) continue;
                
                const fretX = margin.left + (fretNum - startFret) * fretSpacing - fretSpacing/2;
                
                // Calculate the note at this position
                const noteIndex = (this.musicTheory.notes.indexOf(openStringNote) + fretNum) % 12;
                const note = this.musicTheory.notes[noteIndex];
                
                // Check if this note is in our active notes list
                if (this.activeNotes.includes(note)) {
                    // Determine what text and color to display based on the display mode
                    let displayText = note;
                    let fillColor = '#3498db';
                    
                    if (displayMode === 'intervals') {
                        let interval = null;
                        if (this.currentPatternType === 'scale') {
                            const scaleData = this.musicTheory.scales[this.currentPattern];
                            if (scaleData) {
                                const scaleNotes = this.musicTheory.getScaleNotes(this.currentKey, this.currentPattern);
                                const notePosition = scaleNotes.indexOf(note);
                                if (notePosition !== -1) {
                                    interval = scaleData.intervals[notePosition];
                                }
                            }
                        } else if (this.currentPatternType === 'chord') {
                            const chordData = this.musicTheory.chords[this.currentPattern];
                            if (chordData) {
                                const chordNotes = this.musicTheory.getChordNotes(this.currentKey, this.currentPattern);
                                const notePosition = chordNotes.indexOf(note);
                                if (notePosition !== -1) {
                                    interval = chordData.intervals[notePosition];
                                }
                            }
                        } else if (this.currentPatternType === 'interval') {
                            if (note === this.currentKey) {
                                interval = '1';
                            } else {
                                interval = this.currentPattern;
                            }
                        }
                        
                        if (interval && this.musicTheory.intervals[interval]) {
                            displayText = this.musicTheory.intervals[interval].shortName;
                            fillColor = colors.intervals && colors.intervals[interval] ? 
                                colors.intervals[interval] : 
                                (this.musicTheory.intervals[interval].color || '#3498db');
                        } else {
                            const calculatedInterval = this.musicTheory.getInterval(this.currentKey, note);
                            if (calculatedInterval && this.musicTheory.intervals[calculatedInterval]) {
                                displayText = this.musicTheory.intervals[calculatedInterval].shortName;
                                fillColor = colors.intervals && colors.intervals[calculatedInterval] ? 
                                    colors.intervals[calculatedInterval] : 
                                    (this.musicTheory.intervals[calculatedInterval].color || '#3498db');
                            }
                        }
                    } else if (displayMode === 'notes') {
                        displayText = this.getProperNoteSpelling(note, this.currentKey, this.currentPatternType, this.currentPattern);
                        const interval = this.musicTheory.getInterval(this.currentKey, note);
                        if (interval && this.musicTheory.intervals[interval]) {
                            fillColor = colors.intervals && colors.intervals[interval] ? 
                                colors.intervals[interval] : 
                                (this.musicTheory.intervals[interval].color || '#3498db');
                        }
                    } else if (displayMode === 'roman') {
                        const scaleNotes = this.musicTheory.getScaleNotes(this.currentKey, 'major');
                        const degreeIndex = scaleNotes.indexOf(note);
                        if (degreeIndex !== -1) {
                            displayText = this.musicTheory.getRomanNumeral(degreeIndex + 1, true);
                            const intervals = this.musicTheory.scales['major'].intervals;
                            const interval = intervals[degreeIndex];
                            fillColor = colors.intervals && colors.intervals[interval] ? 
                                colors.intervals[interval] : 
                                (this.musicTheory.intervals[interval]?.color || '#3498db');
                        }
                    } else if (displayMode === 'solfege') {
                        const properNote = this.getProperNoteSpelling(note, this.currentKey, this.currentPatternType, this.currentPattern);
                        displayText = this.musicTheory.solfege[properNote] || properNote;
                        const interval = this.musicTheory.getInterval(this.currentKey, note);
                        if (interval && this.musicTheory.intervals[interval]) {
                            fillColor = colors.intervals && colors.intervals[interval] ? 
                                colors.intervals[interval] : 
                                (this.musicTheory.intervals[interval].color || '#3498db');
                        }
                    }
                    
                    this.drawNoteMarker(fretX, stringY, fillColor, displayText);
                }
            }
        }
    }
    
    /**
     * Draw a note marker on the fretboard
     */
    drawNoteMarker(x, y, color, text) {
        const markerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        markerGroup.setAttribute('class', 'note-marker-group');
        markerGroup.setAttribute('data-note-text', text);
        this.svg.appendChild(markerGroup);
        
        // Apply offset to y position if set
        y = y + this.settings.noteOffset;
        
        // Create marker shape based on settings
        let marker;
        const size = this.settings.noteSize;
        
        // Create gradient if enabled
        let fillValue = color;
        if (this.settings.noteGradient) {
            const gradientId = `gradient-${text}-${Math.random().toString(36).substring(2, 9)}`;
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
            gradient.setAttribute('id', gradientId);
            gradient.setAttribute('cx', '50%');
            gradient.setAttribute('cy', '50%');
            gradient.setAttribute('r', '50%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', this.lightenColor(color, 30));
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', color);
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            
            const defs = this.svg.querySelector('defs') || 
                          this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
            defs.appendChild(gradient);
            
            fillValue = `url(#${gradientId})`;
        }
        
        // Draw the requested shape
        switch (this.settings.noteShape) {
            case 'square':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                marker.setAttribute('x', x - size);
                marker.setAttribute('y', y - size);
                marker.setAttribute('width', size * 2);
                marker.setAttribute('height', size * 2);
                break;
                
            case 'diamond':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', 
                    `${x},${y-size} ${x+size},${y} ${x},${y+size} ${x-size},${y}`);
                break;
                
            case 'triangle':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', 
                    `${x},${y-size} ${x+size},${y+size} ${x-size},${y+size}`);
                break;
                
            case 'hexagon':
                const hexPoints = [];
                for (let i = 0; i < 6; i++) {
                    const angle = (i * 60) * Math.PI / 180;
                    hexPoints.push(`${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`);
                }
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', hexPoints.join(' '));
                break;
                
            case 'star':
                const starPoints = [];
                for (let i = 0; i < 10; i++) {
                    const angle = (i * 36) * Math.PI / 180;
                    const radius = i % 2 === 0 ? size : size / 2;
                    starPoints.push(`${x + radius * Math.sin(angle)},${y - radius * Math.cos(angle)}`);
                }
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', starPoints.join(' '));
                break;
                
            case 'pentagon':
                const pentPoints = [];
                for (let i = 0; i < 5; i++) {
                    const angle = ((i * 72) - 90) * Math.PI / 180;
                    pentPoints.push(`${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`);
                }
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', pentPoints.join(' '));
                break;
                
            case 'octagon':
                const octPoints = [];
                for (let i = 0; i < 8; i++) {
                    const angle = (i * 45) * Math.PI / 180;
                    octPoints.push(`${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`);
                }
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', octPoints.join(' '));
                break;
                
            case 'parallelogram':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', 
                    `${x-size},${y-size*0.7} ${x+size*1.5},${y-size*0.7} ${x+size},${y+size*0.7} ${x-size*1.5},${y+size*0.7}`);
                break;
                
            case 'trapezoid':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', 
                    `${x-size*1.2},${y+size*0.8} ${x+size*1.2},${y+size*0.8} ${x+size*0.8},${y-size*0.8} ${x-size*0.8},${y-size*0.8}`);
                break;
                
            case 'semicircle':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size} ${y} A ${size} ${size} 0 0 1 ${x+size} ${y} L ${x} ${y+size} Z`);
                break;
                
            case 'crescent':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x} ${y-size} A ${size} ${size} 0 0 1 ${x} ${y+size} A ${size*0.6} ${size} 0 0 0 ${x} ${y-size} Z`);
                break;
                
            case 'ring':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size} ${y} A ${size} ${size} 0 1 0 ${x+size} ${y} A ${size} ${size} 0 1 0 ${x-size} ${y} Z 
                                         M ${x-size/2} ${y} A ${size/2} ${size/2} 0 1 0 ${x+size/2} ${y} A ${size/2} ${size/2} 0 1 0 ${x-size/2} ${y} Z`);
                break;
                
            case 'crosshair':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', size);
                circle.setAttribute('fill', fillValue);
                
                const lines = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                lines.setAttribute('d', `M ${x-size} ${y} H ${x+size} M ${x} ${y-size} V ${y+size}`);
                lines.setAttribute('stroke', this.getContrastColor(fillValue));
                lines.setAttribute('stroke-width', size/6);
                
                marker.appendChild(circle);
                marker.appendChild(lines);
                break;
                
            case 'donut':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size} ${y} A ${size} ${size} 0 0 1 ${x+size} ${y} A ${size*0.6} ${size} 0 0 0 ${x} ${y-size} Z 
                                         M ${x-size/2} ${y} A ${size/2} ${size/2} 0 1 1 ${x+size/2} ${y} A ${size/2} ${size/2} 0 1 1 ${x-size/2} ${y} Z`);
                break;
                
            case 'clover':
                const cloverPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const r = size * 0.6;
                cloverPath.setAttribute('d', `M ${x} ${y-r} A ${r} ${r} 0 0 1 ${x} ${y+r} A ${r*0.6} ${r} 0 0 0 ${x} ${y-r} Z`);
                return cloverPath;
                
            case 'flower':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const petalSize = size * 0.7;
                marker.setAttribute('d', `M ${x} ${y-size} 
                                         C ${x+petalSize} ${y-petalSize}, ${x+petalSize} ${y-petalSize}, ${x+size} ${y}`);
                break;
                
            case 'shield':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x} ${y+size*1.2} C ${x-size*1.2} ${y+size*0.5}, ${x-size*1.2} ${y-size*0.8}, ${x} ${y-size}
                                         C ${x+size*1.2} ${y-size*0.8}, ${x+size*1.2} ${y+size*0.5}, ${x} ${y+size*1.2} Z`);
                break;
                
            case 'crown':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size} ${y-size} L ${x-size*0.5} ${y} L ${x} ${y} L ${x+size*0.5} ${y} L ${x+size} ${y-size} Z`);
                break;
                
            case 'droplet':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x} ${y+size} C ${x+size} ${y}, ${x+size} ${y-size*0.5}, ${x} ${y-size}
                                         C ${x-size} ${y-size*0.5}, ${x-size} ${y}, ${x} ${y+size} Z`);
                break;
                
            case 'cloud':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size*0.2} ${y+size*0.5} 
                                         C ${x-size} ${y+size*0.5}, ${x-size} ${y}, ${x-size*0.5} ${y}
                                         C ${x-size*0.5} ${y-size*0.8}, ${x+size*0.2} ${y-size*0.8}, ${x+size*0.3} ${y-size*0.3}
                                         C ${x+size} ${y-size*0.3}, ${x+size} ${y+size*0.3}, ${x+size*0.3} ${y+size*0.3}
                                         C ${x+size*0.3} ${y+size*0.5}, ${x-size*0.2} ${y+size*0.5}, ${x-size*0.2} ${y+size*0.5} Z`);
                break;
                
            case 'starburst':
                const burstPoints = [];
                for (let i = 0; i < 16; i++) {
                    const angle = (i * 22.5) * Math.PI / 180;
                    const radius = i % 2 === 0 ? size : size * 0.4;
                    burstPoints.push(`${x + radius * Math.cos(angle)},${y + radius * Math.sin(angle)}`);
                }
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', burstPoints.join(' '));
                break;
                
            case 'gear':
                const gearPoints = [];
                const gearCount = 10;
                for (let i = 0; i < gearCount * 2; i++) {
                    const angle = ((i * 180) / gearCount) * Math.PI / 180;
                    const radius = i % 2 === 0 ? size : size * 0.7;
                    gearPoints.push(`${x + radius * Math.cos(angle)},${y + radius * Math.sin(angle)}`);
                }
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                marker.setAttribute('points', gearPoints.join(' '));
                break;
                
            case 'cube':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const cubeSize = size * 0.7;
                const cubeD = `M ${x-cubeSize} ${y-cubeSize/2} L ${x+cubeSize} ${y-cubeSize/2} L ${x+cubeSize} ${y+cubeSize} L ${x-cubeSize} ${y+cubeSize} Z 
                                         M ${x+cubeSize} ${y-cubeSize/2} L ${x+cubeSize*1.5} ${y-cubeSize} L ${x+cubeSize*1.5} ${y+cubeSize/2} L ${x+cubeSize} ${y+cubeSize} Z
                                         M ${x-cubeSize} ${y-cubeSize/2} L ${x-cubeSize+cubeSize/2} ${y-cubeSize} L ${x+cubeSize*1.5} ${y-cubeSize} L ${x+cubeSize} ${y-cubeSize/2} Z`;
                marker.setAttribute('d', cubeD);
                break;
                
            case 'moon':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x} ${y-size} A ${size} ${size} 0 0 1 ${x} ${y+size} A ${size*0.6} ${size} 0 0 0 ${x} ${y-size} Z`);
                break;
                
            case 'sun':
                const sunGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                const sunCenter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                sunCenter.setAttribute('cx', x);
                sunCenter.setAttribute('cy', y);
                sunCenter.setAttribute('r', size*0.6);
                sunCenter.setAttribute('fill', fillValue);
                
                const rays = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                for (let i = 0; i < 8; i++) {
                    const angle = (i * 45) * Math.PI / 180;
                    const ray = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    ray.setAttribute('x1', x + (size*0.7) * Math.cos(angle));
                    ray.setAttribute('y1', y + (size*0.7) * Math.sin(angle));
                    ray.setAttribute('x2', x + size * Math.cos(angle));
                    ray.setAttribute('y2', y + size * Math.sin(angle));
                    ray.setAttribute('stroke', fillValue);
                    ray.setAttribute('stroke-width', size/4);
                    
                    rays.appendChild(ray);
                }
                
                sunGroup.appendChild(rays);
                sunGroup.appendChild(sunCenter);
                return sunGroup;
                
            case 'flag':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size} ${y-size} V ${y+size} M ${x-size} ${y-size} L ${x+size} ${y} L ${x-size} ${y} Z`);
                marker.setAttribute('stroke', fillValue);
                marker.setAttribute('stroke-width', size/6);
                marker.setAttribute('fill', fillValue);
                break;
                
            case 'ribbon':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size} ${y-size} H ${x+size*0.7} L ${x+size} ${y} L ${x+size*0.7} ${y+size} H ${x-size} Z 
                                         M ${x-size*0.4} ${y} A ${size*0.3} ${size*0.3} 0 1 0 ${x-size*0.4} ${y+size*0.01} Z`);
                break;
                
            case 'bookmark':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size*0.7} ${y-size} H ${x+size*0.7} V ${y+size} L ${x} ${y+size*0.5} L ${x-size*0.7} ${y+size} Z`);
                break;
                
            case 'lightning':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x} ${y-size} L ${x-size*0.5} ${y} H ${x-size*0.2} L ${x} ${y+size} L ${x+size*0.5} ${y} H ${x+size*0.2} Z`);
                break;
                
            case 'key':
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.setAttribute('d', `M ${x-size*0.8} ${y} A ${size*0.8} ${size*0.8} 0 1 0 ${x} ${y+size*0.8} L ${x} ${y-size*0.4} H ${x+size*0.3} V ${y-size*0.2} H ${x} L ${x} ${y-size*0.4} V ${y+size*0.8} Z`);
                break;
                
            case 'circle':
            default:
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker.setAttribute('cx', x);
                marker.setAttribute('cy', y);
                marker.setAttribute('r', size);
                break;
        }
        
        // Common marker attributes
        if (marker) {
            marker.setAttribute('class', 'note-marker');
            marker.setAttribute('fill', fillValue);
            marker.setAttribute('stroke', '#000');
            marker.setAttribute('stroke-width', 1);
            marker.setAttribute('data-note', text);
            
            // Apply special effects
            switch (this.settings.noteEffect) {
                case 'glow':
                    const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                    const filterId = `glow-${Math.random().toString(36).substring(2, 9)}`;
                    glowFilter.setAttribute('id', filterId);
                    
                    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
                    blur.setAttribute('stdDeviation', '2.5');
                    blur.setAttribute('result', 'coloredBlur');
                    
                    const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
                    const merge1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
                    merge1.setAttribute('in', 'coloredBlur');
                    
                    const merge2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
                    merge2.setAttribute('in', 'SourceGraphic');
                    
                    merge.appendChild(merge1);
                    merge.appendChild(merge2);
                    glowFilter.appendChild(blur);
                    glowFilter.appendChild(merge);
                    
                    const defs = this.svg.querySelector('defs') || 
                                 this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
                    defs.appendChild(glowFilter);
                    
                    marker.setAttribute('filter', `url(#${filterId})`);
                    break;
                    
                case 'shadow':
                    const shadowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                    const shadowId = `shadow-${Math.random().toString(36).substring(2, 9)}`;
                    shadowFilter.setAttribute('id', shadowId);
                    
                    const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
                    feOffset.setAttribute('dx', '2');
                    feOffset.setAttribute('dy', '2');
                    feOffset.setAttribute('result', 'offset');
                    
                    const feBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
                    feBlur.setAttribute('in', 'offset');
                    feBlur.setAttribute('stdDeviation', '2');
                    feBlur.setAttribute('result', 'blur');
                    
                    const feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
                    feBlend.setAttribute('in', 'SourceGraphic');
                    feBlend.setAttribute('in2', 'blur');
                    feBlend.setAttribute('mode', 'normal');
                    
                    shadowFilter.appendChild(feOffset);
                    shadowFilter.appendChild(feBlur);
                    shadowFilter.appendChild(feBlend);
                    
                    const shadowDefs = this.svg.querySelector('defs') || 
                                      this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
                    shadowDefs.appendChild(shadowFilter);
                    
                    marker.setAttribute('filter', `url(#${shadowId})`);
                    break;
                    
                case 'outline':
                    marker.setAttribute('stroke', '#fff');
                    marker.setAttribute('stroke-width', 3);
                    break;
                    
                case 'highlight':
                    // Add a secondary larger circle behind for highlight effect
                    const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    highlight.setAttribute('cx', x);
                    highlight.setAttribute('cy', y);
                    highlight.setAttribute('r', size + 4);
                    highlight.setAttribute('fill', 'rgba(255, 255, 255, 0.5)');
                    highlight.setAttribute('stroke', 'none');
                    markerGroup.appendChild(highlight);
                    break;
                    
                case 'pulsate':
                    const pulsateAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    pulsateAnim.setAttribute('attributeName', 'r');
                    pulsateAnim.setAttribute('values', `${size};${size * 1.2};${size}`);
                    pulsateAnim.setAttribute('dur', '2s');
                    pulsateAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(pulsateAnim);
                    break;
                    
                case 'blink':
                    const blinkAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    blinkAnim.setAttribute('attributeName', 'opacity');
                    blinkAnim.setAttribute('values', '1;0.3;1');
                    blinkAnim.setAttribute('dur', '1.5s');
                    blinkAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(blinkAnim);
                    break;
                    
                case 'wobble':
                    const wobbleAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
                    wobbleAnim.setAttribute('attributeName', 'transform');
                    wobbleAnim.setAttribute('type', 'translate');
                    wobbleAnim.setAttribute('values', '0,0;2,0;-2,0;0,0');
                    wobbleAnim.setAttribute('dur', '0.5s');
                    wobbleAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(wobbleAnim);
                    break;
                    
                case 'rotate':
                    const rotateAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
                    rotateAnim.setAttribute('attributeName', 'transform');
                    rotateAnim.setAttribute('type', 'rotate');
                    rotateAnim.setAttribute('from', `0 ${x} ${y}`);
                    rotateAnim.setAttribute('to', `360 ${x} ${y}`);
                    rotateAnim.setAttribute('dur', '3s');
                    rotateAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(rotateAnim);
                    break;
                    
                case 'bounce':
                    const bounceAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    bounceAnim.setAttribute('attributeName', 'cy');
                    bounceAnim.setAttribute('values', `${y};${y - 5};${y}`);
                    bounceAnim.setAttribute('dur', '0.7s');
                    bounceAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(bounceAnim);
                    break;
                    
                case 'flip':
                    const flipAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
                    flipAnim.setAttribute('attributeName', 'transform');
                    flipAnim.setAttribute('type', 'scale');
                    flipAnim.setAttribute('values', '1,1;1,-1;1,1');
                    flipAnim.setAttribute('dur', '2s');
                    flipAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(flipAnim);
                    break;
                    
                case 'shake':
                    const shakeAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
                    shakeAnim.setAttribute('attributeName', 'transform');
                    shakeAnim.setAttribute('type', 'translate');
                    shakeAnim.setAttribute('values', '0,0;1,0;-1,0;0.5,0;-0.5,0;0,0');
                    shakeAnim.setAttribute('dur', '0.4s');
                    shakeAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(shakeAnim);
                    break;
                    
                case 'jelly':
                    const jellyAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
                    jellyAnim.setAttribute('attributeName', 'transform');
                    jellyAnim.setAttribute('type', 'scale');
                    jellyAnim.setAttribute('values', '1,1;1.2,0.8;0.8,1.2;1,1');
                    jellyAnim.setAttribute('dur', '1.5s');
                    jellyAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(jellyAnim);
                    break;
                    
                case 'fade':
                    const fadeAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    fadeAnim.setAttribute('attributeName', 'opacity');
                    fadeAnim.setAttribute('values', '1;0.4;1');
                    fadeAnim.setAttribute('dur', '3s');
                    fadeAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(fadeAnim);
                    break;
                    
                case 'grow':
                    const growAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    growAnim.setAttribute('attributeName', 'r');
                    growAnim.setAttribute('values', `${size};${size * 1.5};${size}`);
                    growAnim.setAttribute('dur', '3s');
                    growAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(growAnim);
                    break;
                    
                case 'shrink':
                    const shrinkAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    shrinkAnim.setAttribute('attributeName', 'r');
                    shrinkAnim.setAttribute('values', `${size};${size * 0.7};${size}`);
                    shrinkAnim.setAttribute('dur', '3s');
                    shrinkAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(shrinkAnim);
                    break;
                    
                case 'blur':
                    const blurFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                    const blurId = `blur-${Math.random().toString(36).substring(2, 9)}`;
                    blurFilter.setAttribute('id', blurId);
                    
                    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
                    feGaussianBlur.setAttribute('stdDeviation', '1');
                    
                    blurFilter.appendChild(feGaussianBlur);
                    
                    const blurDefs = this.svg.querySelector('defs') || 
                                   this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
                    blurDefs.appendChild(blurFilter);
                    
                    marker.setAttribute('filter', `url(#${blurId})`);
                    break;
                    
                case 'vibrate':
                    const vibrateAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
                    vibrateAnim.setAttribute('attributeName', 'transform');
                    vibrateAnim.setAttribute('type', 'translate');
                    vibrateAnim.setAttribute('values', '0,0;1,0;-1,0;0.5,0;-0.5,0;0,0');
                    vibrateAnim.setAttribute('dur', '0.2s');
                    vibrateAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(vibrateAnim);
                    break;
                    
                case 'sparkle':
                    // Create a sparkle effect with multiple elements
                    for (let i = 0; i < 4; i++) {
                        const angle = i * Math.PI / 2;
                        const sparkle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        sparkle.setAttribute('cx', x + Math.cos(angle) * (size + 3));
                        sparkle.setAttribute('cy', y + Math.sin(angle) * (size + 3));
                        sparkle.setAttribute('r', 2);
                        sparkle.setAttribute('fill', 'white');
                        
                        const sparkleAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                        sparkleAnim.setAttribute('attributeName', 'opacity');
                        sparkleAnim.setAttribute('values', '0;1;0');
                        sparkleAnim.setAttribute('dur', '1.5s');
                        sparkleAnim.setAttribute('repeatCount', 'indefinite');
                        sparkleAnim.setAttribute('begin', `${i * 0.2}s`);
                        
                        sparkle.appendChild(sparkleAnim);
                        markerGroup.appendChild(sparkle);
                    }
                    break;
                
                case 'shatter':
                    // Add a text label to show the effect name since this is a placeholder
                    marker.setAttribute('class', 'note-marker effect-shatter');
                    break;
                    
                case 'glitch':
                    marker.setAttribute('class', 'note-marker effect-glitch');
                    break;
                    
                case 'rainbow':
                    // Create rainbow gradient
                    const rainbowId = `rainbow-${Math.random().toString(36).substring(2, 9)}`;
                    const rainbowGrad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                    rainbowGrad.setAttribute('id', rainbowId);
                    
                    const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'];
                    rainbowColors.forEach((color, i) => {
                        const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                        stop.setAttribute('offset', `${i * 100 / (rainbowColors.length - 1)}%`);
                        stop.setAttribute('stop-color', color);
                        rainbowGrad.appendChild(stop);
                    });
                    
                    const rainbowDefs = this.svg.querySelector('defs') || 
                                      this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
                    rainbowDefs.appendChild(rainbowGrad);
                    
                    marker.setAttribute('fill', `url(#${rainbowId})`);
                    break;
                    
                case 'zoom':
                    const zoomAnim = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
                    zoomAnim.setAttribute('attributeName', 'transform');
                    zoomAnim.setAttribute('type', 'scale');
                    zoomAnim.setAttribute('values', '0.7;1.3;1');
                    zoomAnim.setAttribute('dur', '2s');
                    zoomAnim.setAttribute('repeatCount', 'indefinite');
                    marker.appendChild(zoomAnim);
                    break;
                    
                // For brevity, I'm showing a few complete implementations and the rest are placeholders
                // In a complete implementation, each effect would have specific SVG filters or animations
                case 'twinkle':
                case 'splash':
                case 'heatwave':
                case 'chroma':
                case 'emboss':
                case 'metallic':
                case 'neumorphic':
                case 'holographic':
                case 'retro':
                case 'pixelate':
                case 'sketch':
                case 'paint':
                case 'grime':
                case 'distortion':
                case 'liquefy':
                case 'frosted':
                case 'carved':
                case 'vignette':
                case 'noise':
                case 'sticker':
                case 'psychedelic':
                case 'relief':
                case 'foil':
                case 'brushed':
                case 'glazed':
                case 'watercolor':
                case 'comic':
                case 'bubble':
                case 'gradient-pulse':
                    // Add a class for styling
                    marker.setAttribute('class', `note-marker effect-${this.settings.noteEffect}`);
                    break;
            }
            
            // Add hover effects
            marker.addEventListener('mouseenter', () => {
                if (this.settings.noteShape === 'circle') {
                    marker.setAttribute('r', size + 2);
                } else {
                    // For non-circle shapes, we use a transform to scale
                    marker.setAttribute('transform', `scale(1.1) translate(${-x*0.1}, ${-y*0.1})`);
                }
                marker.setAttribute('stroke-width', 2);
            });
            
            marker.addEventListener('mouseleave', () => {
                if (this.settings.noteShape === 'circle') {
                    marker.setAttribute('r', size);
                } else {
                    marker.removeAttribute('transform');
                }
                marker.setAttribute('stroke-width', 1);
            });
            
            // Add click event for note editing with multi-select support
            markerGroup.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Check if shift key is pressed for selecting all notes with same name
                if (e.shiftKey) {
                    // Select all notes with the same text value
                    const noteText = text;
                    this.clearSelectedMarkers();
                    
                    const allMarkerGroups = this.svg.querySelectorAll('.note-marker-group');
                    allMarkerGroups.forEach(mg => {
                        if (mg.getAttribute('data-note-text') === noteText) {
                            mg.classList.add('selected');
                            const noteMarker = mg.querySelector('.note-marker');
                            if (noteMarker) {
                                noteMarker.setAttribute('stroke', '#FF4500');
                                noteMarker.setAttribute('stroke-width', 2);
                            }
                            this.selectedMarkers.push(mg);
                        }
                    });
                    
                    // Show multi-edit menu if we have selected markers
                    if (this.selectedMarkers.length > 0) {
                        this.showMultiNoteEditMenu(this.selectedMarkers, x, y);
                    }
                }
                // Check if control/command key is pressed for multi-select
                else if (e.ctrlKey || e.metaKey) {
                    // Add or remove from selection
                    const isSelected = markerGroup.classList.contains('selected');
                    
                    if (isSelected) {
                        // Remove from selection
                        markerGroup.classList.remove('selected');
                        marker.setAttribute('stroke', '#000');
                        marker.setAttribute('stroke-width', 1);
                        this.selectedMarkers = this.selectedMarkers.filter(m => m !== markerGroup);
                    } else {
                        // Add to selection
                        markerGroup.classList.add('selected');
                        marker.setAttribute('stroke', '#FF4500');
                        marker.setAttribute('stroke-width', 2);
                        this.selectedMarkers.push(markerGroup);
                    }
                    
                    // If we have selected markers, show the multi-edit menu
                    if (this.selectedMarkers.length > 0) {
                        this.showMultiNoteEditMenu(this.selectedMarkers, x, y);
                    }
                } else {
                    // Regular click - clear selection and show single note menu
                    this.clearSelectedMarkers();
                    this.selectedMarkers = [markerGroup];
                    markerGroup.classList.add('selected');
                    marker.setAttribute('stroke', '#FF4500');
                    marker.setAttribute('stroke-width', 2);
                    this.showNoteEditMenu(markerGroup, marker, text, x, y, color);
                }
            });
            
            markerGroup.appendChild(marker);
            
            // Add the text (only if displayMode is not 'none')
            if (this.settings.displayMode !== 'none') {
                const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                textElement.setAttribute('x', x);
                textElement.setAttribute('y', y + this.settings.noteFontSize/3); // Center text vertically
                textElement.setAttribute('text-anchor', 'middle');
                textElement.setAttribute('fill', '#FFFFFF');
                textElement.setAttribute('font-size', `${this.settings.noteFontSize}px`);
                textElement.setAttribute('font-family', this.settings.noteFont);
                textElement.setAttribute('font-weight', 'bold');
                textElement.setAttribute('pointer-events', 'none');
                textElement.setAttribute('data-note-text', text);
                textElement.textContent = text;
                markerGroup.appendChild(textElement);
            }
        }
    }
    
    /**
     * Clear all selected markers
     */
    clearSelectedMarkers() {
        this.selectedMarkers.forEach(markerGroup => {
            markerGroup.classList.remove('selected');
            const marker = markerGroup.querySelector('.note-marker');
            if (marker) {
                marker.setAttribute('stroke', '#000');
                marker.setAttribute('stroke-width', 1);
            }
        });
        this.selectedMarkers = [];
    }

    /**
     * Show edit menu for a clicked note
     */
    showNoteEditMenu(markerGroup, marker, text, x, y, currentColor) {
        // Remove any existing menus
        const existingMenu = document.querySelector('.note-edit-menu');
        if (existingMenu) existingMenu.remove();
        
        // Create menu
        const menu = document.createElement('div');
        menu.className = 'note-edit-menu';
        menu.style.position = 'absolute';
        menu.style.zIndex = '1000';
        menu.style.backgroundColor = 'white';
        menu.style.border = '1px solid #ccc';
        menu.style.borderRadius = '5px';
        menu.style.padding = '10px';
        menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        
        // Get SVG position and calculate menu position
        const svgRect = this.svg.getBoundingClientRect();
        menu.style.left = (svgRect.left + x) + 'px';
        menu.style.top = (svgRect.top + y + 30) + 'px';
        
        // Add menu title
        const title = document.createElement('div');
        title.textContent = `Edit Note: ${text}`;
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        title.style.borderBottom = '1px solid #eee';
        title.style.paddingBottom = '5px';
        menu.appendChild(title);
        
        // Color picker
        const colorLabel = document.createElement('div');
        colorLabel.textContent = 'Color:';
        colorLabel.style.marginBottom = '5px';
        menu.appendChild(colorLabel);
        
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = currentColor;
        colorPicker.style.width = '100%';
        colorPicker.style.marginBottom = '10px';
        menu.appendChild(colorPicker);
        
        // Shape selector
        const shapeLabel = document.createElement('div');
        shapeLabel.textContent = 'Shape:';
        shapeLabel.style.marginBottom = '5px';
        menu.appendChild(shapeLabel);
        
        const shapeSelect = document.createElement('select');
        shapeSelect.style.width = '100%';
        shapeSelect.style.marginBottom = '10px';
        
        this.musicTheory.noteStyles.shapes.forEach(shape => {
            const option = document.createElement('option');
            option.value = shape;
            option.textContent = shape.charAt(0).toUpperCase() + shape.slice(1);
            if (shape === this.settings.noteShape) {
                option.selected = true;
            }
            shapeSelect.appendChild(option);
        });
        menu.appendChild(shapeSelect);
        
        // Effect selector
        const effectLabel = document.createElement('div');
        effectLabel.textContent = 'Effect:';
        effectLabel.style.marginBottom = '5px';
        menu.appendChild(effectLabel);
        
        const effectSelect = document.createElement('select');
        effectSelect.style.width = '100%';
        effectSelect.style.marginBottom = '10px';
        
        this.musicTheory.noteStyles.effects.forEach(effect => {
            const option = document.createElement('option');
            option.value = effect;
            option.textContent = effect.charAt(0).toUpperCase() + effect.slice(1);
            if (effect === this.settings.noteEffect) {
                option.selected = true;
            }
            effectSelect.appendChild(option);
        });
        menu.appendChild(effectSelect);
        
        // Set as Root button
        const setAsRootBtn = document.createElement('button');
        setAsRootBtn.textContent = 'Set as Root';
        setAsRootBtn.style.width = '100%';
        setAsRootBtn.style.padding = '8px';
        setAsRootBtn.style.backgroundColor = '#27ae60';
        setAsRootBtn.style.color = 'white';
        setAsRootBtn.style.border = 'none';
        setAsRootBtn.style.borderRadius = '4px';
        setAsRootBtn.style.marginBottom = '10px';
        setAsRootBtn.style.cursor = 'pointer';
        setAsRootBtn.addEventListener('click', () => {
            // Get the actual note from displayed text (especially important when in interval mode)
            let newRoot = text;
            
            // In interval mode, we need to find the actual note 
            if (this.settings.displayMode === 'intervals') {
                // Find the note in the active notes list that corresponds to this interval
                const intervalScale = this.musicTheory.scales[this.currentPattern] || 
                                     this.musicTheory.chords[this.currentPattern] || 
                                     { intervals: [this.currentPattern] };
                
                // If it's the root note interval
                if (text === '1' || text === 'R') {
                    newRoot = this.currentKey;
                } else {
                    // Find the matching note from active notes
                    for (const note of this.activeNotes) {
                        const interval = this.musicTheory.getInterval(this.currentKey, note);
                        if (interval && this.musicTheory.intervals[interval] && 
                            this.musicTheory.intervals[interval].shortName === text) {
                            newRoot = note;
                            break;
                        }
                    }
                }
            }
            
            // Only proceed if we found a valid note
            if (newRoot && this.musicTheory.notes.includes(newRoot)) {
                // Set the new key in the key selector
                const keySelect = document.getElementById('key-select');
                if (keySelect) {
                    keySelect.value = newRoot;
                    
                    // Trigger change event to update the pattern
                    const event = new Event('change');
                    keySelect.dispatchEvent(event);
                }
                
                // Update the current key property
                this.currentKey = newRoot;
                
                // Redraw the fretboard with the new key
                this.draw();
            }
            
            // Close the menu
            menu.remove();
            this.clearSelectedMarkers();
        });
        menu.appendChild(setAsRootBtn);
        
        // Action buttons
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.display = 'flex';
        buttonsDiv.style.justifyContent = 'space-between';
        buttonsDiv.style.marginTop = '10px';
        
        // Apply button
        const applyBtn = document.createElement('button');
        applyBtn.textContent = 'Apply';
        applyBtn.style.padding = '5px 10px';
        applyBtn.style.backgroundColor = '#3498db';
        applyBtn.style.color = 'white';
        applyBtn.style.border = 'none';
        applyBtn.style.borderRadius = '3px';
        applyBtn.style.cursor = 'pointer';
        applyBtn.addEventListener('click', () => {
            // Apply color change
            marker.setAttribute('fill', colorPicker.value);
            
            // Apply shape change (would require redrawing the marker)
            if (shapeSelect.value !== this.settings.noteShape) {
                const tempSettings = {...this.settings, noteShape: shapeSelect.value};
                this.settings = tempSettings;
                // Redraw this specific note
                markerGroup.innerHTML = '';
                this.drawNoteMarker(x, y, colorPicker.value, text);
            }
            
            // Apply effect change
            if (effectSelect.value !== this.settings.noteEffect) {
                const tempSettings = {...this.settings, noteEffect: effectSelect.value};
                this.settings = tempSettings;
                // Redraw this specific note
                markerGroup.innerHTML = '';
                this.drawNoteMarker(x, y, colorPicker.value, text);
            }
            
            menu.remove();
            this.clearSelectedMarkers();
        });
        buttonsDiv.appendChild(applyBtn);
        
        // Remove note button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove Note';
        removeBtn.style.padding = '5px 10px';
        removeBtn.style.backgroundColor = '#e74c3c';
        removeBtn.style.color = 'white';
        removeBtn.style.border = 'none';
        removeBtn.style.borderRadius = '3px';
        removeBtn.style.cursor = 'pointer';
        removeBtn.addEventListener('click', () => {
            // Remove the note from activeNotes
            const noteToRemove = text;
            this.activeNotes = this.activeNotes.filter(note => {
                // In intervals mode, we need to check differently
                if (this.settings.displayMode === 'intervals') {
                    const interval = this.musicTheory.getInterval(this.currentKey, note);
                    return interval ? this.musicTheory.intervals[interval].shortName !== noteToRemove : true;
                }
                return note !== noteToRemove;
            });
            
            // Remove the marker from DOM
            markerGroup.remove();
            menu.remove();
            this.clearSelectedMarkers();
        });
        buttonsDiv.appendChild(removeBtn);
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cancel';
        closeBtn.style.padding = '5px 10px';
        closeBtn.style.backgroundColor = '#95a5a6';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '3px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => {
            menu.remove();
            this.clearSelectedMarkers();
        });
        buttonsDiv.appendChild(closeBtn);
        
        menu.appendChild(buttonsDiv);
        
        // Add menu to document
        document.body.appendChild(menu);
        
        // Click outside to close
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && 
                !marker.contains(e.target) && !markerGroup.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        }, { once: true });
    }

    /**
     * Show edit menu for multiple selected notes
     */
    showMultiNoteEditMenu(markerGroups, x, y) {
        // Remove any existing menus
        const existingMenu = document.querySelector('.note-edit-menu');
        if (existingMenu) existingMenu.remove();
        
        // Create menu
        const menu = document.createElement('div');
        menu.className = 'note-edit-menu';
        menu.style.position = 'absolute';
        menu.style.zIndex = '1000';
        menu.style.backgroundColor = 'white';
        menu.style.border = '1px solid #ccc';
        menu.style.borderRadius = '5px';
        menu.style.padding = '10px';
        menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        
        // Get SVG position and calculate menu position
        const svgRect = this.svg.getBoundingClientRect();
        menu.style.left = (svgRect.left + x) + 'px';
        menu.style.top = (svgRect.top + y + 30) + 'px';
        
        // Add menu title
        const title = document.createElement('div');
        title.textContent = `Edit ${markerGroups.length} Selected Notes`;
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        title.style.borderBottom = '1px solid #eee';
        title.style.paddingBottom = '5px';
        menu.appendChild(title);
        
        // Color picker
        const colorLabel = document.createElement('div');
        colorLabel.textContent = 'Color:';
        colorLabel.style.marginBottom = '5px';
        menu.appendChild(colorLabel);
        
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = '#3498db'; // Default color
        colorPicker.style.width = '100%';
        colorPicker.style.marginBottom = '10px';
        menu.appendChild(colorPicker);
        
        // Shape selector
        const shapeLabel = document.createElement('div');
        shapeLabel.textContent = 'Shape:';
        shapeLabel.style.marginBottom = '5px';
        menu.appendChild(shapeLabel);
        
        const shapeSelect = document.createElement('select');
        shapeSelect.style.width = '100%';
        shapeSelect.style.marginBottom = '10px';
        
        this.musicTheory.noteStyles.shapes.forEach(shape => {
            const option = document.createElement('option');
            option.value = shape;
            option.textContent = shape.charAt(0).toUpperCase() + shape.slice(1);
            if (shape === this.settings.noteShape) {
                option.selected = true;
            }
            shapeSelect.appendChild(option);
        });
        menu.appendChild(shapeSelect);
        
        // Effect selector
        const effectLabel = document.createElement('div');
        effectLabel.textContent = 'Effect:';
        effectLabel.style.marginBottom = '5px';
        menu.appendChild(effectLabel);
        
        const effectSelect = document.createElement('select');
        effectSelect.style.width = '100%';
        effectSelect.style.marginBottom = '10px';
        
        this.musicTheory.noteStyles.effects.forEach(effect => {
            const option = document.createElement('option');
            option.value = effect;
            option.textContent = effect.charAt(0).toUpperCase() + effect.slice(1);
            if (effect === this.settings.noteEffect) {
                option.selected = true;
            }
            effectSelect.appendChild(option);
        });
        menu.appendChild(effectSelect);
        
        // Set as Root button (only if a single note type is selected)
        const noteTexts = new Set();
        markerGroups.forEach(mg => noteTexts.add(mg.getAttribute('data-note-text')));
        
        if (noteTexts.size === 1) {
            const noteText = [...noteTexts][0];
            const setAsRootBtn = document.createElement('button');
            setAsRootBtn.textContent = 'Set as Root';
            setAsRootBtn.style.width = '100%';
            setAsRootBtn.style.padding = '8px';
            setAsRootBtn.style.backgroundColor = '#27ae60';
            setAsRootBtn.style.color = 'white';
            setAsRootBtn.style.border = 'none';
            setAsRootBtn.style.borderRadius = '4px';
            setAsRootBtn.style.marginBottom = '10px';
            setAsRootBtn.style.cursor = 'pointer';
            setAsRootBtn.addEventListener('click', () => {
                // Get the actual note from displayed text (especially important when in interval mode)
                let newRoot = noteText;
                
                // In interval mode, we need to find the actual note 
                if (this.settings.displayMode === 'intervals') {
                    // Find the note in the active notes list that corresponds to this interval
                    const intervalScale = this.musicTheory.scales[this.currentPattern] || 
                                         this.musicTheory.chords[this.currentPattern] || 
                                         { intervals: [this.currentPattern] };
                    
                    // If it's the root note interval
                    if (noteText === '1' || noteText === 'R') {
                        newRoot = this.currentKey;
                    } else {
                        // Find the matching note from active notes
                        for (const note of this.activeNotes) {
                            const interval = this.musicTheory.getInterval(this.currentKey, note);
                            if (interval && this.musicTheory.intervals[interval] && 
                                this.musicTheory.intervals[interval].shortName === noteText) {
                                newRoot = note;
                                break;
                            }
                        }
                    }
                }
                
                // Only proceed if we found a valid note
                if (newRoot && this.musicTheory.notes.includes(newRoot)) {
                    // Set the new key in the key selector
                    const keySelect = document.getElementById('key-select');
                    if (keySelect) {
                        keySelect.value = newRoot;
                        
                        // Trigger change event to update the pattern
                        const event = new Event('change');
                        keySelect.dispatchEvent(event);
                    }
                    
                    // Update the current key property
                    this.currentKey = newRoot;
                    
                    // Redraw the fretboard with the new key
                    this.draw();
                }
                
                // Close the menu
                menu.remove();
                this.clearSelectedMarkers();
            });
            menu.appendChild(setAsRootBtn);
        }
        
        // Action buttons
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.display = 'flex';
        buttonsDiv.style.justifyContent = 'space-between';
        buttonsDiv.style.marginTop = '10px';
        
        // Apply button
        const applyBtn = document.createElement('button');
        applyBtn.textContent = 'Apply to All';
        applyBtn.style.padding = '5px 10px';
        applyBtn.style.backgroundColor = '#3498db';
        applyBtn.style.color = 'white';
        applyBtn.style.border = 'none';
        applyBtn.style.borderRadius = '3px';
        applyBtn.style.cursor = 'pointer';
        applyBtn.addEventListener('click', () => {
            // Apply settings to all selected notes
            markerGroups.forEach(markerGroup => {
                const marker = markerGroup.querySelector('.note-marker');
                const text = marker.getAttribute('data-note');
                const noteX = parseFloat(marker.getAttribute('cx') || marker.getAttribute('x') || 0);
                const noteY = parseFloat(marker.getAttribute('cy') || marker.getAttribute('y') || 0);
                
                // Apply color change
                marker.setAttribute('fill', colorPicker.value);
                
                // Apply shape change (requires redrawing markers)
                if (shapeSelect.value !== this.settings.noteShape || 
                    effectSelect.value !== this.settings.noteEffect) {
                    const tempSettings = {...this.settings, 
                        noteShape: shapeSelect.value, 
                        noteEffect: effectSelect.value
                    };
                    this.settings = tempSettings;
                    // Redraw this specific note
                    markerGroup.innerHTML = '';
                    this.drawNoteMarker(noteX, noteY, colorPicker.value, text);
                }
            });
            
            menu.remove();
            this.clearSelectedMarkers();
        });
        buttonsDiv.appendChild(applyBtn);
        
        // Remove notes button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove All';
        removeBtn.style.padding = '5px 10px';
        removeBtn.style.backgroundColor = '#e74c3c';
        removeBtn.style.color = 'white';
        removeBtn.style.border = 'none';
        removeBtn.style.borderRadius = '3px';
        removeBtn.style.cursor = 'pointer';
        removeBtn.addEventListener('click', () => {
            // Remove all selected notes
            markerGroups.forEach(markerGroup => {
                const noteText = markerGroup.querySelector('.note-marker').getAttribute('data-note');
                
                // Remove the note from activeNotes based on display mode
                if (this.settings.displayMode === 'intervals') {
                    this.activeNotes = this.activeNotes.filter(note => {
                        const interval = this.musicTheory.getInterval(this.currentKey, note);
                        return interval ? this.musicTheory.intervals[interval].shortName !== noteText : true;
                    });
                } else {
                    this.activeNotes = this.activeNotes.filter(note => note !== noteText);
                }
                
                // Remove the marker from DOM
                markerGroup.remove();
            });
            
            menu.remove();
            this.selectedMarkers = [];
        });
        buttonsDiv.appendChild(removeBtn);
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cancel';
        closeBtn.style.padding = '5px 10px';
        closeBtn.style.backgroundColor = '#95a5a6';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '3px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => {
            menu.remove();
            this.clearSelectedMarkers();
        });
        buttonsDiv.appendChild(closeBtn);
        
        menu.appendChild(buttonsDiv);
        
        // Add menu to document
        document.body.appendChild(menu);
        
        // Click outside to close and clear selection
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && 
                !markerGroups.some(group => group.contains(e.target))) {
                menu.remove();
                this.clearSelectedMarkers();
            }
        }, { once: true });
    }
    
    /**
     * Lighten a color by a percentage amount
     */
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return '#' + (
            0x1000000 + 
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + 
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }
    
    /**
     * Get colors based on the selected theme
     */
    getThemeColors() {
        if (this.settings.colorTheme === 'custom' && Object.keys(this.settings.customColors).length > 0) {
            return this.settings.customColors;
        }
        
        return this.musicTheory.colorThemes[this.settings.colorTheme] || 
               this.musicTheory.colorThemes.default;
    }
    
    /**
     * Get a contrasting color for text (black or white) based on background color
     */
    getContrastColor(hexColor) {
        // Remove the #
        const hex = hexColor.replace('#', '');
        
        // Convert to RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        // Calculate brightness using the WCAG luminance formula for better perceptual results.
        // The formula is L = 0.2126 * R + 0.7152 * G + 0.0722 * B
        // The values R, G, and B are normalized from 0-255 to 0-1.
        // A common threshold for this formula is 0.179.
        const rLinear = r / 255;
        const gLinear = g / 255;
        const bLinear = b / 255;

        const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
        
        // Return black for bright colors, white for dark colors.
        return luminance > 0.179 ? '#000000' : '#FFFFFF';
    }
    
    /**
     * Create an image of the current fretboard
     */
    async exportImage(filename) {
        // Ensure the container includes the theory info panel
        const container = document.querySelector('.fretboard-container');
        const canvas = await html2canvas(container);
        const dataUrl = canvas.toDataURL('image/jpeg');
        
        // Create download link
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename || 'fretboard.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    /**
     * Get current fretboard info for naming purposes
     */
    getCurrentInfo() {
        return {
            tuning: this.settings.tuning.join('-'),
            key: this.currentKey,
            pattern: this.currentPattern,
            patternType: this.currentPatternType
        };
    }
    
    /**
     * Apply a glow effect to an SVG element
     */
    applyGlowEffect(element, color) {
        const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        const filterId = `glow-${Math.random().toString(36).substring(2, 9)}`;
        glowFilter.setAttribute('id', filterId);
        
        const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        blur.setAttribute('stdDeviation', '1.5');
        blur.setAttribute('result', 'coloredBlur');
        
        const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
        const merge1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        merge1.setAttribute('in', 'coloredBlur');
        
        const merge2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        merge2.setAttribute('in', 'SourceGraphic');
        
        merge.appendChild(merge1);
        merge.appendChild(merge2);
        glowFilter.appendChild(blur);
        glowFilter.appendChild(merge);
        
        const defs = this.svg.querySelector('defs') || 
                     this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
        defs.appendChild(glowFilter);
        
        element.setAttribute('filter', `url(#${filterId})`);
    }
    
    /**
     * Apply a shadow effect to an SVG element
     */
    applyShadowEffect(element) {
        const shadowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        const shadowId = `shadow-${Math.random().toString(36).substring(2, 9)}`;
        shadowFilter.setAttribute('id', shadowId);
        
        const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
        feOffset.setAttribute('dx', '1');
        feOffset.setAttribute('dy', '1');
        feOffset.setAttribute('result', 'offset');
        
        const feBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        feBlur.setAttribute('in', 'offset');
        feBlur.setAttribute('stdDeviation', '1');
        feBlur.setAttribute('result', 'blur');
        
        const feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
        feBlend.setAttribute('in', 'SourceGraphic');
        feBlend.setAttribute('in2', 'blur');
        feBlend.setAttribute('mode', 'normal');
        
        shadowFilter.appendChild(feOffset);
        shadowFilter.appendChild(feBlur);
        shadowFilter.appendChild(feBlend);
        
        const defs = this.svg.querySelector('defs') || 
                    this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
        defs.appendChild(shadowFilter);
        
        element.setAttribute('filter', `url(#${shadowId})`);
    }
    
    /**
     * Apply a metallic effect to strings
     */
    applyMetallicEffect(mainString, y, x1, x2, baseColor) {
        const x = parseFloat(mainString.getAttribute('x1'));
        
        const highlight = mainString.cloneNode(true);
        highlight.setAttribute('x1', x - 1);
        highlight.setAttribute('x2', x - 1);
        highlight.setAttribute('stroke', this.lightenColor(baseColor, 50));
        highlight.setAttribute('stroke-width', parseInt(mainString.getAttribute('stroke-width')) * 0.5);
        highlight.setAttribute('stroke-opacity', 0.8);
        
        const shadow = mainString.cloneNode(true);
        shadow.setAttribute('x1', x + 1);
        shadow.setAttribute('x2', x + 1);
        shadow.setAttribute('stroke', this.darkenColor(baseColor, 30));
        shadow.setAttribute('stroke-width', parseInt(mainString.getAttribute('stroke-width')) * 0.5);
        shadow.setAttribute('stroke-opacity', 0.8);
        
        this.svg.appendChild(highlight);
        this.svg.appendChild(shadow);
    }
    
    /**
     * Apply styling to a fret based on the selected style
     */
    applyFretStyle(fretElement, style, themeColors) {
        switch (style) {
            case 'dashed':
                fretElement.setAttribute('stroke-dasharray', '5,3');
                break;
            case 'dotted':
                fretElement.setAttribute('stroke-dasharray', '2,2');
                break;
            case 'double':
                // For double, we just make it thicker
                fretElement.setAttribute('stroke-width', parseInt(fretElement.getAttribute('stroke-width')) * 1.5);
                // Add a second thinner line below for double effect
                const doubleString = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                doubleString.setAttribute('x1', margin.left);
                doubleString.setAttribute('y1', y + 2);
                doubleString.setAttribute('x2', width - margin.right);
                doubleString.setAttribute('y2', y + 2);
                doubleString.setAttribute('stroke', colors.strings);
                doubleString.setAttribute('stroke-width', stringThickness * 0.5);
                this.svg.appendChild(doubleString);
                break;
            case 'longDash':
                fretElement.setAttribute('stroke-dasharray', '15,5');
                break;
            case 'shortDash':
                fretElement.setAttribute('stroke-dasharray', '5,3');
                break;
            case 'dashDot':
                fretElement.setAttribute('stroke-dasharray', '8,3,1,3');
                break;
            case 'dashDotDot':
                fretElement.setAttribute('stroke-dasharray', '8,3,1,3,1,3');
                break;
            case 'wave':
                // Create a wavy string using a path instead of a line
                const wavePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const amplitude = stringThickness * 2;
                const frequency = 20;
                let d = `M ${margin.left} ${y}`;
                
                for (let i = margin.left; i <= width - margin.right; i += 5) {
                    const yOffset = amplitude * Math.sin((i - margin.left) / frequency);
                    d += ` L ${i} ${y + yOffset}`;
                }
                
                wavePath.setAttribute('d', d);
                wavePath.setAttribute('fill', 'none');
                wavePath.setAttribute('stroke', colors.strings);
                wavePath.setAttribute('stroke-width', stringThickness);
                this.svg.appendChild(wavePath);
                return; // Skip the original string
            case 'zigzag':
                // Create a zigzag string using a path
                const zigzagPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const zHeight = stringThickness * 2;
                const zWidth = 10;
                let zd = `M ${margin.left} ${y}`;
                
                for (let i = margin.left + zWidth; i <= width - margin.right; i += zWidth * 2) {
                    zd += ` H ${i} V ${y + zHeight} H ${i + zWidth} V ${y}`;
                }
                
                zigzagPath.setAttribute('d', zd);
                zigzagPath.setAttribute('fill', 'none');
                zigzagPath.setAttribute('stroke', colors.strings);
                zigzagPath.setAttribute('stroke-width', stringThickness);
                this.svg.appendChild(zigzagPath);
                return; // Skip the original string
            case 'textured':
                // Create a textured line with short dashes and varying offset
                this.svg.appendChild(string);
                
                const textureCount = 100;
                for (let i = 0; i < textureCount; i++) {
                    const dash = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    const dashX = margin.left + (width - margin.left - margin.right) * (i / textureCount);
                    const dashOffset = (Math.random() - 0.5) * stringThickness * 2;
                    
                    dash.setAttribute('x1', dashX);
                    dash.setAttribute('y1', y + dashOffset);
                    dash.setAttribute('x2', dashX + 3);
                    dash.setAttribute('y2', y + dashOffset);
                    dash.setAttribute('stroke', colors.strings);
                    dash.setAttribute('stroke-width', stringThickness * 0.7);
                    
                    this.svg.appendChild(dash);
                }
                return; // Skip further processing
            case 'spiral':
                // Create a spiral wrapping effect
                const spiralPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const spiralFreq = 12;
                const spiralAmp = stringThickness * 1.5;
                
                let spiralD = `M ${margin.left} ${y}`;
                for (let i = margin.left; i <= width - margin.right; i += 2) {
                    const phase = (i - margin.left) / spiralFreq;
                    const yOffset = spiralAmp * Math.sin(phase);
                    const xOffset = spiralAmp * Math.cos(phase) * 0.3;
                    
                    spiralD += ` L ${i + xOffset} ${y + yOffset}`;
                }
                
                spiralPath.setAttribute('d', spiralD);
                spiralPath.setAttribute('fill', 'none');
                spiralPath.setAttribute('stroke', colors.strings);
                spiralPath.setAttribute('stroke-width', stringThickness);
                this.svg.appendChild(spiralPath);
                return; // Skip the original string
            case 'dual-color':
                // Create a dual-colored string
                const dualColor1 = colors.strings;
                const dualColor2 = this.lightenColor(colors.strings, 30);
                
                // First half
                const dualString1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                dualString1.setAttribute('x1', margin.left);
                dualString1.setAttribute('y1', y);
                dualString1.setAttribute('x2', margin.left + (width - margin.left - margin.right) / 2);
                dualString1.setAttribute('y2', y);
                dualString1.setAttribute('stroke', dualColor1);
                dualString1.setAttribute('stroke-width', stringThickness);
                
                // Second half
                const dualString2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                dualString2.setAttribute('x1', margin.left + (width - margin.left - margin.right) / 2);
                dualString2.setAttribute('y1', y);
                dualString2.setAttribute('x2', width - margin.right);
                dualString2.setAttribute('y2', y);
                dualString2.setAttribute('stroke', dualColor2);
                dualString2.setAttribute('stroke-width', stringThickness);
                
                this.svg.appendChild(dualString1);
                this.svg.appendChild(dualString2);
                return; // Skip the original string
            case 'celtic':
                // Create a celtic knot pattern
                const celticPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const knotSize = stringThickness * 3;
                const knotSpacing = knotSize * 5;
                
                let celticD = `M ${margin.left} ${y}`;
                
                for (let i = margin.left + knotSpacing; i < width - margin.right; i += knotSpacing) {
                    celticD += ` L ${i - knotSize} ${y}`;
                    // Draw a simple knot
                    celticD += ` C ${i - knotSize/2} ${y - knotSize}, ${i + knotSize/2} ${y - knotSize}, ${i + knotSize} ${y}`;
                    celticD += ` C ${i + knotSize/2} ${y + knotSize}, ${i - knotSize/2} ${y + knotSize}, ${i - knotSize} ${y}`;
                }
                
                // Add remaining straight section
                celticD += ` L ${width - margin.right} ${y}`;
                
                celticPath.setAttribute('d', celticD);
                celticPath.setAttribute('fill', 'none');
                celticPath.setAttribute('stroke', colors.strings);
                celticPath.setAttribute('stroke-width', stringThickness * 0.7);
                this.svg.appendChild(celticPath);
                return; // Skip the original string
            case 'flame':
                // Create a flame-like wavy pattern
                const flamePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const flameFreq = 30;
                const flameAmp = stringThickness * 3;
                
                let flameD = `M ${margin.left} ${y}`;
                for (let i = margin.left; i <= width - margin.right; i += 2) {
                    const phase = (i - margin.left) / flameFreq;
                    const yOffset = flameAmp * Math.sin(phase);
                    const xOffset = flameAmp * Math.cos(phase) * 0.3;
                    
                    flameD += ` L ${i + xOffset} ${y + yOffset}`;
                }
                
                flamePath.setAttribute('d', flameD);
                flamePath.setAttribute('fill', 'none');
                flamePath.setAttribute('stroke', colors.strings);
                flamePath.setAttribute('stroke-width', stringThickness);
                
                // Add a glow filter
                const flameFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                const flameFilterId = `flame-filter-${Math.random().toString(36).substring(2, 9)}`;
                flameFilter.setAttribute('id', flameFilterId);
                
                const flameBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
                flameBlur.setAttribute('stdDeviation', '1.5');
                flameBlur.setAttribute('result', 'blur');
                
                flameFilter.appendChild(flameBlur);
                
                const defsFl = this.svg.querySelector('defs') || 
                                    this.svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), this.svg.firstChild);
                defsFl.appendChild(flameFilter);
                
                flamePath.setAttribute('filter', `url(#${flameFilterId})`);
                this.svg.appendChild(flamePath);
                return; // Skip the original string
        }
    }
    
    /**
     * Apply metallic effect to a fret
     */
    applyMetallicEffectToFret(fretElement, baseColor) {
        const x = parseFloat(fretElement.getAttribute('x1'));
        
        const highlight = fretElement.cloneNode(true);
        highlight.setAttribute('x1', x - 1);
        highlight.setAttribute('x2', x - 1);
        highlight.setAttribute('stroke', this.lightenColor(baseColor, 50));
        highlight.setAttribute('stroke-width', parseInt(fretElement.getAttribute('stroke-width')) * 0.5);
        highlight.setAttribute('stroke-opacity', 0.8);
        
        const shadow = fretElement.cloneNode(true);
        shadow.setAttribute('x1', x + 1);
        shadow.setAttribute('x2', x + 1);
        shadow.setAttribute('stroke', this.darkenColor(baseColor, 30));
        shadow.setAttribute('stroke-width', parseInt(fretElement.getAttribute('stroke-width')) * 0.5);
        shadow.setAttribute('stroke-opacity', 0.8);
        
        this.svg.appendChild(highlight);
        this.svg.appendChild(shadow);
    }
    
    /**
     * Darken a color by a percentage amount
     */
    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        
        return '#' + (
            0x1000000 + 
            R * 0x10000 + 
            G * 0x100 + 
            B
        ).toString(16).slice(1);
    }
    
    /**
     * Get proper enharmonic spelling of a note based on the current key and pattern
     */
    getProperNoteSpelling(note, key, patternType, pattern) {
        if (this.settings.displayMode !== 'notes') {
            return note;
        }
        
        // For interval patterns, determine the expected scale degree.
        if (patternType === 'interval') {
            let degree;
            switch (pattern) {
                case '1':
                    degree = 1;
                    break;
                case 'b2':
                case '2':
                    degree = 2;
                    break;
                case 'b3':
                case '3':
                    degree = 3;
                    break;
                case '4':
                case '#4':
                    degree = 4;
                    break;
                case 'b5':
                case '5':
                case '#5':
                    degree = 5;
                    break;
                case '6':
                    degree = 6;
                    break;
                case 'b7':
                case '7':
                    degree = 7;
                    break;
                default:
                    degree = 1;
            }
            return this.musicTheory.getExpectedNoteForDegree(key, degree);
        }
        // For scales and chords (which are already adjusted via musicTheory),
        // simply return the note as computed.
        return note;
    }
    
    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    debouncedRedrawNotes() {
        if (this._debouncedRedraw) {
            this._debouncedRedraw();
        } else {
            this._debouncedRedraw = this.debounce(() => {
                // Remove existing note markers and redraw them
                const markers = this.svg.querySelectorAll('.note-marker-group');
                markers.forEach(marker => marker.parentNode.removeChild(marker));
                this.drawNotes();
            }, 200);
            this._debouncedRedraw();
        }
    }
}