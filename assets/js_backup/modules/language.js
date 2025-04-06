export function initLanguageSystem() {
    // 1. Configurar evento de delegation para elementos dinâmicos
    document.body.addEventListener('click', (e) => {
        const button = e.target.closest('[data-lang]');
        if (!button) return;
        
        e.preventDefault();
        const newLang = button.dataset.lang;
        localStorage.setItem('preferredLang', newLang);
        window.location.href = newLang === 'pt' ? 'index.html' : 'index-en.html';
    });

    // 2. Lógica de detecção de idioma
    const currentPage = window.location.pathname.split('/').pop();
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';

    // 3. Só redirecionar automaticamente se:
    // - Não tiver preferência salva
    // - Estiver na página errada
    if (!savedLang) {
        const shouldRedirect = (
            (browserLang === 'pt' && currentPage !== 'index.html') ||
            (browserLang === 'en' && currentPage !== 'index-en.html')
        );

        if (shouldRedirect) {
            window.location.href = browserLang === 'pt' ? 'index.html' : 'index-en.html';
            return; // Impede execução adicional
        }
    }

    // 4. Forçar coerência entre localStorage e URL
    if (savedLang) {
        const shouldCorrect = (
            (savedLang === 'pt' && currentPage === 'index-en.html') ||
            (savedLang === 'en' && currentPage === 'index.html')
        );

        if (shouldCorrect) {
            window.location.href = savedLang === 'pt' ? 'index.html' : 'index-en.html';
        }
    }
}