import React, { Suspense } from 'react';
const LazyLoadedComponent = React.lazy(() => import('./ComponentPath'));

const ComponentWrapper = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <LazyLoadedComponent />
    </Suspense>
);

export default ComponentWrapper;
