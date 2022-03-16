

const ColorPicker = () => {
    const num = Math.floor(Math.random() * 10)
    if (num === 1) return 'blue'
    else if (num === 2) return 'pink'
    else if (num === 3) return 'green'
    else if (num === 4) return 'orange'
    else if (num === 5) return 'red'
    else if (num === 6) return 'purple'
    else if (num === 7) return 'cyan'
    else if (num === 8) return 'black'
    else if (num === 9) return 'white'
    else if (num === 0) return 'yellow'
}

export default ColorPicker
