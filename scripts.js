window.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute('href')?.slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  let lockActiveToId = null;
  let userInitiatedScrollPending = false;

  const lockActiveLinkUntilUserScrolls = (id) => {
    lockActiveToId = id;
    setActiveLink(id);
  };

  const updateActiveFromScroll = () => {
    if (!sections.length) {
      return;
    }

    if (lockActiveToId) {
      setActiveLink(lockActiveToId);
      return;
    }

    const anchorY = 140;
    let activeSection = sections[0];
    let bestDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Consider sections that are not fully above the anchor line.
      if (rect.bottom > anchorY) {
        const distance = Math.abs(rect.top - anchorY);
        if (distance < bestDistance) {
          bestDistance = distance;
          activeSection = section;
        }
      }
    });

    if (activeSection?.id) {
      setActiveLink(activeSection.id);
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) {
        return;
      }

      if (href === '#about') {
        event.preventDefault();
        lockActiveLinkUntilUserScrolls('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', href);
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      lockActiveLinkUntilUserScrolls(target.id);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });

  window.addEventListener(
    'wheel',
    () => {
      userInitiatedScrollPending = true;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    () => {
      userInitiatedScrollPending = true;
    },
    { passive: true }
  );

  window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      userInitiatedScrollPending = true;
    }
  });

  window.addEventListener(
    'scroll',
    () => {
      if (lockActiveToId && userInitiatedScrollPending) {
        lockActiveToId = null;
        userInitiatedScrollPending = false;
      }
      updateActiveFromScroll();
    },
    { passive: true }
  );
  updateActiveFromScroll();

  const copyButton = document.getElementById('copy-email');
  const copyStatus = document.getElementById('copy-status');

  if (copyButton && copyStatus) {
    const buttonText = copyButton.querySelector('span');
    const defaultLabel = buttonText ? buttonText.textContent : 'Copy email';
    let resetTimerId = null;

    const setCopyFeedback = (state) => {
      copyButton.classList.remove('is-success', 'is-error', 'is-working');

      if (state === 'success') {
        copyButton.classList.add('is-success');
        if (buttonText) {
          buttonText.textContent = 'Copied';
        }
        copyStatus.textContent = 'Email copied to clipboard.';
      } else if (state === 'working') {
        copyButton.classList.add('is-working');
        if (buttonText) {
          buttonText.textContent = 'Copying...';
        }
        copyStatus.textContent = 'Copying email...';
      } else if (state === 'error') {
        copyButton.classList.add('is-error');
        if (buttonText) {
          buttonText.textContent = 'Try again';
        }
        copyStatus.textContent = 'Could not copy email. Please try again.';
      } else {
        if (buttonText) {
          buttonText.textContent = defaultLabel || 'Copy email';
        }
        copyStatus.textContent = '';
      }
    };

    copyButton.addEventListener('click', async () => {
      const email = copyButton.getAttribute('data-email') || 'georgedrfsia@gmail.com';
      if (!email) {
        return;
      }

      setCopyFeedback('working');

      try {
        await navigator.clipboard.writeText(email);
        setCopyFeedback('success');
      } catch (_error) {
        // Fallback for older browsers.
        let copied = false;
        try {
          const hiddenInput = document.createElement('input');
          hiddenInput.value = email;
          document.body.appendChild(hiddenInput);
          hiddenInput.select();
          copied = document.execCommand('copy');
          document.body.removeChild(hiddenInput);
        } catch (_fallbackError) {
          copied = false;
        }

        if (copied) {
          setCopyFeedback('success');
        } else {
          setCopyFeedback('error');
        }
      }

      if (resetTimerId) {
        window.clearTimeout(resetTimerId);
      }

      resetTimerId = window.setTimeout(() => {
        setCopyFeedback('idle');
        resetTimerId = null;
      }, 2600);
    });
  }
});
