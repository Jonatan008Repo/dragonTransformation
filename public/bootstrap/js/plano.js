$(function () {
    incremn = incremn2 = 30;
    pos = 0;
    pos2 = 600;
    isSombra = false;
    isComer = false;
    puntos = 0;
    velocidad = 400;
    var huevitosPOS = [];
    var posColax, posColay;
    var angulos = [0, 90, 180, 270];
    var espejo = [0.1, -0.1];
    var xpS, ypS, aNGs, espxS, espyS;
    var chpx, chpy;
    var intervalId = null;
    for (i = 0; i < 30; i++) {
        $('#lienzo1').drawLine({
            layer: true,
            strokeStyle: '#000',
            strokeWidth: .5,
            //strokeDash: [8],
            strokeDashOffset: 0,
            x1: pos, y1: 0,
            x2: pos, y2: 600
        });
        pos = pos + incremn;

        $('#lienzo1').drawLine({
            layer: true,
            strokeStyle: '#000',
            strokeWidth: .5,
            //strokeDash: [8],
            strokeDashOffset: 0,
            x1: 0, y1: pos2,
            x2: 600, y2: pos2
        });
        pos2 = pos2 - incremn;
    }
    posOriginesX = 300;
    posOriginesY = 300;
    rotateOrigines = 0;
    scalX = 0.1;
    scalY = 0.1;
    pasoA = 30;
    sizeC = 600;
    limite = sizeC - pasoA;
    $('#btnInicio').click(function () { $('.intro').hide(); });
    $('#lienzo1').drawImage({
        layer: true,
        source: 'images/dragon.png',
        name: 'dragon',
        x: posOriginesX, y: posOriginesY,
        scale: 0.1
    });
    //$('#lienzo1').animateLayer('dragon', {
    //}, 1000, function (layer) {
    //    $('#lienzo1').animateLayer(layer, {
    //        x: 250, y: 100, rotate: 360
    //    }, 'slow', 'swing');
    //});

    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("lastRecord") === null) {
            localStorage.setItem("lastRecord", 0);
        }
        else {
            //console.log(localStorage.getItem("lastRecord"));
        }
    } else {
        //console.log("error lastRecord");
    }

    $("#mover").click(function () {
        moverFrente();
        checkPosDragon();
        //console.log("x: " + posOriginesX + ", y: " + posOriginesY);
        if ((posOriginesX < pasoA || posOriginesX > limite) || (posOriginesY < pasoA || posOriginesY > limite)) {
            //console.log("ya te salsite x: " + posOriginesX + ", y: " + posOriginesY);
            posOriginesX = 300;
            posOriginesY = 300;
        }
        else {
            $('#lienzo1').removeLayer('dragon').drawLayers();
            console.log("estas dentro");
            insert(posOriginesX, posOriginesY, rotateOrigines, scalX, scalY, 'dragon');
        }
        $(".historia").prepend(" <img src='images/BTN_FRENTE.png' width='20' />");
    });
    $("#rotar").click(function () {
        $('#lienzo1').removeLayer('dragon').drawLayers();
        rotateOrigines = rotateOrigines + 90;
        console.log(rotateOrigines);
        if (rotateOrigines === 360) {
            rotateOrigines = 0;
        }
        else if (rotateOrigines === 90 || rotateOrigines === -270) {
            rotateOrigines = 90;
        }
        else if (rotateOrigines === 180 || rotateOrigines === -180) {
            rotateOrigines = 180;
        }
        else if (rotateOrigines === -90 || rotateOrigines === 270) {
            rotateOrigines = 270;
        }
        console.log("rotateOrigines: " + rotateOrigines);
        insert(posOriginesX, posOriginesY, rotateOrigines, scalX, scalY, 'dragon');
        checkPosDragon();
        $(".historia").prepend(" <img src='images/BTN_DER.png' width='20' />");
    });
    $("#rotar2").click(function () {
        $('#lienzo1').removeLayer('dragon').drawLayers();
        rotateOrigines = rotateOrigines - 90;
        console.log(rotateOrigines);
        if (rotateOrigines === -360) {
            rotateOrigines = 0;
        }
        else if (rotateOrigines === 90 || rotateOrigines === -270) {
            rotateOrigines = 90;
        }
        else if (rotateOrigines === 180 || rotateOrigines === -180) {
            rotateOrigines = 180;
        }
        else if (rotateOrigines === -90 || rotateOrigines === 270) {
            rotateOrigines = 270;
        }
        console.log("rotateOrigines: " + rotateOrigines);
        insert(posOriginesX, posOriginesY, rotateOrigines, scalX, scalY, 'dragon');
        checkPosDragon();
        $(".historia").prepend("<img src='images/BTN_IZQ.png' width='20' />");
    });
    $("#reflejo").click(function () {
        $('#lienzo1').removeLayer('dragon').drawLayers();
        scalY = scalY * -1;
        //console.log(scalY);
        insert(posOriginesX, posOriginesY, rotateOrigines, scalX, scalY, 'dragon');
        checkPosDragon();
        $(".historia").prepend(" <img src='images/INV_VERTICAL.png' width='20' />");
    });
    $("#reflejo2").click(function () {
        $('#lienzo1').removeLayer('dragon').drawLayers();
        scalX = scalX * -1;
        //console.log(scalX);
        insert(posOriginesX, posOriginesY, rotateOrigines, scalX, scalY, 'dragon');
        checkPosDragon();
        $(".historia").prepend("<img src='images/INV_HORIZONTAL.png' width='20' />");
    });

    $("#explor").click(function () {
        recPlay();
        $("#reflejo").on("click");
        $("#mover").on("click");
        $("#reflejo2").on("click");
        $('#lienzo1').removeLayer('dragon').drawLayers();
        posOriginesX = 300;
        posOriginesY = 300;
        rotateOrigines = 0;
        scalX = 0.1;
        scalY = 0.1;
        insert(posOriginesX, posOriginesX, rotateOrigines, scalX, scalY, 'dragon');
    });
    $("#sombra").click(function () {
        posOriginesX = 300;
        posOriginesY = 300;
        rotateOrigines = 0;
        scalX = 0.1;
        scalY = 0.1;
        $('#lienzo1').removeLayer('dragon').drawLayers();
        recPlay();
        isSombra = true;
        insert(posOriginesX, posOriginesX, rotateOrigines, scalX, scalY, 'dragon');

        //console.log("sombra");

        $("#reflejo").slideUp("slow").removeClass('opa');
        $("#reflejo2").slideUp("slow").removeClass('opa');
        sombraS();
    });
    function sombraS() {
        $('#lienzo1').removeLayer('dragonS').drawLayers();
        xpS = Math.floor((Math.random() * limite) + pasoA);
        mXpS = xpS % pasoA;
        xpS = xpS - mXpS;
        ypS = Math.floor((Math.random() * limite) + pasoA);
        mYpS = ypS % pasoA;
        ypS = ypS - mYpS;
        anguloR = Math.floor(Math.random() * angulos.length);
        aNGs = angulos[anguloR];
        //espx = Math.floor(Math.random() * espejo.length);
        espxS = 0.1;
        //espy = Math.floor(Math.random() * espejo.length);
        espyS = 0.1;

        insert(xpS, ypS, aNGs, espxS, espyS, 'dragonS');
        console.log("xpS:" + xpS + " ypS:" + ypS);
        console.log("anguloR:" + anguloR + " el angulo es:" + angulos[anguloR]);
        console.log("espx: " + espxS + " espy:" + espyS);
    }
    $('#logro').click(function () {
        Swal.fire('Tu r&#233;cord es de: ' + localStorage.getItem("lastRecord") + ' puntos');
    });
    $("#comer").click(function () {
        intervalId = null;
        isComer = true;
        $('#lienzo1').removeLayer('cacao').drawLayers();
        $('#lienzo1').removeLayer('dragonS').drawLayers();
        vivo = true;
        posOriginesX = 300;
        $(".historia").empty();
        posOriginesY = 300;
        cadenar = '';
        insert(posOriginesX, posOriginesX, 0, 0.1, 0.1, 'dragon');
        ponerFruta();
        $("#reflejo").slideUp("slow").addClass('opa');
        $("#mover").slideUp("slow").addClass('opa');
        $("#reflejo2").slideUp("slow").addClass('opa');
        Swal.fire({
            title: 'El juego empieza en 3',
            showConfirmButton: false,
            timer: 1000
        }).then(function () {
            Swal.fire({
                title: 'El juego empieza en 2',
                showConfirmButton: false,
                timer: 1000
            }).then(function () {
                Swal.fire({
                    title: 'El juego empieza en 1',
                    showConfirmButton: false,
                    timer: 1000
                }).then(function () {
                    intervalId = setInterval(function () {
                        //console.log(huevitosPOS);
                        //console.log("insert dragon antes " + posOriginesX + " <-> " + posOriginesY);
                        resPosX = posOriginesX;
                        resPosY = posOriginesY;
                        var resPosX2, resPosY2;
                        for (i = 0; i < huevitosPOS.length; i++) {
                            //console.log("i: " + i);
                            resPosX2 = resPosX;
                            resPosY2 = resPosY;
                            inserMovetHuevo(resPosX, resPosY, i);
                            resPosX = huevitosPOS[i][0];
                            resPosY = huevitosPOS[i][1];
                            huevitosPOS[i][0] = resPosX2;
                            huevitosPOS[i][1] = resPosY2;
                        }
                        moverFrente();
                        for (i = 0; i < huevitosPOS.length; i++) {
                            if ((posOriginesX === huevitosPOS[i][0]) && (posOriginesY === huevitosPOS[i][1])) {
                                vivo = false;
                                clearInterval(intervalId);
                                //if (typeof (Storage) !== "undefined") {
                                if (localStorage.getItem("lastRecord") < (huevitosPOS.length * 100)) {
                                    localStorage.lastRecord = huevitosPOS.length * 100;
                                    cadenar = "Nuevo r&#233;cord, sumaste " + localStorage.lastRecord + " puntos";
                                }
                                else {
                                    cadenar = "No superaste tu puntaje anterior de " + localStorage.lastRecord + " puntos, solo sumaste " + (huevitosPOS.length * 100) + " puntos";
                                }
                                //}
                                //else {
                                //    cadenar = "Sumaste " + (huevitosPOS.length * 100) + " puntos";
                                //}
                                swal.fire({
                                    title: "Perdiste",
                                    type: "error",
                                    text: '' + cadenar
                                }).then(function () {
                                    //console.log("Perdiste");
                                    location.reload();
                                });
                            }
                        }

                        if ((posOriginesX < pasoA || posOriginesX > limite) || (posOriginesY < pasoA || posOriginesY > limite)) {
                            vivo = false;
                            clearInterval(intervalId);
                            if (localStorage.getItem("lastRecord") < (huevitosPOS.length * 100)) {
                                localStorage.lastRecord = huevitosPOS.length * 100;
                                cadenar = "Nuevo r&#233;cord, sumaste " + localStorage.lastRecord + " puntos";
                            }
                            else {
                                cadenar = "No superaste tu puntaje anterior de " + localStorage.lastRecord + " puntos, solo sumaste " + (huevitosPOS.length * 100) + " puntos";
                            }
                            swal.fire({
                                title: "Perdiste",
                                type: "error",
                                text: '' + cadenar
                            }).then(function () {
                                //console.log("Perdiste");
                                location.reload();
                            });
                        }
                        else {
                            vivo = true;
                            if ((posOriginesX === chpx) && (posOriginesY === chpy)) {
                                puntos++;
                                //console.log("puntos: " + puntos);
                                huevitosPOS.push([posOriginesX, posOriginesY]);
                                ponerFruta();
                            }
                            $('#lienzo1').removeLayer('dragon').drawLayers();
                            //console.log("insert dragon " + posOriginesX + " <-> " + posOriginesY);
                            insert(posOriginesX, posOriginesY, rotateOrigines, scalX, scalY, 'dragon');
                        }
                    }, velocidad);
                });
            });
        });
    });
    function recPlay() {
        $(".historia").empty();
        $("#reflejo").slideDown("slow").removeClass('opa');
        $("#mover").slideDown("slow").removeClass('opa');
        $("#reflejo2").slideDown("slow").removeClass('opa');
        $('#lienzo1').removeLayer('dragonS').drawLayers();
        //console.log('recPlay');
        if (isComer) {
            //console.log('recPlay 12');
            //$('#lienzo1').removeLayer('dragonS').drawLayers();
            $('#lienzo1').removeLayer('cacao').drawLayers();
            for (i = 0; i < huevitosPOS.length; i++) {
                $('#lienzo1').removeLayer('huevo' + i).drawLayers();
                ////huevitosPOS.pop();
                //console.log(huevitosPOS[i]);
                //console.log('huevo' + i);
            }
            isComer = false;
            clearInterval(intervalId);
        }
        huevitosPOS.length = 0;
    };
    function insert(posx, posy, rotA, scx, scy, strImg) {
        $('#lienzo1').drawImage({
            layer: true,
            source: 'images/' + strImg + '.png',
            name: "" + strImg,
            x: posx, y: posy,
            rotate: rotA,
            scaleX: scx,
            scaleY: scy
        });
    };
    function inserMovetHuevo(posxh, posyh, num) {
        //console.log(num + " cola " + posxh + " <-> " + posxh);
        $('#lienzo1').removeLayer('huevo' + num).drawLayers();
        $('#lienzo1').drawImage({
            layer: true,
            source: 'images/huevo.png',
            name: "huevo" + num,
            x: posxh, y: posyh,
            scaleX: 0.09,
            scaleY: 0.09
        });
    };
    function checkPosDragon() {
        console.log(posOriginesX + " <-> " + xpS);
        console.log(posOriginesY + " <-> " + ypS);
        console.log(rotateOrigines + " <-> " + aNGs);
        console.log(scalX + " <-> " + espxS);
        console.log(scalY + " <-> " + espyS);
        if ((posOriginesX === xpS) && (posOriginesY === ypS) && (rotateOrigines === aNGs) && (scalX === espxS) && (scalY === espyS)) {
            console.log("Muy bien");
            swal.fire({
                title: "Respuesta correcta.",
                type: "success"
            }, function () {
                swal.close();
            });
            //location.reload();
            sombraS();
            //$('#lienzo1').removeLayer('dragonS').drawLayers();
        }
        else {
            //console.log("No coincide ");
        }
        //xpS, ypS, aNGs, espxS, espyS;
    };
    function ponerFruta() {
        //console.log("ponerFruta");
        i = huevitosPOS.length;
        posfrutaVSHuevo = 0;
        $('#lienzo1').removeLayer('cacao').drawLayers();
        do {
            chpx = Math.floor((Math.random() * limite) + pasoA);
            chposx = chpx % pasoA;
            chpx = chpx - chposx;
            chpy = Math.floor((Math.random() * limite) + pasoA);
            chposy = chpy % pasoA;
            chpy = chpy - chposy;
            //console.log("posfrutaVSHuevo: " + posfrutaVSHuevo);
            posfrutaVSHuevo = 0;
            for (i = 0; i < huevitosPOS.length; i++) {
                if ((huevitosPOS[i][0] === chpx) && (huevitosPOS[i][1] === chpy)) {
                    posfrutaVSHuevo++;
                }
            }
            //console.log("posfrutaVSHuevo despues: " + posfrutaVSHuevo);
        }
        while (posfrutaVSHuevo > 0);
        insert(chpx, chpy, 0, 0.05, 0.05, 'cacao');
    };
    function moverFrente() {
        //console.log("moverFrente");
        if (scalX > 0) {
            if (rotateOrigines === 0) { posOriginesX = posOriginesX + pasoA; }
            else if (rotateOrigines === 90) { posOriginesY = posOriginesY + pasoA; }
            else if (rotateOrigines === 180) { posOriginesX = posOriginesX - pasoA; }
            else if (rotateOrigines === 270) { posOriginesY = posOriginesY - pasoA; }
            else if (rotateOrigines === -90) { posOriginesY = posOriginesY - pasoA; }
            else if (rotateOrigines === -180) { posOriginesX = posOriginesX - pasoA; }
            else if (rotateOrigines === -270) { posOriginesY = posOriginesY + pasoA; }
        }
        else if (scalX < 0) {
            if (rotateOrigines === 0) { posOriginesX = posOriginesX - pasoA; }
            else if (rotateOrigines === 90) { posOriginesY = posOriginesY - pasoA; }
            else if (rotateOrigines === 180) { posOriginesX = posOriginesX + pasoA; }
            else if (rotateOrigines === 270) { posOriginesY = posOriginesY + pasoA; }
            else if (rotateOrigines === -90) { posOriginesY = posOriginesY + pasoA; }
            else if (rotateOrigines === -180) { posOriginesX = posOriginesX + pasoA; }
            else if (rotateOrigines === -270) { posOriginesY = posOriginesY - pasoA; }
        }
    }
});