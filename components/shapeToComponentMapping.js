import AnimatedRec from "./shapes/AnimatedRec";
import AnimatedRecRotate from "./shapes/AnimatedRecRotate";
import Cube3d from "./shapes/Cube3d";
import SimpleImage from "./shapes/SimpleImage";
import SimpleText from "./shapes/SimpleText";
import AnimatedCircle from "./shapes/AnimatedCircle";
import Arrow from "./shapes/Arrow";
import ArrowBar from "./shapes/ArrowBar";
import Diamond3d from "./shapes/Diamond3d";
import RobotHandShake from "./shapes/RobotHandShake";
import FishRobot from "./shapes/FishRobot";
import DanceShape from "./shapes/DanceShape";
import AnimatedRedCircle from "./shapes/AnimatedRedCircle";
import GradientRect from "./shapes/GradientRect";
import FullGradientRect from "./shapes/FullGradientRect";
import GradientCircle from "./shapes/GradientCircle";
import FullGradientCircle from "./shapes/FullGradientCircle";
import LoaderRect from "./shapes/LoaderRect";
import Loader2 from "./shapes/Loader2";
import LoaderCircle from "./shapes/LoaderCircle";
import LoaderCube from "./shapes/LoaderCube";
import Loader5 from "./shapes/Loader5";
import Loader6 from "./shapes/Loader6";
import Loader7 from "./shapes/Loader7";
import Loader8 from "./shapes/Loader8";
import Loader9 from "./shapes/Loader9";
import LoadingRing from "./shapes/LoadingRing";

export const defaultSettings = {
  "AnimatedRec": {animationSpeed: "normal", shapeColor: "#2a2a2a", borderColor: "#51b39a", flowColor: "#aaaaaa"},
  "AnimatedCircle": {animationSpeed: "normal", shapeColor: "#2a2a2a", borderColor: "#51b39a", flowColor: "#aaaaaa"},
  "AnimatedRecRotate": {animationSpeed: "normal", shapeColor: "#1b14f5", borderColor: "#ffffff", flowColor: "#e30707"},
  "Cube3d": {animationSpeed: "normal", animationSpeedOff: "no", shapeColor: "#00ee00", textColor: "#00f01c", shapeText: "Text"},
  "SimpleText": {animationSpeed: "normal", textColor: "#fff", fontSize: 26, textAnimation: "none", borderColor: "#000000"},
  "Arrow": {animationSpeed: "slow", thickness: "normal", shapeColor: "#00ee00", flowColor: "#e30707", startX: 0, startY: 0, endX: 100, endY: 100, head: "end"},
  "ArrowBar": {animationSpeed: "slow", thickness: "normal", shapeColor: "#00ee00", flowColor: "#e30707", startX: 0, startY: 0, endX: 100, endY: 100, head: "end"},
  "Diamond3d": {animationSpeed: "slow", animationSpeedOff: "no", shapeColor: "#E0115F", textColor: "#00f01c", shapeText: "Text"},
  "RobotHandShake": {animationSpeed: "slow", animationSpeedOff: "no", shapeColor: "#ffffff", flowColor: "#87ceeb"},
  "FishRobot": {animationSpeed: "slow", animationSpeedOff: "no", shapeColor: "#306D85", flowColor: "#D93A54"},
  "DanceShape": {animationSpeed: "normal", shapeColor: "#ff7f50", animationSpeedOff: "no"},
  "AnimatedRedCircle": {animationSpeed: "normal", shapeColor: "#ff0000", borderColor: "#ff0000"},
  "GradientRect": {animationSpeed: "normal", shapeColor: "#2a2a2a"},
  "FullGradientRect": {animationSpeed: "normal", borderColor: "#51b39a"},
  "GradientCircle": {animationSpeed: "normal", shapeColor: "#2a2a2a"},
  "FullGradientCircle": {animationSpeed: "normal", borderColor: "#51b39a"},
  "LoaderRect": {animationSpeed: "normal", flowColor: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)", animationSpeedOff: "no"},
  "Loader2": {animationSpeed: "normal", flowColor: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)", animationSpeedOff: "no"},
  "LoaderCircle": {animationSpeed: "normal", flowColor: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)", animationSpeedOff: "no"},
  "LoaderCube": {animationSpeed: "normal", shapeColor: "#ffffff", animationSpeedOff: "no"},
  "Loader5": {animationSpeed: "normal", shapeColor: "#ffffff", animationSpeedOff: "no"},
  "Loader6": {animationSpeed: "normal", shapeColor: "#ffffff", animationSpeedOff: "no"},
  "Loader7": {animationSpeed: "normal", shapeColor: "#ffffff", animationSpeedOff: "no"},
  "Loader8": {animationSpeed: "normal", shapeColor: "#ffffff", animationSpeedOff: "no"},
  "Loader9": {animationSpeed: "normal", shapeColor: "#ffffff", animationSpeedOff: "no"},
  "LoadingRing": {animationSpeed: "normal", borderColor: "#3c3c3c", flowColor: "#fff000", animationSpeedOff: "no"},
}

export const getComponentByName = (componentName) => {
  return components[componentName] || null;
};

const components = {
  "AnimatedRec": AnimatedRec,
  "AnimatedCircle": AnimatedCircle,
  "AnimatedRecRotate": AnimatedRecRotate,
  "Cube3d": Cube3d, 
  "SimpleImage": SimpleImage,
  "SimpleText": SimpleText,
  "Arrow": Arrow,
  "ArrowBar": ArrowBar,
  "Diamond3d": Diamond3d,
  "RobotHandShake": RobotHandShake,
  "FishRobot": FishRobot,
  "DanceShape": DanceShape,
  "AnimatedRedCircle": AnimatedRedCircle,
  "GradientRect": GradientRect,
  "FullGradientRect": FullGradientRect,
  "GradientCircle": GradientCircle,
  "FullGradientCircle": FullGradientCircle,
  "LoaderRect": LoaderRect,
  "Loader2": Loader2,
  "LoaderCircle": LoaderCircle,
  "LoaderCube": LoaderCube,
  "Loader5": Loader5,
  "Loader6": Loader6,
  "Loader7": Loader7,
  "Loader8": Loader8,
  "Loader9": Loader9,
  "LoadingRing": LoadingRing,
}

export default components;