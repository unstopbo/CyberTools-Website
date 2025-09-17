// CyberTools Application JavaScript
class CyberToolsApp {
    constructor() {
        this.currentSection = 'tools';
        this.filteredTools = [...cyberTools];
        this.init();
    }

    init() {
        this.initializeTheme();
        this.setupEventListeners();
        this.renderTools();
        this.updateFavoritesDisplay();
        this.initParticleEffect();
    }

    initializeTheme() {
        // Get saved theme from localStorage or default to light
        const savedTheme = localStorage.getItem('cybertools_theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Save theme preference
        localStorage.setItem('cybertools_theme', newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('title', 'Switch to Light Mode');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('title', 'Switch to Dark Mode');
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSection(e.target.dataset.section);
            });
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filterTools();
        });

        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filterTools();
        });

        // Modal functionality
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Form submission
        document.getElementById('submit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitTool();
        });
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        this.currentSection = section;

        // Update content based on section
        if (section === 'favorites') {
            this.renderFavorites();
        } else if (section === 'tools') {
            this.renderTools();
        }
    }

    filterTools() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;

        this.filteredTools = cyberTools.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(searchTerm) ||
                                tool.description.toLowerCase().includes(searchTerm) ||
                                tool.useCases.some(useCase => useCase.toLowerCase().includes(searchTerm));

            const matchesCategory = !categoryFilter || tool.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        this.renderTools();
    }

    renderTools() {
        const toolsGrid = document.getElementById('tools-grid');
        
        if (this.filteredTools.length === 0) {
            toolsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No tools found</h3>
                    <p>Try adjusting your search criteria or filters.</p>
                </div>
            `;
            return;
        }

        toolsGrid.innerHTML = this.filteredTools.map(tool => this.createToolCard(tool)).join('');

        // Add event listeners to tool cards
        document.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('favorite-btn')) {
                    this.openToolModal(parseInt(card.dataset.toolId));
                }
            });
        });

        // Add event listeners to favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(parseInt(btn.dataset.toolId));
            });
        });
    }

    createToolCard(tool) {
        const isFavorited = userData.favorites.includes(tool.id);
        const categoryName = this.getCategoryDisplayName(tool.category);

        return `
            <div class="tool-card" data-tool-id="${tool.id}">
                <div class="tool-header">
                    <div>
                        <h3 class="tool-title">${tool.name}</h3>
                        <span class="tool-category">${categoryName}</span>
                    </div>
                    <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-tool-id="${tool.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <p class="tool-description">${tool.description}</p>
                <div class="tool-footer">
                    <div class="tool-rating">
                        <div class="stars">
                            ${this.generateStars(tool.rating)}
                        </div>
                        <span class="rating-text">${tool.rating} (${tool.reviews} reviews)</span>
                    </div>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    getCategoryDisplayName(category) {
        const categoryMap = {
            'network-scanning': 'Network Scanning',
            'vulnerability-scanning': 'Vulnerability Scanning',
            'penetration-testing': 'Penetration Testing',
            'forensics': 'Digital Forensics',
            'osint': 'OSINT',
            'reverse-engineering': 'Reverse Engineering',
            'web-security': 'Web Security',
            'malware-analysis': 'Malware Analysis',
            'cryptography': 'Cryptography',
            'wireless-security': 'Wireless Security'
        };
        return categoryMap[category] || category;
    }

    toggleFavorite(toolId) {
        const index = userData.favorites.indexOf(toolId);
        if (index > -1) {
            userData.favorites.splice(index, 1);
        } else {
            userData.favorites.push(toolId);
        }
        saveUserData();
        this.renderTools();
        if (this.currentSection === 'favorites') {
            this.renderFavorites();
        }
    }

    renderFavorites() {
        const favoritesGrid = document.getElementById('favorites-grid');
        const favoriteTools = cyberTools.filter(tool => userData.favorites.includes(tool.id));

        if (favoriteTools.length === 0) {
            favoritesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <h3>No favorite tools yet</h3>
                    <p>Click the heart icon on any tool to add it to your favorites.</p>
                </div>
            `;
            return;
        }

        favoritesGrid.innerHTML = favoriteTools.map(tool => this.createToolCard(tool)).join('');

        // Add event listeners
        document.querySelectorAll('#favorites-grid .tool-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('favorite-btn')) {
                    this.openToolModal(parseInt(card.dataset.toolId));
                }
            });
        });

        document.querySelectorAll('#favorites-grid .favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(parseInt(btn.dataset.toolId));
            });
        });
    }

    updateFavoritesDisplay() {
        // Update favorites count in navigation if needed
        const favoritesBtn = document.querySelector('[data-section="favorites"]');
        if (userData.favorites.length > 0) {
            favoritesBtn.innerHTML = `<i class="fas fa-heart"></i> Favorites (${userData.favorites.length})`;
        }
    }

    openToolModal(toolId) {
        const tool = cyberTools.find(t => t.id === toolId);
        if (!tool) return;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = this.createToolModalContent(tool);

        // Add event listeners for rating system
        this.setupRatingSystem(toolId);

        // Setup scroll indicator
        this.setupScrollIndicator();

        document.getElementById('tool-modal').style.display = 'block';
    }

    createToolModalContent(tool) {
        const categoryName = this.getCategoryDisplayName(tool.category);
        const userRating = userData.ratings[tool.id] || 0;

        return `
            <div class="modal-header">
                <h2 class="modal-title">${tool.name}</h2>
                <span class="modal-category">${categoryName}</span>
            </div>
            <div class="modal-body">
                <div class="info-section">
                    <h3><i class="fas fa-info-circle"></i> Description</h3>
                    <p>${tool.description}</p>
                </div>

                <div class="info-section">
                    <h3><i class="fas fa-download"></i> Installation</h3>
                    <div class="installation-tabs">
                        <div class="tab-content">
                            <h4>Windows</h4>
                            <div class="code-block">${tool.installation.windows}</div>
                            <h4>Linux</h4>
                            <div class="code-block">${tool.installation.linux}</div>
                            <h4>macOS</h4>
                            <div class="code-block">${tool.installation.mac}</div>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <h3><i class="fas fa-terminal"></i> Usage Examples</h3>
                    ${tool.usage.map(usage => `<div class="code-block">${usage}</div>`).join('')}
                </div>

                <div class="info-section">
                    <h3><i class="fas fa-lightbulb"></i> Use Cases</h3>
                    ${tool.useCases.map(useCase => `<div class="use-case">${useCase}</div>`).join('')}
                </div>

                ${tool.pros && tool.cons ? `
                <div class="info-section">
                    <h3><i class="fas fa-balance-scale"></i> Pros & Cons</h3>
                    <div class="pros-cons-container">
                        <div class="pros-section">
                            <h4><i class="fas fa-thumbs-up"></i> Pros</h4>
                            <ul class="pros-list">
                                ${tool.pros.map(pro => `<li>${pro}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="cons-section">
                            <h4><i class="fas fa-thumbs-down"></i> Cons</h4>
                            <ul class="cons-list">
                                ${tool.cons.map(con => `<li>${con}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                ` : ''}

                <div class="info-section">
                    <h3><i class="fas fa-external-link-alt"></i> Resources</h3>
                    <p><strong>Official Website:</strong> <a href="${tool.website}" target="_blank" class="external-link">${tool.website}</a></p>
                    <p><strong>Documentation:</strong> <a href="${tool.documentation}" target="_blank" class="external-link">${tool.documentation}</a></p>
                </div>

                <div class="info-section">
                    <h3><i class="fas fa-star"></i> Rating & Reviews</h3>
                    <div class="rating-container">
                        <div class="current-rating">
                            <div class="stars">${this.generateStars(tool.rating)}</div>
                            <span>${tool.rating}/5 (${tool.reviews} reviews)</span>
                        </div>
                        <div class="user-rating">
                            <span>Your rating:</span>
                            <div class="star-rating" data-tool-id="${tool.id}">
                                ${this.generateInteractiveStars(userRating)}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reviews-section">
                    <h4>Recent Reviews</h4>
                    <div id="reviews-container">
                        ${this.generateSampleReviews(tool)}
                    </div>
                </div>
            </div>
        `;
    }

    generateInteractiveStars(currentRating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            const isActive = i <= currentRating;
            stars += `<span class="star ${isActive ? 'active' : ''}" data-rating="${i}">★</span>`;
        }
        return stars;
    }

    generateSampleReviews(tool) {
        // Generate some sample reviews for demonstration
        const sampleReviews = [
            {
                name: "SecurityPro",
                rating: 5,
                comment: "Excellent tool for security professionals. Very comprehensive and well-documented.",
                date: "2024-01-15"
            },
            {
                name: "CyberStudent",
                rating: 4,
                comment: "Great for learning cybersecurity concepts. The examples are very helpful.",
                date: "2024-01-10"
            },
            {
                name: "PenTester",
                rating: 5,
                comment: "Essential tool in my toolkit. Reliable and feature-rich.",
                date: "2024-01-05"
            }
        ];

        return sampleReviews.map(review => `
            <div class="review">
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <div class="review-rating">${this.generateStars(review.rating)}</div>
                    <span class="review-date">${review.date}</span>
                </div>
                <p>${review.comment}</p>
            </div>
        `).join('');
    }

    setupRatingSystem(toolId) {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.setUserRating(toolId, rating);
            });

            star.addEventListener('mouseover', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.highlightStars(rating);
            });
        });

        document.querySelector('.star-rating').addEventListener('mouseleave', () => {
            const currentRating = userData.ratings[toolId] || 0;
            this.highlightStars(currentRating);
        });
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    setUserRating(toolId, rating) {
        userData.ratings[toolId] = rating;
        saveUserData();
        this.highlightStars(rating);
    }

    setupScrollIndicator() {
        // Create scroll indicator if it doesn't exist
        let scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) {
            scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.innerHTML = '<div class="scroll-thumb"></div>';
            document.body.appendChild(scrollIndicator);
        }

        const modalContent = document.querySelector('.modal-content');
        const scrollThumb = scrollIndicator.querySelector('.scroll-thumb');

        const updateScrollIndicator = () => {
            const scrollTop = modalContent.scrollTop;
            const scrollHeight = modalContent.scrollHeight;
            const clientHeight = modalContent.clientHeight;

            if (scrollHeight > clientHeight) {
                scrollIndicator.classList.add('visible');
                const thumbHeight = (clientHeight / scrollHeight) * 100;
                const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (100 - thumbHeight);
                
                scrollThumb.style.height = `${thumbHeight}%`;
                scrollThumb.style.top = `${thumbTop}%`;
            } else {
                scrollIndicator.classList.remove('visible');
            }
        };

        modalContent.addEventListener('scroll', updateScrollIndicator);
        updateScrollIndicator();
    }

    closeModal() {
        document.getElementById('tool-modal').style.display = 'none';
        
        // Hide scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.classList.remove('visible');
        }
    }

    submitTool() {
        const formData = {
            name: document.getElementById('tool-name').value,
            category: document.getElementById('tool-category').value,
            description: document.getElementById('tool-description').value,
            website: document.getElementById('tool-website').value,
            id: Date.now(), // Simple ID generation
            rating: 0,
            reviews: 0,
            installation: {
                windows: "Installation instructions not provided",
                linux: "Installation instructions not provided",
                mac: "Installation instructions not provided"
            },
            usage: ["Usage examples not provided"],
            useCases: ["Use cases not provided"],
            documentation: ""
        };

        // Add to submitted tools
        userData.submittedTools.push(formData);
        saveUserData();

        // Add to main tools array for immediate display
        cyberTools.push(formData);

        // Reset form
        document.getElementById('submit-form').reset();

        // Show success message
        this.showNotification('Tool submitted successfully! Thank you for your contribution.', 'success');

        // Switch back to tools section
        this.switchSection('tools');
        this.filterTools();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease-out;
        `;

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    initParticleEffect() {
        let mouseX = 0;
        let mouseY = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let trailPoints = [];
        let isMoving = false;
        let moveTimeout;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Add point to trail
            this.addTrailPoint(mouseX, mouseY);
            
            // Create exploding particles on movement
            if (Math.random() < 0.4) {
                this.createExplodingParticles(mouseX, mouseY);
            }
            
            // Mark as moving
            isMoving = true;
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        });

        // Create explosion on click
        document.addEventListener('click', (e) => {
            this.createExplosion(e.clientX, e.clientY);
        });

        // Clean up old particles and trail points periodically
        setInterval(() => {
            this.cleanupEffects();
        }, 1000);
    }

    addTrailPoint(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        document.body.appendChild(trail);
        
        // Remove trail point after fade
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 800);
    }

    createExplodingParticles(x, y) {
        const particleCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'exploding-particle';
            
            // Random spawn position around cursor
            const spawnRadius = 15;
            const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
            const spawnX = x + Math.cos(angle) * (Math.random() * spawnRadius);
            const spawnY = y + Math.sin(angle) * (Math.random() * spawnRadius);
            
            particle.style.left = spawnX + 'px';
            particle.style.top = spawnY + 'px';
            
            // Explosion direction
            const explosionForce = 50 + Math.random() * 100;
            const explosionAngle = angle + (Math.random() - 0.5) * 1;
            const explosionX = Math.cos(explosionAngle) * explosionForce;
            const explosionY = Math.sin(explosionAngle) * explosionForce;
            
            particle.style.setProperty('--explosion-x', explosionX + 'px');
            particle.style.setProperty('--explosion-y', explosionY + 'px');
            
            // Random size and color
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            const greenShades = ['#00ff41', '#39ff14', '#32cd32', '#00ff00', '#7fff00', '#adff2f'];
            particle.style.background = greenShades[Math.floor(Math.random() * greenShades.length)];
            
            // Add glow effect randomly
            if (Math.random() < 0.3) {
                particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            }
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500);
        }
    }

    createExplosion(x, y) {
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Radial explosion pattern
            const angle = (Math.PI * 2 * i) / particleCount;
            const force = 80 + Math.random() * 60;
            const explosionX = Math.cos(angle) * force;
            const explosionY = Math.sin(angle) * force;
            
            particle.style.setProperty('--explosion-x', explosionX + 'px');
            particle.style.setProperty('--explosion-y', explosionY + 'px');
            
            // Varying sizes
            const size = Math.random() * 6 + 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Bright green colors
            const greenShades = ['#00ff41', '#39ff14', '#32cd32', '#00ff00'];
            const color = greenShades[Math.floor(Math.random() * greenShades.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 15px ${color}`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    }

    cleanupEffects() {
        // Remove any orphaned particles
        const particles = document.querySelectorAll('.exploding-particle, .explosion-particle, .cursor-trail');
        particles.forEach(particle => {
            if (particle.parentNode && particle.style.opacity === '0') {
                particle.parentNode.removeChild(particle);
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CyberToolsApp();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
