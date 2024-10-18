import React, { useState, useEffect } from "react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

const GridSkelton = () => {
  const [guests, setGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-72 mb-6" />

        {/* Image Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Skeleton className="h-96" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Description Skeleton */}
          <div className="col-span-2">
            <div className="border-b pb-6 mb-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            </div>
          </div>

          {/* Booking Card Skeleton */}
          <div className="sticky top-4">
            <div className="border rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                </div>
                <Skeleton className="h-20" />
                <Skeleton className="h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default GridSkelton;
