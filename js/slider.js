// Slider functionality with drag support
class CatalogSlider {
    constructor() {
        this.slider = document.querySelector('.catalog-grid');
        this.sliderContainer = document.querySelector('.catalog-slider');
        this.prevButton = document.getElementById('prevSlide');
        this.nextButton = document.getElementById('nextSlide');
        this.cards = document.querySelectorAll('.catalog-card');
        this.currentIndex = 0;
        this.cardWidth = 0;
        this.gap = 20;
        
        // Drag variables
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.startX = 0;
        
        this.init();
    }

    init() {
        if (!this.slider || !this.prevButton || !this.nextButton) return;

        // Calculate card width
        this.calculateCardWidth();

        // Add button event listeners
        this.prevButton.addEventListener('click', () => this.prev());
        this.nextButton.addEventListener('click', () => this.next());

        // Add drag event listeners
        this.addDragListeners();

        // Recalculate on window resize
        window.addEventListener('resize', () => {
            this.calculateCardWidth();
            this.updateSlider();
        });

        // Initial state
        this.updateButtons();
    }

    addDragListeners() {
        // Mouse events
        this.slider.addEventListener('mousedown', this.dragStart.bind(this));
        this.slider.addEventListener('mousemove', this.drag.bind(this));
        this.slider.addEventListener('mouseup', this.dragEnd.bind(this));
        this.slider.addEventListener('mouseleave', this.dragEnd.bind(this));

        // Touch events
        this.slider.addEventListener('touchstart', this.dragStart.bind(this));
        this.slider.addEventListener('touchmove', this.drag.bind(this));
        this.slider.addEventListener('touchend', this.dragEnd.bind(this));

        // Prevent context menu on long press
        this.slider.addEventListener('contextmenu', (e) => {
            if (this.isDragging) e.preventDefault();
        });

        // Prevent default drag behavior on images and links
        this.slider.querySelectorAll('a, img').forEach(element => {
            element.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }

    dragStart(e) {
        this.isDragging = true;
        this.startPos = this.getPositionX(e);
        this.startX = this.startPos;
        this.animationID = requestAnimationFrame(this.animation.bind(this));
        this.slider.style.cursor = 'grabbing';
        this.slider.style.transition = 'none';
    }

    drag(e) {
        if (!this.isDragging) return;
        
        const currentPosition = this.getPositionX(e);
        const diff = currentPosition - this.startPos;
        this.currentTranslate = this.prevTranslate + diff;
    }

    dragEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        
        const movedBy = this.currentTranslate - this.prevTranslate;
        const threshold = this.cardWidth / 4; // 25% of card width to trigger slide
        
        // Determine if we should move to next/prev slide
        if (movedBy < -threshold && this.currentIndex < this.getMaxIndex()) {
            this.currentIndex++;
        } else if (movedBy > threshold && this.currentIndex > 0) {
            this.currentIndex--;
        }
        
        this.slider.style.cursor = 'grab';
        this.slider.style.transition = 'transform 0.4s ease-in-out';
        this.updateSlider();
    }

    animation() {
        if (this.isDragging) {
            this.setSliderPosition();
            requestAnimationFrame(this.animation.bind(this));
        }
    }

    setSliderPosition() {
        this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    calculateCardWidth() {
        if (this.cards.length > 0) {
            const card = this.cards[0];
            // Use the actual rendered width (272px on desktop, 100% on mobile)
            this.cardWidth = card.offsetWidth;
        }
    }

    getMaxIndex() {
        const containerWidth = this.slider.parentElement.offsetWidth;
        const totalWidth = (this.cardWidth + this.gap) * this.cards.length - this.gap;
        const maxScroll = totalWidth - containerWidth;
        return Math.ceil(maxScroll / (this.cardWidth + this.gap));
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    }

    next() {
        const maxIndex = this.getMaxIndex();
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateSlider();
        }
    }

    updateSlider() {
        const offset = -this.currentIndex * (this.cardWidth + this.gap);
        this.slider.style.transform = `translateX(${offset}px)`;
        this.prevTranslate = offset;
        this.currentTranslate = offset;
        this.updateButtons();
    }

    updateButtons() {
        const maxIndex = this.getMaxIndex();
        
        // Update prev button
        this.prevButton.disabled = this.currentIndex === 0;
        
        // Update next button
        this.nextButton.disabled = this.currentIndex >= maxIndex || maxIndex <= 0;
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CatalogSlider();
});
