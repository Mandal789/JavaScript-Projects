// hight order functionhhh

// function p() {
//     return function() {
//         console.log("hi");
//     };
// }

// const y = p();

// y();

//<link src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js" >
$.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
    // Convert key-value pairs to JSON
    // https://stackoverflow.com/a/39284735/452587
    data = data.trim().split('\n').reduce(function(obj, pair) {
        pair = pair.split('=');
        return obj[pair[0]] = pair[1], obj;
    }, {});
    console.log(data);
});