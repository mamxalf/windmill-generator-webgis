interface FeatureProperties {
    id: number;
    name: string;
    luas: number;
    [key: string]: any; // To allow additional properties
}

interface Feature {
    type: string;
    id: number;
    properties: FeatureProperties;
    geometry: {
        type: string;
        coordinates: any[];
    };
}

export interface GeoJSONData {
    type: string;
    name: string;
    crs: {
        type: string;
        properties: {
            name: string;
        };
    };
    features: Feature[];
}

export const calculateTotalWide = async (data: GeoJSONData) => {
    return data.features.reduce((sum, feature) => {
        return sum + (feature.properties.luas || 0);
    }, 0);
}

export const calculateTotalWideByRemark = (data: GeoJSONData) => {
    return data.features.reduce((acc, feature) => {
        const remark = feature.properties.REMARK;
        const luas = feature.properties.luas || 0;

        // @ts-expect-error
        if (!acc[remark]) {
            // @ts-expect-error
            acc[remark] = 0;
        }
        // @ts-expect-error
        acc[remark] += luas;

        return acc;
    }, {});
}