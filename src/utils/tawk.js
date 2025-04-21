let isTawkLoaded = false;

export const loadTawk = () => {
  if (isTawkLoaded || window.Tawk_API) return;

  const script = document.createElement('script');
  script.id = 'tawk-to';
  script.async = true;
  script.src = 'https://embed.tawk.to/67fce5ed5e4f83190dbe7adb/1iopu4ajg';
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');

  script.onload = () => {
    isTawkLoaded = true;
  };

  document.body.appendChild(script);
};

export const showTawk = () => {
  if (window.Tawk_API?.showWidget) {
    window.Tawk_API.showWidget();
  }
};

export const hideTawk = () => {
  if (window.Tawk_API?.hideWidget) {
    window.Tawk_API.hideWidget();
  }
};
