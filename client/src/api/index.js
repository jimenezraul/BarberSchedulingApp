export const get_services = async () => {
  try {
    const res = await fetch("/api/services");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const services = await res.json();

    return services;
  } catch (error) {
    return error;
  }
};

export const get_categories = async () => {
  try {
    const res = await fetch("/api/categories");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const categories = await res.json();

    return categories.service_categories;
  } catch (error) {
    return error;
  }
};

export const get_customer = async (accessToken) => {
  try {
    const res = await fetch("/api/customer", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const customer = await res.json();

    return customer;
  } catch (error) {
    return error;
  }
};

export const get_appointments = async (accessToken) => {
  const link = "/api/appointments";
  // today's date
  const start_time = new Date().toLocaleDateString();
  // 6 months from now
  const end_time = new Date(
    new Date().getTime() + 30 * 24 * 60 * 60 * 1000 * 6
  ).toLocaleDateString();

  try {
    const res = await fetch(link, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: start_time,
        endDate: end_time,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const appointments = await res.json();

    return appointments;
  } catch (error) {
    return error;
  }
};

export const get_all_services = async (accessToken) => {
  try {
    const res = await fetch("/api/all-services", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const services = await res.json();

    return services;
  } catch (error) {
    return error;
  }
};
