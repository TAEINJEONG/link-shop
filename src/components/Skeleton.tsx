import React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const SkeletonWrapper = styled.div`
  background: #e0e0e0;
  border-radius: 4px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <SkeletonWrapper className={className} />;
};

export default Skeleton;
