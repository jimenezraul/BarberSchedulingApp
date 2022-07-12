const axios = require("axios");
const url = "https://developer.setmore.com";
require("dotenv").config();
const { formatDate, formatDateTime, decodedJwt } = require("../utils/helpers");
const fs = require("fs");
const path = require("path");

class Setmore {
  constructor() {
    this.access_token = null;
  }

  async get_access_token() {
    // check if there is a token
    if (this.access_token) {
      //check if token is expired
      const tokenExpired = await this.check_token_expired();
      if (tokenExpired) {
        //get new token
        const newToken = await this.get_new_access_token();
        this.access_token = newToken;
        return newToken;
      }
      return this.access_token;
    }
    // if token is not set, get new token
    const new_token = await this.get_new_access_token();
    return new_token;
  }

  async check_token_expired() {
    const token = await this.access_token;
    const decoded = await decodedJwt(token);
    const exp = decoded.exp;
    const now = new Date().getTime() / 1000;
    if (exp < now) {
      return true;
    }
    return false;
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
    const token = await this.get_access_token();
    async function services(token) {
      try {
        const endpoint = "/api/v2/bookingapi/services";
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = response.data.data.services;

        return data;
      } catch (error) {
        return error;
      }
    }
    return await services(token);
  }

  async get_categories() {
    const token = await this.get_access_token();

    async function categories(token) {
      try {
        const endpoint = "/api/v1/bookingapi/services/categories";
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = response.data.data;
        return data;
      } catch (error) {
        return error;
      }
    }
    return await categories(token);
  }

  async create_customer() {
    const user = this.user;
    const token = await this.get_access_token();
    const { given_name, family_name, picture, email } = user;

    async function createCustomer(token) {
      const body = JSON.stringify({
        first_name: `${given_name}`,
        last_name: `${family_name}`,
        email_id: `${email}`,
        image_url: `${picture}`,
      });
      try {
        const endpoint = "/api/v2/bookingapi/customer/create";
        const response = await axios.post(url + endpoint, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = response.data.data;
        return data;
      } catch (error) {
        return error;
      }
    }
    return await createCustomer(token);
  }

  async get_customer(user) {
    this.user = user;
    const token = await this.get_access_token();

    async function customer(token) {
      try {
        const endpoint = `/api/v2/bookingapi/customer?firstname=${user.givenName}&email=${user.email}`;
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        //if customer does not exist, create customer
        if (!response.data.data.customer) {
          throw new Error("Customer does not exist");
        }

        const data = response.data.data;
        return data;
      } catch (error) {
        return error;
      }
    }
    const res = await customer(token);
    if (res.message === "Customer does not exist") {
      await this.create_customer();
      return await customer(token);
    }
    return res;
  }

  async get_appointments(user, start_time, end_time) {
    // Access token
    const token = await this.get_access_token();
    const services = await this.get_services();
    const categories = await this.get_categories();
    // Client
    let client = await this.get_customer(user);
    let client_key = client.customer[0].key;
    // Formatted dates
    const start_time_formatted = formatDate(start_time);
    const end_time_formatted = formatDate(end_time);

    async function appointments(token) {
      try {
        const endpoint = `/api/v1/bookingapi/appointments?startDate=${start_time_formatted}&endDate=${end_time_formatted}&customerDetails=true`;
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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
    return await appointments(token);
  }

  async create_appointment(
    staff_key,
    service_key,
    customer_key,
    start_time,
    end_time,
    cost
  ) {
    
    const token = await this.get_access_token();

    async function createAppointment(token) {
      try {
        const link = "/api/v2/bookingapi/appointment/create";
        const body = JSON.stringify({
          staff_key: `${staff_key}`,
          service_key: `${service_key}`,
          customer_key: `${customer_key}`,
          start_time: `${start_time}`,
          end_time: `${end_time}`,
          cost: `${cost}`,
        });
        const response = await axios.post(url + link, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      
        return response.data;
      } catch (error) {
        return error;
      }
    }
    return await createAppointment(token);
  }

  async delete_appointment(appointment_key) {
    const token = await this.get_access_token();

    async function deleteAppointment(token) {
      try {
        const link = `/api/v2/bookingapi/appointments/${appointment_key}`;
        const response = await axios.delete(url + link, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (error) {
        return error;
      }
    }
    return await deleteAppointment(token);
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
    const gallery = fs.readdirSync(
      path.join(__dirname, "../public/assets/gallery")
    );

    // get url for each image
    const gallery_url = gallery.map((image) => {
      return {
        url: `/assets/gallery/${image}`,
        name: image,
      };
    });

    return gallery_url;
  }

  async get_availability(staff, service, date) {
    const token = await this.get_access_token();

    async function getAvailability(token) {
      try {
        const link = "/api/v2/bookingapi/appointments/slots";
        const body = JSON.stringify({
          staff_key: `${staff}`,
          service_key: `${service}`,
          selected_date: `${date}`,
          slot_limit: 30,
        });
        const response = await axios.post(url + link, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (error) {
        return error;
      }
    }
    return await getAvailability(token);
  }
}

module.exports = Setmore;
