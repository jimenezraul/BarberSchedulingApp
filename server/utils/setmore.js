const axios = require("axios");
const url = "https://developer.setmore.com";
require("dotenv").config();
const { formatDate, formatDateTime } = require("../utils/helpers");
const fs = require("fs");
const path = require("path");

class Setmore {
  constructor() {
    this.access_token = null;
  }

  async get_access_token() {
    if (this.access_token) {
      return this.access_token;
    }
    await this.get_new_access_token();
    return this.access_token;
  }

  async get_new_access_token() {
    const link = "/api/v2/o/oauth2/token?refreshToken=";
    const response = await axios(url + link + process.env.SETMORE_API_KEY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.response) {
      const data = await response.data.data.token.access_token;
      this.access_token = data;
      return data;
    }
    return response.data.error;
  }

  async get_services() {
    const access_token = await this.get_access_token();

    async function prices(token) {
      try {
        const endpoint = "/api/v2/bookingapi/services";
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.data.response) {
          const newToken = await this.get_new_access_token();
          access_token = newToken;
          return await get_prices(newToken);
        }

        const data = response.data.data.services;

        return data;
      } catch (error) {
        return error;
      }
    }
    return await prices(access_token);
  }

  async get_categories() {
    const access_token = await this.get_access_token();

    async function categories(token) {
      try {
        const endpoint = "/api/v1/bookingapi/services/categories";
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.data.response) {
          const newToken = await this.get_new_access_token();
          access_token = newToken;
          return await categories(newToken);
        }

        const data = response.data.data;
        return data;
      } catch (error) {
        return error;
      }
    }
    return await categories(access_token);
  }

  async get_customer(user) {
    const access_token = await this.get_access_token();

    async function customer(token) {
      try {
        const endpoint = `/api/v2/bookingapi/customer?firstname=${user.givenName}&email=${user.email}`;
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.data.response) {
          const newToken = await this.get_new_access_token();
          access_token = newToken;
          return await customer(newToken);
        }

        const data = response.data.data;
        return data;
      } catch (error) {
        return error;
      }
    }
    return await customer(access_token);
  }

  async get_appointments(user, start_time, end_time) {
    // Access token
    const access_token = await this.get_access_token();
    const services = await this.get_services();
    const categories = await this.get_categories();
    // Client
    const client = await this.get_customer(user);
    const client_key = client.customer[0].key;
    // Formatted dates
    const start_time_formatted = formatDate(start_time);
    const end_time_formatted = formatDate(end_time);

    async function appointments(token) {
      try {
        const endpoint = `/api/v1/bookingapi/appointments?startDate=${start_time_formatted}&endDate=${end_time_formatted}&customerDetails=true`;
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.data.response) {
          const newToken = await this.get_new_access_token();
          access_token = newToken;
          return await appointments(newToken);
        }

        let data = response.data.data;

        // filter out appointments that are not for the customer
        let appointments = data.appointments.filter((appointment) => {
          return appointment.customer.key === client_key;
        });

        appointments = appointments.map((appointment) => {
          //check if appointment.service_key is in category.serviceIdList
          const category = categories.service_categories
            .slice(1)
            .find((category) =>
              category.serviceIdList.includes(appointment.service_key)
            );

          const service = services.find((service) => {
            return service.key === appointment.service_key;
          });
          return {
            ...appointment,
            date: formatDateTime(appointment.start_time),
            service: service,
            category: category,
          };
        });
        return appointments;
      } catch (error) {
        return error;
      }
    }
    return await appointments(access_token);
  }

  async get_all_services() {
    const categories = await this.get_categories();
    const services = await this.get_services();
    const all_services = categories.service_categories
      .slice(1)
      .map((category) => {
        const services_in_category = services.filter((service) => {
          return category.serviceIdList.includes(service.key);
        });

        // sort services by price low to high
        services_in_category.sort((a, b) => {
          return a.cost - b.cost;
        });

        return {
          ...category,
          services: services_in_category,
        };
      });

    return all_services;
  }

  get_gallery() {
    // get all images from  public/assets/gallery
    const gallery = fs.readdirSync(path.join(__dirname, "../public/assets/gallery"));
    
    // get url for each image
    const gallery_url = gallery.map((image) => {
      return {
        url: `/assets/gallery/${image}`,
        name: image,
      };
    });
   
    return gallery_url;
  }
}

module.exports = Setmore;
