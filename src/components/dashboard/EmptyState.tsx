import React from "react";

interface EmptyStateProps {
  text: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
  return (
    <div className="text-gray-400 text-sm text-center py-6">
      {text}
    </div>
  );
};

export default EmptyState;