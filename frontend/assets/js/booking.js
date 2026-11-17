function setupProfileForm() {
  const form = document.querySelector("#profile-form");

  if (!form) {
    return;
  }

  const storageKey = "travelbase-profile";
  const fields = ["name", "email", "phone", "address"].map((name) =>
    form.elements.namedItem(name),
  );
  const savedProfile = JSON.parse(localStorage.getItem(storageKey) || "null");

  function updateProfileAvatar(profileName, profileLocation) {
    const displayNameEl = document.querySelector("#profile-display-name");
    const displayMetaEl = document.querySelector("#profile-display-meta");
    const avatarInitialsEl = document.querySelector("#profile-avatar-initials");

    if (profileName && displayNameEl) {
      displayNameEl.textContent = profileName;
    }
    if (avatarInitialsEl && profileName) {
      const parts = profileName.trim().split(/\s+/);
      const initials = parts.length > 1
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();
      avatarInitialsEl.textContent = initials;
    }
    if (displayMetaEl && (profileLocation || profileName)) {
      displayMetaEl.textContent = `Member · ${profileLocation || "TravelBase Explorer"}`;
    }
  }

  if (savedProfile) {
    Object.entries(savedProfile).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);

      if (field) {
        field.value = value;
      }
    });
    updateProfileAvatar(savedProfile.name, savedProfile.address);
  }

  // Attempt live profile sync from MySQL database
  async function loadBackendProfile() {
    try {
      const res = await fetch("/api/profile", { credentials: "same-origin" });
      if (res.ok) {
        const data = await res.json();
        ["name", "email", "phone", "address"].forEach((key) => {
          const f = form.elements.namedItem(key);
          if (f && data[key]) {
            f.value = data[key];
          }
        });
        updateProfileAvatar(data.name, data.address);
      }
    } catch (_) {}
  }
  loadBackendProfile();

  document.querySelector("#edit-profile").addEventListener("click", () => {
    fields.forEach((field) => {
      field.readOnly = false;
    });

    document.querySelector("#save-profile").disabled = false;
    document.querySelector("#edit-profile").disabled = true;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const profile = Object.fromEntries(
      ["name", "email", "phone", "address"].map((name) => [
        name,
        form.elements.namedItem(name).value,
      ]),
    );

    localStorage.setItem(storageKey, JSON.stringify(profile));
    updateProfileAvatar(profile.name, profile.address);

    // Also update any sidebar/header customer names
    const headerName = document.querySelector("#header-user-name");
    if (headerName && profile.name) headerName.textContent = profile.name;
    const customerName = document.querySelector("#customer-name");
    if (customerName && profile.name) customerName.textContent = profile.name;

    fields.forEach((field) => {
      field.readOnly = true;
    });

    document.querySelector("#save-profile").disabled = true;
    document.querySelector("#edit-profile").disabled = false;

    // Persist to MySQL backend if active
    try {
      let csrfToken = "";
      try {
        const tokenRes = await fetch("/csrf-token", { credentials: "same-origin" });
        if (tokenRes.ok) {
          const t = await tokenRes.json();
          csrfToken = t.token;
        }
      } catch (_) {}

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
        },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        showMessage(
          document.querySelector("#profile-message"),
          "Profile successfully updated in database.",
          "success",
        );
        if (window.showToast) window.showToast("Profile updated!", "success");
        return;
      }
    } catch (_) {}

    showMessage(
      document.querySelector("#profile-message"),
      "Profile changes saved in this browser demo.",
      "success",
    );
  });
}

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const demoBookingsStorageKey = "travelbase-bookings";

function isValidTravelDate(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    getLocalDateString(new Date(`${value}T00:00:00`)) === value
  );
}

function isValidDemoBooking(booking) {
  return (
    booking &&
    typeof booking.id === "string" &&
    typeof booking.packageId === "string" &&
    typeof booking.packageName === "string" &&
    (typeof booking.destination === "string" || Array.isArray(booking.custom_destinations)) &&
    isValidTravelDate(booking.travelDate) &&
    Number.isInteger(booking.passengers) &&
    booking.passengers >= 1 &&
    booking.passengers <= 8 &&
    Number.isFinite(booking.total) &&
    booking.total >= 0
  );
}

function readDemoBookings() {
  const savedBookings = localStorage.getItem(demoBookingsStorageKey);

  if (savedBookings === null) {
    return [];
  }

  const bookings = JSON.parse(savedBookings);

  if (!Array.isArray(bookings) || bookings.some((booking) => !isValidDemoBooking(booking))) {
    throw new TypeError("Saved booking data has an unexpected format.");
  }

  return bookings;
}

function saveDemoBookings(bookings) {
  localStorage.setItem(demoBookingsStorageKey, JSON.stringify(bookings));
}

function showBookingStorageError(messageElement, error) {
  console.error("Unable to access saved demo bookings.", error);
  showMessage(
    messageElement,
    "Saved booking data could not be accessed in this browser. Check browser storage and try again.",
    "error",
  );
}

async function setupBookingForm() {
  const form = document.querySelector("#booking-form");

  if (!form) {
    return;
  }

  // 1. Available packages
  let packages = (window._activePackageSource && window._activePackageSource.length > 0)
    ? window._activePackageSource
    : (typeof travelPackages !== "undefined" ? travelPackages : []);

  try {
    const pkgRes = await fetch("/api/packages");
    if (pkgRes.ok) {
      const livePkgs = await pkgRes.json();
      if (Array.isArray(livePkgs) && livePkgs.length > 0) {
        packages = livePkgs;
        window._activePackageSource = livePkgs;
      }
    }
  } catch (_) {}

  // 2. Available destinations
  let allDestinations = [];
  try {
    const destRes = await fetch("/api/destinations");
    if (destRes.ok) {
      const liveDests = await destRes.json();
      if (Array.isArray(liveDests) && liveDests.length > 0) {
        allDestinations = liveDests;
      }
    }
  } catch (_) {}

  if (!allDestinations || allDestinations.length === 0) {
    const uniqueDestNames = Array.from(new Set(packages.map((p) => p.destination)));
    allDestinations = uniqueDestNames.map((name, i) => ({
      id: i + 1,
      name: name,
      location: name.includes(",") ? name.split(",").slice(-1)[0].trim() : name,
    }));
  }

  // 3. Determine initially selected package
  const urlPkgId = new URLSearchParams(location.search).get("id");
  let currentTrip = (urlPkgId && packages.find((p) => p.id === urlPkgId)) || packages[0];

  // 4. Multi-destination state (up to 5 destinations)
  const MAX_DESTINATIONS = 5;
  let selectedDestinations = [currentTrip.destination];

  // DOM elements
  const packageSelect = document.querySelector("#package-select");
  const destinationSlots = document.querySelector("#destination-slots");
  const destinationCountBadge = document.querySelector("#destination-count-badge");
  const nextStopNum = document.querySelector("#next-stop-num");
  const addDestBtn = document.querySelector("#add-destination-btn");
  const fill5DestBtn = document.querySelector("#fill-5-destinations-btn");
  const resetDestBtn = document.querySelector("#reset-destinations-btn");
  const quickPickPills = document.querySelector("#quick-pick-pills");
  const passengerCount = document.querySelector("#passenger-count");
  const travelDate = document.querySelector("#travel-date");
  const searchDate = localStorage.getItem("travelbase-search-date");
  const passengerSummary = document.querySelector("#summary-passengers");
  const totalSummary = document.querySelector("#summary-total");
  const packageSummary = document.querySelector("#booking-package");
  const summaryRouteList = document.querySelector("#summary-route-list");
  const asideDestCount = document.querySelector("#aside-dest-count");
  const summaryBaseRate = document.querySelector("#summary-base-rate");
  const summaryTravelDate = document.querySelector("#summary-travel-date");
  const btnDestCount = document.querySelector("#btn-dest-count");

  travelDate.min = getLocalDateString(new Date());

  if (searchDate && searchDate >= travelDate.min) {
    travelDate.value = searchDate;
    if (summaryTravelDate) summaryTravelDate.textContent = searchDate;
  }

  travelDate.addEventListener("change", () => {
    if (summaryTravelDate) summaryTravelDate.textContent = travelDate.value || "—";
  });

  // Populate #package-select
  if (packageSelect) {
    packageSelect.innerHTML = packages.map((pkg) => `
      <option value="${escapeHTML(pkg.id)}" ${pkg.id === currentTrip.id ? "selected" : ""}>
        ${escapeHTML(pkg.name)} — ${escapeHTML(pkg.destination)} (${pkg.days}D/${pkg.nights}N, ${formatINR(pkg.price)}/pax)
      </option>
    `).join("");

    packageSelect.addEventListener("change", () => {
      const found = packages.find((p) => p.id === packageSelect.value);
      if (found) {
        currentTrip = found;
        if (selectedDestinations.length === 1) {
          selectedDestinations = [currentTrip.destination];
        } else if (!selectedDestinations.includes(currentTrip.destination)) {
          selectedDestinations[0] = currentTrip.destination;
        }
        renderPackagePreview();
        renderDestinationSlots();
        updateTotal();
      }
    });
  }

  function renderPackagePreview() {
    if (!packageSummary) return;
    const nights = currentTrip.nights || Math.max(1, currentTrip.days - 1);
    packageSummary.innerHTML = `
      <img class="thumb" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;" src="${currentTrip.image}" alt="${escapeHTML(currentTrip.destination)}">
      <h2 style="margin: 14px 0 4px; font-size: 1.2rem; color: var(--tb-ink); font-family: var(--font-serif);">${escapeHTML(currentTrip.name)}</h2>
      <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 6px;"><i class="bi bi-geo-alt"></i> ${escapeHTML(currentTrip.destination)} · ${currentTrip.days} days / ${nights} nights</p>
      <p style="margin: 0;"><strong>${formatINR(currentTrip.price)}</strong> <small class="text-muted">/ person</small></p>`;
    if (summaryBaseRate) {
      summaryBaseRate.textContent = `${formatINR(currentTrip.price)} / pax`;
    }
  }

  function renderDestinationSlots() {
    if (!destinationSlots) return;

    destinationSlots.innerHTML = selectedDestinations.map((dest, idx) => {
      const isPrimary = idx === 0;
      return `
        <div class="destination-slot-card" data-slot-index="${idx}">
          <div class="stop-badge" title="Stop #${idx + 1}">${idx + 1}</div>
          <div class="dest-select-wrapper">
            <select class="dest-select form-select" data-slot-index="${idx}" aria-label="Destination stop ${idx + 1}">
              ${allDestinations.map((d) => `
                <option value="${escapeHTML(d.name)}" ${d.name === dest ? "selected" : ""}>
                  ${escapeHTML(d.name)} (${escapeHTML(d.location)})
                </option>
              `).join("")}
              ${!allDestinations.some((d) => d.name === dest) ? `<option value="${escapeHTML(dest)}" selected>${escapeHTML(dest)}</option>` : ""}
            </select>
          </div>
          ${!isPrimary ? `
            <button type="button" class="remove-dest-btn" data-remove-index="${idx}" title="Remove this destination stop">
              <i class="bi bi-trash"></i> Remove
            </button>
          ` : `<span class="badge bg-light text-muted border" style="font-size:0.75rem">Base Stop</span>`}
        </div>`;
    }).join("");

    destinationSlots.querySelectorAll(".dest-select").forEach((sel) => {
      sel.addEventListener("change", (e) => {
        const idx = parseInt(e.target.dataset.slotIndex, 10);
        selectedDestinations[idx] = e.target.value;
        renderSummaryRoute();
        renderQuickPills();
      });
    });

    destinationSlots.querySelectorAll(".remove-dest-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.removeIndex, 10);
        selectedDestinations.splice(idx, 1);
        renderDestinationSlots();
        updateTotal();
      });
    });

    const count = selectedDestinations.length;
    if (destinationCountBadge) {
      destinationCountBadge.textContent = `${count} / ${MAX_DESTINATIONS} Selected`;
      destinationCountBadge.className = count === MAX_DESTINATIONS ? "dest-badge-counter bg-warning text-dark" : "dest-badge-counter";
    }
    if (nextStopNum) {
      nextStopNum.textContent = String(Math.min(MAX_DESTINATIONS, count + 1));
    }
    if (addDestBtn) {
      addDestBtn.disabled = count >= MAX_DESTINATIONS;
      if (count >= MAX_DESTINATIONS) {
        addDestBtn.classList.add("disabled");
        addDestBtn.innerHTML = `<i class="bi bi-check2-circle me-1"></i> Max 5 Destinations Reached`;
      } else {
        addDestBtn.classList.remove("disabled");
        addDestBtn.innerHTML = `<i class="bi bi-plus-circle me-1"></i> Add Destination (Stop ${count + 1} of 5)`;
      }
    }
    if (btnDestCount) {
      btnDestCount.textContent = String(count);
    }
    if (asideDestCount) {
      asideDestCount.textContent = `${count} Stop${count > 1 ? "s" : ""}`;
    }

    renderSummaryRoute();
    renderQuickPills();
  }

  function renderSummaryRoute() {
    if (!summaryRouteList) return;
    summaryRouteList.innerHTML = selectedDestinations.map((dest, idx) => `
      <li class="summary-route-item">
        <span class="route-num">${idx + 1}</span>
        <span class="text-truncate"><strong>${escapeHTML(dest)}</strong></span>
      </li>
    `).join("");
  }

  function renderQuickPills() {
    if (!quickPickPills) return;
    const popularPicks = allDestinations.slice(0, 12);
    quickPickPills.innerHTML = popularPicks.map((d) => {
      const isSel = selectedDestinations.includes(d.name);
      return `
        <button type="button" class="dest-quick-pill ${isSel ? "selected" : ""}" data-dest-name="${escapeHTML(d.name)}" title="${isSel ? "In route" : "Add to route"}">
          <i class="bi ${isSel ? "bi-check2" : "bi-plus"}"></i> ${escapeHTML(d.name.split(",")[0])}
        </button>`;
    }).join("");

    quickPickPills.querySelectorAll(".dest-quick-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        const destName = pill.dataset.destName;
        if (selectedDestinations.includes(destName)) {
          if (selectedDestinations.length > 1) {
            selectedDestinations = selectedDestinations.filter((d) => d !== destName);
            renderDestinationSlots();
            updateTotal();
          }
        } else {
          if (selectedDestinations.length < MAX_DESTINATIONS) {
            selectedDestinations.push(destName);
            renderDestinationSlots();
            updateTotal();
          } else {
            if (window.showToast) window.showToast("Maximum of 5 destinations reached for this package journey.", "warning");
          }
        }
      });
    });
  }

  if (fill5DestBtn) {
    fill5DestBtn.addEventListener("click", () => {
      const set = new Set([currentTrip.destination]);
      for (const d of allDestinations) {
        if (set.size >= 5) break;
        set.add(d.name);
      }
      selectedDestinations = Array.from(set);
      renderDestinationSlots();
      updateTotal();
      if (window.showToast) window.showToast("5 curated destinations populated into your journey!", "success");
    });
  }

  if (resetDestBtn) {
    resetDestBtn.addEventListener("click", () => {
      selectedDestinations = [currentTrip.destination];
      renderDestinationSlots();
      updateTotal();
    });
  }

  if (addDestBtn) {
    addDestBtn.addEventListener("click", () => {
      if (selectedDestinations.length >= MAX_DESTINATIONS) {
        if (window.showToast) window.showToast("You can choose up to 5 destinations per package booking.", "info");
        return;
      }
      const candidate = allDestinations.find((d) => !selectedDestinations.includes(d.name));
      if (candidate) {
        selectedDestinations.push(candidate.name);
      } else {
        selectedDestinations.push(allDestinations[selectedDestinations.length % allDestinations.length].name);
      }
      renderDestinationSlots();
      updateTotal();
    });
  }

  function updateTotal() {
    const count = Number(passengerCount.value) || 1;
    passengerSummary.textContent = count;
    const baseTotal = currentTrip.price * count;
    // Multi-destination supplement: extra destinations beyond 1st
    const extraStops = Math.max(0, selectedDestinations.length - 1);
    const multiStopFee = extraStops * 4500 * count;
    const finalTotal = baseTotal + multiStopFee;

    totalSummary.innerHTML = `
      ${formatINR(finalTotal)}
      ${extraStops > 0 ? `<br><small class="text-muted" style="font-size:0.75rem; font-weight:normal;">Incl. ${extraStops} extra stop supplement</small>` : ""}
    `;
  }

  passengerCount.addEventListener("input", updateTotal);
  passengerCount.addEventListener("change", () => {
    const count = Math.max(1, Math.min(8, Number(passengerCount.value) || 1));
    const fields = document.querySelector("#passenger-fields");

    passengerCount.value = count;
    updateTotal();

    const currentCount = fields.querySelectorAll(".passenger").length;

    for (let index = currentCount + 1; index <= count; index += 1) {
      fields.insertAdjacentHTML(
        "beforeend",
        `
          <fieldset class="passenger">
            <h3>Passenger ${index}</h3>
            <div class="form-grid">
              <div class="field">
                <label for="passenger-${index}-name">Full name</label>
                <input id="passenger-${index}-name" name="passenger${index}Name" required autocomplete="name">
              </div>
              <div class="field">
                <label for="passenger-${index}-email">Email</label>
                <input id="passenger-${index}-email" name="passenger${index}Email" type="email" required autocomplete="email">
              </div>
            </div>
          </fieldset>`,
      );
    }

    while (fields.querySelectorAll(".passenger").length > count) {
      fields.lastElementChild.remove();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const minimumDate = getLocalDateString(new Date());
    travelDate.min = minimumDate;

    if (!form.reportValidity()) {
      return;
    }

    if (travelDate.value < minimumDate) {
      showMessage(
        document.querySelector("#booking-message"),
        "Choose a travel date that has not passed.",
        "error",
      );
      travelDate.focus();
      return;
    }

    const count = Number(passengerCount.value) || 1;
    let serverBookingCode = null;

    try {
      let csrfToken = "";
      try {
        const tokenRes = await fetch("/csrf-token", { credentials: "same-origin" });
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          csrfToken = tokenData.token;
        }
      } catch (_) {}

      const passengersList = [];
      for (let i = 1; i <= count; i += 1) {
        const pName = form.elements.namedItem(`passenger${i}Name`)?.value;
        const pEmail = form.elements.namedItem(`passenger${i}Email`)?.value;
        if (pName) passengersList.push({ name: pName, email: pEmail });
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
        },
        body: JSON.stringify({
          package_id: currentTrip.id,
          travel_date: travelDate.value,
          number_of_people: count,
          custom_destinations: selectedDestinations,
          passengers: passengersList,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        serverBookingCode = data.booking_code;
      }
    } catch (_) {}

    const calculatedTotal = (currentTrip.price * count) + (Math.max(0, selectedDestinations.length - 1) * 4500 * count);
    const booking = {
      id: serverBookingCode || `TB-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      packageId: currentTrip.id,
      packageName: currentTrip.name,
      destination: currentTrip.destination,
      custom_destinations: [...selectedDestinations],
      travelDate: travelDate.value,
      passengers: count,
      total: calculatedTotal,
      status: serverBookingCode ? "Confirmed Request" : "Requested",
    };

    try {
      saveDemoBookings([booking, ...readDemoBookings()]);
    } catch (error) {
      showBookingStorageError(document.querySelector("#booking-message"), error);
      return;
    }

    const routeText = selectedDestinations.join(" ➔ ");
    const msg = serverBookingCode
      ? `Booking request ${serverBookingCode} has been successfully submitted and saved to MySQL database for ${currentTrip.name} across ${selectedDestinations.length} destination(s): ${routeText}!`
      : `Request ${booking.id} saved in your bookings list for ${currentTrip.name} across ${selectedDestinations.length} destination(s): ${routeText}.`;

    showMessage(document.querySelector("#booking-message"), msg, "success");
    if (window.showToast) {
      window.showToast(`Booking ${booking.id} created for ${selectedDestinations.length} destinations!`, "success", 4500);
    }
  });

  renderPackagePreview();
  renderDestinationSlots();
  updateTotal();
}

function setupSavedBookings() {
  const table = document.querySelector("#my-bookings-table");

  if (!table) {
    return;
  }

  const message = document.querySelector("#my-bookings-message");
  const tableBody = table.tBodies[0];

  async function renderBookings() {
    // Attempt live fetch from MySQL backend
    try {
      const res = await fetch("/api/bookings", { credentials: "same-origin" });
      if (res.ok) {
        const liveBookings = await res.json();
        if (Array.isArray(liveBookings) && liveBookings.length > 0) {
          tableBody.innerHTML = "";
          liveBookings.forEach((b) => {
            const row = tableBody.insertRow();
            const badgeClass = b.status === "confirmed" ? "badge-success" : (b.status === "cancelled" ? "badge-danger" : "badge-warning");
            const dests = (b.custom_destinations && b.custom_destinations.length > 0)
              ? b.custom_destinations
              : (b.destination ? [b.destination] : []);
            const destBadge = dests.length > 0
              ? `<div class="mt-1" style="font-size:0.8rem; color:var(--tb-deep-green);"><i class="bi bi-geo-alt-fill text-danger"></i> ${escapeHTML(dests.join(" → "))}</div>`
              : "";
            row.innerHTML = `
              <td><strong>${escapeHTML(b.booking_code)}</strong></td>
              <td><strong>${escapeHTML(b.package_name)}</strong>${destBadge}</td>
              <td>${b.travel_date || "Flexible"}</td>
              <td>${b.people}</td>
              <td>${formatINR(b.total_amount)}</td>
              <td><span class="badge ${badgeClass}">${escapeHTML(b.status)}</span></td>
              <td><span class="text-muted" style="font-size:0.85rem">Confirmed in DB</span></td>
            `;
          });
          return;
        }
      }
    } catch (_) {}

    tableBody.querySelectorAll("[data-demo-booking]").forEach((row) => row.remove());

    let bookings;

    try {
      bookings = readDemoBookings();
    } catch (error) {
      showBookingStorageError(message, error);
      return;
    }

    bookings.slice().reverse().forEach((booking) => {
      const row = tableBody.insertRow(0);
      row.dataset.demoBooking = booking.id;

      const dests = (booking.custom_destinations && booking.custom_destinations.length > 0)
        ? booking.custom_destinations
        : (booking.destination ? [booking.destination] : []);
      const destBadge = dests.length > 0
        ? `<div class="mt-1" style="font-size:0.8rem; color:var(--tb-deep-green);"><i class="bi bi-geo-alt-fill text-danger"></i> ${escapeHTML(dests.join(" → "))}</div>`
        : "";

      const formattedDate = new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(`${booking.travelDate}T00:00:00`));

      row.innerHTML = `
        <td><strong>${escapeHTML(booking.id)}</strong></td>
        <td><strong>${escapeHTML(booking.packageName)}</strong>${destBadge}</td>
        <td>${formattedDate}</td>
        <td>${booking.passengers}</td>
        <td>${formatINR(booking.total)}</td>
        <td><span class="badge badge-warning">${escapeHTML(booking.status)}</span></td>
        <td><button class="btn btn-outline btn-sm delete-demo-btn" type="button" data-id="${booking.id}">Cancel</button></td>
      `;

      row.querySelector(".delete-demo-btn").addEventListener("click", () => {
        if (!confirm("Remove this booking request from this browser?")) {
          return;
        }

        try {
          saveDemoBookings(readDemoBookings().filter((saved) => saved.id !== booking.id));
          renderBookings();
        } catch (error) {
          showBookingStorageError(message, error);
        }
      });
    });
  }

  renderBookings();
}

document.addEventListener("DOMContentLoaded", () => {
  setupProfileForm();
  setupBookingForm();
  setupSavedBookings();
});
