(function () {
    var toggle = document.querySelector(".nav-toggle");
    var mobile = document.getElementById("ac-gn-mobile");
    if (!toggle || !mobile) return;

    function setOpen(open) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        mobile.hidden = !open;
        document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        setOpen(!open);
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 833) setOpen(false);
    });
})();
