
// ======== Listing Page Revies Count Down Start 
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");
    const ratingCounter = document.querySelector(".rating_count");
    let counted = false;

    const duration = 2000; // 2 seconds

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !counted){
                counted = true;

                // Count for top ratings
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute("data-target"));
                    const startTime = performance.now();

                    const updateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        let progress = Math.min(elapsed / duration, 1);
                        counter.innerText = (target * progress).toFixed(1);
                        if(progress < 1){
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target.toFixed(1);
                        }
                    }
                    requestAnimationFrame(updateCount);
                });

                // Count for main rating
                if(ratingCounter){
                    const target = parseFloat(ratingCounter.getAttribute("data-target"));
                    const startTime = performance.now();

                    const updateRating = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        let progress = Math.min(elapsed / duration, 1);
                        ratingCounter.innerText = (target * progress).toFixed(2);
                        if(progress < 1){
                            requestAnimationFrame(updateRating);
                        } else {
                            ratingCounter.innerText = target.toFixed(2);
                        }
                    }
                    requestAnimationFrame(updateRating);
                }

            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector(".reviews_title_section"));
});
// ======== Listing Page Revies Count Down End
// ======== Listing Page Hero Count Down Start 
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");
    let counted = false; // একবারেই count হবে

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute("data-target");
                        let count = +counter.innerText.replace('%','');
                        const increment = target / 100;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment) + "%";
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target + "%";
                        }
                    }
                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector(".hero_last_gap"));
});
// ======== Listing Page Hero Count Down End 

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
      if (entry.isIntersecting) {

        const el = entry.target;

        // ---------- TYPING EFFECT ----------
        // ---------- TYPING EFFECT ----------
if (el.dataset.type === "true") {

  const text = el.textContent.trim();
  el.textContent = "";
  el.classList.add("show");

  const speed = parseFloat(el.dataset.speed) || 0.05;

  // split text by words
  const words = text.split(" ");

  let letterIndex = 0;

  words.forEach((word, wIndex) => {

    // word wrapper (prevents word break)
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";

    // split word into letters
    word.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${letterIndex * speed}s`;
      wordSpan.appendChild(span);
      letterIndex++;
    });

    el.appendChild(wordSpan);

    // add space after word (except last)
    if (wIndex !== words.length - 1) {
      const space = document.createTextNode("\u00A0");
      el.appendChild(space);
      letterIndex++;
    }
  });
}

        // ---------- NORMAL SCROLL ANIMATION ----------
        else {

          const delay = el.dataset.delay || "0s";
          const duration = el.dataset.duration || "0.8s";

          el.style.transitionDelay = delay;
          el.style.transitionDuration = duration;

          el.classList.add("show");
        }

      }
    });
  }, { threshold: 0.4 });

  // ----------------------
  // OBSERVE ELEMENTS
  // ----------------------
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

// ======== Shop page Product Filter 
const tabs = document.querySelectorAll(".filter-tabs .nav-link");
  const items = document.querySelectorAll(".product-item");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      // active class
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");

      items.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

    });
  });

  // ========== Single Product apge 
  // Img slide 
  const mainImg = document.querySelector('.single_product_view img');
const thumbnails = document.querySelectorAll('.single_product_img_slide img');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const newSrc = thumb.getAttribute('data-src');

        // fade out main image
        mainImg.classList.add('fade-out');

        // wait for fade out, then change src and fade in
        setTimeout(() => {
            mainImg.setAttribute('data-src', newSrc);
            mainImg.src = newSrc;
            mainImg.classList.remove('fade-out');
        }, 300);

        // remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));

        // add active class to clicked thumbnail
        thumb.classList.add('active');
    });
});


// ===== Single Product Form 
document.addEventListener("click", function (e) {

    // INCREASE
    const increaseBtn = e.target.closest("#increase_qty");
    if (increaseBtn) {
        const box = increaseBtn.closest(".count_number_for_product");
        const qtySpan = box.querySelector("#quantity_value");
        const qtyInput = box.querySelector("#product_quantity");

        let qty = parseInt(qtySpan.textContent);
        qty++;

        qtySpan.textContent = qty;
        if (qtyInput) qtyInput.value = qty;
    }

    // DECREASE
    const decreaseBtn = e.target.closest("#decrease_qty");
    if (decreaseBtn) {
        const box = decreaseBtn.closest(".count_number_for_product");
        const qtySpan = box.querySelector("#quantity_value");
        const qtyInput = box.querySelector("#product_quantity");

        let qty = parseInt(qtySpan.textContent);
        if (qty > 1) qty--;

        qtySpan.textContent = qty;
        if (qtyInput) qtyInput.value = qty;
    }

});

// Size Selection
const sizeOptions = document.querySelectorAll('.size_select_for_product ul li');
const sizeInput = document.getElementById('product_size');

// set default active (first item)
if(sizeOptions.length > 0){
    sizeOptions.forEach(o => o.classList.remove('active')); // clean
    sizeOptions[0].classList.add('active');
    sizeInput.value = sizeOptions[0].getAttribute('data-value');
}

// click to change active
sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        sizeOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        sizeInput.value = option.getAttribute('data-value');
    });
});

// Option Selection
const productOptions = document.querySelectorAll('.option_slect_for_product ul li');
const optionInput = document.getElementById('product_option');

// set default active (first item)
if(productOptions.length > 0){
    productOptions.forEach(o => o.classList.remove('active'));
    productOptions[0].classList.add('active');
    optionInput.value = productOptions[0].getAttribute('data-value');
}

// click to change active
productOptions.forEach(option => {
    option.addEventListener('click', () => {
        productOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        optionInput.value = option.getAttribute('data-value');
    });
});


// ============ Single Product Description 
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".jholok_custom_accordion .jholok_accordion_item");

    items.forEach(item => {
        const header = item.querySelector(".jholok_accordion_header");

        header.addEventListener("click", () => {
            // Close any other open item
            items.forEach(i => {
                if (i !== item) {
                    i.classList.remove("open");
                }
            });

            // Toggle clicked item
            item.classList.toggle("open");
        });
    });
});

// ======== about page mision vision silder 
document.addEventListener("DOMContentLoaded", function () {

    if (window.innerWidth > 991) return;

    const fixedCTA = document.querySelector(".prize_fixed");
    const normalCTA = document.querySelector(".prize_normal");
    const anchor = document.querySelector(".mobile_cta_anchor");

    if (!fixedCTA || !normalCTA || !anchor) return;

    let isFixedVisible = true; // current state

    const observer = new IntersectionObserver(
        ([entry]) => {

            // entry.isIntersecting flips only AFTER buffer
            if (entry.isIntersecting && isFixedVisible) {
                fixedCTA.classList.add("is-hidden");
                normalCTA.classList.remove("is-hidden");
                isFixedVisible = false;
            }

            if (!entry.isIntersecting && !isFixedVisible) {
                fixedCTA.classList.remove("is-hidden");
                normalCTA.classList.add("is-hidden");
                isFixedVisible = true;
            }

        },
        {
            root: null,
            threshold: 0,
            rootMargin: "-2px 0px -2px 0px" // 🔥 2px dead zone
        }
    );

    observer.observe(anchor);
});

