const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav');

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const gallerySlides = {
  'maria-facetas': [
    ['assets/portfolio/maria-izadora-facetas/01.webp', 'Capa do carrossel: cuidados para preservar a durabilidade das facetas em resina'],
    ['assets/portfolio/maria-izadora-facetas/02.webp', 'Dicas de rotina diária para cuidar das facetas em resina'],
    ['assets/portfolio/maria-izadora-facetas/03.webp', 'Orientação sobre placa de bruxismo para proteger as facetas'],
    ['assets/portfolio/maria-izadora-facetas/04.webp', 'Importância das revisões periódicas das facetas em resina'],
    ['assets/portfolio/maria-izadora-facetas/05.webp', 'Tela final do carrossel: o pós-cuidado também faz parte do resultado']
  ],
  'valeska-queixa-solucao': [
    ['assets/portfolio/valeska-queixa-solucao/01.webp', 'Queixa: sinto meu rosto cansado. Solução: Botox com a Dra. Valeska.'],
    ['assets/portfolio/valeska-queixa-solucao/02.webp', 'Queixa: meus dentes estão amarelados. Solução: clareamento dental.'],
    ['assets/portfolio/valeska-queixa-solucao/03.webp', 'Queixa: o formato dos meus dentes me incomoda. Solução: faceta em resina.'],
    ['assets/portfolio/valeska-queixa-solucao/04.webp', 'Queixa: acabei de perder um dente. Solução: implante dentário.'],
    ['assets/portfolio/valeska-queixa-solucao/05.webp', 'Queixa: sinto meus dentes ásperos. Solução: limpeza dental.'],
    ['assets/portfolio/valeska-queixa-solucao/06.webp', 'Queixa: preciso de uma dentista de confiança. Solução: Dra. Valeska Sifuente.']
  ],
  'amik-autoral': [
    ['assets/portfolio/amik-perfil/01.webp', 'O melhor feedback nem sempre vem das métricas.'],
    ['assets/portfolio/amik-perfil/02.webp', 'Depoimento da Dra. Valeska sobre a conexão entre o conteúdo e a identidade dela.'],
    ['assets/portfolio/amik-perfil/03.webp', 'Apresentação do trabalho de comunicação feito para a Dra. Valeska.'],
    ['assets/portfolio/amik-perfil/04.webp', 'Posicionamento não cria uma essência; revela o que já existe.'],
    ['assets/portfolio/amik-perfil/05.webp', 'O perfil mostra consistência e identidade além de um feed bonito.'],
    ['assets/portfolio/amik-perfil/06.webp', 'Citação de Viktor Frankl sobre propósito e sentido.'],
    ['assets/portfolio/amik-perfil/07.webp', 'Profissionais competentes também precisam comunicar seu valor.']
  ],
  'luna-prata': [
    ['assets/portfolio/luna-dargento/01.webp', 'Você sabia que prata é uma joia e seu valor vai além da estética?'],
    ['assets/portfolio/luna-dargento/02.webp', 'A prata é um metal nobre reconhecido mundialmente e relevante para a criação de joias.'],
    ['assets/portfolio/luna-dargento/03.webp', 'O valor de uma joia também está no design, acabamento e história.'],
    ['assets/portfolio/luna-dargento/04.webp', 'A prata tem cotação no mercado internacional e seu valor pode variar.'],
    ['assets/portfolio/luna-dargento/05.webp', 'A prata também pode ser considerada um bem de valor econômico, sujeita à avaliação.'],
    ['assets/portfolio/luna-dargento/06.webp', 'A prata está presente em diferentes setores; versatilidade, resistência e beleza mantêm sua relevância.'],
    ['assets/portfolio/luna-dargento/07.webp', 'A prata reúne beleza, significado e valor. Uma escolha para usar e guardar.']
  ]
};

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = gallerySlides[carousel.dataset.carousel];
  if (!slides) return;

  const image = carousel.querySelector('.portfolio-slide');
  const count = carousel.querySelector('.slide-count');
  const dots = [...carousel.querySelectorAll('.gallery-dot')];
  let current = 0;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    image.src = slides[current][0];
    image.alt = slides[current][1];
    count.innerHTML = `${String(current + 1).padStart(2, '0')} <i>/</i> ${String(slides.length).padStart(2, '0')}`;
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  carousel.querySelectorAll('.gallery-arrow').forEach((button) => {
    button.addEventListener('click', () => showSlide(current + Number(button.dataset.step)));
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => showSlide(Number(dot.dataset.index)));
  });
});

const portfolioTabs = [...document.querySelectorAll('[data-portfolio-tab]')];
const portfolioGrid = document.querySelector('#portfolio-grid');

portfolioTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.portfolioTab;
    portfolioTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    portfolioGrid.setAttribute('aria-labelledby', tab.id);
    portfolioGrid.querySelectorAll('[data-portfolio-item]').forEach((item) => {
      item.hidden = item.dataset.category !== category;
    });
  });

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = portfolioTabs[(portfolioTabs.indexOf(tab) + direction + portfolioTabs.length) % portfolioTabs.length];
    next.focus();
    next.click();
  });
});
