import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  return NextResponse.json({
    data: {
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: [
                [
                  [110.16893518408602, -7.3078157572979165],
                  [110.16719590291325, -7.309006932895926],
                  [110.1687281268043, -7.310239180171735],
                  [110.1666161425228, -7.311266050304525],
                  [110.1675271945656, -7.3140180506158],
                  [110.17266221516974, -7.314593093314855],
                  [110.17514690255837, -7.3108553025344065],
                  [110.17407020469017, -7.307856832371314],
                  [110.16893518408602, -7.3078157572979165],
                ],
              ],
              type: "Polygon",
            },
          },
        ],
      },
    },
  });
}
