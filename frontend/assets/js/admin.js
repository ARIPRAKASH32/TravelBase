function renderDashboardShell() {
  const shell = document.querySelector("#dashboard-shell");

  if (!shell) {
    return;
  }

  const role = document.body.dataset.role || "admin";
  const root = document.body.dataset.root || "../..";
  const section = document.body.dataset.section || "";
  const isCustomer = role === "customer";
  const basePath = isCustomer
    ? `${root}/pages/customer/`
    : `${root}/pages/admin/`;

  const customerLinks = [
    ["dashboard", "dashboard.html", "grid-1x2", "Overview"],
    ["book", "booking.html", "compass", "Book 5-Dest Trip"],
    ["bookings", "my-bookings.html", "ticket-perforated", "My bookings"],
    ["profile", "profile.html", "person", "My profile"],
  ];

  const adminLinks = [
    ["dashboard", "dashboard.html", "grid-1x2", "Dashboard"],
    ["packages", "packages.html", "map", "Packages"],
    ["destinations", "destinations.html", "geo-alt", "Destinations"],
    ["customers", "customers.html", "people", "Customers"],
    ["bookings", "bookings.html", "ticket-perforated", "Bookings"],
    ["payments", "payments.html", "credit-card", "Payments"],
    ["reports", "reports.html", "bar-chart", "Reports"],
  ];

  const links = isCustomer ? customerLinks : adminLinks;

  shell.innerHTML = `
    <div class="sidebar-backdrop"></div>
    <aside class="app-sidebar">
      <a class="brand" href="${root}/index.html">
        <i class="bi bi-compass"></i> Travel<span>Base</span>
      </a>
      <div class="side-label">${isCustomer ? "My travel" : "Management"}</div>
      ${links
        .map(
          ([key, file, icon, label]) => `
            <a class="side-link ${section === key ? "active" : ""}" href="${basePath}${file}">
              <i class="bi bi-${icon}"></i>${label}
            </a>`,
        )
        .join("")}
      <div class="side-label">TravelBase</div>
      <a class="side-link" href="${root}/index.html">
        <i class="bi bi-box-arrow-up-right"></i>Visit website
      </a>
      <a class="side-link" href="/logout" data-logout>
        <i class="bi bi-box-arrow-left"></i>Sign out
      </a>
    </aside>
    <header class="app-header">
      <button class="nav-toggle dashboard-toggle" aria-label="Open menu">
        <i class="bi bi-list"></i>
      </button>
      <span class="text-muted">${isCustomer ? "Customer portal" : "Administration"}</span>
      <div class="app-user">
        <span>${isCustomer ? '<span id="header-user-name">Traveler</span>' : "TravelBase Admin"}</span>
        <span class="avatar"><i class="bi bi-person"></i></span>
      </div>
    </header>`;

  const sidebar = shell.querySelector(".app-sidebar");
  const backdrop = shell.querySelector(".sidebar-backdrop");
  const menuButton = shell.querySelector(".dashboard-toggle");

  menuButton.addEventListener("click", () => {
    sidebar.classList.add("open");
    backdrop.classList.add("open");
  });

  backdrop.addEventListener("click", () => {
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
  });

  shell.querySelector("[data-logout]").addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      const tokenResponse = await fetch("/csrf-token", {
        credentials: "same-origin",
      });
      if (!tokenResponse.ok) {
        throw new Error("Unable to start a secure sign-out request.");
      }

      const { token } = await tokenResponse.json();
      const response = await fetch("/logout", {
        method: "POST",
        headers: { "X-CSRF-Token": token },
        credentials: "same-origin",
      });
      if (!response.ok) {
        throw new Error("The sign-out request could not be completed.");
      }

      window.location.assign(response.url);
    } catch (error) {
      console.error("Sign-out request failed.", error);
      window.alert("Unable to sign out right now. Please try again.");
    }
  });
}



function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return replacements[character];
  });
}

function formatINRCompact(val) {
  if (val >= 10000000) return "₹" + (val / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr";
  if (val >= 100000) return "₹" + (val / 100000).toFixed(1).replace(/\.0$/, "") + "L";
  if (val >= 1000) return "₹" + (val / 1000).toFixed(0) + "k";
  return "₹" + val;
}

let bookingStatusChartInstance = null;

function setupCharts(page) {
  if (!["dashboard", "reports"].includes(page) || typeof Chart === "undefined") {
    return;
  }

  document.querySelectorAll("[data-chart]").forEach((canvas) => {
    const isReport = page === "reports";

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            label: isReport ? "Revenue (INR)" : "Monthly revenue (INR)",
            data: [
              2480000, 3120000, 2760000, 3840000,
              4210000, 3580000, 4960000, 5275000,
            ],
            backgroundColor: "#1E3A2B",
            borderRadius: 6,
            borderSkipped: false,
            yAxisID: "revenue",
          },
          {
            label: "Bookings",
            data: [18, 24, 21, 30, 34, 29, 39, 42],
            backgroundColor: "#C0A84A",
            borderRadius: 6,
            borderSkipped: false,
            yAxisID: "bookings",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 20,
            right: 16,
            top: 10,
            bottom: 6,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              boxHeight: 12,
              usePointStyle: true,
              pointStyle: "circle",
              padding: 16,
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 12,
                weight: 600,
              },
            },
          },
          tooltip: {
            callbacks: {
              label(context) {
                const value = context.raw;
                return context.dataset.label.includes("Revenue")
                  ? `${context.dataset.label}: ${formatINR(value)}`
                  : `${context.dataset.label}: ${value}`;
              },
            },
          },
        },
        scales: {
          revenue: {
            beginAtZero: true,
            grid: { color: "rgba(0, 0, 0, 0.05)" },
            ticks: {
              callback(value) {
                return formatINRCompact(value);
              },
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 11,
              },
            },
          },
          bookings: {
            beginAtZero: true,
            position: "right",
            grid: { drawOnChartArea: false },
            ticks: {
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 11,
              },
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 11,
                weight: 600,
              },
            },
          },
        },
      },
    });
  });
}

function setupBookingStatusChart() {
  const canvas = document.querySelector("[data-booking-chart]");

  if (!canvas || typeof Chart === "undefined") {
    return;
  }

  bookingStatusChartInstance = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Confirmed", "Pending in Review", "Completed", "Cancelled"],
      datasets: [
        {
          data: [2, 5, 0, 0],
          backgroundColor: ["#10B981", "#F59E0B", "#0D9488", "#EF4444"],
          hoverBackgroundColor: ["#059669", "#D97706", "#0F766E", "#DC2626"],
          borderWidth: 2,
          borderColor: "#FFFFFF",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              size: 12,
              weight: 500,
            },
          },
        },
      },
    },
  });
}

function setupReportActions() {
  const fromDate = document.querySelector("#report-from");
  const toDate = document.querySelector("#report-to");
  const rows = [...document.querySelectorAll("#report-table tbody tr")];

  function filterRows() {
    rows.forEach((row) => {
      const reportDate = row.dataset.date;
      const beforeStart = fromDate.value && reportDate < fromDate.value;
      const afterEnd = toDate.value && reportDate > toDate.value;

      row.hidden = Boolean(beforeStart || afterEnd);
    });
  }

  fromDate.addEventListener("change", filterRows);
  toDate.addEventListener("change", filterRows);
  document
    .querySelector("#print-report")
    .addEventListener("click", () => window.print());
  document
    .querySelector("#download-report")
    .addEventListener("click", () => {
      const visibleRows = rows.filter((row) => !row.hidden);
      const tableData = [
        ["Package", "Destination", "Bookings", "Revenue (INR)", "Booking status"],
        ...visibleRows.map((row) =>
          [...row.cells].map((cell) => cell.textContent.trim()),
        ),
      ];
      const csv = tableData
        .map((row) =>
          row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","),
        )
        .join("\r\n");
      const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const fileUrl = URL.createObjectURL(file);
      const downloadLink = document.createElement("a");

      downloadLink.href = fileUrl;
      downloadLink.download = "travelbase-report.csv";
      downloadLink.click();
      URL.revokeObjectURL(fileUrl);
    });
}

function setupAdmin() {
  const page = document.body.dataset.section;

  setupCharts(page);
  setupBookingStatusChart();

  if (page === "reports") {
    setupReportActions();
  }

  if (page === "packages") {
    setupPackageManagement();
  }

  if (page === "destinations") {
    setupDestinationManagement();
  }

  if (page === "dashboard" || document.querySelector(".stat-card")) {
    loadLiveAdminStats();
  }

  if (page === "customers") {
    setupCustomerActions();
  }

  if (page === "payments") {
    setupPaymentActions();
  }

  if (document.querySelector("#table-search")) {
    setupTableSearch();
  }

  if (page === "bookings") {
    setupBookingActions();
  }

  if (document.querySelector("#my-bookings-table")) {
    setupTableSearch("#my-booking-search", "#my-bookings-table");

    document.querySelectorAll("[data-cancel-booking]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!confirm("Cancel this booking request?")) {
          return;
        }

        const row = button.closest("tr");
        const badge = row.querySelector(".badge");

        badge.className = "badge badge-danger";
        badge.textContent = "Cancelled";
        button.remove();
      });
    });
  }
}

async function loadLiveAdminStats() {
  try {
    const res = await fetch("/api/admin/stats", { credentials: "same-origin" });
    if (!res.ok) return;

    const stats = await res.json();

    // 1. Precise explicit ID-based binding for stat cards
    const valRevenue = document.querySelector("#val-revenue");
    if (valRevenue) {
      valRevenue.textContent = formatINR(stats.total_revenue || 0);
    }
    const subRevenue = document.querySelector("#sub-revenue");
    if (subRevenue) {
      const conf = stats.confirmed_bookings || 0;
      subRevenue.innerHTML = `<i class="bi bi-check2-circle"></i> From ${conf} confirmed reservation${conf === 1 ? "" : "s"} in MySQL`;
    }

    const valBookings = document.querySelector("#val-bookings");
    if (valBookings) {
      valBookings.textContent = stats.total_bookings ?? 0;
    }
    const subBookings = document.querySelector("#sub-bookings");
    if (subBookings) {
      subBookings.innerHTML = `<span class="badge-dot dot-success"></span> ${stats.confirmed_bookings || 0} confirmed • ${stats.pending_bookings || 0} in review`;
    }

    const valPackages = document.querySelector("#val-packages");
    if (valPackages) {
      valPackages.textContent = stats.total_packages ?? 0;
    }
    const subPackages = document.querySelector("#sub-packages");
    if (subPackages) {
      subPackages.innerHTML = `<i class="bi bi-globe-asia-australia"></i> Across ${stats.total_destinations || 10} global destinations`;
    }

    const valCustomers = document.querySelector("#val-customers");
    if (valCustomers) {
      valCustomers.textContent = stats.total_customers ?? 0;
    }
    const subCustomers = document.querySelector("#sub-customers");
    if (subCustomers) {
      const custCount = stats.total_customers ?? 0;
      subCustomers.innerHTML = `<i class="bi bi-patch-check"></i> ${custCount} verified traveler profile${custCount === 1 ? "" : "s"}`;
    }

    // Fallback for legacy generic strong selector if custom IDs aren't found
    if (!valRevenue && !valBookings) {
      const statValues = document.querySelectorAll(".stat-card strong");
      if (statValues.length >= 4) {
        statValues[0].textContent = formatINR(stats.total_revenue || 0);
        statValues[1].textContent = stats.total_bookings ?? 0;
        statValues[2].textContent = stats.total_packages ?? 0;
        statValues[3].textContent = stats.total_customers ?? 0;
      }
    }

    // 2. Populate Recent Bookings table directly from live MySQL query
    const recentTbody = document.querySelector("#recent-bookings-rows");
    if (recentTbody && Array.isArray(stats.recent_bookings) && stats.recent_bookings.length > 0) {
      recentTbody.innerHTML = stats.recent_bookings
        .map((b) => {
          const statusClass =
            b.status === "confirmed"
              ? "badge-success"
              : b.status === "cancelled"
              ? "badge-danger"
              : "badge-warning";
          const formattedDate = b.date
            ? new Date(b.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "—";

          return `
            <tr>
              <td><span class="booking-code-chip">${escapeHTML(b.code)}</span></td>
              <td><strong>${escapeHTML(b.customer)}</strong></td>
              <td>${escapeHTML(b.package)}</td>
              <td>${formattedDate}</td>
              <td><strong>${formatINR(b.amount)}</strong></td>
              <td><span class="badge ${statusClass}">${escapeHTML(b.status ? b.status.charAt(0).toUpperCase() + b.status.slice(1) : "Pending")}</span></td>
            </tr>`;
        })
        .join("");
    }

    // 3. Update Doughnut Chart with real MySQL data
    if (bookingStatusChartInstance) {
      bookingStatusChartInstance.data.datasets[0].data = [
        stats.confirmed_bookings || 0,
        stats.pending_bookings || 0,
        0,
        0,
      ];
      bookingStatusChartInstance.update();
    }
  } catch (err) {
    console.warn("Failed to load live admin stats:", err);
  }
}

function showAdminModal(title, content, onSubmit) {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop open";
  backdrop.innerHTML = `
    <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-head">
        <h2 id="modal-title">${title}</h2>
        <button class="modal-close" aria-label="Close dialog">&times;</button>
      </div>
      <div class="modal-content">${content}</div>
    </section>`;

  document.body.appendChild(backdrop);

  const close = () => backdrop.remove();
  const form = backdrop.querySelector("form");

  backdrop.querySelector(".modal-close").addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      close();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    onSubmit(new FormData(form));
    close();
  });
}

async function getAdminCsrfToken() {
  try {
    const res = await fetch("/csrf-token", { credentials: "same-origin" });
    if (res.ok) {
      const data = await res.json();
      return data.token;
    }
  } catch (err) {
    console.warn("CSRF token fetch failed:", err);
  }
  return "";
}

async function setupPackageManagement() {
  const tableBody = document.querySelector("#admin-package-rows");
  if (!tableBody) return;

  let livePackages = [];

  const fields = `
    <div class="form-grid">
      <div class="field">
        <label>Package name</label>
        <input name="name" required placeholder="e.g. Kashmir Paradise">
      </div>
      <div class="field">
        <label>Destination</label>
        <input name="destination" required placeholder="e.g. Srinagar & Gulmarg, India">
      </div>
      <div class="field">
        <label>Price per person (INR)</label>
        <input name="price" type="number" min="1" required placeholder="45000">
      </div>
      <div class="field">
        <label>Duration (days)</label>
        <input name="days" type="number" min="1" required placeholder="6">
      </div>
      <div class="field">
        <label>Status</label>
        <select name="status">
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <div class="field">
        <label>Image URL</label>
        <input name="image" type="url" required placeholder="https://images.unsplash.com/...">
      </div>
    </div>
    <p class="notice"><i class="bi bi-database-check"></i> Changes are synchronized directly with your MySQL database.</p>
    <div style="margin-top: 16px">
      <button class="btn btn-primary" type="submit"><i class="bi bi-check-circle"></i> Save package</button>
    </div>`;

  async function loadBackendPackages() {
    try {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted"><i class="bi bi-hourglass-split"></i> Loading packages from MySQL...</td></tr>`;
      const res = await fetch("/api/packages");
      if (res.ok) {
        const liveList = await res.json();
        if (Array.isArray(liveList)) {
          livePackages = liveList;
        }
      }
      renderPackages();
    } catch (err) {
      console.error("Failed to load packages:", err);
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger py-4">Failed to load packages from MySQL.</td></tr>`;
    }
  }

  function renderPackages() {
    if (!livePackages || livePackages.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No packages found in MySQL. Click "Add package" to create one.</td></tr>`;
      return;
    }

    tableBody.innerHTML = livePackages
      .map(
        (trip) => `
          <tr data-pkg-id="${trip.id}">
            <td>
              <div class="table-img-name">
                <img class="thumb" src="${escapeHTML(trip.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=160&q=70')}" alt="">
                <strong>${escapeHTML(trip.name)}</strong>
              </div>
            </td>
            <td>${escapeHTML(trip.destination || "Flexible")}</td>
            <td>${formatINR(Number(trip.price))}</td>
            <td>${trip.days} days</td>
            <td>
              <span class="badge ${trip.status === "active" || trip.status === "Active" ? "badge-success" : "badge-warning"}">
                ${escapeHTML(trip.status || "active")}
              </span>
            </td>
            <td>
              <div class="table-actions">
                <button class="btn btn-outline btn-sm" data-edit-pkg="${trip.id}"><i class="bi bi-pencil"></i> Edit</button>
                <button class="btn btn-outline btn-sm" data-delete-pkg="${trip.id}"><i class="bi bi-trash"></i> Archive</button>
              </div>
            </td>
          </tr>`,
      )
      .join("");

    tableBody.querySelectorAll("[data-edit-pkg]").forEach((button) => {
      button.addEventListener("click", () => {
        const slug = button.dataset.editPkg;
        const pkg = livePackages.find((p) => p.id === slug);
        if (pkg) openPackageForm(pkg);
      });
    });

    tableBody.querySelectorAll("[data-delete-pkg]").forEach((button) => {
      button.addEventListener("click", async () => {
        const slug = button.dataset.deletePkg;
        const pkg = livePackages.find((p) => p.id === slug);
        const name = pkg ? pkg.name : slug;

        if (!confirm(`Archive / remove package "${name}" from MySQL?`)) {
          return;
        }

        try {
          const token = await getAdminCsrfToken();
          const res = await fetch(`/api/admin/packages/${slug}`, {
            method: "DELETE",
            headers: {
              ...(token ? { "X-CSRF-Token": token } : {}),
            },
            credentials: "same-origin",
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok) {
            if (window.showToast) window.showToast(data.message || `Package archived in MySQL`, "success");
            await loadBackendPackages();
          } else {
            alert(data.error || "Could not delete package.");
          }
        } catch (err) {
          console.error("Delete package failed", err);
          alert("Network error deleting package.");
        }
      });
    });
  }

  function openPackageForm(pkg) {
    const isNew = !pkg || !pkg.id;
    const initialData = pkg
      ? {
          name: pkg.name,
          destination: pkg.destination,
          price: pkg.price,
          days: pkg.days,
          status: pkg.status === "active" ? "active" : "draft",
          image: pkg.image,
        }
      : {
          name: "",
          destination: "",
          price: "",
          days: "",
          status: "active",
          image: "",
        };

    showAdminModal(
      isNew ? "Add package to MySQL" : `Edit ${pkg.name}`,
      `<form id="package-edit-form">${fields}</form>`,
      async (formData) => {
        const payload = {
          name: formData.get("name")?.trim(),
          destination: formData.get("destination")?.trim(),
          price: Number(formData.get("price")),
          days: Number(formData.get("days")),
          status: formData.get("status") || "active",
          image: formData.get("image")?.trim(),
        };

        try {
          const token = await getAdminCsrfToken();
          const url = isNew ? "/api/admin/packages" : `/api/admin/packages/${pkg.id}`;
          const method = isNew ? "POST" : "PUT";

          const res = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              ...(token ? { "X-CSRF-Token": token } : {}),
            },
            credentials: "same-origin",
            body: JSON.stringify(payload),
          });

          const data = await res.json().catch(() => ({}));
          if (res.ok) {
            if (window.showToast) {
              window.showToast(isNew ? `Package "${payload.name}" saved to MySQL!` : `Package "${payload.name}" updated!`, "success");
            }
            await loadBackendPackages();
          } else {
            alert(data.error || "Failed to save package to MySQL.");
          }
        } catch (err) {
          console.error("Package save error", err);
          alert("Network error connecting to backend.");
        }
      },
    );

    const form = document.querySelector("#package-edit-form");
    if (form) {
      Object.entries(initialData).forEach(([key, value]) => {
        const el = form.elements.namedItem(key);
        if (el) el.value = value;
      });
    }
  }

  const addBtn = document.querySelector("#add-package");
  if (addBtn) {
    addBtn.addEventListener("click", () => openPackageForm(null));
  }

  await loadBackendPackages();
}

async function setupDestinationManagement() {
  const tableBody = document.querySelector("#destination-rows");
  if (!tableBody) return;

  let liveDestinations = [];

  const fields = `
    <div class="form-grid">
      <div class="field">
        <label>Destination name</label>
        <input name="name" required placeholder="e.g. Goa, India">
      </div>
      <div class="field">
        <label>Country / location</label>
        <input name="location" required placeholder="e.g. India">
      </div>
      <div class="field wide">
        <label>Description</label>
        <textarea name="description" rows="3" required placeholder="Brief description of the destination..."></textarea>
      </div>
      <div class="field wide">
        <label>Image URL</label>
        <input name="image" type="url" placeholder="https://images.unsplash.com/...">
      </div>
    </div>
    <p class="notice"><i class="bi bi-database-check"></i> Changes are synchronized directly with your MySQL database.</p>
    <button class="btn btn-primary" style="margin-top: 15px" type="submit"><i class="bi bi-check-circle"></i> Save destination</button>`;

  async function loadBackendDestinations() {
    try {
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted"><i class="bi bi-hourglass-split"></i> Loading destinations from MySQL...</td></tr>`;
      const res = await fetch("/api/admin/destinations", { credentials: "same-origin" });
      if (res.ok) {
        liveDestinations = await res.json();
      } else {
        const pubRes = await fetch("/api/destinations");
        if (pubRes.ok) {
          liveDestinations = await pubRes.json();
        }
      }
      renderDestinations();
    } catch (err) {
      console.error("Failed to load destinations:", err);
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger py-4">Failed to load destinations from MySQL. Please refresh.</td></tr>`;
    }
  }

  function renderDestinations() {
    if (!liveDestinations || liveDestinations.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-muted">No destinations found in MySQL database. Click "Add destination" to create one.</td></tr>`;
      return;
    }

    tableBody.innerHTML = liveDestinations
      .map(
        (dest) => `
          <tr data-dest-id="${dest.id}">
            <td>
              <div class="table-img-name">
                <img class="thumb" src="${escapeHTML(dest.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=160&q=70')}" alt="">
                <div>
                  <strong>${escapeHTML(dest.name)}</strong>
                  ${dest.package_count ? `<br><small class="text-muted">${dest.package_count} package(s)</small>` : ""}
                </div>
              </div>
            </td>
            <td>${escapeHTML(dest.location)}</td>
            <td>${escapeHTML(dest.description || "—")}</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-outline btn-sm" data-edit-dest="${dest.id}"><i class="bi bi-pencil"></i> Edit</button>
                <button class="btn btn-outline btn-sm" data-delete-dest="${dest.id}"><i class="bi bi-trash"></i> Delete</button>
              </div>
            </td>
          </tr>`,
      )
      .join("");

    tableBody.querySelectorAll("[data-edit-dest]").forEach((button) => {
      button.addEventListener("click", () => {
        const destId = Number(button.dataset.editDest);
        const dest = liveDestinations.find((d) => d.id === destId);
        if (dest) {
          openDestinationForm(dest);
        }
      });
    });

    tableBody.querySelectorAll("[data-delete-dest]").forEach((button) => {
      button.addEventListener("click", async () => {
        const destId = Number(button.dataset.deleteDest);
        const dest = liveDestinations.find((d) => d.id === destId);
        const destName = dest ? dest.name : `ID #${destId}`;

        if (!confirm(`Are you sure you want to permanently delete destination "${destName}" from MySQL?`)) {
          return;
        }

        try {
          const token = await getAdminCsrfToken();
          const res = await fetch(`/api/admin/destinations/${destId}`, {
            method: "DELETE",
            headers: {
              ...(token ? { "X-CSRF-Token": token } : {}),
            },
            credentials: "same-origin",
          });

          const data = await res.json().catch(() => ({}));
          if (res.ok) {
            if (window.showToast) window.showToast(data.message || `Destination deleted from MySQL`, "success");
            await loadBackendDestinations();
          } else {
            alert(data.error || "Could not delete destination.");
          }
        } catch (err) {
          console.error("Delete destination failed", err);
          alert("Network error deleting destination.");
        }
      });
    });
  }

  function openDestinationForm(destination) {
    const isNew = !destination || !destination.id;
    const initialData = destination || { name: "", location: "", description: "", image: "" };

    showAdminModal(
      isNew ? "Add destination to MySQL" : `Edit ${destination.name}`,
      `<form id="destination-edit-form">${fields}</form>`,
      async (formData) => {
        const payload = {
          name: formData.get("name")?.trim(),
          location: formData.get("location")?.trim(),
          description: formData.get("description")?.trim(),
          image: formData.get("image")?.trim() || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
        };

        try {
          const token = await getAdminCsrfToken();
          const url = isNew ? "/api/admin/destinations" : `/api/admin/destinations/${destination.id}`;
          const method = isNew ? "POST" : "PUT";

          const res = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              ...(token ? { "X-CSRF-Token": token } : {}),
            },
            credentials: "same-origin",
            body: JSON.stringify(payload),
          });

          const data = await res.json().catch(() => ({}));
          if (res.ok) {
            if (window.showToast) {
              window.showToast(isNew ? `Destination "${payload.name}" saved to MySQL!` : `Destination "${payload.name}" updated!`, "success");
            }
            await loadBackendDestinations();
          } else {
            alert(data.error || "Failed to save destination to MySQL.");
          }
        } catch (err) {
          console.error("Failed to save destination:", err);
          alert("Network error connecting to MySQL backend.");
        }
      },
    );

    const form = document.querySelector("#destination-edit-form");
    if (form) {
      Object.entries(initialData).forEach(([key, value]) => {
        const el = form.elements.namedItem(key);
        if (el) el.value = value || "";
      });
    }
  }

  const addBtn = document.querySelector("#add-destination");
  if (addBtn) {
    addBtn.addEventListener("click", () => openDestinationForm(null));
  }

  await loadBackendDestinations();
}

function setupTableSearch(inputSelector = "#table-search", tableSelector = "#data-table") {
  const input = document.querySelector(inputSelector);
  const table =
    document.querySelector(tableSelector) || input?.closest(".panel")?.querySelector("table");

  if (!input || !table) {
    return;
  }

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();

    table.querySelectorAll("tbody tr").forEach((row) => {
      row.hidden = !row.textContent.toLowerCase().includes(query);
    });
  });
}

async function setupBookingActions() {
  const tbody = document.querySelector("#data-table tbody, .panel table tbody");

  // Attempt live MySQL fetch
  try {
    const res = await fetch("/api/admin/bookings", { credentials: "same-origin" });
    if (res.ok) {
      const liveBookings = await res.json();
      if (Array.isArray(liveBookings) && liveBookings.length > 0 && tbody) {
        tbody.innerHTML = liveBookings.map((b) => {
          const badgeClass = b.status === "confirmed" ? "badge-success" : (b.status === "cancelled" ? "badge-danger" : "badge-warning");
          return `
            <tr data-booking-id="${b.id}">
              <td><strong>${escapeHTML(b.code)}</strong></td>
              <td>${escapeHTML(b.customer_name)}<br><small class="text-muted">${escapeHTML(b.customer_email)}</small></td>
              <td>
                <strong>${escapeHTML(b.package_name)}</strong>
                ${b.custom_destinations && b.custom_destinations.length > 0 ? `<br><small style="color:var(--tb-deep-green);"><i class="bi bi-geo-alt-fill text-danger"></i> ${escapeHTML(b.custom_destinations.join(" → "))}</small>` : (b.destination ? `<br><small class="text-muted"><i class="bi bi-geo-alt"></i> ${escapeHTML(b.destination)}</small>` : "")}
              </td>
              <td>${b.travel_date || "Flexible"}</td>
              <td>${b.people}</td>
              <td>${formatINR(b.total_amount)}</td>
              <td><span class="badge ${badgeClass}">${escapeHTML(b.status)}</span></td>
              <td>
                <div class="table-actions">
                  ${b.status !== "confirmed" ? `<button class="btn btn-outline btn-sm" data-admin-action="confirmed" data-id="${b.id}"><i class="bi bi-check-lg"></i> Confirm</button>` : ""}
                  ${b.status !== "cancelled" ? `<button class="btn btn-outline btn-sm" data-admin-action="cancelled" data-id="${b.id}"><i class="bi bi-x-lg"></i> Cancel</button>` : ""}
                </div>
              </td>
            </tr>`;
        }).join("");

        tbody.querySelectorAll("[data-admin-action]").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            const targetStatus = btn.dataset.adminAction;
            try {
              let csrfToken = "";
              try {
                const tr = await fetch("/csrf-token", { credentials: "same-origin" });
                if (tr.ok) {
                  const td = await tr.json();
                  csrfToken = td.token;
                }
              } catch (_) {}

              const updateRes = await fetch(`/api/admin/bookings/${id}/status`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
                },
                body: JSON.stringify({ status: targetStatus }),
              });
              if (updateRes.ok) {
                if (window.showToast) window.showToast(`Booking status updated to ${targetStatus}`, "success");
                setupBookingActions();
              }
            } catch (_) {}
          });
        });
        return;
      }
    }
  } catch (_) {}

  // Fallback handler for demo table
  document.querySelectorAll("[data-booking-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.bookingAction;
      const row = button.closest("tr");

      if (action === "view") {
        alert("Booking details are sample data in this frontend demo.");
        return;
      }

      if (
        action === "cancel" &&
        !confirm("Cancel this booking? This demo will only change its displayed status.")
      ) {
        return;
      }

      const status = {
        confirm: ["Confirmed", "badge badge-success"],
        cancel: ["Cancelled", "badge badge-danger"],
      }[action];

      const badge = row.querySelector(".badge");
      badge.textContent = status[0];
      badge.className = status[1];

      const actions = row.querySelector(".table-actions");
      actions.innerHTML =
        '<button class="btn btn-outline btn-sm" data-view-booking>View details</button>';
      actions.querySelector("button").addEventListener("click", () => {
        alert("Booking details are sample data in this frontend demo.");
      });
    });
  });
}

async function setupCustomerActions() {
  const tbody = document.querySelector("#data-table tbody, .panel table tbody");
  if (!tbody) return;

  try {
    const res = await fetch("/api/admin/customers", { credentials: "same-origin" });
    if (res.ok) {
      const customers = await res.json();
      if (Array.isArray(customers) && customers.length > 0) {
        const noticeEl = document.querySelector(".panel .toolbar .notice");
        if (noticeEl) {
          noticeEl.textContent = `${customers.length} registered customer accounts in MySQL`;
        }

        tbody.innerHTML = customers
          .map(
            (c) => `
              <tr data-customer-id="${c.id}">
                <td><strong>${escapeHTML(c.name)}</strong></td>
                <td>${escapeHTML(c.email)}</td>
                <td>${escapeHTML(c.phone || "—")}</td>
                <td>${c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                <td><span class="badge badge-success">Active</span></td>
                <td>
                  <button class="btn btn-outline btn-sm" data-customer-detail="${c.id}">
                    <i class="bi bi-person-lines-fill"></i> View details
                  </button>
                </td>
              </tr>`,
          )
          .join("");

        tbody.querySelectorAll("[data-customer-detail]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const cid = Number(btn.dataset.customerDetail);
            const cust = customers.find((c) => c.id === cid);
            if (cust) {
              showAdminModal(
                `Customer Profile: ${cust.name}`,
                `<div class="customer-info-box" style="line-height: 1.8;">
                   <p><strong><i class="bi bi-person"></i> Name:</strong> ${escapeHTML(cust.name)}</p>
                   <p><strong><i class="bi bi-envelope"></i> Email:</strong> ${escapeHTML(cust.email)}</p>
                   <p><strong><i class="bi bi-telephone"></i> Phone:</strong> ${escapeHTML(cust.phone || "Not provided")}</p>
                   <p><strong><i class="bi bi-geo-alt"></i> Address:</strong> ${escapeHTML(cust.address || "Not provided")}</p>
                   <p><strong><i class="bi bi-ticket-perforated"></i> Total Bookings:</strong> <span class="badge badge-gold">${cust.bookings_count}</span></p>
                   <p><strong><i class="bi bi-calendar"></i> Registered:</strong> ${cust.created_at ? new Date(cust.created_at).toLocaleString("en-IN") : "—"}</p>
                 </div>
                 <div style="margin-top: 15px; text-align: right;">
                   <button class="btn btn-outline btn-sm modal-close-btn" onclick="this.closest('.modal-backdrop').remove()">Close</button>
                 </div>`,
                () => {},
              );
            }
          });
        });
        return;
      }
    }
  } catch (err) {
    console.warn("Could not load customers from MySQL:", err);
  }

  // Fallback demo handler
  document.querySelectorAll("[data-view-customer]").forEach((button) => {
    button.addEventListener("click", () => {
      alert("Customer details are sample data in this frontend demo.");
    });
  });
}

async function setupPaymentActions() {
  const tbody = document.querySelector("#data-table tbody, .panel table tbody");
  if (!tbody) return;

  try {
    const res = await fetch("/api/admin/payments", { credentials: "same-origin" });
    if (res.ok) {
      const payments = await res.json();
      if (Array.isArray(payments) && payments.length > 0) {
        const noticeEl = document.querySelector(".panel .toolbar .notice");
        if (noticeEl) {
          noticeEl.textContent = `${payments.length} transactions recorded in MySQL`;
        }

        tbody.innerHTML = payments
          .map(
            (p) => `
              <tr data-payment-id="${p.id}">
                <td><strong>${escapeHTML(p.booking_code)}</strong></td>
                <td>${escapeHTML(p.customer_name)}</td>
                <td>${formatINR(p.amount)}</td>
                <td>${escapeHTML(p.method)}</td>
                <td><span class="badge ${p.status === "completed" ? "badge-success" : "badge-warning"}">${escapeHTML(p.status)}</span></td>
                <td>${p.date ? new Date(p.date).toLocaleDateString("en-IN") : "—"}</td>
              </tr>`,
          )
          .join("");
      }
    }
  } catch (err) {
    console.warn("Could not load payments from MySQL:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderDashboardShell();
  setupAdmin();
  loadCustomerName();
});

async function loadCustomerName() {
  const role = document.body.dataset.role || "admin";
  if (role !== "customer") return;

  try {
    const res = await fetch("/api/profile", { credentials: "same-origin" });
    if (!res.ok) return;
    const data = await res.json();
    const displayName = data.name || "Traveler";

    // Update header user name
    const headerName = document.querySelector("#header-user-name");
    if (headerName) headerName.textContent = displayName;

    // Update dashboard greeting
    const customerName = document.querySelector("#customer-name");
    if (customerName) customerName.textContent = displayName;
  } catch (err) {
    console.warn("Could not load customer profile name:", err);
  }
}

