(function () {
    var stage = document.getElementById("ac-charm-stage");
    if (!stage) return;

    var canvas = stage.querySelector(".ac-hp-charm__canvas");
    var rippleHost = stage.querySelector(".ac-hp-charm__ripples");
    if (!canvas || !rippleHost) return;

    var layers = stage.querySelectorAll(".ac-hp-charm__parallax[data-depth]");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var coarseMq = window.matchMedia("(pointer: coarse)");
    var coarsePointer = coarseMq.matches;
    var raf = 0;
    var lx = 0.5;
    var ly = 0.5;

    function parallaxStrength() {
        return coarsePointer ? 0.32 : 0.5;
    }
    function parallaxYMul() {
        return coarsePointer ? -0.2 : -0.34;
    }

    function setParallax(mx, my) {
        if (reduceMotion || !layers.length) return;
        var i;
        for (i = 0; i < layers.length; i++) {
            var el = layers[i];
            var d = parseFloat(el.getAttribute("data-depth")) || 0;
            var tx = (mx - 0.5) * d * parallaxStrength();
            var ty = (my - 0.5) * d * parallaxYMul();
            el.style.transform = "translate(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px)";
        }
    }

    function scheduleParallax(mx, my) {
        lx = mx;
        ly = my;
        if (reduceMotion) return;
        if (raf) return;
        raf = window.requestAnimationFrame(function () {
            raf = 0;
            setParallax(lx, ly);
        });
    }

    function normFromEvent(clientX, clientY) {
        var r = canvas.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) return { mx: 0.5, my: 0.5 };
        return {
            mx: Math.min(1, Math.max(0, (clientX - r.left) / r.width)),
            my: Math.min(1, Math.max(0, (clientY - r.top) / r.height)),
        };
    }

    canvas.addEventListener(
        "pointermove",
        function (e) {
            if (e.pointerType !== "mouse") return;
            var p = normFromEvent(e.clientX, e.clientY);
            scheduleParallax(p.mx, p.my);
        },
        { passive: true }
    );

    canvas.addEventListener("pointerleave", function () {
        scheduleParallax(0.5, 0.5);
    });

    canvas.addEventListener(
        "pointerdown",
        function (e) {
            if (e.button !== 0 && e.pointerType === "mouse") return;
            var t = e.target;
            if (t && t.closest && t.closest("a")) return;
            var r = canvas.getBoundingClientRect();
            var x = e.clientX - r.left;
            var y = e.clientY - r.top;
            if (x < 0 || y < 0 || x > r.width || y > r.height) return;

            var p = normFromEvent(e.clientX, e.clientY);
            scheduleParallax(p.mx, p.my);

            var ring = document.createElement("span");
            ring.className = "ac-hp-charm__ripple";
            ring.style.left = x + "px";
            ring.style.top = y + "px";
            rippleHost.appendChild(ring);
            window.setTimeout(function () {
                ring.remove();
            }, 900);
        },
        { passive: true }
    );

    var reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onReduceChange(ev) {
        reduceMotion = ev.matches;
        if (reduceMotion) {
            var i;
            for (i = 0; i < layers.length; i++) layers[i].style.transform = "";
        }
    }
    if (reduceMq.addEventListener) reduceMq.addEventListener("change", onReduceChange);
    else if (reduceMq.addListener) reduceMq.addListener(onReduceChange);

    function onCoarseChange(ev) {
        coarsePointer = ev.matches;
    }
    if (coarseMq.addEventListener) coarseMq.addEventListener("change", onCoarseChange);
    else if (coarseMq.addListener) coarseMq.addListener(onCoarseChange);

    window.addEventListener(
        "resize",
        function () {
            lx = 0.5;
            ly = 0.5;
            if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
            setParallax(0.5, 0.5);
        },
        { passive: true }
    );
})();
