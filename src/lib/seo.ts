// SEO utilities - shim for @zwa/seo
// TODO: replace with @zwa/seo when available

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
}

export function updatePageMeta({ title, description, keywords }: SEOProps) {
  // Update document title
  if (title) {
    document.title = `${title} | Zero Waste Asia`;
  }
  
  // Update meta description
  if (description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }
  
  // Update meta keywords
  if (keywords && keywords.length > 0) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));
  }
}

export function usePageTitle(title: string) {
  updatePageMeta({ title });
}

