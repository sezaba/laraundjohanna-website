(() => {
  'use strict';

  const bookingUrl = 'https://cal.com/laraundjohanna/erstgespraech';
  let dialog;
  let opener;
  let previousOverflow;
  let loadingTimer;

  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'booking-dialog';
    dialog.setAttribute('aria-labelledby', 'booking-title');
    dialog.innerHTML = `
      <header class="booking-dialog__header">
        <h2 id="booking-title">Erstgespräch vereinbaren</h2>
        <button class="booking-dialog__close" type="button" aria-label="Terminfenster schließen" autofocus>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
      </header>
      <div class="booking-dialog__content">
        <p class="booking-dialog__status" role="status">Verfügbare Termine werden geladen …</p>
      </div>
      <footer class="booking-dialog__footer">
        <span>Buchung über Cal.com · <a href="datenschutz.html#terminbuchung" target="_blank" rel="noopener">Datenschutz</a></span>
        <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer">Buchung in neuem Tab öffnen</a>
      </footer>`;
    document.body.append(dialog);
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      clearTimeout(loadingTimer);
      dialog.querySelector('iframe')?.remove();
      document.documentElement.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus();
    });
  }

  // composedPath supports the design export’s encapsulated components
  // as well as links in ordinary HTML.
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;
    const trigger = event.composedPath().find((node) =>
      node instanceof HTMLAnchorElement && node.hasAttribute('data-booking'));
    if (!trigger || !('showModal' in HTMLDialogElement.prototype)) return;
    event.preventDefault();
    if (!dialog) createDialog();
    if (dialog.open) return;

    opener = trigger;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const status = dialog.querySelector('[role="status"]');
    status.textContent = 'Verfügbare Termine werden geladen …';
    status.hidden = false;
    const frame = document.createElement('iframe');
    frame.className = 'booking-dialog__frame booking-dialog__frame--loading';
    frame.title = 'Verfügbare Termine und Buchung des Erstgesprächs mit Lara und Johanna';
    frame.referrerPolicy = 'no-referrer';
    frame.addEventListener('load', () => {
      clearTimeout(loadingTimer);
      frame.classList.remove('booking-dialog__frame--loading');
      status.hidden = true;
    }, { once: true });
    frame.addEventListener('error', () => {
      clearTimeout(loadingTimer);
      status.textContent = 'Die Termine konnten nicht geladen werden. Bitte öffnet die Buchung über den Link unten in einem neuen Tab.';
    }, { once: true });
    // No Cal.com connection is made until the visitor opens the booking window.
    frame.src = `${bookingUrl}?embed=true&theme=light&layout=month_view`;
    dialog.querySelector('.booking-dialog__content').append(frame);
    dialog.showModal();
    loadingTimer = setTimeout(() => {
      status.textContent = 'Das Laden dauert länger. Ihr könnt die Buchung auch über den Link unten in einem neuen Tab öffnen.';
    }, 12000);
  });
})();
