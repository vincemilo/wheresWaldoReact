import { useRef, useState, createContext, useEffect } from "react";
import waldoEasy from "../assets/waldo.jpg";
import waldoMedium from "../assets/waldo3.jpg";
import waldoHard from "../assets/waldo2.jpg";
import BackgroundImg from "./BackgroundImg";
import useFetch from "../hooks/useFetch";
import Timer from "./Timer";
import PropTypes from "prop-types";
// import DebugPanel from "./DebugPanel";

const MAGNIFIER_SETTINGS = {
  magHeight: 100,
  magWidth: 100,
  getZoomLevel: (width) => {
    if (width < 500) return 4;
    if (width > 1000) return 2;
    return 3;
  },
};

const INITIAL_CHARACTERS = [
  { name: "Waldo", value: "waldo" },
  { name: "Wilma", value: "wilma" },
  { name: "The Wizard", value: "wizard" },
  { name: "Odlaw", value: "odlaw" },
];

const round = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const isCloseEnough = (a, b, threshold = 0.01) => {
  return Math.abs(round(a - b)) <= threshold;
};

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

export default function MousePosition({
  url,
  handleGameOver,
  time,
  difficulty,
  initialCharacters = INITIAL_CHARACTERS,
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);
  const [[clientX, clientY], setClientXY] = useState([0, 0]);
  const [[xRatio, yRatio], setXYRatio] = useState([0, 0]);
  const src =
    difficulty === 1 ? waldoEasy : difficulty === 2 ? waldoMedium : waldoHard;

  const [showMagnifier, setShowMagnifier] = useState(false);
  const [targetingBox, setTargetingBox] = useState(false);
  const [selection, setSelection] = useState("");

  const [characters, setCharacters] = useState(initialCharacters);
  const [correctCoords, setCorrectCoords] = useState([]);

  const modal = useRef(null);

  const endpoint =
    difficulty === 1
      ? `${url}/easy_characters`
      : difficulty === 2
      ? `${url}/med_characters`
      : `${url}/characters`;
  const { data, loading, error } = useFetch(endpoint);

  useEffect(() => {
    if (characters.length === 0) {
      handleGameOver();
    }
  }, [characters, handleGameOver]);

  const contextValue = {
    coords: { x, y },
    src: src,
    imgSize: { w: imgWidth, h: imgHeight },
    showMagnifier,
    targetingBox,
    magnifierSettings: {
      ...MAGNIFIER_SETTINGS,
      zoomLevel: MAGNIFIER_SETTINGS.getZoomLevel(imgWidth),
    },
    selection,
    characters,
    clientXY: { clientX, clientY },
  };

  const handleClick = (e) => {
    if (
      e.target.id !== "select" &&
      e.target.className !== "modalDiv" &&
      e.target.className !== "targeting-box"
    ) {
      setClientXY([e.clientX, e.clientY]);
    }

    setTargetingBox(true);
    setXYRatio([x / imgWidth, y / imgHeight]);

    if (modal.current && !modal.current.open) {
      modal.current.showModal();
    }

    if (e.target.className === "modal" || e.target.className === "option") {
      modal.current.close();
    }
  };

  const handleChange = (e) => {
    setTargetingBox(false);
    validateSelection(e.target.value);
  };

  const validateSelection = (target) => {
    setSelection(target);
    if (!data) return;

    const result = data.find(({ name }) => name === target);
    if (!result) return;

    const isCorrect =
      isCloseEnough(result.x_ratio, xRatio) &&
      isCloseEnough(result.y_ratio, yRatio);

    if (isCorrect) {
      setCharacters(
        characters.filter((character) => character.value !== target)
      );
      setCorrectCoords([...correctCoords, [xRatio, yRatio]]);
    }

    if (modal.current) {
      modal.current.close();
    }
    setSelection("");
  };

  if (loading) return <p data-testid="loading-state">Loading...</p>;

  if (error) {
    return (
      <p data-testid="error-state">
        A network error was encountered.{" "}
        <button onClick={() => window.location.reload()}>Refresh</button>
      </p>
    );
  }

  return (
    <>
      <MagnifierContext.Provider value={contextValue}>
        <BackgroundImg
          handleClick={handleClick}
          src={src}
          setImgSize={setImgSize}
          setShowMagnifier={setShowMagnifier}
          setXY={setXY}
          modal={modal}
          handleChange={handleChange}
          correctCoords={correctCoords}
        />
      </MagnifierContext.Provider>
      {/* Debug panel for testing */}
      {/* <DebugPanel
        x={x}
        y={y}
        xRatio={xRatio}
        yRatio={yRatio}
        imgHeight={imgHeight}
        imgWidth={imgWidth}
        selection={selection}
        clientX={clientX}
        clientY={clientY}
      /> */}
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

MousePosition.propTypes = {
  handleGameOver: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  initialCharacters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  difficulty: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
