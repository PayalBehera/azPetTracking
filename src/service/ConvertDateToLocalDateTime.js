class ConvertDateToLocalDateTime {

    convertLocalDateAndTime(utcDate) {
       return (new Date(utcDate)).toString().slice(0,24);
    }


}

export default new ConvertDateToLocalDateTime();