// Function to add date suffix
const addDateSuffix = (date) => {
    const dateStr = date.toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === '1' && dateStr !== '11') {
        return `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        return `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        return `${dateStr}rd`;
    } else {
        return `${dateStr}th`;
    }
};

// Function to format a timestamp
const formatTimestamp = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const dateObj = new Date(timestamp);

    const monthOptions = {
        short: 'short',
        long: 'long',
    };

    const formattedMonth = dateObj.toLocaleDateString('en-US', { month: monthOptions[monthLength] });

    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();

    const year = dateObj.getFullYear();

    let hour = dateObj.getHours() % 12 || 12; 

    const minutes = dateObj.getMinutes().toString().padStart(2, '0'); 

    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

    return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
};

module.exports = formatTimestamp;