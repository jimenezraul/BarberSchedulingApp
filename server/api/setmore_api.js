const router = require("express").Router();
const Setmore = require("../utils/setmore");
const auth = require("../utils/auth");
const { Auth } = require("../utils/Authjwt");

const setmore = new Setmore();

router.get("/gallery", async (req, res) => {
  const gallery = await setmore.get_gallery();
  res.json(gallery);
});

router.get("/services", Auth, async (req, res) => {
  try {
    const services = await setmore.get_services();
    return res.send(services);
  } catch (error) {
    res.send(error);
  }
});

router.get("/all-services", async (req, res) => {
  try {
    const services = await setmore.get_all_services();
    return res.send(services);
  } catch (error) {
    res.send(error);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await setmore.get_categories();
    return res.send(categories);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/customer", Auth, auth, async (req, res) => {
  const user = req.user;
  try {
    const customer = await setmore.get_customer(user);
    return res.send(customer);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/appointments", Auth, auth, async (req, res) => {
  const user = req.user;
  const start_time = req.body.startDate;
  const end_time = req.body.endDate;
  try {
    const appointments = await setmore.get_appointments(
      user,
      start_time,
      end_time
    );

    return res.send(appointments);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/get_available_times", Auth, async (req, res) => {
  const { staff, service, date } = req.query;
  try {
    const available_times = await setmore.get_availability(
      staff,
      service,
      date
    );

    return res.send(available_times);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/create_appointment", Auth, async (req, res) => {
  const { staff_key, service_key, customer_key, start_time, end_time, cost } =
    req.body;
  try {
    const appointment = await setmore.create_appointment(
      staff_key,
      service_key,
      customer_key,
      start_time,
      end_time,
      cost
    );

    return res.send(appointment);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/delete_appointment", Auth, async (req, res) => {
  const { key } = req.query;
  try {
    const appointment = await setmore.delete_appointment(key);
    return res.send(appointment);
  } catch (error) {
    return res.send(error);
  }
});

router.put("/update_appointment", Auth, async (req, res) => {
  try {
    const appointment = await setmore.update_appointment(req.body);
      
    return res.send(appointment);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
