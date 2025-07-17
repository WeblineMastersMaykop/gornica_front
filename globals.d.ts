// Add global django variable attached to window 
declare global {
  interface Window {
    django: {
        /**
         * URL to the dealers API endpoint
         */
        dealersUrl: string;
        /**
         * Placemark icon url
         */
        placemark: string;
    };
  }
}