let month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default {
    transformToString(date, expressive = true) {
        if (!expressive)
            return this.formatDate(date, '%d. %m. %Y');

        return this.formatDate(date, '%d. %m. %Y ve %H:%M');
    },
    
    transformToStringOrig(date, expressive = true) {
        date += ''; // Transform to string
        let y = date.substring(0, 4);
        let m = date.substring(4, 6);
        let d = date.substring(6, 8);
        m = (m[0] - '0') * 10 + (m[1] - '0');

        if(!expressive)
            return d + " " + month[m] + " " + y;

        let hr = date.substring(8, 10);
        let min = date.substring(10, 12);
        
        return d + " " + month[m] + " " + y + " at " + hr + ":" + min;
    },

    formatDate(date, format) {
        date += ''; // Transform to string
        date = new Date(
            date.substring(0, 4), 
            date.substring(4, 6) - 1,
            date.substring(6, 8),
            date.substring(8, 10),
            date.substring(10, 12), 
            date.substring(12, 14));
        var nDay = date.getDay(),
            nDate = date.getDate(),
            nMonth = date.getMonth(),
            nYear = date.getFullYear(),
            nHour = date.getHours(),
            aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
            isLeapYear = function() {
                return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
            },
            getThursday = function() {
                var target = new Date(date);
                target.setDate(nDate - ((nDay+6)%7) + 3);
                return target;
            },
            zeroPad = function(nNum, nPad) {
                return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
            };
        return format.replace(/%[a-z]/gi, function(sMatch) {
            return {
                '%a': aDays[nDay].slice(0,3),
                '%A': aDays[nDay],
                '%b': aMonths[nMonth].slice(0,3),
                '%B': aMonths[nMonth],
                '%c': date.toUTCString(),
                '%C': Math.floor(nYear/100),
                '%d': zeroPad(nDate, 2),
                '%e': nDate,
                '%F': date.toISOString().slice(0,10),
                '%G': getThursday().getFullYear(),
                '%g': ('' + getThursday().getFullYear()).slice(2),
                '%H': zeroPad(nHour, 2),
                '%I': zeroPad((nHour+11)%12 + 1, 2),
                '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
                '%k': '' + nHour,
                '%l': (nHour+11)%12 + 1,
                '%m': zeroPad(nMonth + 1, 2),
                '%M': zeroPad(date.getMinutes(), 2),
                '%p': (nHour<12) ? 'AM' : 'PM',
                '%P': (nHour<12) ? 'am' : 'pm',
                '%s': Math.round(date.getTime()/1000),
                '%S': zeroPad(date.getSeconds(), 2),
                '%u': nDay || 7,
                '%V': (function() {
                        var target = getThursday(),
                        n1stThu = target.valueOf();
                        target.setMonth(0, 1);
                        var nJan1 = target.getDay();
                        if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
                        return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
                    })(),
                '%w': '' + nDay,
                '%x': date.toLocaleDateString(),
                '%X': date.toLocaleTimeString(),
                '%y': ('' + nYear).slice(2),
                '%Y': nYear,
                '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
                '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
            }[sMatch] || sMatch;
    })
  }
};
