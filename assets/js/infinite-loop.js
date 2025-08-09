// Brand Logo Infinite Loop Animation
document.addEventListener('DOMContentLoaded', () => {
    const loopTrack = document.querySelector('.loop-track');
    
    // Clone the brand logos for seamless looping
    function cloneBrands() {
        const brandLogos = document.querySelectorAll('.brand-logo');
        const clones = [];
        
        brandLogos.forEach(logo => {
            const clone = logo.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clones.push(clone);
        });
        
        clones.forEach(clone => {
            loopTrack.appendChild(clone);
        });
    }
    
    cloneBrands();
    
    // Pause animation on hover
    loopTrack.addEventListener('mouseenter', () => {
        loopTrack.style.animationPlayState = 'paused';
    });
    
    loopTrack.addEventListener('mouseleave', () => {
        loopTrack.style.animationPlayState = 'running';
    });
    
    // Make the loop responsive
    function adjustLoopSpeed() {
        const viewportWidth = window.innerWidth;
        // Faster animation on smaller screens
        const duration = viewportWidth < 768 ? 15 : 20;
        loopTrack.style.animationDuration = `${duration}s`;
    }
    
    window.addEventListener('resize', adjustLoopSpeed);
    adjustLoopSpeed();
    
    // Add click event to brand logos
    document.querySelectorAll('.brand-logo').forEach(logo => {
        logo.addEventListener('click', () => {
            const brandName = logo.querySelector('img').alt;
            console.log(`Clicked on ${brandName} logo`);
            // In a real app, this might link to the brand's page
        });
    });
    
    // Add styles for the loop animation
    const loopStyles = document.createElement('style');
    loopStyles.textContent = `
        @keyframes scroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(calc(-100% - 4rem));
            }
        }
        
        .loop-track {
            display: flex;
            align-items: center;
            gap: 4rem;
            animation: scroll 20s linear infinite;
            will-change: transform;
            padding: 1rem 0;
        }
        
        .loop-track:hover {
            animation-play-state: paused;
        }
        
        .brand-logo {
            flex-shrink: 0;
            width: 120px;
            opacity: 0.7;
            transition: var(--transition);
            cursor: pointer;
        }
        
        .brand-logo:hover {
            opacity: 1;
        }
        
        .brand-logo img {
            width: 100%;
            height: auto;
            filter: grayscale(100%);
            transition: var(--transition);
        }
        
        .brand-logo:hover img {
            filter: grayscale(0%);
        }
        
        @media (max-width: 768px) {
            .brand-logo {
                width: 80px;
            }
            
            .loop-track {
                gap: 2rem;
            }
        }
    `;
    document.head.appendChild(loopStyles);
});