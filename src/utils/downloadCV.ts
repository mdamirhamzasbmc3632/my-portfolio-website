export const CV_PDF_URL = 'https://raw.githubusercontent.com/mdamirhamzasbmc3632/my-portfolio-website/main/assets/Amir-Hamza-3632-Cv.pdf';

/**
 * Downloads the official CV PDF of Md Amir Hamza
 */
export async function downloadCV(): Promise<void> {
  const fileName = 'Amir-Hamza-3632-Cv.pdf';

  try {
    // Try fetching from the raw GitHub user content URL
    let res = await fetch(CV_PDF_URL).catch(() => null);

    // Fallback to locally hosted static copy if offline or network error
    if (!res || !res.ok) {
      res = await fetch('/Amir-Hamza-3632-Cv.pdf').catch(() => null);
    }

    if (res && res.ok) {
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2500);
      return;
    }
  } catch (err) {
    console.warn('Direct blob fetch error, falling back to direct link:', err);
  }

  // Fallback: Direct download via anchor click
  const fallbackLink = document.createElement('a');
  fallbackLink.href = CV_PDF_URL;
  fallbackLink.target = '_blank';
  fallbackLink.rel = 'noopener noreferrer';
  fallbackLink.download = fileName;
  document.body.appendChild(fallbackLink);
  fallbackLink.click();
  document.body.removeChild(fallbackLink);
}
