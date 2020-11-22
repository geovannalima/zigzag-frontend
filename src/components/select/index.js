import React from "react";
import Select from "react-select";

const Todo = (props) => {
    const colourStyles = {
        control: (base, state) => ({
            ...base,
            background: "none",
            overflow:"none",
            marginTop: 10,
            marginBottom: 10,
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // Overwrittes the different states of border
            // Removes weird border around container
            

        }),
        menu: (base) => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: (base) => ({
            ...base,
            // kill the white space on first and last option
            padding: 0
        })
    };
    return (
        <Select
            label="Single select"
            options={props.options}
            styles={colourStyles}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    )

};

export default Todo;

