import { useRef, useEffect, useState } from "react";
import "ol/ol.css";

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

import { fromLonLat } from "ol/proj.js";
import { getAreas, getMyself } from "@/api/api";
import mapPin2 from "../../assets/mapPin2.svg";

interface Area {
  lon: number;
  lat: number;
}

export default function MapOL() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [vectorSource] = useState(new VectorSource());
  const [userCity, setUserCity] = useState<Area[]>([]);

  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function localicaoUser(){
      try{
        const response = await getMyself();
        const dados = response.data.user
        const userLoc: Area = {
          lat: Number(dados.lat),
          lon: Number(dados.lon),
        };

        setUserCity([userLoc])
      }catch(error: any){
        console.log(error)
      }
    }
    localicaoUser();
  }, []);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const response = await getAreas();

        const novasAreas: Area[] = response.data.message.map((area: any) => ({
          lat: area.endereco.lat,
          lon: area.endereco.lon,
        }));

        setAreas(novasAreas);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  useEffect(() => {
      if (!mapRef.current) return;
      if (userCity.length === 0) return; 

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
        center: fromLonLat([userCity[0].lon, userCity[0].lat]),
        zoom: 15,
      }),
    });

    setMap(initialMap);

    return () => initialMap.setTarget(null);
  }, [vectorSource, userCity]);

  // Adiciona os pontos do backend ao vectorSource
  useEffect(() => {
    if (!map || areas.length === 0) return;

    // Limpa todos os pontos para evitar duplicados
    vectorSource.clear();

    areas.forEach((area) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([area.lon, area.lat])),
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: mapPin2,
            scale: 1.0,
          }),
        })
      );

      vectorSource.addFeature(feature);
    });
  }, [areas, map, vectorSource]);

  return (
    <div>
      {loading && <p>Carregando áreas...</p>}
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh", border: "1px solid #ccc" }}
      />
    </div>
  );
}
