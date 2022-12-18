import moment from 'moment'
/**
 * @param {*} date
 **/
 export const genericDate = date => {
    return moment(date).format('DD-MMM-YY')
}
