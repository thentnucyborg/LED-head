const electrodes = 60
const fakeBrainActivity = (min, max) => {
    return Array(electrodes).map(() => math.floor(math.randint() * max - min))
}