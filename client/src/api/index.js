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
