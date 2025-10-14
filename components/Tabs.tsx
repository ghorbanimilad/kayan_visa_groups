"use client"

import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

const categories = [
  {
    name: "شعب داخل ایران",
    posts: [
      {
        id: 1,
        title: "تهران (دفتر مرکزی)",
        address: "تهران، خ ولیعصر، بالاتر از پارک ساعی، مجتمع صدف، طبقه ۷، واحد ۱",
        coords: [35.7393, 51.4095]
      }
    ],
  },
  {
    name: "شعب خارج از ایران",
    posts: [
      {
        id: 1,
        title: "کانادا، تورنتو",
        address: "#200 801 York Mills rd, Toronto, M3B 1X7",
        coords: [43.7528641, -79.3584204],
      },
    ],
  },
];

export default function CustomTabs() {
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
    const [showMap, setShowMap] = useState(false); // حالت نمایش نقشه

    const handleShowMap = (coords: [number, number]) => {
    setSelectedCoords(coords);
    setShowMap(true); // وقتی دکمه زده شد، نقشه نمایش داده شود
  };

  return (
    <div className="flex flex-col mx-auto w-full px-4 pt-10">
      <div className="w-full">
        <TabGroup>
          <TabList className="flex gap-6 justify-center">
            {categories.map(({ name }) => (
              <Tab key={name} className="rounded-full px-3 py-1 text-sm font-semibold text-black
             data-selected:border-b-4 data-selected:border-red-700
             focus:outline-none focus:ring-0">
                {name}
              </Tab>
            ))}
          </TabList>
          <hr className="mt-2 border-gray-300" />
          <TabPanels className="mt-3">
            {categories.map(({ name, posts }) => (
              <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                <div className="grid gap-4">
                  {posts.map((post) => (
                    <div key={post.id} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 bg-white border border-gray-200 shadow-xl rounded-md p-6 text-sm">
                      <h1 className="font-semibold text-black">{post.title}</h1>
                      <h2 className="text-black/50">{post.address}</h2>
                      <button
                        onClick={() => setSelectedCoords(post.coords)}
                        className="flex items-center gap-1 text-cyan-600 cursor-pointer"
                      >
                        <MapPin className="w-5 h-5" />
                        نمایش روی نقشه
                      </button>
                    </div>
                  ))}
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>

      {/* نمایش نقشه */}
      {selectedCoords && (
        <div className="mt-6 w-full h-[400px] rounded-md">
          <LeafletMap coords={selectedCoords} />
        </div>
      )}
    </div>
  );
}
