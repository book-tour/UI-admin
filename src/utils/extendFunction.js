import { list } from "postcss";


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
    // cloundinary =======================================
    processFile(file,list,idFolder) {
        // var file = e.target.files[0];
        console.log(file);
        // Set your cloud name and unsigned upload preset here:
        var YOUR_CLOUD_NAME = "dhz4hr8dq";
        var YOUR_UNSIGNED_UPLOAD_PRESET = "r5u45pdp";

        var POST_URL =
            "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

        var XUniqueUploadId = +new Date();

        processFile();

        function processFile(e) {
            var size = file.size;
            var sliceSize = 20000000;
            var start = 0;

            // setTimeout(loop, 3);
loop();
            function loop() {
                var end = start + sliceSize;

                if (end > size) {
                    end = size;
                }
                var s = slice(file, start, end);
                send(s, start, end - 1, size);
                // if (end < size) {
                //     start += sliceSize;
                //     setTimeout(loop, 3);
                // }
            }
            return
        }

        function send(piece, start, end, size) {
            console.log("start ", start);
            console.log("end", end);

            var formdata = new FormData();
            console.log(XUniqueUploadId);

            formdata.append("file", piece);
            formdata.append("cloud_name", YOUR_CLOUD_NAME);
            formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
            formdata.append("public_id", `destinations/${idFolder}/myChunkedFile2`);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", POST_URL, false);
            xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
            xhr.setRequestHeader(
                "Content-Range",
                "bytes " + start + "-" + end + "/" + size
            );

            xhr.onload = function () {
                // do something to response
                let data = JSON.parse(this.responseText);
                console.log(data);
                list.push(data.url);
                return data;
            };

            xhr.send(formdata);
            return
        }

        function slice(file, start, end) {
            var slice = file.mozSlice
                ? file.mozSlice
                : file.webkitSlice
                    ? file.webkitSlice
                    : file.slice
                        ? file.slice
                        : noop;

            return slice.bind(file)(start, end);
        }
        function noop() { }
    };
}