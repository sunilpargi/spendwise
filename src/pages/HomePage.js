import React from 'react';

const HomePage = () => {
    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Welcome to SpendWise!
            </h1>
            <p className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">
                Here you can manage your finances effectively.
            </p>
        </div>
    );
};

export default HomePage;
