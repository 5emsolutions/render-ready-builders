import dayA from "@/assets/5EM-sample-daytime-exterior_1.jpg.asset.json";
import twilightA from "@/assets/5EM-sample-twilight-exterior_1.jpg.asset.json";
import dayB from "@/assets/render-daytime-exterior.jpg.asset.json";
import twilightB from "@/assets/render-twilight-exterior.jpg.asset.json";
import twilightC from "@/assets/twilight-2.jpg.asset.json";
import planA from "@/assets/floorplan-3d.jpg.asset.json";
import planB from "@/assets/floorplan-2.jpg.asset.json";
import blueprint from "@/assets/blueprint-elevation.jpg.asset.json";

export const blueprintUrl = blueprint.url;
export const heroRenderUrl = twilightA.url;

export type Category = "daytime" | "twilight" | "plans";

export type Work = {
  url: string;
  title: string;
  meta: string;
  category: Category;
  span: string;
};

export const works: Work[] = [
  {
    url: twilightA.url,
    title: "Twilight elevation",
    meta: "Spec plan set A",
    category: "twilight",
    span: "md:col-span-2 md:row-span-3",
  },
  {
    url: dayA.url,
    title: "Daytime front elevation",
    meta: "Spec plan set A",
    category: "daytime",
    span: "md:col-span-2",
  },
  {
    url: planA.url,
    title: "3D dollhouse plan — main level",
    meta: "Production builder",
    category: "plans",
    span: "md:col-span-2",
  },
  {
    url: dayB.url,
    title: "Daytime three-quarter view",
    meta: "Sample plan set B",
    category: "daytime",
    span: "md:col-span-2",
  },
  {
    url: twilightC.url,
    title: "Twilight hero shot",
    meta: "Modern farmhouse, 2-story",
    category: "twilight",
    span: "md:col-span-2",
  },
  {
    url: twilightB.url,
    title: "Dusk three-quarter view",
    meta: "Sample plan set B",
    category: "twilight",
    span: "md:col-span-2",
  },
  {
    url: planB.url,
    title: "3D dollhouse plan — upper level",
    meta: "Custom builder",
    category: "plans",
    span: "md:col-span-2",
  },
];

export const filters: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "daytime", label: "Daytime Stills" },
  { id: "twilight", label: "Twilight Stills" },
  { id: "plans", label: "3D Floor Plans" },
];
