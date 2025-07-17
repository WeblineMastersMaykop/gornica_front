
interface APIMapDealers {
    type: "FeatureCollection";
    features: Array<{
        type: "Feature";
        id: number;
        geometry: {
            type: "Point";
            coordinates: [string, string];
        };
        properties: {
            balloonContentBody: string;
            clusterCaption: string;
            hintContent: string;
        };
    }>;
}