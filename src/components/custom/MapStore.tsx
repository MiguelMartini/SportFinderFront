import { useRef, useEffect, useState } from "react";
import "ol/ol.css";

// IMPORTS DO OPENLAYERS
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
import { createArea, getMyself } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ModalArea } from "./ModalArea";
import axios from "axios";
import Loading from "./Loading";

interface FormState {
  titulo: string;
  descricao: string;
  rua: string;
  numero: number | "";
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  lat: number;
  lon: number;
}

interface Area {
  lon: number;
  lat: number;
}

function MapStore() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [vectorSource] = useState(new VectorSource());
  const [clickedCoord, setClickedCoord] = useState<Coordenada | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const [areas, setAreas] = useState<Area[]>([]);
  const [userCity, setUserCity] = useState<Area[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    titulo: "",
    descricao: "",
    rua: "",
    numero: 0,
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: "",
    lat: 0,
    lon: 0,
  });

  const [errors, setErrors] = useState<{
    titulo: string;
    descricao?: string;
    rua: string;
    numero?: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento?: string;
  }>({});

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const consultaCep = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));

      toast.success("Endereço atualizado!");
    } catch (error) {
      toast.error("Erro ao buscar CEP");
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setErrors({});
    try {
      const response = await createArea(form);
      toast.success(`${response.data.message}`);
      navigate("/home");
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        const msgs = error.response.data.message;
        const backendErrors: any = {};

        Object.keys(msgs).forEach((field) => {
          backendErrors[field] = msgs[field][0];
        });
        setTimeout(function () {
          setErrors({});
        }, 5000);

        console.log(backendErrors);
        toast.error(backendErrors);
      } else {
        toast.error("Erro de conexão com o servidor.");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    async function localicaoUser() {
      try {
        const response = await getMyself();
        const dados = response.data.user;
        const userLoc: Area = {
          lat: Number(dados.lat),
          lon: Number(dados.lon),
        };

        setUserCity([userLoc]);
      } catch (error: any) {
        console.log(error);
      }
    }
    localicaoUser();
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

    initialMap.on("click", (e) => {
      const coord = toLonLat(e.coordinate);
      const [lon, lat] = coord;

      setClickedCoord({ lon, lat });

      // Também adiciona ao estado areas para manter tudo junto
      setForm((prev) => ({
        ...prev,
        lat,
        lon,
      }));
      console.log("Form atualizado:", { lat, lon });
      setOpenModal(true);
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
            src: "https://openlayers.org/en/latest/examples/data/dot.png",
            scale: 1.0,
          }),
        })
      );

      vectorSource.addFeature(feature);
    });
  }, [areas, map, vectorSource]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            ref={mapRef}
            style={{ width: "100%", height: "100vh", border: "1px solid #ccc" }}
          />
          <ModalArea
            open={openModal}
            onOpenChange={setOpenModal}
            form={form}
            handleChange={handleChange}
            handleCreate={handleCreate}
            consultaCep={consultaCep}
          />
        </>
      )}
    </div>
  );
}

export default MapStore;
