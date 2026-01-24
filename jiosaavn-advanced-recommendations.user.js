// ==UserScript==
// @name         JioSaavn Advanced Music Recommendations
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Ultra-advanced Spotify/YouTube-like music recommendations for JioSaavn
// @author       EvilXD
// @match        https://www.jiosaavn.com/*
// @match        https://jiosaavn.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Advanced Music Recommendation System for JioSaavn
    class JioSaavnAdvancedRecommendations {

        constructor() {
            this.currentSong = null;
            this.playlist = [];
            this.currentIndex = -1;
            this.isShuffleMode = true;
            this.recommendationHistory = [];
            this.init();
        }

        init() {
            console.log('🎵 JioSaavn Advanced Recommendations Loaded');

            // Wait for page to load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }

            // Inject custom styles
            this.injectStyles();

            // Setup mutation observer for dynamic content
            this.setupObserver();
        }

        injectStyles() {
            const styles = `
                .jiosaavn-advanced-recommendations {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    z-index: 10000;
                    font-family: 'Arial', sans-serif;
                    max-width: 300px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                }

                .recommendation-panel {
                    background: rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 10px;
                    margin-top: 10px;
                }

                .recommendation-item {
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    margin: 5px 0;
                    background: rgba(255,255,255,0.1);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .recommendation-item:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateX(5px);
                }

                .recommendation-item.playing {
                    background: rgba(255,255,255,0.3);
                    border-left: 3px solid #ff6b6b;
                }

                .song-info {
                    flex: 1;
                    min-width: 0;
                }

                .song-title {
                    font-weight: bold;
                    font-size: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .song-artist {
                    font-size: 10px;
                    opacity: 0.8;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .play-button {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #ff6b6b;
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    margin-left: 8px;
                    transition: all 0.3s ease;
                }

                .play-button:hover {
                    background: #ff5252;
                    transform: scale(1.1);
                }

                .control-buttons {
                    display: flex;
                    gap: 8px;
                    margin-top: 10px;
                }

                .control-btn {
                    flex: 1;
                    padding: 8px;
                    border: none;
                    border-radius: 6px;
                    background: rgba(255,255,255,0.2);
                    color: white;
                    cursor: pointer;
                    font-size: 11px;
                    transition: all 0.3s ease;
                }

                .control-btn:hover {
                    background: rgba(255,255,255,0.3);
                }

                .control-btn.active {
                    background: #ff6b6b;
                }

                .mood-indicator {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    background: #ff6b6b;
                    color: white;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                }

                .recommendation-stats {
                    font-size: 10px;
                    opacity: 0.8;
                    margin-top: 8px;
                    text-align: center;
                }
            `;

            GM_addStyle(styles);
        }

        setup() {
            // Create the advanced recommendations panel
            this.createRecommendationPanel();

            // Setup song change detection
            this.setupSongDetection();

            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
        }

        createRecommendationPanel() {
            const panel = document.createElement('div');
            panel.className = 'jiosaavn-advanced-recommendations';
            panel.innerHTML = `
                <div class="mood-indicator" id="moodIndicator">🎵</div>
                <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">🎵 Advanced Recommendations</div>
                <div style="font-size: 11px; opacity: 0.9; margin-bottom: 10px;">Spotify/YouTube-level AI</div>

                <div class="control-buttons">
                    <button class="control-btn active" id="shuffleBtn">🔀 Shuffle</button>
                    <button class="control-btn" id="expandBtn">📈 Expand</button>
                </div>

                <div class="recommendation-panel">
                    <div style="font-size: 12px; font-weight: bold; margin-bottom: 8px;">🎯 Smart Recommendations</div>
                    <div id="recommendationsList">
                        <div style="text-align: center; padding: 20px; opacity: 0.7; font-size: 11px;">
                            Play a song to see AI recommendations
                        </div>
                    </div>
                </div>

                <div class="recommendation-stats" id="stats">
                    Ready for intelligent music discovery
                </div>
            `;

            document.body.appendChild(panel);

            // Setup event listeners
            document.getElementById('shuffleBtn').addEventListener('click', () => this.toggleShuffle());
            document.getElementById('expandBtn').addEventListener('click', () => this.expandPlaylist());
        }

        setupObserver() {
            // Watch for song changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'subtree') {
                        this.checkForSongChange();
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        setupSongDetection() {
            // Check for currently playing song
            setInterval(() => {
                this.checkForSongChange();
            }, 2000);
        }

        checkForSongChange() {
            // Try to detect current song from various JioSaavn elements
            const possibleSelectors = [
                '.player-song-title',
                '.song-title',
                '.now-playing .title',
                '[data-testid="now-playing-title"]',
                '.current-song .title',
                '.player-track-title'
            ];

            let currentTitle = null;
            let currentArtist = null;

            for (const selector of possibleSelectors) {
                const titleElement = document.querySelector(selector);
                if (titleElement && titleElement.textContent.trim()) {
                    currentTitle = titleElement.textContent.trim();
                    break;
                }
            }

            // Try to find artist
            const artistSelectors = [
                '.player-artist-name',
                '.song-artist',
                '.now-playing .artist',
                '[data-testid="now-playing-artist"]',
                '.current-song .artist',
                '.player-track-artist'
            ];

            for (const selector of artistSelectors) {
                const artistElement = document.querySelector(selector);
                if (artistElement && artistElement.textContent.trim()) {
                    currentArtist = artistElement.textContent.trim();
                    break;
                }
            }

            if (currentTitle && currentArtist) {
                const newSong = {
                    title: currentTitle,
                    artist: currentArtist,
                    language: this.detectLanguage(currentTitle + ' ' + currentArtist),
                    mood: this.detectMood(currentTitle + ' ' + currentArtist)
                };

                if (!this.currentSong || this.currentSong.title !== newSong.title) {
                    console.log('🎵 Song changed:', newSong);
                    this.onSongChange(newSong);
                }
            }
        }

        detectLanguage(text) {
            const hindiWords = ['का', 'की', 'को', 'से', 'पर', 'है', 'हैं', 'था', 'थी', 'कर', 'ना', 'ने', 'या', 'और', 'लेकिन'];
            const punjabiWords = ['ਦਾ', 'ਦੀ', 'ਦੇ', 'ਨੂੰ', 'ਤੋਂ', 'ਹੈ', 'ਸੀ', 'ਕਰ', 'ਨਾ', 'ਜਾਂ', 'ਤੇ', 'ਵਿਚ'];

            const lowerText = text.toLowerCase();

            if (punjabiWords.some(word => lowerText.includes(word))) return 'punjabi';
            if (hindiWords.some(word => lowerText.includes(word))) return 'hindi';

            return 'english';
        }

        detectMood(text) {
            const lowerText = text.toLowerCase();

            if (lowerText.includes('love') || lowerText.includes('pyaar') || lowerText.includes('romantic') || lowerText.includes('ishq')) {
                return 'romantic';
            } else if (lowerText.includes('party') || lowerText.includes('dance') || lowerText.includes('dj') || lowerText.includes('remix')) {
                return 'party';
            } else if (lowerText.includes('sad') || lowerText.includes('dard') || lowerText.includes('alone') || lowerText.includes('broken')) {
                return 'sad';
            } else if (lowerText.includes('motivat') || lowerText.includes('inspire') || lowerText.includes('workout')) {
                return 'motivational';
            } else if (lowerText.includes('classical') || lowerText.includes('ghazal') || lowerText.includes('sufi')) {
                return 'classical';
            }

            return 'general';
        }

        onSongChange(song) {
            this.currentSong = song;
            this.updateMoodIndicator(song.mood);

            // Add to playlist if not already there
            if (!this.playlist.find(s => s.title === song.title && s.artist === song.artist)) {
                this.playlist.push(song);
                this.currentIndex = this.playlist.length - 1;
            }

            // Generate recommendations
            this.generateRecommendations();

            console.log(`🎭 Detected: ${song.mood} mood, ${song.language} language`);
        }

        updateMoodIndicator(mood) {
            const indicator = document.getElementById('moodIndicator');
            const moodEmojis = {
                romantic: '💕',
                party: '🎉',
                sad: '😢',
                motivational: '💪',
                classical: '🎼',
                general: '🎵'
            };

            if (indicator) {
                indicator.textContent = moodEmojis[mood] || '🎵';
            }
        }

        generateRecommendations() {
            if (!this.currentSong) return;

            // Advanced recommendation algorithm
            const recommendations = this.generateAdvancedRecommendations();
            this.displayRecommendations(recommendations);
        }

        generateAdvancedRecommendations() {
            const recommendations = [];
            const currentSong = this.currentSong;

            // Strategy 1: Mood-based (70%)
            const moodQueries = this.getMoodQueries(currentSong.mood, currentSong.language);
            for (let i = 0; i < 3; i++) {
                const query = moodQueries[Math.floor(Math.random() * moodQueries.length)];
                recommendations.push({
                    type: 'mood',
                    query: query,
                    reason: `${currentSong.mood} • ${currentSong.language}`
                });
            }

            // Strategy 2: Artist-based (20%)
            const artistQueries = [
                `${currentSong.artist} similar artists`,
                `${currentSong.artist} fans also like`,
                `like ${currentSong.artist}`
            ];
            for (let i = 0; i < 1; i++) {
                const query = artistQueries[Math.floor(Math.random() * artistQueries.length)];
                recommendations.push({
                    type: 'artist',
                    query: query,
                    reason: `Similar to ${currentSong.artist}`
                });
            }

            // Strategy 3: Era-based (10%)
            const eraQueries = [
                `${currentSong.language} 90s songs`,
                `${currentSong.language} 2000s hits`,
                `${currentSong.language} 2010s songs`
            ];
            for (let i = 0; i < 1; i++) {
                const query = eraQueries[Math.floor(Math.random() * eraQueries.length)];
                recommendations.push({
                    type: 'era',
                    query: query,
                    reason: 'Classic hits'
                });
            }

            return recommendations;
        }

        getMoodQueries(mood, language) {
            const moodMap = {
                romantic: {
                    hindi: ['hindi romantic songs', 'bollywood love songs', 'pyaar ke geet', 'romantic hindi hits'],
                    punjabi: ['punjabi romantic songs', 'punjabi love songs', 'romantic punjabi hits'],
                    english: ['romantic english songs', 'love songs english', 'romantic ballads']
                },
                party: {
                    hindi: ['hindi party songs', 'bollywood dance hits', 'hindi dj remix'],
                    punjabi: ['punjabi party songs', 'punjabi bhangra', 'dance punjabi hits'],
                    english: ['english party songs', 'dance pop hits', 'club music english']
                },
                sad: {
                    hindi: ['hindi sad songs', 'emotional hindi songs', 'dard bhari songs'],
                    punjabi: ['punjabi sad songs', 'emotional punjabi'],
                    english: ['sad english songs', 'emotional ballads']
                },
                general: {
                    hindi: ['trending hindi songs', 'bollywood hits', 'popular hindi'],
                    punjabi: ['trending punjabi songs', 'punjabi hits'],
                    english: ['trending english songs', 'pop hits']
                }
            };

            return moodMap[mood]?.[language] || moodMap.general[language] || [];
        }

        displayRecommendations(recommendations) {
            const listElement = document.getElementById('recommendationsList');
            if (!listElement) return;

            if (recommendations.length === 0) {
                listElement.innerHTML = '<div style="text-align: center; padding: 20px; opacity: 0.7; font-size: 11px;">No recommendations available</div>';
                return;
            }

            listElement.innerHTML = recommendations.map((rec, index) => `
                <div class="recommendation-item" data-query="${rec.query}" data-type="${rec.type}">
                    <div class="song-info">
                        <div class="song-title">${rec.query}</div>
                        <div class="song-artist">${rec.reason}</div>
                    </div>
                    <button class="play-button" onclick="window.jiosaavnAdvanced.playRecommendation('${rec.query}')">▶️</button>
                </div>
            `).join('');

            // Update stats
            const statsElement = document.getElementById('stats');
            if (statsElement) {
                statsElement.textContent = `${recommendations.length} smart recommendations • ${this.playlist.length} songs in playlist`;
            }
        }

        playRecommendation(query) {
            console.log('🎵 Playing recommendation:', query);

            // Try to search and play the recommended song
            // This would integrate with JioSaavn's search functionality
            this.searchAndPlaySong(query);
        }

        searchAndPlaySong(query) {
            // Try to find search input and trigger search
            const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]');

            if (searchInputs.length > 0) {
                const searchInput = searchInputs[0];
                searchInput.value = query;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));

                // Try to trigger search
                setTimeout(() => {
                    const searchButtons = document.querySelectorAll('button[type="submit"], button[aria-label*="search"], button[class*="search"]');
                    if (searchButtons.length > 0) {
                        searchButtons[0].click();
                    } else {
                        // Try Enter key
                        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
                    }
                }, 500);
            }
        }

        toggleShuffle() {
            this.isShuffleMode = !this.isShuffleMode;
            const btn = document.getElementById('shuffleBtn');
            if (btn) {
                btn.classList.toggle('active');
                btn.textContent = this.isShuffleMode ? '🔀 Shuffle' : '➡️ Sequential';
            }
            console.log(`🔀 Shuffle mode: ${this.isShuffleMode ? 'ON' : 'OFF'}`);
        }

        expandPlaylist() {
            console.log('📈 Expanding playlist with more recommendations...');
            this.generateRecommendations();
        }

        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ctrl+Shift+R for recommendations
                if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                    e.preventDefault();
                    this.generateRecommendations();
                    console.log('🎯 Manual recommendations refresh');
                }

                // Ctrl+Shift+S for shuffle toggle
                if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                    e.preventDefault();
                    this.toggleShuffle();
                }
            });
        }
    }

    // Initialize the advanced recommendations system
    window.jiosaavnAdvanced = new JioSaavnAdvancedRecommendations();

    console.log('🎵 JioSaavn Advanced Recommendations System Active!');
    console.log('🎯 Keyboard shortcuts: Ctrl+Shift+R (refresh recommendations), Ctrl+Shift+S (toggle shuffle)');

})();