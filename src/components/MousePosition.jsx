import { useRef, useState, createContext, useEffect } from "react";
import waldo from "../assets/waldo2.jpg";
import BackgroundImg from "./BackgroundImg";
import useFetch from "../useFetch";
import Timer from "./Timer";

export const MagnifierContext = createContext({
  coords: {},
  src: null,
  imgSize: {},
  showMagnifier: false,
  targetingBox: false,
  magnifierSettings: {},
  selection: "",
  characters: [],
  clientXY: {},
});

export default function MousePosition({ setGameOver, time }) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[xRatio, yRatio], setXYRatio] = useState([0, 0]);
  const modal = useRef(null);
  const [selection, setSelection] = useState("");
  const [targetingBox, setTargetingBox] = useState(false);
  const { data, loading, error } = useFetch("http://localhost:3000/characters");
  const [characters, setCharacters] = useState([
    { name: "Waldo", value: "waldo" },
    // { name: "Wilma", value: "wilma" },
    // { name: "The Wizard", value: "wizard" },
    // { name: "Odlaw", value: "odlaw" },
  ]);
  const [correctCoords, setCorrectCoords] = useState([]);
  const [[clientX, clientY], setClientXY] = useState([0, 0]);

  useEffect(() => {
    if (characters.length === 0) {
      setGameOver(true);
    }
  }, [characters, setGameOver]);

  const coords = { x, y };
  const src = waldo;
  const imgSize = { w: imgWidth, h: imgHeight };
  const magnifierSettings = {
    magHeight: 100,
    magWidth: 100,
    zoomLevel: imgSize.w < 500 ? 4 : imgSize.w > 1000 ? 2 : 3,
  };
  const clientXY = { clientX, clientY };

  const handleClick = (e) => {
    if (e.target.id != "select") setClientXY([e.clientX, e.clientY]);
    setTargetingBox(true);
    setXYRatio([x / imgWidth, y / imgHeight]);
    if (!modal.current.open) modal.current.showModal();
    if (e.target.className === "modal" || e.target.className === "option")
      modal.current.close();
  };

  const handleChange = (e) => {
    setTargetingBox(false);
    validateSelection(e.target.value);
  };

  const round = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const validateSelection = (target) => {
    setSelection(target);
    if (data) {
      const result = data.find(({ name }) => name === target);
      if (
        //check if less than 0.02 difference in pixel ratio
        round(result.x_ratio - xRatio) <= Math.abs(0.02) &&
        round(result.y_ratio - yRatio) <= Math.abs(0.02)
      ) {
        setCharacters(
          characters.filter((character) => character.value !== target)
        );
        setCorrectCoords([...correctCoords, [xRatio, yRatio]]);
      } else {
        console.log("fail");
      }
    }
    modal.current.close();
    setSelection("");
  };
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        A network error was encountered.{" "}
        <button onClick={() => location.reload()}>Refresh</button>
      </p>
    );
  return (
    <>
      <MagnifierContext.Provider
        value={{
          coords,
          src,
          imgSize,
          showMagnifier,
          targetingBox,
          magnifierSettings,
          selection,
          characters,
          clientXY,
        }}
      >
        <BackgroundImg
          handleClick={handleClick}
          src={waldo}
          setImgSize={setImgSize}
          setShowMagnifier={setShowMagnifier}
          setXY={setXY}
          modal={modal}
          handleChange={handleChange}
          correctCoords={correctCoords}
        />
      </MagnifierContext.Provider>
      {/* Debug panel for testing */}
      {/* <div className="debugPanel">
        <div>Offset X Position: {x}</div>
        <div>Offset Y Position: {y}</div>
        <div>X Ratio: {xRatio}</div>
        <div>Y Ratio: {yRatio}</div>
        <div>Img Height: {imgHeight}</div>
        <div>Img Width: {imgWidth}</div>
        <div>Selection: {selection}</div>
        <div>ClientX: {clientX}</div>
        <div>ClientY: {clientY}</div>
      </div> */}
      {/* <p>
        <a
          href="https://www.flaticon.com/free-icons/foursquare-check-in"
          title="foursquare check in icons"
        >
          Foursquare check in icons created by hqrloveq - Flaticon
        </a>
      </p> */}
      <Timer time={time} />
    </>
  );
}
