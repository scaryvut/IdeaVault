import Banner from "@/Components/Banner";
import Category from "@/Components/Category";
import Tranding from "@/Components/Tranding";
import Trust from "@/Components/Trust";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    <Banner></Banner>
    <Tranding></Tranding>
    <Category></Category>
    <Trust></Trust>
  </div>
  );
}
