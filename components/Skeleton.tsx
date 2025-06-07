import React from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const SkeletonCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-8">
      {[1, 2, 3].map((index) => (
        <Card key={index} className="p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex justify-end gap-x-3 items-center pt-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonCards;
