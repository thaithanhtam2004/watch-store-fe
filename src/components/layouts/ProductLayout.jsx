import React from 'react';
import { Outlet } from 'react-router-dom';

const ProductLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">


            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4">
                <Outlet /> {/* ← Dùng cái này, KHÔNG dùng children */}
            </main>


        </div>
    );
};

export default ProductLayout;