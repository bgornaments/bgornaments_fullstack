// react-lottie.d.ts
declare module 'react-lottie' {
  import { Component } from 'react';

  interface LottieOptions {
    loop?: boolean;
    autoplay?: boolean;
    animationData: any;
    rendererSettings?: {
      preserveAspectRatio?: string;
    };
  }

  interface LottieProps {
    options: LottieOptions;
    height?: number | string;
    width?: number | string;
    isStopped?: boolean;
    isPaused?: boolean;
    eventListeners?: Array<{
      eventName: string;
      callback: () => void;
    }>;
  }

  class Lottie extends Component<LottieProps> {}
  export default Lottie;
}
