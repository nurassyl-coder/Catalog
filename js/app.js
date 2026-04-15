import categoriesData from './data.js';

const app = document.getElementById('app');

// State to keep track of current view: 'home' or specific category ID
let state = {
    currentView: 'home',
    selectedCategory: null
};

// Render Functions
function render() {
    app.innerHTML = '';
    
    if (state.currentView === 'home') {
        renderHome();
    } else {
        renderGallery();
    }
    
    // Scroll to top automatically when view changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHome() {
    const container = document.createElement('div');
    container.className = 'fade-in flex flex-col items-center';
    
    // Header Section
    container.innerHTML = `
        <div class="text-center mb-10 w-full">
            <h1 class="text-4xl sm:text-[42px] font-medium font-serif text-brand-text leading-tight mb-2">
                Дизайн шаблондары
            </h1>
            <p class="text-brand-text/70 mt-2 font-sans font-medium">Категорияны таңдаңыз:</p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mx-auto" id="categories-grid">
        </div>
    `;

    app.appendChild(container);
    
    const grid = document.getElementById('categories-grid');

    categoriesData.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.className = 'group cursor-pointer flex flex-col items-center text-center';
        catCard.onclick = () => {
            state.currentView = 'gallery';
            state.selectedCategory = cat;
            render();
        };

        // For the main menu, we'll use solid beige cards with beautiful text to keep it very minimal
        catCard.innerHTML = `
            <div class="w-full bg-brand-cardBg aspect-[4/3] flex items-center justify-center p-6 border border-brand-cardBg/80 shadow-sm transition-transform group-hover:scale-[1.02] duration-300">
                <h2 class="font-serif text-2xl md:text-3xl text-white font-medium drop-shadow-md text-shadow-sm leading-snug">
                    ${cat.name}
                </h2>
            </div>
            <div class="mt-4 font-sans font-semibold text-brand-text group-hover:text-brand-btnBg transition-colors uppercase tracking-widest text-sm">
                Көру →
            </div>
        `;
        grid.appendChild(catCard);
    });
}

function renderGallery() {
    const category = state.selectedCategory;
    
    const container = document.createElement('div');
    container.className = 'fade-in flex flex-col items-center';
    
    // Format the category name logic. E.g. replace 'Шаблоны Сүндет той' to 'Сүндет тойлары үшін:' if needed
    // But safely just display the name + ' үшін:'
    let catDisplayName = category.name.replace('Шаблоны ', '').trim();
    if (!catDisplayName.toLowerCase().includes('тойлары')) {
       // if it doesn't end with form of 'той', we just display 'үшін'
    }

    container.innerHTML = `
        <div class="w-full self-start mb-6 -mt-2">
            <button id="btn-back" class="text-xs sm:text-sm font-sans font-semibold text-brand-text/60 hover:text-brand-text uppercase tracking-widest transition-colors border-b border-transparent hover:border-brand-text pb-1 flex items-center">
                ← Артқа қайту
            </button>
        </div>

        <div class="text-center mb-10 w-full">
            <h1 class="text-[34px] sm:text-[40px] font-medium font-serif text-brand-text leading-tight mb-2">
                Дизайн шаблондары
            </h1>
            <h2 class="text-[28px] sm:text-[34px] font-medium font-serif text-brand-text leading-tight mt-6 sm:mt-8 mb-4 px-2">
                ${catDisplayName}<br>үшін:
            </h2>
        </div>

        <!-- CSS Grid exactly as per mockup (2 columns) -->
        <div class="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-8 sm:gap-y-12 w-full max-w-[600px] mx-auto" id="templates-grid">
        </div>
    `;
    
    app.appendChild(container);
    
    // Attach event listener to back button
    document.getElementById('btn-back').addEventListener('click', () => {
        state.currentView = 'home';
        state.selectedCategory = null;
        render();
    });

    const grid = document.getElementById('templates-grid');

    if (category.templates.length === 0) {
        grid.innerHTML = `<div class="col-span-2 py-12 text-center text-brand-text/50 font-sans">Осы категорияда шаблондар әлі жоқ</div>`;
        return;
    }

    category.templates.forEach((tpl, index) => {
        const tplCard = document.createElement('div');
        tplCard.className = 'flex flex-col h-full';
        
        tplCard.innerHTML = `
            <!-- Title -->
            <div class="text-center font-sans font-medium text-[15px] sm:text-lg mb-2 text-brand-text tracking-wide">
                №${index + 1} шаблон
            </div>
            
            <!-- Beige Image Container -->
            <div class="bg-brand-cardBg flex-1 w-full flex items-center justify-center p-4 min-h-[160px] sm:min-h-[220px]">
                <div class="phone-mockup group-hover:scale-[1.02] transition-transform duration-300">
                    <img src="${tpl.preview}" alt="Шаблон ${index + 1}" loading="lazy">
                </div>
            </div>
            
            <!-- Olive View Button -->
            <a href="${tpl.fileUrl}" target="_blank" class="block w-full bg-brand-btnBg hover:bg-brand-btnHover text-white text-center py-2.5 sm:py-3 font-sans font-medium text-[13px] sm:text-[15px] tracking-wide transition-colors">
                Үлгіні көру
            </a>
        `;
        
        grid.appendChild(tplCard);
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    render();
});
