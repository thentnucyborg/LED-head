const electrodes = 60
const fakeBrainActivity = (min, max) => {
    let activity = []
    for (let i = 0; i < electrodes; i++) {
        activity.push(Math.floor(Math.random() * max - min))
    }
    return activity
}

module.exports = {fakeBrainActivity}