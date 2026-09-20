import { useEffect } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { CampaignMethanePledge } from './pages/CampaignMethanePledge';
import { ResourceDetail } from './pages/ResourceDetail';
import { HelpDesk } from './pages/HelpDesk';
import { Admin } from './pages/Admin';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { EXTERNAL_LINKS } from './lib/constants';
import { trackConversion, type ConversionEvent } from './lib/analytics';

function ExternalRedirect({
  href,
  track,
  label,
}: {
  href: string;
  track?: ConversionEvent;
  label: string;
}) {
  useEffect(() => {
    if (track) trackConversion(track);
    window.location.replace(href);
  }, [href, track]);
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-8 text-fg-muted">
      Opening {label}…
    </div>
  );
}

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'map',
        element: (
          <ExternalRedirect
            href={EXTERNAL_LINKS.directory}
            track="map_explore"
            label="directory"
          />
        ),
      },
      {
        path: 'campaign/methane-pledge',
        element: <CampaignMethanePledge />,
      },
      {
        path: 'resources',
        element: (
          <ExternalRedirect
            href={EXTERNAL_LINKS.resources}
            track="resources_browse"
            label="resources"
          />
        ),
      },
      {
        path: 'resources/:slug',
        element: <ResourceDetail />,
      },
      {
        path: 'helpdesk',
        element: <HelpDesk />,
      },
      {
        path: 'calculator',
        element: (
          <ExternalRedirect
            href={EXTERNAL_LINKS.calculator}
            track="calculator_open"
            label="calculator"
          />
        ),
      },
      {
        path: 'admin',
        element: <Admin />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: 'privacy',
        element: <Privacy />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
