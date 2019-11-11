import React, { useState } from "react";
// import axios from "axios";
import {axiosWithAuth} from '../Auth/Api';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props) => {
  const { colors, updateColors} = props;
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e,id) => {
    e.preventDefault();
    console.log(id)
    const updatedColors = colors.filter( color => color.id != id);
    axiosWithAuth().put(`/api/colors/${id}`,colorToEdit )
                 .then( res => {
                    console.log(res);
                    setColorToEdit(res.data)
                    updateColors([...updatedColors, colorToEdit])
                    setEditing(!editing);
                 })
                 .catch( err => {
                    console.log(err);
                 })   
  };

  const deleteColor = id => {      
    
     axiosWithAuth().delete(`/api/colors/${id}`)
                  .then( response => {
                     console.log(response)
                     updateColors(colors.filter( color => color.id != id));
                  })
                  .catch(err => {
                    console.log(err);
                  })
  };
  console.log('after click', colorToEdit.id);
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color.id)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={(e) => saveEdit(e,colorToEdit.id)}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
