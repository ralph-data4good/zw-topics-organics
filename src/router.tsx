import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { MapDirectory } from './pages/MapDirectory';
import { CampaignMethanePledge } from './pages/CampaignMethanePledge';
import { Resources } from './pages/Resources';
import { ResourceDetail } from './pages/ResourceDetail';
import { HelpDesk } from './pages/HelpDesk';
import { Calculator } from './pages/Calculator';

export const router = createBrowserRouter([
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
        element: <MapDirectory />,
      },
      {
        path: 'campaign/methane-pledge',
        element: <CampaignMethanePledge />,
      },
      {
        path: 'resources',
        element: <Resources />,
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
        element: <Calculator />,
      },
    ],
  },
]);

