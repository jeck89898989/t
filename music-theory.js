/**
 * Music Theory Helper Class
 * Contains data and methods for notes, intervals, scales, and chords
 */
class MusicTheory {
    constructor() {
        // Define basic music theory components
        this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        
        this.intervals = {
            '1': { name: 'Root/Unison', shortName: 'R', semitones: 0, color: '#FF0000' },
            'b2': { name: 'Minor 2nd', shortName: 'b2', semitones: 1, color: '#FF7F00' },
            '2': { name: 'Major 2nd', shortName: '2', semitones: 2, color: '#FFFF00' },
            '#2': { name: 'Augmented 2nd', shortName: '#2', semitones: 3, color: '#CCFF00' },
            'b3': { name: 'Minor 3rd', shortName: 'b3', semitones: 3, color: '#00FF00' },
            '3': { name: 'Major 3rd', shortName: '3', semitones: 4, color: '#0000FF' },
            '4': { name: 'Perfect 4th', shortName: '4', semitones: 5, color: '#4B0082' },
            '#4': { name: 'Augmented 4th', shortName: '#4', semitones: 6, color: '#7F00FF' },
            'b5': { name: 'Diminished 5th', shortName: 'b5', semitones: 6, color: '#8F00FF' },
            '5': { name: 'Perfect 5th', shortName: '5', semitones: 7, color: '#FF00FF' },
            '#5': { name: 'Augmented 5th', shortName: '#5', semitones: 8, color: '#FF0080' },
            '6': { name: 'Major 6th', shortName: '6', semitones: 9, color: '#FF8080' },
            'b6': { name: 'Minor 6th', shortName: 'b6', semitones: 8, color: '#80FF80' },
            'b7': { name: 'Minor 7th', shortName: 'b7', semitones: 10, color: '#80FF80' },
            '7': { name: 'Major 7th', shortName: '7', semitones: 11, color: '#8080FF' }
        };
        
        this.scales = {
            'major': { name: 'Major (Ionian)', intervals: ['1', '2', '3', '4', '5', '6', '7'] },
            'natural_minor': { name: 'Natural Minor (Aeolian)', intervals: ['1', '2', 'b3', '4', '5', 'b6', 'b7'] },
            'harmonic_minor': { name: 'Harmonic Minor', intervals: ['1', '2', 'b3', '4', '5', 'b6', '7'] },
            'melodic_minor': { name: 'Melodic Minor', intervals: ['1', '2', 'b3', '4', '5', '6', '7'] },
            'dorian': { name: 'Dorian', intervals: ['1', '2', 'b3', '4', '5', '6', 'b7'] },
            'phrygian': { name: 'Phrygian', intervals: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'] },
            'lydian': { name: 'Lydian', intervals: ['1', '2', '3', '#4', '5', '6', '7'] },
            'mixolydian': { name: 'Mixolydian', intervals: ['1', '2', '3', '4', '5', '6', 'b7'] },
            'locrian': { name: 'Locrian', intervals: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'] },
            'pentatonic_major': { name: 'Pentatonic Major', intervals: ['1', '2', '3', '5', '6'] },
            'pentatonic_minor': { name: 'Pentatonic Minor', intervals: ['1', 'b3', '4', '5', 'b7'] },
            'blues': { name: 'Blues', intervals: ['1', 'b3', '4', 'b5', '5', 'b7'] },
            'whole_tone': { name: 'Whole Tone', intervals: ['1', '2', '3', '#4', '#5', 'b7'] },
            'diminished': { name: 'Diminished', intervals: ['1', '2', 'b3', '4', 'b5', 'b6', '6', '7'] },
            'altered': { name: 'Altered Scale', intervals: ['1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'] },
            'augmented': { name: 'Augmented Scale', intervals: ['1', 'b3', '3', '5', '#5', '7'] },
            'bebop_dominant': { name: 'Bebop Dominant', intervals: ['1', '2', '3', '4', '5', '6', 'b7', '7'] },
            'bebop_major': { name: 'Bebop Major', intervals: ['1', '2', '3', '4', '5', '#5', '6', '7'] },
            'bebop_minor': { name: 'Bebop Minor', intervals: ['1', '2', 'b3', '3', '4', '5', '6', 'b7'] },
            'bebop_dorian': { name: 'Bebop Dorian', intervals: ['1', '2', 'b3', '3', '4', '5', '6', 'b7'] },
            'lydian_dominant': { name: 'Lydian Dominant', intervals: ['1', '2', '3', '#4', '5', '6', 'b7'] },
            'lydian_augmented': { name: 'Lydian Augmented', intervals: ['1', '2', '3', '#4', '#5', '6', '7'] },
            'super_locrian': { name: 'Super Locrian', intervals: ['1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'] },
            'double_harmonic': { name: 'Double Harmonic', intervals: ['1', 'b2', '3', '4', '5', 'b6', '7'] },
            'half_diminished': { name: 'Half Diminished', intervals: ['1', '2', 'b3', '4', 'b5', 'b6', 'b7'] },
            'enigmatic': { name: 'Enigmatic Scale', intervals: ['1', 'b2', '3', '#4', '#5', '#6', '7'] },
            'neapolitan_major': { name: 'Neapolitan Major', intervals: ['1', 'b2', 'b3', '4', '5', '6', '7'] },
            'neapolitan_minor': { name: 'Neapolitan Minor', intervals: ['1', 'b2', 'b3', '4', '5', 'b6', '7'] },
            'hungarian_minor': { name: 'Hungarian Minor', intervals: ['1', '2', 'b3', '#4', '5', 'b6', '7'] },
            'hungarian_major': { name: 'Hungarian Major', intervals: ['1', '#2', '3', '#4', '5', '6', 'b7'] },
            'gypsy': { name: 'Gypsy Scale', intervals: ['1', '2', 'b3', '#4', '5', 'b6', 'b7'] },
            'persian': { name: 'Persian Scale', intervals: ['1', 'b2', '3', '4', 'b5', 'b6', '7'] },
            'arabian': { name: 'Arabian Scale', intervals: ['1', '2', '3', '4', 'b5', 'b6', 'b7'] },
            'japanese': { name: 'Japanese Scale', intervals: ['1', '2', '4', '5', 'b7'] },
            'hirajoshi': { name: 'Hirajoshi Scale', intervals: ['1', '2', 'b3', '5', 'b6'] },
            'in_sen': { name: 'In Sen Scale', intervals: ['1', 'b2', '4', '5', 'b7'] },
            'iwato': { name: 'Iwato Scale', intervals: ['1', 'b2', '4', 'b5', 'b7'] },
            'yo': { name: 'Yo Scale', intervals: ['1', '2', '4', '5', '6'] },
            'prometheus': { name: 'Prometheus Scale', intervals: ['1', '2', '3', '#4', '6', 'b7'] },
            'algerian': { name: 'Algerian Scale', intervals: ['1', '2', 'b3', '#4', '5', 'b6', '7'] },
            'chinese': { name: 'Chinese Scale', intervals: ['1', '3', '#4', '5', '7'] },
            'egyptian': { name: 'Egyptian Scale', intervals: ['1', '2', '4', '5', 'b7'] },
            'eight_tone_spanish': { name: 'Eight Tone Spanish', intervals: ['1', 'b2', '#2', '3', '4', 'b5', 'b6', 'b7'] },
            'hindu': { name: 'Hindu Scale', intervals: ['1', '2', '3', '4', '5', 'b6', 'b7'] },
            'pelog': { name: 'Pelog Scale', intervals: ['1', 'b2', 'b3', '5', 'b6'] },
            'romanian_minor': { name: 'Romanian Minor', intervals: ['1', '2', 'b3', '#4', '5', '6', 'b7'] },
            'ukranian_dorian': { name: 'Ukranian Dorian', intervals: ['1', '2', 'b3', '#4', '5', '6', 'b7'] },
            'lydian_minor': { name: 'Lydian Minor', intervals: ['1', '2', '3', '#4', '5', 'b6', 'b7'] },
            'raga_bhairav': { name: 'Raga Bhairav', intervals: ['1', 'b2', '3', '4', '5', 'b6', '7'] },
            'raga_purvi': { name: 'Raga Purvi', intervals: ['1', 'b2', '3', '#4', '5', 'b6', '7'] },
            'raga_todi': { name: 'Raga Todi', intervals: ['1', 'b2', 'b3', '#4', '5', 'b6', '7'] },
            'altered_dominant': { name: 'Altered Dominant', intervals: ['1', 'b2', '#2', '3', 'b5', '#5', 'b7'] },
            'locrian_natural_6': { name: 'Locrian Natural 6', intervals: ['1', 'b2', 'b3', '4', 'b5', '6', 'b7'] },
            'locrian_sharp_2': { name: 'Locrian ♯2', intervals: ['1', '2', 'b3', '4', 'b5', 'b6', 'b7'] },
            'dorian_flat_2': { name: 'Dorian ♭2', intervals: ['1', 'b2', 'b3', '4', '5', '6', 'b7'] },
            'lydian_flat_7': { name: 'Lydian ♭7', intervals: ['1', '2', '3', '#4', '5', '6', 'b7'] },
            'mixolydian_flat_6': { name: 'Mixolydian ♭6', intervals: ['1', '2', '3', '4', '5', 'b6', 'b7'] },
            'overtone': { name: 'Overtone Scale', intervals: ['1', '2', '3', '#4', '5', '6', 'b7'] },
            'leading_whole_tone': { name: 'Leading Whole Tone', intervals: ['1', '2', '3', '#4', '#5', '#6', '7'] },
            'blues_octatonic': { name: 'Blues Octatonic', intervals: ['1', 'b3', '3', '4', 'b5', '5', 'b7', '7'] },
            'lydian_sharp_2': { name: 'Lydian ♯2', intervals: ['1', '#2', '3', '#4', '5', '6', '7'] },
            'neapolitan_major_pentatonic': { name: 'Neapolitan Major Pentatonic', intervals: ['1', 'b2', '3', '5', '6'] },
            'neapolitan_minor_pentatonic': { name: 'Neapolitan Minor Pentatonic', intervals: ['1', 'b2', '4', '5', 'b7'] },
            'major_blues': { name: 'Major Blues Scale', intervals: ['1', '2', 'b3', '3', '5', '6'] },
            'chromatic': { name: 'Chromatic Scale', intervals: ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'] },
            'augmented_triad': { name: 'Augmented Triad Scale', intervals: ['1', '3', '#5'] },
            'diminished_triad': { name: 'Diminished Triad Scale', intervals: ['1', 'b3', 'b5'] },
            'dominant_pentatonic': { name: 'Dominant Pentatonic', intervals: ['1', '2', '3', '5', 'b7'] },
            'ionian_flat_3': { name: 'Ionian ♭3', intervals: ['1', '2', 'b3', '4', '5', '6', '7'] },
            'dorian_sharp_4': { name: 'Dorian ♯4', intervals: ['1', '2', 'b3', '#4', '5', '6', 'b7'] },
            'phrygian_dominant': { name: 'Phrygian Dominant', intervals: ['1', 'b2', '3', '4', '5', 'b6', 'b7'] },
            'lydian_diminished': { name: 'Lydian Diminished', intervals: ['1', '2', 'b3', '#4', '5', '6', '7'] },
            'bebop_locrian': { name: 'Bebop Locrian', intervals: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7', '7'] },
            'minor_major': { name: 'Minor-Major Scale', intervals: ['1', '2', 'b3', '4', '5', '6', '7'] },
            'locrian_major': { name: 'Locrian Major', intervals: ['1', '2', '3', '4', 'b5', 'b6', 'b7'] },
            'scriabin': { name: 'Scriabin Scale', intervals: ['1', 'b2', '3', '5', '6'] },
            'flat_three_pentatonic': { name: 'Flat Three Pentatonic', intervals: ['1', '2', 'b3', '5', '6'] },
            'insen': { name: 'Insen Scale', intervals: ['1', 'b2', '4', '5', 'b7'] },
            'mohammedan': { name: 'Mohammedan Scale', intervals: ['1', '2', 'b3', '4', '5', 'b6', '7'] },
            'major_augmented': { name: 'Major Augmented Scale', intervals: ['1', '2', '3', '4', '#5', '6', '7'] },
            'harmonic_major': { name: 'Harmonic Major', intervals: ['1', '2', '3', '4', '5', 'b6', '7'] },
            'double_harmonic_major': { name: 'Double Harmonic Major', intervals: ['1', 'b2', '3', '4', '5', 'b6', '7'] },
            'six_tone_symmetrical': { name: 'Six Tone Symmetrical', intervals: ['1', 'b2', '3', '4', '#5', '6'] },
            'balinese': { name: 'Balinese Scale', intervals: ['1', 'b2', 'b3', '5', 'b6'] },
            'kumoi': { name: 'Kumoi Scale', intervals: ['1', '2', 'b3', '5', '6'] },
            'messiaen_mode_2': { name: 'Messiaen Mode 2', intervals: ['1', '2', '3', '#4', '#5', '#6'] },
            'messiaen_mode_3': { name: 'Messiaen Mode 3', intervals: ['1', '2', 'b3', '3', '#4', '5', '#5', '6', '7'] },
            'messiaen_mode_4': { name: 'Messiaen Mode 4', intervals: ['1', 'b2', '2', '3', '#4', '5', '#5', '#6', '7'] },
            'messiaen_mode_5': { name: 'Messiaen Mode 5', intervals: ['1', 'b2', '#2', '3', '#4', '#5', '6', '7'] },
            'messiaen_mode_6': { name: 'Messiaen Mode 6', intervals: ['1', '2', '3', '4', '#4', '#5', '#6', '7'] },
            'messiaen_mode_7': { name: 'Messiaen Mode 7', intervals: ['1', 'b2', '2', 'b3', '3', '#4', '5', '#5', '6', '7'] },
            'prometheus_neapolitan': { name: 'Prometheus Neapolitan', intervals: ['1', 'b2', '3', '#4', '6', 'b7'] },
            'major_locrian': { name: 'Major Locrian', intervals: ['1', '2', '3', '4', 'b5', 'b6', 'b7'] },
            'lydian_minor': { name: 'Lydian Minor', intervals: ['1', '2', '3', '#4', '5', 'b6', 'b7'] },
            'aeolian_flat_1': { name: 'Aeolian ♭1', intervals: ['1', '2', 'b3', '4', '5', 'b6', 'b7'] },
            'flat_six_pentatonic': { name: 'Flat Six Pentatonic', intervals: ['1', '3', '4', '5', 'b6'] },
            'moroccan': { name: 'Moroccan Scale', intervals: ['1', '2', 'b3', '4', '5', 'b6', '7'] },
            'byzantine': { name: 'Byzantine Scale', intervals: ['1', 'b2', '3', '4', '5', 'b6', '7'] },
            'oriental': { name: 'Oriental Scale', intervals: ['1', 'b2', '3', '4', 'b5', '6', 'b7'] },
            'romanian_major': { name: 'Romanian Major', intervals: ['1', 'b2', '3', '#4', '5', '6', '7'] },
            'sikah': { name: 'Sikah Scale', intervals: ['1', 'b2', '3', '4', '5', 'b6', 'b7'] },
            'maqam_hijaz': { name: 'Maqam Hijaz', intervals: ['1', 'b2', '3', '4', '5', 'b6', 'b7'] },
            'maqam_bayati': { name: 'Maqam Bayati', intervals: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'] },
            'maqam_rast': { name: 'Maqam Rast', intervals: ['1', '2', '3', '4', '5', '6', 'b7'] },
            'maqam_saba': { name: 'Maqam Saba', intervals: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'] },
            'maqam_nahawand': { name: 'Maqam Nahawand', intervals: ['1', '2', 'b3', '4', '5', 'b6', 'b7'] },
            'maqam_kurd': { name: 'Maqam Kurd', intervals: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'] },
            'irish': { name: 'Irish Scale', intervals: ['1', '2', 'b3', '4', '5', '6', 'b7'] },
            'scottish': { name: 'Scottish Scale', intervals: ['1', '2', '4', '5', '6'] },
            'spanish_8_tone': { name: 'Spanish 8-Tone', intervals: ['1', 'b2', '#2', '3', '4', 'b5', 'b6', 'b7'] },
            'javanese': { name: 'Javanese Scale', intervals: ['1', 'b2', 'b3', '4', '5', '6', 'b7'] },
            'gamelan_pelog': { name: 'Gamelan Pelog', intervals: ['1', 'b2', 'b3', '5', 'b6'] },
            'mongolian': { name: 'Mongolian Scale', intervals: ['1', '2', '3', '5', '6'] },
            'ritusen': { name: 'Ritusen Scale', intervals: ['1', '2', '4', '5', '6'] },
            'korean': { name: 'Korean Scale', intervals: ['1', '2', '4', '5', 'b7'] },
            'ionian_b2': { name: 'Ionian ♭2', intervals: ['1', 'b2', '3', '4', '5', '6', '7'] },
            'dorian_b5': { name: 'Dorian ♭5', intervals: ['1', '2', 'b3', '4', 'b5', '6', 'b7'] },
            'mixolydian_b9': { name: 'Mixolydian ♭9', intervals: ['1', 'b2', '3', '4', '5', '6', 'b7'] },
            'harmonic_major_b5': { name: 'Harmonic Major ♭5', intervals: ['1', '2', '3', '4', 'b5', 'b6', '7'] },
            'melodic_minor_b5': { name: 'Melodic Minor ♭5', intervals: ['1', '2', 'b3', '4', 'b5', '6', '7'] },
            'major_bebop_hexatonic': { name: 'Major Bebop Hexatonic', intervals: ['1', '2', '3', '4', '5', '6'] },
            'minor_bebop_hexatonic': { name: 'Minor Bebop Hexatonic', intervals: ['1', '2', 'b3', '4', '5', 'b7'] },
            'dom7_pentatonic': { name: 'Dominant 7 Pentatonic', intervals: ['1', '3', '5', '6', 'b7'] },
            'minor7_pentatonic': { name: 'Minor 7 Pentatonic', intervals: ['1', 'b3', '4', '5', 'b7'] },
            'major7_pentatonic': { name: 'Major 7 Pentatonic', intervals: ['1', '3', '5', '6', '7'] },
            'minor6_pentatonic': { name: 'Minor 6 Pentatonic', intervals: ['1', 'b3', '4', '5', '6'] },
            'augmented_triad_plus_octave': { name: 'Augmented Triad + Octave', intervals: ['1', '3', '#5', '1'] },
            'diminished_triad_plus_octave': { name: 'Diminished Triad + Octave', intervals: ['1', 'b3', 'b5', '1'] },
            'lydian_diminished_7': { name: 'Lydian Diminished 7', intervals: ['1', '2', 'b3', '#4', '5', '6', 'b7'] },
            'messiaen_mode_1': { name: 'Messiaen Mode 1', intervals: ['1', '2', '3', '4', '5', '6', '7'] },
            'lydian_pentatonic': { name: 'Lydian Pentatonic', intervals: ['1', '3', '#4', '5', '7'] },
            'man_gong': { name: 'Man Gong Scale', intervals: ['1', '2', '3', '#4', '5', '6'] },
            'mela_todi': { name: 'Mela Todi', intervals: ['1', 'b2', 'b3', '4', '5', 'b6', '7'] },
            'maqam_athar_kurd': { name: 'Maqam Athar Kurd', intervals: ['1', 'b2', '3', '4', 'b5', '6', 'b7'] },
            'maqam_nikriz': { name: 'Maqam Nikriz', intervals: ['1', '2', 'b3', '#4', '5', 'b6', 'b7'] },
            'chinese_1': { name: 'Chinese 1 Scale', intervals: ['1', '2', '4', '5', '6'] },
            'chinese_2': { name: 'Chinese 2 Scale', intervals: ['1', '2', 'b3', '5', '6'] },
            'indian_1': { name: 'Indian 1 Scale', intervals: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'] },
            'indian_2': { name: 'Indian 2 Scale', intervals: ['1', '2', 'b3', '#4', '5', 'b6', '7'] },
            'indian_3': { name: 'Indian 3 Scale', intervals: ['1', 'b3', '4', 'b5', '6', '7'] },
            'shang': { name: 'Shang Scale', intervals: ['1', '2', '3', '5', '6'] },
            'jiao': { name: 'Jiao Scale', intervals: ['1', 'b3', '4', '5', 'b7'] },
            'zhi': { name: 'Zhi Scale', intervals: ['1', '2', '4', '5', '6'] },
            'yu': { name: 'Yu Scale', intervals: ['1', 'b3', '4', '5', 'b7'] },
            'prometheus_omega': { name: 'Prometheus Omega', intervals: ['1', '2', '3', '#4', '6', 'b7', '7'] },
            'six_tone_minor': { name: 'Six Tone Minor', intervals: ['1', '2', 'b3', '4', '5', 'b7'] },
            'six_tone_major': { name: 'Six Tone Major', intervals: ['1', '2', '3', '4', '5', '6'] },
            '3N_1': { name: '3 Note Comination - 1', intervals: ['1', 'b2', '2'] },
            '3N_2': { name: '3 Note Comination - 2', intervals: ['1', 'b2', 'b3'] },
            '3N_3': { name: '3 Note Comination - 3', intervals: ['1', 'b2', '3'] },
            '3N_4': { name: '3 Note Comination - 4', intervals: ['1', 'b2', '4'] },
            '3N_5': { name: '3 Note Comination - 5', intervals: ['1', 'b2', 'b5'] },
            '3N_6': { name: '3 Note Comination - 6', intervals: ['1', 'b2', '5'] },
            '3N_7': { name: '3 Note Comination - 7', intervals: ['1', 'b2', 'b6'] },
            '3N_8': { name: '3 Note Comination - 8', intervals: ['1', 'b2', '6'] },
            '3N_9': { name: '3 Note Comination - 9', intervals: ['1', 'b2', 'b7'] },
            '3N_10': { name: '3 Note Comination - 10', intervals: ['1', 'b2', '7'] },
            '3N_11': { name: '3 Note Comination - 11', intervals: ['1', '2', 'b3'] },
            '3N_12': { name: '3 Note Comination - 12', intervals: ['1', '2', '3'] },
            '3N_13': { name: '3 Note Comination - 13', intervals: ['1', '2', '4'] },
            '3N_14': { name: '3 Note Comination - 14', intervals: ['1', '2', 'b5'] },
            '3N_15': { name: '3 Note Comination - 15', intervals: ['1', '2', '5'] },
            '3N_16': { name: '3 Note Comination - 16', intervals: ['1', '2', 'b6'] },
            '3N_17': { name: '3 Note Comination - 17', intervals: ['1', '2', '6'] },
            '3N_18': { name: '3 Note Comination - 18', intervals: ['1', '2', 'b7'] },
            '3N_19': { name: '3 Note Comination - 19', intervals: ['1', '2', '7'] },
            '3N_20': { name: '3 Note Comination - 20', intervals: ['1', 'b3', '3'] },
            '3N_21': { name: '3 Note Comination - 21', intervals: ['1', 'b3', '4'] },
            '3N_22': { name: '3 Note Comination - 22', intervals: ['1', 'b3', 'b5'] },
            '3N_23': { name: '3 Note Comination - 23', intervals: ['1', 'b3', '5'] },
            '3N_24': { name: '3 Note Comination - 24', intervals: ['1', 'b3', 'b6'] },
            '3N_25': { name: '3 Note Comination - 25', intervals: ['1', 'b3', '6'] },
            '3N_26': { name: '3 Note Comination - 26', intervals: ['1', 'b3', 'b7'] },
            '3N_27': { name: '3 Note Comination - 27', intervals: ['1', 'b3', '7'] },
            '3N_28': { name: '3 Note Comination - 28', intervals: ['1', '3', '4'] },
            '3N_29': { name: '3 Note Comination - 29', intervals: ['1', '3', 'b5'] },
            '3N_30': { name: '3 Note Comination - 30', intervals: ['1', '3', '5'] },
            '3N_31': { name: '3 Note Comination - 31', intervals: ['1', '3', 'b6'] },
            '3N_32': { name: '3 Note Comination - 32', intervals: ['1', '3', '6'] },
            '3N_33': { name: '3 Note Comination - 33', intervals: ['1', '3', 'b7'] },
            '3N_34': { name: '3 Note Comination - 34', intervals: ['1', '3', '7'] },
            '3N_35': { name: '3 Note Comination - 35', intervals: ['1', '4', 'b5'] },
            '3N_36': { name: '3 Note Comination - 36', intervals: ['1', '4', '5'] },
            '3N_37': { name: '3 Note Comination - 37', intervals: ['1', '4', 'b6'] },
            '3N_38': { name: '3 Note Comination - 38', intervals: ['1', '4', '6'] },
            '3N_39': { name: '3 Note Comination - 39', intervals: ['1', '4', 'b7'] },
            '3N_40': { name: '3 Note Comination - 40', intervals: ['1', '4', '7'] },
            '3N_41': { name: '3 Note Comination - 41', intervals: ['1', 'b5', '5'] },
            '3N_42': { name: '3 Note Comination - 42', intervals: ['1', 'b5', 'b6'] },
            '3N_43': { name: '3 Note Comination - 43', intervals: ['1', 'b5', '6'] },
            '3N_44': { name: '3 Note Comination - 44', intervals: ['1', 'b5', 'b7'] },
            '3N_45': { name: '3 Note Comination - 45', intervals: ['1', 'b5', '7'] },
            '3N_46': { name: '3 Note Comination - 46', intervals: ['1', '5', 'b6'] },
            '3N_47': { name: '3 Note Comination - 47', intervals: ['1', '5', '6'] },
            '3N_48': { name: '3 Note Comination - 48', intervals: ['1', '5', 'b7'] },
            '3N_49': { name: '3 Note Comination - 49', intervals: ['1', '5', '7'] },
            '3N_50': { name: '3 Note Comination - 50', intervals: ['1', 'b6', '6'] },
            '3N_51': { name: '3 Note Comination - 51', intervals: ['1', 'b6', 'b7'] },
            '3N_52': { name: '3 Note Comination - 52', intervals: ['1', 'b6', '7'] },
            '3N_53': { name: '3 Note Comination - 53', intervals: ['1', '6', 'b7'] },
            '3N_54': { name: '3 Note Comination - 54', intervals: ['1', '6', '7'] },
            '3N_55': { name: '3 Note Comination - 55', intervals: ['1', 'b7', '7'] },
            '4N_1': { name: '4 Note Combination - 1', intervals: ['1', 'b2', '2', 'b3'] },
            '4N_2': { name: '4 Note Combination - 2', intervals: ['1', 'b2', '2', '3'] },
            '4N_3': { name: '4 Note Combination - 3', intervals: ['1', 'b2', '2', '4'] },
            '4N_4': { name: '4 Note Combination - 4', intervals: ['1', 'b2', '2', 'b5'] },
            '4N_5': { name: '4 Note Combination - 5', intervals: ['1', 'b2', '2', '5'] },
            '4N_6': { name: '4 Note Combination - 6', intervals: ['1', 'b2', '2', 'b6'] },
            '4N_7': { name: '4 Note Combination - 7', intervals: ['1', 'b2', '2', '6'] },
            '4N_8': { name: '4 Note Combination - 8', intervals: ['1', 'b2', '2', 'b7'] },
            '4N_9': { name: '4 Note Combination - 9', intervals: ['1', 'b2', '2', '7'] },
            '4N_10': { name: '4 Note Combination - 10', intervals: ['1', 'b2', 'b3', '3'] },
            '4N_11': { name: '4 Note Combination - 11', intervals: ['1', 'b2', 'b3', '4'] },
            '4N_12': { name: '4 Note Combination - 12', intervals: ['1', 'b2', 'b3', 'b5'] },
            '4N_13': { name: '4 Note Combination - 13', intervals: ['1', 'b2', 'b3', '5'] },
            '4N_14': { name: '4 Note Combination - 14', intervals: ['1', 'b2', 'b3', 'b6'] },
            '4N_15': { name: '4 Note Combination - 15', intervals: ['1', 'b2', 'b3', '6'] },
            '4N_16': { name: '4 Note Combination - 16', intervals: ['1', 'b2', 'b3', 'b7'] },
            '4N_17': { name: '4 Note Combination - 17', intervals: ['1', 'b2', 'b3', '7'] },
            '4N_18': { name: '4 Note Combination - 18', intervals: ['1', 'b2', '3', '4'] },
            '4N_19': { name: '4 Note Combination - 19', intervals: ['1', 'b2', '3', 'b5'] },
            '4N_20': { name: '4 Note Combination - 20', intervals: ['1', 'b2', '3', '5'] },
            '4N_21': { name: '4 Note Combination - 21', intervals: ['1', 'b2', '3', 'b6'] },
            '4N_22': { name: '4 Note Combination - 22', intervals: ['1', 'b2', '3', '6'] },
            '4N_23': { name: '4 Note Combination - 23', intervals: ['1', 'b2', '3', 'b7'] },
            '4N_24': { name: '4 Note Combination - 24', intervals: ['1', 'b2', '3', '7'] },
            '4N_25': { name: '4 Note Combination - 25', intervals: ['1', 'b2', '4', 'b5'] },
            '4N_26': { name: '4 Note Combination - 26', intervals: ['1', 'b2', '4', '5'] },
            '4N_27': { name: '4 Note Combination - 27', intervals: ['1', 'b2', '4', 'b6'] },
            '4N_28': { name: '4 Note Combination - 28', intervals: ['1', 'b2', '4', '6'] },
            '4N_29': { name: '4 Note Combination - 29', intervals: ['1', 'b2', '4', 'b7'] },
            '4N_30': { name: '4 Note Combination - 30', intervals: ['1', 'b2', '4', '7'] },
            '4N_31': { name: '4 Note Combination - 31', intervals: ['1', 'b2', 'b5', '5'] },
            '4N_32': { name: '4 Note Combination - 32', intervals: ['1', 'b2', 'b5', 'b6'] },
            '4N_33': { name: '4 Note Combination - 33', intervals: ['1', 'b2', 'b5', '6'] },
            '4N_34': { name: '4 Note Combination - 34', intervals: ['1', 'b2', 'b5', 'b7'] },
            '4N_35': { name: '4 Note Combination - 35', intervals: ['1', 'b2', 'b5', '7'] },
            '4N_36': { name: '4 Note Combination - 36', intervals: ['1', 'b2', '5', 'b6'] },
            '4N_37': { name: '4 Note Combination - 37', intervals: ['1', 'b2', '5', '6'] },
            '4N_38': { name: '4 Note Combination - 38', intervals: ['1', 'b2', '5', 'b7'] },
            '4N_39': { name: '4 Note Combination - 39', intervals: ['1', 'b2', '5', '7'] },
            '4N_40': { name: '4 Note Combination - 40', intervals: ['1', 'b2', 'b6', '6'] },
            '4N_41': { name: '4 Note Combination - 41', intervals: ['1', 'b2', 'b6', 'b7'] },
            '4N_42': { name: '4 Note Combination - 42', intervals: ['1', 'b2', 'b6', '7'] },
            '4N_43': { name: '4 Note Combination - 43', intervals: ['1', 'b2', '6', 'b7'] },
            '4N_44': { name: '4 Note Combination - 44', intervals: ['1', 'b2', '6', '7'] },
            '4N_45': { name: '4 Note Combination - 45', intervals: ['1', 'b2', 'b7', '7'] },
            '4N_46': { name: '4 Note Combination - 46', intervals: ['1', '2', 'b3', '3'] },
            '4N_47': { name: '4 Note Combination - 47', intervals: ['1', '2', 'b3', '4'] },
            '4N_48': { name: '4 Note Combination - 48', intervals: ['1', '2', 'b3', 'b5'] },
            '4N_49': { name: '4 Note Combination - 49', intervals: ['1', '2', 'b3', '5'] },
            '4N_50': { name: '4 Note Combination - 50', intervals: ['1', '2', 'b3', 'b6'] },
            '4N_51': { name: '4 Note Combination - 51', intervals: ['1', '2', 'b3', '6'] },
            '4N_52': { name: '4 Note Combination - 52', intervals: ['1', '2', 'b3', 'b7'] },
            '4N_53': { name: '4 Note Combination - 53', intervals: ['1', '2', 'b3', '7'] },
            '4N_54': { name: '4 Note Combination - 54', intervals: ['1', '2', '3', '4'] },
            '4N_55': { name: '4 Note Combination - 55', intervals: ['1', '2', '3', 'b5'] },
            '4N_56': { name: '4 Note Combination - 56', intervals: ['1', '2', '3', '5'] },
            '4N_57': { name: '4 Note Combination - 57', intervals: ['1', '2', '3', 'b6'] },
            '4N_58': { name: '4 Note Combination - 58', intervals: ['1', '2', '3', '6'] },
            '4N_59': { name: '4 Note Combination - 59', intervals: ['1', '2', '3', 'b7'] },
            '4N_60': { name: '4 Note Combination - 60', intervals: ['1', '2', '3', '7'] },
            '4N_61': { name: '4 Note Combination - 61', intervals: ['1', '2', '4', 'b5'] },
            '4N_62': { name: '4 Note Combination - 62', intervals: ['1', '2', '4', '5'] },
            '4N_63': { name: '4 Note Combination - 63', intervals: ['1', '2', '4', 'b6'] },
            '4N_64': { name: '4 Note Combination - 64', intervals: ['1', '2', '4', '6'] },
            '4N_65': { name: '4 Note Combination - 65', intervals: ['1', '2', '4', 'b7'] },
            '4N_66': { name: '4 Note Combination - 66', intervals: ['1', '2', '4', '7'] },
            '4N_67': { name: '4 Note Combination - 67', intervals: ['1', '2', 'b5', '5'] },
            '4N_68': { name: '4 Note Combination - 68', intervals: ['1', '2', 'b5', 'b6'] },
            '4N_69': { name: '4 Note Combination - 69', intervals: ['1', '2', 'b5', '6'] },
            '4N_70': { name: '4 Note Combination - 70', intervals: ['1', '2', 'b5', 'b7'] },
            '4N_71': { name: '4 Note Combination - 71', intervals: ['1', '2', 'b5', '7'] },
            '4N_72': { name: '4 Note Combination - 72', intervals: ['1', '2', '5', 'b6'] },
            '4N_73': { name: '4 Note Combination - 73', intervals: ['1', '2', '5', '6'] },
            '4N_74': { name: '4 Note Combination - 74', intervals: ['1', '2', '5', 'b7'] },
            '4N_75': { name: '4 Note Combination - 75', intervals: ['1', '2', '5', '7'] },
            '4N_76': { name: '4 Note Combination - 76', intervals: ['1', '2', 'b6', '6'] },
            '4N_77': { name: '4 Note Combination - 77', intervals: ['1', '2', 'b6', 'b7'] },
            '4N_78': { name: '4 Note Combination - 78', intervals: ['1', '2', 'b6', '7'] },
            '4N_79': { name: '4 Note Combination - 79', intervals: ['1', '2', '6', 'b7'] },
            '4N_80': { name: '4 Note Combination - 80', intervals: ['1', '2', '6', '7'] },
            '4N_81': { name: '4 Note Combination - 81', intervals: ['1', '2', 'b7', '7'] },
            '4N_82': { name: '4 Note Combination - 82', intervals: ['1', 'b3', '3', '4'] },
            '4N_83': { name: '4 Note Combination - 83', intervals: ['1', 'b3', '3', 'b5'] },
            '4N_84': { name: '4 Note Combination - 84', intervals: ['1', 'b3', '3', '5'] },
            '4N_85': { name: '4 Note Combination - 85', intervals: ['1', 'b3', '3', 'b6'] },
            '4N_86': { name: '4 Note Combination - 86', intervals: ['1', 'b3', '3', '6'] },
            '4N_87': { name: '4 Note Combination - 87', intervals: ['1', 'b3', '3', 'b7'] },
            '4N_88': { name: '4 Note Combination - 88', intervals: ['1', 'b3', '3', '7'] },
            '4N_89': { name: '4 Note Combination - 89', intervals: ['1', 'b3', '4', 'b5'] },
            '4N_90': { name: '4 Note Combination - 90', intervals: ['1', 'b3', '4', '5'] },
            '4N_91': { name: '4 Note Combination - 91', intervals: ['1', 'b3', '4', 'b6'] },
            '4N_92': { name: '4 Note Combination - 92', intervals: ['1', 'b3', '4', '6'] },
            '4N_93': { name: '4 Note Combination - 93', intervals: ['1', 'b3', '4', 'b7'] },
            '4N_94': { name: '4 Note Combination - 94', intervals: ['1', 'b3', '4', '7'] },
            '4N_95': { name: '4 Note Combination - 95', intervals: ['1', 'b3', 'b5', '5'] },
            '4N_96': { name: '4 Note Combination - 96', intervals: ['1', 'b3', 'b5', 'b6'] },
            '4N_97': { name: '4 Note Combination - 97', intervals: ['1', 'b3', 'b5', '6'] },
            '4N_98': { name: '4 Note Combination - 98', intervals: ['1', 'b3', 'b5', 'b7'] },
            '4N_99': { name: '4 Note Combination - 99', intervals: ['1', 'b3', 'b5', '7'] },
            '4N_100': { name: '4 Note Combination - 100', intervals: ['1', 'b3', '5', 'b6'] },
            '4N_101': { name: '4 Note Combination - 101', intervals: ['1', 'b3', '5', '6'] },
            '4N_102': { name: '4 Note Combination - 102', intervals: ['1', 'b3', '5', 'b7'] },
            '4N_103': { name: '4 Note Combination - 103', intervals: ['1', 'b3', '5', '7'] },
            '4N_104': { name: '4 Note Combination - 104', intervals: ['1', 'b3', 'b6', '6'] },
            '4N_105': { name: '4 Note Combination - 105', intervals: ['1', 'b3', 'b6', 'b7'] },
            '4N_106': { name: '4 Note Combination - 106', intervals: ['1', 'b3', 'b6', '7'] },
            '4N_107': { name: '4 Note Combination - 107', intervals: ['1', 'b3', '6', 'b7'] },
            '4N_108': { name: '4 Note Combination - 108', intervals: ['1', 'b3', '6', '7'] },
            '4N_109': { name: '4 Note Combination - 109', intervals: ['1', 'b3', 'b7', '7'] },
            '4N_110': { name: '4 Note Combination - 110', intervals: ['1', '3', '4', 'b5'] },
            '4N_111': { name: '4 Note Combination - 111', intervals: ['1', '3', '4', '5'] },
            '4N_112': { name: '4 Note Combination - 112', intervals: ['1', '3', '4', 'b6'] },
            '4N_113': { name: '4 Note Combination - 113', intervals: ['1', '3', '4', '6'] },
            '4N_114': { name: '4 Note Combination - 114', intervals: ['1', '3', '4', 'b7'] },
            '4N_115': { name: '4 Note Combination - 115', intervals: ['1', '3', '4', '7'] },
            '4N_116': { name: '4 Note Combination - 116', intervals: ['1', '3', 'b5', '5'] },
            '4N_117': { name: '4 Note Combination - 117', intervals: ['1', '3', 'b5', 'b6'] },
            '4N_118': { name: '4 Note Combination - 118', intervals: ['1', '3', 'b5', '6'] },
            '4N_119': { name: '4 Note Combination - 119', intervals: ['1', '3', 'b5', 'b7'] },
            '4N_120': { name: '4 Note Combination - 120', intervals: ['1', '3', 'b5', '7'] },
            '4N_121': { name: '4 Note Combination - 121', intervals: ['1', '3', '5', 'b6'] },
            '4N_122': { name: '4 Note Combination - 122', intervals: ['1', '3', '5', '6'] },
            '4N_123': { name: '4 Note Combination - 123', intervals: ['1', '3', '5', 'b7'] },
            '4N_124': { name: '4 Note Combination - 124', intervals: ['1', '3', '5', '7'] },
            '4N_125': { name: '4 Note Combination - 125', intervals: ['1', '3', 'b6', '6'] },
            '4N_126': { name: '4 Note Combination - 126', intervals: ['1', '3', 'b6', 'b7'] },
            '4N_127': { name: '4 Note Combination - 127', intervals: ['1', '3', 'b6', '7'] },
            '4N_128': { name: '4 Note Combination - 128', intervals: ['1', '3', '6', 'b7'] },
            '4N_129': { name: '4 Note Combination - 129', intervals: ['1', '3', '6', '7'] },
            '4N_130': { name: '4 Note Combination - 130', intervals: ['1', '3', 'b7', '7'] },
            '4N_131': { name: '4 Note Combination - 131', intervals: ['1', '4', 'b5', '5'] },
            '4N_132': { name: '4 Note Combination - 132', intervals: ['1', '4', 'b5', 'b6'] },
            '4N_133': { name: '4 Note Combination - 133', intervals: ['1', '4', 'b5', '6'] },
            '4N_134': { name: '4 Note Combination - 134', intervals: ['1', '4', 'b5', 'b7'] },
            '4N_135': { name: '4 Note Combination - 135', intervals: ['1', '4', 'b5', '7'] },
            '4N_136': { name: '4 Note Combination - 136', intervals: ['1', '4', '5', 'b6'] },
            '4N_137': { name: '4 Note Combination - 137', intervals: ['1', '4', '5', '6'] },
            '4N_138': { name: '4 Note Combination - 138', intervals: ['1', '4', '5', 'b7'] },
            '4N_139': { name: '4 Note Combination - 139', intervals: ['1', '4', '5', '7'] },
            '4N_140': { name: '4 Note Combination - 140', intervals: ['1', '4', 'b6', '6'] },
            '4N_141': { name: '4 Note Combination - 141', intervals: ['1', '4', 'b6', 'b7'] },
            '4N_142': { name: '4 Note Combination - 142', intervals: ['1', '4', 'b6', '7'] },
            '4N_143': { name: '4 Note Combination - 143', intervals: ['1', '4', '6', 'b7'] },
            '4N_144': { name: '4 Note Combination - 144', intervals: ['1', '4', '6', '7'] },
            '4N_145': { name: '4 Note Combination - 145', intervals: ['1', '4', 'b7', '7'] },
            '4N_146': { name: '4 Note Combination - 146', intervals: ['1', 'b5', '5', 'b6'] },
            '4N_147': { name: '4 Note Combination - 147', intervals: ['1', 'b5', '5', '6'] },
            '4N_148': { name: '4 Note Combination - 148', intervals: ['1', 'b5', '5', 'b7'] },
            '4N_149': { name: '4 Note Combination - 149', intervals: ['1', 'b5', '5', '7'] },
            '4N_150': { name: '4 Note Combination - 150', intervals: ['1', 'b5', 'b6', '6'] },
            '4N_151': { name: '4 Note Combination - 151', intervals: ['1', 'b5', 'b6', 'b7'] },
            '4N_152': { name: '4 Note Combination - 152', intervals: ['1', 'b5', 'b6', '7'] },
            '4N_153': { name: '4 Note Combination - 153', intervals: ['1', 'b5', '6', 'b7'] },
            '4N_154': { name: '4 Note Combination - 154', intervals: ['1', 'b5', '6', '7'] },
            '4N_155': { name: '4 Note Combination - 155', intervals: ['1', 'b5', 'b7', '7'] },
            '4N_156': { name: '4 Note Combination - 156', intervals: ['1', '5', 'b6', '6'] },
            '4N_157': { name: '4 Note Combination - 157', intervals: ['1', '5', 'b6', 'b7'] },
            '4N_158': { name: '4 Note Combination - 158', intervals: ['1', '5', 'b6', '7'] },
            '4N_159': { name: '4 Note Combination - 159', intervals: ['1', '5', '6', 'b7'] },
            '4N_160': { name: '4 Note Combination - 160', intervals: ['1', '5', '6', '7'] },
            '4N_161': { name: '4 Note Combination - 161', intervals: ['1', '5', 'b7', '7'] },
            '4N_162': { name: '4 Note Combination - 162', intervals: ['1', 'b6', '6', 'b7'] },
            '4N_163': { name: '4 Note Combination - 163', intervals: ['1', 'b6', '6', '7'] },
            '4N_164': { name: '4 Note Combination - 164', intervals: ['1', 'b6', 'b7', '7'] },
            '4N_165': { name: '4 Note Combination - 165', intervals: ['1', '6', 'b7', '7'] },
            '5N_1': { name: '5 Note Combination - 1', intervals: ['1', 'b2', '2', 'b3', '3'] },
            '5N_2': { name: '5 Note Combination - 2', intervals: ['1', 'b2', '2', 'b3', '4'] },
            '5N_3': { name: '5 Note Combination - 3', intervals: ['1', 'b2', '2', 'b3', 'b5'] },
            '5N_4': { name: '5 Note Combination - 4', intervals: ['1', 'b2', '2', 'b3', '5'] },
            '5N_5': { name: '5 Note Combination - 5', intervals: ['1', 'b2', '2', 'b3', 'b6'] },
            '5N_6': { name: '5 Note Combination - 6', intervals: ['1', 'b2', '2', 'b3', '6'] },
            '5N_7': { name: '5 Note Combination - 7', intervals: ['1', 'b2', '2', 'b3', 'b7'] },
            '5N_8': { name: '5 Note Combination - 8', intervals: ['1', 'b2', '2', 'b3', '7'] },
            '5N_9': { name: '5 Note Combination - 9', intervals: ['1', 'b2', '2', '3', '4'] },
            '5N_10': { name: '5 Note Combination - 10', intervals: ['1', 'b2', '2', '3', 'b5'] },
            '5N_11': { name: '5 Note Combination - 11', intervals: ['1', 'b2', '2', '3', '5'] },
            '5N_12': { name: '5 Note Combination - 12', intervals: ['1', 'b2', '2', '3', 'b6'] },
            '5N_13': { name: '5 Note Combination - 13', intervals: ['1', 'b2', '2', '3', '6'] },
            '5N_14': { name: '5 Note Combination - 14', intervals: ['1', 'b2', '2', '3', 'b7'] },
            '5N_15': { name: '5 Note Combination - 15', intervals: ['1', 'b2', '2', '3', '7'] },
            '5N_16': { name: '5 Note Combination - 16', intervals: ['1', 'b2', '2', '4', 'b5'] },
            '5N_17': { name: '5 Note Combination - 17', intervals: ['1', 'b2', '2', '4', '5'] },
            '5N_18': { name: '5 Note Combination - 18', intervals: ['1', 'b2', '2', '4', 'b6'] },
            '5N_19': { name: '5 Note Combination - 19', intervals: ['1', 'b2', '2', '4', '6'] },
            '5N_20': { name: '5 Note Combination - 20', intervals: ['1', 'b2', '2', '4', 'b7'] },
            '5N_21': { name: '5 Note Combination - 21', intervals: ['1', 'b2', '2', '4', '7'] },
            '5N_22': { name: '5 Note Combination - 22', intervals: ['1', 'b2', '2', 'b5', '5'] },
            '5N_23': { name: '5 Note Combination - 23', intervals: ['1', 'b2', '2', 'b5', 'b6'] },
            '5N_24': { name: '5 Note Combination - 24', intervals: ['1', 'b2', '2', 'b5', '6'] },
            '5N_25': { name: '5 Note Combination - 25', intervals: ['1', 'b2', '2', 'b5', 'b7'] },
            '5N_26': { name: '5 Note Combination - 26', intervals: ['1', 'b2', '2', 'b5', '7'] },
            '5N_27': { name: '5 Note Combination - 27', intervals: ['1', 'b2', '2', '5', 'b6'] },
            '5N_28': { name: '5 Note Combination - 28', intervals: ['1', 'b2', '2', '5', '6'] },
            '5N_29': { name: '5 Note Combination - 29', intervals: ['1', 'b2', '2', '5', 'b7'] },
            '5N_30': { name: '5 Note Combination - 30', intervals: ['1', 'b2', '2', '5', '7'] },
            '5N_31': { name: '5 Note Combination - 31', intervals: ['1', 'b2', '2', 'b6', '6'] },
            '5N_32': { name: '5 Note Combination - 32', intervals: ['1', 'b2', '2', 'b6', 'b7'] },
            '5N_33': { name: '5 Note Combination - 33', intervals: ['1', 'b2', '2', 'b6', '7'] },
            '5N_34': { name: '5 Note Combination - 34', intervals: ['1', 'b2', '2', '6', 'b7'] },
            '5N_35': { name: '5 Note Combination - 35', intervals: ['1', 'b2', '2', '6', '7'] },
            '5N_36': { name: '5 Note Combination - 36', intervals: ['1', 'b2', '2', 'b7', '7'] },
            '5N_37': { name: '5 Note Combination - 37', intervals: ['1', 'b2', 'b3', '3', '4'] },
            '5N_38': { name: '5 Note Combination - 38', intervals: ['1', 'b2', 'b3', '3', 'b5'] },
            '5N_39': { name: '5 Note Combination - 39', intervals: ['1', 'b2', 'b3', '3', '5'] },
            '5N_40': { name: '5 Note Combination - 40', intervals: ['1', 'b2', 'b3', '3', 'b6'] },
            '5N_41': { name: '5 Note Combination - 41', intervals: ['1', 'b2', 'b3', '3', '6'] },
            '5N_42': { name: '5 Note Combination - 42', intervals: ['1', 'b2', 'b3', '3', 'b7'] },
            '5N_43': { name: '5 Note Combination - 43', intervals: ['1', 'b2', 'b3', '3', '7'] },
            '5N_44': { name: '5 Note Combination - 44', intervals: ['1', 'b2', 'b3', '4', 'b5'] },
            '5N_45': { name: '5 Note Combination - 45', intervals: ['1', 'b2', 'b3', '4', '5'] },
            '5N_46': { name: '5 Note Combination - 46', intervals: ['1', 'b2', 'b3', '4', 'b6'] },
            '5N_47': { name: '5 Note Combination - 47', intervals: ['1', 'b2', 'b3', '4', '6'] },
            '5N_48': { name: '5 Note Combination - 48', intervals: ['1', 'b2', 'b3', '4', 'b7'] },
            '5N_49': { name: '5 Note Combination - 49', intervals: ['1', 'b2', 'b3', '4', '7'] },
            '5N_50': { name: '5 Note Combination - 50', intervals: ['1', 'b2', 'b3', 'b5', '5'] },
            '5N_51': { name: '5 Note Combination - 51', intervals: ['1', 'b2', 'b3', 'b5', 'b6'] },
            '5N_52': { name: '5 Note Combination - 52', intervals: ['1', 'b2', 'b3', 'b5', '6'] },
            '5N_53': { name: '5 Note Combination - 53', intervals: ['1', 'b2', 'b3', 'b5', 'b7'] },
            '5N_54': { name: '5 Note Combination - 54', intervals: ['1', 'b2', 'b3', 'b5', '7'] },
            '5N_55': { name: '5 Note Combination - 55', intervals: ['1', 'b2', 'b3', '5', 'b6'] },
            '5N_56': { name: '5 Note Combination - 56', intervals: ['1', 'b2', 'b3', '5', '6'] },
            '5N_57': { name: '5 Note Combination - 57', intervals: ['1', 'b2', 'b3', '5', 'b7'] },
            '5N_58': { name: '5 Note Combination - 58', intervals: ['1', 'b2', 'b3', '5', '7'] },
            '5N_59': { name: '5 Note Combination - 59', intervals: ['1', 'b2', 'b3', 'b6', '6'] },
            '5N_60': { name: '5 Note Combination - 60', intervals: ['1', 'b2', 'b3', 'b6', 'b7'] },
            '5N_61': { name: '5 Note Combination - 61', intervals: ['1', 'b2', 'b3', 'b6', '7'] },
            '5N_62': { name: '5 Note Combination - 62', intervals: ['1', 'b2', 'b3', '6', 'b7'] },
            '5N_63': { name: '5 Note Combination - 63', intervals: ['1', 'b2', 'b3', '6', '7'] },
            '5N_64': { name: '5 Note Combination - 64', intervals: ['1', 'b2', 'b3', 'b7', '7'] },
            '5N_65': { name: '5 Note Combination - 65', intervals: ['1', 'b2', '3', '4', 'b5'] },
            '5N_66': { name: '5 Note Combination - 66', intervals: ['1', 'b2', '3', '4', '5'] },
            '5N_67': { name: '5 Note Combination - 67', intervals: ['1', 'b2', '3', '4', 'b6'] },
            '5N_68': { name: '5 Note Combination - 68', intervals: ['1', 'b2', '3', '4', '6'] },
            '5N_69': { name: '5 Note Combination - 69', intervals: ['1', 'b2', '3', '4', 'b7'] },
            '5N_70': { name: '5 Note Combination - 70', intervals: ['1', 'b2', '3', '4', '7'] },
            '5N_71': { name: '5 Note Combination - 71', intervals: ['1', 'b2', '3', 'b5', '5'] },
            '5N_72': { name: '5 Note Combination - 72', intervals: ['1', 'b2', '3', 'b5', 'b6'] },
            '5N_73': { name: '5 Note Combination - 73', intervals: ['1', 'b2', '3', 'b5', '6'] },
            '5N_74': { name: '5 Note Combination - 74', intervals: ['1', 'b2', '3', 'b5', 'b7'] },
            '5N_75': { name: '5 Note Combination - 75', intervals: ['1', 'b2', '3', 'b5', '7'] },
            '5N_76': { name: '5 Note Combination - 76', intervals: ['1', 'b2', '3', '5', 'b6'] },
            '5N_77': { name: '5 Note Combination - 77', intervals: ['1', 'b2', '3', '5', '6'] },
            '5N_78': { name: '5 Note Combination - 78', intervals: ['1', 'b2', '3', '5', 'b7'] },
            '5N_79': { name: '5 Note Combination - 79', intervals: ['1', 'b2', '3', '5', '7'] },
            '5N_80': { name: '5 Note Combination - 80', intervals: ['1', 'b2', '3', 'b6', '6'] },
            '5N_81': { name: '5 Note Combination - 81', intervals: ['1', 'b2', '3', 'b6', 'b7'] },
            '5N_82': { name: '5 Note Combination - 82', intervals: ['1', 'b2', '3', 'b6', '7'] },
            '5N_83': { name: '5 Note Combination - 83', intervals: ['1', 'b2', '3', '6', 'b7'] },
            '5N_84': { name: '5 Note Combination - 84', intervals: ['1', 'b2', '3', '6', '7'] },
            '5N_85': { name: '5 Note Combination - 85', intervals: ['1', 'b2', '3', 'b7', '7'] },
            '5N_86': { name: '5 Note Combination - 86', intervals: ['1', 'b2', '4', 'b5', '5'] },
            '5N_87': { name: '5 Note Combination - 87', intervals: ['1', 'b2', '4', 'b5', 'b6'] },
            '5N_88': { name: '5 Note Combination - 88', intervals: ['1', 'b2', '4', 'b5', '6'] },
            '5N_89': { name: '5 Note Combination - 89', intervals: ['1', 'b2', '4', 'b5', 'b7'] },
            '5N_90': { name: '5 Note Combination - 90', intervals: ['1', 'b2', '4', 'b5', '7'] },
            '5N_91': { name: '5 Note Combination - 91', intervals: ['1', 'b2', '4', '5', 'b6'] },
            '5N_92': { name: '5 Note Combination - 92', intervals: ['1', 'b2', '4', '5', '6'] },
            '5N_93': { name: '5 Note Combination - 93', intervals: ['1', 'b2', '4', '5', 'b7'] },
            '5N_94': { name: '5 Note Combination - 94', intervals: ['1', 'b2', '4', '5', '7'] },
            '5N_95': { name: '5 Note Combination - 95', intervals: ['1', 'b2', '4', 'b6', '6'] },
            '5N_96': { name: '5 Note Combination - 96', intervals: ['1', 'b2', '4', 'b6', 'b7'] },
            '5N_97': { name: '5 Note Combination - 97', intervals: ['1', 'b2', '4', 'b6', '7'] },
            '5N_98': { name: '5 Note Combination - 98', intervals: ['1', 'b2', '4', '6', 'b7'] },
            '5N_99': { name: '5 Note Combination - 99', intervals: ['1', 'b2', '4', '6', '7'] },
            '5N_100': { name: '5 Note Combination - 100', intervals: ['1', 'b2', '4', 'b7', '7'] },
            '5N_101': { name: '5 Note Combination - 101', intervals: ['1', 'b2', 'b5', '5', 'b6'] },
            '5N_102': { name: '5 Note Combination - 102', intervals: ['1', 'b2', 'b5', '5', '6'] },
            '5N_103': { name: '5 Note Combination - 103', intervals: ['1', 'b2', 'b5', '5', 'b7'] },
            '5N_104': { name: '5 Note Combination - 104', intervals: ['1', 'b2', 'b5', '5', '7'] },
            '5N_105': { name: '5 Note Combination - 105', intervals: ['1', 'b2', 'b5', 'b6', '6'] },
            '5N_106': { name: '5 Note Combination - 106', intervals: ['1', 'b2', 'b5', 'b6', 'b7'] },
            '5N_107': { name: '5 Note Combination - 107', intervals: ['1', 'b2', 'b5', 'b6', '7'] },
            '5N_108': { name: '5 Note Combination - 108', intervals: ['1', 'b2', 'b5', '6', 'b7'] },
            '5N_109': { name: '5 Note Combination - 109', intervals: ['1', 'b2', 'b5', '6', '7'] },
            '5N_110': { name: '5 Note Combination - 110', intervals: ['1', 'b2', 'b5', 'b7', '7'] },
            '5N_111': { name: '5 Note Combination - 111', intervals: ['1', 'b2', '5', 'b6', '6'] },
            '5N_112': { name: '5 Note Combination - 112', intervals: ['1', 'b2', '5', 'b6', 'b7'] },
            '5N_113': { name: '5 Note Combination - 113', intervals: ['1', 'b2', '5', 'b6', '7'] },
            '5N_114': { name: '5 Note Combination - 114', intervals: ['1', 'b2', '5', '6', 'b7'] },
            '5N_115': { name: '5 Note Combination - 115', intervals: ['1', 'b2', '5', '6', '7'] },
            '5N_116': { name: '5 Note Combination - 116', intervals: ['1', 'b2', '5', 'b7', '7'] },
            '5N_117': { name: '5 Note Combination - 117', intervals: ['1', 'b2', 'b6', '6', 'b7'] },
            '5N_118': { name: '5 Note Combination - 118', intervals: ['1', 'b2', 'b6', '6', '7'] },
            '5N_119': { name: '5 Note Combination - 119', intervals: ['1', 'b2', 'b6', 'b7', '7'] },
            '5N_120': { name: '5 Note Combination - 120', intervals: ['1', 'b2', '6', 'b7', '7'] },
            '5N_121': { name: '5 Note Combination - 121', intervals: ['1', '2', 'b3', '3', '4'] },
            '5N_122': { name: '5 Note Combination - 122', intervals: ['1', '2', 'b3', '3', 'b5'] },
            '5N_123': { name: '5 Note Combination - 123', intervals: ['1', '2', 'b3', '3', '5'] },
            '5N_124': { name: '5 Note Combination - 124', intervals: ['1', '2', 'b3', '3', 'b6'] },
            '5N_125': { name: '5 Note Combination - 125', intervals: ['1', '2', 'b3', '3', '6'] },
            '5N_126': { name: '5 Note Combination - 126', intervals: ['1', '2', 'b3', '3', 'b7'] },
            '5N_127': { name: '5 Note Combination - 127', intervals: ['1', '2', 'b3', '3', '7'] },
            '5N_128': { name: '5 Note Combination - 128', intervals: ['1', '2', 'b3', '4', 'b5'] },
            '5N_129': { name: '5 Note Combination - 129', intervals: ['1', '2', 'b3', '4', '5'] },
            '5N_130': { name: '5 Note Combination - 130', intervals: ['1', '2', 'b3', '4', 'b6'] },
            '5N_131': { name: '5 Note Combination - 131', intervals: ['1', '2', 'b3', '4', '6'] },
            '5N_132': { name: '5 Note Combination - 132', intervals: ['1', '2', 'b3', '4', 'b7'] },
            '5N_133': { name: '5 Note Combination - 133', intervals: ['1', '2', 'b3', '4', '7'] },
            '5N_134': { name: '5 Note Combination - 134', intervals: ['1', '2', 'b3', 'b5', '5'] },
            '5N_135': { name: '5 Note Combination - 135', intervals: ['1', '2', 'b3', 'b5', 'b6'] },
            '5N_136': { name: '5 Note Combination - 136', intervals: ['1', '2', 'b3', 'b5', '6'] },
            '5N_137': { name: '5 Note Combination - 137', intervals: ['1', '2', 'b3', 'b5', 'b7'] },
            '5N_138': { name: '5 Note Combination - 138', intervals: ['1', '2', 'b3', 'b5', '7'] },
            '5N_139': { name: '5 Note Combination - 139', intervals: ['1', '2', 'b3', '5', 'b6'] },
            '5N_140': { name: '5 Note Combination - 140', intervals: ['1', '2', 'b3', '5', '6'] },
            '5N_141': { name: '5 Note Combination - 141', intervals: ['1', '2', 'b3', '5', 'b7'] },
            '5N_142': { name: '5 Note Combination - 142', intervals: ['1', '2', 'b3', '5', '7'] },
            '5N_143': { name: '5 Note Combination - 143', intervals: ['1', '2', 'b3', 'b6', '6'] },
            '5N_144': { name: '5 Note Combination - 144', intervals: ['1', '2', 'b3', 'b6', 'b7'] },
            '5N_145': { name: '5 Note Combination - 145', intervals: ['1', '2', 'b3', 'b6', '7'] },
            '5N_146': { name: '5 Note Combination - 146', intervals: ['1', '2', 'b3', '6', 'b7'] },
            '5N_147': { name: '5 Note Combination - 147', intervals: ['1', '2', 'b3', '6', '7'] },
            '5N_148': { name: '5 Note Combination - 148', intervals: ['1', '2', 'b3', 'b7', '7'] },
            '5N_149': { name: '5 Note Combination - 149', intervals: ['1', '2', '3', '4', 'b5'] },
            '5N_150': { name: '5 Note Combination - 150', intervals: ['1', '2', '3', '4', '5'] },
            '5N_151': { name: '5 Note Combination - 151', intervals: ['1', '2', '3', '4', 'b6'] },
            '5N_152': { name: '5 Note Combination - 152', intervals: ['1', '2', '3', '4', '6'] },
            '5N_153': { name: '5 Note Combination - 153', intervals: ['1', '2', '3', '4', 'b7'] },
            '5N_154': { name: '5 Note Combination - 154', intervals: ['1', '2', '3', '4', '7'] },
            '5N_155': { name: '5 Note Combination - 155', intervals: ['1', '2', '3', 'b5', '5'] },
            '5N_156': { name: '5 Note Combination - 156', intervals: ['1', '2', '3', 'b5', 'b6'] },
            '5N_157': { name: '5 Note Combination - 157', intervals: ['1', '2', '3', 'b5', '6'] },
            '5N_158': { name: '5 Note Combination - 158', intervals: ['1', '2', '3', 'b5', 'b7'] },
            '5N_159': { name: '5 Note Combination - 159', intervals: ['1', '2', '3', 'b5', '7'] },
            '5N_160': { name: '5 Note Combination - 160', intervals: ['1', '2', '3', '5', 'b6'] },
            '5N_161': { name: '5 Note Combination - 161', intervals: ['1', '2', '3', '5', '6'] },
            '5N_162': { name: '5 Note Combination - 162', intervals: ['1', '2', '3', '5', 'b7'] },
            '5N_163': { name: '5 Note Combination - 163', intervals: ['1', '2', '3', '5', '7'] },
            '5N_164': { name: '5 Note Combination - 164', intervals: ['1', '2', '3', 'b6', '6'] },
            '5N_165': { name: '5 Note Combination - 165', intervals: ['1', '2', '3', 'b6', 'b7'] },
            '5N_166': { name: '5 Note Combination - 166', intervals: ['1', '2', '3', 'b6', '7'] },
            '5N_167': { name: '5 Note Combination - 167', intervals: ['1', '2', '3', '6', 'b7'] },
            '5N_168': { name: '5 Note Combination - 168', intervals: ['1', '2', '3', '6', '7'] },
            '5N_169': { name: '5 Note Combination - 169', intervals: ['1', '2', '3', 'b7', '7'] },
            '5N_170': { name: '5 Note Combination - 170', intervals: ['1', '2', '4', 'b5', '5'] },
            '5N_171': { name: '5 Note Combination - 171', intervals: ['1', '2', '4', 'b5', 'b6'] },
            '5N_172': { name: '5 Note Combination - 172', intervals: ['1', '2', '4', 'b5', '6'] },
            '5N_173': { name: '5 Note Combination - 173', intervals: ['1', '2', '4', 'b5', 'b7'] },
            '5N_174': { name: '5 Note Combination - 174', intervals: ['1', '2', '4', 'b5', '7'] },
            '5N_175': { name: '5 Note Combination - 175', intervals: ['1', '2', '4', '5', 'b6'] },
            '5N_176': { name: '5 Note Combination - 176', intervals: ['1', '2', '4', '5', '6'] },
            '5N_177': { name: '5 Note Combination - 177', intervals: ['1', '2', '4', '5', 'b7'] },
            '5N_178': { name: '5 Note Combination - 178', intervals: ['1', '2', '4', '5', '7'] },
            '5N_179': { name: '5 Note Combination - 179', intervals: ['1', '2', '4', 'b6', '6'] },
            '5N_180': { name: '5 Note Combination - 180', intervals: ['1', '2', '4', 'b6', 'b7'] },
            '5N_181': { name: '5 Note Combination - 181', intervals: ['1', '2', '4', 'b6', '7'] },
            '5N_182': { name: '5 Note Combination - 182', intervals: ['1', '2', '4', '6', 'b7'] },
            '5N_183': { name: '5 Note Combination - 183', intervals: ['1', '2', '4', '6', '7'] },
            '5N_184': { name: '5 Note Combination - 184', intervals: ['1', '2', '4', 'b7', '7'] },
            '5N_185': { name: '5 Note Combination - 185', intervals: ['1', '2', 'b5', '5', 'b6'] },
            '5N_186': { name: '5 Note Combination - 186', intervals: ['1', '2', 'b5', '5', '6'] },
            '5N_187': { name: '5 Note Combination - 187', intervals: ['1', '2', 'b5', '5', 'b7'] },
            '5N_188': { name: '5 Note Combination - 188', intervals: ['1', '2', 'b5', '5', '7'] },
            '5N_189': { name: '5 Note Combination - 189', intervals: ['1', '2', 'b5', 'b6', '6'] },
            '5N_190': { name: '5 Note Combination - 190', intervals: ['1', '2', 'b5', 'b6', 'b7'] },
            '5N_191': { name: '5 Note Combination - 191', intervals: ['1', '2', 'b5', 'b6', '7'] },
            '5N_192': { name: '5 Note Combination - 192', intervals: ['1', '2', 'b5', '6', 'b7'] },
            '5N_193': { name: '5 Note Combination - 193', intervals: ['1', '2', 'b5', '6', '7'] },
            '5N_194': { name: '5 Note Combination - 194', intervals: ['1', '2', 'b5', 'b7', '7'] },
            '5N_195': { name: '5 Note Combination - 195', intervals: ['1', '2', '5', 'b6', '6'] },
            '5N_196': { name: '5 Note Combination - 196', intervals: ['1', '2', '5', 'b6', 'b7'] },
            '5N_197': { name: '5 Note Combination - 197', intervals: ['1', '2', '5', 'b6', '7'] },
            '5N_198': { name: '5 Note Combination - 198', intervals: ['1', '2', '5', '6', 'b7'] },
            '5N_199': { name: '5 Note Combination - 199', intervals: ['1', '2', '5', '6', '7'] },
            '5N_200': { name: '5 Note Combination - 200', intervals: ['1', '2', '5', 'b7', '7'] },
            '5N_201': { name: '5 Note Combination - 201', intervals: ['1', '2', 'b6', '6', 'b7'] },
            '5N_202': { name: '5 Note Combination - 202', intervals: ['1', '2', 'b6', '6', '7'] },
            '5N_203': { name: '5 Note Combination - 203', intervals: ['1', '2', 'b6', 'b7', '7'] },
            '5N_204': { name: '5 Note Combination - 204', intervals: ['1', '2', '6', 'b7', '7'] },
            '5N_205': { name: '5 Note Combination - 205', intervals: ['1', 'b3', '3', '4', 'b5'] },
            '5N_206': { name: '5 Note Combination - 206', intervals: ['1', 'b3', '3', '4', '5'] },
            '5N_207': { name: '5 Note Combination - 207', intervals: ['1', 'b3', '3', '4', 'b6'] },
            '5N_208': { name: '5 Note Combination - 208', intervals: ['1', 'b3', '3', '4', '6'] },
            '5N_209': { name: '5 Note Combination - 209', intervals: ['1', 'b3', '3', '4', 'b7'] },
            '5N_210': { name: '5 Note Combination - 210', intervals: ['1', 'b3', '3', '4', '7'] },
            '5N_211': { name: '5 Note Combination - 211', intervals: ['1', 'b3', '3', 'b5', '5'] },
            '5N_212': { name: '5 Note Combination - 212', intervals: ['1', 'b3', '3', 'b5', 'b6'] },
            '5N_213': { name: '5 Note Combination - 213', intervals: ['1', 'b3', '3', 'b5', '6'] },
            '5N_214': { name: '5 Note Combination - 214', intervals: ['1', 'b3', '3', 'b5', 'b7'] },
            '5N_215': { name: '5 Note Combination - 215', intervals: ['1', 'b3', '3', 'b5', '7'] },
            '5N_216': { name: '5 Note Combination - 216', intervals: ['1', 'b3', '3', '5', 'b6'] },
            '5N_217': { name: '5 Note Combination - 217', intervals: ['1', 'b3', '3', '5', '6'] },
            '5N_218': { name: '5 Note Combination - 218', intervals: ['1', 'b3', '3', '5', 'b7'] },
            '5N_219': { name: '5 Note Combination - 219', intervals: ['1', 'b3', '3', '5', '7'] },
            '5N_220': { name: '5 Note Combination - 220', intervals: ['1', 'b3', '3', 'b6', '6'] },
            '5N_221': { name: '5 Note Combination - 221', intervals: ['1', 'b3', '3', 'b6', 'b7'] },
            '5N_222': { name: '5 Note Combination - 222', intervals: ['1', 'b3', '3', 'b6', '7'] },
            '5N_223': { name: '5 Note Combination - 223', intervals: ['1', 'b3', '3', '6', 'b7'] },
            '5N_224': { name: '5 Note Combination - 224', intervals: ['1', 'b3', '3', '6', '7'] },
            '5N_225': { name: '5 Note Combination - 225', intervals: ['1', 'b3', '3', 'b7', '7'] },
            '5N_226': { name: '5 Note Combination - 226', intervals: ['1', 'b3', '4', 'b5', '5'] },
            '5N_227': { name: '5 Note Combination - 227', intervals: ['1', 'b3', '4', 'b5', 'b6'] },
            '5N_228': { name: '5 Note Combination - 228', intervals: ['1', 'b3', '4', 'b5', '6'] },
            '5N_229': { name: '5 Note Combination - 229', intervals: ['1', 'b3', '4', 'b5', 'b7'] },
            '5N_230': { name: '5 Note Combination - 230', intervals: ['1', 'b3', '4', 'b5', '7'] },
            '5N_231': { name: '5 Note Combination - 231', intervals: ['1', 'b3', '4', '5', 'b6'] },
            '5N_232': { name: '5 Note Combination - 232', intervals: ['1', 'b3', '4', '5', '6'] },
            '5N_233': { name: '5 Note Combination - 233', intervals: ['1', 'b3', '4', '5', 'b7'] },
            '5N_234': { name: '5 Note Combination - 234', intervals: ['1', 'b3', '4', '5', '7'] },
            '5N_235': { name: '5 Note Combination - 235', intervals: ['1', 'b3', '4', 'b6', '6'] },
            '5N_236': { name: '5 Note Combination - 236', intervals: ['1', 'b3', '4', 'b6', 'b7'] },
            '5N_237': { name: '5 Note Combination - 237', intervals: ['1', 'b3', '4', 'b6', '7'] },
            '5N_238': { name: '5 Note Combination - 238', intervals: ['1', 'b3', '4', '6', 'b7'] },
            '5N_239': { name: '5 Note Combination - 239', intervals: ['1', 'b3', '4', '6', '7'] },
            '5N_240': { name: '5 Note Combination - 240', intervals: ['1', 'b3', '4', 'b7', '7'] },
            '5N_241': { name: '5 Note Combination - 241', intervals: ['1', 'b3', 'b5', '5', 'b6'] },
            '5N_242': { name: '5 Note Combination - 242', intervals: ['1', 'b3', 'b5', '5', '6'] },
            '5N_243': { name: '5 Note Combination - 243', intervals: ['1', 'b3', 'b5', '5', 'b7'] },
            '5N_244': { name: '5 Note Combination - 244', intervals: ['1', 'b3', 'b5', '5', '7'] },
            '5N_245': { name: '5 Note Combination - 245', intervals: ['1', 'b3', 'b5', 'b6', '6'] },
            '5N_246': { name: '5 Note Combination - 246', intervals: ['1', 'b3', 'b5', 'b6', 'b7'] },
            '5N_247': { name: '5 Note Combination - 247', intervals: ['1', 'b3', 'b5', 'b6', '7'] },
            '5N_248': { name: '5 Note Combination - 248', intervals: ['1', 'b3', 'b5', '6', 'b7'] },
            '5N_249': { name: '5 Note Combination - 249', intervals: ['1', 'b3', 'b5', '6', '7'] },
            '5N_250': { name: '5 Note Combination - 250', intervals: ['1', 'b3', 'b5', 'b7', '7'] },
            '5N_251': { name: '5 Note Combination - 251', intervals: ['1', 'b3', '5', 'b6', '6'] },
            '5N_252': { name: '5 Note Combination - 252', intervals: ['1', 'b3', '5', 'b6', 'b7'] },
            '5N_253': { name: '5 Note Combination - 253', intervals: ['1', 'b3', '5', 'b6', '7'] },
            '5N_254': { name: '5 Note Combination - 254', intervals: ['1', 'b3', '5', '6', 'b7'] },
            '5N_255': { name: '5 Note Combination - 255', intervals: ['1', 'b3', '5', '6', '7'] },
            '5N_256': { name: '5 Note Combination - 256', intervals: ['1', 'b3', '5', 'b7', '7'] },
            '5N_257': { name: '5 Note Combination - 257', intervals: ['1', 'b3', 'b6', '6', 'b7'] },
            '5N_258': { name: '5 Note Combination - 258', intervals: ['1', 'b3', 'b6', '6', '7'] },
            '5N_259': { name: '5 Note Combination - 259', intervals: ['1', 'b3', 'b6', 'b7', '7'] },
            '5N_260': { name: '5 Note Combination - 260', intervals: ['1', 'b3', '6', 'b7', '7'] },
            '5N_261': { name: '5 Note Combination - 261', intervals: ['1', '3', '4', 'b5', '5'] },
            '5N_262': { name: '5 Note Combination - 262', intervals: ['1', '3', '4', 'b5', 'b6'] },
            '5N_263': { name: '5 Note Combination - 263', intervals: ['1', '3', '4', 'b5', '6'] },
            '5N_264': { name: '5 Note Combination - 264', intervals: ['1', '3', '4', 'b5', 'b7'] },
            '5N_265': { name: '5 Note Combination - 265', intervals: ['1', '3', '4', 'b5', '7'] },
            '5N_266': { name: '5 Note Combination - 266', intervals: ['1', '3', '4', '5', 'b6'] },
            '5N_267': { name: '5 Note Combination - 267', intervals: ['1', '3', '4', '5', '6'] },
            '5N_268': { name: '5 Note Combination - 268', intervals: ['1', '3', '4', '5', 'b7'] },
            '5N_269': { name: '5 Note Combination - 269', intervals: ['1', '3', '4', '5', '7'] },
            '5N_270': { name: '5 Note Combination - 270', intervals: ['1', '3', '4', 'b6', '6'] },
            '5N_271': { name: '5 Note Combination - 271', intervals: ['1', '3', '4', 'b6', 'b7'] },
            '5N_272': { name: '5 Note Combination - 272', intervals: ['1', '3', '4', 'b6', '7'] },
            '5N_273': { name: '5 Note Combination - 273', intervals: ['1', '3', '4', '6', 'b7'] },
            '5N_274': { name: '5 Note Combination - 274', intervals: ['1', '3', '4', '6', '7'] },
            '5N_275': { name: '5 Note Combination - 275', intervals: ['1', '3', '4', 'b7', '7'] },
            '5N_276': { name: '5 Note Combination - 276', intervals: ['1', '3', 'b5', '5', 'b6'] },
            '5N_277': { name: '5 Note Combination - 277', intervals: ['1', '3', 'b5', '5', '6'] },
            '5N_278': { name: '5 Note Combination - 278', intervals: ['1', '3', 'b5', '5', 'b7'] },
            '5N_279': { name: '5 Note Combination - 279', intervals: ['1', '3', 'b5', '5', '7'] },
            '5N_280': { name: '5 Note Combination - 280', intervals: ['1', '3', 'b5', 'b6', '6'] },
            '5N_281': { name: '5 Note Combination - 281', intervals: ['1', '3', 'b5', 'b6', 'b7'] },
            '5N_282': { name: '5 Note Combination - 282', intervals: ['1', '3', 'b5', 'b6', '7'] },
            '5N_283': { name: '5 Note Combination - 283', intervals: ['1', '3', 'b5', '6', 'b7'] },
            '5N_284': { name: '5 Note Combination - 284', intervals: ['1', '3', 'b5', '6', '7'] },
            '5N_285': { name: '5 Note Combination - 285', intervals: ['1', '3', 'b5', 'b7', '7'] },
            '5N_286': { name: '5 Note Combination - 286', intervals: ['1', '3', '5', 'b6', '6'] },
            '5N_287': { name: '5 Note Combination - 287', intervals: ['1', '3', '5', 'b6', 'b7'] },
            '5N_288': { name: '5 Note Combination - 288', intervals: ['1', '3', '5', 'b6', '7'] },
            '5N_289': { name: '5 Note Combination - 289', intervals: ['1', '3', '5', '6', 'b7'] },
            '5N_290': { name: '5 Note Combination - 290', intervals: ['1', '3', '5', '6', '7'] },
            '5N_291': { name: '5 Note Combination - 291', intervals: ['1', '3', '5', 'b7', '7'] },
            '5N_292': { name: '5 Note Combination - 292', intervals: ['1', '3', 'b6', '6', 'b7'] },
            '5N_293': { name: '5 Note Combination - 293', intervals: ['1', '3', 'b6', '6', '7'] },
            '5N_294': { name: '5 Note Combination - 294', intervals: ['1', '3', 'b6', 'b7', '7'] },
            '5N_295': { name: '5 Note Combination - 295', intervals: ['1', '3', '6', 'b7', '7'] },
            '5N_296': { name: '5 Note Combination - 296', intervals: ['1', '4', 'b5', '5', 'b6'] },
            '5N_297': { name: '5 Note Combination - 297', intervals: ['1', '4', 'b5', '5', '6'] },
            '5N_298': { name: '5 Note Combination - 298', intervals: ['1', '4', 'b5', '5', 'b7'] },
            '5N_299': { name: '5 Note Combination - 299', intervals: ['1', '4', 'b5', '5', '7'] },
            '5N_300': { name: '5 Note Combination - 300', intervals: ['1', '4', 'b5', 'b6', '6'] },
            '5N_301': { name: '5 Note Combination - 301', intervals: ['1', '4', 'b5', 'b6', 'b7'] },
            '5N_302': { name: '5 Note Combination - 302', intervals: ['1', '4', 'b5', 'b6', '7'] },
            '5N_303': { name: '5 Note Combination - 303', intervals: ['1', '4', 'b5', '6', 'b7'] },
            '5N_304': { name: '5 Note Combination - 304', intervals: ['1', '4', 'b5', '6', '7'] },
            '5N_305': { name: '5 Note Combination - 305', intervals: ['1', '4', 'b5', 'b7', '7'] },
            '5N_306': { name: '5 Note Combination - 306', intervals: ['1', '4', '5', 'b6', '6'] },
            '5N_307': { name: '5 Note Combination - 307', intervals: ['1', '4', '5', 'b6', 'b7'] },
            '5N_308': { name: '5 Note Combination - 308', intervals: ['1', '4', '5', 'b6', '7'] },
            '5N_309': { name: '5 Note Combination - 309', intervals: ['1', '4', '5', '6', 'b7'] },
            '5N_310': { name: '5 Note Combination - 310', intervals: ['1', '4', '5', '6', '7'] },
            '5N_311': { name: '5 Note Combination - 311', intervals: ['1', '4', '5', 'b7', '7'] },
            '5N_312': { name: '5 Note Combination - 312', intervals: ['1', '4', 'b6', '6', 'b7'] },
            '5N_313': { name: '5 Note Combination - 313', intervals: ['1', '4', 'b6', '6', '7'] },
            '5N_314': { name: '5 Note Combination - 314', intervals: ['1', '4', 'b6', 'b7', '7'] },
            '5N_315': { name: '5 Note Combination - 315', intervals: ['1', '4', '6', 'b7', '7'] },
            '5N_316': { name: '5 Note Combination - 316', intervals: ['1', 'b5', '5', 'b6', '6'] },
            '5N_317': { name: '5 Note Combination - 317', intervals: ['1', 'b5', '5', 'b6', 'b7'] },
            '5N_318': { name: '5 Note Combination - 318', intervals: ['1', 'b5', '5', 'b6', '7'] },
            '5N_319': { name: '5 Note Combination - 319', intervals: ['1', 'b5', '5', '6', 'b7'] },
            '5N_320': { name: '5 Note Combination - 320', intervals: ['1', 'b5', '5', '6', '7'] },
            '5N_321': { name: '5 Note Combination - 321', intervals: ['1', 'b5', '5', 'b7', '7'] },
            '5N_322': { name: '5 Note Combination - 322', intervals: ['1', 'b5', 'b6', '6', 'b7'] },
            '5N_323': { name: '5 Note Combination - 323', intervals: ['1', 'b5', 'b6', '6', '7'] },
            '5N_324': { name: '5 Note Combination - 324', intervals: ['1', 'b5', 'b6', 'b7', '7'] },
            '5N_325': { name: '5 Note Combination - 325', intervals: ['1', 'b5', '6', 'b7', '7'] },
            '5N_326': { name: '5 Note Combination - 326', intervals: ['1', '5', 'b6', '6', 'b7'] },
            '5N_327': { name: '5 Note Combination - 327', intervals: ['1', '5', 'b6', '6', '7'] },
            '5N_328': { name: '5 Note Combination - 328', intervals: ['1', '5', 'b6', 'b7', '7'] },
            '5N_329': { name: '5 Note Combination - 329', intervals: ['1', '5', '6', 'b7', '7'] },
            '5N_330': { name: '5 Note Combination - 330', intervals: ['1', 'b6', '6', 'b7', '7'] }          
        };
        
        this.chords = {
            'major': { name: 'Major', intervals: ['1', '3', '5'] },
            'minor': { name: 'Minor', intervals: ['1', 'b3', '5'] },
            'diminished': { name: 'Diminished', intervals: ['1', 'b3', 'b5'] },
            'augmented': { name: 'Augmented', intervals: ['1', '3', '#5'] },
            'sus2': { name: 'Sus2', intervals: ['1', '2', '5'] },
            'sus4': { name: 'Sus4', intervals: ['1', '4', '5'] },
            'major7': { name: 'Major 7', intervals: ['1', '3', '5', '7'] },
            'dominant7': { name: 'Dominant 7', intervals: ['1', '3', '5', 'b7'] },
            'minor7': { name: 'Minor 7', intervals: ['1', 'b3', '5', 'b7'] },
            'diminished7': { name: 'Diminished 7', intervals: ['1', 'b3', 'b5', '6'] },
            'half_diminished': { name: 'Half Diminished', intervals: ['1', 'b3', 'b5', 'b7'] },
            'augmented7': { name: 'Augmented 7', intervals: ['1', '3', '#5', 'b7'] },
            'add9': { name: 'Add9', intervals: ['1', '3', '5', '2'] },
            '6': { name: '6', intervals: ['1', '3', '5', '6'] },
            'm6': { name: 'Minor 6', intervals: ['1', 'b3', '5', '6'] },
            'maj9': { name: 'Major 9', intervals: ['1', '3', '5', '7', '2'] },
            'dom9': { name: 'Dominant 9', intervals: ['1', '3', '5', 'b7', '2'] },
            'min9': { name: 'Minor 9', intervals: ['1', 'b3', '5', 'b7', '2'] },
            'maj11': { name: 'Major 11', intervals: ['1', '3', '5', '7', '2', '4'] },
            'dom11': { name: 'Dominant 11', intervals: ['1', '3', '5', 'b7', '2', '4'] },
            'min11': { name: 'Minor 11', intervals: ['1', 'b3', '5', 'b7', '2', '4'] },
            'maj13': { name: 'Major 13', intervals: ['1', '3', '5', '7', '2', '4', '6'] },
            'dom13': { name: 'Dominant 13', intervals: ['1', '3', '5', 'b7', '2', '4', '6'] },
            'min13': { name: 'Minor 13', intervals: ['1', 'b3', '5', 'b7', '2', '4', '6'] },
            '7sus4': { name: '7sus4', intervals: ['1', '4', '5', 'b7'] },
            '9sus4': { name: '9sus4', intervals: ['1', '4', '5', 'b7', '2'] },
            'add11': { name: 'Add11', intervals: ['1', '3', '5', '4'] },
            'madd11': { name: 'Minor Add11', intervals: ['1', 'b3', '5', '4'] },
            'madd9': { name: 'Minor Add9', intervals: ['1', 'b3', '5', '2'] },
            '7b9': { name: '7(b9)', intervals: ['1', '3', '5', 'b7', 'b2'] },
            '7#9': { name: '7(#9)', intervals: ['1', '3', '5', 'b7', '#2'] },
            '7#11': { name: '7(#11)', intervals: ['1', '3', '5', 'b7', '#4'] },
            '7b13': { name: '7(b13)', intervals: ['1', '3', '5', 'b7', 'b6'] },
            '7#5': { name: '7(#5)', intervals: ['1', '3', '#5', 'b7'] },
            '7b5': { name: '7(b5)', intervals: ['1', '3', 'b5', 'b7'] },
            'alt7': { name: 'Altered 7', intervals: ['1', '3', 'b5', 'b7', 'b9', '#9'] },
            'maj7#5': { name: 'Maj7(#5)', intervals: ['1', '3', '#5', '7'] },
            'maj7b5': { name: 'Maj7(b5)', intervals: ['1', '3', 'b5', '7'] },
            'm7b5': { name: 'm7(b5)', intervals: ['1', 'b3', 'b5', 'b7'] },
            'maj7#11': { name: 'Maj7(#11)', intervals: ['1', '3', '5', '7', '#4'] },
            '5': { name: '5 (Power Chord)', intervals: ['1', '5'] },
            'dim7b9': { name: 'dim7(b9)', intervals: ['1', 'b3', 'b5', '6', 'b2'] },
            'm7#5': { name: 'm7(#5)', intervals: ['1', 'b3', '#5', 'b7'] },
            '6add9': { name: '6/9', intervals: ['1', '3', '5', '6', '2'] },
            'm6add9': { name: 'm6/9', intervals: ['1', 'b3', '5', '6', '2'] },
            '7sus2': { name: '7sus2', intervals: ['1', '2', '5', 'b7'] },
            '13sus4': { name: '13sus4', intervals: ['1', '4', '5', 'b7', '6'] },
            'maj7sus2': { name: 'Maj7sus2', intervals: ['1', '2', '5', '7'] },
            'maj7sus4': { name: 'Maj7sus4', intervals: ['1', '4', '5', '7'] },
            'maj9#11': { name: 'Maj9(#11)', intervals: ['1', '3', '5', '7', '2', '#4'] },
            'maj13#11': { name: 'Maj13(#11)', intervals: ['1', '3', '5', '7', '2', '#4', '6'] },
            '9#5': { name: '9(#5)', intervals: ['1', '3', '#5', 'b7', '2'] },
            '9b5': { name: '9(b5)', intervals: ['1', '3', 'b5', 'b7', '2'] },
            '13#9': { name: '13(#9)', intervals: ['1', '3', '5', 'b7', '#2', '4', '6'] },
            '13b9': { name: '13(b9)', intervals: ['1', '3', '5', 'b7', 'b2', '4', '6'] },
            '7#9#5': { name: '7(#9#5)', intervals: ['1', '3', '#5', 'b7', '#2'] },
            '7b9#5': { name: '7(b9#5)', intervals: ['1', '3', '#5', 'b7', 'b2'] },
            '7b9b5': { name: '7(b9b5)', intervals: ['1', '3', 'b5', 'b7', 'b2'] },
            '7#9b5': { name: '7(#9b5)', intervals: ['1', '3', 'b5', 'b7', '#2'] },
            '7b9#11': { name: '7(b9#11)', intervals: ['1', '3', '5', 'b7', 'b2', '#4'] },
            '7#9#11': { name: '7(#9#11)', intervals: ['1', '3', '5', 'b7', '#2', '#4'] },
            'maj7b9': { name: 'Maj7(b9)', intervals: ['1', '3', '5', '7', 'b2'] },
            'maj7#9': { name: 'Maj7(#9)', intervals: ['1', '3', '5', '7', '#2'] },
            'maj7b5b9': { name: 'Maj7(b5b9)', intervals: ['1', '3', 'b5', '7', 'b2'] },
            'maj7#5b9': { name: 'Maj7(#5b9)', intervals: ['1', '3', '#5', '7', 'b2'] },
            'maj7#5#9': { name: 'Maj7(#5#9)', intervals: ['1', '3', '#5', '7', '#2'] },
            'm9b5': { name: 'm9(b5)', intervals: ['1', 'b3', 'b5', 'b7', '2'] },
            'm9#5': { name: 'm9(#5)', intervals: ['1', 'b3', '#5', 'b7', '2'] },
            'm11b5': { name: 'm11(b5)', intervals: ['1', 'b3', 'b5', 'b7', '2', '4'] },
            'dim9': { name: 'dim9', intervals: ['1', 'b3', 'b5', '6', '2'] },
            'aug9': { name: 'aug9', intervals: ['1', '3', '#5', 'b7', '2'] },
            'sus4b9': { name: 'sus4(b9)', intervals: ['1', '4', '5', 'b7', 'b2'] },
            'sus4#9': { name: 'sus4(#9)', intervals: ['1', '4', '5', 'b7', '#2'] },
            'm7add11': { name: 'm7(add11)', intervals: ['1', 'b3', '5', 'b7', '4'] },
            'm6add11': { name: 'm6(add11)', intervals: ['1', 'b3', '5', '6', '4'] }
        };
        
        this.keySignatures = {
            "C": {},
            "G": {"F": "#"},
            "D": {"F": "#", "C": "#"},
            "A": {"F": "#", "C": "#", "G": "#"},
            "E": {"F": "#", "C": "#", "G": "#", "D": "#"},
            "B": {"F": "#", "C": "#", "G": "#", "D": "#", "A": "#"},
            "F#": {"F": "#", "C": "#", "G": "#", "D": "#", "A": "#", "E": "#"},
            "C#": {"F": "#", "C": "#", "G": "#", "D": "#", "A": "#", "E": "#", "B": "#"},
            "F": {"B": "b"},
            "Bb": {"B": "b", "E": "b"},
            "Eb": {"B": "b", "E": "b", "A": "b"},
            "Ab": {"B": "b", "E": "b", "A": "b", "D": "b"},
            "Db": {"B": "b", "E": "b", "A": "b", "D": "b", "G": "b"},
            "Gb": {"B": "b", "E": "b", "A": "b", "D": "b", "G": "b", "C": "b"},
            "Cb": {"B": "b", "E": "b", "A": "b", "D": "b", "G": "b", "C": "b", "F": "b"}
        };

        this.enharmonicPairs = {
            "A#": "Bb",
            "Bb": "A#",
            "C#": "Db",
            "Db": "C#",
            "D#": "Eb",
            "Eb": "D#",
            "F#": "Gb",
            "Gb": "F#",
            "G#": "Ab",
            "Ab": "G#"
        };

        this.noteStyles = {
            shapes: ['circle', 'square', 'diamond', 'triangle', 'hexagon', 'star', 'pentagon', 'octagon', 'heart', 'cross', 
                    'plus', 'arrow', 'teardrop', 'oval', 'rectangle', 'rhombus', 'parallelogram', 'trapezoid', 'semicircle', 
                    'crescent', 'ring', 'crosshair', 'donut', 'clover', 'flower', 'shield', 'crown', 'droplet', 'cloud', 
                    'starburst', 'gear', 'cube', 'moon', 'sun', 'flag', 'ribbon', 'tag', 'bookmark', 'lightning', 'key'],
            fonts: ['Arial', 'Arial Black', 'Arial Narrow', 'Courier New', 'Georgia', 'Gill Sans', 'Helvetica', 'Impact', 'Lucida Sans Unicode', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'],
            effects: ['none', 'glow', 'shadow', 'outline', 'highlight', 'pulsate', 'blink', 'wobble', 'rotate', 'bounce', 
                    'flip', 'shake', 'jelly', 'fade', 'grow', 'shrink', 'blur', 'vibrate', 'sparkle', 'ripple',
                    'wave', 'neon', 'shatter', 'glitch', 'rainbow', 'zoom', 'twinkle', 'splash', 'heatwave',
                    'chroma', 'emboss', 'metallic', 'neumorphic', 'holographic', 'retro', 'pixelate', 'sketch',
                    'paint', 'grime', 'distortion', 'liquefy', 'frosted', 'carved', 'vignette', 'noise', 'sticker',
                    'psychedelic', 'relief', 'foil', 'brushed', 'glazed', 'watercolor', 'comic', 'bubble', 'gradient-pulse']
        };
        
        this.romanNumerals = {
            major: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
            minor: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii']
        };
        
        this.solfege = {
            'C': 'Do', 'C#': 'Di', 'D': 'Re', 'D#': 'Ri', 
            'E': 'Mi', 'F': 'Fa', 'F#': 'Fi', 'G': 'Sol', 
            'G#': 'Si', 'A': 'La', 'A#': 'Li', 'B': 'Ti'
        };
        
        this.standardTunings = {
            4: ['G', 'D', 'A', 'E'], // Bass
            5: ['G', 'D', 'A', 'E', 'B'], // 5-string Bass
            6: ['E', 'A', 'D', 'G', 'B', 'E'], // Guitar
            7: ['B', 'E', 'A', 'D', 'G', 'B', 'E'], // 7-string Guitar
            8: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'], // 8-string Guitar
            12: ['E', 'E', 'A', 'A', 'D', 'D', 'G', 'G', 'B', 'B', 'E', 'E'] // 12-string Guitar
        };
        
        this.colorThemes = {
            default: {
                background: '#FFFFFF',
                strings: '#888888',
                frets: '#444444',
                markers: '#333333',
                // Interval colors defined in intervals object
            },
            dark: {
                background: '#222222',
                strings: '#AAAAAA',
                frets: '#666666',
                markers: '#DDDDDD',
                intervals: {
                    '1': '#FF5252',
                    'b2': '#FF7F50',
                    '2': '#FFD700',
                    'b3': '#9ACD32',
                    '3': '#4CAF50',
                    '4': '#00BCD4',
                    'b5': '#2196F3',
                    '5': '#3F51B5',
                    '#5': '#9C27B0',
                    '6': '#E91E63',
                    'b7': '#FF4081',
                    '7': '#FF6E40'
                }
            },
            colorful: {
                background: '#F5F5F5',
                strings: '#555555',
                frets: '#333333',
                markers: '#000000',
                intervals: {
                    '1': '#E53935',
                    'b2': '#FB8C00',
                    '2': '#FFB300',
                    'b3': '#43A047',
                    '3': '#00ACC1',
                    '4': '#039BE5',
                    'b5': '#3949AB',
                    '5': '#7E57C2',
                    '#5': '#5E35B1',
                    '6': '#D81B60',
                    'b7': '#8E24AA',
                    '7': '#00897B'
                }
            },
            ocean: {
                background: '#E0F7FA',
                strings: '#0277BD',
                frets: '#01579B',
                markers: '#006064',
                intervals: {
                    '1': '#00BCD4',
                    'b2': '#0097A7',
                    '2': '#00838F',
                    'b3': '#006064',
                    '3': '#0288D1',
                    '4': '#0277BD',
                    'b5': '#01579B',
                    '5': '#039BE5',
                    '#5': '#03A9F4',
                    '6': '#29B6F6',
                    'b7': '#4FC3F7',
                    '7': '#81D4FA'
                }
            },
            forest: {
                background: '#E8F5E9',
                strings: '#2E7D32',
                frets: '#1B5E20',
                markers: '#33691E',
                intervals: {
                    '1': '#4CAF50',
                    'b2': '#43A047',
                    '2': '#388E3C',
                    'b3': '#2E7D32',
                    '3': '#689F38',
                    '4': '#558B2F',
                    'b5': '#33691E',
                    '5': '#7CB342',
                    '#5': '#8BC34A',
                    '6': '#9CCC65',
                    'b7': '#AED581',
                    '7': '#C5E1A5'
                }
            },
            sunset: {
                background: '#FFF3E0',
                strings: '#FF8F00',
                frets: '#F57F17',
                markers: '#FF6F00',
                intervals: {
                    '1': '#FFC107',
                    'b2': '#FFB300',
                    '2': '#FFA000',
                    'b3': '#FF8F00',
                    '3': '#FF6F00',
                    '4': '#FBC02D',
                    'b5': '#F9A825',
                    '5': '#F57F17',
                    '#5': '#FFAB00',
                    '6': '#FFD740',
                    'b7': '#FFE57F',
                    '7': '#FFF8E1'
                }
            },
            lavender: {
                background: '#F3E5F5',
                strings: '#6A1B9A',
                frets: '#4A148C',
                markers: '#7B1FA2',
                intervals: {
                    '1': '#9C27B0',
                    'b2': '#8E24AA',
                    '2': '#7B1FA2',
                    'b3': '#6A1B9A',
                    '3': '#AB47BC',
                    '4': '#BA68C8',
                    'b5': '#CE93D8',
                    '5': '#673AB7',
                    '#5': '#5E35B1',
                    '6': '#512DA8',
                    'b7': '#4527A0',
                    '7': '#7E57C2'
                }
            },
            autumn: {
                background: '#FBE9E7',
                strings: '#BF360C',
                frets: '#8D6E63',
                markers: '#5D4037',
                intervals: {
                    '1': '#795548',
                    'b2': '#6D4C41',
                    '2': '#5D4037',
                    'b3': '#4E342E',
                    '3': '#3E2723',
                    '4': '#D84315',
                    'b5': '#BF360C',
                    '5': '#F4511E',
                    '#5': '#FF5722',
                    '6': '#FF8A65',
                    'b7': '#FFAB91',
                    '7': '#FFCCBC'
                }
            },
            pastel: {
                background: '#FAFAFA',
                strings: '#90A4AE',
                frets: '#607D8B',
                markers: '#455A64',
                intervals: {
                    '1': '#FFCDD2',
                    'b2': '#F8BBD0',
                    '2': '#FF99D1',
                    'b3': '#FF80C4',
                    '3': '#FF66B8',
                    '4': '#FF4DAC',
                    'b5': '#FF33A0',
                    '5': '#FF1A94',
                    '#5': '#FF0088',
                    '6': '#E6005C',
                    'b7': '#CC006C',
                    '7': '#B3005F'
                }
            },
            neon: {
                background: '#212121',
                strings: '#484848',
                frets: '#303030',
                markers: '#757575',
                intervals: {
                    '1': '#FF1744',
                    'b2': '#F50057',
                    '2': '#D500F9',
                    'b3': '#651FFF',
                    '3': '#3F5AFE',
                    '4': '#2979FF',
                    'b5': '#00B0FF',
                    '5': '#00E5FF',
                    '#5': '#1DE9B6',
                    '6': '#00E676',
                    'b7': '#FF4081',
                    '7': '#FFEA00'
                }
            },
            monoRed: {
                background: '#FFEBEE',
                strings: '#E53935',
                frets: '#C62828',
                markers: '#B71C1C',
                intervals: {
                    '1': '#EF9A9A',
                    'b2': '#E57373',
                    '2': '#EF5350',
                    'b3': '#F44336',
                    '3': '#E53935',
                    '4': '#D32F2F',
                    'b5': '#C62828',
                    '5': '#B71C1C',
                    '#5': '#FF8A80',
                    '6': '#FF5252',
                    'b7': '#FF1744',
                    '7': '#D50000'
                }
            },
            monoBlue: {
                background: '#E3F2FD',
                strings: '#1976D2',
                frets: '#1565C0',
                markers: '#0D47A1',
                intervals: {
                    '1': '#90CAF9',
                    'b2': '#64B5F6',
                    '2': '#42A5F5',
                    'b3': '#2196F3',
                    '3': '#1E88E5',
                    '4': '#1976D2',
                    'b5': '#1565C0',
                    '5': '#0D47A1',
                    '#5': '#82B1FF',
                    '6': '#448AFF',
                    'b7': '#2979FF',
                    '7': '#2962FF'
                }
            },
            monoGreen: {
                background: '#E8F5E9',
                strings: '#388E3C',
                frets: '#2E7D32',
                markers: '#1B5E20',
                intervals: {
                    '1': '#A5D6A7',
                    'b2': '#81C784',
                    '2': '#66BB6A',
                    'b3': '#4CAF50',
                    '3': '#43A047',
                    '4': '#388E3C',
                    'b5': '#2E7D32',
                    '5': '#1B5E20',
                    '#5': '#B9F6CA',
                    '6': '#69F0AE',
                    'b7': '#00E676',
                    '7': '#00C853'
                }
            },
            grayscale: {
                background: '#FAFAFA',
                strings: '#616161',
                frets: '#424242',
                markers: '#212121',
                intervals: {
                    '1': '#F5F5F5',
                    'b2': '#EEEEEE',
                    '2': '#E0E0E0',
                    'b3': '#BDBDBD',
                    '3': '#9E9E9E',
                    '4': '#757575',
                    'b5': '#616161',
                    '5': '#424242',
                    '#5': '#BDBDBD',
                    '6': '#9E9E9E',
                    'b7': '#757575',
                    '7': '#616161'
                }
            },
            blackAndWhite: {
                background: '#FFFFFF',
                strings: '#000000',
                frets: '#000000',
                markers: '#000000',
                intervals: {
                    '1': '#000000',
                    'b2': '#333333',
                    '2': '#000000',
                    'b3': '#333333',
                    '3': '#000000',
                    '4': '#333333',
                    'b5': '#000000',
                    '5': '#333333',
                    '#5': '#000000',
                    '6': '#333333',
                    'b7': '#000000',
                    '7': '#333333'
                }
            },
            vintage: {
                background: '#FFF8E1',
                strings: '#8D6E63',
                frets: '#6D4C41',
                markers: '#5D4037',
                intervals: {
                    '1': '#D7CCC8',
                    'b2': '#BCAAA4',
                    '2': '#A1887F',
                    'b3': '#8D6E63',
                    '3': '#795548',
                    '4': '#6D4C41',
                    'b5': '#5D4037',
                    '5': '#4E342E',
                    '#5': '#FFECB3',
                    '6': '#FFE082',
                    'b7': '#FFD54F',
                    '7': '#FFCA28'
                }
            },
            beach: {
                background: '#FFFFFF',
                strings: '#00838F',
                frets: '#006064',
                markers: '#00695C',
                intervals: {
                    '1': '#FFF9C4',
                    'b2': '#FFF59D',
                    '2': '#FFF176',
                    'b3': '#FFEE58',
                    '3': '#B2EBF2',
                    '4': '#80DEEA',
                    'b5': '#4DD0E1',
                    '5': '#26C6DA',
                    '#5': '#00BCD4',
                    '6': '#00ACC1',
                    'b7': '#0097A7',
                    '7': '#00838F'
                }
            },
            rainbow: {
                background: '#FFFFFF',
                strings: '#616161',
                frets: '#424242',
                markers: '#212121',
                intervals: {
                    '1': '#F44336',
                    'b2': '#FF9800',
                    '2': '#FFEB3B',
                    'b3': '#4CAF50',
                    '3': '#2196F3',
                    '4': '#3F51B5',
                    'b5': '#9C27B0',
                    '5': '#E91E63',
                    '#5': '#F44336',
                    '6': '#FF9800',
                    'b7': '#FFEB3B',
                    '7': '#4CAF50'
                }
            },
            desert: {
                background: '#FFFDE7',
                strings: '#FF8F00',
                frets: '#F57F17',
                markers: '#FF6F00',
                intervals: {
                    '1': '#FFC107',
                    'b2': '#FFB300',
                    '2': '#FFA000',
                    'b3': '#FF8F00',
                    '3': '#FF6F00',
                    '4': '#FBC02D',
                    'b5': '#F9A825',
                    '5': '#F57F17',
                    '#5': '#FFAB00',
                    '6': '#FFD740',
                    'b7': '#FFE57F',
                    '7': '#FFF8E1'
                }
            },
            retro: {
                background: '#ECEFF1',
                strings: '#607D8B',
                frets: '#455A64',
                markers: '#37474F',
                intervals: {
                    '1': '#B0BEC5',
                    'b2': '#90A4AE',
                    '2': '#78909C',
                    'b3': '#607D8B',
                    '3': '#546E7A',
                    '4': '#455A64',
                    'b5': '#37474F',
                    '5': '#263238',
                    '#5': '#CFD8DC',
                    '6': '#B0BEC5',
                    'b7': '#90A4AE',
                    '7': '#78909C'
                }
            },
            mint: {
                background: '#E0F2F1',
                strings: '#00897B',
                frets: '#00796B',
                markers: '#00695C',
                intervals: {
                    '1': '#80CBC4',
                    'b2': '#4DB6AC',
                    '2': '#26A69A',
                    'b3': '#009688',
                    '3': '#00897B',
                    '4': '#00796B',
                    'b5': '#00695C',
                    '5': '#004D40',
                    '#5': '#A7FFEB',
                    '6': '#64FFDA',
                    'b7': '#1DE9B6',
                    '7': '#00BFA5'
                }
            },
            cherry: {
                background: '#FCE4EC',
                strings: '#C2185B',
                frets: '#AD1457',
                markers: '#880E4F',
                intervals: {
                    '1': '#F8BBD0',
                    'b2': '#F48FB1',
                    '2': '#F06292',
                    'b3': '#EC407A',
                    '3': '#E91E63',
                    '4': '#D81B60',
                    'b5': '#C2185B',
                    '5': '#AD1457',
                    '#5': '#FF80AB',
                    '6': '#FF4081',
                    'b7': '#F50057',
                    '7': '#C51162'
                }
            },
            deepOcean: {
                background: '#E8EAF6',
                strings: '#303F9F',
                frets: '#283593',
                markers: '#1A237E',
                intervals: {
                    '1': '#9FA8DA',
                    'b2': '#7986CB',
                    '2': '#5C6BC0',
                    'b3': '#3F51B5',
                    '3': '#3949AB',
                    '4': '#303F9F',
                    'b5': '#283593',
                    '5': '#1A237E',
                    '#5': '#8C9EFF',
                    '6': '#536DFE',
                    'b7': '#3D5AFE',
                    '7': '#304FFE'
                }
            },
            coral: {
                background: '#FFEBEE',
                strings: '#FFD54F',
                frets: '#E65100',
                markers: '#FFECB3',
                intervals: {
                    '1': '#FFCDD2',
                    'b2': '#EF9A9A',
                    '2': '#E57373',
                    'b3': '#EF5350',
                    '3': '#F44336',
                    '4': '#E53935',
                    'b5': '#D32F2F',
                    '5': '#C62828',
                    '#5': '#B71C1C',
                    '6': '#FF8A80',
                    'b7': '#FF5252',
                    '7': '#FF1744'
                }
            },
            goldAndBlack: {
                background: '#212121',
                strings: '#FFC107',
                frets: '#FFB300',
                markers: '#FFA000',
                intervals: {
                    '1': '#FFD740',
                    'b2': '#FFC400',
                    '2': '#FFAB00',
                    'b3': '#FF9100',
                    '3': '#FF6D00',
                    '4': '#FFD54F',
                    'b5': '#FFCA28',
                    '5': '#FFC107',
                    '#5': '#FFB300',
                    '6': '#FFA000',
                    'b7': '#FF8F00',
                    '7': '#FF6F00'
                }
            },
            purpleHaze: {
                background: '#EDE7F6',
                strings: '#7B1FA2',
                frets: '#6A1B9A',
                markers: '#4A148C',
                intervals: {
                    '1': '#D1C4E9',
                    'b2': '#B39DDB',
                    '2': '#9575CD',
                    'b3': '#7E57C2',
                    '3': '#673AB7',
                    '4': '#5E35B1',
                    'b5': '#512DA8',
                    '5': '#4527A0',
                    '#5': '#B388FF',
                    '6': '#7C4DFF',
                    'b7': '#651FFF',
                    '7': '#6200EA'
                }
            },
            earthTones: {
                background: '#EFEBE9',
                strings: '#5D4037',
                frets: '#4E342E',
                markers: '#3E2723',
                intervals: {
                    '1': '#D7CCC8',
                    'b2': '#BCAAA4',
                    '2': '#A1887F',
                    'b3': '#8D6E63',
                    '3': '#795548',
                    '4': '#6D4C41',
                    'b5': '#5D4037',
                    '5': '#4E342E',
                    '#5': '#A1887F',
                    '6': '#8D6E63',
                    'b7': '#795548',
                    '7': '#6D4C41'
                }
            },
            vibrant: {
                background: '#FFFFFF',
                strings: '#212121',
                frets: '#424242',
                markers: '#616161',
                intervals: {
                    '1': '#F44336',
                    'b2': '#E91E63',
                    '2': '#9C27B0',
                    'b3': '#673AB7',
                    '3': '#3F51B5',
                    '4': '#2196F3',
                    'b5': '#03A9F4',
                    '5': '#00BCD4',
                    '#5': '#009688',
                    '6': '#4CAF50',
                    'b7': '#8BC34A',
                    '7': '#CDDC39'
                }
            },
            cosmic: {
                background: '#20204F',
                strings: '#7E7EFF',
                frets: '#AEAEFF',
                markers: '#FFFFFF',
                intervals: {
                    '1': '#FF518C',
                    'b2': '#FF73B3',
                    '2': '#FF94DA',
                    'b3': '#FFB8FF',
                    '3': '#DABFFF',
                    '4': '#B8C7FF',
                    'b5': '#94CFFF',
                    '5': '#73D7FF',
                    '#5': '#51E0FF',
                    '6': '#5AFFFF',
                    'b7': '#73FFE0',
                    '7': '#94FFC5'
                }
            },
            coffee: {
                background: '#EFEBE9',
                strings: '#5D4037',
                frets: '#4E342E',
                markers: '#3E2723',
                intervals: {
                    '1': '#D7CCC8',
                    'b2': '#BCAAA4',
                    '2': '#A1887F',
                    'b3': '#8D6E63',
                    '3': '#795548',
                    '4': '#6D4C41',
                    'b5': '#5D4037',
                    '5': '#4E342E',
                    '#5': '#3E2723',
                    '6': '#8D6E63',
                    'b7': '#6D4C41',
                    '7': '#5D4037'
                }
            },
            candy: {
                background: '#FCE4EC',
                strings: '#EC407A',
                frets: '#D81B60',
                markers: '#C2185B',
                intervals: {
                    '1': '#F8BBD0',
                    'b2': '#F48FB1',
                    '2': '#F06292',
                    'b3': '#EC407A',
                    '3': '#FFCDD2',
                    '4': '#EF9A9A',
                    'b5': '#E57373',
                    '5': '#EF5350',
                    '#5': '#BBDEFB',
                    '6': '#90CAF9',
                    'b7': '#64B5F6',
                    '7': '#42A5F5'
                }
            },
            emerald: {
                background: '#E8F5E9',
                strings: '#43A047',
                frets: '#388E3C',
                markers: '#2E7D32',
                intervals: {
                    '1': '#C8E6C9',
                    'b2': '#A5D6A7',
                    '2': '#81C784',
                    'b3': '#66BB6A',
                    '3': '#4CAF50',
                    '4': '#43A047',
                    'b5': '#388E3C',
                    '5': '#2E7D32',
                    '#5': '#1B5E20',
                    '6': '#81C784',
                    'b7': '#4CAF50',
                    '7': '#2E7D32'
                }
            },
            muted: {
                background: '#ECEFF1',
                strings: '#78909C',
                frets: '#607D8B',
                markers: '#546E7A',
                intervals: {
                    '1': '#CFD8DC',
                    'b2': '#B0BEC5',
                    '2': '#90A4AE',
                    'b3': '#78909C',
                    '3': '#607D8B',
                    '4': '#546E7A',
                    'b5': '#455A64',
                    '5': '#37474F',
                    '#5': '#263238',
                    '6': '#78909C',
                    'b7': '#546E7A',
                    '7': '#455A64'
                }
            },
            iceCream: {
                background: '#FFF3E0',
                strings: '#FFB74D',
                frets: '#FFA726',
                markers: '#FF9800',
                intervals: {
                    '1': '#FFF8E1',
                    'b2': '#FFECB3',
                    '2': '#FFE082',
                    'b3': '#FFD54F',
                    '3': '#FFCA28',
                    '4': '#FFC107',
                    'b5': '#FFB300',
                    '5': '#FFA000',
                    '#5': '#FF8F00',
                    '6': '#FFF8E1',
                    'b7': '#FFECB3',
                    '7': '#FFE082'
                }
            },
            blueberry: {
                background: '#E3F2FD',
                strings: '#1976D2',
                frets: '#1565C0',
                markers: '#0D47A1',
                intervals: {
                    '1': '#BBDEFB',
                    'b2': '#90CAF9',
                    '2': '#64B5F6',
                    'b3': '#42A5F5',
                    '3': '#2196F3',
                    '4': '#1E88E5',
                    'b5': '#1976D2',
                    '5': '#1565C0',
                    '#5': '#0D47A1',
                    '6': '#42A5F5',
                    'b7': '#1976D2',
                    '7': '#0D47A1'
                }
            },
            midnight: {
                background: '#01579B',
                strings: '#0288D1',
                frets: '#29B6F6',
                markers: '#B3E5FC',
                intervals: {
                    '1': '#B3E5FC',
                    'b2': '#81D4FA',
                    '2': '#4FC3F7',
                    'b3': '#29B6F6',
                    '3': '#03A9F4',
                    '4': '#039BE5',
                    'b5': '#0288D1',
                    '5': '#0277BD',
                    '#5': '#01579B',
                    '6': '#4FC3F7',
                    'b7': '#0288D1',
                    '7': '#01579B'
                }
            },
            sunrise: {
                background: '#FFF8E1',
                strings: '#FF9800',
                frets: '#FF7043',
                markers: '#FF5722',
                intervals: {
                    '1': '#FFECB3',
                    'b2': '#FFE082',
                    '2': '#FFD54F',
                    'b3': '#FFCA28',
                    '3': '#FFC107',
                    '4': '#FFB300',
                    'b5': '#FFA000',
                    '5': '#FF8F00',
                    '#5': '#FF6F00',
                    '6': '#FFA726',
                    'b7': '#FF9800',
                    '7': '#FB8C00'
                }
            },
            redWine: {
                background: '#FFEBEE',
                strings: '#B71C1C',
                frets: '#7B1FA2',
                markers: '#4A148C',
                intervals: {
                    '1': '#EF9A9A',
                    'b2': '#E57373',
                    '2': '#EF5350',
                    'b3': '#F44336',
                    '3': '#E53935',
                    '4': '#D32F2F',
                    'b5': '#C62828',
                    '5': '#B71C1C',
                    '#5': '#D1C4E9',
                    '6': '#B39DDB',
                    'b7': '#9575CD',
                    '7': '#673AB7'
                }
            },
            seaGreen: {
                background: '#E0F7FA',
                strings: '#00BCD4',
                frets: '#0097A7',
                markers: '#006064',
                intervals: {
                    '1': '#B2EBF2',
                    'b2': '#80DEEA',
                    '2': '#4DD0E1',
                    'b3': '#26C6DA',
                    '3': '#00BCD4',
                    '4': '#00ACC1',
                    'b5': '#0097A7',
                    '5': '#00838F',
                    '#5': '#006064',
                    '6': '#4DD0E1',
                    'b7': '#00ACC1',
                    '7': '#00838F'
                }
            },
            teal: {
                background: '#E0F2F1',
                strings: '#00695C',
                frets: '#004D40',
                markers: '#009688',
                intervals: {
                    '1': '#B2DFDB',
                    'b2': '#80CBC4',
                    '2': '#4DB6AC',
                    'b3': '#26A69A',
                    '3': '#009688',
                    '4': '#00897B',
                    'b5': '#00796B',
                    '5': '#00695C',
                    '#5': '#004D40',
                    '6': '#26A69A',
                    'b7': '#00796B',
                    '7': '#004D40'
                }
            },
            amber: {
                background: '#FFF8E1',
                strings: '#FFB300',
                frets: '#FF8F00',
                markers: '#FF6F00',
                intervals: {
                    '1': '#FFECB3',
                    'b2': '#FFE082',
                    '2': '#FFD54F',
                    'b3': '#FFCA28',
                    '3': '#FFC107',
                    '4': '#FFB300',
                    'b5': '#FFA000',
                    '5': '#FF8F00',
                    '#5': '#FF6F00',
                    '6': '#FFD54F',
                    'b7': '#FFA000',
                    '7': '#FF6F00'
                }
            },
            cyberpunk: {
                background: '#000000',
                strings: '#FF00FF',
                frets: '#00FFFF',
                markers: '#FFFF00',
                intervals: {
                    '1': '#FF00FF',
                    'b2': '#CC00FF',
                    '2': '#9900FF',
                    'b3': '#6600FF',
                    '3': '#3300FF',
                    '4': '#0000FF',
                    'b5': '#0033FF',
                    '5': '#0066FF',
                    '#5': '#0099FF',
                    '6': '#00CCFF',
                    'b7': '#00FFFF',
                    '7': '#00FFCC'
                }
            },
            bubblegum: {
                background: '#FFDCF2',
                strings: '#FF4D94',
                frets: '#FF1A75',
                markers: '#E6005C',
                intervals: {
                    '1': '#FFB3DD',
                    'b2': '#FF99D1',
                    '2': '#FF80C4',
                    'b3': '#FF66B8',
                    '3': '#FF4DAC',
                    '4': '#FF33A0',
                    'b5': '#FF1A94',
                    '5': '#FF0088',
                    '#5': '#E6007A',
                    '6': '#CC006C',
                    'b7': '#B3005F',
                    '7': '#990051'
                }
            },
            fireAndIce: {
                background: '#200122',
                strings: '#6A82FB',
                frets: '#FC5C7D',
                markers: '#FFFFFF',
                intervals: {
                    '1': '#FC5C7D',
                    'b2': '#E36387',
                    '2': '#CA6A91',
                    'b3': '#B1719B',
                    '3': '#9878A5',
                    '4': '#7F7FAF',
                    'b5': '#6686B9',
                    '5': '#4D8DC3',
                    '#5': '#3494CD',
                    '6': '#1B9BD7',
                    'b7': '#02A2E1',
                    '7': '#6A82FB'
                }
            },
            watermelon: {
                background: '#FFE6E6',
                strings: '#FF5252',
                frets: '#69F0AE',
                markers: '#388E3C',
                intervals: {
                    '1': '#FF5252',
                    'b2': '#FF6E6E',
                    '2': '#FF8A8A',
                    'b3': '#FFA6A6',
                    '3': '#FFC2C2',
                    '4': '#69F0AE',
                    'b5': '#51F0A2',
                    '5': '#39F097',
                    '#5': '#21F08B',
                    '6': '#09F080',
                    'b7': '#09D874',
                    '7': '#09C068'
                }
            },
            nordic: {
                background: '#D0E2F2',
                strings: '#23395B',
                frets: '#406E8E',
                markers: '#8EA8C3',
                intervals: {
                    '1': '#23395B',
                    'b2': '#304B71',
                    '2': '#3D5C87',
                    'b3': '#4A6E9D',
                    '3': '#5780B3',
                    '4': '#6492C9',
                    'b5': '#83A5D1',
                    '5': '#A2B8D9',
                    '#5': '#C1CBE1',
                    '6': '#E0DEE9',
                    'b7': '#EEE0E0',
                    '7': '#FCE2D7'
                }
            },
            flamingo: {
                background: '#FF9A8B',
                strings: '#FF6A88',
                frets: '#FF8066',
                markers: '#FF99AC',
                intervals: {
                    '1': '#FF9A8B',
                    'b2': '#FF938C',
                    '2': '#FF8C8D',
                    'b3': '#FF858E',
                    '3': '#FF7E8F',
                    '4': '#FF7790',
                    'b5': '#FF7091',
                    '5': '#FF6992',
                    '#5': '#FF6293',
                    '6': '#FF5B94',
                    'b7': '#FF5495',
                    '7': '#FF4D96'
                }
            },
            sakura: {
                background: '#FFD9E8',
                strings: '#FFB3CD',
                frets: '#FF8EB2',
                markers: '#FF6997',
                intervals: {
                    '1': '#FFD9E8',
                    'b2': '#FFCEE3',
                    '2': '#FFC3DE',
                    'b3': '#FFB8D9',
                    '3': '#FFADD4',
                    '4': '#FFA3CF',
                    'b5': '#FF98CA',
                    '5': '#FF8DC5',
                    '#5': '#FF82C0',
                    '6': '#FF77BB',
                    'b7': '#FF6DB6',
                    '7': '#FF62B1'
                }
            },
            steampunk: {
                background: '#5C4033',
                strings: '#DAA520',
                frets: '#8B4513',
                markers: '#CD853F',
                intervals: {
                    '1': '#FFD700',
                    'b2': '#EECFA1',
                    '2': '#D2B48C',
                    'b3': '#B8860B',
                    '3': '#CD853F',
                    '4': '#A0522D',
                    'b5': '#8B4513',
                    '5': '#654321',
                    '#5': '#5C4033',
                    '6': '#800000',
                    'b7': '#8B0000',
                    '7': '#A52A2A'
                }
            },
            galaxy: {
                background: '#0C0032',
                strings: '#3500D3',
                frets: '#190061',
                markers: '#240090',
                intervals: {
                    '1': '#282828',
                    'b2': '#0C0032',
                    '2': '#190061',
                    'b3': '#240090',
                    '3': '#3500D3',
                    '4': '#4600F1',
                    'b5': '#601EFF',
                    '5': '#853CFF',
                    '#5': '#AA5AFF',
                    '6': '#CF78FF',
                    'b7': '#F496FF',
                    '7': '#FAB4FF'
                }
            },
            citrus: {
                background: '#F0FFF0',
                strings: '#FFA500',
                frets: '#FF8C00',
                markers: '#FF7F50',
                intervals: {
                    '1': '#FFFF00',
                    'b2': '#FFEF00',
                    '2': '#FFDF00',
                    'b3': '#FFCF00',
                    '3': '#FFBF00',
                    '4': '#FFAF00',
                    'b5': '#FF9F00',
                    '5': '#FF8F00',
                    '#5': '#FF7F00',
                    '6': '#FF6F00',
                    'b7': '#FF5F00',
                    '7': '#FF4F00'
                }
            },
            peacock: {
                background: '#F0F8FF',
                strings: '#00A693',
                frets: '#2F4F4F',
                markers: '#48D1CC',
                intervals: {
                    '1': '#5F9EA0',
                    'b2': '#66CDAA',
                    '2': '#20B2AA',
                    'b3': '#48D1CC',
                    '3': '#40E0D0',
                    '4': '#00CED1',
                    'b5': '#00BFFF',
                    '5': '#1E90FF',
                    '#5': '#4169E1',
                    '6': '#0000CD',
                    'b7': '#000080',
                    '7': '#191970'
                }
            },
            cotton: {
                background: '#FFFFFF',
                strings: '#FFCCCC',
                frets: '#CCFFCC',
                markers: '#CCCCFF',
                intervals: {
                    '1': '#FFCCCC',
                    'b2': '#FFDDCC',
                    '2': '#FFEEBB',
                    'b3': '#FFFFCC',
                    '3': '#EEFFCC',
                    '4': '#DDFFCC',
                    'b5': '#CCFFCC',
                    '5': '#CCFFDD',
                    '#5': '#CCFFEE',
                    '6': '#CCFFFF',
                    'b7': '#CCDDFF',
                    '7': '#CCCCFF'
                }
            },
            aquarium: {
                background: '#E0FFFF',
                strings: '#20B2AA',
                frets: '#5F9EA0',
                markers: '#008080',
                intervals: {
                    '1': '#00FFFF',
                    'b2': '#00E5FF',
                    '2': '#00CCFF',
                    'b3': '#00B2FF',
                    '3': '#0099FF',
                    '4': '#007FFF',
                    'b5': '#0066FF',
                    '5': '#004CFF',
                    '#5': '#0033FF',
                    '6': '#0019FF',
                    'b7': '#0000FF',
                    '7': '#0000E5'
                }
            },
            darkMode: {
                background: '#121212',
                strings: '#333333',
                frets: '#666666',
                markers: '#AAAAAA',
                intervals: {
                    '1': '#BB86FC',
                    'b2': '#3700B3',
                    '2': '#6200EE',
                    'b3': '#03DAC6',
                    '3': '#018786',
                    '4': '#CF6679',
                    'b5': '#B00020',
                    '5': '#E6E6E6',
                    '#5': '#BABABA',
                    '6': '#8E8E8E',
                    'b7': '#626262',
                    '7': '#363636'
                }
            },
            blueprint: {
                background: '#002B49',
                strings: '#00B2CA',
                frets: '#FFFFFF',
                markers: '#7DCFB6',
                intervals: {
                    '1': '#00B2CA',
                    'b2': '#1DBAB0',
                    '2': '#3BC397',
                    'b3': '#58CB7D',
                    '3': '#76D264',
                    '4': '#94DA4A',
                    'b5': '#B2E131',
                    '5': '#D0E917',
                    '#5': '#EDF100',
                    '6': '#FBD407',
                    'b7': '#F9A11B',
                    '7': '#F76F2E'
                }
            },
            candlelight: {
                background: '#F5D0A9',
                strings: '#FF8000',
                frets: '#B45F04',
                markers: '#8A4B08',
                intervals: {
                    '1': '#FE9A2E',
                    'b2': '#FE9A2E',
                    '2': '#FA8258',
                    'b3': '#F7BE81',
                    '3': '#F5D0A9',
                    '4': '#F3E2A9',
                    'b5': '#F2F5A9',
                    '5': '#D0F5A9',
                    '#5': '#A9F5A9',
                    '6': '#A9F5D0',
                    'b7': '#A9F5F2',
                    '7': '#A9D0F5'
                }
            },
            nightSky: {
                background: '#0B0C10',
                strings: '#1F2833',
                frets: '#C5C6C7',
                markers: '#66FCF1',
                intervals: {
                    '1': '#45A29E',
                    'b2': '#4AA49B',
                    '2': '#50A697',
                    'b3': '#55A894',
                    '3': '#5AAA90',
                    '4': '#60AC8D',
                    'b5': '#65AE89',
                    '5': '#6AB086',
                    '#5': '#70B282',
                    '6': '#75B47F',
                    'b7': '#7BB67B',
                    '7': '#80B878'
                }
            },
            freshMint: {
                background: '#F5FFFA',
                strings: '#40E0D0',
                frets: '#48D1CC',
                markers: '#00CED1',
                intervals: {
                    '1': '#40E0D0',
                    'b2': '#48D1CC',
                    '2': '#00CED1',
                    'b3': '#20B2AA',
                    '3': '#5F9EA0',
                    '4': '#008B8B',
                    'b5': '#008080',
                    '5': '#006400',
                    '#5': '#556B2F',
                    '6': '#8E8E8E',
                    'b7': '#66CDAA',
                    '7': '#3CB371'
                }
            },
            daylight: {
                background: '#F7F7F7',
                strings: '#FFD700',
                frets: '#FFA500',
                markers: '#FF8C00',
                intervals: {
                    '1': '#FDB813',
                    'b2': '#FDC220',
                    '2': '#FDCD2D',
                    'b3': '#FDD83A',
                    '3': '#FFE082',
                    '4': '#FFECB3',
                    'b5': '#FFF8E1',
                    '5': '#FFFDE7',
                    '#5': '#FFFDE7',
                    '6': '#F9EAE1',
                    'b7': '#F5DDF0',
                    '7': '#F1D1FF'
                }
            },
            aurora: {
                background: '#120136',
                strings: '#035AA6',
                frets: '#40BAD5',
                markers: '#60DB5C',
                intervals: {
                    '1': '#120136',
                    'b2': '#231651',
                    '2': '#352B6C',
                    'b3': '#474187',
                    '3': '#5956A2',
                    '4': '#6B6BBD',
                    'b5': '#7D7FD8',
                    '5': '#8F94F3',
                    '#5': '#A1A9FF',
                    '6': '#B3A9DE',
                    'b7': '#C5A8BD',
                    '7': '#D7A89C'
                }
            },
            velvet: {
                background: '#240A34',
                strings: '#420D5F',
                frets: '#7B337D',
                markers: '#C04ABC',
                intervals: {
                    '1': '#240A34',
                    'b2': '#341447',
                    '2': '#441E5A',
                    'b3': '#54286D',
                    '3': '#643280',
                    '4': '#743C93',
                    'b5': '#8446A6',
                    '5': '#9450B9',
                    '#5': '#A45ACC',
                    '6': '#B464DF',
                    'b7': '#C46EF2',
                    '7': '#D478FF'
                }
            },
            mustard: {
                background: '#FFDB58',
                strings: '#EEBA30',
                frets: '#C49102',
                markers: '#AA7700',
                intervals: {
                    '1': '#FFDB58',
                    'b2': '#FFD24A',
                    '2': '#FFC93C',
                    'b3': '#FFC02E',
                    '3': '#FFB720',
                    '4': '#FFAE12',
                    'b5': '#FFA504',
                    '5': '#F49700',
                    '#5': '#E38900',
                    '6': '#D27B00',
                    'b7': '#C16D00',
                    '7': '#B05F00'
                }
            },
            vaporwave: {
                background: '#91D8F7',
                strings: '#FF71CE',
                frets: '#01CDFE',
                markers: '#05FFA1',
                intervals: {
                    '1': '#FF71CE',
                    'b2': '#FF75C6',
                    '2': '#FF79BF',
                    'b3': '#FF7DB7',
                    '3': '#FF81AF',
                    '4': '#FF85A8',
                    'b5': '#FF89A0',
                    '5': '#FF8D98',
                    '#5': '#FF9191',
                    '6': '#FF9589',
                    'b7': '#FF9981',
                    '7': '#FF9D7A'
                }
            },
            terra: {
                background: '#E2DBBE',
                strings: '#D5A021',
                frets: '#A47551',
                markers: '#2E2300',
                intervals: {
                    '1': '#E2DBBE',
                    'b2': '#CEBD93',
                    '2': '#BA9D68',
                    'b3': '#A67D3D',
                    '3': '#925D12',
                    '4': '#7E4E00',
                    'b5': '#654000',
                    '5': '#4C3100',
                    '#5': '#332300',
                    '6': '#191200',
                    'b7': '#000000',
                    '7': '#332323'
                }
            },
            royalty: {
                background: '#4B0082',
                strings: '#8A2BE2',
                frets: '#9370DB',
                markers: '#BA55D3',
                intervals: {
                    '1': '#4B0082',
                    'b2': '#590BA0',
                    '2': '#6716BE',
                    'b3': '#7521DC',
                    '3': '#832DFA',
                    '4': '#914EFF',
                    'b5': '#A06FFF',
                    '5': '#AE90FF',
                    '#5': '#BCB1FF',
                    '6': '#CAD2FF',
                    'b7': '#D8F3FF',
                    '7': '#E6FFFF'
                }
            },
            rustic: {
                background: '#F4A460',
                strings: '#8B4513',
                frets: '#A52A2A',
                markers: '#654321',
                intervals: {
                    '1': '#F4A460',
                    'b2': '#E9A066',
                    '2': '#DE9B6D',
                    'b3': '#D39774',
                    '3': '#C8927B',
                    '4': '#BD8E82',
                    'b5': '#B28989',
                    '5': '#A78490',
                    '#5': '#9C8097',
                    '6': '#917B9E',
                    'b7': '#8677A5',
                    '7': '#7B72AC'
                }
            },
            jade: {
                background: '#00A86B',
                strings: '#007D51',
                frets: '#006442',
                markers: '#004D33',
                intervals: {
                    '1': '#00A86B',
                    'b2': '#00B06E',
                    '2': '#00B971',
                    'b3': '#00C174',
                    '3': '#00CA77',
                    '4': '#00D27A',
                    'b5': '#00DB7D',
                    '5': '#00E480',
                    '#5': '#00EC83',
                    '6': '#00F586',
                    'b7': '#00FD89',
                    '7': '#40FF98'
                }
            },
            summer: {
                background: '#F4D03F',
                strings: '#16A085',
                frets: '#E74C3C',
                markers: '#8E44AD',
                intervals: {
                    '1': '#F4D03F',
                    'b2': '#F39C12',
                    '2': '#E67E22',
                    'b3': '#D35400',
                    '3': '#C0392B',
                    '4': '#9B59B6',
                    'b5': '#8E44AD',
                    '5': '#2980B9',
                    '#5': '#3498DB',
                    '6': '#1ABC9C',
                    'b7': '#16A085',
                    '7': '#27AE60'
                }
            },
            winter: {
                background: '#F1F2F6',
                strings: '#A5B1C2',
                frets: '#4B6584',
                markers: '#0097E6',
                intervals: {
                    '1': '#F1F2F6',
                    'b2': '#DFE4EA',
                    '2': '#CED6E0',
                    'b3': '#A5B1C2',
                    '3': '#8395A7',
                    '4': '#718093',
                    'b5': '#4B6584',
                    '5': '#2C3A47',
                    '#5': '#1E272E',
                    '6': '#0097E6',
                    'b7': '#00A8FF',
                    '7': '#0ABDE3'
                }
            },
            orchid: {
                background: '#DA70D6',
                strings: '#BA55D3',
                frets: '#9932CC',
                markers: '#8B008B',
                intervals: {
                    '1': '#DA70D6',
                    'b2': '#DB62D8',
                    '2': '#DC54DA',
                    'b3': '#DD46DC',
                    '3': '#DE38DE',
                    '4': '#DF2AE0',
                    'b5': '#E01CE2',
                    '5': '#E10EE4',
                    '#5': '#E200E6',
                    '6': '#D400D8',
                    'b7': '#C700CA',
                    '7': '#BA00BC'
                }
            },
            orchard: {
                background: '#DAC292',
                strings: '#8B4513',
                frets: '#5D4037',
                markers: '#3E2723',
                intervals: {
                    '1': '#FF5252',
                    'b2': '#FF7F50',
                    '2': '#FFD700',
                    'b3': '#9ACD32',
                    '3': '#4CAF50',
                    '4': '#00BCD4',
                    'b5': '#2196F3',
                    '5': '#3F51B5',
                    '#5': '#9C27B0',
                    '6': '#E91E63',
                    'b7': '#FF4081',
                    '7': '#FF6E40'
                }
            },
            mahogany: {
                background: '#C04000',
                strings: '#FFDEAD',
                frets: '#8B4513',
                markers: '#FFF8DC',
                intervals: {
                    '1': '#FFEB3B',
                    'b2': '#FFC107',
                    '2': '#FF9800',
                    'b3': '#FF5722',
                    '3': '#F44336',
                    '4': '#E91E63',
                    'b5': '#9C27B0',
                    '5': '#673AB7',
                    '#5': '#3F51B5',
                    '6': '#2196F3',
                    'b7': '#03A9F4',
                    '7': '#00BCD4'
                }
            },
            walnut: {
                background: '#5D4037',
                strings: '#D7CCC8',
                frets: '#3E2723',
                markers: '#BCAAA4',
                intervals: {
                    '1': '#FFCDD2',
                    'b2': '#F8BBD0',
                    '2': '#E1BEE7',
                    'b3': '#D1C4E9',
                    '3': '#C5CAE9',
                    '4': '#BBDEFB',
                    'b5': '#B2EBF2',
                    '5': '#B2DFDB',
                    '#5': '#B2FF59',
                    '6': '#C8E6C9',
                    'b7': '#DCEDC8',
                    '7': '#F0F4C3'
                }
            },
            cherry: {
                background: '#B71C1C',
                strings: '#FFD54F',
                frets: '#6D4C41',
                markers: '#FFF9C4',
                intervals: {
                    '1': '#FFFFFF',
                    'b2': '#EEEEEE',
                    '2': '#E0E0E0',
                    'b3': '#BDBDBD',
                    '3': '#9E9E9E',
                    '4': '#757575',
                    'b5': '#616161',
                    '5': '#424242',
                    '#5': '#212121',
                    '6': '#FFFFFF',
                    'b7': '#EEEEEE',
                    '7': '#E0E0E0'
                }
            },
            oak: {
                background: '#D7CCC8',
                strings: '#5D4037',
                frets: '#4E342E',
                markers: '#3E2723',
                intervals: {
                    '1': '#EF5350',
                    'b2': '#EC407A',
                    '2': '#AB47BC',
                    'b3': '#7E57C2',
                    '3': '#5C6BC0',
                    '4': '#42A5F5',
                    'b5': '#29B6F6',
                    '5': '#26C6DA',
                    '#5': '#26A69A',
                    '6': '#66BB6A',
                    'b7': '#9CCC65',
                    '7': '#D4E157'
                }
            },
            maple: {
                background: '#FFCC80',
                strings: '#A1887F',
                frets: '#8D6E63',
                markers: '#6D4C41',
                intervals: {
                    '1': '#EF9A9A',
                    'b2': '#F48FB1',
                    '2': '#CE93D8',
                    'b3': '#B39DDB',
                    '3': '#9FA8DA',
                    '4': '#90CAF9',
                    'b5': '#81D4FA',
                    '5': '#80DEEA',
                    '#5': '#80CBC4',
                    '6': '#A5D6A7',
                    'b7': '#C5E1A5',
                    '7': '#E6EE9C'
                }
            },
            zebrawood: {
                background: '#E0E0E0',
                strings: '#616161',
                frets: '#424242',
                markers: '#212121',
                intervals: {
                    '1': '#2E7D32',
                    'b2': '#388E3C',
                    '2': '#43A047',
                    'b3': '#4CAF50',
                    '3': '#66BB6A',
                    '4': '#81C784',
                    'b5': '#A5D6A7',
                    '5': '#C8E6C9',
                    '#5': '#E8F5E9',
                    '6': '#F1F8E9',
                    'b7': '#F9FBE7',
                    '7': '#FFF8E1'
                }
            },
            rosewood: {
                background: '#5D4037',
                strings: '#FFECB3',
                frets: '#4E342E',
                markers: '#FFCC80',
                intervals: {
                    '1': '#FF5722',
                    'b2': '#FF7043',
                    '2': '#FF8A65',
                    'b3': '#FFAB91',
                    '3': '#FFCCBC',
                    '4': '#FBE9E7',
                    'b5': '#FFCC80',
                    '5': '#FFE0B2',
                    '#5': '#FFF3E0',
                    '6': '#FFF8E1',
                    'b7': '#FFECB3',
                    '7': '#FFE082'
                }
            },
            ebony: {
                background: '#212121',
                strings: '#757575',
                frets: '#424242',
                markers: '#BDBDBD',
                intervals: {
                    '1': '#FAFAFA',
                    'b2': '#F5F5F5',
                    '2': '#EEEEEE',
                    'b3': '#E0E0E0',
                    '3': '#BDBDBD',
                    '4': '#9E9E9E',
                    'b5': '#757575',
                    '5': '#616161',
                    '#5': '#424242',
                    '6': '#BDBDBD',
                    'b7': '#9E9E9E',
                    '7': '#757575'
                }
            },
            koa: {
                background: '#A1887F',
                strings: '#FFECB3',
                frets: '#795548',
                markers: '#D7CCC8',
                intervals: {
                    '1': '#FFA000',
                    'b2': '#FFB300',
                    '2': '#FFC107',
                    'b3': '#FFCA28',
                    '3': '#FFD54F',
                    '4': '#FFE082',
                    'b5': '#FFECB3',
                    '5': '#FFF8E1',
                    '#5': '#FFFDE7',
                    '6': '#F9FBE7',
                    'b7': '#F0F4C3',
                    '7': '#E6EE9C'
                }
            },
            padauk: {
                background: '#BF360C',
                strings: '#FFD54F',
                frets: '#8D6E63',
                markers: '#FFECB3',
                intervals: {
                    '1': '#FFCDD2',
                    'b2': '#EF9A9A',
                    '2': '#E57373',
                    'b3': '#EF5350',
                    '3': '#F44336',
                    '4': '#E53935',
                    'b5': '#D32F2F',
                    '5': '#C62828',
                    '#5': '#B71C1C',
                    '6': '#FF8A80',
                    'b7': '#FF5252',
                    '7': '#FF1744'
                }
            },
            purpleheart: {
                background: '#6A1B9A',
                strings: '#CE93D8',
                frets: '#4A148C',
                markers: '#E1BEE7',
                intervals: {
                    '1': '#F3E5F5',
                    'b2': '#E1BEE7',
                    '2': '#CE93D8',
                    'b3': '#BA68C8',
                    '3': '#AB47BC',
                    '4': '#9C27B0',
                    'b5': '#8E24AA',
                    '5': '#7B1FA2',
                    '#5': '#6A1B9A',
                    '6': '#4A148C',
                    'b7': '#EA80FC',
                    '7': '#E040FB'
                }
            },
            bubinga: {
                background: '#8D6E63',
                strings: '#FFECB3',
                frets: '#6D4C41',
                markers: '#F5F5F5',
                intervals: {
                    '1': '#FFAB91',
                    'b2': '#FF8A65',
                    '2': '#FF7043',
                    'b3': '#FF5722',
                    '3': '#F4511E',
                    '4': '#E64A19',
                    'b5': '#D84315',
                    '5': '#BF360C',
                    '#5': '#DD2C00',
                    '6': '#FF3D00',
                    'b7': '#E60000',
                    '7': '#DC143C'
                }
            },
            wenge: {
                background: '#3E2723',
                strings: '#8D6E63',
                frets: '#212121',
                markers: '#D7CCC8',
                intervals: {
                    '1': '#A1887F',
                    'b2': '#8D6E63',
                    '2': '#795548',
                    'b3': '#6D4C41',
                    '3': '#5D4037',
                    '4': '#4E342E',
                    'b5': '#3E2723',
                    '5': '#BCAAA4',
                    '#5': '#A1887F',
                    '6': '#8D6E63',
                    'b7': '#795548',
                    '7': '#6D4C41'
                }
            },
            sapele: {
                background: '#8D6E63',
                strings: '#FFD54F',
                frets: '#6D4C41',
                markers: '#FFF8E1',
                intervals: {
                    '1': '#FFAB91',
                    'b2': '#FFCCBC',
                    '2': '#FFAB91',
                    'b3': '#FF8A65',
                    '3': '#FF7043',
                    '4': '#FF5722',
                    'b5': '#F4511E',
                    '5': '#E64A19',
                    '#5': '#D84315',
                    '6': '#BF360C',
                    'b7': '#FF9E80',
                    '7': '#FF6E40'
                }
            },
            blackwood: {
                background: '#212121',
                strings: '#9E9E9E',
                frets: '#424242',
                markers: '#E0E0E0',
                intervals: {
                    '1': '#E0E0E0',
                    'b2': '#BDBDBD',
                    '2': '#9E9E9E',
                    'b3': '#757575',
                    '3': '#616161',
                    '4': '#424242',
                    'b5': '#FF9E80',
                    '5': '#FF6F00',
                    '#5': '#FF3D00',
                    '6': '#DD2C00',
                    'b7': '#BF360C',
                    '7': '#D84315'
                }
            },
            pinewood: {
                background: '#FFE0B2',
                strings: '#FF9800',
                frets: '#F57C00',
                markers: '#E65100',
                intervals: {
                    '1': '#FFCC80',
                    'b2': '#FFB74D',
                    '2': '#FFA726',
                    'b3': '#FF9800',
                    '3': '#FB8C00',
                    '4': '#F57C00',
                    'b5': '#EF6C00',
                    '5': '#E65100',
                    '#5': '#BF360C',
                    '6': '#D84315',
                    'b7': '#E64A19',
                    '7': '#F4511E'
                }
            },
            alder: {
                background: '#BCAAA4',
                strings: '#795548',
                frets: '#5D4037',
                markers: '#3E2723',
                intervals: {
                    '1': '#8BC34A',
                    'b2': '#7CB342',
                    '2': '#689F38',
                    'b3': '#558B2F',
                    '3': '#33691E',
                    '4': '#DCEDC8',
                    'b5': '#C5E1A5',
                    '5': '#AED581',
                    '#5': '#9CCC65',
                    '6': '#8BC34A',
                    'b7': '#7CB342',
                    '7': '#689F38'
                }
            },
            ash: {
                background: '#ECEFF1',
                strings: '#607D8B',
                frets: '#455A64',
                markers: '#263238',
                intervals: {
                    '1': '#CFD8DC',
                    'b2': '#B0BEC5',
                    '2': '#90A4AE',
                    'b3': '#78909C',
                    '3': '#607D8B',
                    '4': '#546E7A',
                    'b5': '#455A64',
                    '5': '#37474F',
                    '#5': '#263238',
                    '6': '#CFD8DC',
                    'b7': '#B0BEC5',
                    '7': '#90A4AE'
                }
            },
            bamboo: {
                background: '#F0F4C3',
                strings: '#AFB42B',
                frets: '#9E9D24',
                markers: '#827717',
                intervals: {
                    '1': '#F9FBE7',
                    'b2': '#F0F4C3',
                    '2': '#E6EE9C',
                    'b3': '#DCE775',
                    '3': '#D4E157',
                    '4': '#CDDC39',
                    'b5': '#C0CA33',
                    '5': '#AFB42B',
                    '#5': '#9E9D24',
                    '6': '#827717',
                    'b7': '#F4FF81',
                    '7': '#EEFF41'
                }
            },
            cedar: {
                background: '#A1887F',
                strings: '#D7CCC8',
                frets: '#6D4C41',
                markers: '#4E342E',
                intervals: {
                    '1': '#FFAB91',
                    'b2': '#FF8A65',
                    '2': '#FF7043',
                    'b3': '#FF5722',
                    '3': '#F4511E',
                    '4': '#E64A19',
                    'b5': '#D84315',
                    '5': '#BF360C',
                    '#5': '#DD2C00',
                    '6': '#FFAB91',
                    'b7': '#FF8A65',
                    '7': '#FF7043'
                }
            },
            redwood: {
                background: '#BF360C',
                strings: '#FFAB91',
                frets: '#8D6E63',
                markers: '#FBE9E7',
                intervals: {
                    '1': '#FFAB91',
                    'b2': '#FF8A65',
                    '2': '#FF7043',
                    'b3': '#FF5722',
                    '3': '#F4511E',
                    '4': '#FBE9E7',
                    'b5': '#FFCCBC',
                    '5': '#FFAB91',
                    '#5': '#FF8A65',
                    '6': '#FF7043',
                    'b7': '#FF5722',
                    '7': '#F4511E'
                }
            },
            butternut: {
                background: '#FFE0B2',
                strings: '#FFB74D',
                frets: '#FF9800',
                markers: '#E65100',
                intervals: {
                    '1': '#FFFDE7',
                    'b2': '#FFF9C4',
                    '2': '#FFF59D',
                    'b3': '#FFF176',
                    '3': '#FFEE58',
                    '4': '#FFEB3B',
                    'b5': '#FDD835',
                    '5': '#FBC02D',
                    '#5': '#F9A825',
                    '6': '#F57F17',
                    'b7': '#FFD600',
                    '7': '#FFEA00'
                }
            },
            ziricote: {
                background: '#424242',
                strings: '#9E9E9E',
                frets: '#212121',
                markers: '#F5F5F5',
                intervals: {
                    '1': '#BDBDBD',
                    'b2': '#9E9E9E',
                    '2': '#757575',
                    'b3': '#616161',
                    '3': '#424242',
                    '4': '#FF5722',
                    'b5': '#F4511E',
                    '5': '#E64A19',
                    '#5': '#D84315',
                    '6': '#BF360C',
                    'b7': '#FF9E80',
                    '7': '#FF6E40'
                }
            },
            bocote: {
                background: '#A1887F',
                strings: '#FFECB3',
                frets: '#6D4C41',
                markers: '#D7CCC8',
                intervals: {
                    '1': '#FFECB3',
                    'b2': '#FFE082',
                    '2': '#FFD54F',
                    'b3': '#FFCA28',
                    '3': '#FFC107',
                    '4': '#FFB300',
                    'b5': '#FFA000',
                    '5': '#FF8F00',
                    '#5': '#FF6F00',
                    '6': '#FFF8E1',
                    'b7': '#FFECB3',
                    '7': '#FFE082'
                }
            },
            blacklimba: {
                background: '#424242',
                strings: '#BDBDBD',
                frets: '#212121',
                markers: '#F5F5F5',
                intervals: {
                    '1': '#FFC107',
                    'b2': '#FFB300',
                    '2': '#FFA000',
                    'b3': '#FF8F00',
                    '3': '#FF6F00',
                    '4': '#FFD54F',
                    'b5': '#FFCA28',
                    '5': '#FFC107',
                    '#5': '#FFB300',
                    '6': '#FFA000',
                    'b7': '#FF8F00',
                    '7': '#FF6F00'
                }
            },
            canary: {
                background: '#FFF59D',
                strings: '#FBC02D',
                frets: '#F9A825',
                markers: '#F57F17',
                intervals: {
                    '1': '#FFFDE7',
                    'b2': '#FFF9C4',
                    '2': '#FFF59D',
                    'b3': '#FFF176',
                    '3': '#FFEE58',
                    '4': '#FFEB3B',
                    'b5': '#FDD835',
                    '5': '#FBC02D',
                    '#5': '#F9A825',
                    '6': '#F57F17',
                    'b7': '#FFD600',
                    '7': '#FFEA00'
                }
            },
            beech: {
                background: '#D7CCC8',
                strings: '#8D6E63',
                frets: '#5D4037',
                markers: '#BCAAA4',
                intervals: {
                    '1': '#BCAAA4',
                    'b2': '#A1887F',
                    '2': '#8D6E63',
                    'b3': '#795548',
                    '3': '#6D4C41',
                    '4': '#5D4037',
                    'b5': '#4E342E',
                    '5': '#3E2723',
                    '#5': '#D7CCC8',
                    '6': '#BCAAA4',
                    'b7': '#A1887F',
                    '7': '#8D6E63'
                }
            },
            hickory: {
                background: '#BCAAA4',
                strings: '#5D4037',
                frets: '#4E342E',
                markers: '#3E2723',
                intervals: {
                    '1': '#A1887F',
                    'b2': '#8D6E63',
                    '2': '#795548',
                    'b3': '#6D4C41',
                    '3': '#5D4037',
                    '4': '#4E342E',
                    'b5': '#3E2723',
                    '5': '#EFEBE9',
                    '#5': '#D7CCC8',
                    '6': '#BCAAA4',
                    'b7': '#A1887F',
                    '7': '#8D6E63'
                }
            },
            macassar: {
                background: '#4E342E',
                strings: '#A1887F',
                frets: '#3E2723',
                markers: '#D7CCC8',
                intervals: {
                    '1': '#D7CCC8',
                    'b2': '#BCAAA4',
                    '2': '#A1887F',
                    'b3': '#8D6E63',
                    '3': '#795548',
                    '4': '#6D4C41',
                    'b5': '#5D4037',
                    '5': '#4E342E',
                    '#5': '#3E2723',
                    '6': '#D7CCC8',
                    'b7': '#BCAAA4',
                    '7': '#A1887F'
                }
            },
            sitka: {
                background: '#FFE0B2',
                strings: '#FFA726',
                frets: '#F57C00',
                markers: '#E65100',
                intervals: {
                    '1': '#FFFDE7',
                    'b2': '#FFF9C4',
                    '2': '#FFF59D',
                    'b3': '#FFF176',
                    '3': '#FFEE58',
                    '4': '#FFEB3B',
                    'b5': '#FDD835',
                    '5': '#FBC02D',
                    '#5': '#F9A825',
                    '6': '#F57F17',
                    'b7': '#FFD600',
                    '7': '#FFEA00'
                }
            },
            cocobolo: {
                background: '#BF360C',
                strings: '#FFCC80',
                frets: '#E65100',
                markers: '#FFECB3',
                intervals: {
                    '1': '#FF7043',
                    'b2': '#FF5722',
                    '2': '#F4511E',
                    'b3': '#E64A19',
                    '3': '#D84315',
                    '4': '#BF360C',
                    'b5': '#FFD54F',
                    '5': '#FFCA28',
                    '#5': '#FFC107',
                    '6': '#FFB300',
                    'b7': '#FFA000',
                    '7': '#FF8F00'
                }
            },
            pecan: {
                background: '#A1887F',
                strings: '#FFECB3',
                frets: '#795548',
                markers: '#FFCC80',
                intervals: {
                    '1': '#FFFDE7',
                    'b2': '#FFF9C4',
                    '2': '#FFF59D',
                    'b3': '#FFF176',
                    '3': '#FFEE58',
                    '4': '#FFEB3B',
                    'b5': '#FDD835',
                    '5': '#FBC02D',
                    '#5': '#F9A825',
                    '6': '#F57F17',
                    'b7': '#FFD600',
                    '7': '#FFEA00'
                }
            },
            tamo: {
                background: '#D7CCC8',
                strings: '#8D6E63',
                frets: '#5D4037',
                markers: '#BCAAA4',
                intervals: {
                    '1': '#D7CCC8',
                    'b2': '#BCAAA4',
                    '2': '#A1887F',
                    'b3': '#8D6E63',
                    '3': '#795548',
                    '4': '#6D4C41',
                    'b5': '#5D4037',
                    '5': '#4E342E',
                    '#5': '#3E2723',
                    '6': '#D7CCC8',
                    'b7': '#BCAAA4',
                    '7': '#A1887F'
                }
            },
            white: {
                background: '#FAFAFA',
                strings: '#9E9E9E',
                frets: '#616161',
                markers: '#212121',
                intervals: {
                    '1': '#E0E0E0',
                    'b2': '#BDBDBD',
                    '2': '#9E9E9E',
                    'b3': '#757575',
                    '3': '#616161',
                    '4': '#424242',
                    'b5': '#212121',
                    '5': '#F5F5F5',
                    '#5': '#EEEEEE',
                    '6': '#E0E0E0',
                    'b7': '#BDBDBD',
                    '7': '#9E9E9E'
                }
            },
            birch: {
                background: '#FFECB3',
                strings: '#FFA000',
                frets: '#FF8F00',
                markers: '#FF6F00',
                intervals: {
                    '1': '#FFF8E1',
                    'b2': '#FFECB3',
                    '2': '#FFE082',
                    'b3': '#FFD54F',
                    '3': '#FFCA28',
                    '4': '#FFC107',
                    'b5': '#FFB300',
                    '5': '#FFA000',
                    '#5': '#FF8F00',
                    '6': '#FF6F00',
                    'b7': '#FFE57F',
                    '7': '#FFD740'
                }
            },
            ovangkol: {
                background: '#8D6E63',
                strings: '#D7CCC8',
                frets: '#5D4037',
                markers: '#BCAAA4',
                intervals: {
                    '1': '#A1887F',
                    'b2': '#8D6E63',
                    '2': '#795548',
                    'b3': '#6D4C41',
                    '3': '#5D4037',
                    '4': '#4E342E',
                    'b5': '#3E2723',
                    '5': '#D7CCC8',
                    '#5': '#BCAAA4',
                    '6': '#A1887F',
                    'b7': '#8D6E63',
                    '7': '#795548'
                }
            },
            redmaple: {
                background: '#FFAB91',
                strings: '#E64A19',
                frets: '#BF360C',
                markers: '#FFCCBC',
                intervals: {
                    '1': '#FFCCBC',
                    'b2': '#FFAB91',
                    '2': '#FF8A65',
                    'b3': '#FF7043',
                    '3': '#FF5722',
                    '4': '#F4511E',
                    'b5': '#E64A19',
                    '5': '#D84315',
                    '#5': '#BF360C',
                    '6': '#3E2723',
                    'b7': '#5D4037',
                    '7': '#795548'
                }
            },
            lacewood: {
                background: '#BCAAA4',
                strings: '#6D4C41',
                frets: '#5D4037',
                markers: '#3E2723',
                intervals: {
                    '1': '#FFECB3',
                    'b2': '#FFE082',
                    '2': '#FFD54F',
                    'b3': '#FFCA28',
                    '3': '#FFC107',
                    '4': '#FFB300',
                    'b5': '#FFA000',
                    '5': '#FF8F00',
                    '#5': '#FF6F00',
                    '6': '#FFAB91',
                    'b7': '#FF8A65',
                    '7': '#FF7043'
                }
            },
            cypress: {
                background: '#D7CCC8',
                strings: '#8D6E63',
                frets: '#795548',
                markers: '#5D4037',
                intervals: {
                    '1': '#DCEDC8',
                    'b2': '#C5E1A5',
                    '2': '#AED581',
                    'b3': '#9CCC65',
                    '3': '#8BC34A',
                    '4': '#7CB342',
                    'b5': '#689F38',
                    '5': '#558B2F',
                    '#5': '#33691E',
                    '6': '#CCFF90',
                    'b7': '#B2FF59',
                    '7': '#76FF03'
                }
            }
        };
        
        // ... existing code ...
    }
    
    getRelatedModes(scaleId) {
        // Define relationships between parent scales and their modes
        const modeRelationships = {
            'major': {
                parent: 'major',
                modes: [
                    { id: 'major', name: 'Ionian (Major)' },
                    { id: 'dorian', name: 'Dorian' },
                    { id: 'phrygian', name: 'Phrygian' },
                    { id: 'lydian', name: 'Lydian' },
                    { id: 'mixolydian', name: 'Mixolydian' },
                    { id: 'natural_minor', name: 'Aeolian (Minor)' },
                    { id: 'locrian', name: 'Locrian' }
                ]
            },
            'melodic_minor': {
                parent: 'melodic_minor',
                modes: [
                    { id: 'melodic_minor', name: 'Melodic Minor' },
                    { id: 'dorian_flat_2', name: 'Dorian ♭2' },
                    { id: 'lydian_augmented', name: 'Lydian Augmented' },
                    { id: 'lydian_dominant', name: 'Lydian Dominant (Overtone)' },
                    { id: 'mixolydian_flat_6', name: 'Mixolydian ♭6' },
                    { id: 'locrian_sharp_2', name: 'Locrian ♯2' }, // Also known as Half-Diminished
                    { id: 'altered', name: 'Altered Scale (Super Locrian)' }
                ]
            },
            'harmonic_minor': {
                parent: 'harmonic_minor',
                modes: [
                    { id: 'harmonic_minor', name: 'Harmonic Minor' },
                    { id: 'locrian_natural_6', name: 'Locrian Natural 6' },
                    { id: 'ionian_sharp_5', name: 'Ionian ♯5' }, // Often called Ionian Augmented
                    { id: 'dorian_sharp_4', name: 'Dorian ♯4' }, // Romanian Minor
                    { id: 'phrygian_dominant', name: 'Phrygian Dominant' },
                    { id: 'lydian_sharp_2', name: 'Lydian ♯2' },
                    { id: 'altered_dominant', name: 'Altered Dominant bb7 (Super Locrian bb7)' }
                ]
            },
             // Add derived modes (modes of the Major scale)
             'dorian': { parent: 'major', index: 1 },
             'phrygian': { parent: 'major', index: 2 },
             'lydian': { parent: 'major', index: 3 },
             'mixolydian': { parent: 'major', index: 4 },
             'natural_minor': { parent: 'major', index: 5 },
             'locrian': { parent: 'major', index: 6 },
             // Add derived modes of Melodic Minor
             'dorian_flat_2': { parent: 'melodic_minor', index: 1 },
             'lydian_augmented': { parent: 'melodic_minor', index: 2 },
             'lydian_dominant': { parent: 'melodic_minor', index: 3 },
             'mixolydian_flat_6': { parent: 'melodic_minor', index: 4 },
             'locrian_sharp_2': { parent: 'melodic_minor', index: 5 },
             'altered': { parent: 'melodic_minor', index: 6 },
              // Add derived modes of Harmonic Minor
             'locrian_natural_6': { parent: 'harmonic_minor', index: 1 },
             'ionian_sharp_5': { parent: 'harmonic_minor', index: 2 },
             'dorian_sharp_4': { parent: 'harmonic_minor', index: 3 },
             'phrygian_dominant': { parent: 'harmonic_minor', index: 4 },
             'lydian_sharp_2': { parent: 'harmonic_minor', index: 5 },
             'altered_dominant': { parent: 'harmonic_minor', index: 6 }
        };

        const relationship = modeRelationships[scaleId];

        if (relationship) {
            // If it's a parent scale, return its own modes list
            if (relationship.modes) {
                return relationship.modes.map(mode => mode.name);
            }
            // If it's a derived mode, find its parent and return that parent's modes list
            else if (relationship.parent && modeRelationships[relationship.parent]?.modes) {
                 // Get the parent scale's modes
                 const parentModes = modeRelationships[relationship.parent].modes;
                 // Reorder modes to start from the current scale
                 const startIndex = relationship.index;
                 const reorderedModes = [
                     ...parentModes.slice(startIndex),
                     ...parentModes.slice(0, startIndex)
                 ];
                 return reorderedModes.map(mode => mode.name);
            }
        }

        // Return empty array if no modes are defined or found
        return [];
    }

    /**
     * Get chords built on each degree of a scale
     * @param {string} key - The root note of the scale
     * @param {string} scaleId - The ID of the scale
     * @param {number} numNotes - The number of notes in the chords (e.g., 3 for triads, 4 for 7th chords)
     * @returns {Array} - An array of chord names (e.g., ["C", "Dm", "Em", ...])
     */
    getRelatedChords(key, scaleId, numNotes = 3) {
        const scaleNotes = this.getScaleNotes(key, scaleId);
        if (!scaleNotes || scaleNotes.length === 0) {
            return [];
        }

        const relatedChords = [];
        const scaleLength = scaleNotes.length;

        for (let i = 0; i < scaleLength; i++) {
            const rootNote = scaleNotes[i];
            const chordNotes = [];
            const chordIntervals = [];

            // Build the chord by stacking thirds (or appropriate intervals for the chord type)
            for (let j = 0; j < numNotes; j++) {
                // Calculate the index of the next note in the scale (wrapping around)
                // For triads, we stack the root (0), 3rd (2), and 5th (4) scale degrees *relative to the current root*
                // For 7th chords, add the 7th (6) scale degree
                const noteIndex = (i + j * 2) % scaleLength;
                chordNotes.push(scaleNotes[noteIndex]);

                // Calculate the interval relative to the root note of the chord being built
                if (j > 0) {
                    const interval = this.getInterval(rootNote, scaleNotes[noteIndex]);
                    chordIntervals.push(interval);
                } else {
                    chordIntervals.push('1'); // Root is always '1'
                }
            }

            // Determine the chord quality based on the intervals
            const quality = this.getChordQualityFromIntervals(chordIntervals);
            relatedChords.push(`${rootNote}${quality}`);
        }

        return relatedChords;
    }

    /**
     * Determine chord quality (e.g., '', 'm', 'dim', 'aug') from intervals
     * @param {Array} intervals - Array of intervals relative to the root (e.g., ['1', '3', '5'])
     * @returns {string} Chord quality symbol
     */
    getChordQualityFromIntervals(intervals) {
        // Basic Triads (assuming first 3 intervals)
        const hasMajor3rd = intervals.includes('3');
        const hasMinor3rd = intervals.includes('b3');
        const hasPerfect5th = intervals.includes('5');
        const hasDiminished5th = intervals.includes('b5');
        const hasAugmented5th = intervals.includes('#5');
        const hasMajor7th = intervals.includes('7');
        const hasMinor7th = intervals.includes('b7');
        const hasDiminished7th = intervals.includes('6'); // Diminished 7th is enharmonic to major 6th interval

        // Handle 7th chords first
        if (intervals.length >= 4) {
            if (hasMajor3rd && hasPerfect5th && hasMajor7th) return 'maj7';
            if (hasMajor3rd && hasPerfect5th && hasMinor7th) return '7'; // Dominant 7th
            if (hasMinor3rd && hasPerfect5th && hasMinor7th) return 'm7';
            if (hasMinor3rd && hasDiminished5th && hasMinor7th) return 'm7b5'; // Half-diminished
            if (hasMinor3rd && hasDiminished5th && hasDiminished7th) return 'dim7';
            if (hasMajor3rd && hasAugmented5th && hasMinor7th) return 'aug7';
            if (hasMajor3rd && hasAugmented5th && hasMajor7th) return 'maj7#5';
            // Add more complex 7th chords if needed
        }

        // Handle Triads
        if (hasMajor3rd && hasPerfect5th) return ''; // Major
        if (hasMinor3rd && hasPerfect5th) return 'm'; // Minor
        if (hasMinor3rd && hasDiminished5th) return 'dim'; // Diminished
        if (hasMajor3rd && hasAugmented5th) return 'aug'; // Augmented

        // Fallback for sus chords or incomplete triads
        if (intervals.includes('4') && hasPerfect5th) return 'sus4';
        if (intervals.includes('2') && hasPerfect5th) return 'sus2';

        return '?'; // Unknown or incomplete chord
    }

    getExpectedNotes(tonic, count) {
        // Generate the expected note names (scale degrees) for a major scale starting at tonic.
        // Use only the letter part of the tonic and apply key signature accidentals.
        const musicalAlphabet = ['A','B','C','D','E','F','G'];
        let rootLetter = tonic[0];
        let startIndex = musicalAlphabet.indexOf(rootLetter);
        let keySig = this.keySignatures[tonic] || {};
        let expected = [];
        for (let i = 0; i < count; i++) {
            let letter = musicalAlphabet[(startIndex + i) % 7];
            let accidental = "";
            if(keySig[letter]) { accidental = keySig[letter]; }
            expected.push(letter + accidental);
        }
        return expected;
    }

    getExpectedNoteForDegree(tonic, degree) {
        // degree is a number 1 to 7 (e.g., for a minor 3rd, degree = 3)
        const musicalAlphabet = ['A','B','C','D','E','F','G'];
        let rootLetter = tonic[0];
        let startIndex = musicalAlphabet.indexOf(rootLetter);
        let letter = musicalAlphabet[(startIndex + degree - 1) % 7];
        let keySig = this.keySignatures[tonic] || {};
        let accidental = keySig[letter] || "";
        return letter + accidental;
    }

    adjustNoteToExpected(note, expected) {
        if (note === expected) return note;
        if (this.enharmonicPairs[note] && this.enharmonicPairs[note] === expected) {
             return expected;
        }
        return note;
    }

    getScaleNotes(key, scaleType) {
        if (!this.scales[scaleType]) {
            return [];
        }
        
        const keyIndex = this.notes.indexOf(key);
        if (keyIndex === -1) {
            return [];
        }
        
        const intervals = this.scales[scaleType].intervals;
        let computed = intervals.map(interval => this.getNoteFromInterval(key, interval));
        // Generate expected note names for the scale degrees based on the tonic key.
        let expected = this.getExpectedNotes(key, computed.length);
        
        let finalNotes = computed.map((n, i) => this.adjustNoteToExpected(n, expected[i]));
        return finalNotes;
    }

    getChordNotes(key, chordType) {
        if (!this.chords[chordType]) {
            return [];
        }
        
        const keyIndex = this.notes.indexOf(key);
        if (keyIndex === -1) {
            return [];
        }
        
        const intervals = this.chords[chordType].intervals;
        let computed = intervals.map(interval => this.getNoteFromInterval(key, interval));
        let expected = this.getExpectedNotes(key, computed.length);
        let finalNotes = computed.map((n, i) => this.adjustNoteToExpected(n, expected[i]));
        return finalNotes;
    }

    /**
     * Get a note based on a starting note and interval
     */
    getNoteFromInterval(startNote, interval) {
        const startIndex = this.notes.indexOf(startNote);
        if (startIndex === -1) {
            return null;
        }
        
        // Handle special case: map #2 to b3 (they're enharmonic equivalents)
        if (interval === '#2') {
            interval = 'b3';
        }
        
        const semitones = this.intervals[interval]?.semitones || 0;
        const noteIndex = (startIndex + semitones) % 12;
        return this.notes[noteIndex];
    }
    
    /**
     * Get interval between two notes
     */
    getInterval(startNote, endNote) {
        const startIndex = this.notes.indexOf(startNote);
        const endIndex = this.notes.indexOf(endNote);
        
        if (startIndex === -1 || endIndex === -1) {
            return null;
        }
        
        let semitones = (endIndex - startIndex + 12) % 12;
        
        // Find the interval based on semitones
        for (const [intervalName, data] of Object.entries(this.intervals)) {
            if (data.semitones === semitones) {
                return intervalName;
            }
        }
        
        return null;
    }
    
    /**
     * Get Roman numeral for a scale degree
     */
    getRomanNumeral(scaleDegree, isMajor = true) {
        const index = scaleDegree - 1;
        if (index < 0 || index >= 7) {
            return '';
        }
        
        return isMajor ? this.romanNumerals.major[index] : this.romanNumerals.minor[index];
    }
    
    /**
     * Get default tuning for a given number of strings
     */
    getDefaultTuning(stringCount) {
        // Return the standard tuning if it exists
        if (this.standardTunings[stringCount]) {
            return [...this.standardTunings[stringCount]];
        }
        
        // For non-standard string counts, generate something reasonable
        if (stringCount <= 3) {
            return Array(stringCount).fill().map((_, i) => {
                const index = (7 + i * 5) % 12; // Perfect 4ths
                return this.notes[index];
            });
        } else {
            // Add lower strings
            const baseTuning = [...this.standardTunings[6]]; // Guitar tuning
            
            if (stringCount < 6) {
                return baseTuning.slice(0, stringCount);
            } else {
                // Add lower strings
                const extraLow = Array(stringCount - 6).fill().map((_, i) => {
                    const noteIndex = (this.notes.indexOf('E') - (i + 1) * 5 + 12) % 12;
                    return this.notes[noteIndex];
                });
                return [...extraLow, ...baseTuning];
            }
        }
    }
    
    /**
     * Get the frequency for a note at a specific octave
     */
    getNoteFrequency(note, octave) {
        const A4 = 440; // A4 frequency in Hz
        const A4Index = this.notes.indexOf('A');
        const noteIndex = this.notes.indexOf(note);
        
        if (noteIndex === -1) return null;
        
        const halfStepsFromA4 = (noteIndex - A4Index) + (octave - 4) * 12;
        return A4 * Math.pow(2, halfStepsFromA4 / 12);
    }
    
    /**
     * Get chord based on a roman numeral and key.
     * If the roman numeral is uppercase, the chord is assumed to be major;
     * if lowercase, the chord is assumed to be minor.
     */
    getChordFromRoman(romanNumeral, key) {
        const majorScale = this.getScaleNotes(key, 'major');
        let numeral = romanNumeral.toUpperCase();
        let index = 0;
        switch (numeral) {
            case 'I':    index = 0; break;
            case 'II':   index = 1; break;
            case 'III':  index = 2; break;
            case 'IV':   index = 3; break;
            case 'V':    index = 4; break;
            case 'VI':   index = 5; break;
            case 'VII':  index = 6; break;
            default:     index = 0;
        }
        let chord = majorScale[index];
        // If the original numeral is lowercase, assume a minor chord.
        if (romanNumeral === romanNumeral.toLowerCase()) {
            chord += 'm';
        }
        return chord;
    }
}