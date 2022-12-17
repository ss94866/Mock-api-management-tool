import React from 'react';

const Projects = React.lazy(() => import('./pages/Projects'));
const MockServer = React.lazy(() => import('./pages/MockServer'));
const ApiScore = React.lazy(() => import('./pages/ApiScore'));

const routes = [
{path: 'Projects', name: 'Projects', element:Projects},
{path: 'MockServer', name: 'MockServer', element:MockServer},
{path: 'ApiScore', name: 'ApiScore', element:ApiScore},
];

export default routes;