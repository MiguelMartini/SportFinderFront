import React, { useRef, useEffect, useState } from "react";
import "ol/ol.css";

// IMPORTS DO OPENLAYERS (versões mais novas precisam .js no final)
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector.js";

import OSM from "ol/source/OSM.js";
import VectorSource from "ol/source/Vector.js";

import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";

import Style from "ol/style/Style.js";
import Icon from "ol/style/Icon.js";

import { fromLonLat, toLonLat } from "ol/proj.js";

// Tipagem do estado das coordenadas clicadas
interface Coordenada {
  lon: number;
  lat: number;
}

export default function MapOL() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [vectorSource] = useState(new VectorSource());
  const [clickedCoord, setClickedCoord] = useState<Coordenada | null>(null);

  let subtitle = useRef<HTMLHeadingElement | null>(null);


  const mapDots = [
  { lon: -50.3205, lat: -27.8102 },
  { lon: -50.3212, lat: -27.8130 },
  { lon: -50.3189, lat: -27.8095 },
];

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center: fromLonLat([-50.32, -27.81]), 
        zoom: 15,
      }),
    });

     mapDots.forEach((dot) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([dot.lon, dot.lat])),
    });

    feature.setStyle(
      new Style({
        image: new Icon({
          src: "https://openlayers.org/en/latest/examples/data/dot.png",
          scale: 1.0,
        }),
      })
    );

    vectorSource.addFeature(feature);
  });

    // Evento de clique no mapa
    initialMap.on("click", (e) => {
    const feature = new Feature({
      geometry: new Point(e.coordinate),
    });


      feature.setStyle(
      new Style({
        image: new Icon({
          src: "https://openlayers.org/en/latest/examples/data/dot.png",
          scale: 0.9,
        }),
      })
    );

      vectorSource.addFeature(feature);

      // Converte coordenada
      const [lon, lat] = toLonLat(e.coordinate);
      setClickedCoord({ lon, lat });

    });

    setMap(initialMap);

    return () => initialMap.setTarget(null);
  }, [vectorSource]);

  return (
    <div>
      <div className="rounded-full"
        ref={mapRef}
        style={{ width: "100%", height: "100vh", border: "1px solid #ccc" }}
      />
    </div>
  );
}
