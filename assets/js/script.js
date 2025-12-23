// Hero Popup Start
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hero_popup_id");
  const popupWrap = document.querySelector(".hero_popup_wrap");
  const iconMenu = btn.querySelector(".icon-menu");
  const iconClose = btn.querySelector(".icon-close");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = popupWrap.classList.toggle("active");

    // JS handles icon switch
    if (isActive) {
      iconMenu.style.display = "none";
      iconClose.style.display = "block";
    } else {
      iconMenu.style.display = "block";
      iconClose.style.display = "none";
    }

    btn.setAttribute("aria-expanded", isActive);
  });

  // Click outside → close popup
  document.addEventListener("click", (e) => {
    if (!popupWrap.contains(e.target) && !btn.contains(e.target)) {
      popupWrap.classList.remove("active");
      iconMenu.style.display = "block";
      iconClose.style.display = "none";
      btn.setAttribute("aria-expanded", "false");
    }
  });
});

// ============== Form And Destil fix and useLayoutEffect(menu) Active Start ========
document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll(
        "#overview, #spaces, #services, #access"
    );

    const menuLinks = document.querySelectorAll(".details_menu a");

    function onScroll() {
        let scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                menuLinks.forEach(link => link.classList.remove("active"));
                document
                    .querySelector('.details_menu a[href="#' + id + '"]')
                    .classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", onScroll);
}); 
// ============== Form And Destil fix and useLayoutEffect(menu) Active End ======== 

// Hero Popup End

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("galleryTrack");
    const items = [...track.children];

    // Clone items for seamless infinite scroll
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let speed = 0.8;       // normal speed
    let slowSpeed = 0.5;   // hover speed
    let currentSpeed = speed;
    let targetSpeed = speed;

    let position = 0;

    // total width of original items
    const originalWidth = items.reduce((sum, item) => sum + item.offsetWidth, 0);

    function animate() {
        // smooth speed transition
        currentSpeed += (targetSpeed - currentSpeed) * 0.05;

        // move left-to-right
        position += currentSpeed;

        // modulo reset for infinite smooth scroll
        position = position % originalWidth;

        track.style.transform = `translateX(-${position}px)`;

        requestAnimationFrame(animate);
    }

    animate();

    // hover slow effect
    track.addEventListener("mouseenter", () => targetSpeed = slowSpeed);
    track.addEventListener("mouseleave", () => targetSpeed = speed);
});


// ===== Count Up on Scroll =====
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll("#statisticsSection h5");
    const section = document.getElementById("statisticsSection");
    const duration = 3000; // animation duration in ms

    function animateCounters(timestamp) {
        if (!animateCounters.startTime) animateCounters.startTime = timestamp;
        const progress = Math.min((timestamp - animateCounters.startTime) / duration, 1);

        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            counter.innerText = Math.floor(progress * target);
        });

        if (progress < 1) {
            requestAnimationFrame(animateCounters);
        } else {
            counters.forEach(counter => {
                counter.innerText = counter.getAttribute("data-target");
            });
        }
    }

    // Intersection Observer to trigger when section center is visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(animateCounters);
                observer.disconnect(); // trigger only once
            }
        });
    }, {
        root: null,             // viewport
        threshold: 0.5          // 50% of section visible (roughly center)
    });

    observer.observe(section);
});

// ==== Logo Slider 
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("logoSlider");

    // Duplicate all logos once → Seamless infinite loop
    slider.innerHTML += slider.innerHTML;
});


// ==== Animation Effect 
document.addEventListener("DOMContentLoaded", () => {

  // ----------------------
  // SCROLL ANIMATION + TYPE EFFECT
  // ----------------------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){

        const el = entry.target;

        if(el.dataset.type === "true"){

          const text = el.textContent;
          el.textContent = "";
          el.classList.add("show");

          text.split("").forEach((char, i) => {
            const span = document.createElement("span");
            // Preserve space character
            span.textContent = char === " " ? "\u00A0" : char;

            // Delay per letter for typing
            span.style.animationDelay = `${i * 0.05}s`;

            el.appendChild(span);
          });

        } else {
          // Normal scroll animations
          const delay = el.dataset.delay || "0s";
          const duration = el.dataset.duration || "0.8s";
          el.style.transitionDelay = delay;
          el.style.transitionDuration = duration;
          el.classList.add("show");
        }

      }
    });
  }, { threshold: 0.4 });

  const elements = document.querySelectorAll(
    ".animate, .animate-text, .bottom_to_top, .zoom_bounce, .left_to_right, .right_to_left"
  );
  elements.forEach(el => observer.observe(el));

});


// ===== lazy Image 
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: "0px 0px 100px 0px" });

      lazyImages.forEach(img => observer.observe(img));
    } else {
      // fallback for old browsers
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      });
    }
  });


  const imgBox = document.getElementById("dynamicImage");
  const accordions = document.querySelectorAll(".accordion-collapse");

  accordions.forEach(item => {
    item.addEventListener("show.bs.collapse", function () {
      const newImg = this.getAttribute("data-img");

      imgBox.classList.add("fade-out");

      setTimeout(() => {
        imgBox.src = newImg;
        imgBox.classList.remove("fade-out");
      }, 300);
    });
  });

document.querySelector('.back_to_top').addEventListener('click', function(e) {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  });

  observer.observe(document.querySelector("#introduction_img"));

});