import React, { useState } from "react";

function hexToRgb (colorHex: string) {
  const colorRgb: Array<number | string> = Array.from(
      {length: 3}, 
      (_, i) => {
        const oneThirdOfRgb = parseInt(colorHex.slice((i * 2 + 1), (i * 2 + 3)), 16);
        return isNaN(oneThirdOfRgb) ? "NaN" : oneThirdOfRgb;
      }
    );

  return colorRgb;
}

export const ColorWidget = () => {
  const [colorRGB, setColor] = useState<Array<number | string> | string>([255, 255, 255]);
  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {value} = e.target;
    if (value.length < 7 || value.slice(0, 1) !== "#") return;

    const convertedValue: Array<number | string> | string = 
      hexToRgb(value).every(item => typeof item === "number")
        ? hexToRgb(value)
        : "Error!";
    setColor(convertedValue);
  }; 

  return (
    <div className="container" style={
      {
        backgroundColor: `rgba(${typeof colorRGB === "object" ? colorRGB.join(", ") + ", .5" : "255, 201, 102, .5" })`,
      }
    }>
      <form>
        <label htmlFor="hex" className="text text_tittle">HEX ={'>'} rgb</label>
        <input type="text" maxLength={7} id="hex" name="hex" onChange={handler} className="input_hex"/>
        <div className="text text_rgb" style={
          {
            backgroundColor: `rgba(${typeof colorRGB === "object" ? colorRGB.join(", ") + ", 1" : "255, 201, 102, 1" })`,
            color: `rgb(${typeof colorRGB !== "object" || colorRGB.join(", ") !== "255, 255, 255"
              ? "255, 255, 255" 
              : "0, 0, 0"})`
          }
        }>
          {typeof colorRGB === "object" ? `rgb(${colorRGB.join(", ")})` : "Ошибка!"}
        </div>
      </form>
    </div>
  );
};
