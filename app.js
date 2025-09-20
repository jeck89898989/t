/**
 * Main Application Class
 * Controls the UI, fretboard, and audio playback
 */
class App {
    constructor() {
        // Initialize music theory and fretboard
        this.musicTheory = new MusicTheory();
        this.fretboard = new Fretboard('fretboard', this.musicTheory);
        
        // Audio synth
        this.synth = null;
        this.initSynth();
        
        // State
        this.slideshowItems = [];
        this.generatedPatterns = [];
        this.tempo = 120; // Default tempo (BPM)
        this.customFilename = null; // Custom filename for exports
        this.sidebarVisible = true; // default state
        const savedSidebar = localStorage.getItem('sidebarVisible');
        if (savedSidebar !== null) {
            this.sidebarVisible = savedSidebar === 'true';
        }
        
        // NEW: Set titleVisible to true by default
        this.titleVisible = true;
        
        // Initialize collapsed state for sections
        this.collapsedSections = JSON.parse(localStorage.getItem('collapsedSections')) || {};
        
        // Instrument presets
        this.instrumentPresets = {
            'acoustic_guitar': { name: 'Acoustic Guitar', strings: 6, tunings: {
                'standard': ['E', 'A', 'D', 'G', 'B', 'E'],
                'whole_step_down': ['D', 'G', 'C', 'F', 'A', 'D']
            }},
            'electric_guitar': { name: 'Electric Guitar', strings: 6, tunings: {
                'standard': ['E', 'A', 'D', 'G', 'B', 'E'],
                'half_step_down': ['D#', 'G#', 'C#', 'F#', 'A#', 'D#']
            }},
            'classical_guitar': { name: 'Classical Guitar', strings: 6, tunings: {
                'standard': ['E', 'A', 'D', 'G', 'B', 'E'],
                'whole_step_down': ['D', 'G', 'C', 'F', 'A', 'D']
            }},
            'seven_string_guitar': { name: '7-String Guitar', strings: 7, tunings: {
                'standard': ['B', 'E', 'A', 'D', 'G', 'B', 'E'],
                'whole_step_down': ['A', 'D', 'G', 'C', 'F', 'A', 'D']
            }},
            'twelve_string_guitar': { name: '12-String Guitar', strings: 6, tunings: {
                'standard': ['E', 'A', 'D', 'G', 'B', 'E'],
                'half_step_down': ['D#', 'G#', 'C#', 'F#', 'A#', 'D#']
            }},
            'four_string_bass': { name: '4-String Bass Guitar', strings: 4, tunings: {
                'standard': ['E', 'A', 'D', 'G'],
                'whole_step_down': ['D', 'G', 'C', 'F']
            }},
            'five_string_bass': { name: '5-String Bass Guitar', strings: 5, tunings: {
                'standard': ['B', 'E', 'A', 'D', 'G'],
                'alternate': ['E', 'A', 'D', 'G', 'C']
            }},
            'six_string_bass': { name: '6-String Bass Guitar', strings: 6, tunings: {
                'standard': ['B', 'E', 'A', 'D', 'G', 'B'],
                'alternate': ['E', 'A', 'D', 'G', 'B', 'E']
            }},
            // Additional instruments
            'eight_string_guitar': { name: '8-String Guitar', strings: 8, tunings: {
                'standard': ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'],
                'drop_e': ['E', 'B', 'E', 'A', 'D', 'G', 'B', 'E']
            }},
            'baritone_guitar': { name: 'Baritone Guitar', strings: 6, tunings: {
                'standard': ['B', 'E', 'A', 'D', 'F#', 'B'],
                'drop_a': ['A', 'E', 'A', 'D', 'F#', 'B']
            }},
            'resonator_guitar': { name: 'Resonator Guitar', strings: 6, tunings: {
                'standard': ['E', 'A', 'D', 'G', 'B', 'E'],
                'open_g': ['D', 'G', 'D', 'G', 'B', 'D']
            }},
            'tenor_guitar': { name: 'Tenor Guitar', strings: 4, tunings: {
                'standard': ['C', 'G', 'D', 'A'],
                'chicago': ['D', 'G', 'B', 'E']
            }},
            'violin': { name: 'Violin', strings: 4, tunings: {
                'standard': ['G', 'D', 'A', 'E'],
                'drop_d': ['G', 'D', 'A', 'D']
            }},
            'viola': { name: 'Viola', strings: 4, tunings: {
                'standard': ['C', 'G', 'D', 'A'],
                'scordatura': ['C', 'G', 'D', 'G']
            }},
            'cello': { name: 'Cello', strings: 4, tunings: {
                'standard': ['C', 'G', 'D', 'A'],
                'drop_g': ['C', 'G', 'D', 'G']
            }},
            'double_bass': { name: 'Double Bass', strings: 4, tunings: {
                'standard': ['E', 'A', 'D', 'G'],
                'orchestral': ['F#', 'B', 'E', 'A']
            }},
            'five_string_banjo': { name: '5-String Banjo', strings: 5, tunings: {
                'standard': ['G', 'D', 'G', 'B', 'D'],
                'double_c': ['G', 'C', 'G', 'C', 'D']
            }},
            'four_string_banjo': { name: '4-String Banjo', strings: 4, tunings: {
                'standard': ['C', 'G', 'D', 'A'],
                'chicago': ['D', 'G', 'B', 'E']
            }},
            'six_string_banjo': { name: '6-String Banjo', strings: 6, tunings: {
                'standard': ['E', 'A', 'D', 'G', 'B', 'E'],
                'open_g': ['D', 'G', 'D', 'G', 'B', 'D']
            }},
            'mandolin': { name: 'Mandolin', strings: 4, tunings: {
                'standard': ['G', 'D', 'A', 'E'],
                'open_g': ['G', 'D', 'G', 'B']
            }},
            'mandola': { name: 'Mandola', strings: 4, tunings: {
                'standard': ['C', 'G', 'D', 'A'],
                'octave_mandolin': ['G', 'D', 'A', 'E']
            }},
            'ukulele_soprano': { name: 'Soprano Ukulele', strings: 4, tunings: {
                'standard': ['G', 'C', 'E', 'A'],
                'low_g': ['G', 'C', 'E', 'A'] // Low G instead of high G
            }},
            'ukulele_tenor': { name: 'Tenor Ukulele', strings: 4, tunings: {
                'standard': ['G', 'C', 'E', 'A'],
                'low_g': ['G', 'C', 'E', 'A'] // Low G instead of high G
            }},
            'ukulele_baritone': { name: 'Baritone Ukulele', strings: 4, tunings: {
                'standard': ['D', 'G', 'B', 'E'],
                'alternate': ['C', 'G', 'B', 'E']
            }},
            'lap_steel': { name: 'Lap Steel Guitar', strings: 6, tunings: {
                'c6': ['C', 'E', 'G', 'A', 'C', 'E'],
                'open_g': ['D', 'G', 'D', 'G', 'B', 'D']
            }},
            'pedal_steel': { name: 'Pedal Steel Guitar', strings: 10, tunings: {
                'e9': ['B', 'D', 'E', 'F#', 'G#', 'B', 'E', 'G#', 'D#', 'F#'],
                'c6': ['C', 'F', 'A', 'C', 'E', 'G', 'A', 'C', 'E', 'G']
            }},
            'dobro': { name: 'Dobro', strings: 6, tunings: {
                'open_g': ['G', 'B', 'D', 'G', 'B', 'D'],
                'open_d': ['D', 'A', 'D', 'F#', 'A', 'D']
            }},
            'koto': { name: 'Koto', strings: 13, tunings: {
                'hira_joshi': ['D', 'G', 'A', 'A#', 'D', 'G', 'A', 'A#', 'D', 'G', 'A', 'A#', 'D'],
                'in_scale': ['E', 'F#', 'A', 'B', 'C', 'E', 'F#', 'A', 'B', 'C', 'E', 'F#', 'A']
            }},
            'sitar': { name: 'Sitar', strings: 7, tunings: {
                'standard': ['C', 'C#', 'G', 'C', 'C#', 'G', 'C'],
                'alternative': ['C#', 'D', 'G#', 'C#', 'D', 'G#', 'C#']
            }},
            'charango': { name: 'Charango', strings: 5, tunings: {
                'standard': ['G', 'C', 'E', 'A', 'E'],
                'argentina': ['A', 'D', 'F#', 'B', 'F#']
            }},
            'bouzouki': { name: 'Irish Bouzouki', strings: 4, tunings: {
                'standard': ['G', 'D', 'A', 'E'],
                'irish': ['G', 'D', 'A', 'D']
            }},
            'oud': { name: 'Oud', strings: 6, tunings: {
                'arabic': ['C', 'F', 'A', 'D', 'G', 'C'],
                'turkish': ['D', 'E', 'A', 'B', 'E', 'A']
            }}
        };
        
        // Add 50 default chord progression patterns.
        this.chordProgressionPatterns = [];
        for (let i = 1; i <= 50; i++) {
            this.chordProgressionPatterns.push({
                id: 'cp' + i,
                name: 'Chord Progression ' + i,
                progression: 'I:4 IV:4 V:4'
            });
        }
        
        // Initialize lessons array from localStorage or create 50 default lessons
        const storedLessons = localStorage.getItem('lessons');
        if (storedLessons) {
            this.lessons = JSON.parse(storedLessons);
        } else {
            this.lessons = [];
            for (let i = 0; i < 50; i++) {
                this.lessons.push({
                    title: `Lesson ${i + 1}`,
                    diagrams: [],
                    text: 'test'
                });
            }
            localStorage.setItem('lessons', JSON.stringify(this.lessons));
        }
        
        // Add instrument and tuning dropdowns
        this.addInstrumentDropdowns();
        
        // State
        this.slideshowItems = [];
        this.generatedPatterns = [];
        this.tempo = 120; // Default tempo (BPM)
        this.customFilename = null; // Custom filename for exports
        
        // Initialize the UI
        this.initUI();
    }
    
    /**
     * Initialize Tone.js synthesizer
     */
    async initSynth() {
        // Wait for user interaction before initializing audio
        await Tone.start();
        
        // Create a polyphonic synth for playing chords/patterns
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
        this.synth.volume.value = -10; // Reduce volume a bit
        
        console.log('Audio synthesizer initialized');
    }
    
    /**
     * Initialize the UI and set up event listeners
     */
    initUI() {
        // Add backdrop for sidebar
        const backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        backdrop.addEventListener('click', () => this.toggleSidebar());
        document.body.appendChild(backdrop);
        
        // Load and apply default settings first
        this.loadAndApplyDefaultSettings();

        // Add instrument and tuning dropdowns
        this.addInstrumentDropdowns();
        
        // Set up tuning input based on default string count
        this.updateTuningInputs();
        
        // Set up pattern selects based on default pattern type
        this.updatePatternSelect();
        
        // Populate custom color inputs
        this.createCustomColorInputs();
        
        // Update string and fret input displays
        this.updateStringAndFretLabels();
        
        // Add fret number options
        this.addFretNumberOptions();
        
        // Add note appearance options
        this.addNoteAppearanceOptions();
        
        // Add string appearance options
        this.addStringAppearanceOptions();
        
        // Add fret appearance options
        this.addFretAppearanceOptions();
        
        // Add tempo control
        this.addTempoControl();
        
        // Add theory info display options
        this.addTheoryInfoOptions();
        
        // Add MP3 player controls
        this.addMp3PlayerControls();
        
        // Move control buttons
        this.moveControlButtons();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initial fretboard draw
        this.updateFretboard();
        
        // Show music theory info
        this.updateTheoryInfo();
        
        // Add melodic pattern handling
        this.setupMelodicPatternControls();
        
        // Setup chromatic tuner
        this.setupChromaticTuner();
        
        // Setup collapsible sections
        this.setupCollapsibleSections();
        
        // Add theme switching functionality
        this.setupThemeSwitching();
        
        // Init sidebar state based on user preference
        const sidebar = document.querySelector('.sidebar');
        if (this.sidebarVisible) {
            sidebar.classList.add('sidebar-visible');
            backdrop.classList.add('visible');
        } else {
            sidebar.classList.remove('sidebar-visible');
            backdrop.classList.remove('visible');
        }
    }
    
    /**
     * Toggle sidebar visibility
     */
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const backdrop = document.querySelector('.sidebar-backdrop');
        
        if (this.sidebarVisible) {
            // Hide sidebar
            sidebar.classList.remove('sidebar-visible');
            backdrop.classList.remove('visible');
            document.getElementById('sidebar-toggle').setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restore scrolling
        } else {
            // Show sidebar
            sidebar.classList.add('sidebar-visible');
            backdrop.classList.add('visible');
            document.getElementById('sidebar-toggle').setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling on mobile
        }
        
        this.sidebarVisible = !this.sidebarVisible;
        localStorage.setItem('sidebarVisible', this.sidebarVisible ? 'true' : 'false');
    }
    
    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Add sidebar toggle functionality
        document.getElementById('sidebar-toggle').addEventListener('click', () => this.toggleSidebar());
        
        // Set initial aria-expanded based on sidebarVisible state:
        document.getElementById('sidebar-toggle').setAttribute('aria-expanded', this.sidebarVisible ? 'true' : 'false');
        
        // Instrument preset dropdowns
        document.getElementById('instrument-select').addEventListener('change', function() {
            document.dispatchEvent(new Event('instrument-changed'));
        });
        
        document.getElementById('tuning-preset').addEventListener('change', function() {
            document.dispatchEvent(new Event('tuning-changed'));
        });
        
        // Instrument setup controls
        document.getElementById('string-count').addEventListener('change', e => {
            const count = parseInt(e.target.value);
            if (count >= 1 && count <= 20) {
                // Update tuning with default for this string count
                const defaultTuning = this.musicTheory.getDefaultTuning(count);
                this.updateTuningInputs(defaultTuning);
                this.updateFretboard();
            }
        });
        
        document.getElementById('start-fret').addEventListener('change', () => this.updateFretboard());
        document.getElementById('end-fret').addEventListener('change', () => this.updateFretboard());
        document.getElementById('string-height').addEventListener('change', () => this.updateFretboard());
        document.getElementById('fret-width').addEventListener('change', () => this.updateFretboard());
        
        // Music theory controls
        document.getElementById('key-select').addEventListener('change', () => {
            this.updateFretboard();
            this.updateTheoryInfo(); // Update theory info when key changes
        });
        document.getElementById('display-mode').addEventListener('change', () => {
            this.updateFretboard();
            this.updateTheoryInfo(); // Update theory info when display mode changes
        });
        
        document.getElementById('pattern-type').addEventListener('change', () => {
            this.updatePatternSelect();
            this.updateFretboard();
            this.updateTheoryInfo(); // Update theory info when pattern type changes
        });
        
        document.getElementById('pattern-select').addEventListener('change', () => {
            this.updateFretboard();
            this.updateTheoryInfo(); // Update theory info when pattern changes
        });
        
        // Color theme
        document.getElementById('color-theme').addEventListener('change', e => {
            if (e.target.value === 'custom') {
                document.getElementById('custom-colors').style.display = 'block';
            } else {
                document.getElementById('custom-colors').style.display = 'none';
            }
            this.updateFretboard();
        });
        
        // Note appearance settings
        document.getElementById('note-size').addEventListener('change', () => this.updateFretboard());
        document.getElementById('note-shape').addEventListener('change', () => this.updateFretboard());
        document.getElementById('note-font').addEventListener('change', () => this.updateFretboard());
        document.getElementById('note-font-size').addEventListener('change', () => this.updateFretboard());
        document.getElementById('note-effect').addEventListener('change', () => this.updateFretboard());
        document.getElementById('note-gradient').addEventListener('change', () => this.updateFretboard());
        document.getElementById('note-offset').addEventListener('change', () => this.updateFretboard());
        
        // String appearance settings
        document.getElementById('string-thickness').addEventListener('change', () => this.updateFretboard());
        document.getElementById('string-style').addEventListener('change', () => this.updateFretboard());
        document.getElementById('string-gradient').addEventListener('change', () => this.updateFretboard());
        document.getElementById('string-effect').addEventListener('change', () => this.updateFretboard());
        document.getElementById('string-spacing').addEventListener('change', () => this.updateFretboard());
        document.getElementById('string-opacity').addEventListener('change', () => this.updateFretboard());
        
        // Fret appearance settings
        document.getElementById('fret-style').addEventListener('change', () => this.updateFretboard());
        document.getElementById('fret-thickness').addEventListener('change', () => this.updateFretboard());
        
        // Action buttons
        document.getElementById('play-pattern').addEventListener('click', () => this.playCurrentPattern());
        document.getElementById('add-to-slideshow').addEventListener('click', () => this.addToSlideshow());
        document.getElementById('export-diagram').addEventListener('click', () => this.exportCurrentDiagram());
        
        document.getElementById('sidebar-add-to-slideshow').addEventListener('click', () => this.addToSlideshow());
        
        document.getElementById('play-slideshow').addEventListener('click', () => this.playSlideshow());
        document.getElementById('export-all').addEventListener('click', () => this.exportAll());
        document.getElementById('clear-slideshow').addEventListener('click', () => this.clearSlideshow());
        
        document.getElementById('generate-all-intervals').addEventListener('click', () => this.generateAllIntervals());
        document.getElementById('generate-all-scales').addEventListener('click', () => this.generateAllScales());
        document.getElementById('generate-all-chords').addEventListener('click', () => this.generateAllChords());
        
        document.getElementById('export-diagrams-only').addEventListener('click', () => this.exportAllDiagramsOnly());
        document.getElementById('set-filename').addEventListener('click', () => this.setCustomFilename());
        
        // Fret number options
        document.getElementById('fret-numbers-placement').addEventListener('change', () => this.updateFretboard());
        document.getElementById('fret-numbers-position').addEventListener('change', () => this.updateFretboard());
        document.getElementById('fret-numbers-size').addEventListener('change', () => this.updateFretboard());
        document.getElementById('fret-numbers-offset').addEventListener('change', () => this.updateFretboard());
        document.getElementById('fret-markers-placement').addEventListener('change', () => this.updateFretboard());
        document.getElementById('fret-markers-offset').addEventListener('change', () => this.updateFretboard());
        
        // Tempo control
        document.getElementById('tempo-range').addEventListener('input', (e) => {
            this.tempo = parseInt(e.target.value);
            document.getElementById('tempo-value').textContent = this.tempo;
        });
        
        // Theory info display checkboxes
        const theoryCheckboxes = document.querySelectorAll('.theory-info-checkbox');
        theoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateTheoryInfo());
        });
        
        // Add specific event handler for the hide-about-section checkbox
        document.querySelector('#hide-about-section').addEventListener('change', () => {
            this.updateTheoryInfo();
        });
        
        // Melodic pattern controls
        document.getElementById('melodic-pattern-select').addEventListener('change', e => {
            if (e.target.value === 'custom') {
                document.getElementById('custom-pattern-container').style.display = 'block';
            } else {
                document.getElementById('custom-pattern-container').style.display = 'none';
            }
        });
        
        document.getElementById('play-melodic-pattern').addEventListener('click', () => this.playMelodicPattern());
        document.getElementById('stop-melodic-pattern').addEventListener('click', () => this.stopMelodicPattern());
        
        // Save all scales button
        document.getElementById('save-all-scales').addEventListener('click', () => this.exportAllScalesForAllKeys());
        document.getElementById('save-all-chords').addEventListener('click', () => this.exportAllChordsForAllKeys());
        document.getElementById('save-all-intervals').addEventListener('click', () => this.exportAllIntervalsForAllKeys());
        
        // Add event listener for the new save-scales-zip button
        document.getElementById('save-scales-zip').addEventListener('click', () => this.exportAllScalesToZip());
        document.getElementById('save-chords-zip').addEventListener('click', () => this.exportAllChordsToZip());
        document.getElementById('save-intervals-zip').addEventListener('click', () => this.exportAllIntervalsToZip());

        // Event listeners for new all-string-counts ZIP export buttons
        document.getElementById('save-scales-all-strings-zip').addEventListener('click', () => this.exportAllPatternsForAllStringCountsToZip('scale', 'all_scales_all_strings.zip'));
        document.getElementById('save-chords-all-strings-zip').addEventListener('click', () => this.exportAllPatternsForAllStringCountsToZip('chord', 'all_chords_all_strings.zip'));
        document.getElementById('save-intervals-all-strings-zip').addEventListener('click', () => this.exportAllPatternsForAllStringCountsToZip('interval', 'all_intervals_all_strings.zip'));
    }
    
    /**
     * Update tuning inputs based on the number of strings
     */
    updateTuningInputs(tuning = null) {
        const stringCount = parseInt(document.getElementById('string-count').value);
        const tuningContainer = document.getElementById('tuning-container');
        tuningContainer.innerHTML = '';
        
        // If tuning is not provided, use default for this string count
        if (!tuning) {
            tuning = this.musicTheory.getDefaultTuning(stringCount);
            // Reverse the tuning array to display highest string first
            tuning.reverse();
        }
        
        // Make sure we have the right number of tuning values
        while (tuning.length < stringCount) {
            tuning.push('E'); // Add a default if needed
        }
        tuning = tuning.slice(0, stringCount); // Trim if too many
        
        // Create inputs for each string
        for (let i = 0; i < stringCount; i++) {
            const div = document.createElement('div');
            div.className = 'tuning-input';
            
            const label = document.createElement('label');
            label.textContent = `String ${stringCount - i}:`;  // Reverse the string numbers
            div.appendChild(label);
            
            const select = document.createElement('select');
            select.className = 'tuning-select';
            select.setAttribute('data-string', i);
            
            // Add options for all notes
            this.musicTheory.notes.forEach(note => {
                const option = document.createElement('option');
                option.value = note;
                option.textContent = note;
                if (note === tuning[i]) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            
            select.addEventListener('change', () => this.updateFretboard());
            
            div.appendChild(select);
            
            // Add "Show notes on string" checkbox
            const showCheckbox = document.createElement('input');
            showCheckbox.type = 'checkbox';
            showCheckbox.className = 'show-string-notes';
            showCheckbox.setAttribute('data-string', i);
            showCheckbox.checked = true; // Show by default
            showCheckbox.style.width = 'auto';
            showCheckbox.style.marginLeft = '10px';
            showCheckbox.addEventListener('change', () => this.updateFretboard());
            
            const checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = 'Show';
            checkboxLabel.style.marginBottom = '0';
            checkboxLabel.style.marginLeft = '5px';
            
            div.appendChild(showCheckbox);
            div.appendChild(checkboxLabel);
            
            // Add "Start Fret" input for this string
            const startFretInput = document.createElement('input');
            startFretInput.type = 'number';
            startFretInput.className = 'string-start-fret';
            startFretInput.setAttribute('data-string', i);
            startFretInput.min = '0';
            startFretInput.max = '24';
            startFretInput.value = this.settings?.stringStartFrets?.[i] || '0';
            startFretInput.style.width = '50px';
            startFretInput.style.marginLeft = '10px';
            startFretInput.addEventListener('change', () => this.updateFretboard());
            
            const startFretLabel = document.createElement('label');
            startFretLabel.textContent = 'Start:';
            startFretLabel.style.marginBottom = '0';
            startFretLabel.style.marginLeft = '10px';
            
            div.appendChild(startFretLabel);
            div.appendChild(startFretInput);
            
            // Add "End Fret" input for this string
            const endFretInput = document.createElement('input');
            endFretInput.type = 'number';
            endFretInput.className = 'string-end-fret';
            endFretInput.setAttribute('data-string', i);
            endFretInput.min = '1';
            endFretInput.max = '24';
            endFretInput.value = this.settings?.stringEndFrets?.[i] || '24';
            endFretInput.style.width = '50px';
            endFretInput.style.marginLeft = '10px';
            endFretInput.addEventListener('change', () => this.updateFretboard());
            
            const endFretLabel = document.createElement('label');
            endFretLabel.textContent = 'End:';
            endFretLabel.style.marginBottom = '0';
            endFretLabel.style.marginLeft = '10px';
            
            div.appendChild(endFretLabel);
            div.appendChild(endFretInput);
            
            tuningContainer.appendChild(div);
        }
    }
    
    /**
     * Update pattern select options based on the selected pattern type
     */
    updatePatternSelect() {
        const patternType = document.getElementById('pattern-type').value;
        const patternSelect = document.getElementById('pattern-select');
        patternSelect.innerHTML = '';
        let patterns;
        switch (patternType) {
            case 'scale':
                patterns = this.musicTheory.scales;
                break;
            case 'chord':
                patterns = this.musicTheory.chords;
                break;
            case 'interval':
                patterns = this.musicTheory.intervals;
                break;
            case 'lesson':
                // Populate from lessons array
                for (let i = 0; i < this.lessons.length; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = this.lessons[i].title;
                    patternSelect.appendChild(option);
                }
                return; // exit function here
            case 'chord_progression':
                patterns = this.chordProgressionPatterns;
                break;
            case 'grid':
                // For grid patterns, create options for 3-fret spans up to the 15th fret
                for (let i = 0; i <= 13; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = `Positions ${i}-${i+2}`;
                    patternSelect.appendChild(option);
                }
                return; // exit function here
            case 'grid2':
                // For 2-fret grid patterns, create options for 2-fret spans up to the 15th fret
                for (let i = 0; i <= 14; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = `Positions ${i}-${i+1}`;
                    patternSelect.appendChild(option);
                }
                return; // exit function here
            default:
                patterns = {};
        }
        for (const [id, data] of Object.entries(patterns)) {
            const option = document.createElement('option');
            // For chord progression patterns, use the id and name properties;
            // for others, id is the key and data.name is used.
            if (patternType === 'chord_progression') {
                option.value = data.id;
                option.textContent = data.name;
            } else {
                option.value = id;
                option.textContent = data.name;
            }
            patternSelect.appendChild(option);
        }
    }
    
    /**
     * Create color inputs for custom theme
     */
    createCustomColorInputs() {
        const customColors = document.getElementById('custom-colors');
        customColors.innerHTML = '';
        
        // Background color
        this.addColorPicker(customColors, 'background', 'Background', '#FFFFFF');
        
        // Strings color
        this.addColorPicker(customColors, 'strings', 'Strings', '#888888');
        
        // Frets color
        this.addColorPicker(customColors, 'frets', 'Frets', '#444444');
        
        // Markers color
        this.addColorPicker(customColors, 'markers', 'Markers', '#333333');
        
        // Interval colors
        const intervalSection = document.createElement('div');
        intervalSection.innerHTML = '<h3>Interval Colors</h3>';
        customColors.appendChild(intervalSection);
        
        Object.entries(this.musicTheory.intervals).forEach(([interval, data]) => {
            this.addColorPicker(
                customColors, 
                `intervals.${interval}`, 
                `${data.name} (${data.shortName})`, 
                data.color
            );
        });
    }
    
    /**
     * Add a color picker input
     */
    addColorPicker(container, key, label, defaultColor) {
        const div = document.createElement('div');
        div.className = 'color-picker';
        
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        div.appendChild(labelElement);
        
        const input = document.createElement('input');
        input.type = 'color';
        input.value = defaultColor;
        input.setAttribute('data-color-key', key);
        input.addEventListener('change', () => this.updateFretboard());
        
        div.appendChild(input);
        container.appendChild(div);
    }
    
    /**
     * Update string and fret labels
     */
    updateStringAndFretLabels() {
        const stringCount = document.getElementById('string-count').value;
        document.querySelector('label[for="string-count"]').textContent = `Number of Strings (${stringCount}):`;
        
        const startFret = document.getElementById('start-fret').value;
        document.querySelector('label[for="start-fret"]').textContent = `Start Fret (${startFret}):`;
        
        const endFret = document.getElementById('end-fret').value;
        document.querySelector('label[for="end-fret"]').textContent = `End Fret (${endFret}):`;
    }
    
    /**
     * Get the current tuning from inputs
     */
    getCurrentTuning() {
        const tuning = [];
        const selects = document.querySelectorAll('.tuning-select');
        
        selects.forEach(select => {
            tuning[parseInt(select.getAttribute('data-string'))] = select.value;
        });
        
        return tuning;
    }
    
    /**
     * Get which strings should show notes
     */
    getVisibleStrings() {
        const visibleStrings = [];
        const checkboxes = document.querySelectorAll('.show-string-notes');
        
        checkboxes.forEach(checkbox => {
            visibleStrings[parseInt(checkbox.getAttribute('data-string'))] = checkbox.checked;
        });
        
        return visibleStrings;
    }
    
    /**
     * Get string start frets from inputs
     */
    getStringStartFrets() {
        const stringStartFrets = [];
        const startFretInputs = document.querySelectorAll('.string-start-fret');
        
        startFretInputs.forEach(input => {
            stringStartFrets[parseInt(input.getAttribute('data-string'))] = parseInt(input.value) || 0;
        });
        
        return stringStartFrets;
    }
    
    /**
     * Get string end frets from inputs
     */
    getStringEndFrets() {
        const stringEndFrets = [];
        const endFretInputs = document.querySelectorAll('.string-end-fret');
        
        endFretInputs.forEach(input => {
            stringEndFrets[parseInt(input.getAttribute('data-string'))] = parseInt(input.value) || 24;
        });
        
        return stringEndFrets;
    }
    
    /**
     * Get custom colors if custom theme is selected
     */
    getCustomColors() {
        if (document.getElementById('color-theme').value !== 'custom') {
            return {};
        }
        
        const colors = {
            intervals: {}
        };
        
        document.querySelectorAll('[data-color-key]').forEach(input => {
            const key = input.getAttribute('data-color-key');
            
            if (key.startsWith('intervals.')) {
                const interval = key.split('.')[1];
                colors.intervals[interval] = input.value;
            } else {
                colors[key] = input.value;
            }
        });
        
        return colors;
    }
    
    /**
     * Update the fretboard with current settings
     */
    updateFretboard() {
        // Validate fret input values—ensure start fret is not greater than end fret
        let sf = parseInt(document.getElementById('start-fret').value);
        let ef = parseInt(document.getElementById('end-fret').value);
        if (sf > ef) {
            alert("Start fret cannot be greater than end fret. Adjusting start fret to match end fret.");
            sf = ef;
            document.getElementById('start-fret').value = sf;
        }
        
        // Update UI labels
        this.updateStringAndFretLabels();
        
        // Get current settings from inputs
        const settings = {
            tuning: this.getCurrentTuning(),
            startFret: sf, // Validated start fret
            endFret: ef,
            stringHeight: parseInt(document.getElementById('string-height').value),
            fretWidth: parseInt(document.getElementById('fret-width').value),
            displayMode: document.getElementById('display-mode').value,
            colorTheme: document.getElementById('color-theme').value,
            customColors: this.getCustomColors(),
            fretNumbersPlacement: document.getElementById('fret-numbers-placement').value,
            fretNumbersPosition: document.getElementById('fret-numbers-position').value,
            fretNumbersSize: parseInt(document.getElementById('fret-numbers-size').value),
            fretNumbersOffset: parseInt(document.getElementById('fret-numbers-offset').value),
            fretMarkersPlacement: document.getElementById('fret-markers-placement').value,
            fretMarkersOffset: parseInt(document.getElementById('fret-markers-offset').value),
            noteSize: parseInt(document.getElementById('note-size').value),
            noteShape: document.getElementById('note-shape').value,
            noteFont: document.getElementById('note-font').value,
            noteFontSize: parseInt(document.getElementById('note-font-size').value),
            noteEffect: document.getElementById('note-effect').value,
            noteGradient: document.getElementById('note-gradient').checked,
            noteOffset: parseInt(document.getElementById('note-offset').value),
            stringThickness: parseInt(document.getElementById('string-height').value), // Use string height for thickness
            stringStyle: document.getElementById('string-style').value,
            stringGradient: document.getElementById('string-gradient').checked,
            stringEffect: document.getElementById('string-effect').value,
            stringSpacing: parseInt(document.getElementById('string-spacing').value),
            stringOpacity: parseInt(document.getElementById('string-opacity').value) / 100,
            visibleStrings: this.getVisibleStrings(),
            stringStartFrets: this.getStringStartFrets(),
            stringEndFrets: this.getStringEndFrets(),
            fretStyle: document.getElementById('fret-style').value,
            fretThickness: parseInt(document.getElementById('fret-width').value) // Use fret width for thickness
        };
        
        // Store settings for future reference
        this.settings = settings;
        
        // Update fretboard settings
        this.fretboard.updateSettings(settings);
        
        // Update pattern display
        const key = document.getElementById('key-select').value;
        const patternType = document.getElementById('pattern-type').value;
        const pattern = document.getElementById('pattern-select').value;
        
        if (patternType === 'lesson') {
            // For lessons, clear active notes and show the "Edit Lesson" button
            this.fretboard.activeNotes = [];
            this.showLessonEditorButton();
        } else if (patternType === 'chord_progression') {
            // For chord progressions, we do not highlight individual fretboard notes.
            this.fretboard.activeNotes = [];
        } else if (patternType === 'grid') {
            // For grid patterns, we'll show a specific 3-fret section of the major scale
            const gridPosition = parseInt(pattern);
            const startFret = gridPosition;
            const endFret = gridPosition + 2; // 3-fret span
            
            // Update fretboard settings to show only this section
            const updatedSettings = { ...this.settings };
            updatedSettings.startFret = startFret;
            updatedSettings.endFret = endFret;
            this.fretboard.updateSettings(updatedSettings);
            
            // Use the major scale pattern
            this.fretboard.updatePattern(key, 'scale', 'major');
        } else if (patternType === 'grid2') {
            // For 2-fret grid patterns, we'll show a specific 2-fret section of the major scale
            const gridPosition = parseInt(pattern);
            const startFret = gridPosition;
            const endFret = gridPosition + 1; // 2-fret span
            
            // Update fretboard settings to show only this section
            const updatedSettings = { ...this.settings };
            updatedSettings.startFret = startFret;
            updatedSettings.endFret = endFret;
            this.fretboard.updateSettings(updatedSettings);
            
            // Use the major scale pattern
            this.fretboard.updatePattern(key, 'scale', 'major');
        } else {
            this.removeLessonEditorButton();
            this.fretboard.updatePattern(key, patternType, pattern);
        }
        
        this.updateTheoryInfo();
        
        // Update MP3 player source if visible
        const mp3Container = document.querySelector('.mp3-player-container');
        if (mp3Container && mp3Container.style.display !== 'none') {
            this.updateAudioSource();
        }
        
        // Update JPG image source if visible
        const jpgContainer = document.querySelector('.jpg-image-container');
        if (jpgContainer && jpgContainer.style.display !== 'none') {
            this.updateImageSource();
        }
        
        // Update piano highlights if piano is visible
        const tunerContainer = document.querySelector('.piano-container');
        if (tunerContainer && tunerContainer.style.display !== 'none') {
            this.updatePianoHighlights();
        }
    }
    
    /**
     * Play the current pattern
     */
    async playCurrentPattern() {
        if (!this.synth) {
            await this.initSynth();
        }
        
        const key = document.getElementById('key-select').value;
        const patternType = document.getElementById('pattern-type').value;
        const pattern = document.getElementById('pattern-select').value;
        let notes = [];
        
        // Get the notes based on pattern type
        if (patternType === 'scale') {
            notes = this.musicTheory.getScaleNotes(key, pattern);
        } else if (patternType === 'chord') {
            notes = this.musicTheory.getChordNotes(key, pattern);
        } else if (patternType === 'interval') {
            const interval = pattern;
            const targetNote = this.musicTheory.getNoteFromInterval(key, interval);
            notes = [key, targetNote];
        }
        
        // Ensure we have notes to play
        if (notes.length === 0) {
            console.error('No notes to play');
            return;
        }
        
        // Update theory info panel
        this.updateTheoryInfo(key, patternType, pattern);
        
        // Get all note markers on the fretboard
        const markers = this.fretboard.container.querySelectorAll('.note-marker');
        const noteElements = [];
        
        // Group markers by notes
        markers.forEach(marker => {
            if (marker.nextSibling && marker.nextSibling.tagName === 'text') {
                const textElement = marker.nextSibling;
                const text = textElement.textContent;
                
                // Store reference to the marker and its text
                noteElements.push({
                    marker,
                    textElement,
                    note: text
                });
            }
        });
        
        // Calculate duration based on tempo
        const beatDuration = 60 / this.tempo; // in seconds
        
        // Map notes to frequencies in the 4th octave
        const noteFrequencies = notes.map(note => {
            return this.musicTheory.getNoteFrequency(note, 4);
        }).filter(freq => freq !== null);
        
        // Play the notes
        if (patternType === 'chord' || patternType === 'interval') {
            // Highlight all chord notes simultaneously
            noteElements.forEach(element => {
                this.animateNoteMarker(element.marker);
            });
            
            // Play chord (all notes at once)
            this.synth.triggerAttackRelease(noteFrequencies, beatDuration * 2);
        } else {
            // Play scale (notes in sequence)
            const now = Tone.now();
            
            // Play and animate ascending
            for (let i = 0; i < noteFrequencies.length; i++) {
                const freq = noteFrequencies[i];
                const note = notes[i];
                
                // Find corresponding markers for this note
                const noteMarkers = noteElements.filter(el => {
                    const intervals = this.musicTheory.intervals;
                    const interval = this.musicTheory.getInterval(key, note);
                    return el.note === (this.fretboard.settings.displayMode === 'intervals' && interval ? 
                        intervals[interval].shortName : note);
                });
                
                // Schedule note playback
                this.synth.triggerAttackRelease(freq, beatDuration / 2, now + i * beatDuration);
                
                // Schedule marker animation
                if (noteMarkers.length > 0) {
                    setTimeout(() => {
                        noteMarkers.forEach(el => this.animateNoteMarker(el.marker));
                    }, i * beatDuration * 1000);
                }
            }
            
            // Play back down for scales
            if (patternType === 'scale' && noteFrequencies.length > 2) {
                const descendingFreqs = [...noteFrequencies].reverse().slice(1);
                const descendingNotes = [...notes].reverse().slice(1);
                
                descendingFreqs.forEach((freq, i) => {
                    const note = descendingNotes[i];
                    const offset = noteFrequencies.length + i;
                    
                    // Find markers for this note
                    const noteMarkers = noteElements.filter(el => {
                        const intervals = this.musicTheory.intervals;
                        const interval = this.musicTheory.getInterval(key, note);
                        return el.note === (this.fretboard.settings.displayMode === 'intervals' && interval ? 
                            intervals[interval].shortName : note);
                    });
                    
                    // Schedule note playback
                    this.synth.triggerAttackRelease(freq, beatDuration / 2, now + offset * beatDuration);
                    
                    // Schedule marker animation
                    if (noteMarkers.length > 0) {
                        setTimeout(() => {
                            noteMarkers.forEach(el => this.animateNoteMarker(el.marker));
                        }, (offset) * beatDuration * 1000);
                    }
                });
            }
        }
    }
    
    /**
     * Animate a note marker when playing
     */
    animateNoteMarker(marker) {
        // Save original values
        const originalRadius = marker.getAttribute('r');
        const originalStrokeWidth = marker.getAttribute('stroke-width');
        
        // Expand the marker
        marker.setAttribute('r', 20);
        marker.setAttribute('stroke-width', 3);
        marker.setAttribute('stroke', '#fff');
        
        // Add a temporary glow effect
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        glow.setAttribute('id', 'glow-effect');
        glow.innerHTML = `
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        `;
        this.fretboard.svg.appendChild(glow);
        marker.setAttribute('filter', 'url(#glow-effect)');
        
        // Reset after animation
        setTimeout(() => {
            marker.setAttribute('r', originalRadius);
            marker.setAttribute('stroke-width', originalStrokeWidth);
            marker.removeAttribute('filter');
            marker.removeAttribute('stroke');
            
            // Remove the filter
            const filterElement = this.fretboard.svg.querySelector('#glow-effect');
            if (filterElement) {
                this.fretboard.svg.removeChild(filterElement);
            }
        }, 300);
    }
    
    /**
     * Add the current diagram to the slideshow
     */
    addToSlideshow() {
        // Create a clone of the fretboard container
        const clone = this.fretboard.container.cloneNode(true);
        
        // Get current info for naming
        const info = this.fretboard.getCurrentInfo();
        
        // Create a slideshow item object
        const item = {
            element: clone,
            info: info,
            filename: `${info.tuning}-${info.key}-${info.patternType}-${info.pattern}.jpg`
        };
        
        this.slideshowItems.push(item);
        this.updateSlideshowDisplay();
    }
    
    /**
     * Update the slideshow display with the current items
     */
    updateSlideshowDisplay() {
        const container = document.getElementById('slideshow-items');
        container.innerHTML = '';
        
        this.slideshowItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'slideshow-item';
            
            // Add a thumbnail of the fretboard
            const thumb = document.createElement('div');
            thumb.className = 'thumbnail';
            thumb.innerHTML = item.element.innerHTML;
            itemDiv.appendChild(thumb);
            
            // Add the info
            const info = document.createElement('div');
            info.className = 'item-info';
            info.textContent = `${item.info.key} ${item.info.patternType} ${item.info.pattern}`;
            itemDiv.appendChild(info);
            
            // Add a delete button
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-item';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.addEventListener('click', () => {
                this.slideshowItems.splice(index, 1);
                this.updateSlideshowDisplay();
            });
            itemDiv.appendChild(deleteBtn);
            
            container.appendChild(itemDiv);
        });
    }
    
    /**
     * Play the slideshow
     */
    async playSlideshow() {
        if (this.slideshowItems.length === 0) {
            alert('No items in the slideshow');
            return;
        }

        // Get slide duration in seconds
        const duration = parseInt(document.getElementById('slideshow-duration').value) || 3;
        const durationMs = duration * 1000;
        const loopSlideshow = document.getElementById('slideshow-loop').checked;
        
        // Define a function for playing the slideshow once
        const playOnce = async () => {
            // Display each pattern in sequence
            for (let i = 0; i < this.slideshowItems.length; i++) {
                const item = this.slideshowItems[i];
                
                // Update the fretboard to show this pattern
                this.fretboard.updatePattern(
                    item.info.key,
                    item.info.patternType,
                    item.info.pattern
                );
                
                // Wait between patterns based on user-defined duration
                await new Promise(resolve => setTimeout(resolve, durationMs));
            }
        };
        
        // Play the slideshow once initially
        await playOnce();
        
        // If loop is enabled, continue playing until user interrupts
        while (loopSlideshow && document.getElementById('slideshow-loop').checked) {
            await playOnce();
        }
    }
    
    /**
     * Export the current diagram as an image
     */
    exportCurrentDiagram() {
        const info = this.fretboard.getCurrentInfo();
        const customFilename = this.customFilename || `${info.tuning}-${info.key}-${info.patternType}-${info.pattern}.jpg`;
        
        // Make sure theory info is visible before export
        const theoryPanel = document.getElementById('theory-info-panel');
        if (theoryPanel) {
            theoryPanel.style.display = 'block';
            const content = theoryPanel.querySelector('.theory-info-content');
            if (content) content.style.display = 'grid';
        }
        
        this.fretboard.exportImage(customFilename);
    }
    
    /**
     * Export all diagrams in the slideshow
     */
    async exportAll() {
        if (this.slideshowItems.length === 0) {
            alert('No items to export');
            return;
        }
        
        // Create and show stop export button
        const exportBtn = document.getElementById('export-all');
        const originalText = exportBtn.textContent;
        exportBtn.textContent = 'Exporting...';
        exportBtn.disabled = true;
        
        const stopExportBtn = document.createElement('button');
        stopExportBtn.textContent = 'Stop Exporting';
        stopExportBtn.style.backgroundColor = '#e74c3c';
        stopExportBtn.style.marginLeft = '10px';
        stopExportBtn.addEventListener('click', () => {
            this.stopExporting = true;
            stopExportBtn.disabled = true;
            stopExportBtn.textContent = 'Stopping...';
        });
        exportBtn.insertAdjacentElement('afterend', stopExportBtn);
        
        // Reset stop flag
        this.stopExporting = false;
        
        // Export each item in sequence
        let i = 0;
        for (i = 0; i < this.slideshowItems.length; i++) {
            // Check if export should be stopped
            if (this.stopExporting) {
                break;
            }
            
            const item = this.slideshowItems[i];
            
            // Update export progress
            exportBtn.textContent = `Exporting ${i+1}/${this.slideshowItems.length}...`;
            
            // Update the fretboard to show this pattern
            this.fretboard.updatePattern(
                item.info.key,
                item.info.patternType,
                item.info.pattern
            );
            
            // Update theory info specific to this pattern
            this.updateTheoryInfo(item.info.key, item.info.patternType, item.info.pattern);
            
            // Use custom filename if set
            const filename = this.customFilename ? 
                `${i+1}_${this.customFilename}` : 
                item.filename;
            
            // Export the image
            await this.fretboard.exportImage(filename);
            
            // Brief pause between exports
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Remove stop button
        if (stopExportBtn.parentNode) {
            stopExportBtn.parentNode.removeChild(stopExportBtn);
        }
        
        // Reset button
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
        
        if (this.stopExporting) {
            alert(`Export stopped after ${i} diagrams`);
        } else {
            alert(`Exported ${this.slideshowItems.length} diagrams`);
        }
    }
    
    /**
     * Export all diagrams without theory info
     */
    async exportAllDiagramsOnly() {
        if (this.slideshowItems.length === 0) {
            alert('No items to export');
            return;
        }
        
        // Create and show stop export button
        const exportBtn = document.getElementById('export-diagrams-only');
        const originalText = exportBtn.textContent;
        exportBtn.textContent = 'Exporting...';
        exportBtn.disabled = true;
        
        const stopExportBtn = document.createElement('button');
        stopExportBtn.textContent = 'Stop Exporting';
        stopExportBtn.style.backgroundColor = '#e74c3c';
        stopExportBtn.style.marginLeft = '10px';
        stopExportBtn.addEventListener('click', () => {
            this.stopExporting = true;
            stopExportBtn.disabled = true;
            stopExportBtn.textContent = 'Stopping...';
        });
        exportBtn.insertAdjacentElement('afterend', stopExportBtn);
        
        // Reset stop flag
        this.stopExporting = false;
        
        // Hide theory info panel
        const theoryPanel = document.getElementById('theory-info-panel');
        if (theoryPanel) {
            theoryPanel.style.display = 'none';
        }
        
        // Export each item in sequence
        let i = 0;
        for (i = 0; i < this.slideshowItems.length; i++) {
            // Check if export should be stopped
            if (this.stopExporting) {
                break;
            }
            
            const item = this.slideshowItems[i];
            
            // Update export progress
            exportBtn.textContent = `Exporting ${i+1}/${this.slideshowItems.length}...`;
            
            // Update the fretboard to show this pattern
            this.fretboard.updatePattern(
                item.info.key,
                item.info.patternType,
                item.info.pattern
            );
            
            // Use custom filename if set
            const filename = this.customFilename ? 
                `${i+1}_diagram_${this.customFilename}` : 
                `diagram_${item.filename}`;
            
            // Export the image
            await this.fretboard.exportImage(filename);
            
            // Brief pause between exports
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Restore theory panel display
        if (theoryPanel) {
            theoryPanel.style.display = 'block';
        }
        
        // Remove stop button
        if (stopExportBtn.parentNode) {
            stopExportBtn.parentNode.removeChild(stopExportBtn);
        }
        
        // Reset button
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
        
        if (this.stopExporting) {
            alert(`Export stopped after ${i} diagrams`);
        } else {
            alert(`Exported ${this.slideshowItems.length} diagrams without theory info`);
        }
    }
    
    /**
     * Set a custom filename for exports
     */
    setCustomFilename() {
        const filename = prompt('Enter custom filename for exports (without extension):', this.customFilename || '');
        if (filename !== null) {
            this.customFilename = filename.trim();
            alert(`Filename set to: ${this.customFilename || 'Default'}`);
        }
    }
    
    /**
     * Clear the slideshow
     */
    clearSlideshow() {
        this.slideshowItems = [];
        this.updateSlideshowDisplay();
    }
    
    /**
     * Generate diagrams for all intervals from the current key
     */
    generateAllIntervals() {
        const key = document.getElementById('key-select').value;
        const patternType = 'interval';
        
        // Check if we're already showing interval patterns and toggle if so
        if (this.generatedPatterns.length > 0 && 
            this.generatedPatterns[0].patternType === 'interval') {
            // Clear patterns and hide export buttons
            this.generatedPatterns = [];
            this.updateGeneratedPatternsDisplay();
            return;
        }
        
        // Clear previous generated patterns
        this.generatedPatterns = [];
        
        // Generate a pattern for each interval
        Object.keys(this.musicTheory.intervals).forEach(interval => {
            const targetNote = this.musicTheory.getNoteFromInterval(key, interval);
            const intervalData = this.musicTheory.intervals[interval];
            
            // Create a pattern object with detailed information
            const pattern = {
                key: key,
                patternType: patternType,
                pattern: interval,
                name: `${key} to ${targetNote} (${intervalData.name})`,
                info: {
                    semitones: intervalData.semitones,
                    quality: this.getIntervalQuality(interval),
                    consonance: this.getIntervalConsonance(interval),
                    notes: [key, targetNote]
                },
                filename: `${this.fretboard.settings.tuning.join('-')}-${key}-${interval}.jpg`
            };
            
            this.generatedPatterns.push(pattern);
        });
        
        this.updateGeneratedPatternsDisplay();
        
        // Add export all button
        this.addExportAllButton('Export All Intervals');
        
        // Add export all with info button
        this.addExportAllWithInfoButton('Export All Intervals (With Music Theory Info)');
    }
    
    /**
     * Generate diagrams for all scales in the current key
     */
    generateAllScales() {
        const key = document.getElementById('key-select').value;
        const patternType = 'scale';
        
        // Check if we're already showing scale patterns and toggle if so
        if (this.generatedPatterns.length > 0 && 
            this.generatedPatterns[0].patternType === 'scale') {
            // Clear patterns and hide export buttons
            this.generatedPatterns = [];
            this.updateGeneratedPatternsDisplay();
            return;
        }
        
        // Clear previous generated patterns
        this.generatedPatterns = [];
        
        // Generate a pattern for each scale
        Object.entries(this.musicTheory.scales).forEach(([scaleId, scaleData]) => {
            const notes = this.musicTheory.getScaleNotes(key, scaleId);
            const relatedModes = this.getRelatedModes(scaleId);
            
            // Get scale quality
            let quality = '';
            if (scaleId.includes('major')) {
                quality = 'Major';
            } else if (scaleId.includes('minor')) {
                quality = 'Minor';
            } else if (scaleId === 'diminished') {
                quality = 'Diminished';
            } else if (scaleId === 'whole_tone') {
                quality = 'Augmented';
            } else {
                quality = 'Other';
            }
            
            // Create a pattern object with detailed information
            const pattern = {
                key: key,
                patternType: patternType,
                pattern: scaleId,
                name: `${key} ${scaleData.name}`,
                info: {
                    notes: notes,
                    formula: scaleData.intervals.join('-'),
                    quality: quality,
                    relatedModes: relatedModes,
                    description: this.getScaleDescription(scaleId),
                    customProperties: scaleData.customProperties || {}
                },
                filename: `${this.fretboard.settings.tuning.join('-')}-${key}-${scaleId}.jpg`
            };
            
            this.generatedPatterns.push(pattern);
        });
        
        this.updateGeneratedPatternsDisplay();
        
        // Add export all buttons
        this.addExportAllButton('Export All Scales');
        this.addExportAllWithInfoButton('Export All Scales (With Music Theory Info)');
    }
    
    /**
     * Generate diagrams for all chords in the current key
     */
    generateAllChords() {
        const key = document.getElementById('key-select').value;
        const patternType = 'chord';
        
        // Check if we're already showing chord patterns and toggle if so
        if (this.generatedPatterns.length > 0 && 
            this.generatedPatterns[0].patternType === 'chord') {
            // Clear patterns and hide export buttons
            this.generatedPatterns = [];
            this.updateGeneratedPatternsDisplay();
            return;
        }
        
        // Clear previous generated patterns
        this.generatedPatterns = [];
        
        // Generate a pattern for each chord
        Object.entries(this.musicTheory.chords).forEach(([chordId, chordData]) => {
            const notes = this.musicTheory.getChordNotes(key, chordId);
            const inversions = this.getChordInversions(notes);
            
            // Get chord quality
            let quality = '';
            if (chordId === 'major') {
                quality = 'Major';
            } else if (chordId === 'minor') {
                quality = 'Minor';
            } else if (chordId.includes('diminished')) {
                quality = 'Diminished';
            } else if (chordId.includes('augmented')) {
                quality = 'Augmented';
            } else if (chordId.includes('major')) {
                quality = 'Major-derived';
            } else if (chordId.includes('minor')) {
                quality = 'Minor-derived';
            } else {
                quality = 'Other';
            }
            
            // Create a pattern object with detailed information
            const pattern = {
                key: key,
                patternType: patternType,
                pattern: chordId,
                name: `${key} ${chordData.name}`,
                info: {
                    notes: notes,
                    formula: chordData.intervals.join('-'),
                    quality: quality,
                    inversions: inversions,
                    description: this.getChordDescription(chordId)
                },
                filename: `${this.fretboard.settings.tuning.join('-')}-${key}-${chordId}.jpg`
            };
            
            this.generatedPatterns.push(pattern);
        });
        
        this.updateGeneratedPatternsDisplay();
        
        // Add export all button
        this.addExportAllButton('Export All Chords');
        
        // Add export all with info button
        this.addExportAllWithInfoButton('Export All Chords (With Music Theory Info)');
    }
    
    /**
     * Update the display of the generated patterns
     */
    updateGeneratedPatternsDisplay() {
        const container = document.getElementById('generated-patterns');
        container.innerHTML = '';
        
        this.generatedPatterns.forEach((pattern, index) => {
            const patternDiv = document.createElement('div');
            patternDiv.className = 'generated-pattern';
            
            // Add the info
            const info = document.createElement('div');
            info.className = 'pattern-info';
            info.textContent = pattern.name;
            
            // Add detailed info if available
            if (pattern.info) {
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'pattern-details';
                detailsDiv.style.fontSize = '12px';
                detailsDiv.style.color = '#666';
                detailsDiv.style.marginTop = '5px';
                
                if (pattern.patternType === 'interval') {
                    detailsDiv.innerHTML = `
                        <div><strong>Notes:</strong> ${pattern.info.notes.join(' - ')}</div>
                        <div><strong>Semitones:</strong> ${pattern.info.semitones}</div>
                        <div><strong>Quality:</strong> ${pattern.info.quality}</div>
                    `;
                } else if (pattern.patternType === 'scale') {
                    detailsDiv.innerHTML = `
                        <div><strong>Notes:</strong> ${pattern.info.notes.join(' - ')}</div>
                        <div><strong>Formula:</strong> ${pattern.info.formula}</div>
                        <div><strong>Quality:</strong> ${pattern.info.quality}</div>
                    `;
                } else if (pattern.patternType === 'chord') {
                    detailsDiv.innerHTML = `
                        <div><strong>Notes:</strong> ${pattern.info.notes.join(' - ')}</div>
                        <div><strong>Formula:</strong> ${pattern.info.formula}</div>
                        <div><strong>Quality:</strong> ${pattern.info.quality}</div>
                    `;
                }
                
                info.appendChild(detailsDiv);
            }
            
            patternDiv.appendChild(info);
            
            // Add buttons
            const viewCheckbox = document.createElement('input');
            viewCheckbox.type = 'checkbox';
            viewCheckbox.id = 'view-pattern';
            viewCheckbox.style.display = 'none';
            viewCheckbox.addEventListener('change', () => {
                if (viewCheckbox.checked) {
                    this.fretboard.updatePattern(pattern.key, pattern.patternType, pattern.pattern);
                    this.updateTheoryInfo(pattern.key, pattern.patternType, pattern.pattern);
                }
            });
            
            const viewBtn = document.createElement('button');
            viewBtn.textContent = 'View';
            viewBtn.style.display = 'none';
            viewBtn.addEventListener('click', () => {
                this.fretboard.updatePattern(pattern.key, pattern.patternType, pattern.pattern);
                this.updateTheoryInfo(pattern.key, pattern.patternType, pattern.pattern);
            });
            patternDiv.appendChild(viewCheckbox);
            patternDiv.appendChild(viewBtn);
            
            const addBtn = document.createElement('button');
            addBtn.textContent = 'Add to Slideshow';
            addBtn.addEventListener('click', () => {
                // Update the fretboard to this pattern first
                this.fretboard.updatePattern(pattern.key, pattern.patternType, pattern.pattern);
                this.updateTheoryInfo(pattern.key, pattern.patternType, pattern.pattern);
                // Then add it to the slideshow
                this.addToSlideshow();
            });
            patternDiv.appendChild(addBtn);
            
            const exportBtn = document.createElement('button');
            exportBtn.textContent = 'Export';
            exportBtn.addEventListener('click', () => {
                // Update the fretboard to this pattern first
                this.fretboard.updatePattern(pattern.key, pattern.patternType, pattern.pattern);
                this.updateTheoryInfo(pattern.key, pattern.patternType, pattern.pattern);
                // Then export it
                this.fretboard.exportImage(pattern.filename);
            });
            patternDiv.appendChild(exportBtn);
            
            // Add Learn button
            const learnBtn = document.createElement('button');
            learnBtn.textContent = 'Learn';
            learnBtn.addEventListener('click', () => {
                this.openLessonPage(pattern.key, pattern.patternType, pattern.pattern);
            });
            patternDiv.appendChild(learnBtn);
            
            container.appendChild(patternDiv);
        });
    }
    
    /**
     * Add an export all button to the generated patterns section
     */
    addExportAllButton(buttonText) {
        const container = document.getElementById('generated-patterns');
        
        // Check if an export all button already exists and remove it
        const existingButton = container.querySelector('.export-all-generated');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Create new export all button
        const exportAllBtn = document.createElement('button');
        exportAllBtn.textContent = buttonText;
        exportAllBtn.className = 'export-all-generated';
        exportAllBtn.style.width = '100%';
        exportAllBtn.style.margin = '10px 0';
        exportAllBtn.style.padding = '10px';
        exportAllBtn.style.backgroundColor = '#e74c3c';
        
        exportAllBtn.addEventListener('click', () => this.exportAllGenerated());
        
        // Insert at the top of the container
        container.insertBefore(exportAllBtn, container.firstChild);
    }
    
    /**
     * Export all generated patterns
     */
    async exportAllGenerated() {
        if (this.generatedPatterns.length === 0) {
            alert('No patterns to export');
            return;
        }
        
        // Disable the button during export
        const exportBtn = document.querySelector('.export-all-generated');
        const originalText = exportBtn.textContent;
        exportBtn.textContent = 'Exporting...';
        exportBtn.disabled = true;
        
        // Create and show stop export button
        const stopExportBtn = document.createElement('button');
        stopExportBtn.textContent = 'Stop Exporting';
        stopExportBtn.style.backgroundColor = '#e74c3c';
        stopExportBtn.style.marginLeft = '10px';
        stopExportBtn.addEventListener('click', () => {
            this.stopExporting = true;
            stopExportBtn.disabled = true;
            stopExportBtn.textContent = 'Stopping...';
        });
        exportBtn.insertAdjacentElement('afterend', stopExportBtn);
        
        // Reset stop flag
        this.stopExporting = false;
        
        // Hide theory info panel
        const theoryPanel = document.getElementById('theory-info-panel');
        if (theoryPanel) {
            theoryPanel.style.display = 'none';
        }
        
        // Export each item in sequence
        let i = 0;
        for (i = 0; i < this.generatedPatterns.length; i++) {
            // Check if export should be stopped
            if (this.stopExporting) {
                break;
            }
            
            const pattern = this.generatedPatterns[i];
            
            // Update export progress
            exportBtn.textContent = `Exporting ${i+1}/${this.generatedPatterns.length}...`;
            
            // Update the fretboard to show this pattern
            this.fretboard.updatePattern(
                pattern.key,
                pattern.patternType,
                pattern.pattern
            );
            
            // Update theory info specific to this pattern
            this.updateTheoryInfo(pattern.key, pattern.patternType, pattern.pattern);
            
            // Use custom filename if set
            const filename = this.customFilename ? 
                `${i+1}_generated_${this.customFilename}` : 
                `generated_${pattern.filename}`;
            
            // Export the image
            await this.fretboard.exportImage(filename);
            
            // Brief pause between exports
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Restore theory panel display
        if (theoryPanel) {
            theoryPanel.style.display = 'block';
        }
        
        // Remove stop button
        if (stopExportBtn.parentNode) {
            stopExportBtn.parentNode.removeChild(stopExportBtn);
        }
        
        // Reset button
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
        
        if (this.stopExporting) {
            alert(`Export stopped after ${i} diagrams`);
        } else {
            alert(`Successfully exported ${this.generatedPatterns.length} diagrams`);
        }
    }
    
    /**
     * Add an export all with music theory info button
     */
    addExportAllWithInfoButton(buttonText) {
        const container = document.getElementById('generated-patterns');
        
        // Check if button already exists and remove it
        const existingButton = container.querySelector('.export-all-with-info');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Create new button
        const exportAllWithInfoBtn = document.createElement('button');
        exportAllWithInfoBtn.textContent = buttonText;
        exportAllWithInfoBtn.className = 'export-all-with-info';
        exportAllWithInfoBtn.style.width = '100%';
        exportAllWithInfoBtn.style.margin = '10px 0';
        exportAllWithInfoBtn.style.padding = '10px';
        exportAllWithInfoBtn.style.backgroundColor = '#27ae60';
        
        exportAllWithInfoBtn.addEventListener('click', () => this.exportAllGeneratedWithInfo());
        
        // Insert after the export all button
        const exportAllBtn = container.querySelector('.export-all-generated');
        if (exportAllBtn) {
            exportAllBtn.after(exportAllWithInfoBtn);
        } else {
            // Insert at the top if export all button doesn't exist
            container.insertBefore(exportAllWithInfoBtn, container.firstChild);
        }
    }
    
    /**
     * Export all generated patterns with music theory info
     */
    async exportAllGeneratedWithInfo() {
        if (this.generatedPatterns.length === 0) {
            alert('No patterns to export');
            return;
        }
        
        // Disable the button during export
        const exportBtn = document.querySelector('.export-all-with-info');
        const originalText = exportBtn.textContent;
        exportBtn.textContent = 'Exporting...';
        exportBtn.disabled = true;
        
        // Create and show stop export button
        const stopExportBtn = document.createElement('button');
        stopExportBtn.textContent = 'Stop Exporting';
        stopExportBtn.style.backgroundColor = '#e74c3c';
        stopExportBtn.style.marginLeft = '10px';
        stopExportBtn.addEventListener('click', () => {
            this.stopExporting = true;
            stopExportBtn.disabled = true;
            stopExportBtn.textContent = 'Stopping...';
        });
        exportBtn.insertAdjacentElement('afterend', stopExportBtn);
        
        // Reset stop flag
        this.stopExporting = false;
        
        // Make sure theory info panel is visible for exports
        const theoryPanel = document.getElementById('theory-info-panel');
        if (theoryPanel) {
            theoryPanel.style.display = 'block';
            const content = theoryPanel.querySelector('.theory-info-content');
            if (content) content.style.display = 'grid';
        }
        
        // Export each pattern in sequence
        let i = 0;
        for (i = 0; i < this.generatedPatterns.length; i++) {
            // Check if export should be stopped
            if (this.stopExporting) {
                break;
            }
            
            const pattern = this.generatedPatterns[i];
            
            // Update export progress
            exportBtn.textContent = `Exporting ${i+1}/${this.generatedPatterns.length}...`;
            
            // Update the fretboard to show this pattern
            this.fretboard.updatePattern(
                pattern.key,
                pattern.patternType,
                pattern.pattern
            );
            
            // Update theory info specific to this pattern
            this.updateTheoryInfo(pattern.key, pattern.patternType, pattern.pattern);
            
            // Export the image
            const filename = this.customFilename ? 
                `${i+1}_theory_${this.customFilename}` : 
                `theory_${pattern.filename}`;
            
            await this.fretboard.exportImage(filename);
            
            // Brief pause between exports
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Remove stop button
        if (stopExportBtn.parentNode) {
            stopExportBtn.parentNode.removeChild(stopExportBtn);
        }
        
        // Reset button
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
        
        if (this.stopExporting) {
            alert(`Export stopped after ${i} diagrams`);
        } else {
            alert(`Successfully exported ${this.generatedPatterns.length} diagrams with theory info`);
        }
    }
    
    /**
     * Add slideshow duration input to controls
     */
    addSlideshowDurationInput() {
        // This function is now handled differently - the elements are directly in the HTML
        // We can keep this method for compatibility, but it doesn't need to add elements
    }
    
    /**
     * Add fret number options
     */
    addFretNumberOptions() {
        const appearanceSection = document.querySelector('.appearance');
        
        // Create container for fret number options
        const fretNumbersSection = document.createElement('div');
        fretNumbersSection.innerHTML = '<h3>Fret Numbers</h3>';
        appearanceSection.appendChild(fretNumbersSection);
        
        // Placement (above/below)
        const placementGroup = document.createElement('div');
        placementGroup.className = 'control-group';
        
        const placementLabel = document.createElement('label');
        placementLabel.textContent = 'Placement:';
        placementLabel.setAttribute('for', 'fret-numbers-placement');
        
        const placementSelect = document.createElement('select');
        placementSelect.id = 'fret-numbers-placement';
        
        const placementOptions = [
            { value: 'below', text: 'Below Diagram' },
            { value: 'above', text: 'Above Diagram' }
        ];
        
        placementOptions.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.text;
            placementSelect.appendChild(optElement);
        });
        
        placementGroup.appendChild(placementLabel);
        placementGroup.appendChild(placementSelect);
        fretNumbersSection.appendChild(placementGroup);
        
        // Position (left/center/right)
        const positionGroup = document.createElement('div');
        positionGroup.className = 'control-group';
        
        const positionLabel = document.createElement('label');
        positionLabel.textContent = 'Alignment:';
        positionLabel.setAttribute('for', 'fret-numbers-position');
        
        const positionSelect = document.createElement('select');
        positionSelect.id = 'fret-numbers-position';
        
        const positionOptions = [
            { value: 'center', text: 'Centered' },
            { value: 'left', text: 'Left' },
            { value: 'right', text: 'Right' }
        ];
        
        positionOptions.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.text;
            positionSelect.appendChild(optElement);
        });
        
        positionGroup.appendChild(positionLabel);
        positionGroup.appendChild(positionSelect);
        fretNumbersSection.appendChild(positionGroup);
        
        // Size
        const sizeGroup = document.createElement('div');
        sizeGroup.className = 'control-group';
        
        const sizeLabel = document.createElement('label');
        sizeLabel.textContent = 'Size (px):';
        sizeLabel.setAttribute('for', 'fret-numbers-size');
        
        const sizeInput = document.createElement('input');
        sizeInput.type = 'number';
        sizeInput.id = 'fret-numbers-size';
        sizeInput.min = '8';
        sizeInput.max = '24';
        sizeInput.value = '12';
        
        sizeGroup.appendChild(sizeLabel);
        sizeGroup.appendChild(sizeInput);
        fretNumbersSection.appendChild(sizeGroup);

        // Add vertical offset slider for fret numbers
        const fretNumberOffsetGroup = document.createElement('div');
        fretNumberOffsetGroup.className = 'control-group';
        
        const fretNumberOffsetLabel = document.createElement('label');
        fretNumberOffsetLabel.textContent = 'Vertical Offset (px):';
        fretNumberOffsetLabel.setAttribute('for', 'fret-numbers-offset');
        
        const fretNumberOffsetInput = document.createElement('input');
        fretNumberOffsetInput.type = 'range';
        fretNumberOffsetInput.id = 'fret-numbers-offset';
        fretNumberOffsetInput.min = '-20';
        fretNumberOffsetInput.max = '20';
        fretNumberOffsetInput.value = '0';
        fretNumberOffsetInput.addEventListener('change', () => this.updateFretboard());
        
        fretNumberOffsetGroup.appendChild(fretNumberOffsetLabel);
        fretNumberOffsetGroup.appendChild(fretNumberOffsetInput);
        fretNumbersSection.appendChild(fretNumberOffsetGroup);

        // Add fret marker placement option
        const markerPlacementGroup = document.createElement('div');
        markerPlacementGroup.className = 'control-group';
        
        const markerPlacementLabel = document.createElement('label');
        markerPlacementLabel.textContent = 'Fret Marker Placement:';
        markerPlacementLabel.setAttribute('for', 'fret-markers-placement');
        
        const markerPlacementSelect = document.createElement('select');
        markerPlacementSelect.id = 'fret-markers-placement';
        
        const markerPlacementOptions = [
            { value: 'on', text: 'On Fretboard' },
            { value: 'above', text: 'Above Fretboard' },
            { value: 'below', text: 'Below Fretboard' }
        ];
        
        markerPlacementOptions.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.text;
            markerPlacementSelect.appendChild(optElement);
        });
        
        markerPlacementGroup.appendChild(markerPlacementLabel);
        markerPlacementGroup.appendChild(markerPlacementSelect);
        fretNumbersSection.appendChild(markerPlacementGroup);
        
        // Add vertical offset slider for fret markers
        const fretMarkerOffsetGroup = document.createElement('div');
        fretMarkerOffsetGroup.className = 'control-group';
        
        const fretMarkerOffsetLabel = document.createElement('label');
        fretMarkerOffsetLabel.textContent = 'Marker Offset (px):';
        fretMarkerOffsetLabel.setAttribute('for', 'fret-markers-offset');
        
        const fretMarkerOffsetInput = document.createElement('input');
        fretMarkerOffsetInput.type = 'range';
        fretMarkerOffsetInput.id = 'fret-markers-offset';
        fretMarkerOffsetInput.min = '-20';
        fretMarkerOffsetInput.max = '20';
        fretMarkerOffsetInput.value = '0';
        fretMarkerOffsetInput.addEventListener('change', () => this.updateFretboard());
        
        fretMarkerOffsetGroup.appendChild(fretMarkerOffsetLabel);
        fretMarkerOffsetGroup.appendChild(fretMarkerOffsetInput);
        fretNumbersSection.appendChild(fretMarkerOffsetGroup);
        
        // Add event listener for fret marker placement
        markerPlacementSelect.addEventListener('change', () => this.updateFretboard());
    }
    
    /**
     * Add note appearance customization options
     */
    addNoteAppearanceOptions() {
        const appearanceSection = document.querySelector('.appearance');
        
        // Create container for note appearance options
        const noteAppearanceSection = document.createElement('div');
        noteAppearanceSection.innerHTML = '<h3>Note Appearance</h3>';
        appearanceSection.appendChild(noteAppearanceSection);
        
        // Note size
        const sizeGroup = document.createElement('div');
        sizeGroup.className = 'control-group';
        
        const sizeLabel = document.createElement('label');
        sizeLabel.textContent = 'Note Size (px):';
        sizeLabel.setAttribute('for', 'note-size');
        
        const sizeInput = document.createElement('input');
        sizeInput.type = 'range';
        sizeInput.id = 'note-size';
        sizeInput.min = '8';
        sizeInput.max = '30';
        sizeInput.value = '15';
        
        sizeGroup.appendChild(sizeLabel);
        sizeGroup.appendChild(sizeInput);
        noteAppearanceSection.appendChild(sizeGroup);
        
        // Note shape
        const shapeGroup = document.createElement('div');
        shapeGroup.className = 'control-group';
        
        const shapeLabel = document.createElement('label');
        shapeLabel.textContent = 'Note Shape:';
        shapeLabel.setAttribute('for', 'note-shape');
        
        const shapeSelect = document.createElement('select');
        shapeSelect.id = 'note-shape';
        
        this.musicTheory.noteStyles.shapes.forEach(shape => {
            const option = document.createElement('option');
            option.value = shape;
            option.textContent = shape.charAt(0).toUpperCase() + shape.slice(1);
            shapeSelect.appendChild(option);
        });
        
        shapeGroup.appendChild(shapeLabel);
        shapeGroup.appendChild(shapeSelect);
        noteAppearanceSection.appendChild(shapeGroup);
        
        // Note font
        const fontGroup = document.createElement('div');
        fontGroup.className = 'control-group';
        
        const fontLabel = document.createElement('label');
        fontLabel.textContent = 'Font:';
        fontLabel.setAttribute('for', 'note-font');
        
        const fontSelect = document.createElement('select');
        fontSelect.id = 'note-font';
        
        this.musicTheory.noteStyles.fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            option.style.fontFamily = font;
            fontSelect.appendChild(option);
        });
        
        fontGroup.appendChild(fontLabel);
        fontGroup.appendChild(fontSelect);
        noteAppearanceSection.appendChild(fontGroup);
        
        // Font size
        const fontSizeGroup = document.createElement('div');
        fontSizeGroup.className = 'control-group';
        
        const fontSizeLabel = document.createElement('label');
        fontSizeLabel.textContent = 'Font Size (px):';
        fontSizeLabel.setAttribute('for', 'note-font-size');
        
        const fontSizeInput = document.createElement('input');
        fontSizeInput.type = 'range';
        fontSizeInput.id = 'note-font-size';
        fontSizeInput.min = '8';
        fontSizeInput.max = '24';
        fontSizeInput.value = '12';
        
        fontSizeGroup.appendChild(fontSizeLabel);
        fontSizeGroup.appendChild(fontSizeInput);
        noteAppearanceSection.appendChild(fontSizeGroup);
        
        // Note effects
        const effectGroup = document.createElement('div');
        effectGroup.className = 'control-group';
        
        const effectLabel = document.createElement('label');
        effectLabel.textContent = 'Effect:';
        effectLabel.setAttribute('for', 'note-effect');
        
        const effectSelect = document.createElement('select');
        effectSelect.id = 'note-effect';
        
        this.musicTheory.noteStyles.effects.forEach(effect => {
            const option = document.createElement('option');
            option.value = effect;
            option.textContent = effect.charAt(0).toUpperCase() + effect.slice(1);
            effectSelect.appendChild(option);
        });
        
        effectGroup.appendChild(effectLabel);
        effectGroup.appendChild(effectSelect);
        noteAppearanceSection.appendChild(effectGroup);
        
        // Gradient toggle
        const gradientGroup = document.createElement('div');
        gradientGroup.className = 'control-group';
        
        const gradientLabel = document.createElement('label');
        gradientLabel.textContent = 'Use Gradient:';
        gradientLabel.setAttribute('for', 'note-gradient');
        gradientLabel.style.display = 'inline';
        gradientLabel.style.marginRight = '10px';
        
        const gradientInput = document.createElement('input');
        gradientInput.type = 'checkbox';
        gradientInput.id = 'note-gradient';
        gradientInput.style.width = 'auto';
        
        gradientGroup.appendChild(gradientLabel);
        gradientGroup.appendChild(gradientInput);
        noteAppearanceSection.appendChild(gradientGroup);
        
        // Note vertical offset
        const offsetGroup = document.createElement('div');
        offsetGroup.className = 'control-group';
        
        const offsetLabel = document.createElement('label');
        offsetLabel.textContent = 'Vertical Offset (px):';
        offsetLabel.setAttribute('for', 'note-offset');
        
        const offsetInput = document.createElement('input');
        offsetInput.type = 'range';
        offsetInput.id = 'note-offset';
        offsetInput.min = '-20';
        offsetInput.max = '20';
        offsetInput.value = '0';
        
        offsetGroup.appendChild(offsetLabel);
        offsetGroup.appendChild(offsetInput);
        noteAppearanceSection.appendChild(offsetGroup);
    }
    
    /**
     * Add string appearance customization options
     */
    addStringAppearanceOptions() {
        const appearanceSection = document.querySelector('.appearance');
        
        // Create container for string appearance options
        const stringAppearanceSection = document.createElement('div');
        stringAppearanceSection.innerHTML = '<h3>String Appearance</h3>';
        appearanceSection.appendChild(stringAppearanceSection);
        
        // String thickness
        const thicknessGroup = document.createElement('div');
        thicknessGroup.className = 'control-group';
        
        const thicknessLabel = document.createElement('label');
        thicknessLabel.textContent = 'String Thickness (px):';
        thicknessLabel.setAttribute('for', 'string-thickness');
        
        const thicknessInput = document.createElement('input');
        thicknessInput.type = 'range';
        thicknessInput.id = 'string-thickness';
        thicknessInput.min = '1';
        thicknessInput.max = '10';
        thicknessInput.value = '3';
        
        thicknessGroup.appendChild(thicknessLabel);
        thicknessGroup.appendChild(thicknessInput);
        stringAppearanceSection.appendChild(thicknessGroup);
        
        // String style
        const styleGroup = document.createElement('div');
        styleGroup.className = 'control-group';
        
        const styleLabel = document.createElement('label');
        styleLabel.textContent = 'String Style:';
        styleLabel.setAttribute('for', 'string-style');
        
        const styleSelect = document.createElement('select');
        styleSelect.id = 'string-style';
        
        const styles = [
            'solid', 'dashed', 'dotted', 'double', 'longDash', 'shortDash', 'dashDot', 
            'dashDotDot', 'wave', 'zigzag', 'dotDash', 'crossed', 'triple', 'barbed', 
            'beaded', 'square', 'segmented', 'doubleSegmented', 'tripleSegmented', 
            'dottedDense', 'dottedSparse', 'dashedDense', 'dashedSparse', 'diamond', 
            'triangle', 'hexagon', 'stairs', 'sine', 'sawtooth', 'square-wave', 
            'gradient-line', 'parallel', 'morse', 'braided', 'link-chain', 'railroad', 
            'arrows', 'spindle', 'textured', 'spiral', 'dual-color', 'celtic', 'flame'
        ];
        
        styles.forEach(style => {
            const option = document.createElement('option');
            option.value = style;
            option.textContent = style.charAt(0).toUpperCase() + style.slice(1);
            styleSelect.appendChild(option);
        });
        
        styleGroup.appendChild(styleLabel);
        styleGroup.appendChild(styleSelect);
        stringAppearanceSection.appendChild(styleGroup);
        
        // Gradient toggle
        const gradientGroup = document.createElement('div');
        gradientGroup.className = 'control-group';
        
        const gradientLabel = document.createElement('label');
        gradientLabel.textContent = 'Use Gradient:';
        gradientLabel.setAttribute('for', 'string-gradient');
        gradientLabel.style.display = 'inline';
        gradientLabel.style.marginRight = '10px';
        
        const gradientInput = document.createElement('input');
        gradientInput.type = 'checkbox';
        gradientInput.id = 'string-gradient';
        gradientInput.style.width = 'auto';
        
        gradientGroup.appendChild(gradientLabel);
        gradientGroup.appendChild(gradientInput);
        stringAppearanceSection.appendChild(gradientGroup);
        
        // String effects
        const effectGroup = document.createElement('div');
        effectGroup.className = 'control-group';
        
        const effectLabel = document.createElement('label');
        effectLabel.textContent = 'Effect:';
        effectLabel.setAttribute('for', 'string-effect');
        
        const effectSelect = document.createElement('select');
        effectSelect.id = 'string-effect';
        
        const effects = ['none', 'glow', 'shadow', 'highlight', 'instrumental'];
        effects.forEach(effect => {
            const option = document.createElement('option');
            option.value = effect;
            option.textContent = effect.charAt(0).toUpperCase() + effect.slice(1);
            effectSelect.appendChild(option);
        });
        
        effectGroup.appendChild(effectLabel);
        effectGroup.appendChild(effectSelect);
        stringAppearanceSection.appendChild(effectGroup);
        
        // String spacing
        const spacingGroup = document.createElement('div');
        spacingGroup.className = 'control-group';
        
        const spacingLabel = document.createElement('label');
        spacingLabel.textContent = 'String Spacing (px):';
        spacingLabel.setAttribute('for', 'string-spacing');
        
        const spacingInput = document.createElement('input');
        spacingInput.type = 'range';
        spacingInput.id = 'string-spacing';
        spacingInput.min = '20';
        spacingInput.max = '50';
        spacingInput.value = '30';
        
        spacingGroup.appendChild(spacingLabel);
        spacingGroup.appendChild(spacingInput);
        stringAppearanceSection.appendChild(spacingGroup);
        
        // String opacity
        const opacityGroup = document.createElement('div');
        opacityGroup.className = 'control-group';
        
        const opacityLabel = document.createElement('label');
        opacityLabel.textContent = 'String Opacity (%):';
        opacityLabel.setAttribute('for', 'string-opacity');
        
        const opacityInput = document.createElement('input');
        opacityInput.type = 'range';
        opacityInput.id = 'string-opacity';
        opacityInput.min = '20';
        opacityInput.max = '100';
        opacityInput.value = '100';
        
        opacityGroup.appendChild(opacityLabel);
        opacityGroup.appendChild(opacityInput);
        stringAppearanceSection.appendChild(opacityGroup);
    }
    
    /**
     * Add fret appearance customization options
     */
    addFretAppearanceOptions() {
        const appearanceSection = document.querySelector('.appearance');
        
        // Create container for fret appearance options
        const fretAppearanceSection = document.createElement('div');
        fretAppearanceSection.innerHTML = '<h3>Fret Appearance</h3>';
        appearanceSection.appendChild(fretAppearanceSection);
        
        // Fret style
        const styleGroup = document.createElement('div');
        styleGroup.className = 'control-group';
        
        const styleLabel = document.createElement('label');
        styleLabel.textContent = 'Fret Style:';
        styleLabel.setAttribute('for', 'fret-style');
        
        const styleSelect = document.createElement('select');
        styleSelect.id = 'fret-style';
        
        const styles = [
            'solid', 'dashed', 'dotted', 'double', 'inlaid', 'raised', 'embossed', 
            'carved', 'layered', 'metal', 'wood', 'plastic', 'neon', 'glowing', 
            'transparent', 'gradient', 'shadows', 'worn', 'new', 'antique', 
            'modern', 'wire', 'bamboo', 'bone', 'mother-of-pearl', 'brass', 
            'copper', 'silver', 'gold', 'chrome', 'vintage-nickel', 'brass-aged', 
            'black-metal', 'zero-fret', 'scalloped'
        ];
        
        styles.forEach(style => {
            const option = document.createElement('option');
            option.value = style;
            option.textContent = style.charAt(0).toUpperCase() + style.slice(1).replace(/-/g, ' ');
            styleSelect.appendChild(option);
        });
        
        styleGroup.appendChild(styleLabel);
        styleGroup.appendChild(styleSelect);
        fretAppearanceSection.appendChild(styleGroup);
        
        // Fret thickness
        const thicknessGroup = document.createElement('div');
        thicknessGroup.className = 'control-group';
        
        const thicknessLabel = document.createElement('label');
        thicknessLabel.textContent = 'Fret Thickness (px):';
        thicknessLabel.setAttribute('for', 'fret-thickness');
        
        const thicknessInput = document.createElement('input');
        thicknessInput.type = 'range';
        thicknessInput.id = 'fret-thickness';
        thicknessInput.min = '1';
        thicknessInput.max = '10';
        thicknessInput.value = '2';
        thicknessInput.addEventListener('change', () => this.updateFretboard());
        
        thicknessGroup.appendChild(thicknessLabel);
        thicknessGroup.appendChild(thicknessInput);
        fretAppearanceSection.appendChild(thicknessGroup);
    }
    
    /**
     * Add tempo control to the fretboard controls
     */
    addTempoControl() {
        // We've moved this to moveControlButtons, 
        // so this method remains but doesn't add to the DOM directly
    }
    
    /**
     * Move control buttons below theory info panel
     */
    moveControlButtons() {
        // Get the existing buttons
        const playButton = document.getElementById('play-pattern');
        const addToSlideshowButton = document.getElementById('add-to-slideshow');
        const exportDiagramButton = document.getElementById('export-diagram');
        
        // Remove them from their current location
        if (playButton) playButton.remove();
        if (addToSlideshowButton) addToSlideshowButton.remove();
        if (exportDiagramButton) exportDiagramButton.remove();
        
        // Create new container for buttons after music theory section
        const musicTheorySection = document.querySelector('.music-theory');
        if (!musicTheorySection) return;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        // Create tempo control
        const tempoDiv = document.createElement('div');
        tempoDiv.className = 'tempo-control';
        
        const label = document.createElement('label');
        label.textContent = 'Tempo:';
        label.setAttribute('for', 'tempo-range');
        
        const input = document.createElement('input');
        input.type = 'range';
        input.id = 'tempo-range';
        input.min = '40';
        input.max = '240';
        input.value = this.tempo.toString();
        
        const valueDisplay = document.createElement('span');
        valueDisplay.id = 'tempo-value';
        valueDisplay.textContent = this.tempo.toString();
        
        const bpmLabel = document.createElement('span');
        bpmLabel.textContent = 'BPM';
        
        tempoDiv.appendChild(label);
        tempoDiv.appendChild(input);
        tempoDiv.appendChild(valueDisplay);
        tempoDiv.appendChild(bpmLabel);
        
        // Recreate the buttons
        const newPlayButton = document.createElement('button');
        newPlayButton.id = 'play-pattern';
        newPlayButton.textContent = 'Play Pattern';
        
        const newAddButton = document.createElement('button');
        newAddButton.id = 'add-to-slideshow';
        newAddButton.textContent = 'Add to Slideshow';
        
        const newExportButton = document.createElement('button');
        newExportButton.id = 'export-diagram';
        newExportButton.textContent = 'Export Diagram';
        
        // Add to new container
        buttonContainer.appendChild(tempoDiv);
        buttonContainer.appendChild(newPlayButton);
        buttonContainer.appendChild(newAddButton);
        buttonContainer.appendChild(newExportButton);
        
        // Insert after music theory section
        musicTheorySection.after(buttonContainer);
    }
    
    /**
     * Add theory info display options
     */
    addTheoryInfoOptions() {
        // Add options section to music theory controls
        const musicTheorySection = document.querySelector('.music-theory');
        
        const theoryInfoOptions = document.createElement('div');
        theoryInfoOptions.className = 'control-group';
        
        // Create a header div with toggle title button
        const headerDiv = document.createElement('div');
        headerDiv.style.display = 'flex';
        headerDiv.style.justifyContent = 'space-between';
        headerDiv.style.alignItems = 'center';
        headerDiv.style.marginBottom = '10px';
        const heading = document.createElement('h3');
        heading.textContent = 'Theory Info Display';
        heading.style.margin = '0';
        headerDiv.appendChild(heading);
        
        // Add a show/hide title toggle button for pattern title
        const toggleTitleButton = document.createElement('button');
        toggleTitleButton.id = 'toggle-title-button';
        toggleTitleButton.textContent = 'Hide Title';
        toggleTitleButton.style.fontSize = '12px';
        toggleTitleButton.addEventListener('click', () => {
            this.titleVisible = !this.titleVisible;
            toggleTitleButton.textContent = this.titleVisible ? 'Hide Title' : 'Show Title';
            this.updateTheoryInfo();
        });
        headerDiv.appendChild(toggleTitleButton);
        theoryInfoOptions.appendChild(headerDiv);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.id = 'theory-info-options-container';
        
        // Existing checkboxes for theory info properties
        const properties = [
            { id: 'show-name', label: 'Name', checked: true },
            { id: 'show-root', label: 'Root Note', checked: true },
            { id: 'show-spelling', label: 'Scale/Chord Spelling', checked: true },
            { id: 'show-quality', label: 'Quality', checked: true },
            { id: 'show-tonic', label: 'Tonic Function', checked: true },
            { id: 'show-dominant', label: 'Dominant Function', checked: true },
            { id: 'show-modes', label: 'Modes', checked: true },
            { id: 'show-inversions', label: 'Inversions', checked: true },
            { id: 'show-description', label: 'Description', checked: true },
            { id: 'hide-about-section', label: 'Hide About Section', checked: true }
        ];
        
        properties.forEach(prop => {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.marginBottom = '5px';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = prop.id;
            checkbox.className = 'theory-info-checkbox';
            checkbox.checked = prop.checked;
            checkbox.style.width = 'auto';
            checkbox.style.marginRight = '10px';
            const label = document.createElement('label');
            label.htmlFor = prop.id;
            label.textContent = prop.label;
            label.style.marginBottom = '0';
            label.style.cursor = 'pointer';
            div.appendChild(checkbox);
            div.appendChild(label);
            optionsContainer.appendChild(div);
        });
        
        theoryInfoOptions.appendChild(optionsContainer);
        musicTheorySection.appendChild(theoryInfoOptions);
        
        // Add theory info panel to the page AFTER the fretboard container instead of before
        const fretboardContainer = document.querySelector('.fretboard-container');
        const theoryInfoPanel = document.createElement('div');
        theoryInfoPanel.id = 'theory-info-panel';
        theoryInfoPanel.className = 'theory-info-panel';
        
        fretboardContainer.parentNode.insertBefore(theoryInfoPanel, fretboardContainer.nextSibling);
    }
    
    /**
     * Update the theory info panel with current pattern info
     */
    updateTheoryInfo(key = null, patternType = null, patternId = null) {
        const panel = document.getElementById('theory-info-panel');
        if (!panel) return;
        key = key || document.getElementById('key-select').value;
        patternType = patternType || document.getElementById('pattern-type').value;
        patternId = patternId || document.getElementById('pattern-select').value;
        
        if (patternType === 'lesson') {
            const lessonIndex = parseInt(patternId);
            const lesson = this.lessons[lessonIndex];
            const content = document.createElement('div');
            content.className = 'theory-info-content';
            this.addInfoItem(content, 'Lesson Title', lesson.title);
            this.addInfoItem(content, 'Diagrams', lesson.diagrams.length);
            this.addInfoItem(content, 'Text', lesson.text);
            panel.innerHTML = '';
            const titleDiv = document.createElement('div');
            titleDiv.className = 'theory-info-title';
            titleDiv.textContent = lesson.title;
            titleDiv.style.display = this.titleVisible ? 'block' : 'none';
            panel.appendChild(titleDiv);
            panel.appendChild(content);
            return;
        } else if (patternType === 'chord_progression') {
            let progressionPattern = this.chordProgressionPatterns.find(cp => cp.id === patternId);
            if (!progressionPattern) {
                panel.innerHTML = '<p>No chord progression info available.</p>';
                return;
            }
            const parts = progressionPattern.progression.trim().split(/\s+/);
            const beatUnit = 50;
            const chordProgressionArray = [];
            parts.forEach(part => {
                const [numeral, beatCountStr] = part.split(':');
                const beats = parseInt(beatCountStr) || 1;
                const chord = this.musicTheory.getChordFromRoman(numeral, key);
                chordProgressionArray.push({ numeral, chord, beats });
            });
            let progressionHTML = `<div style="display: flex;">`;
            chordProgressionArray.forEach(chordObj => {
                const width = chordObj.beats * beatUnit;
                progressionHTML += `<div style="width: ${width}px; border: 1px solid #ccc; text-align: center; padding: 5px; margin-right: 2px; border-radius: 4px;">${chordObj.chord}</div>`;
            });
            progressionHTML += `</div>`;
            panel.innerHTML = '';
            const titleDiv = document.createElement('div');
            titleDiv.className = 'theory-info-title';
            titleDiv.textContent = `Chord Progression in Key of ${key}`;
            titleDiv.style.display = this.titleVisible ? 'block' : 'none';
            panel.appendChild(titleDiv);
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = progressionHTML;
            panel.appendChild(contentDiv);
            return;
        } else if (patternType === 'grid') {
            // Create info for the grid pattern
            const gridPosition = parseInt(patternId);
            const startFret = gridPosition;
            const endFret = gridPosition + 2;
            
            panel.innerHTML = '';
            const titleDiv = document.createElement('div');
            titleDiv.className = 'theory-info-title';
            titleDiv.textContent = `${key} Major Scale (Frets ${startFret}-${endFret})`;
            titleDiv.style.display = this.titleVisible ? 'block' : 'none';
            panel.appendChild(titleDiv);
            
            const content = document.createElement('div');
            content.className = 'theory-info-content';
            this.addInfoItem(content, 'Pattern Type', 'Major Scale Grid Position');
            this.addInfoItem(content, 'Position', `Frets ${startFret}-${endFret}`);
            this.addInfoItem(content, 'Description', `This is a 3-fret section of the ${key} major scale, useful for practicing in position.`);
            panel.appendChild(content);
            
            return;
        } else if (patternType === 'grid2') {
            // Create info for the 2-fret grid pattern
            const gridPosition = parseInt(patternId);
            const startFret = gridPosition;
            const endFret = gridPosition + 1;
            
            panel.innerHTML = '';
            const titleDiv = document.createElement('div');
            titleDiv.className = 'theory-info-title';
            titleDiv.textContent = `${key} Major Scale (Frets ${startFret}-${endFret})`;
            titleDiv.style.display = this.titleVisible ? 'block' : 'none';
            panel.appendChild(titleDiv);
            
            const content = document.createElement('div');
            content.className = 'theory-info-content';
            this.addInfoItem(content, 'Pattern Type', 'Major Scale 2-Fret Grid Position');
            this.addInfoItem(content, 'Position', `Frets ${startFret}-${endFret}`);
            this.addInfoItem(content, 'Description', `This is a 2-fret section of the ${key} major scale, useful for compact position practice.`);
            panel.appendChild(content);
            
            return;
        }
        
        // Get pattern data and notes
        let patternData = null;
        let notes = [];
        if (patternType === 'scale') {
            patternData = this.musicTheory.scales[patternId];
            notes = this.musicTheory.getScaleNotes(key, patternId);
        } else if (patternType === 'chord') {
            patternData = this.musicTheory.chords[patternId];
            notes = this.musicTheory.getChordNotes(key, patternId);
        } else if (patternType === 'interval') {
            patternData = this.musicTheory.intervals[patternId];
            const targetNote = this.musicTheory.getNoteFromInterval(key, patternId);
            notes = [key, targetNote];
        }
        
        if (!patternData) {
            panel.innerHTML = '<p>No information available</p>';
            return;
        }
        
        // Get user-selected display options
        const showName = document.getElementById('show-name').checked;
        const showRoot = document.getElementById('show-root').checked;
        const showSpelling = document.getElementById('show-spelling').checked;
        const showQuality = document.getElementById('show-quality').checked;
        const showTonic = document.getElementById('show-tonic').checked;
        const showDominant = document.getElementById('show-dominant').checked;
        const showModes = document.getElementById('show-modes').checked;
        const showInversions = document.getElementById('show-inversions').checked;
        const showDescription = document.getElementById('show-description').checked;
        
        // Create content container for theory info
        let title = '';
        const content = document.createElement('div');
        content.className = 'theory-info-content';
        
        // NEW: Use only the pattern name from the dropdown as the title (without key or "Scale"/"Chord" suffix)
        if (patternType === 'scale' || patternType === 'chord' || patternType === 'interval') {
            title = patternData.name;
        }
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'theory-info-title';
        titleDiv.textContent = title;
        titleDiv.style.display = this.titleVisible ? 'block' : 'none';
        panel.innerHTML = '';
        panel.appendChild(titleDiv);
        
        // Continue with adding additional info items
        if (showRoot) {
            this.addInfoItem(content, 'Root', key);
        }
        if (showSpelling) {
            const spelling = notes.join(' - ');
            this.addInfoItem(content, 'Spelling', spelling);
            if (patternType === 'interval') {
                this.addInfoItem(content, 'Semitones', patternData.semitones);
            }
            if (patternType === 'scale' || patternType === 'chord') {
                const formula = patternData.intervals.join(' - ');
                this.addInfoItem(content, 'Formula', formula);
            }
        }
        if (showQuality) {
            let quality = '';
            if (patternType === 'scale') {
                if (patternId.includes('major')) {
                    quality = 'Major';
                } else if (patternId.includes('minor')) {
                    quality = 'Minor';
                } else if (patternId === 'diminished') {
                    quality = 'Diminished';
                } else if (patternId === 'whole_tone') {
                    quality = 'Augmented';
                } else {
                    quality = 'Other';
                }
            } else if (patternType === 'chord') {
                if (patternId === 'major') {
                    quality = 'Major';
                } else if (patternId === 'minor') {
                    quality = 'Minor';
                } else if (patternId.includes('diminished')) {
                    quality = 'Diminished';
                } else if (patternId.includes('augmented')) {
                    quality = 'Augmented';
                } else if (patternId.includes('major')) {
                    quality = 'Major-derived';
                } else if (patternId.includes('minor')) {
                    quality = 'Minor-derived';
                } else {
                    quality = 'Other';
                }
            } else if (patternType === 'interval') {
                if (['1', '4', '5'].includes(patternId)) {
                    quality = 'Perfect';
                } else if (['2', '3', '6', '7'].includes(patternId)) {
                    quality = 'Major';
                } else if (['b2', 'b3', 'b6', 'b7'].includes(patternId)) {
                    quality = 'Minor';
                }
            }
            if (quality) {
                this.addInfoItem(content, 'Quality', quality);
            }
        }
        if (showTonic && patternType === 'scale') {
            const tonicDegrees = [0, 2, 4];
            const tonicNotes = tonicDegrees.map(i => notes[i] || '').filter(n => n);
            if (tonicNotes.length > 0) {
                this.addInfoItem(content, 'Tonic Function', tonicNotes.join(', '));
            }
        }
        if (showDominant && patternType === 'scale') {
            const dominantDegrees = [4, 6, 1];
            const dominantNotes = dominantDegrees.map(i => notes[i] || '').filter(n => n);
            if (dominantNotes.length > 0) {
                this.addInfoItem(content, 'Dominant Function', dominantNotes.join(', '));
            }
        }
        if (showModes && patternType === 'scale') {
            const modes = this.getRelatedModes(patternId);
            if (modes.length > 0) {
                this.addInfoItem(content, 'Related Modes', modes.join(', '));
            }
        }
        if (showInversions && patternType === 'chord' && notes.length > 2) {
            const inversions = this.getChordInversions(notes);
            if (inversions.length > 0) {
                this.addInfoItem(content, 'Inversions', inversions.join(', '));
            }
        }
        if (showDescription) {
            let description = '';
            if (patternType === 'scale') {
                if (patternId === 'major') {
                    description = 'The major scale is the foundation of Western music theory. It has a bright, happy sound.';
                } else if (patternId === 'natural_minor') {
                    description = 'The natural minor scale has a darker, more melancholic sound than the major scale.';
                } else if (patternId === 'harmonic_minor') {
                    description = 'The harmonic minor scale has a raised 7th degree, giving it an exotic sound.';
                } else if (patternId === 'melodic_minor') {
                    description = 'The melodic minor scale has a raised 6th and 7th degree when ascending.';
                } else if (patternId === 'pentatonic_major') {
                    description = 'The major pentatonic scale is a 5-note scale derived from the major scale, omitting the 4th and 7th degrees.';
                } else if (patternId === 'pentatonic_minor') {
                    description = 'The minor pentatonic scale is a 5-note scale commonly used in blues, rock, and pop.';
                } else if (patternId === 'blues') {
                    description = 'The blues scale adds a flat 5th (blue note) to the minor pentatonic scale.';
                } else if (patternId === 'dorian') {
                    description = 'The Dorian mode has a minor sound with a raised 6th degree.';
                } else if (patternId === 'phrygian') {
                    description = 'The Phrygian mode has a Spanish sound with a flat 2nd degree.';
                } else if (patternId === 'lydian') {
                    description = 'The Lydian mode has a dreamy sound with a raised 4th degree.';
                } else if (patternId === 'mixolydian') {
                    description = 'The Mixolydian mode has a dominant sound with a flat 7th, common in blues and rock.';
                } else if (patternId === 'locrian') {
                    description = 'The Locrian mode has a dissonant sound with a flat 2nd and flat 5th.';
                } else if (patternId === 'whole_tone') {
                    description = 'The whole tone scale consists entirely of whole steps, creating an ambiguous sound.';
                } else if (patternId === 'diminished') {
                    description = 'The diminished scale alternates between whole and half steps, creating a symmetric pattern.';
                } else {
                    description = 'A collection of notes arranged by pitch that forms the foundation for melodies and harmonies.';
                }
            } else if (patternType === 'chord') {
                if (patternId === 'major') {
                    description = 'The major triad has a bright, happy sound.';
                } else if (patternId === 'minor') {
                    description = 'The minor triad has a darker, more melancholic sound.';
                } else if (patternId === 'diminished') {
                    description = 'The diminished triad has a tense, unstable sound.';
                } else if (patternId === 'augmented') {
                    description = 'The augmented triad has an unresolved, mysterious sound.';
                } else if (patternId === 'major7') {
                    description = 'The major 7th chord has a rich, jazzy sound.';
                } else if (patternId === 'dominant7') {
                    description = 'The dominant 7th chord creates tension that resolves to the tonic.';
                } else if (patternId === 'minor7') {
                    description = 'The minor 7th chord has a mellow, warm sound.';
                } else if (patternId === 'diminished7') {
                    description = 'The diminished 7th chord has an extremely tense sound.';
                } else if (patternId === 'half_diminished') {
                    description = 'The half diminished chord (min7b5) has a jazzy, tense sound.';
                } else if (patternId === 'sus2') {
                    description = 'The sus2 chord replaces the 3rd with a 2nd, creating an open sound.';
                } else if (patternId === 'sus4') {
                    description = 'The sus4 chord replaces the 3rd with a 4th, creating a suspended sound.';
                } else if (patternId === 'add9') {
                    description = 'The add9 chord adds a 9th (2nd octave up) without the 7th.';
                } else if (patternId === '6') {
                    description = 'The 6 chord adds a major 6th to a major triad.';
                } else if (patternId === 'm6') {
                    description = 'The minor 6 chord adds a major 6th to a minor triad.';
                } else {
                    description = 'A combination of three or more notes played simultaneously.';
                }
            } else if (patternType === 'interval') {
                if (patternId === '1') {
                    description = 'Unison - same note, no distance between pitches.';
                } else if (patternId === '5') {
                    description = 'Perfect 5th - the most consonant interval after the octave.';
                } else if (patternId === '4') {
                    description = 'Perfect 4th - considered a perfect consonance.';
                } else if (patternId === '3') {
                    description = 'Major 3rd - creates a bright, happy sound in chords.';
                } else if (patternId === 'b3') {
                    description = 'Minor 3rd - creates a darker, more melancholic sound in chords.';
                } else if (patternId === 'b7') {
                    description = 'Minor 7th - creates tension seeking resolution.';
                } else if (patternId === '7') {
                    description = 'Major 7th - creates a tense but sophisticated sound.';
                } else {
                    description = 'An interval is the distance between two notes.';
                }
            }
            if (description) {
                this.addInfoItem(content, 'Description', description, true);
            }
        }
        panel.appendChild(content);
        this.addScaleDescription(panel, patternType, patternId, key);
    }
    
    /**
     * Add a detailed scale/chord/interval description section
     */
    addScaleDescription(container, patternType, patternId, key) {
        // Check if we should hide the About section
        const hideAboutCheckbox = document.getElementById('hide-about-section');
        if (hideAboutCheckbox && hideAboutCheckbox.checked) {
            return; // Don't add the description if checkbox is checked
        }
        
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'scale-description';
        descriptionContainer.style.marginTop = '15px';
        descriptionContainer.style.padding = '10px';
        descriptionContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        descriptionContainer.style.borderRadius = '5px';
        
        let title = '';
        let description = '';
        let usage = '';
        let techniques = '';
        
        if (patternType === 'scale') {
            title = `About the ${key} ${this.musicTheory.scales[patternId].name} Scale`;
            
            switch(patternId) {
                case 'major':
                    description = 'The major scale is the foundation of Western music theory. It has a bright, happy sound.';
                    usage = 'Used extensively in pop, rock, classical, jazz, and virtually all Western music. Creates bright, happy, and resolved sounds.';
                    techniques = 'Great for melodies, harmonizing with chords, and creating progressions with strong resolutions.';
                    break;
                case 'natural_minor':
                    description = 'The natural minor scale has a darker, more melancholic sound than the major scale.';
                    usage = 'Common in rock, metal, folk, and classical music. Creates melancholic, emotional, or darker moods.';
                    techniques = 'Excellent for emotional solos, minor key progressions, and creating tension.';
                    break;
                case 'harmonic_minor':
                    description = 'The harmonic minor scale is the natural minor scale with a raised 7th degree, creating an exotic sound with an augmented 2nd interval.';
                    usage = 'Used in classical, flamenco, metal, and Middle Eastern music. Creates dramatic and exotic sounds.';
                    techniques = 'The raised 7th provides a stronger resolution to the tonic. Creates distinctive diminished and augmented chords.';
                    break;
                case 'melodic_minor':
                    description = 'The melodic minor scale has a raised 6th and 7th degree when ascending, but reverts to natural minor when descending.';
                    usage = 'Common in jazz, fusion, and classical music. Creates a smooth, flowing sound.';
                    techniques = 'Jazz players use this scale for altered dominant sounds and to create smoother voice leading.';
                    break;
                case 'dorian':
                    description = 'The Dorian mode has a minor sound with a raised 6th degree.';
                    usage = 'Popular in jazz, rock, folk, and modal music. Creates a slightly brighter sound than natural minor.';
                    techniques = 'Great for modal progressions, rock and blues solos, and jazz improvisation.';
                    break;
                case 'phrygian':
                    description = 'The Phrygian mode has a Spanish sound with a flat 2nd degree.';
                    usage = 'Used in flamenco, metal, and world music. Creates a Spanish or Middle Eastern sound.';
                    techniques = 'The flat 2nd creates a distinctive tension. Used for exotic-sounding riffs and solos.';
                    break;
                case 'lydian':
                    description = 'The Lydian mode has a dreamy sound with a raised 4th degree.';
                    usage = 'Used in film scores, jazz, and progressive rock. Creates a dreamy, floating sound.';
                    techniques = 'The raised 4th eliminates the dominant function, creating a more open, suspended sound.';
                    break;
                case 'mixolydian':
                    description = 'The Mixolydian mode has a dominant sound with a flat 7th, common in blues and rock.';
                    usage = 'Common in blues, rock, Celtic music, and jazz. Creates a slightly unresolved, bluesy sound.';
                    techniques = 'Great for blues and rock solos, works well over dominant 7th chords.';
                    break;
                case 'locrian':
                    description = 'The Locrian mode has an extremely tense sound with a flat 2nd and flat 5th.';
                    usage = 'Rare in popular music, used in jazz and metal. Creates an extremely tense, unresolved sound.';
                    techniques = 'Can be used over half-diminished chords and for creating extreme tension.';
                    break;
                case 'pentatonic_major':
                    description = 'The major pentatonic scale is a 5-note scale derived from the major scale, omitting the 4th and 7th degrees.';
                    usage = 'Used extensively in folk, country, pop, and rock. Creates a simple, consonant sound without semitone tensions.';
                    techniques = 'Easy to use for improvisation, cannot produce "wrong notes" when used over corresponding chords.';
                    break;
                case 'pentatonic_minor':
                    description = 'The minor pentatonic scale is a 5-note scale commonly used in blues, rock, and pop.';
                    usage = 'The foundation of blues, rock, and many forms of popular music. Creates a bluesy, soulful sound.';
                    techniques = 'Essential for blues and rock guitar solos. Can be embellished with the "blue note" to create the blues scale.';
                    break;
                case 'blues':
                    description = 'The blues scale adds a flat 5th (blue note) to the minor pentatonic scale.';
                    usage = 'The cornerstone of blues, rock, jazz, and much of American music. Creates the characteristic "blue" sound.';
                    techniques = 'The blue note can be bent or approached chromatically for expressive blues phrases.';
                    break;
                case 'whole_tone':
                    description = 'The whole tone scale consists entirely of whole steps, creating an ambiguous sound.';
                    usage = 'Used in jazz, impressionist music, and film scores. Creates a dreamlike, floating sound without clear resolution.';
                    techniques = 'Great for creating tension and ambiguity. Works well over augmented and dominant 7#5 chords.';
                    break;
                case 'diminished':
                    description = 'The diminished scale alternates between whole and half steps, creating a symmetric pattern.';
                    usage = 'Used in jazz, classical, and film music. Creates tension and unstable sounds.';
                    techniques = 'Works well over diminished and dominant 7th chords. Can be started from either a whole or half step.';
                    break;
                default:
                    description = 'A collection of notes arranged by pitch that forms the foundation for melodies and harmonies.';
                    usage = 'Used to create melodies, solos, and as the basis for chord progressions.';
                    techniques = 'Practice in all keys to develop technical facility and musical understanding.';
            }
        } else if (patternType === 'chord') {
            title = `About the ${key} ${this.musicTheory.chords[patternId].name} Chord`;
            
            switch(patternId) {
                case 'major':
                    description = 'The major triad has a bright, happy sound.';
                    usage = 'The most common chord type in popular music. Creates bright, stable, and resolved sounds.';
                    techniques = 'Used as the I chord in major keys and the V chord in minor keys. Forms the basis of many progressions.';
                    break;
                case 'minor':
                    description = 'The minor triad has a darker, more melancholic sound.';
                    usage = 'Creates a darker, more melancholic sound than major chords. Common in all styles of music.';
                    techniques = 'Used as the i chord in minor keys and as the ii, iii, or vi chord in major keys.';
                    break;
                case 'diminished':
                    description = 'The diminished triad has a tense, unstable sound.';
                    usage = 'Creates tension and instability. Often used as a passing chord or to create suspense.';
                    techniques = 'Used as the viiº chord in major keys and the iiº chord in minor keys.';
                    break;
                case 'augmented':
                    description = 'The augmented triad has an unresolved, mysterious sound.';
                    usage = 'Used in jazz, classical, and as a passing chord. Creates an unresolved, mysterious sound.';
                    techniques = 'Has no perfect 5th, creating instability and a pull toward resolution.';
                    break;
                case 'major7':
                    description = 'The major 7th chord adds a major 7th to the major triad (root, 3, 5, 7).';
                    usage = 'Common in jazz, bossa nova, and contemporary music. Creates a rich, sophisticated sound.';
                    techniques = 'Used as the I∆7 chord in major keys. The major 7th creates a close harmonic tension with the root.';
                    break;
                case 'dominant7':
                    description = 'The dominant 7th chord adds a minor 7th to the major triad (root, 3, 5, ♭7).';
                    usage = 'Creates tension that wants to resolve. Essential in blues, jazz, and most tonal music.';
                    techniques = 'Used as the V7 chord in major and minor keys, creating a strong pull toward the I chord.';
                    break;
                case 'minor7':
                    description = 'The minor 7th chord adds a minor 7th to the minor triad (root, ♭3, 5, ♭7).';
                    usage = 'Common in jazz, funk, soul, and R&B. Creates a mellow, warm sound.';
                    techniques = 'Used as the ii7 chord in major keys and the i7 chord in minor keys.';
                    break;
                default:
                    description = 'A chord is a combination of three or more notes played simultaneously.';
                    usage = 'Chords form the harmonic foundation of most music, providing structure and emotional color.';
                    techniques = 'Practice chord inversions and voice leading to create smooth progressions.';
            }
        } else if (patternType === 'interval') {
            const secondNote = this.musicTheory.getNoteFromInterval(key, patternId);
            title = `About the ${key} to ${secondNote} ${this.musicTheory.intervals[patternId].name} Interval`;
            
            switch(patternId) {
                case '1':
                    description = 'The unison or perfect unison is the same note - zero semitones apart.';
                    usage = 'Used for doubling a melody or creating unison passages for emphasis.';
                    techniques = 'When played simultaneously, creates maximum consonance and stability.';
                    break;
                case '2':
                    description = 'The major 2nd is two semitones (a whole step) above the root.';
                    usage = 'Creates mild dissonance. Common in melodies but less common as a harmonic interval.';
                    techniques = 'Creates the characteristic sound of the "sus2" chord when replacing the 3rd.';
                    break;
                case 'b3':
                    description = 'The minor 3rd is three semitones (1.5 steps) above the root.';
                    usage = 'The defining interval of minor chords and scales. Creates a darker, more melancholic sound.';
                    techniques = 'Forms the basis of minor triads. Common in blues, rock, and emotional passages.';
                    break;
                case '3':
                    description = 'The major 3rd is four semitones (2 whole steps) above the root.';
                    usage = 'The defining interval of major chords and scales. Creates a bright, happy sound.';
                    techniques = 'Forms the basis of major triads. Essential for creating the "major" quality in music.';
                    break;
                case '4':
                    description = 'The perfect 4th is five semitones (2.5 steps) above the root.';
                    usage = 'Creates a strong, stable sound. Common in melodies and bass movements.';
                    techniques = 'Creates the characteristic sound of "sus4" chords. The complement to the perfect 5th.';
                    break;
                case '5':
                    description = 'The perfect 5th is seven semitones (3.5 steps) above the root.';
                    usage = 'The most consonant interval after the octave. Essential in most chords.';
                    techniques = 'Power chords consist of just the root and 5th. Provides stability to chord structures.';
                    break;
                case '6':
                    description = 'The major 6th is nine semitones (4.5 steps) above the root.';
                    usage = 'Creates a sweet, consonant sound. Common in major 6th chords and melodies.';
                    techniques = 'Adding a 6th to a triad creates a 6th chord, common in jazz and pop.';
                    break;
                case 'b7':
                    description = 'The minor 7th is ten semitones (5 whole steps) above the root.';
                    usage = 'The defining interval of dominant 7th chords. Creates tension seeking resolution.';
                    techniques = 'Essential for blues and jazz. Creates the characteristic sound of V7 chords.';
                    break;
                case '7':
                    description = 'The major 7th is eleven semitones (5.5 steps) above the root.';
                    usage = 'Creates a tense but sophisticated sound. Common in jazz and modern harmony.';
                    techniques = 'The defining interval of major 7th chords. Creates a close dissonance with the root.';
                    break;
                default:
                    description = 'An interval is the distance between two notes.';
                    usage = 'Intervals form the building blocks of scales, chords, and melodies.';
                    techniques = 'Practice recognizing intervals by ear to improve musical understanding.';
            }
        }
        
        // Create content elements
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.style.marginTop = '0';
        titleElement.style.marginBottom = '10px';
        
        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = `<strong>What it is:</strong> ${description}`;
        descriptionElement.style.marginBottom = '8px';
        
        const usageElement = document.createElement('p');
        usageElement.innerHTML = `<strong>How it's used:</strong> ${usage}`;
        usageElement.style.marginBottom = '8px';
        
        const techniquesElement = document.createElement('p');
        techniquesElement.innerHTML = `<strong>Performance techniques:</strong> ${techniques}`;
        
        // Assemble the container
        descriptionContainer.appendChild(titleElement);
        descriptionContainer.appendChild(descriptionElement);
        descriptionContainer.appendChild(usageElement);
        descriptionContainer.appendChild(techniquesElement);
        
        container.appendChild(descriptionContainer);
    }
    
    /**
     * Add an information item to the theory info panel
     */
    addInfoItem(container, label, value, fullWidth = false) {
        const div = document.createElement('div');
        div.className = 'theory-info-item';
        if (fullWidth) {
            div.style.gridColumn = '1 / -1';
        }
        
        const labelSpan = document.createElement('div');
        labelSpan.className = 'theory-info-label';
        labelSpan.textContent = label + ':';
        
        const valueSpan = document.createElement('div');
        valueSpan.textContent = value;
        
        div.appendChild(labelSpan);
        div.appendChild(valueSpan);
        container.appendChild(div);
    }
    
    /**
     * Get related modes for a scale
     */
    getRelatedModes(scaleId) {
        // Map of scale IDs to their related modes
        const modeRelationships = {
            'major': ['Ionian (Major)', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian (Minor)', 'Locrian'],
            'natural_minor': ['Aeolian (Natural Minor)'],
            'harmonic_minor': ['Harmonic Minor'],
            'melodic_minor': ['Melodic Minor', 'Dorian ♭2', 'Lydian Augmented', 'Lydian Dominant', 'Mixolydian ♭6', 'Locrian ♮2', 'Altered Scale']
        };
        
        return modeRelationships[scaleId] || [];
    }
    
    /**
     * Get chord inversions
     */
    getChordInversions(notes) {
        if (notes.length < 3) return [];
        
        const inversions = [];
        
        // First inversion
        inversions.push(`1st: ${notes.slice(1).concat(notes[0]).join('-')}`);
        
        // Additional inversions for chords with more than 3 notes
        if (notes.length > 3) {
            // Second inversion
            inversions.push(`2nd: ${notes.slice(2).concat(notes.slice(0, 2)).join('-')}`);
            
            // Third inversion (if applicable)
            if (notes.length > 3) {
                inversions.push(`3rd: ${notes.slice(3).concat(notes.slice(0, 3)).join('-')}`);
            }
        } else {
            // Second inversion for triads
            inversions.push(`2nd: ${notes.slice(2).concat(notes.slice(0, 2)).join('-')}`);
        }
        
        return inversions;
    }
    
    /**
     * Get a description for a scale
     */
    getScaleDescription(scaleId) {
        const descriptions = {
            'major': 'The major scale is the foundation of Western music theory. It has a bright, happy sound.',
            'natural_minor': 'The natural minor scale has a darker, more melancholic sound than the major scale.',
            'harmonic_minor': 'The harmonic minor scale has a raised 7th degree, giving it an exotic sound.',
            'melodic_minor': 'The melodic minor scale has a raised 6th and 7th degree when ascending.',
            'pentatonic_major': 'The major pentatonic scale is a 5-note scale derived from the major scale, omitting the 4th and 7th degrees.',
            'pentatonic_minor': 'The minor pentatonic scale is a 5-note scale commonly used in blues, rock, and pop.',
            'blues': 'The blues scale adds a flat 5th (blue note) to the minor pentatonic scale.',
            'dorian': 'The Dorian mode has a minor sound with a raised 6th degree.',
            'phrygian': 'The Phrygian mode has a Spanish sound with a flat 2nd degree.',
            'lydian': 'The Lydian mode has a dreamy sound with a raised 4th degree.',
            'mixolydian': 'The Mixolydian mode has a dominant sound with a flat 7th, common in blues and rock.',
            'locrian': 'The Locrian mode has a dissonant sound with a flat 2nd and flat 5th.',
            'whole_tone': 'The whole tone scale consists entirely of whole steps, creating an ambiguous sound.',
            'diminished': 'The diminished scale alternates between whole and half steps, creating a symmetric pattern.'
        };
        
        return descriptions[scaleId] || 'A collection of notes arranged by pitch that forms the foundation for melodies and harmonies.';
    }
    
    /**
     * Get a description for a chord
     */
    getChordDescription(chordId) {
        const descriptions = {
            'major': 'The major triad has a bright, happy sound.',
            'minor': 'The minor triad has a darker, more melancholic sound.',
            'diminished': 'The diminished triad has a tense, unstable sound.',
            'augmented': 'The augmented triad has an unresolved, mysterious sound.',
            'major7': 'The major 7th chord has a rich, jazzy sound.',
            'dominant7': 'The dominant 7th chord creates tension that resolves to the tonic.',
            'minor7': 'The minor 7th chord has a mellow, warm sound.',
            'diminished7': 'The diminished 7th chord has an extremely tense sound.',
            'half_diminished': 'The half diminished chord (min7b5) has a jazzy, tense sound.',
            'sus2': 'The sus2 chord replaces the 3rd with a 2nd, creating an open sound.',
            'sus4': 'The sus4 chord replaces the 3rd with a 4th, creating a suspended sound.',
            'add9': 'The add9 chord adds a 9th (2nd octave up) without the 7th.',
            '6': 'The 6 chord adds a major 6th to a major triad.',
            'm6': 'The minor 6 chord adds a major 6th to a minor triad.'
        };
        
        return descriptions[chordId] || 'A combination of three or more notes played simultaneously.';
    }
    
    /**
     * Get interval quality description
     */
    getIntervalQuality(intervalId) {
        const qualities = {
            '1': 'Perfect, identical pitch',
            'b2': 'Highly dissonant, tense',
            '2': 'Dissonant, bright tension',
            'b3': 'Minor, somewhat dark',
            '3': 'Major, bright and consonant',
            '4': 'Perfect, stable and open',
            'b5': 'Dissonant, unstable (tritone)',
            '5': 'Perfect, extremely stable',
            '#5': 'Augmented, exotic and unstable',
            '6': 'Major, consonant and sweet',
            'b7': 'Minor, bluesy tension',
            '7': 'Major, strong leading tone tension'
        };
        
        return qualities[intervalId] || 'Unknown';
    }
    
    /**
     * Get interval consonance description
     */
    getIntervalConsonance(intervalId) {
        const consonance = {
            '1': 'Perfect consonance',
            'b2': 'Sharp dissonance',
            '2': 'Mild dissonance',
            'b3': 'Imperfect consonance',
            '3': 'Imperfect consonance',
            '4': 'Perfect consonance (context dependent)',
            'b5': 'Strong dissonance (tritone)',
            '5': 'Perfect consonance',
            '#5': 'Mild dissonance',
            '6': 'Imperfect consonance',
            'b7': 'Mild dissonance',
            '7': 'Sharp dissonance'
        };
        
        return consonance[intervalId] || 'Unknown';
    }
    
    /**
     * Open a lesson page for a pattern
     */
    openLessonPage(key, patternType, patternId) {
        // Create overlay and lesson container
        const overlay = document.createElement('div');
        overlay.className = 'lesson-overlay';
        document.body.appendChild(overlay);
        
        const lessonContainer = document.createElement('div');
        lessonContainer.className = 'lesson-container';
        
        // Get pattern name
        let patternName = '';
        if (patternType === 'scale') {
            patternName = this.musicTheory.scales[patternId].name;
        } else if (patternType === 'chord') {
            patternName = this.musicTheory.chords[patternId].name;
        } else if (patternType === 'interval') {
            patternName = this.musicTheory.intervals[patternId].name;
        }
        
        // Create lesson content
        lessonContainer.innerHTML = `
            <div class="lesson-header">
                <h2>${key} ${patternName} ${patternType.charAt(0).toUpperCase() + patternType.slice(1)} Lesson</h2>
                <button class="close-lesson">×</button>
            </div>
            <div class="lesson-content">
                <div class="lesson-section">
                    <h3>Overview</h3>
                    <p>This is a comprehensive lesson about the ${key} ${patternName} ${patternType}.</p>
                </div>
                
                <div class="lesson-section">
                    <h3>Theory</h3>
                    <p>The ${patternName} ${patternType} consists of specific intervals that give it its characteristic sound.</p>
                    <div class="theory-details"></div>
                </div>
                
                <div class="lesson-section">
                    <h3>Applications</h3>
                    <p>Here are some common uses for the ${key} ${patternName} ${patternType}:</p>
                    <ul>
                        <li>Example application 1</li>
                        <li>Example application 2</li>
                        <li>Example application 3</li>
                    </ul>
                </div>
                
                <div class="lesson-section">
                    <h3>Practice Exercises</h3>
                    <p>Try these exercises to master the ${key} ${patternName} ${patternType}:</p>
                    <ol>
                        <li>Play the ${patternType} ascending and descending slowly</li>
                        <li>Practice in different positions on the fretboard</li>
                        <li>Use the ${patternType} in a musical context with backing tracks</li>
                    </ol>
                </div>
                
                <div class="lesson-section">
                    <h3>Example in Music</h3>
                    <p>The ${key} ${patternName} ${patternType} can be heard in these famous songs:</p>
                    <ul>
                        <li>Example song 1</li>
                        <li>Example song 2</li>
                        <li>Example song 3</li>
                    </ul>
                </div>
            </div>
            <button id="close-lesson">Close</button>
        `;
        overlay.appendChild(lessonContainer);
        
        // Update theory details based on pattern type
        const theoryDetails = lessonContainer.querySelector('.theory-details');
        this.populateLessonTheoryDetails(theoryDetails, key, patternType, patternId);
        
        // Close lesson when clicking the close button
        lessonContainer.querySelector('.close-lesson').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Close lesson when clicking outside the lesson container
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
    
    /**
     * Populate theory info in the lesson page
     */
    populateLessonTheoryDetails(container, key, patternType, patternId) {
        // Clear container
        container.innerHTML = '';
        
        // Add content based on pattern type
        if (patternType === 'scale') {
            const scale = this.musicTheory.scales[patternId];
            const notes = this.musicTheory.getScaleNotes(key, patternId);
            
            container.innerHTML = `
                <p><strong>Formula:</strong> ${scale.intervals.join(' - ')}</p>
                <p><strong>Notes:</strong> ${notes.join(' - ')}</p>
                <p><strong>Intervals from root:</strong></p>
                <ul>
                    ${scale.intervals.map((interval, index) => `
                        <li>${interval} - ${this.musicTheory.intervals[interval].name} - ${notes[index]}</li>
                    `).join('')}
                </ul>
                <p><strong>Related Modes:</strong> ${this.getRelatedModes(patternId).join(', ') || 'None'}</p>
            `;
        } else if (patternType === 'chord') {
            const chord = this.musicTheory.chords[patternId];
            const notes = this.musicTheory.getChordNotes(key, patternId);
            
            container.innerHTML = `
                <p><strong>Formula:</strong> ${chord.intervals.join(' - ')}</p>
                <p><strong>Notes:</strong> ${notes.join(' - ')}</p>
                <p><strong>Intervals from root:</strong></p>
                <ul>
                    ${chord.intervals.map((interval, index) => `
                        <li>${interval} - ${this.musicTheory.intervals[interval].name} - ${notes[index]}</li>
                    `).join('')}
                </ul>
                <p><strong>Inversions:</strong></p>
                <ul>
                    ${this.getChordInversions(notes).map(inv => `<li>${inv}</li>`).join('')}
                </ul>
            `;
        } else if (patternType === 'interval') {
            const interval = this.musicTheory.intervals[patternId];
            const targetNote = this.musicTheory.getNoteFromInterval(key, patternId);
            
            container.innerHTML = `
                <p><strong>Notes:</strong> ${key} - ${targetNote}</p>
                <p><strong>Semitones:</strong> ${interval.semitones}</p>
                <p><strong>Characteristics:</strong></p>
                <ul>
                    <li>Sound quality: ${this.getIntervalQuality(patternId)}</li>
                    <li>Consonance: ${this.getIntervalConsonance(patternId)}</li>
                </ul>
            `;
        }
    }
    
    /**
     * Toggle sidebar visibility
     */
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const backdrop = document.querySelector('.sidebar-backdrop');
        
        if (this.sidebarVisible) {
            // Hide sidebar
            sidebar.classList.remove('sidebar-visible');
            backdrop.classList.remove('visible');
            document.getElementById('sidebar-toggle').setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restore scrolling
        } else {
            // Show sidebar
            sidebar.classList.add('sidebar-visible');
            backdrop.classList.add('visible');
            document.getElementById('sidebar-toggle').setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling on mobile
        }
        
        this.sidebarVisible = !this.sidebarVisible;
        localStorage.setItem('sidebarVisible', this.sidebarVisible ? 'true' : 'false');
    }

    /**
     * Show the Lesson Editor button for lesson patterns.
     */
    showLessonEditorButton() {
        if (!document.getElementById('edit-lesson')) {
            const btn = document.createElement('button');
            btn.id = 'edit-lesson';
            btn.textContent = 'Edit Lesson';
            btn.style.marginLeft = '10px';
            btn.addEventListener('click', () => this.openLessonEditor());
            // Append the button to an appropriate container (e.g., fretboard controls)
            const container = document.querySelector('.fretboard-controls');
            if (container) {
                container.appendChild(btn);
            }
        }
    }

    /**
     * Remove the Lesson Editor button if it exists.
     */
    removeLessonEditorButton() {
        const btn = document.getElementById('edit-lesson');
        if (btn && btn.parentNode) {
            btn.parentNode.removeChild(btn);
        }
    }

    /**
     * Open the Lesson Editor modal.
     * (Placeholder implementation – extend with actual lesson editor functionality as needed.)
     */
    openLessonEditor() {
        alert("Lesson Editor functionality is coming soon.");
    }

    /**
     * Add instrument and tuning preset dropdowns
     */
    addInstrumentDropdowns() {
        const instrumentSetup = document.querySelector('.instrument-setup');
        const stringCountGroup = document.querySelector('label[for="string-count"]').parentNode;
        
        // Create instrument dropdown container
        const instrumentGroup = document.createElement('div');
        instrumentGroup.className = 'control-group';
        
        const instrumentLabel = document.createElement('label');
        instrumentLabel.textContent = 'Instrument:';
        instrumentLabel.setAttribute('for', 'instrument-select');
        
        const instrumentSelect = document.createElement('select');
        instrumentSelect.id = 'instrument-select';
        
        // Add options for each instrument
        Object.entries(this.instrumentPresets).forEach(([id, data]) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = data.name;
            instrumentSelect.appendChild(option);
        });
        
        instrumentGroup.appendChild(instrumentLabel);
        instrumentGroup.appendChild(instrumentSelect);
        
        // Create tuning preset dropdown container
        const tuningPresetGroup = document.createElement('div');
        tuningPresetGroup.className = 'control-group';
        
        const tuningPresetLabel = document.createElement('label');
        tuningPresetLabel.textContent = 'Tuning Preset:';
        tuningPresetLabel.setAttribute('for', 'tuning-preset');
        
        const tuningPresetSelect = document.createElement('select');
        tuningPresetSelect.id = 'tuning-preset';
        
        // Add standard tuning option
        const standardOption = document.createElement('option');
        standardOption.value = 'standard';
        standardOption.textContent = 'Standard';
        tuningPresetSelect.appendChild(standardOption);
        
        // Add alternate tuning option
        const alternateOption = document.createElement('option');
        const currentInstrument = this.instrumentPresets['acoustic_guitar']; // Default instrument
        const alternateTuningName = currentInstrument.tunings.whole_step_down ? 'Whole-Step Down' : 
                                   (currentInstrument.tunings.half_step_down ? 'Half-Step Down' : 'Alternate');
        alternateOption.value = Object.keys(currentInstrument.tunings)[1] || 'alternate';
        alternateOption.textContent = alternateTuningName;
        tuningPresetSelect.appendChild(alternateOption);
        
        tuningPresetGroup.appendChild(tuningPresetLabel);
        tuningPresetGroup.appendChild(tuningPresetSelect);
        
        // Insert dropdowns before string count
        instrumentSetup.insertBefore(instrumentGroup, stringCountGroup);
        instrumentSetup.insertBefore(tuningPresetGroup, stringCountGroup);
        
        // Add Flip String Order button
        const flipStringOrderGroup = document.createElement('div');
        flipStringOrderGroup.className = 'control-group';
        
        const flipStringOrderButton = document.createElement('button');
        flipStringOrderButton.textContent = 'Flip String Order';
        flipStringOrderButton.id = 'flip-string-order';
        flipStringOrderButton.addEventListener('click', () => this.flipStringOrder());
        
        flipStringOrderGroup.appendChild(flipStringOrderButton);
        instrumentSetup.appendChild(flipStringOrderGroup);
        
        // Add event listeners
        instrumentSelect.addEventListener('change', () => {
            const instrumentId = instrumentSelect.value;
            const instrument = this.instrumentPresets[instrumentId];
            
            // Update string count
            const stringCountInput = document.getElementById('string-count');
            stringCountInput.value = instrument.strings;
            
            // Update tuning preset dropdown options
            tuningPresetSelect.innerHTML = '';
            
            Object.entries(instrument.tunings).forEach(([tuningId, tuningData], index) => {
                const option = document.createElement('option');
                option.value = tuningId;
                
                // Set display name based on tuning type
                let displayName = 'Standard';
                if (tuningId === 'whole_step_down') displayName = 'Whole-Step Down';
                else if (tuningId === 'half_step_down') displayName = 'Half-Step Down';
                else if (tuningId !== 'standard') displayName = 'Alternate';
                
                option.textContent = displayName;
                tuningPresetSelect.appendChild(option);
            });
            
            // Apply the selected tuning
            this.applyTuningPreset(instrumentId, tuningPresetSelect.value);
        });
        
        tuningPresetSelect.addEventListener('change', () => {
            const instrumentId = instrumentSelect.value;
            const tuningId = tuningPresetSelect.value;
            this.applyTuningPreset(instrumentId, tuningId);
        });
    }

    /**
     * Apply a tuning preset
     */
    applyTuningPreset(instrumentId, tuningId) {
        const instrument = this.instrumentPresets[instrumentId];
        const tuning = instrument.tunings[tuningId];
        
        if (tuning) {
            // Special handling for 12-string guitar
            if (instrumentId === 'twelve_string_guitar') {
                const stringCountInput = document.getElementById('string-count');
                stringCountInput.value = instrument.strings;
                this.updateTuningInputs(tuning);
                
                // Note: In a real implementation, you would need special handling for
                // the 12-string guitar's doubled strings
            } else {
                const stringCountInput = document.getElementById('string-count');
                stringCountInput.value = instrument.strings;
                this.updateTuningInputs(tuning);
            }
        }
        
        this.updateFretboard();
    }

    /**
     * Flip the string order in the tuning
     */
    flipStringOrder() {
        // Get current tuning values
        const tuningSelects = document.querySelectorAll('.tuning-select');
        const tuning = Array.from(tuningSelects).map(select => select.value);
        
        // Reverse the tuning array
        const reversedTuning = [...tuning].reverse();
        
        // Update the tuning inputs with reversed values
        this.updateTuningInputs(reversedTuning);
        
        // Update the fretboard with the new tuning
        this.updateFretboard();
    }

    /**
     * Add MP3 player controls
     */
    addMp3PlayerControls() {
        // Create container in the main content
        const mainContent = document.querySelector('.main-content');
        const fretboardContainer = document.querySelector('.fretboard-container');
        
        const mp3Container = document.createElement('div');
        mp3Container.className = 'mp3-player-container';
        mp3Container.style.margin = '20px 0';
        mp3Container.style.display = 'none'; // Hidden by default
        
        // Create player
        const audioPlayer = document.createElement('audio');
        audioPlayer.id = 'mp3-player';
        audioPlayer.controls = true;
        audioPlayer.style.width = '100%';
        
        // Add to DOM
        mp3Container.appendChild(audioPlayer);
        mainContent.insertBefore(mp3Container, fretboardContainer);
        
        // Create MP4 player
        const mp4Container = document.createElement('div');
        mp4Container.className = 'mp4-player-container';
        mp4Container.style.margin = '20px 0';
        mp4Container.style.display = 'none'; // Hidden by default
        
        // Create video player
        const videoPlayer = document.createElement('video');
        videoPlayer.id = 'mp4-player';
        videoPlayer.controls = true;
        videoPlayer.style.width = '100%';
        
        // Add to DOM
        mp4Container.appendChild(videoPlayer);
        mainContent.insertBefore(mp4Container, fretboardContainer);
        
        // Add JPG image container
        const jpgContainer = document.createElement('div');
        jpgContainer.className = 'jpg-image-container';
        jpgContainer.style.margin = '20px 0';
        jpgContainer.style.display = 'none'; // Hidden by default
        
        // Create image element
        const imageElement = document.createElement('img');
        imageElement.id = 'jpg-image';
        imageElement.style.width = '100%';
        imageElement.style.maxHeight = '400px';
        imageElement.style.objectFit = 'contain';
        
        // Add to DOM
        jpgContainer.appendChild(imageElement);
        mainContent.insertBefore(jpgContainer, fretboardContainer);
        
        // Add Piano container
        const pianoContainer = document.createElement('div');
        pianoContainer.className = 'piano-container';
        pianoContainer.style.margin = '20px 0';
        pianoContainer.style.display = 'none'; // Hidden by default
        
        // Create piano keyboard
        pianoContainer.appendChild(this.createPianoKeyboard());
        
        // Add to DOM
        mainContent.insertBefore(pianoContainer, fretboardContainer);
        
        // Create a new section at the bottom of the sidebar for media buttons
        const sidebar = document.querySelector('.sidebar');
        
        // Create the media controls section
        const mediaSection = document.createElement('div');
        mediaSection.className = 'media-controls-section';
        mediaSection.innerHTML = '<h2 class="sidebar-heading">Media Controls</h2>';
        mediaSection.style.marginTop = '20px';
        
        // Create the buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'grid';
        buttonsContainer.style.gridTemplateColumns = '1fr';
        buttonsContainer.style.gap = '10px';
        buttonsContainer.style.padding = '10px';
        
        // Create MP3 Player button
        const mp3Button = document.createElement('button');
        mp3Button.className = 'media-control-button';
        mp3Button.textContent = 'MP3 Player';
        mp3Button.addEventListener('click', () => {
            // Toggle visibility
            const isVisible = mp3Container.style.display !== 'none';
            mp3Container.style.display = isVisible ? 'none' : 'block';
            
            // Update audio source based on current pattern
            if (!isVisible) {
                this.updateAudioSource();
            }
        });
        
        // Create MP4 Player button
        const mp4Button = document.createElement('button');
        mp4Button.className = 'media-control-button';
        mp4Button.textContent = 'MP4 Player';
        mp4Button.addEventListener('click', () => {
            // Toggle visibility
            const isVisible = mp4Container.style.display !== 'none';
            mp4Container.style.display = isVisible ? 'none' : 'block';
            
            // Update video source based on current pattern
            if (!isVisible) {
                this.updateVideoSource();
            }
        });
        
        // Create JPG Image button
        const jpgButton = document.createElement('button');
        jpgButton.className = 'media-control-button';
        jpgButton.textContent = 'JPG Image';
        jpgButton.addEventListener('click', () => {
            // Toggle visibility
            const isVisible = jpgContainer.style.display !== 'none';
            jpgContainer.style.display = isVisible ? 'none' : 'block';
            
            // Update image source based on current pattern
            if (!isVisible) {
                this.updateImageSource();
            }
        });
        
        // Create Piano button
        const pianoButton = document.createElement('button');
        pianoButton.className = 'media-control-button';
        pianoButton.textContent = 'Piano';
        pianoButton.addEventListener('click', () => {
            // Toggle visibility
            const isVisible = pianoContainer.style.display !== 'none';
            pianoContainer.style.display = isVisible ? 'none' : 'block';
            
            // Update piano highlights based on current pattern
            if (!isVisible) {
                this.updatePianoHighlights();
            }
        });
        
        // Add buttons to container
        buttonsContainer.appendChild(mp3Button);
        buttonsContainer.appendChild(mp4Button);
        buttonsContainer.appendChild(jpgButton);
        buttonsContainer.appendChild(pianoButton);
        
        // Insert at the bottom of the sidebar
        sidebar.appendChild(mediaSection);
        sidebar.appendChild(buttonsContainer);
    }

    /**
     * Create a two-octave piano keyboard
     */
    createPianoKeyboard() {
        const pianoKeyboard = document.createElement('div');
        pianoKeyboard.className = 'piano-keyboard';
        pianoKeyboard.style.display = 'flex';
        pianoKeyboard.style.position = 'relative';
        pianoKeyboard.style.height = '150px';
        pianoKeyboard.style.width = '100%';
        pianoKeyboard.style.margin = '0 auto';
        pianoKeyboard.style.userSelect = 'none';
        
        // Define the notes for two octaves (C3-B4)
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
                       'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const octaves = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
                         4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
        
        // Set up the keyboard structure
        const whiteKeyWidth = 100 / 14; // 14 white keys in 2 octaves
        let whiteKeyIndex = 0;
        
        // Create the keys
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            const octave = octaves[i];
            const isSharp = note.includes('#');
            
            const key = document.createElement('div');
            key.setAttribute('data-note', note);
            key.setAttribute('data-octave', octave);
            key.setAttribute('data-note-id', `${note}${octave}`);
            
            if (isSharp) {
                // Black key
                key.className = 'piano-key piano-key-black';
                key.style.position = 'absolute';
                key.style.width = `${whiteKeyWidth * 0.6}%`;
                key.style.height = '60%';
                key.style.backgroundColor = '#000';
                key.style.zIndex = '1';
                key.style.left = `${(whiteKeyIndex - 0.3) * whiteKeyWidth}%`;
                key.style.borderRadius = '0 0 4px 4px';
            } else {
                // White key
                key.className = 'piano-key piano-key-white';
                key.style.flex = '1';
                key.style.height = '100%';
                key.style.backgroundColor = '#fff';
                key.style.border = '1px solid #ccc';
                key.style.borderRadius = '0 0 4px 4px';
                key.style.position = 'relative';
                whiteKeyIndex++;
            }
            
            // Add the note name to white keys
            if (!isSharp) {
                const noteLabel = document.createElement('div');
                noteLabel.textContent = `${note}${octave}`;
                noteLabel.style.position = 'absolute';
                noteLabel.style.top = isSharp ? '10px' : '35px';
                noteLabel.style.left = '0';
                noteLabel.style.right = '0';
                noteLabel.style.textAlign = 'center';
                noteLabel.style.fontSize = '12px';
                noteLabel.style.color = '#333';
                key.appendChild(noteLabel);
            }
            
            // Add click event to play the note
            key.addEventListener('click', () => this.playPianoNote(note, octave));
            
            // Add hover effect
            key.addEventListener('mouseenter', () => {
                key.style.backgroundColor = isSharp ? '#333' : '#f0f0f0';
            });
            
            key.addEventListener('mouseleave', () => {
                if (!key.classList.contains('piano-key-active')) {
                    key.style.backgroundColor = isSharp ? '#000' : '#fff';
                }
            });
            
            pianoKeyboard.appendChild(key);
        }
        
        return pianoKeyboard;
    }

    /**
     * Play a note on the piano
     */
    playPianoNote(note, octave) {
        if (!this.synth) {
            this.initSynth();
            return;
        }
        
        // Get frequency from music theory
        const frequency = this.musicTheory.getNoteFrequency(note, octave);
        if (!frequency) return;
        
        // Play the note
        this.synth.triggerAttackRelease(frequency, 0.3);
        
        // Highlight the key
        const key = document.querySelector(`.piano-key[data-note-id="${note}${octave}"]`);
        if (key) {
            const isSharp = note.includes('#');
            key.style.backgroundColor = isSharp ? '#8A2BE2' : '#87CEFA';
            key.classList.add('piano-key-active');
            
            setTimeout(() => {
                key.style.backgroundColor = isSharp ? '#000' : '#fff';
                key.classList.remove('piano-key-active');
            }, 300);
        }
    }

    /**
     * Update piano highlighting based on the current pattern
     */
    updatePianoHighlights() {
        // First, remove all highlights
        const pianoKeys = document.querySelectorAll('.piano-key');
        pianoKeys.forEach(key => {
            const isSharp = key.getAttribute('data-note').includes('#');
            
            // Apply the color from the theme
            key.style.backgroundColor = isSharp ? '#000' : '#fff';
            key.classList.remove('piano-key-active');
            
            // Remove any added text for interval display
            const intervalText = key.querySelector('.interval-text');
            if (intervalText) key.removeChild(intervalText);
        });
        
        // Get current key and pattern information
        const key = document.getElementById('key-select').value;
        const patternType = document.getElementById('pattern-type').value;
        const pattern = document.getElementById('pattern-select').value;
        const displayMode = document.getElementById('display-mode').value;
        
        // Get pattern data and colors
        let patternData = null;
        if (patternType === 'scale') {
            patternData = this.musicTheory.scales[pattern];
        } else if (patternType === 'chord') {
            patternData = this.musicTheory.chords[pattern];
        } else if (patternType === 'interval') {
            patternData = { intervals: [pattern] };
        }
        
        // Get theme colors
        const colorTheme = document.getElementById('color-theme').value;
        const colors = this.musicTheory.colorThemes[colorTheme] || this.musicTheory.colorThemes.default;
        
        // Then highlight keys that are in the current pattern
        if (this.fretboard.activeNotes && this.fretboard.activeNotes.length > 0) {
            this.fretboard.activeNotes.forEach((note, noteIndex) => {
                // Determine what interval this note represents
                let interval = null;
                let intervalLabel = '';
                let fillColor = '';
                
                if (patternData && patternData.intervals && noteIndex < patternData.intervals.length) {
                    interval = patternData.intervals[noteIndex];
                    
                    // Get interval color and label
                    if (displayMode === 'intervals' && this.musicTheory.intervals[interval]) {
                        intervalLabel = this.musicTheory.intervals[interval].shortName;
                        fillColor = colors.intervals && colors.intervals[interval] ? 
                            colors.intervals[interval] : this.musicTheory.intervals[interval].color;
                    } else {
                        intervalLabel = note;
                        
                        // Use interval color but with note label
                        if (interval && this.musicTheory.intervals[interval]) {
                            fillColor = colors.intervals && colors.intervals[interval] ? 
                                colors.intervals[interval] : this.musicTheory.intervals[interval].color;
                        } else {
                            fillColor = '#3498db'; // Default blue color
                        }
                    }
                } else {
                    // Fallback if we can't determine the interval
                    interval = this.musicTheory.getInterval(key, note);
                    intervalLabel = displayMode === 'intervals' && interval ? 
                        this.musicTheory.intervals[interval].shortName : note;
                        
                    if (interval && this.musicTheory.intervals[interval]) {
                        fillColor = colors.intervals && colors.intervals[interval] ? 
                            colors.intervals[interval] : this.musicTheory.intervals[interval].color;
                    } else {
                        fillColor = '#3498db'; // Default blue color
                    }
                }
                
                // Highlight in both octaves
                const keys3 = document.querySelectorAll(`.piano-key[data-note="${note}"][data-octave="3"]`);
                const keys4 = document.querySelectorAll(`.piano-key[data-note="${note}"][data-octave="4"]`);
                
                [...keys3, ...keys4].forEach(key => {
                    if (key) {
                        const isSharp = note.includes('#');
                        
                        // Apply the color from the theme
                        key.style.backgroundColor = fillColor || (isSharp ? '#8A2BE2' : '#87CEFA');
                        
                        // Add interval text
                        if (intervalLabel) {
                            // Create or update interval text
                            let intervalText = key.querySelector('.interval-text');
                            if (!intervalText) {
                                intervalText = document.createElement('div');
                                intervalText.className = 'interval-text';
                                intervalText.style.position = 'absolute';
                                intervalText.style.top = isSharp ? '10px' : '35px';
                                intervalText.style.left = '0';
                                intervalText.style.right = '0';
                                intervalText.style.textAlign = 'center';
                                intervalText.style.fontWeight = 'bold';
                                intervalText.style.fontSize = '14px';
                                intervalText.style.color = this.getContrastColor(fillColor || (isSharp ? '#8A2BE2' : '#87CEFA'));
                                intervalText.style.zIndex = '2';
                                intervalText.style.pointerEvents = 'none';
                                key.appendChild(intervalText);
                            }
                            
                            intervalText.textContent = intervalLabel;
                        }
                    }
                });
            });
        }
    }

    /**
     * Get a contrasting color for text (black or white) based on background color
     */
    getContrastColor(hexColor) {
        // Extract the color without the # if it exists
        const hex = hexColor.replace(/^#/, '');
        
        // Convert to RGB
        let r, g, b;
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
        
        // Handle invalid colors by returning black
        if (isNaN(r) || isNaN(g) || isNaN(b)) return '#000000';
        
        // Calculate brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // Return black for bright colors, white for dark colors
        return brightness > 125 ? '#000000' : '#FFFFFF';
    }
    
    /**
     * Update media sources to fix the error
     */
    updateAudioSource() {
        // Stub: Update the MP3 player's source based on the current pattern as needed.
        console.log('updateAudioSource: Called. Implement audio source update logic as needed.');
        // Example implementation:
        // const audioPlayer = document.getElementById('mp3-player');
        // audioPlayer.src = `audio/${this.currentKey}_${this.currentPatternType}_${this.currentPattern}.mp3`;
        // this.audioPlayer.load();
    }

    updateImageSource() {
        // Stub: Update the JPG image's source based on the current pattern as needed.
        console.log('updateImageSource: Called. Implement image source update logic as needed.');
        // Example implementation:
        // const imageElement = document.getElementById('jpg-image');
        // imageElement.src = `images/${this.currentKey}_${this.currentPatternType}_${this.currentPattern}.jpg`;
    }
    
    /**
     * Setup chromatic tuner functionality
     */
    setupChromaticTuner() {
        const toggleButton = document.getElementById('chromatic-tuner-toggle');
        const tunerContainer = document.getElementById('chromatic-tuner-container');
        const tunerButtonsContainer = tunerContainer.querySelector('.chromatic-tuner-buttons');

        if (!toggleButton || !tunerContainer || !tunerButtonsContainer) {
            console.warn('Chromatic tuner elements not found.');
            return;
        }

        // Populate note buttons
        tunerButtonsContainer.innerHTML = ''; // Clear existing buttons
        this.musicTheory.notes.forEach(note => {
            const noteButton = document.createElement('button');
            noteButton.textContent = note;
            noteButton.className = 'chromatic-tuner-button';
            noteButton.style.padding = '5px';
            noteButton.style.margin = '2px';
            noteButton.style.fontSize = '0.9em';
            noteButton.addEventListener('click', async () => {
                if (!this.synth) {
                    await this.initSynth();
                }
                const frequency = this.musicTheory.getNoteFrequency(note, 4); // Play in 4th octave
                if (frequency && this.synth) {
                    this.synth.triggerAttackRelease(frequency, '8n');
                }
            });
            tunerButtonsContainer.appendChild(noteButton);
        });

        // Toggle visibility
        toggleButton.addEventListener('click', () => {
            const isVisible = tunerContainer.style.display !== 'none';
            tunerContainer.style.display = isVisible ? 'none' : 'block';
            toggleButton.textContent = isVisible ? 'Show Chromatic Tuner' : 'Hide Chromatic Tuner';
        });
    }
    
    /**
     * Load and apply default settings from localStorage
     */
    loadAndApplyDefaultSettings() {
        const defaultKey = localStorage.getItem('defaultKey');
        const defaultDisplayMode = localStorage.getItem('defaultDisplayMode');
        const defaultPatternType = localStorage.getItem('defaultPatternType');
        const defaultPattern = localStorage.getItem('defaultPattern');

        if (defaultKey) {
            const keySelect = document.getElementById('key-select');
            if (keySelect) keySelect.value = defaultKey;
        }
        if (defaultDisplayMode) {
            const displayModeSelect = document.getElementById('display-mode');
            if (displayModeSelect) displayModeSelect.value = defaultDisplayMode;
        }
        if (defaultPatternType) {
            const patternTypeSelect = document.getElementById('pattern-type');
            if (patternTypeSelect) {
                patternTypeSelect.value = defaultPatternType;
                // Important: updatePatternSelect must be called *after* setting the pattern type
                // and *before* trying to set the default pattern, so that the
                // pattern select dropdown is populated with the correct options.
                this.updatePatternSelect(); 
            }
        }
        // We call updatePatternSelect() again here if defaultPatternType was not set,
        // to ensure patternSelect is populated based on the HTML default pattern type.
        // If defaultPatternType was set, this call is redundant but harmless.
        else { 
             this.updatePatternSelect();
        }


        if (defaultPattern) {
            const patternSelect = document.getElementById('pattern-select');
            if (patternSelect) {
                // Check if the default pattern is a valid option for the current (possibly default) pattern type
                const isValidOption = Array.from(patternSelect.options).some(opt => opt.value === defaultPattern);
                if (isValidOption) {
                    patternSelect.value = defaultPattern;
                } else {
                    console.warn(`Stored default pattern "${defaultPattern}" is not valid for the current pattern type. Using first available pattern.`);
                    if (patternSelect.options.length > 0) {
                         patternSelect.selectedIndex = 0;
                    }
                }
            }
        }
        // If no default pattern is stored, ensure the first option is selected if available
        else {
            const patternSelect = document.getElementById('pattern-select');
            if (patternSelect && patternSelect.options.length > 0) {
                 patternSelect.selectedIndex = 0;
            }
        }
    }
    
    /**
     * Setup theme switching functionality
     */
    setupThemeSwitching() {
        const themeSelect = document.getElementById('page-theme');
        const fontSizeSelect = document.getElementById('font-size');
        
        // Apply saved theme if it exists
        const savedTheme = localStorage.getItem('pageTheme');
        const savedFontSize = localStorage.getItem('pageFontSize');
        
        if (savedTheme) {
            themeSelect.value = savedTheme;
            this.applyTheme(savedTheme);
        }
        
        if (savedFontSize) {
            fontSizeSelect.value = savedFontSize;
            this.applyFontSize(savedFontSize);
        }
        
        // Add event listeners
        themeSelect.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            this.applyTheme(selectedTheme);
            localStorage.setItem('pageTheme', selectedTheme);
        });
        
        fontSizeSelect.addEventListener('change', (e) => {
            const selectedSize = e.target.value;
            this.applyFontSize(selectedSize);
            localStorage.setItem('pageFontSize', selectedSize);
        });
    }
    
    /**
     * Apply the selected theme to the page
     */
    applyTheme(theme) {
        // Remove all theme classes from body
        document.body.classList.remove(
            'theme-default',
            'theme-dark-mode',
            'theme-light-mode',
            'theme-night-owl',
            'theme-sepia',
            'theme-forest',
            'theme-ocean',
            'theme-sunset',
            'theme-monochrome',
            'theme-high-contrast',
            'theme-pastel',
            'theme-neon',
            'theme-cyberpunk',
            'theme-retro',
            'theme-minimal',
            'theme-vintage'
        );
        
        // Add the selected theme class to body
        if (theme !== 'default') {
            document.body.classList.add('theme-' + theme);
        }
        
        // Redraw the fretboard to apply new theme colors
        this.updateFretboard();
    }
    
    /**
     * Apply selected font size to the page
     */
    applyFontSize(size) {
        const sizeValues = {
            'small': '0.875rem',
            'medium': '1rem',
            'large': '1.125rem',
            'extra-large': '1.25rem'
        };
        
        document.documentElement.style.fontSize = sizeValues[size] || '1rem';
    }
    
    /**
     * Export all scales for all keys as JPGs into a zip file
     */
    async exportAllScalesToZip() {
        // Check if JSZip is available
        if (typeof JSZip === 'undefined') {
            alert('JSZip library is not loaded. Cannot create ZIP file.');
            return;
        }
        
        const currentStringCount = parseInt(document.getElementById('string-count').value);
        const currentTuning = this.getCurrentTuning();

        const keys = this.musicTheory.notes;
        const scaleEntries = Object.entries(this.musicTheory.scales);
        this.stopExporting = false;
        
        // Create button references and update UI
        const btn = document.getElementById('save-scales-zip');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Creating ZIP...';
        
        const stopExportBtn = document.createElement('button');
        stopExportBtn.textContent = 'Stop Exporting';
        stopExportBtn.style.backgroundColor = '#e74c3c';
        stopExportBtn.style.marginLeft = '10px';
        stopExportBtn.addEventListener('click', () => {
            this.stopExporting = true;
            stopExportBtn.disabled = true;
            stopExportBtn.textContent = 'Stopping...';
        });
        btn.insertAdjacentElement('afterend', stopExportBtn);
        
        const zip = new JSZip();
        let imageCount = 0;
        
        try {
            for (const key of keys) {
                if (this.stopExporting) break;
                
                const keyFolder = zip.folder(key.replace('#', 'sharp'));
                
                for (const [scaleId, scaleData] of scaleEntries) {
                    if (this.stopExporting) break;
                    
                    btn.textContent = `Processing ${key} ${scaleData.name}...`;
                    
                    this.fretboard.updatePattern(key, 'scale', scaleId);
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    const canvas = await html2canvas(this.fretboard.container);
                    const imageData = canvas.toDataURL('image/jpeg').split(',')[1];
                    
                    const safeKey = key.replace('#', 'sharp');
                    const safeScaleName = scaleData.name.replace(/\s+/g, '_').replace(/[^\w-]/g, '');
                    const filename = `scale_${safeKey}_${safeScaleName}.jpg`;
                    
                    keyFolder.file(filename, imageData, {base64: true});
                    imageCount++;
                    
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }
            
            if (!this.stopExporting) {
                btn.textContent = 'Generating ZIP file...';
                const zipBlob = await zip.generateAsync({type: 'blob'});
                
                const zipUrl = URL.createObjectURL(zipBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = zipUrl;
                downloadLink.download = `all_scales_${currentStringCount}-strings.zip`;
                
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                URL.revokeObjectURL(zipUrl);
            }
        } catch (error) {
            console.error('Error creating ZIP file:', error);
            alert(`Error creating ZIP file: ${error.message}`);
        } finally {
            if (stopExportBtn.parentNode) stopExportBtn.parentNode.removeChild(stopExportBtn);
            btn.disabled = false;
            btn.textContent = originalText;
            
            if (this.stopExporting) {
                alert(`Export stopped after ${imageCount} scales`);
            } else {
                alert(`Successfully exported ${imageCount} scale diagrams to ZIP file`);
            }
        }
    }
    
    /**
     * Export all chords for all keys as JPGs into a zip file
     */
    async exportAllChordsToZip() {
        if (typeof JSZip === 'undefined') {
            alert('JSZip library is not loaded. Cannot create ZIP file.');
            return;
        }

        const currentStringCount = parseInt(document.getElementById('string-count').value);
        const currentTuning = this.getCurrentTuning();
        
        const keys = this.musicTheory.notes;
        const chordEntries = Object.entries(this.musicTheory.chords);
        this.stopExporting = false;
        
        const btn = document.getElementById('save-chords-zip');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Creating ZIP...';
        
        const stopExportBtn = document.createElement('button');
        stopExportBtn.textContent = 'Stop Exporting';
        stopExportBtn.style.backgroundColor = '#e74c3c';
        stopExportBtn.style.marginLeft = '10px';
        stopExportBtn.addEventListener('click', () => {
            this.stopExporting = true;
            stopExportBtn.disabled = true;
            stopExportBtn.textContent = 'Stopping...';
        });
        btn.insertAdjacentElement('afterend', stopExportBtn);
        
        const zip = new JSZip();
        let imageCount = 0;
        
        try {
            for (const key of keys) {
                if (this.stopExporting) break;
                
                const keyFolder = zip.folder(key.replace('#', 'sharp'));
                
                for (const [chordId, chordData] of chordEntries) {
                    if (this.stopExporting) break;
                    
                    btn.textContent = `Processing ${key} ${chordData.name}...`;
                    
                    this.fretboard.updatePattern(key, 'chord', chordId);
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    const canvas = await html2canvas(this.fretboard.container);
                    const imageData = canvas.toDataURL('image/jpeg').split(',')[1];
                    
                    const safeKey = key.replace('#', 'sharp');
                    const safeChordName = chordData.name.replace(/\s+/g, '_').replace(/[^\w-]/g, '');
                    const filename = `chord_${safeKey}_${safeChordName}.jpg`;
                    
                    keyFolder.file(filename, imageData, {base64: true});
                    imageCount++;
                    
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }
            
            if (!this.stopExporting) {
                btn.textContent = 'Generating ZIP file...';
                const zipBlob = await zip.generateAsync({type: 'blob'});
                
                const zipUrl = URL.createObjectURL(zipBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = zipUrl;
                downloadLink.download = `all_chords_${currentStringCount}-strings.zip`;
                
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                URL.revokeObjectURL(zipUrl);
            }
        } catch (error) {
            console.error('Error creating ZIP file:', error);
            alert(`Error creating ZIP file: ${error.message}`);
        } finally {
            if (stopExportBtn.parentNode) stopExportBtn.parentNode.removeChild(stopExportBtn);
            btn.disabled = false;
            btn.textContent = originalText;
            
            if (this.stopExporting) {
                alert(`Export stopped after ${imageCount} chords`);
            } else {
                alert(`Successfully exported ${imageCount} chord diagrams to ZIP file`);
            }
        }
    }
    
    /**
     * Export all intervals for all keys as JPGs into a zip file
     */
    async exportAllIntervalsToZip() {
        if (typeof JSZip === 'undefined') {
            alert('JSZip library is not loaded. Cannot create ZIP file.');
            return;
        }

        const currentStringCount = parseInt(document.getElementById('string-count').value);
        const currentTuning = this.getCurrentTuning();
        
        const keys = this.musicTheory.notes;
        const intervalEntries = Object.entries(this.musicTheory.intervals);
        this.stopExporting = false;
        
        const btn = document.getElementById('save-intervals-zip');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Creating ZIP...';
        
        const stopExportBtn = document.createElement('button');
        stopExportBtn.textContent = 'Stop Exporting';
        stopExportBtn.style.backgroundColor = '#e74c3c';
        stopExportBtn.style.marginLeft = '10px';
        stopExportBtn.addEventListener('click', () => {
            this.stopExporting = true;
            stopExportBtn.disabled = true;
            stopExportBtn.textContent = 'Stopping...';
        });
        btn.insertAdjacentElement('afterend', stopExportBtn);
        
        const zip = new JSZip();
        let imageCount = 0;
        
        try {
            for (const key of keys) {
                if (this.stopExporting) break;
                
                const keyFolder = zip.folder(key.replace('#', 'sharp'));
                
                for (const [intervalId, intervalData] of intervalEntries) {
                    if (this.stopExporting) break;
                    
                    btn.textContent = `Processing ${key} ${intervalData.name}...`;
                    
                    this.fretboard.updatePattern(key, 'interval', intervalId);
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    const canvas = await html2canvas(this.fretboard.container);
                    const imageData = canvas.toDataURL('image/jpeg').split(',')[1];
                    
                    const safeKey = key.replace('#', 'sharp');
                    const safeIntervalName = intervalData.name.replace(/\s+/g, '_').replace(/[^\w-]/g, '');
                    const filename = `interval_${safeKey}_${intervalId.replace('#', 'sharp')}_${safeIntervalName}.jpg`;
                    
                    keyFolder.file(filename, imageData, {base64: true});
                    imageCount++;
                    
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }
            
            if (!this.stopExporting) {
                btn.textContent = 'Generating ZIP file...';
                const zipBlob = await zip.generateAsync({type: 'blob'});
                
                const zipUrl = URL.createObjectURL(zipBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = zipUrl;
                downloadLink.download = `all_intervals_${currentStringCount}-strings.zip`;
                
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                URL.revokeObjectURL(zipUrl);
            }
        } catch (error) {
            console.error('Error creating ZIP file:', error);
            alert(`Error creating ZIP file: ${error.message}`);
        } finally {
            if (stopExportBtn.parentNode) stopExportBtn.parentNode.removeChild(stopExportBtn);
            btn.disabled = false;
            btn.textContent = originalText;
            
            if (this.stopExporting) {
                alert(`Export stopped after ${imageCount} intervals`);
            } else {
                alert(`Successfully exported ${imageCount} interval diagrams to ZIP file`);
            }
        }
    }
    
    /**
     * Generic function to export all patterns (scales, chords, or intervals)
     * for all string counts (1 to max) and all keys into a ZIP file.
     */
    async exportAllPatternsForAllStringCountsToZip(patternType, zipFilenameBase) {
        if (typeof JSZip === 'undefined') {
            alert('JSZip library is not loaded. Cannot create ZIP file.');
            return;
        }

        let btnId;
        let patternsObject;
        let patternTypeNameForFile;

        switch (patternType) {
            case 'scale':
                btnId = 'save-scales-all-strings-zip';
                patternsObject = this.musicTheory.scales;
                patternTypeNameForFile = 'scale';
                break;
            case 'chord':
                btnId = 'save-chords-all-strings-zip';
                patternsObject = this.musicTheory.chords;
                patternTypeNameForFile = 'chord';
                break;
            case 'interval':
                btnId = 'save-intervals-all-strings-zip';
                patternsObject = this.musicTheory.intervals;
                patternTypeNameForFile = 'interval';
                break;
            default:
                console.error('Unknown pattern type for export:', patternType);
                alert('Invalid pattern type for export.');
                return;
        }

        const maxStringCount = parseInt(document.getElementById('string-count').max) || 8; // Default to 8 if max not found or 0
        const keys = this.musicTheory.notes;
        const patternEntries = Object.entries(patternsObject);
        
        this.stopExporting = false;

        const btn = document.getElementById(btnId);
        const originalText = btn.textContent;
        btn.textContent = 'Preparing Export...';

        const stopExportBtn = document.createElement('button');
        stopExportBtn.textContent = 'Stop Exporting';
        stopExportBtn.style.backgroundColor = '#e74c3c';
        stopExportBtn.style.marginLeft = '10px';
        stopExportBtn.addEventListener('click', () => {
            this.stopExporting = true;
            stopExportBtn.disabled = true;
            stopExportBtn.textContent = 'Stopping...';
        });
        // Insert stop button carefully, e.g., in a container or next to the button if structure allows
        // For now, let's assume it's added after the button within its parent.
        if (btn.parentNode) {
            btn.parentNode.insertBefore(stopExportBtn, btn.nextSibling);
        }


        const zip = new JSZip();
        let imageCount = 0;
        const totalOperations = maxStringCount * keys.length * patternEntries.length;
        let currentOperation = 0;

        // Store original fretboard settings to restore later
        const originalFretboardSettings = { ...this.fretboard.settings };
        const originalStringCount = parseInt(document.getElementById('string-count').value);
        const originalTuningInputs = this.getCurrentTuning();


        try {
            for (let sc = 1; sc <= maxStringCount; sc++) {
                if (this.stopExporting) break;
                
                const stringCountFolder = zip.folder(`${sc}-strings`);
                const defaultTuningForSc = this.musicTheory.getDefaultTuning(sc).reverse(); // Reverse for high to low display

                // Temporarily update fretboard settings for this string count
                const tempSettings = { ...this.fretboard.settings, tuning: defaultTuningForSc };
                 // No direct string count in fretboard settings, it's derived from tuning length
                this.fretboard.updateSettings(tempSettings);


                for (const key of keys) {
                    if (this.stopExporting) break;
                    const keyFolder = stringCountFolder.folder(key.replace('#', 'sharp'));

                    for (const [patternId, patternData] of patternEntries) {
                        if (this.stopExporting) break;
                        
                        currentOperation++;
                        btn.textContent = `Processing ${sc}-str, ${key}, ${patternData.name} (${currentOperation}/${totalOperations})`;

                        this.fretboard.updatePattern(key, patternType, patternId);
                        // Ensure theory info panel is updated/visible for the export if desired,
                        // or hide it if only diagram is needed. For simplicity, assume diagram only.
                        // this.updateTheoryInfo(key, patternType, patternId);
                        
                        // Wait briefly for the fretboard to render
                        await new Promise(resolve => setTimeout(resolve, 150)); // Reduced delay

                        const canvas = await html2canvas(this.fretboard.container);
                        const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

                        const safeKey = key.replace('#', 'sharp');
                        const safePatternName = patternData.name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_');
                        const filename = `${patternTypeNameForFile}_${sc}-strings_${safeKey}_${safePatternName}.jpg`;
                        
                        keyFolder.file(filename, imageData, {base64: true});
                        imageCount++;
                        
                        await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay
                    }
                }
            }
        } catch (error) {
            console.error(`Error creating ${patternType} ZIP file:`, error);
            alert(`Error creating ${patternType} ZIP file: ${error.message}`);
        } finally {
            // Restore original fretboard settings
            document.getElementById('string-count').value = originalStringCount;
            this.updateTuningInputs(originalTuningInputs); // Restore original tuning inputs
            this.fretboard.updateSettings(originalFretboardSettings); // Restore fretboard internals
            this.updateFretboard(); // Redraw with original settings

            if (stopExportBtn.parentNode) stopExportBtn.parentNode.removeChild(stopExportBtn);
            btn.disabled = false;
            btn.textContent = originalText;
            
            if (this.stopExporting) {
                alert(`Export stopped after ${imageCount} diagrams.`);
            } else {
                alert(`Successfully exported ${imageCount} ${patternType} diagrams to ZIP file`);
            }
        }
    }

    /**
     * Update media sources to fix the error
     */
    updateAudioSource() {
        // Stub: Update the MP3 player's source based on the current pattern as needed.
        console.log('updateAudioSource: Called. Implement audio source update logic as needed.');
        // Example implementation:
        // const audioPlayer = document.getElementById('mp3-player');
        // audioPlayer.src = `audio/${this.currentKey}_${this.currentPatternType}_${this.currentPattern}.mp3`;
        // this.audioPlayer.load();
    }

    updateImageSource() {
        // Stub: Update the JPG image's source based on the current pattern as needed.
        console.log('updateImageSource: Called. Implement image source update logic as needed.');
        // Example implementation:
        // const imageElement = document.getElementById('jpg-image');
        // imageElement.src = `images/${this.currentKey}_${this.currentPatternType}_${this.currentPattern}.jpg`;
    }
    
    /**
     * Add methods to update media sources to fix the error
     */
    updateAudioSource() {
        // Stub: Update the MP3 player's source based on the current pattern as needed.
        console.log('updateAudioSource: Called. Implement audio source update logic as needed.');
        // Example implementation:
        // const audioPlayer = document.getElementById('mp3-player');
        // audioPlayer.src = `audio/${this.currentKey}_${this.currentPatternType}_${this.currentPattern}.mp3`;
        // this.audioPlayer.load();
    }

    updateImageSource() {
        // Stub: Update the JPG image's source based on the current pattern as needed.
        console.log('updateImageSource: Called. Implement image source update logic as needed.');
        // Example implementation:
        // const imageElement = document.getElementById('jpg-image');
        // imageElement.src = `images/${this.currentKey}_${this.currentPatternType}_${this.currentPattern}.jpg`;
    }
    
    /**
     * Setup collapsible sections
     */
    setupCollapsibleSections() {
        // Get all section headings
        const sectionHeadings = document.querySelectorAll('.sidebar-heading');
        
        // Wrap section content in div containers for collapsing
        sectionHeadings.forEach(heading => {
            // Get all elements after this heading and before the next heading
            let content = [];
            let nextEl = heading.nextElementSibling;
            
            while (nextEl && !nextEl.classList.contains('sidebar-heading')) {
                content.push(nextEl);
                nextEl = nextEl.nextElementSibling;
            }
            
            // Create container for the section content
            const sectionContainer = document.createElement('div');
            sectionContainer.className = 'sidebar-section';
            
            // Get section name for localStorage
            const sectionName = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            
            // Check if this section should be collapsed initially
            if (this.collapsedSections[sectionName]) {
                sectionContainer.classList.add('collapsed');
                heading.classList.add('collapsed');
            }
            
            // Move content into the container
            content.forEach(el => {
                sectionContainer.appendChild(el);
            });
            
            // Insert container after heading
            heading.after(sectionContainer);
            
            // Add click event to toggle
            heading.addEventListener('click', () => {
                sectionContainer.classList.toggle('collapsed');
                heading.classList.toggle('collapsed');
                
                // Save state to localStorage
                this.collapsedSections[sectionName] = sectionContainer.classList.contains('collapsed');
                localStorage.setItem('collapsedSections', JSON.stringify(this.collapsedSections));
            });
        });
    }
    
    /**
     * Setup melodic pattern controls and UI
     */
    setupMelodicPatternControls() {
        // This method is called from initUI but was missing
        // The controls are already in the HTML, so we just need to set initial state
        document.getElementById('stop-melodic-pattern').style.display = 'none';
        document.getElementById('play-melodic-pattern').style.display = 'inline-block';
        
        // Hide custom pattern container initially
        document.getElementById('custom-pattern-container').style.display = 'none';
    }
    
    /**
     * Play a melodic pattern based on the current scale
     */
    async playMelodicPattern() {
        if (!this.synth) {
            await this.initSynth();
        }
        
        // Get the current pattern selection
        const patternSelect = document.getElementById('melodic-pattern-select');
        let pattern;
        
        if (patternSelect.value === 'custom') {
            // Get custom pattern from input
            const customPatternInput = document.getElementById('custom-pattern').value;
            pattern = customPatternInput.split(/\s+/).map(n => parseInt(n));
        } else {
            // Use predefined pattern
            pattern = patternSelect.value.split(/\s+/).map(n => parseInt(n));
        }
        
        // Check if pattern is valid
        if (!pattern.length || pattern.some(isNaN)) {
            alert('Please enter a valid pattern');
            return;
        }
        
        // Stop any existing pattern playback
        this.stopMelodicPattern();
        
        // Show stop button
        document.getElementById('play-melodic-pattern').style.display = 'none';
        document.getElementById('stop-melodic-pattern').style.display = 'inline-block';
        
        // Mark as playing
        this.isPlayingPattern = true;
        
        // Get the current scale notes
        const key = document.getElementById('key-select').value;
        const scaleType = document.getElementById('pattern-select').value;
        const scaleNotes = this.musicTheory.getScaleNotes(key, scaleType);
        
        if (!scaleNotes.length) {
            alert('Cannot play pattern: no notes in current scale');
            this.stopMelodicPattern();
            return;
        }
        
        // Calculate duration based on tempo
        const beatDuration = 60 / this.tempo; 
        
        // Get the current fretboard range to determine how many notes to play
        const startFret = parseInt(this.settings.startFret);
        const endFret = parseInt(this.settings.endFret);
        const fretSpan = endFret - startFret + 1;
        
        // Extrapolate the pattern to cover the full fret range
        const extrapolatedPattern = this.extrapolatePattern(pattern, scaleNotes.length, fretSpan * 3);
        
        // Set up pattern playback
        let noteIndex = 0;
        
        this.patternPlayer = setInterval(() => {
            if (!this.isPlayingPattern) return;
            
            if (noteIndex >= extrapolatedPattern.length) {
                // Reset to start when we reach the end of the pattern
                noteIndex = 0;
                // Optional: stop instead of looping
                // this.stopMelodicPattern();
                // return;
            }
            
            // Get the scale degree (0-based) from the extrapolated pattern
            const scaleDegree = extrapolatedPattern[noteIndex];
            
            // Calculate which octave we're in
            const octave = 4 + Math.floor(scaleDegree / scaleNotes.length);
            
            // Get the actual note in the scale
            const scaleIndex = scaleDegree % scaleNotes.length;
            const note = scaleNotes[scaleIndex];
            
            // Get note frequency
            const frequency = this.musicTheory.getNoteFrequency(note, octave);
            
            // Play the note
            this.synth.triggerAttackRelease(frequency, beatDuration / 2);
            
            // Find and animate note marker
            const markers = this.fretboard.container.querySelectorAll('.note-marker');
            const noteElements = [];
            
            // Group markers by notes
            markers.forEach(marker => {
                if (marker.nextSibling && marker.nextSibling.tagName === 'text') {
                    const textElement = marker.nextSibling;
                    const text = textElement.textContent;
                    
                    // Store reference to the marker and its text
                    noteElements.push({
                        marker,
                        textElement,
                        note: text
                    });
                }
            });
            
            // Find corresponding markers for this note
            const noteMarkers = noteElements.filter(el => {
                const intervals = this.musicTheory.intervals;
                const interval = this.musicTheory.getInterval(key, note);
                return el.note === (this.fretboard.settings.displayMode === 'intervals' && interval ? 
                    intervals[interval].shortName : note);
            });
            
            // Animate the markers
            if (noteMarkers.length > 0) {
                noteMarkers.forEach(el => {
                    // Add 'playing-pattern' class to animate
                    el.marker.classList.add('playing-pattern');
                    
                    // Remove class after animation completes
                    setTimeout(() => {
                        el.marker.classList.remove('playing-pattern');
                    }, beatDuration * 500);
                });
            }
            
            // Move to next note in pattern
            noteIndex++;
            
        }, beatDuration * 1000);
    }
    
    /**
     * Extrapolate a pattern through multiple octaves of a scale
     * @param {Array} pattern - Basic pattern (e.g., [1, 3, 2, 4])
     * @param {number} scaleLength - Number of notes in the scale
     * @param {number} maxNotes - Maximum number of notes to generate
     * @returns {Array} Extrapolated pattern as array of scale degrees (0-based)
     */
    extrapolatePattern(pattern, scaleLength, maxNotes) {
        // Convert pattern to 0-based (scale degrees)
        const zeroBased = pattern.map(n => n - 1);
        
        // Create the extrapolated pattern
        const result = [];
        let currentDegree = 0;
        
        // Keep adding pattern notes until we reach maxNotes
        while (result.length < maxNotes) {
            // Get the next pattern value and convert to a scale degree
            const patternIndex = result.length % zeroBased.length; // Cycle through pattern
            const patternValue = zeroBased[patternIndex];
            
            // Calculate the actual scale degree based on current position
            const scaleDegree = currentDegree + patternValue;
            result.push(scaleDegree);
            
            // Move to the next base degree if we've used all pattern elements once
            if ((result.length % zeroBased.length) === 0) {
                // Move up by the step size (typically 1 for adjacent scale tones)
                currentDegree += 1;
            }
        }
        
        return result;
    }
    
    /**
     * Stop melodic pattern playback
     */
    stopMelodicPattern() {
        // Clear the interval
        if (this.patternPlayer) {
            clearInterval(this.patternPlayer);
            this.patternPlayer = null;
        }
        
        // Reset UI
        this.isPlayingPattern = false;
        document.getElementById('play-melodic-pattern').style.display = 'inline-block';
        document.getElementById('stop-melodic-pattern').style.display = 'none';
    }
    
    /**
     * Update media sources to fix the error
     */
    updateAudioSource() {
        // Stub: Update the MP3 player's source based on the current pattern as needed.
        console.log('updateAudioSource: Called. Implement audio source update logic as needed.');
        // Example implementation:
        // const audioPlayer = document.getElementById('mp3-player');
        // audioPlayer.src = `audio/${this.currentKey}_${this.currentPatternType}_${this.currentPattern}.mp3`;
        // this.audioPlayer.load();
    }

    updateImageSource() {
        // Stub: Update the JPG image's source based on the current pattern as needed.
        console.log('updateImageSource: Called. Implement image source update logic as needed.');
        // Example implementation:
        // const imageElement = document.getElementById('jpg-image');
        // imageElement.src = `images/${this.currentKey}_${this.currentPatternType}_${this.currentPattern}.jpg`;
    }
}
    
document.addEventListener('DOMContentLoaded', () => {
    new App();
});