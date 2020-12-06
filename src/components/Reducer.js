import { createContext } from 'react';

export const ContextApp = createContext(null);

export const initialState = {
    palette: [
        { offset: '0.00', color: 'rgb(238, 241, 11)' },
        { offset: '0.50', color: 'rgb(215, 128, 37)' },
    ],
    color: 'rgb(255, 255, 255)',
    gradient: false,
    angle: 0,
    sizeView: [141, 188],
    images: [],
    textObj: { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, magnam!', fontSize: 20, width: 141, fill: '#000', fontStyle: 'bold' },
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'setPalette':
            return { ...state, palette: action.value };
        case 'setAngle':
            return { ...state, angle: action.value };
        case 'setSizeView':
            return { ...state, sizeView: action.value };
        case 'togglePicker':
            return { ...state, gradient: action.value };
        case 'setColor':
            return { ...state, color: action.value };
        case 'setImages':
            return { ...state, images: action.value };
        case 'setTextObj':
            return { ...state, textObj: action.value };
        default:
            throw new Error();
    }
}