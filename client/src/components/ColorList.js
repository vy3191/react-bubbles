import React, { useState } from "react";
// import axios from "axios";
import {axiosWithAuth} from '../Auth/Api';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props) => {
  const { colors, updateColors} = props;
  const [newColor, setNewColor] = useState({color:"", hex:""});
  const [editing, setEditing] = useState(false);
  const [addColorFlag, setAddColorFlag] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
 
  const handleChange = (e) => {
     setNewColor({...newColor, [e.target.name]:e.target.value});
  }
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const handleSubmit = (event) => {
     event.preventDefault();
     const code = {hex:newColor.hex}
     const color = {color:newColor.color, code:code}
     axiosWithAuth().post(`/api/colors`, color)
                    .then(res => {
                       console.log(res.data)
                       setNewColor({color:"", hex:""})
                       updateColors([...colors, color]);
                       setAddColorFlag(!addColorFlag);
                    })
                    .catch(err => {
                      console.log(err)
                    });

  }

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
      <p>colors</p>{" "}{" "}<button style={{width: "50%"}}
                             onClick={() => setAddColorFlag(!addColorFlag)}>Add Colors</button>
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
      {addColorFlag && (
        <form onSubmit={handleSubmit}>
          <legend>Add Your color</legend>
          <label>Color:
            <input name="color"
            onChange={handleChange}  
            value={newColor.color}
            placeholder="color"
            required />
          </label>
          <label>Hex:
            <input name="hex"
             onChange={handleChange}
             value={newColor.hex}
             placeholder="Hex"
             required />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>{" "}
            <button onClick={() => setAddColorFlag(!addColorFlag)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
