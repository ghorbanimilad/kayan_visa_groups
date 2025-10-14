"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

interface LeafletMapProps {
  coords: [number, number];
}

export default function LeafletMap({ coords }: LeafletMapProps) {
  
  // Fix default marker icon issue
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/location.png",
      shadowUrl: "/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer center={coords} zoom={13} className="w-full h-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coords}>
        <Popup>موقعیت انتخاب شده</Popup>
      </Marker>
    </MapContainer>
  );
}
