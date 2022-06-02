

export default class ExtendFunction {
    romanize(num) {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }
    checkPermission(username, password) {
        if (username === 'admin' && password === 'admin') {
            return true;
        }
        return false;
    }
    cutString(str, length = 35) {
        if (str.length > length) {
            return str.substring(0, length) + '...';
        }
        return str;
    }
    timeBetween(date1, date2) {
        let seconds = 0
        let minutes = 0
        let hours = 0
        let days = 0
        let months = 0

        seconds = Math.floor((date2 - date1) / 1000)
        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60)
            seconds = seconds - minutes * 60

            if (minutes >= 60) {
                hours = Math.floor(minutes / 60)
                minutes -= hours * 60

                if (hours >= 24) {
                    days = Math.floor(hours / 24)
                    hours -= days * 24

                    if (days >= 30) {
                        months = Math.floor(days / 30)
                        days -= months * 30
                    }
                }
            }
        }

        let result = `${months ? (months >= 10 ? months : '0' + months) + ' tháng' : ''}
        ${days >= 10 ? days : `0${days}`} ngày
        ${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`

        return {
            seconds,
            minutes,
            hours,
            days,
            months,
            resultString: result
        }
    }
}