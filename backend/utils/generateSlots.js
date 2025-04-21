// utils/generateSlots.js
const generateTimeSlots = (start, end) => {
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);

    const slots = [];
    let current = new Date();
    current.setUTCHours(startHour, startMin, 0, 0);

    const endTime = new Date();
    endTime.setUTCHours(endHour, endMin, 0, 0);

    while (current < endTime) {
        const slotStart = current.toISOString().substring(11, 16); // "HH:MM"
        current.setUTCMinutes(current.getUTCMinutes() + 30);
        const slotEnd = current.toISOString().substring(11, 16); // "HH:MM"
        slots.push(`${slotStart}-${slotEnd}`);
    }

    return slots;
};

module.exports = generateTimeSlots;
