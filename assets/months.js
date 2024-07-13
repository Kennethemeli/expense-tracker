const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
 const date = new Date();
const displayFullDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
const displayFullMonth = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;


export default monthNames;
export {displayFullDate , displayFullMonth}