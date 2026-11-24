(() => {
  const section = document.getElementById('instagram');
  if (!section) return;
  const grid = section.querySelector('.instagram__grid');
  const status = section.querySelector('.instagram__status');
  const mobile = window.matchMedia('(max-width: 767px)');
  function layout() {
    const items = [...grid.children];
    if (!items.length) return;
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 24;
    // Keep each motif readable; distribute the available width across one full row.
    const capacity = mobile.matches ? 1 : Math.max(1, Math.floor((grid.clientWidth + gap) / (300 + gap)));
    const count = Math.min(capacity, items.length);
    grid.style.setProperty('--instagram-columns', count);
    items.forEach((item, index) => { item.hidden = index >= count; });
  }
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(grid);
  else window.addEventListener('resize', layout);
  mobile.addEventListener('change', layout);
  async function load() {
    try {
      const response = await fetch('/api/instagram', { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('Unavailable');
      const { posts, available } = await response.json();
      if (!available || !Array.isArray(posts)) throw new Error('Unavailable');
      if (!posts.length) {
        status.textContent = 'Unsere Beiträge findet ihr direkt auf Instagram.';
        return;
      }
      const fragment = document.createDocumentFragment();
      for (const post of posts.slice(0, 50)) {
        if (!/^\d+$/.test(post.id) || post.image !== `/api/instagram?image=${post.id}` ||
          !/^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/$/.test(post.permalink)) continue;
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'instagram__post';
        link.href = post.permalink;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        const caption = String(post.caption || 'Neues aus unserem Studio');
        link.setAttribute('aria-label', `${caption.slice(0, 120)}. Auf Instagram öffnen`);
        const img = document.createElement('img');
        img.src = post.image;
        img.alt = '';
        img.width = 480;
        img.height = 600;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.addEventListener('error', () => {
          item.remove();
          layout();
          if (!grid.children.length) status.hidden = false;
        }, { once: true });
        const text = document.createElement('p');
        text.className = 'instagram__caption';
        text.textContent = caption;
        link.append(img, text);
        item.append(link);
        fragment.append(item);
      }
      grid.replaceChildren(fragment);
      layout();
      status.hidden = grid.children.length > 0;
    } catch {
      status.textContent = 'Die Beiträge können gerade nicht geladen werden. Schaut direkt auf Instagram vorbei.';
    }
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); load(); }
    }, { rootMargin: '400px' });
    observer.observe(section);
  } else load();
})();
