/* =========================================================
   FOOTBALL CHRONICLE
   MASTER JAVASCRIPT
========================================================= */


/* =========================================================
   INTRO SCREEN
========================================================= */

window.addEventListener("load", () => {

    const intro = document.getElementById("intro-screen");

    setTimeout(() => {

        if (intro) {
            intro.classList.add("hidden");
        }

    }, 2200);

});


/* =========================================================
   FOOTBALL PARTICLE SYSTEM
========================================================= */

const canvas = document.getElementById("footballCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    const particles = [];

    const particleCount =
        window.innerWidth < 700 ? 22 : 45;


    function resizeCanvas() {

        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

    }


    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    class FootballParticle {

        constructor() {

            this.reset(true);

        }


        reset(initial = false) {

            this.x =
                Math.random() * width;

            this.y =
                initial
                    ? Math.random() * height
                    : height + 20;

            this.size =
                Math.random() * 2.5 + 0.5;

            this.speed =
                Math.random() * 0.25 + 0.08;

            this.opacity =
                Math.random() * 0.35 + 0.05;

            this.drift =
                (Math.random() - 0.5) * 0.15;

        }


        update() {

            this.y -= this.speed;
            this.x += this.drift;

            if (this.y < -20) {

                this.reset();

            }

        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(100,255,150,${this.opacity})`;

            ctx.fill();

        }

    }


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push(
            new FootballParticle()
        );

    }


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

const searchInput =
    document.getElementById("globalSearch");


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                searchInput.value.trim()
            ) {

                const query =
                    encodeURIComponent(
                        searchInput.value.trim()
                    );

                window.location.href =
                    `search/index.html?q=${query}`;

            }

        }
    );

}
