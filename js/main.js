document.documentElement.classList.add('js-ready');

const navToggle = document.querySelector('[data-nav-toggle]');
const primaryNav = document.querySelector('[data-primary-nav]');

const sitePrefix = /\/hizmetler\//.test(window.location.pathname) ? '../' : '';
const navigationLinks = [
  { label: 'Ana Sayfa', path: 'index.html', section: 'home' },
  { label: 'Hizmetler', path: 'hizmetler/index.html', section: 'services' },
  { label: 'Hizmet Bölgeleri', path: 'hizmet-bolgeleri.html', section: 'areas' },
  { label: 'Hakkımızda', path: 'hakkimizda.html', section: 'about' },
  { label: 'Sıkça Sorulan Sorular', path: 'sss.html', section: 'faq' },
  { label: 'İletişim', path: 'iletisim.html', section: 'contact' }
];

function currentSection() {
  const path = window.location.pathname;
  if (/\/(?:index\.html)?$/.test(path) && !/\/hizmetler\/index\.html$/.test(path)) return 'home';
  if (/\/hizmetler\//.test(path)) return 'services';
  if (/\/hizmet-bolgeleri\.html$/.test(path)) return 'areas';
  if (/\/hakkimizda\.html$/.test(path)) return 'about';
  if (/\/sss\.html$/.test(path)) return 'faq';
  if (/\/iletisim\.html$/.test(path)) return 'contact';
  return '';
}

if (primaryNav) {
  const list = document.createElement('ul');
  list.className = 'nav-list';
  const activeSection = currentSection();

  navigationLinks.forEach(({ label, path, section }) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `${sitePrefix}${path}`;
    link.textContent = label;
    if (section === activeSection) {
      const normalizedCurrentPath = window.location.pathname.replace(/\/$/, '/index.html').replace(/\/baskentdestek(?=\/)/, '');
      const normalizedLinkPath = new URL(link.href).pathname.replace(/\/$/, '/index.html').replace(/\/baskentdestek(?=\/)/, '');
      link.setAttribute('aria-current', normalizedCurrentPath === normalizedLinkPath ? 'page' : 'location');
    }
    if (section === 'contact') link.className = 'nav-contact';
    item.append(link);
    list.append(item);
  });

  primaryNav.replaceChildren(list);
}

if (navToggle && primaryNav) {
  const closeMenu = () => {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menüyü aç');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
      closeMenu();
      navToggle.focus();
    }
  });
}

const footerContainer = document.querySelector('.site-footer .container');
if (footerContainer) {
  const footerGroups = [
    {
      title: 'Başkent Destek',
      description: 'Sincan, Yenimahalle ve çevresinde yerinde ve uzaktan teknik destek. Pzt-Paz 10:00-22:00. Tel: 0553 327 28 74 · rehberyazilimtr@gmail.com',
      links: []
    },
    {
      title: 'Hizmetler',
      links: [
        ['Tüm hizmetler', 'hizmetler/index.html'],
        ['Bilgisayar teknik servisi', 'hizmetler/bilgisayar-teknik-servisi.html'],
        ['Modem, Wi-Fi ve ağ', 'hizmetler/modem-wifi-ag-destegi.html'],
        ['Güvenlik kamerası', 'hizmetler/guvenlik-kamerasi-destegi.html'],
        ['Araç kamerası', 'hizmetler/arac-kamerasi.html'],
        ['Uydu ve televizyon', 'hizmetler/uydu-televizyon-destegi.html'],
        ['Uzaktan teknik destek', 'hizmetler/uzaktan-teknik-destek.html'],
        ['Web ve dijital çözümler', 'hizmetler/web-dijital-cozumler.html'],
        ['Yazılım ve otomasyon', 'hizmetler/yazilim-otomasyon.html'],
        ['İşletmelere destek', 'hizmetler/isletmelere-teknik-destek.html']
      ]
    },
    {
      title: 'Keşfedin',
      links: [
        ['Hizmet bölgeleri', 'hizmet-bolgeleri.html'],
        ['Hakkımızda', 'hakkimizda.html'],
        ['Sıkça sorulan sorular', 'sss.html'],
        ['İletişim', 'iletisim.html']
      ]
    },
    {
      title: 'Gizlilik ve yasal bilgiler',
      links: [
        ['Gizlilik politikası', 'gizlilik.html'],
        ['KVKK aydınlatma metni', 'kvkk.html']
      ]
    }
  ];
  const footerLinks = document.createElement('nav');
  const footerGrid = document.createElement('div');
  const previousFooterGrid = footerContainer.querySelector('.footer-grid');
  if (previousFooterGrid) previousFooterGrid.remove();
  footerLinks.className = 'footer-site-links';
  footerLinks.setAttribute('aria-label', 'Site bağlantıları');
  footerGrid.className = 'footer-site-grid';

  footerGroups.forEach(({ title, description, links }) => {
    const group = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = title;
    group.append(heading);
    if (description) {
      const descriptionText = document.createElement('p');
      descriptionText.textContent = description;
      group.append(descriptionText);
    }
    if (links.length) {
      const list = document.createElement('ul');
      links.forEach(([label, path]) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `${sitePrefix}${path}`;
        link.textContent = label;
        item.append(link);
        list.append(item);
      });
      group.append(list);
    }
    footerGrid.append(group);
  });

  footerLinks.append(footerGrid);
  const footerBottom = footerContainer.querySelector('.footer-bottom');
  footerContainer.insertBefore(footerLinks, footerBottom || null);
}
