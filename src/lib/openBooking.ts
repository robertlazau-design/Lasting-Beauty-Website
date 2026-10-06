/**
 * Opens a GlossGenius booking URL reliably.
 * Mobile browsers and in-app browsers (Instagram, TikTok, etc.) often block or
 * silently ignore window.open(..., 'noopener'), so on touch/mobile devices we
 * navigate in the same tab. Desktop keeps the new-tab behavior.
 */
export function openBooking(url: string): void {
  const ua = navigator.userAgent || '';
  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile|Instagram|TikTok|FBAN|FBAV|Snapchat/i.test(ua) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)); // iPadOS

  if (isMobile) {
    window.location.href = url;
    return;
  }

  const win = window.open(url, '_blank');
  if (win) {
    win.opener = null;
  } else {
    window.location.href = url; // popup blocked
  }
}
