window.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute('href')?.slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { threshold: 0.45, rootMargin: '-10% 0px -45% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  const copyButton = document.getElementById('copy-email');
  const copyStatus = document.getElementById('copy-status');

  if (copyButton && copyStatus) {
    copyButton.addEventListener('click', async () => {
      const email = copyButton.getAttribute('data-email') || 'georgedrfsia@gmail.com';
      if (!email) {
        return;
      }

      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = 'Email copied.';
      } catch (_error) {
        // Fallback for older browsers.
        const hiddenInput = document.createElement('input');
        hiddenInput.value = email;
        document.body.appendChild(hiddenInput);
        hiddenInput.select();
        document.execCommand('copy');
        document.body.removeChild(hiddenInput);
        copyStatus.textContent = 'Email copied.';
      }

      window.setTimeout(() => {
        copyStatus.textContent = '';
      }, 1500);
    });
  }
});
