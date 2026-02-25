// FC Jerseys iframe fallback if embedding is blocked
(function () {
  const frame = document.querySelector('.previewFrame');
  const fallback = document.getElementById('fcPreviewFallback');
  if (!frame || !fallback) return;

  let loaded = false;

  frame.addEventListener('load', () => {
    loaded = true;
    // If it loads, keep fallback hidden
    fallback.hidden = true;
  });

  // If it doesn't "load" in a reasonable time, show fallback
  // (Some blocked iframes never fully load or show errors)
  setTimeout(() => {
    if (!loaded) fallback.hidden = false;
  }, 2500);
})();