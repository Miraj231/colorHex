var btnclck = false;
if (window.addEventListener) {              
    window.addEventListener("mousedown", function () {btnclck = true; });
} else if (window.attachEvent) {                 
    window.attachEvent("onmousedown", function () {btnclck = true; });
}
if (window.addEventListener) {              
    window.addEventListener("mouseup", function () {btnclck = false; });
} else if (window.attachEvent) {                 
    window.attachEvent("onmouseup", function () {btnclck = false; });
}
function tooltip(e, n) {
    var x;
    if (btnclck) {
        if (e == 0) { x = document.getElementById("r01"); }
        if (e == 1) { x = document.getElementById("g01"); }
        if (e == 2) { x = document.getElementById("b01"); }                
        x.value = n;
        setColor();
    }
}
function setColor() {
var ele, col, r, g, b, rgb, rval, gval, bval,n;
r = document.getElementById("r01");
g = document.getElementById("g01");
b = document.getElementById("b01");
rval = r.value;
gval = g.value;
bval = b.value;
if (rval == "") rval = "0";
if (gval == "") gval = "0";
if (bval == "") bval = "0";
while (rval.length < 2) {rval = rval + rval;}
while (gval.length < 2) {gval = gval + gval;}
while (bval.length < 2) {bval = bval + bval;}
if (parseInt(rval, 16) < 0) {rval = "0"; r.value = rval;}
if (parseInt(rval, 16) > 255) {rval = "ff"; r.value = rval;}
if (parseInt(gval, 16) < 0) {gval = "0"; g.value = gval;}
if (parseInt(gval, 16) > 255) {gval = "ff"; g.value = gval;}
if (parseInt(bval, 16) < 0) {bval = "0"; b.value = bval;}
if (parseInt(bval, 16) > 255) {bval = "ff"; b.value = bval;}
rgb = w3color("#" + rval + gval + bval);
document.getElementById("result01").style.backgroundColor = rgb.toRgbString();
document.getElementById("rgb01").innerHTML = rgb.toRgbString();
document.getElementById("hsl01").innerHTML = rgb.toHslString();
document.getElementById("hex01").value = rgb.toHexString();
document.getElementById("r01Num").value = parseInt(rval, 16);
document.getElementById("g01Num").value = parseInt(gval, 16);
document.getElementById("b01Num").value = parseInt(bval, 16);
for (i = 0; i <= 255; i++) {
    n = toHex(i);
    document.getElementById("redpointer" + n).style.display = "none";
}
for (i = 0; i <= 255; i++) {
    n = toHex(i);
    document.getElementById("greenpointer" + n).style.display = "none";
    document.getElementById("bluepointer" + n).style.display = "none";
}
if (!document.getElementById("redpointer" + rval)) {rval = "00";}
if (!document.getElementById("redpointer" + gval)) {gval = "00";}
if (!document.getElementById("redpointer" + bval)) {bval = "00";}
document.getElementById("redpointer" + rval).style.display = "inline";
document.getElementById("greenpointer" + gval).style.display = "inline";
document.getElementById("bluepointer" + bval).style.display = "inline";
}
function setFullColor() {
    color = w3color(document.getElementById("hex01").value);
    document.getElementById("r01").value = color.toHexString().substr(1,2);
    document.getElementById("g01").value = color.toHexString().substr(3,2);
    document.getElementById("b01").value = color.toHexString().substr(5,2);
    setColor();
}
color = w3color("ff0000");
console.log(Color)
document.getElementById("hex01").value = color.toHexString();
setFullColor();

function submitOnEnter(e) {
    keyboardKey = e.which || e.keyCode;
    if (keyboardKey == 13) {
        setFullColor();
    }
}
function numberValue(elmnt) {
    var val, x;
    val = Number(elmnt.value);
    if (val < 0) {val = 0;}
    if (val > 255) {val = 255;}
    val = toHex(val);
    x = document.getElementById(elmnt.id.substr(0, 3));
    x.value = val;
    setColor();
}
function toHex(n) {
    var hex = n.toString(16);
    while (hex.length < 2) {hex = "0" + hex; }
    return hex;
}
function clickRed(red) {
    var r = document.getElementById("r01");
    r.value = red;
    setColor();
}
function clickGreen(green) {
    var g = document.getElementById("g01");
    g.value = green;
    setColor();
}
function clickBlue(blue) {
    var b = document.getElementById("b01");
    b.value = blue;
    setColor();
}
function drawRedTable() {
    var x, i, n, g, b;
    g = "00";
    b = "00";
    x = "<table class='tableslider'>"
    x += "<tr>";
    n = 0;
    for (i = 0; i <= 255; i++) {
        n = toHex(i);
        x += "<td style='position:relative;padding:0;'><div class='pointer red' id='redpointer" + n + "'><div>" + n + "</div><i class='fa fa-caret-down'></i></div></td>";
    }
    x += "</tr>";
    x += "<tr>";
    n = 0;
    for (i = 0; i <= 255; i++) {
        n = toHex(i);
        x += "<td style='background-color:#" + n + g + b + ";height:22px;padding:0;' onmousemove='tooltip(0, \"" + n + "\")' onclick='clickRed(\"" + n + "\")'></td>";
    }
    x += "</tr>";
    x += "</table>";
    document.getElementById("redtable").innerHTML = x;
}
function drawGreenTable() {
    var x, i, r, b;
    r = "00";
    b = "00";
    x = "<table class='tableslider'>"
    x += "<tr>";
    for (i = 0; i <= 255; i++) {
        n = toHex(i);    
        x += "<td style='position:relative;padding:0;'><div class='pointer' id='greenpointer" + n + "'><div>" + n + "</div><i class='fa fa-caret-down'></i></div></td>";
    }
    x += "</tr>";
    x += "<tr>";
    for (i = 0; i <= 255; i++) {
        n = toHex(i);    
        x += "<td onmousemove='tooltip(1, \"" + n + "\")' onclick='clickGreen(\"" + n + "\")' style='padding:0;height:22px;background-color:#" + r + n + b + "'></td>";
    }
    x += "</tr></table>";
    document.getElementById("greentable").innerHTML = x;
}
function drawBlueTable() {
    var x, i, r, g;
    r = "00";
    g = "00";
    x = "<table class='tableslider'>"
    x += "<tr>";
    for (i = 0; i <= 255; i++) {
        n = toHex(i);    
        x += "<td style='position:relative;padding:0;'><div class='pointer' id='bluepointer" + n + "'><div>" + n + "</div><i class='fa fa-caret-down'></i></div></td>";
    }
    x += "</tr>";
    x += "<tr>";
    for (i = 0; i <= 255; i++) {
        n = toHex(i);
        x += "<td onmousemove='tooltip(2, \"" + n + "\")' onclick='clickBlue(\"" + n + "\")' style='padding:0;height:22px;background-color:#" + r + g + n + "'></td>";
    }
    x += "</tr></table>";
    document.getElementById("bluetable").innerHTML = x;
}
drawRedTable(0);
drawGreenTable(0);
drawBlueTable(0);
