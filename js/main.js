(function () {
  var top = document.getElementById("top");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && top && nav) {
    toggle.addEventListener("click", function () {
      var open = top.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        top.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        top.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".sub-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      if (window.matchMedia("(min-width: 981px)").matches) return;
      var parent = button.parentElement;
      var open = parent.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  var path = location.pathname.split("/").pop() || "index.html";
  if (path === "") path = "index.html";
  document.querySelectorAll("[data-nav]").forEach(function (link) {
    if (link.getAttribute("data-nav") === path) link.setAttribute("aria-current", "page");
  });

  var seal = document.getElementById("bbb-seal");
  if (seal && window.BENEFACT_BBB_SEAL) {
    seal.innerHTML = window.BENEFACT_BBB_SEAL;
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = document.getElementById("form-status");
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var interest = String(data.get("interest") || "").trim();
      var message = String(data.get("message") || "").trim();
      if (!name || !email || !message) {
        status.textContent = "Please add your name, email, and a short message.";
        return;
      }
      var body = [
        "Name: " + name,
        "Email: " + email,
        "Phone: " + (phone || "Not provided"),
        "Interest: " + interest,
        "",
        message
      ].join("\n");
      var subject = "Website inquiry from " + name;
      window.location.href = "mailto:chris@benefactfinancial.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Your email app should open with this message addressed to Benefact.";
    });
  }
})();
