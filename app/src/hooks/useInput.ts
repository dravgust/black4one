import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);
    return [
        {value, onChange: (e: any) => setValue(e.target.value)},
        () => setValue(initialValue)
    ]
}

/*const [titleProps, resetTitle] = useInput("")
return (
    <form onSubmint={(e)=>{
        e.preventDefault();
        resetTitle();
    }}>
        <input 
        {...titleProps}
        type="text"
        />
        <button>Add</button>
        </form>
)*/