import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

// // User data mapped by country codes (ISO 3166-1 alpha-2)
// const mapData: { [key: string]: number } = {
//   Ireland: 1000,
//   India: 500,
//   Canada: 800,
//   "United Kingdom": 300,
//   // Add more countries...
// };

// A color scale based on user count
const colorScale = scaleLinear<string>()
  .domain([0, 1000]) // Adjust based on your data range
  // .range(["#003559", "#061A40"]); // Light blue to dark blue
  // .range(["#FEE5D9", "#ED4D6E"]); // Light red to dark red
  // .range(["#4C0827", "#100007"]);
  .range(["#F26157", "#582630"]);

const MapWithTooltip = ({ mapData }: { mapData: Record<string, number> }) => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="relative">
      {/* Map container */}
      <Card className="flex flex-col w-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Map Chart - User Location</CardTitle>
          <CardDescription>{`User Location`}</CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ComposableMap projection={"geoMercator"} className="aspect-square">
            <Geographies
              className=" aspect-square"
              geography="/geojson/world-countries.json"
            >
              {/* <Geographies geography="/geojson/world_map.json"> */}
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoName: string = geo.properties.name; // Country name

                  // Ensure mapData is defined and handle cases where geoName might not exist in mapData
                  const users = mapData?.[geoName] ?? 0; // Get user count or 0

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(`${geoName}: ${users} users`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent(""); // Clear tooltip on mouse leave
                      }}
                      fill={colorScale(users)} // Color based on user count
                      className="transition-all duration-200 ease-in-out hover:stroke-[#061A40] hover:stroke-2" // Hover effect
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </CardContent>
      </Card>

      {/* Tooltip */}
      {tooltipContent && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 bg-black text-white text-sm px-3 py-2 rounded shadow-lg">
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default MapWithTooltip;
