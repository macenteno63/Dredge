import { create } from "zustand";

export default create((set) =>
    {
        return {
            sunPosition: [100, 20, 100],
            boatPosition: {x:0,y:0,z:0},
            updateBoatPosition: ({x,y,z}) => set({boatPosition: {x,y,z}}),
        }
    })